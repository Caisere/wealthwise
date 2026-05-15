"use client";

import { useState } from "react";
import Link from "next/link";
import { T } from "@/app/lib/theme";
import AuthPanel from "@/app/components/layout/auth-panel";
import { Field } from "@/app/components/form/field";
import { ResetPasswordSchema, ResponseType } from "@/app/types";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  async function handleResetPassword(e: React.SubmitEvent) {
    e.preventDefault();

    setIsPending(true);
    try {
      const parsedEmail = ResetPasswordSchema.safeParse(email);

      if (!parsedEmail.success) {
        toast.error("Invalid email input");
        return;
      }
      const validEmail = parsedEmail.data;

      const request = await fetch("api/account/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ validEmail }),
      });

      const response: ResponseType = await request.json();

      if (!response.status) {
        toast.error(response.message);
      }
      console.log("successful");
      toast.success(
        "If email exists, link has been sent. check your email for reset link",
      );

      setEmail("");

      return;
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AuthPanel
      title={sent ? "Check your inbox" : "Reset password"}
      sub={
        sent
          ? `We sent a reset link to ${email || "your email"}`
          : "Enter your email and we'll send you a reset link."
      }
    >
      <form onSubmit={handleResetPassword}>
        <Field
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="✉"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`w-full p-3 rounded-lg text-sm border-0 mb-5 font-bold ${email ? "pointer" : "not-allowed"}`}
          style={{
            background: email
              ? `linear-gradient(135deg,${T.GM},${T.GD})`
              : T.inp,
          }}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-3">
              <Spinner />
              <p>Sending Reset Link</p>
            </div>
          ) : (
            "Send reset link"
          )}
        </button>

        <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
          <Link href="/login" style={{ color: T.G }}>
            ← Back to sign in
          </Link>
        </p>
      </form>
    </AuthPanel>
  );
}

// ) : (
//   <div className="text-center">
//     <div className="text-6xl mb-5">📬</div>
//     <p
//       className="mb-5 text-sm leading-1.5"
//       style={{
//         color: T.mu,
//       }}
//     >
//       Didn&apos;t get it? Check your spam or{" "}
//       <span
//         style={{ color: T.G, cursor: "pointer" }}
//         onClick={() => setSent(false)}
//       >
//         try again
//       </span>
//       .
//     </p>
//     <button
//       onClick={() => setSent(false)}
//       className="bg-transparent w-full p-3 rounded-lg text-sm border mb-5 cursor-pointer"
//       style={{
//         border: `1px solid ${T.bdr}`,
//         color: T.mu,
//       }}
//     >
//       ← Try again
//     </button>
//     <p style={{ textAlign: "center", fontSize: 14, color: T.mu }}>
//       <Link href="/login" style={{ color: T.G }}>
//         ← Back to sign in
//       </Link>
//     </p>
//   </div>
// )}
