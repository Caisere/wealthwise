import { ReactNode } from "react";
import { T } from "@/app/lib/theme";
import { AppLogo } from "./app-logo";

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
    <div
      className="min-h-screen flex flex-col justify-center sm:flex-row "
      style={{ background: T.bg }}
    >
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
        className="w-5/12 hidden sm:flex flex-col justify-between p-12 relative z-10"
        style={{
          background: "linear-gradient(160deg,#0a1a12,#060a12)",
          borderRight: `1px solid ${T.bdr}`,
        }}
      >
        <AppLogo />
        <div>
          <p className="text-sm tracking-wide uppercase mb-4 font-semibold"
            style={{
              color: T.G,
            }}
          >
            Personal Finance OS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-wide leading-tight"
            style={{
              fontFamily: T.FD,
              color: T.tx,
            }}
          >
            Know where every
            <br />
            naira goes.
          </h2>
          <p style={{ fontSize: 15, color: T.mu, lineHeight: 1.8 }}>
            Track budgets, log transactions, and get real-time alerts — all in
            one clean dashboard.
          </p>
        </div>
        <div className="flex gap-8 w-[80%] justify-center" >
          {[
            { count: "12k+", label: "Users" },
            { count: "₦2B+", label: "Tracked" },
            { count: "99.9%", label: "Uptime" },
          ].map((el) => (
            <div key={el.label}>
              <div
                className="text-lg sm:text-2xl"
                style={{
                  fontFamily: T.FD,
                  fontSize: 22,
                  fontWeight: 800,
                  color: T.G,
                }}
              >
                {el.count}
              </div>
              <div style={{ fontSize: 12, color: T.di }}>{el.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center px-10 sm:p-10 relative z-10">
        <div className="anim-fadeup" style={{ width: "100%", maxWidth: 420 }}>
          <h1
            className="text-center sm:text-start"
            style={{
              fontFamily: T.FD,
              fontSize: 28,
              fontWeight: 800,
              color: T.tx,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h1>
          <p
            className="text-center sm:text-start"
            style={{ fontSize: 14, color: T.mu, marginBottom: 32 }}
          >
            {sub}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
