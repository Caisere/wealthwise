import { ReactNode } from "react";
import { AppLogo } from "./app-logo";
import { SignInWithGoogleBtn } from "../form/signin-with-google-btn";

export default function AuthPanel({
  children,
  title,
  sub,
}: {
  children: ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:flex-row bg-bg">
      {/* Glow */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 top-0 left-[30%] transform -translate-y-1/2 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle,rgba(74,222,128,0.08),transparent)",
        }}
      />

      <div className="flex sm:hidden mx-auto flex-1">
        <AppLogo />
      </div>

      {/* Left panel */}
      <div
        className="w-5/12 hidden sm:flex flex-col justify-between p-12 relative z-10 border-r border-border"
        style={{
          background: "linear-gradient(160deg,#0a1a12,#060a12)",
        }}
      >
        <AppLogo />
        <div>
          <p className="text-sm tracking-wide uppercase mb-4 font-semibold text-brand">
            Personal Finance OS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-wide leading-tight font-display text-text">
            Know where every
            <br />
            naira goes.
          </h2>
          <p className="text-[15px] text-muted leading-[1.8]">
            Track budgets, log transactions, and get real-time alerts — all in
            one clean dashboard.
          </p>
        </div>
        <div className="flex gap-8 w-[80%] justify-center">
          {[
            { count: "12k+", label: "Users" },
            { count: "₦2B+", label: "Tracked" },
            { count: "99.9%", label: "Uptime" },
          ].map((el) => (
            <div key={el.label}>
              <div className="font-display text-[22px] font-extrabold text-brand">
                {el.count}
              </div>
              <div className="text-xs text-dim">{el.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center px-10 sm:p-10 relative z-10">
        <div className="anim-fadeup w-full max-w-[420px]">
          <h1 className="text-center sm:text-start font-display text-[28px] font-extrabold text-text mb-2 tracking-[-0.5px]">
            {title}
          </h1>
          <p className="text-center sm:text-start text-sm text-muted mb-8">
            {sub}
          </p>
          <SignInWithGoogleBtn />
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-dim">or with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
