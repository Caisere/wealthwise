import { getTotalIncAndExp, getUserAccountData } from "@/app/lib/services";
import { StatCard } from "./start-card";
import { getMonth } from "@/app/lib/nameAbbr";

export async function Stats() {
  const [
    { totalBalanceResult },
    {
      totalIncomes,
      totalExpenses,
      percentageExpense,
      percentageIncome,
      lastMonthTotalExpenses,
      lastMonthTotalIncomes,
    },
  ] = await Promise.all([getUserAccountData(), getTotalIncAndExp()]);

  const savings = totalIncomes - totalExpenses;
  const percentageSavings =
    totalExpenses > 0
      ? Number(
          (((totalIncomes - totalExpenses) / totalExpenses) * 100).toFixed(2),
        )
      : 0;

  const currentMonth = getMonth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Net Worth"
        value={totalBalanceResult}
        // change="+12.4"
        // up={true}
        sub="All accounts"
      />
      <StatCard
        label={`Income (${currentMonth})`}
        value={totalIncomes}
        change={percentageIncome ?? 0}
        up={(percentageIncome ?? 0) > 0}
        sub="vs last month"
        lastMonth={lastMonthTotalIncomes}
      />
      <StatCard
        label={`Expenses (${currentMonth})`}
        value={totalExpenses}
        change={percentageExpense ?? 0}
        up={(percentageExpense ?? 0) > 0}
        sub="vs last month"
        lastMonth={lastMonthTotalExpenses}
      />
      <StatCard
        label={`Savings (${currentMonth})`}
        value={savings}
        change={percentageSavings}
        up={percentageSavings > 0}
        sub="savings rate"
      />
    </div>
  );
}
