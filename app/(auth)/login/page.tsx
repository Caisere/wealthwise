"use client";


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";
import { Field } from "@/app/components/form/field";
import { SignInWithGoogleBtn } from "@/app/components/form/signin-with-google-btn";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <AuthPanel title="Welcome back" sub="Sign in to your WealthWise account">
      <SignInWithGoogleBtn />
      <div className="flex items-center gap-3 mb-6">
        <div style={{ flex: 1, height: 1, background: T.bdr }} />
        <span style={{ fontSize: 12, color: T.di }}>or with email</span>
        <div style={{ flex: 1, height: 1, background: T.bdr }} />
      </div>
      <Field
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="✉"
      />
      <Field
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="🔒"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <div className="text-right mb-6">
        <Link href="/forgot-password" style={{ fontSize: 13, color: T.G }}>
          Forgot password?
        </Link>
      </div>
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          background: `linear-gradient(135deg,${T.GM},${T.GD})`,
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          boxShadow: `0 4px 20px ${T.G}30`,
        }}
      >
        {loading ? "Signing in..." : "Sign in →"}
      </button>
      <p className="mt-6 text-center text-sm text-gray-500">
        No account?{" "}
        <Link href="/register" style={{ color: T.G, fontWeight: 600 }}>
          Create one free
        </Link>
      </p>
    </AuthPanel>
  );
}
