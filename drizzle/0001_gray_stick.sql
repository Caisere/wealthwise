ALTER TABLE "user_accounts" ALTER COLUMN "request_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "transaction_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transaction_id_unique" UNIQUE("transaction_id");