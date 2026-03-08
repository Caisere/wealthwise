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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <AuthPanel title="Welcome back" sub="Sign in to your WealthWise account">
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
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="✉"
      />
      <Field
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="🔒"
      />
      <div style={{ textAlign: "right", marginBottom: 24 }}>
        <Link href="/auth/forgot-password" style={{ fontSize: 13, color: T.G }}>
          Forgot password?
        </Link>
      </div>
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
        }}
      >
        {loading ? "Signing in..." : "Sign in →"}
      </button>
      <p
        style={{
          textAlign: "center",
          fontSize: 14,
          color: T.mu,
          marginTop: 24,
        }}
      >
        No account?{" "}
        <Link href="/auth/register" style={{ color: T.G, fontWeight: 600 }}>
          Create one free
        </Link>
      </p>
    </AuthPanel>
  );
}
