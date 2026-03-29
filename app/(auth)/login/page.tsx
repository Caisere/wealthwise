import Link from "next/link";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";
import { LoginForm } from "@/app/components/form/login-form";


export default function LoginPage() {
  return (
    <AuthPanel title="Welcome back" sub="Sign in to your WealthWise account">
      <LoginForm />
      <p className="mt-6 text-center text-sm text-gray-500">
        No account?{" "}
        <Link href="/register" style={{ color: T.G, fontWeight: 600 }}>
          Create one for free
        </Link>
      </p>
    </AuthPanel>
  );
}
