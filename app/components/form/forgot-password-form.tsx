"use client";

import { useState } from "react";
import Link from "next/link";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";
import { Field } from "@/app/components/form/field";

export function ForgotPasswordForm () {
    const [email, setEmail] = useState<string>("");
    const [sent, setSent] = useState<boolean>(false);

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
        <form>
          <Field
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="✉"
          />
          <button
            onClick={() => email && setSent(true)}
            className={`w-full p-3 rounded-lg text-sm border-0 mb-5 font-bold ${email ? "pointer" : "not-allowed"}`}
            style={{
              background: email
                ? `linear-gradient(135deg,${T.GM},${T.GD})`
                : T.inp,
            }}
          >
            Send reset link
          </button>
          <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
            <Link href="/login" style={{ color: T.G }}>
              ← Back to sign in
            </Link>
          </p>
        </form>
      ) : (
        <div className="text-center">
          <div className="text-6xl mb-5">📬</div>
          <p
            className="mb-5 text-sm leading-1.5"
            style={{
              color: T.mu,
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
            className="bg-transparent w-full p-3 rounded-lg text-sm border mb-5 cursor-pointer"
            style={{
              border: `1px solid ${T.bdr}`,
              color: T.mu,
            }}
          >
            ← Try again
          </button>
          <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
            <Link href="/login" style={{ color: T.G }}>
              ← Back to sign in
            </Link>
          </p>
        </div>
      )}
    </AuthPanel>
  );
}