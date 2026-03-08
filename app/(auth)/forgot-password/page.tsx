"use client";
import { useState } from "react";
import Link from "next/link";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthPanel
      title={sent ? "Check your inbox" : "Reset password"}
      sub={
        sent
          ? `We sent a reset link to ${email || "your email"}`
          : "Enter your email and we'll send you a reset link."
      }
    >
      {!sent ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 13,
                color: T.mu,
                display: "block",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              Email address
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 15,
                }}
              >
                ✉
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = T.bdA)}
                onBlur={(e) => (e.currentTarget.style.borderColor = T.bdr)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
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
          <button
            onClick={() => email && setSent(true)}
            style={{
              width: "100%",
              padding: "12px",
              background: email
                ? `linear-gradient(135deg,${T.GM},${T.GD})`
                : T.inp,
              border: "none",
              borderRadius: 12,
              color: email ? "#fff" : T.mu,
              fontSize: 14,
              fontWeight: 600,
              cursor: email ? "pointer" : "not-allowed",
              marginBottom: 20,
            }}
          >
            Send reset link
          </button>
          <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
            <Link href="/auth/login" style={{ color: T.G }}>
              ← Back to sign in
            </Link>
          </p>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>📬</div>
          <p
            style={{
              fontSize: 14,
              color: T.mu,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Didn&apos;t get it? Check your spam or{" "}
            <span
              style={{ color: T.G, cursor: "pointer" }}
              onClick={() => setSent(false)}
            >
              try again
            </span>
            .
          </p>
          <button
            onClick={() => setSent(false)}
            style={{
              width: "100%",
              padding: "12px",
              background: "transparent",
              border: `1px solid ${T.bdr}`,
              borderRadius: 12,
              color: T.mu,
              fontSize: 14,
              marginBottom: 12,
            }}
          >
            ← Try again
          </button>
          <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
            <Link href="/auth/login" style={{ color: T.G }}>
              ← Back to sign in
            </Link>
          </p>
        </div>
      )}
    </AuthPanel>
  );
}
