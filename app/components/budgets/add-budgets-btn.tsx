"use client";

import { T } from "@/app/lib/theme";
import { useState } from "react";
import { AddBudgetModal } from "./add-budget-modal";
import { UserCategories } from "@/app/lib/services";

export function AddBudgetBtn({
  categories
}: {
  categories: {
    userCategories: UserCategories[]
  }
}) {
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
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
        + New Budget
      </button>

      {showModal && <AddBudgetModal categories={categories.userCategories} onClose={() => setShowModal(false)} />}
    </>
  );
}
