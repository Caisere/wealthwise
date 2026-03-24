import { StatCard } from "./start-card";

export function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6"
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
