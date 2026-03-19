ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "user_id" DROP NOT NULL;