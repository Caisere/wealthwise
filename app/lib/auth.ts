import { db } from "@/db";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePassword } from "./helper";

const credentialsSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    ),
  password: z.string().min(8),
});

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          //validate user input first before db call
          const userInputValidation = credentialsSchema.safeParse(credentials);

          if (!userInputValidation.success) {
            throw new Error(userInputValidation.error.message);
          }

          const { email, password } = userInputValidation.data;

          const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          const isValidPassword = await comparePassword(
            password,
            user.password,
          );

          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            stripeCustomerId: user.stripeCustomerId,
          };
        } catch (error) {
          console.error("authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // manually handle google user creation
        const existing = await db.query.usersTable.findFirst({
          where: eq(usersTable.email, user.email!),
        });

        if (!existing) {
          // create user if it their first time signing in with the google information
          await db.insert(usersTable).values({
            id: user.id!,
            name: user.name!,
            email: user.email!,
            image: user.image,
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          // fetch fresh from DB to get role,
          const dbUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, token.email!),
          });

          if (dbUser) {
            token.id = dbUser!.id;
            token.role = dbUser!.role;
            token.email = dbUser!.email;
            token.name = dbUser!.name;
            token.picture = dbUser!.image;
            token.stripeCustomerId = dbUser!.stripeCustomerId;
          }

        } else {
          token.id = user?.id;
          token.role = user?.role;
          token.email = user?.email;
          token.name = user?.name;
          token.picture = user?.image;
          token.stripeCustomerId = user?.stripeCustomerId;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};
