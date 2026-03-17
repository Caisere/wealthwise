import { relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  varchar,
  primaryKey,
  uniqueIndex,
  date,
  unique,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["FREE", "PREMIUM"]);

export const accountTypeEnum = pgEnum("account_type", [
  "BANK",
  "EMONEY",
  "CASH",
  "SAVINGS",
  "CREDIT",
]);
// GTBank = BANK, Opay = EMONEY, PiggyVest = SAVINGS, etc.

export const transactionTypeEnum = pgEnum("transaction_type", [
  "INCOME",
  "EXPENSE",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "ACTIVE",
  "CANCELLED",
  "PAST_DUE",
  "TRIALING",
]);

export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "MONTHLY",
  "YEARLY",
]);

const timeStamp = {
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(
    () => new Date(),
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// OAUTH ACCOUNTS
// Created for OAuth logins
// ─────────────────────────────────────────────────────────────────────────────

export const Accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    type: text("type").notNull(),

    provider: text("provider").notNull(),

    providerAccountId: text("provider_account_id").notNull(),

    refresh_token: text("refresh_token"),

    access_token: text("access_token"),

    expires_at: integer("expires_at"),

    token_type: text("token_type"),

    scope: text("scope"),

    id_token: text("id_token"),

    session_state: text("session_state"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// SESSIONS
// only needed when session is set to `strategy: "database"` in NextAuth config.
// ─────────────────────────────────────────────────────────────────────────────

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ─────────────────────────────────────────────────────────────────────────────
// VERIFICATION TOKENS
// Used for email sign-in (magic links) and email verification flows.
// ─────────────────────────────────────────────────────────────────────────────

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    // the email address the token was sent to

    token: text("token").notNull().unique(),

    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    // composite primary key: one active token per email at a time
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────────────────────────────────────
export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  image: text("image"),
  role: roleEnum("role").notNull().default("FREE"),
  stripeCustomerId: text("stripe_customer_id").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  ...timeStamp,
});

// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT
// ─────────────────────────────────────────────────────────────────────────────

export const userAccounts = pgTable(
  "user_accounts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    // e.g. "GTBank Savings", "Opay Wallet"

    type: accountTypeEnum("type").notNull(),
    // BANK | EMONEY | CASH | SAVINGS | CREDIT

    balance: numeric("balance", { precision: 15, scale: 2 })
      .default("0")
      .notNull(),
    // stored as high-precision decimal — never use float for money

    currency: text("currency").default("NGN").notNull(),

    requestId: text("request_id").notNull().unique(),
    // default to NGN for Nigerian users

    isArchived: boolean("is_archived").default(false).notNull(),
    // soft-delete: hide without losing history

    ...timeStamp,
  },
  (table) => ({
    accountUnique: uniqueIndex("user_account_unique").on(
      table.userId,
      table.name,
    ),
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export const categories = pgTable(
  "categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    name: text("name").notNull(), // e.g. "Food & Groceries"

    isDefault: boolean("is_default").default(false).notNull(),
    // true = seeded by the system on signup (Food, Rent, etc.)
    // false = user-created custom category

    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    idUserUnique: uniqueIndex("categories_id_user_id_unique").on(
      table.id,
      table.userId,
    ),
    uniqueUserCategoryName: unique().on(table.userId, table.name),
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// TRANSACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const transactions = pgTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  accountId: text("account_id")
    .notNull()
    .references(() => userAccounts.id, { onDelete: "cascade" }),
  // which account was debited/credited

  categoryId: text("category_id").references(() => categories.id, {
    // nullable: if category is deleted, tx stays but loses category
    // onDelete: "set null" keeps the transaction intact
    onDelete: "set null",
  }),

  type: transactionTypeEnum("type").notNull(),
  // INCOME or EXPENSE

  transactionId: text("transaction_id").notNull().unique(),

  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  // always stored as a positive number
  // the `type` field tells you direction (income vs expense)

  description: varchar("description", { length: 256 }).notNull(),
  // e.g. "Grocery — Shoprite"

  date: timestamp("date", { mode: "date" }).notNull(),
  // when the transaction actually happened (user-provided)

  isRecurring: boolean("is_recurring").default(false).notNull(),
  // true = Netflix, rent, salary — repeats monthly

  note: text("note"),
  // optional extra context the user can add

  ...timeStamp,
});

// ─────────────────────────────────────────────────────────────────────────────
// BUDGETS
// ─────────────────────────────────────────────────────────────────────────────

export const budgets = pgTable(
  "budgets",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    categoryId: text("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    // one budget per category per month

    monthlyLimit: numeric("monthly_limit", {
      precision: 15,
      scale: 2,
    }).notNull(),
    // e.g. 60000.00 for Food budget

    month: date("month").notNull(),
    // stored as "YYYY-MM" e.g. "2026-03"
    // makes it easy to query all budgets for a specific month

    alertAt: integer("alert_at").default(80).notNull(),
    // percentage at which to fire a budget alert
    // default 80 means: alert when 80% of limit is spent

    ...timeStamp,
  },
  (table) => ({
    // one budget per category per month per user — enforced at DB level
    userCategoryMonthUnique: uniqueIndex(
      "budgets_user_category_month_unique",
    ).on(table.userId, table.categoryId, table.month),

    // (categoryId, userId) -> categories(id, user_id), ON DELETE CASCADE
    // categoryOwnerFk: foreignKey({
    //   columns: [table.categoryId, table.userId],
    //   foreignColumns: [categories.id, categories.userId],
    //   // onDelete: "cascade",
    // }),
  }),
);

export const subscriptions = pgTable("subscriptions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  // unique: one active subscription per user at a time

  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  // the "sub_xxx" ID from Stripe — you'll use this to
  // cancel, pause, or update the subscription via Stripe API

  stripePriceId: text("stripe_price_id").notNull(),
  // the specific Stripe price object (monthly vs yearly plan)
  // e.g. "price_1Nabcd..." — links to your Stripe dashboard

  status: subscriptionStatusEnum("status").notNull(),
  // ACTIVE | CANCELLED | PAST_DUE | TRIALING
  // Stripe sends webhooks to keep this in sync

  plan: subscriptionPlanEnum("plan").notNull(),
  // MONTHLY (₦2,500/mo) or YEARLY (₦24,000/yr)

  currentPeriodStart: timestamp("current_period_start", {
    mode: "date",
  }).notNull(),

  currentPeriodEnd: timestamp("current_period_end", { mode: "date" }).notNull(),
  // the billing window — Stripe provides these
  // used to show "Renews April 8, 2026" in Settings

  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  // true = user cancelled but still has access until period ends
  // Stripe sets this when user hits "Cancel subscription"

  trialEnd: timestamp("trial_end", { mode: "date" }),
  // null if no trial; set to 7 days after signup for new users

  ...timeStamp,
});

//Relations

export const accountsRelations = relations(Accounts, ({ one }) => ({
  user: one(usersTable, {
    fields: [Accounts.userId],
    references: [usersTable.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessions.userId],
    references: [usersTable.id],
  }),
}));
// VerificationToken has no user relation — it only holds an email string,
// because the user may not exist yet when the token is created (signup flow)

export const usersRelations = relations(usersTable, ({ many, one }) => ({
  oauthAccounts: many(Accounts),
  sessions: many(sessions),
  accounts: many(userAccounts),
  transactions: many(transactions),
  categories: many(categories),
  budgets: many(budgets),
  subscription: one(subscriptions, {
    fields: [usersTable.id],
    references: [subscriptions.userId],
  }),
}));

export const userAccountsRelations = relations(
  userAccounts,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [userAccounts.userId],
      references: [usersTable.id],
    }),
    transactions: many(transactions),
  }),
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [categories.userId],
    references: [usersTable.id],
  }),
  transactions: many(transactions),
  budgets: many(budgets),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(usersTable, {
    fields: [transactions.userId],
    references: [usersTable.id],
  }),
  account: one(userAccounts, {
    fields: [transactions.accountId],
    references: [userAccounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const budgetsRelations = relations(budgets, ({ one }) => ({
  user: one(usersTable, {
    fields: [budgets.userId],
    references: [usersTable.id],
  }),
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(usersTable, {
    fields: [subscriptions.userId],
    references: [usersTable.id],
  }),
}));

// infered types
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Account = typeof userAccounts.$inferSelect;
export type NewAccount = typeof userAccounts.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
