"use client";

import { T } from "@/app/lib/theme";
import { useState } from "react";
import { AddTransactionModal } from "./add-transaction-modal";
import { UserAccountName, UserCategories } from "@/app/lib/services";

export function AddTransactionBtn({
  userAccounts,
  categories
}: {
  userAccounts: { accountsName: UserAccountName[] };
  categories: {
    userCategories: UserCategories[]
  }
}) {
  const [showAddTx, setShowAddTx] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAddTx(true)}
        type="button"
        style={{
          padding: "11px 22px",
          background: `linear-gradient(135deg,${T.GM},${T.GD})`,
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          boxShadow: `0 4px 20px ${T.G}30`,
        }}
      >
        + Add Transaction
      </button>

      {showAddTx && (
        <AddTransactionModal
          userAccounts={userAccounts.accountsName}
          categories={categories.userCategories}
          onClose={() => setShowAddTx(false)}
        />
      )}
    </>
  );
}
