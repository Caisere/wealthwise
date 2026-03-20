import { AddBudgetBtn } from "@/app/components/budgets/add-budgets-btn";
import { BUDGETS } from "@/app/lib/data";
import { getCategories } from "@/app/lib/services";
import { T } from "@/app/lib/theme";

export default async function BudgetsPage() {
  const [ categories] = await Promise.all([
    getCategories(),
  ]);

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
            Budgets
          </h1>
          <p style={{ fontSize: 14, color: T.mu }}>
            March 2026 · {BUDGETS.length} active budgets
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select
            style={{
              padding: "10px 16px",
              background: T.inp,
              border: `1px solid ${T.bdr}`,
              borderRadius: 12,
              color: T.tx,
              fontSize: 13,
            }}
          >
            {["March 2026", "February 2026", "January 2026"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <AddBudgetBtn categories={categories} />
        </div>
      </div>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          ["Total Budgeted", "₦220,000", ""],
          ["Total Spent", "₦175,700", "79.9% used"],
          ["Remaining", "₦44,300", "Stay on track"],
        ].map(([l, v, s]) => (
          <div
            key={l}
            style={{
              background: T.card,
              border: `1px solid ${T.bdr}`,
              borderRadius: 16,
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: T.di,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 8,
              }}
            >
              {l}
            </p>
            <p
              style={{
                fontFamily: T.FD,
                fontSize: 24,
                fontWeight: 800,
                color: T.tx,
                marginBottom: 4,
              }}
            >
              {v}
            </p>
            {s && <p style={{ fontSize: 12, color: T.mu }}>{s}</p>}
          </div>
        ))}
      </div>

      {/* Budget cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 16,
        }}
      >
        {BUDGETS.map(({ cat, icon, spent, limit, color, txCount }) => {
          const pct = Math.round((spent / limit) * 100);
          const warn = pct >= 80;
          const over = pct >= 100;
          return (
            <div
              key={cat}
              className="card-hover"
              style={{
                background: T.card,
                border: `1px solid ${over ? T.R + "40" : warn ? T.A + "30" : T.bdr}`,
                borderRadius: 18,
                padding: 24,
                transition: "all .2s",
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
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: `${color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: T.FD,
                        fontSize: 16,
                        fontWeight: 700,
                        color: T.tx,
                        marginBottom: 2,
                      }}
                    >
                      {cat}
                    </h3>
                    <span style={{ fontSize: 11, color: T.di }}>
                      {txCount} transactions
                    </span>
                  </div>
                </div>
                {over && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: `${T.R}18`,
                      color: T.R,
                      border: `1px solid ${T.R}30`,
                      textTransform: "uppercase" as const,
                    }}
                  >
                    Over budget!
                  </span>
                )}
                {warn && !over && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: T.FD,
                    fontSize: 20,
                    fontWeight: 800,
                    color: T.tx,
                  }}
                >
                  ₦{spent.toLocaleString()}
                </span>
                <span
                  style={{ fontSize: 13, color: T.di, alignSelf: "flex-end" }}
                >
                  of ₦{limit.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  background: T.inp,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    height: "100%",
                    borderRadius: 10,
                    transition: "width .8s ease",
                    background: over
                      ? T.R
                      : warn
                        ? `linear-gradient(90deg,${T.A},${T.R})`
                        : `linear-gradient(90deg,${color}90,${color})`,
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: 12,
                    color: over ? T.R : warn ? T.A : T.di,
                    fontWeight: over || warn ? 600 : 400,
                  }}
                >
                  {pct}% used
                </span>
                <span style={{ fontSize: 12, color: T.di }}>
                  ₦{Math.max(0, limit - spent).toLocaleString()} remaining
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
