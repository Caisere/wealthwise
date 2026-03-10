// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "FREE" | "PREMIUM";
      name: string | null;
      email: string;
      image: string | null;
      stripeCustomerId: string | null;
    } & DefaultSession["user"]; // adding id and role on top of the existing name, email, image
  }

  interface User extends DefaultUser {
    // extend the User object returned from authorize() so TypeScript knows role exists when you return it
    id: string;
    role: "FREE" | "PREMIUM";
    name: string | null;
    email: string;
    image: string | null;
    stripeCustomerId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // extend the JWT token so token.id and token.role don't throw TS errors inside the jwt() callback
    id: string;
    role: "FREE" | "PREMIUM";
    stripeCustomerId: string | null;
    picture: string | null;
  }
}
