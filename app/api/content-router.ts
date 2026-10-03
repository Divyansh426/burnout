import { asc } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { sponsors, teamMembers, creators } from "@db/schema";

export const contentRouter = createRouter({
  sponsors: publicQuery.query(async () => {
    return getDb().select().from(sponsors).orderBy(asc(sponsors.sortOrder), asc(sponsors.id));
  }),

  team: publicQuery.query(async () => {
    return getDb().select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id));
  }),

  creators: publicQuery.query(async () => {
    return getDb().select().from(creators).orderBy(asc(creators.sortOrder), asc(creators.id));
  }),
});
