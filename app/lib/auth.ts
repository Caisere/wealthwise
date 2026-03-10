import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import {
  usersTable,
  Accounts,
  sessions,
  verificationTokens,
} from "@/db/schema";

export const authOptions:AuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: Accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }), 
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ]
}