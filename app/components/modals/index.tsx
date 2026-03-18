"use client";
import { useState } from "react";
import { Button, Input, Modal, Select } from "../ui";


/* ── Add Budget ── */
export function AddBudgetModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    category: "food",
    limit: "",
    month: "2026-03",
  });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal title="Create Budget" onClose={onClose}>
      <Select
        label="Category"
        value={form.category}
        onChange={set("category")}
        options={[
          { value: "food", label: "🛒 Food & Groceries" },
          { value: "transport", label: "🚗 Transport" },
          { value: "utilities", label: "⚡ Utilities" },
          { value: "entertainment", label: "🎬 Entertainment" },
          { value: "rent", label: "🏠 Rent" },
          { value: "health", label: "💊 Health" },
        ]}
      />
      <Input
        label="Monthly Limit (₦)"
        type="number"
        placeholder="e.g. 50000"
        value={form.limit}
        onChange={set("limit")}
        icon="₦"
      />
      <Input
        label="Month"
        type="month"
        value={form.month}
        onChange={set("month")}
      />
      {form.limit && (
        <div className="mb-4 rounded-xl border border-accent bg-brand/5 px-4 py-3 text-[13px] text-muted">
          You&apos;ll be alerted when spending reaches{" "}
          <span className="font-semibold text-warn">
            ₦{(Number(form.limit) * 0.8).toLocaleString()}
          </span>{" "}
          (80% of ₦{Number(form.limit).toLocaleString()})
        </div>
      )}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onClose} full>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClose} full>
          Create Budget
        </Button>
      </div>
    </Modal>
  );
}

/* ── Add Account ── */

