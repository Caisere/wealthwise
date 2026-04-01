import { getTime } from "@/app/lib/nameAbbr";
import { getTransactions } from "@/app/lib/services";
import { fmt, generateBudgetIcon, T } from "@/app/lib/theme";
import Link from "next/link";
import { EmptyComponent } from "../layout/empty-component";
import { Receipt } from "lucide-react";

export async function RecentTransactions() {

  const recent = await getTransactions(5);

  const recentTransactionData = recent.map((trans) => ({
    id: trans.id,
    desc: trans.description,
    cat: trans.categoryName,
    account: trans.accountName,
    amount: Number(trans.amount),
    date: getTime(trans.createdAt),
    icon: generateBudgetIcon(trans.categoryName as string),
    type: trans.type,
  }));

  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.bdr}`,
        borderRadius: 18,
        padding: 24,
      }}
    >
      <div className="flex justify-between items-center mb-4">
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
      {recentTransactionData.length > 0 ? (
        recentTransactionData.map(
          ({ id, desc, cat, account, amount, date, icon, type }) => (
            <div
              key={id}
              className="tx-row flex items-center gap-3 py-2.5 px-3 rounded-sm transition-colors duration-150 border-b"
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
                    color: type === "INCOME" ? T.G : T.R,
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
          ),
        )
      ) : (
        <EmptyComponent 
          icon={<Receipt />}
          title="No Recent Transactions"
          description="Most recent transactions will be displayed here!"
        />
      )}
    </div>
  );
}
