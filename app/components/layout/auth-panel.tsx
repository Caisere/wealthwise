import Link from "next/link";
import { ReactNode } from "react";
import { T } from "@/app/lib/theme";

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
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex" }}>
      {/* Glow */}
      <div
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          top: 0,
          left: "30%",
          background:
            "radial-gradient(circle,rgba(74,222,128,0.08),transparent)",
          transform: "translate(-50%,-50%)",
        }}
      />

      {/* Left panel */}
      <div
        style={{
          width: "42%",
          background: "linear-gradient(160deg,#0a1a12,#060a12)",
          borderRight: `1px solid ${T.bdr}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg,${T.GM},${T.GD})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              fontFamily: T.FD,
            }}
          >
            ₩
          </div>
          <span
            style={{
              fontFamily: T.FD,
              fontWeight: 800,
              fontSize: 18,
              color: T.tx,
            }}
          >
            WealthWise
          </span>
        </Link>
        <div>
          <p
            style={{
              fontSize: 13,
              color: T.G,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Personal Finance OS
          </p>
          <h2
            style={{
              fontFamily: T.FD,
              fontSize: 36,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-1px",
              color: T.tx,
              marginBottom: 20,
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
        <div style={{ display: "flex", gap: 32 }}>
          {[
            ["12k+", "Users"],
            ["₦2B+", "Tracked"],
            ["99.9%", "Uptime"],
          ].map(([n, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: T.FD,
                  fontSize: 22,
                  fontWeight: 800,
                  color: T.G,
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: 12, color: T.di }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="anim-fadeup" style={{ width: "100%", maxWidth: 420 }}>
          <h1
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
          <p style={{ fontSize: 14, color: T.mu, marginBottom: 32 }}>{sub}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
