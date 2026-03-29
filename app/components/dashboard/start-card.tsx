import { fmt, T } from "@/app/lib/theme";

export function StatCard({
  label,
  value,
  change,
  up,
  sub,
  lastMonth,
}: {
  label: string;
  value: number | string;
  change?: number | string;
  up?: boolean;
  sub: string;
  lastMonth?: number;
}) {
  return (
    <div
      className="card-hover"
      style={{
        background: T.card,
        border: `1px solid ${T.bdr}`,
        borderRadius: 18,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
        transition: "all .2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle,${up ? T.G : T.R}10,transparent)`,
        }}
      />
      <p
        style={{
          fontSize: 11,
          color: T.di,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: T.tx,
          fontFamily: T.FD,
          margin: "0 0 8px",
          letterSpacing: "-0.5px",
        }}
      >
        {fmt(Number(value))}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {label !== "Net Worth" && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 6,
              background: `${up ? T.G : T.R}15`,
              color: up ? T.G : T.R,
            }}
          >
            {up ? "↑" : "↓"} {change}%
          </span>
        )}
        <span style={{ fontSize: 11, color: T.di }}>{sub}</span>
      </div>
      {lastMonth && (
        <span className="mt-4 text-sm flex justify-end text-">
          {fmt(lastMonth)} → {fmt(Number(value))}
        </span>
      )}
    </div>
  );
}
