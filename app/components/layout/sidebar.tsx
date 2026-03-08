"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "@/app/lib/theme";


const NAV = [
  { icon: "⊞", label: "Dashboard", href: "/dashboard" },
  { icon: "⇄", label: "Transactions", href: "/transactions" },
  { icon: "◎", label: "Budgets", href: "/budgets" },
  { icon: "◈", label: "Accounts", href: "/accounts" },
  { icon: "↗", label: "Analytics", href: "/analytics" },
  { icon: "⋆", label: "Upgrade", href: "/upgrade", accent: true },
  { icon: "⚙", label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const w = collapsed ? 68 : 236;

  return (
    <aside
      style={{
        width: w,
        flexShrink: 0,
        transition: "width .3s ease",
        background: "rgba(6,10,18,0.98)",
        borderRight: `1px solid ${T.bdr}`,
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 18px 24px",
          borderBottom: `1px solid ${T.bdr}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          overflow: "hidden",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            flexShrink: 0,
            background: `linear-gradient(135deg,${T.G},${T.GD})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 900,
            color: "#fff",
            fontFamily: T.FD,
          }}
        >
          ₩
        </div>
        {!collapsed && (
          <div>
            <div
              style={{
                fontFamily: T.FD,
                fontWeight: 800,
                fontSize: 16,
                color: T.tx,
                letterSpacing: "-0.3px",
              }}
            >
              WealthWise
            </div>
            <div
              style={{
                fontSize: 10,
                color: T.G,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              Finance OS
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {NAV.map(({ icon, label, href, accent }) => {
          const active =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className="nav-hover"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 12,
                textDecoration: "none",
                background: active ? `${T.G}14` : "transparent",
                color: active ? T.G : accent ? T.A : T.mu,
                fontWeight: active ? 600 : 400,
                fontSize: 13,
                transition: "all .15s",
                position: "relative",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {active && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 22,
                    borderRadius: 4,
                    background: T.G,
                  }}
                />
              )}
              <span style={{ fontSize: 17, flexShrink: 0 }}>{icon}</span>
              {!collapsed && <span>{label}</span>}
              {!collapsed && accent && !active && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 9,
                    background: `${T.A}20`,
                    color: T.A,
                    padding: "1px 6px",
                    borderRadius: 10,
                    fontWeight: 700,
                  }}
                >
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "16px 10px 0", borderTop: `1px solid ${T.bdr}` }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 12,
            background: T.inp,
            border: `1px solid ${T.bdr}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              flexShrink: 0,
              background: "linear-gradient(135deg,#1e3a2f,#4ade80)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            AO
          </div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.tx,
                  whiteSpace: "nowrap",
                }}
              >
                Adebayo Okafor
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: 20,
                  background: `${T.G}18`,
                  color: T.G,
                  border: `1px solid ${T.G}30`,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.6px",
                }}
              >
                Premium
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          top: 30,
          right: -12,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#0a111e",
          border: `1px solid ${T.bdA}`,
          color: T.G,
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        {collapsed ? "›" : "‹"}
      </button>
    </aside>
  );
}
