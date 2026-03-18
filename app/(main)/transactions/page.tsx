import { AddTransactionBtn } from "@/app/components/transactions/add-transaction-btn";
import { Transactions } from "@/app/components/transactions/transactions";
import { getUserAccounts } from "@/app/lib/services";
import { T } from "@/app/lib/theme";

export default async function TransactionsPage() {
  const [userAccounts] = await Promise.all([
    getUserAccounts(),
  ])

  console.log(userAccounts)

  return (
    <div style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
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
            Transactions
          </h1>
          <p style={{ fontSize: 14, color: T.mu }}>
            {/* {filtered.length} transactions found */}
          </p>
        </div>
        <AddTransactionBtn userAccounts={userAccounts} />
      </div>

      <Transactions />
    </div>
  );
}
