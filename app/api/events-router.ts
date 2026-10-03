import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { hotEvents } from "@db/schema";
import { storage } from "./lib/storage";
import { storageUrl } from "./lib/storage-url";

export const eventsRouter = createRouter({
  // All events, newest first (Events page)
  list: publicQuery.query(async () => {
    const rows = await getDb().select().from(hotEvents).orderBy(desc(hotEvents.createdAt));
    return Promise.all(rows.map(async (e) => ({ ...e, posterUrl: await storageUrl(e.posterImageKey) })));
  }),

  // Homepage picks
  homepage: publicQuery.query(async () => {
    const rows = await getDb()
      .select()
      .from(hotEvents)
      .where(eq(hotEvents.showOnHomepage, true))
      .orderBy(desc(hotEvents.createdAt));
    return Promise.all(rows.map(async (e) => ({ ...e, posterUrl: await storageUrl(e.posterImageKey) })));
  }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(2).max(255),
        description: z.string().min(2),
        instagramReel: z.string().url().optional().or(z.literal("")),
        eventDate: z.string().max(100).optional(),
        venue: z.string().max(255).optional(),
        showOnHomepage: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const [row] = await getDb().insert(hotEvents).values({
        name: input.name,
        description: input.description,
        instagramReel: input.instagramReel || null,
        eventDate: input.eventDate || null,
        venue: input.venue || null,
        showOnHomepage: input.showOnHomepage,
      });
      return { id: Number(row.insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(2).max(255).optional(),
        description: z.string().min(2).optional(),
        instagramReel: z.string().url().optional().or(z.literal("")),
        eventDate: z.string().max(100).optional(),
        venue: z.string().max(255).optional(),
        showOnHomepage: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...patch } = input;
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(patch)) if (v !== undefined) clean[k] = v === "" ? null : v;
      await getDb().update(hotEvents).set(clean).where(eq(hotEvents.id, id));
      return { ok: true };
    }),

  remove: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const db = getDb();
    const [row] = await db.select().from(hotEvents).where(eq(hotEvents.id, input.id));
    if (row?.posterImageKey) {
      try { await storage.deleteFile({ fileKey: row.posterImageKey }); } catch { /* ignore */ }
    }
    await db.delete(hotEvents).where(eq(hotEvents.id, input.id));
    return { ok: true };
  }),
});
