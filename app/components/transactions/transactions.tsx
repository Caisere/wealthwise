"use client";

import { generateIcon } from "@/app/lib/nameAbbr";
import { TransactionType } from "@/app/lib/services";
import { fmt, T } from "@/app/lib/theme";
import { useState } from "react";

type TransactionProps = {
  transactions: TransactionType[];
};

export function Transactions({ transactions }: TransactionProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = transactions.filter((t) => {
    const resolvedCategoryName = t.categoryName ?? "Uncategorized";

    return (
      (filter === "ALL" || t.type === filter) &&
      (t.description.toLowerCase().includes(normalizedSearch) ||
        resolvedCategoryName.toLowerCase().includes(normalizedSearch))
    );
  });
  return (
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
        {["ALL", "INCOME", "EXPENSE"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f.toUpperCase())}
            aria-pressed={filter === f}
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
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
          padding: "8px 16px",
          marginBottom: 4,
        }}
      >
        {[
          "Description",
          "Category",
          "Account",
          "Date",
          "Amount",
          "Transaction ID",
        ].map((h) => (
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
        {filtered.map(
          (
            {
              id,
              description,
              categoryName,
              accountName,
              amount,
              type,
              date,
              transactionId,
            }, // icon
          ) => {
            const amountInNumber = +amount;
            const resolvedCategoryName = categoryName ?? "Uncategorized";
            const resolvedAccountName = accountName ?? "Unknown account";
            const icon = generateIcon(resolvedCategoryName);

            return (
              <div
                key={id}
                className="tx-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
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
                    {description}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: T.mu }}>
                  {resolvedCategoryName}
                </span>
                <span style={{ fontSize: 12, color: T.mu }}>
                  {resolvedAccountName}
                </span>
                <span style={{ fontSize: 12, color: T.di }}>
                  {date.toLocaleDateString()}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: type === "EXPENSE" ? T.R : T.tx,
                    textAlign: "center",
                  }}
                >
                  {type === "EXPENSE" ? "-" : "+"}
                  {fmt(amountInNumber)}
                </span>
                <span className="text-[13px] font-bold text-center">
                  {transactionId}
                </span>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
