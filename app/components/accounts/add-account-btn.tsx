'use client'

import { T } from "@/app/lib/theme";
import { useState } from "react";
import { AddAccountModal } from "./add-account-modal";

export function AddAccountBtn() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
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
        + Add Account
      </button>

      {showModal && <AddAccountModal onClose={() => setShowModal(false)} />}
    </>
  );
}
