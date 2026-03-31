import { T } from "@/app/lib/theme";
import { CashFlowChart } from "./charts";
import { getIncAndExpTrans } from "@/app/lib/services";

export async function CashFlow() {
  const monthlyIncAndExp = await getIncAndExpTrans()
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.bdr}`,
        borderRadius: 18,
        padding: 24,
      }}
    >
      <div className="flex justify-between items-center mb-5">
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
        <div className="flex gap-4 text-sm" >
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
      <CashFlowChart monthlyIncAndExp={monthlyIncAndExp} />
    </div>
  );
}
