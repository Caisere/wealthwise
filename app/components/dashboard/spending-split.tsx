import { fmt, generateBudgetColor, T } from "@/app/lib/theme";
import { SpendingPieChart } from "./charts";
import { getCatWithTransSum } from "@/app/lib/services";
import { getMonth } from "@/app/lib/nameAbbr";


export async function SpendingSplit () {
  const data = await getCatWithTransSum()
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.bdr}`,
        borderRadius: 18,
        padding: 24,
      }}
    >
      <p
        style={{
          fontSize: 11,
          color: T.di,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 4,
        }}
      >
        {getMonth()}
      </p>
      <h3
        style={{
          fontFamily: T.FD,
          fontSize: 17,
          fontWeight: 700,
          color: T.tx,
          marginBottom: 12,
        }}
      >
        Spending Split
      </h3>
      <SpendingPieChart data={data.userCatsWithTransSum} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          marginTop: 8,
        }}
      >
        {data.userCatsWithTransSum.map(({ name, total}) => {
          const color = generateBudgetColor(name)
          return (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                <span style={{ fontSize: 12, color: T.mu }}>{name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.tx }}>
                {fmt(Number(total))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}