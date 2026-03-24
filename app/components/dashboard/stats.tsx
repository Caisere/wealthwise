import { StatCard } from "./start-card";

export function Stats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <StatCard
        label="Net Worth"
        value="₦1,284,500"
        change="+12.4%"
        up={true}
        sub="All accounts"
      />
      <StatCard
        label="Income (Mar)"
        value="₦420,000"
        change="+20%"
        up={true}
        sub="vs last month"
      />
      <StatCard
        label="Expenses (Mar)"
        value="₦178,000"
        change="−26%"
        up={false}
        sub="vs last month"
      />
      <StatCard
        label="Savings (Mar)"
        value="₦242,000"
        change="57.6%"
        up={true}
        sub="savings rate"
      />
    </div>
  );
}
