import { IncomeExpenseBarChart, SavingsRateChart } from "@/app/components/dashboard/charts";
import { T } from "@/app/lib/theme";


const STATS = [
  ["Avg. Income", "₦361,667", "Monthly"],
  ["Avg. Expense", "₦220,500", "Monthly"],
  ["Best Month", "December", "₦221k saved"],
  ["Savings Rate", "54.6%", "6-month avg"],
];

const CATS = [
  ["Food", "🛒", "₦189,400", T.G],
  ["Rent", "🏠", "₦480,000", T.B],
  ["Transport", "🚗", "₦68,200", T.A],
  ["Utilities", "⚡", "₦89,000", T.V],
  ["Entertainment", "🎬", "₦42,600", T.R],
  ["Health", "💊", "₦18,500", T.E],
];

export default function AnalyticsPage() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
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
          Analytics
        </h1>
        <p style={{ fontSize: 14, color: T.mu }}>
          6-month financial performance overview
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {STATS.map(([l, v, s]) => (
          <div
            key={l}
            style={{
              background: T.card,
              border: `1px solid ${T.bdr}`,
              borderRadius: 16,
              padding: "18px 20px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: T.di,
                textTransform: "uppercase",
                letterSpacing: "0.7px",
                marginBottom: 6,
              }}
            >
              {l}
            </p>
            <p
              style={{
                fontFamily: T.FD,
                fontSize: 20,
                fontWeight: 800,
                color: T.tx,
                marginBottom: 2,
              }}
            >
              {v}
            </p>
            <p style={{ fontSize: 11, color: T.mu }}>{s}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h3
            style={{
              fontFamily: T.FD,
              fontSize: 16,
              fontWeight: 700,
              color: T.tx,
              marginBottom: 20,
            }}
          >
            Income vs Expenses vs Savings
          </h3>
          <IncomeExpenseBarChart />
        </div>
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h3
            style={{
              fontFamily: T.FD,
              fontSize: 16,
              fontWeight: 700,
              color: T.tx,
              marginBottom: 20,
            }}
          >
            Monthly Savings Rate (%)
          </h3>
          <SavingsRateChart />
        </div>
      </div>

      {/* Category breakdown */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 24,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 16,
            fontWeight: 700,
            color: T.tx,
            marginBottom: 20,
          }}
        >
          Spending by Category — 6 Months
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap: 12,
          }}
        >
          {CATS.map(([cat, icon, total, color]) => (
            <div
              key={cat}
              style={{
                background: T.inp,
                borderRadius: 14,
                padding: "16px 14px",
                textAlign: "center",
                border: `1px solid ${T.bdr}`,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 11, color: T.di, marginBottom: 4 }}>
                {cat}
              </div>
              <div
                style={{
                  fontFamily: T.FD,
                  fontSize: 14,
                  fontWeight: 700,
                  color: color as string,
                }}
              >
                {total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
