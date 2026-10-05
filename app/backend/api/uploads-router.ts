import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { saveLocalImage } from "./lib/local-storage";
import { getDb } from "./queries/connection";
import { hotEvents, paymentSettings } from "@db/schema";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const uploadInput = z.object({
  fileName: z.string().min(1).max(255),
  contentBase64: z.string().min(1),
  contentType: z.string().regex(/^image\//, "Only image uploads are allowed"),
});

async function decodeImage(input: z.infer<typeof uploadInput>) {
  const bytes = Buffer.from(input.contentBase64, "base64");

  if (bytes.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Image cannot be empty",
    });
  }

  if (bytes.length > MAX_BYTES) {
    throw new TRPCError({
      code: "PAYLOAD_TOO_LARGE",
      message: "Image must be under 5 MB",
    });
  }

  try {
    return await saveLocalImage(
      input.fileName,
      bytes,
      input.contentType,
    );
  } catch {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Unable to save image. Use a valid JPG, PNG, WebP, or GIF image.",
    });
  }
}

export const uploadsRouter = createRouter({
  // Payment screenshot for a registration (any signed-in user)
  paymentScreenshot: authedQuery.input(uploadInput).mutation(async ({ input }) => {
    const saved = await decodeImage(input);
    return { key: saved.key };
  }),

  // Event poster (admin), optionally attach directly to an event
  eventPoster: adminQuery
    .input(uploadInput.extend({ eventId: z.number().optional() }))
    .mutation(async ({ input }) => {
      const saved = await decodeImage(input);
      if (input.eventId) {
        await getDb()
          .update(hotEvents)
          .set({ posterImageKey: saved.key })
          .where(eq(hotEvents.id, input.eventId));
      }
      return { key: saved.key };
    }),

  // UPI QR code image (admin)
  paymentQr: adminQuery.input(uploadInput).mutation(async ({ input }) => {
    const saved = await decodeImage(input);
    const db = getDb();
    const [existing] = await db.select().from(paymentSettings).limit(1);
    if (existing) {
      await db.update(paymentSettings).set({ qrImageKey: saved.key }).where(eq(paymentSettings.id, existing.id));
    } else {
      await db.insert(paymentSettings).values({ qrImageKey: saved.key });
    }
    return { key: saved.key };
  }),
});
