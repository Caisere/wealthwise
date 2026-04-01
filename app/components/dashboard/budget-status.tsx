import { getMonth } from "@/app/lib/nameAbbr";
import { getBudgetStatusData } from "@/app/lib/services";
import { generateBudgetColor, T } from "@/app/lib/theme";
import { EmptyComponent } from "../layout/empty-component";
import { WalletIcon } from "lucide-react";

export async function BudgetStatus() {
  const budgetData = await getBudgetStatusData()
  const month = getMonth()
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
        <span style={{ fontSize: 12, color: T.di }}>{month}</span>
      </div>

      {budgetData.length > 0 ? (
        budgetData?.map(({ cat, spent, limit }) => {
          const pct = limit > 0 ? Math.round((spent / limit) * 100) : 0;
          const barPct = Math.min(100, Math.max(0, pct))
          const warn = pct >= 80;
          const color = generateBudgetColor(cat);
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
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: color,
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>
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
                    width: `${barPct}%`,
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
        })
      ) : (
        <section className="flex justify-center items-center h-full">
          <EmptyComponent
            icon={<WalletIcon />}
            title="No Budget Spending for this month yet"
            description="Set a budget to track where your money goes."
          />
        </section>
      )}
    </div>
  );
}
