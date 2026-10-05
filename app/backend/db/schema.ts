import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ---------- Hot events (announcements / sub-events shown on home & events page) ----------
export const hotEvents = mysqlTable("hot_events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  instagramReel: varchar("instagram_reel", { length: 512 }),
  posterImageKey: varchar("poster_image_key", { length: 512 }),
  eventDate: varchar("event_date", { length: 100 }),
  venue: varchar("venue", { length: 255 }),
  showOnHomepage: boolean("show_on_homepage").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type HotEvent = typeof hotEvents.$inferSelect;

// ---------- Team registrations ----------
export const registrations = mysqlTable("registrations", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id),
  teamName: varchar("team_name", { length: 255 }).notNull(),
  leaderName: varchar("leader_name", { length: 255 }).notNull(),
  leaderRoll: varchar("leader_roll", { length: 50 }).notNull(),
  leaderBranch: varchar("leader_branch", { length: 255 }).notNull(),
  leaderPhone: varchar("leader_phone", { length: 20 }).notNull(),
  secondMemberPhone: varchar("second_member_phone", { length: 20 }),
  leaderEmail: varchar("leader_email", { length: 320 }),
  member1Name: varchar("member1_name", { length: 255 }),
member1Roll: varchar("member1_roll", { length: 50 }),
member1Branch: varchar("member1_branch", { length: 255 }),

member2Name: varchar("member2_name", { length: 255 }),
member2Roll: varchar("member2_roll", { length: 50 }),
member2Branch: varchar("member2_branch", { length: 255 }),

member3Name: varchar("member3_name", { length: 255 }),
member3Roll: varchar("member3_roll", { length: 50 }),
member3Branch: varchar("member3_branch", { length: 255 }),

member4Name: varchar("member4_name", { length: 255 }),
member4Roll: varchar("member4_roll", { length: 50 }),
member4Branch: varchar("member4_branch", { length: 255 }),
  paymentScreenshotKey: varchar("payment_screenshot_key", { length: 512 }),
  transactionRef: varchar("transaction_ref", { length: 255 }),
  status: mysqlEnum("status", ["pending", "verified", "rejected"])
    .default("pending")
    .notNull(),
  adminNote: varchar("admin_note", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Registration = typeof registrations.$inferSelect;

// ---------- Sponsors ----------
export const sponsors = mysqlTable("sponsors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  tagline: varchar("tagline", { length: 255 }),
  link: varchar("link", { length: 512 }),
  logoUrl: varchar("logo_url", { length: 512 }),
  tier: mysqlEnum("tier", ["big", "small"]).default("small").notNull(),
  sortOrder: int("sort_order").default(0).notNull(),
});

export type Sponsor = typeof sponsors.$inferSelect;

// ---------- SAE team members (faculty & post holders) ----------
export const teamMembers = mysqlTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  post: varchar("post", { length: 255 }).notNull(),
  branch: varchar("branch", { length: 255 }),
  photoUrl: varchar("photo_url", { length: 512 }),
  instagram: varchar("instagram", { length: 255 }),
  linkedin: varchar("linkedin", { length: 512 }),
  email: varchar("email", { length: 320 }),
  groupName: mysqlEnum("group_name", ["faculty", "postholders"])
    .default("postholders")
    .notNull(),
  sortOrder: int("sort_order").default(0).notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;

// ---------- Website creators / mentors ----------
export const creators = mysqlTable("creators", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  branch: varchar("branch", { length: 255 }),
  post: varchar("post", { length: 255 }),
  photoUrl: varchar("photo_url", { length: 512 }),
  message: text("message"),
  instagram: varchar("instagram", { length: 512 }),
  linkedin: varchar("linkedin", { length: 512 }),
  kind: mysqlEnum("kind", ["mentor", "creator"]).default("creator").notNull(),
  sortOrder: int("sort_order").default(0).notNull(),
});

export type Creator = typeof creators.$inferSelect;

// ---------- Leaderboard (race scoring, max 325) ----------
export const leaderboardEntries = mysqlTable("leaderboard_entries", {
  id: serial("id").primaryKey(),
  teamName: varchar("team_name", { length: 255 }).notNull().unique(),
  prefinalQualified: boolean("prefinal_qualified").default(false).notNull(),
  prefinalPosition: int("prefinal_position").default(0).notNull(),
  prefinalPoints: int("prefinal_points").default(0).notNull(), // max 40 (25 + 15 bonus)
  finalQualified: boolean("final_qualified").default(false).notNull(),
  finalPosition: int("final_position").default(0).notNull(),
  finalPoints: int("final_points").default(0).notNull(), // max 100
  durability: int("durability").default(0).notNull(), // max 75
  manoeuvrability: int("manoeuvrability").default(0).notNull(), // max 50
  technical: int("technical").default(0).notNull(), // max 50
  mixedBonus: int("mixed_bonus").default(0).notNull(), // 0 or 10
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;

// ---------- Payment / UPI settings (single row, id = 1) ----------
export const paymentSettings = mysqlTable("payment_settings", {
  id: serial("id").primaryKey(),
  upiId: varchar("upi_id", { length: 255 }),
  accountNumber: varchar("account_number", { length: 100 }),
  ifsc: varchar("ifsc", { length: 20 }),
  bankName: varchar("bank_name", { length: 255 }),
  accountHolder: varchar("account_holder", { length: 255 }),
  qrImageKey: varchar("qr_image_key", { length: 512 }),
  registrationFee: varchar("registration_fee", { length: 50 }),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type PaymentSettings = typeof paymentSettings.$inferSelect;
