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
    } & DefaultSession["user"];
    // ↑ & means merge — you're adding id and role
    // on top of the existing name, email, image
  }

  interface User extends DefaultUser {
      role: "FREE" | "PREMIUM";
      id: string;
      role: "FREE" | "PREMIUM";
      name: string | null;
      email: string;
      image: string | null;
      stripeCustomerId: string | null;
    // ↑ extend the User object returned from authorize()
    // so TypeScript knows role exists when you return it
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "FREE" | "PREMIUM";
    stripeCustomerId: string | null;
    picture: string | null;
    // ↑ extend the JWT token
    // so token.id and token.role don't throw TS errors
    // inside the jwt() callback
  }
}
// ```

// **Why you need all three — `Session`, `User`, and `JWT`:**
// ```
// authorize () => returns User  →  jwt() puts it in token  →  session() puts it in session
