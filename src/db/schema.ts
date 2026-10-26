import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  plan: text("plan").notNull(),
  coupon: text("coupon"),
  amountCents: integer("amount_cents").notNull(),
  country: text("country").notNull().default("US"),
  status: text("status").notNull().default("paid"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;