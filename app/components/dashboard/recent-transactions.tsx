import { RECENT_TX } from "@/app/lib/data";
import { fmt, T } from "@/app/lib/theme";
import Link from "next/link";

export function RecentTransactions() {
  return (
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
          href="/transactions"
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
  );
}
