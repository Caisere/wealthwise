"use client";
import { AddTransactionModal } from "@/app/components/modals";
import { fmt, T } from "@/app/lib/theme";
import { useState } from "react";


const ALL_TX = [
  {
    id: 1,
    desc: "Grocery — Shoprite",
    cat: "Food",
    account: "GTBank",
    amount: -8500,
    date: "Mar 8, 2026",
    icon: "🛒",
    type: "expense",
  },
  {
    id: 2,
    desc: "March Salary",
    cat: "Income",
    account: "GTBank",
    amount: 420000,
    date: "Mar 8, 2026",
    icon: "💰",
    type: "income",
  },
  {
    id: 3,
    desc: "Uber to VI",
    cat: "Transport",
    account: "Opay",
    amount: -2300,
    date: "Mar 7, 2026",
    icon: "🚗",
    type: "expense",
  },
  {
    id: 4,
    desc: "Netflix Subscription",
    cat: "Entertainment",
    account: "Opay",
    amount: -4600,
    date: "Mar 5, 2026",
    icon: "🎬",
    type: "expense",
  },
  {
    id: 5,
    desc: "EKEDC Electricity",
    cat: "Utilities",
    account: "Cash",
    amount: -15000,
    date: "Mar 4, 2026",
    icon: "⚡",
    type: "expense",
  },
  {
    id: 6,
    desc: "Freelance Payment",
    cat: "Income",
    account: "GTBank",
    amount: 75000,
    date: "Mar 3, 2026",
    icon: "💼",
    type: "income",
  },
  {
    id: 7,
    desc: "Mr Biggs — Dinner",
    cat: "Food",
    account: "Opay",
    amount: -3800,
    date: "Mar 2, 2026",
    icon: "🍔",
    type: "expense",
  },
  {
    id: 8,
    desc: "Danfo — Ikeja",
    cat: "Transport",
    account: "Cash",
    amount: -200,
    date: "Mar 1, 2026",
    icon: "🚌",
    type: "expense",
  },
  {
    id: 9,
    desc: "Rent — March",
    cat: "Rent",
    account: "GTBank",
    amount: -80000,
    date: "Mar 1, 2026",
    icon: "🏠",
    type: "expense",
  },
  {
    id: 10,
    desc: "Spotify",
    cat: "Entertainment",
    account: "Opay",
    amount: -2900,
    date: "Feb 28, 2026",
    icon: "🎵",
    type: "expense",
  },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAddTx, setShowAddTx] = useState(false);

  const filtered = ALL_TX.filter(
    (t) =>
      (filter === "all" || t.type === filter) &&
      (t.desc.toLowerCase().includes(search.toLowerCase()) ||
        t.cat.toLowerCase().includes(search.toLowerCase())),
  );

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
            Transactions
          </h1>
          <p style={{ fontSize: 14, color: T.mu }}>
            {filtered.length} transactions found
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

      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 24,
        }}
      >
        {/* Search + Filter */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 15,
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              style={{
                width: "100%",
                padding: "11px 14px 11px 42px",
                background: T.inp,
                border: `1px solid ${T.bdr}`,
                borderRadius: 12,
                color: T.tx,
                fontSize: 14,
              }}
            />
          </div>
          {["all", "income", "expense"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                border: "none",
                fontSize: 13,
                background: filter === f ? `${T.G}18` : T.inp,
                color: filter === f ? T.G : T.mu,
                fontWeight: filter === f ? 600 : 400,
                textTransform: "capitalize",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            padding: "8px 16px",
            marginBottom: 4,
          }}
        >
          {["Description", "Category", "Account", "Date", "Amount"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 11,
                color: T.di,
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                fontWeight: 600,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div style={{ borderTop: `1px solid ${T.bdr}` }}>
          {filtered.map(({ id, desc, cat, account, amount, date, icon }) => (
            <div
              key={id}
              className="tx-row"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                padding: "13px 16px",
                borderBottom: `1px solid rgba(255,255,255,0.04)`,
                alignItems: "center",
                borderRadius: 8,
                transition: "background .15s",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: T.inp,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>
                  {desc}
                </span>
              </div>
              <span style={{ fontSize: 12, color: T.mu }}>{cat}</span>
              <span style={{ fontSize: 12, color: T.mu }}>{account}</span>
              <span style={{ fontSize: 12, color: T.di }}>{date}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: amount > 0 ? T.G : T.tx,
                  textAlign: "right",
                }}
              >
                {amount > 0 ? "+" : "−"}
                {fmt(amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showAddTx && <AddTransactionModal onClose={() => setShowAddTx(false)} />}
    </div>
  );
}
