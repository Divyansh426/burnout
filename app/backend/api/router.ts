import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { eventsRouter } from "./events-router";
import { registrationsRouter } from "./registrations-router";
import { contentRouter } from "./content-router";
import { leaderboardRouter } from "./leaderboard-router";
import { uploadsRouter } from "./uploads-router";
import { chatRouter } from "./chat-router";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  events: eventsRouter,
  registrations: registrationsRouter,
  content: contentRouter,
  leaderboard: leaderboardRouter,
  uploads: uploadsRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
