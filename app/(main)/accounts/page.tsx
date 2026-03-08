"use client";
import { AddAccountModal } from "@/app/components/modals";
import { T } from "@/app/lib/theme";
import { useState } from "react";


const ACCOUNTS = [
  {
    name: "GTBank Savings",
    type: "Bank",
    balance: 842500,
    icon: "🏦",
    color: T.G,
  },
  {
    name: "Opay Wallet",
    type: "E-Money",
    balance: 34200,
    icon: "📱",
    color: T.B,
  },
  {
    name: "Cash (Wallet)",
    type: "Cash",
    balance: 12800,
    icon: "💵",
    color: T.A,
  },
  {
    name: "PiggyVest",
    type: "Savings",
    balance: 395000,
    icon: "🐷",
    color: T.V,
  },
];

export default function AccountsPage() {
  const [showModal, setShowModal] = useState(false);
  const total = ACCOUNTS.reduce((s, a) => s + a.balance, 0);

  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: T.FD,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              color: T.tx,
              marginBottom: 4,
            }}
          >
            Accounts
          </h1>
          <p style={{ fontSize: 14, color: T.mu }}>
            {ACCOUNTS.length} accounts tracked
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "11px 22px",
            background: `linear-gradient(135deg,${T.GM},${T.GD})`,
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: `0 4px 20px ${T.G}30`,
          }}
        >
          + Add Account
        </button>
      </div>

      {/* Net worth hero */}
      <div
        style={{
          background: "linear-gradient(135deg,#0a1a0f,#060a12)",
          border: `1px solid ${T.bdA}`,
          borderRadius: 20,
          padding: 32,
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle,${T.G}15,transparent)`,
          }}
        />
        <p
          style={{
            fontSize: 13,
            color: T.G,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: 12,
          }}
        >
          Total Net Worth
        </p>
        <p
          style={{
            fontFamily: T.FD,
            fontSize: 48,
            fontWeight: 800,
            color: T.tx,
            letterSpacing: "-2px",
            marginBottom: 8,
          }}
        >
          ₦{total.toLocaleString()}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              background: `${T.G}18`,
              color: T.G,
              border: `1px solid ${T.G}30`,
              textTransform: "uppercase" as const,
            }}
          >
            ↑ 12.4% this month
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              background: `${T.mu}18`,
              color: T.mu,
              border: `1px solid ${T.mu}30`,
              textTransform: "uppercase" as const,
            }}
          >
            Across {ACCOUNTS.length} accounts
          </span>
        </div>
      </div>

      {/* Account cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 16,
        }}
      >
        {ACCOUNTS.map(({ name, type, balance, icon, color }) => (
          <div
            key={name}
            className="card-hover"
            style={{
              background: T.card,
              border: `1px solid ${T.bdr}`,
              borderRadius: 18,
              padding: 24,
              transition: "all .2s",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: `${color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: T.FD,
                      fontSize: 15,
                      fontWeight: 700,
                      color: T.tx,
                      marginBottom: 4,
                    }}
                  >
                    {name}
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: `${color}18`,
                      color,
                      border: `1px solid ${color}30`,
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {type}
                  </span>
                </div>
              </div>
              <button
                style={{
                  background: T.inp,
                  border: `1px solid ${T.bdr}`,
                  borderRadius: 8,
                  color: T.mu,
                  padding: "5px 10px",
                  fontSize: 12,
                }}
              >
                ···
              </button>
            </div>
            <p
              style={{
                fontFamily: T.FD,
                fontSize: 28,
                fontWeight: 800,
                color: T.tx,
                letterSpacing: "-1px",
                marginBottom: 4,
              }}
            >
              ₦{balance.toLocaleString()}
            </p>
            <p style={{ fontSize: 12, color: T.di }}>Available balance · NGN</p>
            <div style={{ height: 1, background: T.bdr, margin: "16px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: T.mu,
              }}
            >
              <span>Last 30 days</span>
              <span style={{ color: T.R }}>↓ ₦45,600 spent</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && <AddAccountModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
