CREATE TYPE "public"."account_type" AS ENUM('BANK', 'EMONEY', 'CASH', 'SAVINGS', 'CREDIT');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('FREE', 'PREMIUM');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('MONTHLY', 'YEARLY');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('ACTIVE', 'CANCELLED', 'PAST_DUE', 'TRIALING');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" "account_type" NOT NULL,
	"balance" numeric(15, 2) DEFAULT '0' NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"category_id" text NOT NULL,
	"monthly_limit" numeric(15, 2) NOT NULL,
	"month" text NOT NULL,
	"alert_at" integer DEFAULT 80 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"status" "subscription_status" NOT NULL,
	"plan" "subscription_plan" NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"trial_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "subscriptions_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"category_id" text,
	"type" "transaction_type" NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"description" varchar(256) NOT NULL,
	"date" timestamp NOT NULL,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"image" text,
	"role" "role" DEFAULT 'FREE' NOT NULL,
	"stripe_customer_id" text,
	"email_verified" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;