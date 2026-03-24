import { T } from "@/app/lib/theme";
import { CashFlowChart } from "./charts";

export function CashFlow() {
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
  );
}
