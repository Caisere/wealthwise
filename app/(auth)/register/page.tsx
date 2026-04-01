import Link from "next/link";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";
import { RegisterForm } from "@/app/components/form/register-form";
import { type Route } from "next";

const ROUTES = {
  terms: "/terms",
  privacy: "/privacy",
  login: "/login",
};

export default function RegisterPage() {
  return (
    <AuthPanel
      title="Create your account"
      sub="Free forever. No credit card required."
    >
      <RegisterForm />
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: T.di,
          marginBottom: 8,
        }}
      >
        By signing up, you agree to our{" "}
        <Link
          href={ROUTES.terms as Route}
          className="hover:underline cursor-pointer"
          style={{ color: T.G }}
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href={ROUTES.privacy as Route}
          className="hover:underline cursor-pointer"
          style={{ color: T.G }}
        >
          Privacy Policy
        </Link>
      </p>
      <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
        Already have an account?{" "}
        <Link
          className="hover:underline"
          href={ROUTES.login as Route}
          style={{ color: T.G, fontWeight: 600 }}
        >
          Sign in
        </Link>
      </p>
    </AuthPanel>
  );
}
