import { CashFlow } from "@/app/components/dashboard/cash-flow";
import { SpendingSplit } from "@/app/components/dashboard/spending-split";
import { RecentTransactions } from "@/app/components/dashboard/recent-transactions";
import { BudgetStatus } from "@/app/components/dashboard/budget-status";
import { Stats } from "@/app/components/dashboard/stats";
import { getUserSession } from "@/app/lib/getUserSession";
import { UserGreeting } from "@/app/components/dashboard/user-greeting";

export default async function DashboardPage() {
  const session = await getUserSession();
  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <UserGreeting>{session?.name}</UserGreeting>
      </div>

      <Stats />

      <div className="grid gap-5 mb-5 grid-cols-[1fr_300px]">
        <CashFlow />

        <SpendingSplit />
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-5">
        <RecentTransactions />

        <BudgetStatus />
      </div>
    </div>
  );
}
