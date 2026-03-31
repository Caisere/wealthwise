import { CashFlow } from "@/app/components/dashboard/cash-flow";
import { SpendingSplit } from "@/app/components/dashboard/spending-split";
import { RecentTransactions } from "@/app/components/dashboard/recent-transactions";
import { BudgetStatus } from "@/app/components/dashboard/budget-status";
import { Stats } from "@/app/components/dashboard/stats";
import { getUserSession } from "@/app/lib/getUserSession";
import { UserGreeting } from "@/app/components/dashboard/user-greeting";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getUserSession();
  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div className="flex items-start mb-8">
        <UserGreeting>{session?.name}</UserGreeting>
      </div>

      <Stats />

      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <CashFlow />
        <SpendingSplit />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <RecentTransactions />
        <BudgetStatus />
      </div>
    </div>
  );
}
