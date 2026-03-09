"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";
import { Field } from "@/app/components/form/field";
import { SignInWithGoogleBtn } from "@/app/components/form/signin-with-google-btn";
import { PasswordHealth } from "@/app/components/form/password-health";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 5
        ? 1
        : form.password.length < 9
          ? 3
          : 5;
  const strengthLabel = ["", "Weak", "", "Fair", "", "Strong"][strength] ?? "";
  const strengthColor = strength >= 5 ? T.G : strength >= 3 ? T.A : T.R;

  return (
    <AuthPanel
      title="Create your account"
      sub="Free forever. No credit card required."
    >
      <SignInWithGoogleBtn />
      <div className="flex items-center gap-3 mb-6">
        <div style={{ flex: 1, height: 1, background: T.bdr }} />
        <span style={{ fontSize: 12, color: T.di }}>or with email</span>
        <div style={{ flex: 1, height: 1, background: T.bdr }} />
      </div>
      <Field
        label="Full name"
        placeholder="Adebayo Okafor"
        value={form.name}
        onChange={set("name")}
        icon="👤"
      />
      <Field
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={set("email")}
        icon="✉"
      />
      <Field
        label="Password"
        type={showPassword ? "text" : "password"}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={set("password")}
        icon="🔒"
      />
      {form.password.length > 0 && (
        <PasswordHealth
          strength={strength}
          strengthLabel={strengthLabel}
          strengthColor={strengthColor}
        />
      )}
      <button
        onClick={handleRegister}
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
          marginBottom: 12,
        }}
      >
        {loading ? "Creating account..." : "Create account →"}
      </button>
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: T.di,
          marginBottom: 8,
        }}
      >
        By signing up, you agree to our{" "}
        <span className="hover:underline" style={{ color: T.G, cursor: "pointer" }}>Terms</span> and{" "}
        <span className="hover:underline" style={{ color: T.G, cursor: "pointer" }}>Privacy Policy</span>
      </p>
      <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
        Already have an account?{" "}
        <Link className="hover:underline" href="/login" style={{ color: T.G, fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </AuthPanel>
  );
}
