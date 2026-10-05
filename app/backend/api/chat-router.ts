
import { z } from "zod";
import { desc } from "drizzle-orm";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { createRouter, publicQuery } from "./middleware";
import { classifyAiError } from "./ai/ai-client";
import { getDb } from "./queries/connection";
import {
  hotEvents,
  leaderboardEntries,
  paymentSettings,
} from "@db/schema";
import { EVENT_KNOWLEDGE } from "@contracts/event-info";
import { EVENT_RULEBOOK } from "@contracts/event-rulebook";

const apiKey = process.env.GEMINI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey,
});

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-2.5-flash";

async function buildSystemPrompt(): Promise<string> {
  let live = "";

  try {
    const db = getDb();

    const [events, board, [pay]] = await Promise.all([
      db
        .select()
        .from(hotEvents)
        .orderBy(desc(hotEvents.createdAt))
        .limit(10),

      db.select().from(leaderboardEntries).limit(50),

      db.select().from(paymentSettings).limit(1),
    ]);

    if (events.length) {
      live +=
        "\nCURRENT HOT EVENTS:\n" +
        events
          .map(
            (e) =>
              `- ${e.name}${e.eventDate ? ` (${e.eventDate})` : ""}${
                e.venue ? ` at ${e.venue}` : ""
              }: ${e.description}`
          )
          .join("\n");
    }

    if (board.length) {
      const ranked = board
        .map((b) => ({
          name: b.teamName,
          total:
            b.prefinalPoints +
            b.finalPoints +
            b.durability +
            b.manoeuvrability +
            b.technical +
            b.mixedBonus,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      live +=
        "\n\nLEADERBOARD TOP TEAMS:\n" +
        ranked
          .map((t, i) => `${i + 1}. ${t.name} — ${t.total} pts`)
          .join("\n");
    }

    if (pay?.registrationFee) {
      live += `\n\nREGISTRATION FEE: ${pay.registrationFee}. Payment via UPI${
        pay.upiId ? ` (${pay.upiId})` : ""
      } — full details and QR on the registration page.`;
    }
  } catch (err) {
    console.error("Nitro database context error:", err);
    // Continue with static knowledge if the database is unavailable.
  }

  return `
You are Nitro, the official AI pit-crew assistant for BURNOUT,
the RC racing event organized by SAE Collegiate Club MMMUT.

YOUR PURPOSE:
Answer questions about BURNOUT using the official event
information, rulebook, and current database information.

OFFICIAL EVENT RULEBOOK:
${EVENT_RULEBOOK}

GENERAL EVENT KNOWLEDGE:
${EVENT_KNOWLEDGE}

CURRENT DATABASE INFORMATION:
${live}

INSTRUCTIONS:
1. Answer questions about event dates, venue, coordinators,
   registration, eligibility, team size, technical rules,
   vehicle specifications, scoring, penalties, disqualification,
   schedule, fees, and contact information.

2. Use the official rulebook as the source of truth for rules.
   Use current database information for live events, leaderboard
   results, and payment settings.

3. Never invent dates, coordinator names, contact details,
   deadlines, technical specifications, or scoring rules.

4. If information is missing or conflicting, say so clearly
   and direct the user to the official event organizers.

5. Answer the question directly. Use short paragraphs or bullet
   points when listing rules, requirements, or schedules.

6. Understand natural questions, typos, and informal English.
   Do not tell users their question is unclear when it is
   understandable.

7. Be friendly, concise, and energetic, like an RC racing
   pit-crew assistant.

8. If asked who the event coordinators are, provide their names
   and contact details only if present in the supplied knowledge.
   Otherwise, say that the coordinator details are not available
   in the information currently provided.

9. Never claim that registration is open, an event date is
   confirmed, or a rule has changed unless the supplied
   information supports that statement.
`;
}

export const chatRouter = createRouter({
  ask: publicQuery
    .input(
      z.object({
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().min(1).max(2000),
            })
          )
          .min(1)
          .max(20),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (!apiKey) {
          throw new Error("GEMINI_API_KEY is not configured");
        }

        const system = await buildSystemPrompt();

        const result = await generateText({
          model: google(GEMINI_MODEL),
          system,
          messages: input.messages,
          maxOutputTokens: 600,
        });

        return { reply: result.text };
      } catch (err) {
        console.error("Nitro Gemini API error:", err);

        const classified = classifyAiError(err);

        return {
          reply: null,
          error: classified.name as
            | "AiUnavailable"
            | "ContentRejected"
            | "AiMisconfigured"
            | "AiInvalidRequest"
            | "AiTransient",
        };
      }
    }),
});