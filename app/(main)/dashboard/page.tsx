"use client";
import { useState } from "react";
import Link from "next/link";


import { fmt, T } from "../../lib/theme";
import { CashFlowChart, SpendingPieChart } from "../../components/dashboard/charts";
import { PIE_DATA } from "../../lib/data";
import { AddTransactionModal } from "../../components/modals";


const RECENT_TX = [
  {
    id: 1,
    desc: "Grocery — Shoprite",
    cat: "Food",
    account: "GTBank",
    amount: -8500,
    date: "Today, 2:14 PM",
    icon: "🛒",
  },
  {
    id: 2,
    desc: "March Salary",
    cat: "Income",
    account: "GTBank",
    amount: 420000,
    date: "Today, 8:00 AM",
    icon: "💰",
  },
  {
    id: 3,
    desc: "Uber to VI",
    cat: "Transport",
    account: "Opay",
    amount: -2300,
    date: "Yesterday",
    icon: "🚗",
  },
  {
    id: 4,
    desc: "Netflix Subscription",
    cat: "Entertainment",
    account: "Opay",
    amount: -4600,
    date: "Mar 5",
    icon: "🎬",
  },
  {
    id: 5,
    desc: "EKEDC Electricity",
    cat: "Utilities",
    account: "Cash",
    amount: -15000,
    date: "Mar 4",
    icon: "⚡",
  },
];

const BUDGETS = [
  { cat: "Food", spent: 42000, limit: 60000, color: T.G },
  { cat: "Transport", spent: 18000, limit: 20000, color: T.A },
  { cat: "Utilities", spent: 22000, limit: 25000, color: T.V },
  { cat: "Entertainment", spent: 9200, limit: 15000, color: T.B },
];

function StatCard({
  label,
  value,
  change,
  up,
  sub,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
  sub: string;
}) {
  return (
    <div
      className="card-hover"
      style={{
        background: T.card,
        border: `1px solid ${T.bdr}`,
        borderRadius: 18,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
        transition: "all .2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle,${up ? T.G : T.R}10,transparent)`,
        }}
      />
      <p
        style={{
          fontSize: 11,
          color: T.di,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: T.tx,
          fontFamily: T.FD,
          margin: "0 0 8px",
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: 6,
            background: `${up ? T.G : T.R}15`,
            color: up ? T.G : T.R,
          }}
        >
          {up ? "↑" : "↓"} {change}
        </span>
        <span style={{ fontSize: 11, color: T.di }}>{sub}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [showAddTx, setShowAddTx] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
        }}
      >
        <div>
          <p style={{ fontSize: 13, color: T.di, marginBottom: 4 }}>
            Sunday, March 8, 2026
          </p>
          <h1
            style={{
              fontFamily: T.FD,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              color: T.tx,
              margin: "0 0 4px",
            }}
          >
            Good morning, Adebayo 👋
          </h1>
          <p style={{ fontSize: 14, color: T.mu }}>
            Here&apos;s your financial overview for March.
          </p>
        </div>
        <button
          onClick={() => setShowAddTx(true)}
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
          + Add Transaction
        </button>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard
          label="Net Worth"
          value="₦1,284,500"
          change="+12.4%"
          up={true}
          sub="All accounts"
        />
        <StatCard
          label="Income (Mar)"
          value="₦420,000"
          change="+20%"
          up={true}
          sub="vs last month"
        />
        <StatCard
          label="Expenses (Mar)"
          value="₦178,000"
          change="−26%"
          up={false}
          sub="vs last month"
        />
        <StatCard
          label="Savings (Mar)"
          value="₦242,000"
          change="57.6%"
          up={true}
          sub="savings rate"
        />
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Cash flow */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: T.di,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  marginBottom: 4,
                }}
              >
                6-Month View
              </p>
              <h3
                style={{
                  fontFamily: T.FD,
                  fontSize: 17,
                  fontWeight: 700,
                  color: T.tx,
                }}
              >
                Cash Flow
              </h3>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              {[
                [T.G, "Income"],
                [T.R, "Expense"],
              ].map(([c, l]) => (
                <span
                  key={l}
                  style={{
                    color: c,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c,
                      display: "inline-block",
                    }}
                  />{" "}
                  {l}
                </span>
              ))}
            </div>
          </div>
          <CashFlowChart />
        </div>

        {/* Spending split */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: T.di,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: 4,
            }}
          >
            March
          </p>
          <h3
            style={{
              fontFamily: T.FD,
              fontSize: 17,
              fontWeight: 700,
              color: T.tx,
              marginBottom: 12,
            }}
          >
            Spending Split
          </h3>
          <SpendingPieChart />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7,
              marginTop: 8,
            }}
          >
            {PIE_DATA.map(({ name, value, color }) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: color,
                    }}
                  />
                  <span style={{ fontSize: 12, color: T.mu }}>{name}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.tx }}>
                  ₦{value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions + Budget */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}
      >
        {/* Recent transactions */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontFamily: T.FD,
                fontSize: 16,
                fontWeight: 700,
                color: T.tx,
              }}
            >
              Recent Transactions
            </h3>
            <Link
              href="/dashboard/transactions"
              style={{
                fontSize: 12,
                color: T.G,
                background: `${T.G}12`,
                padding: "5px 12px",
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              View all →
            </Link>
          </div>
          {RECENT_TX.map(({ id, desc, cat, account, amount, date, icon }) => (
            <div
              key={id}
              className="tx-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 12px",
                borderRadius: 12,
                transition: "background .15s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: T.inp,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.tx,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {desc}
                </p>
                <p style={{ fontSize: 11, color: T.di, margin: "2px 0 0" }}>
                  {cat} · {account}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    margin: 0,
                    color: amount > 0 ? T.G : T.tx,
                  }}
                >
                  {amount > 0 ? "+" : "−"}
                  {fmt(amount)}
                </p>
                <p style={{ fontSize: 11, color: T.di, margin: "2px 0 0" }}>
                  {date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Budget status */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: T.FD,
                fontSize: 16,
                fontWeight: 700,
                color: T.tx,
              }}
            >
              Budget Status
            </h3>
            <span style={{ fontSize: 12, color: T.di }}>March 2026</span>
          </div>
          {BUDGETS.map(({ cat, spent, limit, color }) => {
            const pct = Math.round((spent / limit) * 100);
            const warn = pct >= 80;
            return (
              <div key={cat} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: color,
                      }}
                    />
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: T.tx }}
                    >
                      {cat}
                    </span>
                    {warn && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "1px 6px",
                          borderRadius: 10,
                          background: `${T.A}18`,
                          color: T.A,
                          border: `1px solid ${T.A}30`,
                          textTransform: "uppercase" as const,
                        }}
                      >
                        Near limit
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: T.di }}>
                    ₦{spent.toLocaleString()} / ₦{limit.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: T.inp,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 10,
                      background: warn
                        ? `linear-gradient(90deg,${T.A},${T.R})`
                        : `linear-gradient(90deg,${color}90,${color})`,
                      transition: "width .8s ease",
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: T.di, marginTop: 3 }}>
                  {pct}% used · ₦{(limit - spent).toLocaleString()} left
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddTx && <AddTransactionModal onClose={() => setShowAddTx(false)} />}
    </div>
  );
}
