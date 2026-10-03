import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { registrations, paymentSettings } from "@db/schema";
import { storageUrl } from "./lib/storage-url";

const phoneRegex = /^\d{10}$/;

const registrationInput = z.object({
  teamName: z.string().min(2).max(255),
  leaderName: z.string().min(2).max(255),
  leaderRoll: z.string().min(2).max(50),
  leaderBranch: z.string().min(2).max(255),
  leaderPhone: z.string().regex(phoneRegex, "Enter a 10-digit phone number"),
  leaderEmail: z.string().email().optional().or(z.literal("")),
  member1Name: z.string().max(255).optional().or(z.literal("")),
  member1Roll: z.string().max(50).optional().or(z.literal("")),
  member2Name: z.string().max(255).optional().or(z.literal("")),
  member2Roll: z.string().max(50).optional().or(z.literal("")),
  member3Name: z.string().max(255).optional().or(z.literal("")),
  member3Roll: z.string().max(50).optional().or(z.literal("")),
  member4Name: z.string().max(255).optional().or(z.literal("")),
  member4Roll: z.string().max(50).optional().or(z.literal("")),
  paymentScreenshotKey: z.string().max(512).optional().or(z.literal("")),
  transactionRef: z.string().max(255).optional().or(z.literal("")),
});

export const registrationsRouter = createRouter({
  // Current user's own registration
  mine: authedQuery.query(async ({ ctx }) => {
    const [row] = await getDb()
      .select()
      .from(registrations)
      .where(eq(registrations.userId, ctx.user.id))
      .orderBy(desc(registrations.createdAt))
      .limit(1);
    if (!row) return null;
    return { ...row, paymentScreenshotUrl: await storageUrl(row.paymentScreenshotKey) };
  }),

  submit: authedQuery.input(registrationInput).mutation(async ({ ctx, input }) => {
    const db = getDb();
    const [existing] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.userId, ctx.user.id))
      .limit(1);
    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You already have a registration. Check My Registration for its status.",
      });
    }
    const emptyToNull = (v?: string) => (v ? v : null);
    const [result] = await db.insert(registrations).values({
      userId: ctx.user.id,
      teamName: input.teamName,
      leaderName: input.leaderName,
      leaderRoll: input.leaderRoll,
      leaderBranch: input.leaderBranch,
      leaderPhone: input.leaderPhone,
      leaderEmail: emptyToNull(input.leaderEmail),
      member1Name: emptyToNull(input.member1Name),
      member1Roll: emptyToNull(input.member1Roll),
      member2Name: emptyToNull(input.member2Name),
      member2Roll: emptyToNull(input.member2Roll),
      member3Name: emptyToNull(input.member3Name),
      member3Roll: emptyToNull(input.member3Roll),
      member4Name: emptyToNull(input.member4Name),
      member4Roll: emptyToNull(input.member4Roll),
      paymentScreenshotKey: emptyToNull(input.paymentScreenshotKey),
      transactionRef: emptyToNull(input.transactionRef),
    });
    return { id: Number(result.insertId) };
  }),

  // ---- Payment / UPI settings ----
  paymentSettings: publicQuery.query(async () => {
    const [row] = await getDb().select().from(paymentSettings).limit(1);
    if (!row) return null;
    return { ...row, qrUrl: await storageUrl(row.qrImageKey) };
  }),

  updatePaymentSettings: adminQuery
    .input(
      z.object({
        upiId: z.string().max(255).optional().or(z.literal("")),
        accountNumber: z.string().max(100).optional().or(z.literal("")),
        ifsc: z.string().max(20).optional().or(z.literal("")),
        bankName: z.string().max(255).optional().or(z.literal("")),
        accountHolder: z.string().max(255).optional().or(z.literal("")),
        registrationFee: z.string().max(50).optional().or(z.literal("")),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [existing] = await db.select().from(paymentSettings).limit(1);
      const values = {
        upiId: input.upiId || null,
        accountNumber: input.accountNumber || null,
        ifsc: input.ifsc || null,
        bankName: input.bankName || null,
        accountHolder: input.accountHolder || null,
        registrationFee: input.registrationFee || null,
      };
      if (existing) {
        await db.update(paymentSettings).set(values).where(eq(paymentSettings.id, existing.id));
      } else {
        await db.insert(paymentSettings).values(values);
      }
      return { ok: true };
    }),

  // ---- Admin review ----
  listAll: adminQuery.query(async () => {
    const rows = await getDb().select().from(registrations).orderBy(desc(registrations.createdAt));
    return Promise.all(
      rows.map(async (r) => ({ ...r, paymentScreenshotUrl: await storageUrl(r.paymentScreenshotKey) }))
    );
  }),

  review: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "verified", "rejected"]),
        adminNote: z.string().max(512).optional().or(z.literal("")),
      })
    )
    .mutation(async ({ input }) => {
      await getDb()
        .update(registrations)
        .set({ status: input.status, adminNote: input.adminNote || null })
        .where(eq(registrations.id, input.id));
      return { ok: true };
    }),
});
