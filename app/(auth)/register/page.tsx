"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";


function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          fontSize: 13,
          color: T.mu,
          display: "block",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 15,
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={(e) => (e.currentTarget.style.borderColor = T.bdA)}
          onBlur={(e) => (e.currentTarget.style.borderColor = T.bdr)}
          style={{
            width: "100%",
            padding: icon ? "12px 14px 12px 42px" : "12px 14px",
            background: T.inp,
            border: `1px solid ${T.bdr}`,
            borderRadius: 12,
            color: T.tx,
            fontSize: 14,
            transition: "border-color .2s",
          }}
        />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handle = () => {
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
      <button
        onClick={() => router.push("/dashboard")}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.bdA)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.bdr)}
        style={{
          width: "100%",
          padding: "12px",
          background: T.inp,
          border: `1px solid ${T.bdr}`,
          borderRadius: 12,
          color: T.tx,
          fontSize: 14,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontWeight: 500,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 700 }}>G</span> Continue with
        Google
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
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
        type="password"
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={set("password")}
        icon="🔒"
      />
      {form.password.length > 0 && (
        <div style={{ marginTop: -8, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 4,
                  background:
                    i <= strength ? strengthColor : "rgba(255,255,255,0.08)",
                  transition: "background .3s",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: T.di }}>
            Password strength:{" "}
            <span style={{ color: strengthColor }}>{strengthLabel}</span>
          </div>
        </div>
      )}
      <button
        onClick={handle}
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
        <span style={{ color: T.G, cursor: "pointer" }}>Terms</span> and{" "}
        <span style={{ color: T.G, cursor: "pointer" }}>Privacy Policy</span>
      </p>
      <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: T.G, fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </AuthPanel>
  );
}
