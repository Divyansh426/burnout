import { z } from "zod";
import { asc, desc, eq, sql } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { leaderboardEntries } from "@db/schema";

const totalExpr = sql<number>`(${leaderboardEntries.prefinalPoints} + ${leaderboardEntries.finalPoints} + ${leaderboardEntries.durability} + ${leaderboardEntries.manoeuvrability} + ${leaderboardEntries.technical} + ${leaderboardEntries.mixedBonus})`;

const entryInput = z.object({
  teamName: z.string().min(2).max(255),
  prefinalQualified: z.boolean().default(false),
  prefinalPosition: z.number().int().min(0).default(0),
  prefinalPoints: z.number().int().min(0).max(100).default(0),
  finalQualified: z.boolean().default(false),
  finalPosition: z.number().int().min(0).default(0),
  finalPoints: z.number().int().min(0).max(75).default(0),
  durability: z.number().int().min(0).max(50).default(0),
  manoeuvrability: z.number().int().min(0).max(50).default(0),
  technical: z.number().int().min(0).max(40).default(0),
  mixedBonus: z.number().int().min(0).max(10).default(0),
});

export const leaderboardRouter = createRouter({
  list: publicQuery.query(async () => {
    const rows = await getDb()
      .select()
      .from(leaderboardEntries)
      .orderBy(desc(totalExpr), asc(leaderboardEntries.teamName));
    return rows.map((r, i) => ({
      ...r,
      total:
        r.prefinalPoints +
        r.finalPoints +
        r.durability +
        r.manoeuvrability +
        r.technical +
        r.mixedBonus,
      rank: i + 1,
    }));
  }),

  upsert: adminQuery.input(entryInput).mutation(async ({ input }) => {
    const db = getDb();
    const [existing] = await db
      .select()
      .from(leaderboardEntries)
      .where(eq(leaderboardEntries.teamName, input.teamName))
      .limit(1);
    if (existing) {
      await db.update(leaderboardEntries).set(input).where(eq(leaderboardEntries.id, existing.id));
      return { id: existing.id, updated: true };
    }
    const [result] = await db.insert(leaderboardEntries).values(input);
    return { id: Number(result.insertId), updated: false };
  }),

  remove: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await getDb().delete(leaderboardEntries).where(eq(leaderboardEntries.id, input.id));
    return { ok: true };
  }),
});
