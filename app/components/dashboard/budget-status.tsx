import { BUDGETS } from "@/app/lib/data";
import { T } from "@/app/lib/theme";

export function BudgetStatus() {
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
  );
}
