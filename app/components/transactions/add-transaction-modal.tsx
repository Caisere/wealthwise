"use client";
import { FormEvent, useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { UserAccountName } from "@/app/lib/services";

type AddTransactionModalType = {
  userAccounts: UserAccountName[];
  onClose: () => void;
}

/* ── Add Transaction ── */
export function AddTransactionModal({ onClose, userAccounts }: AddTransactionModalType) {
  const [type, setType] = useState<"expense" | "income">("expense");

  // console.log(userAccounts)
  const [form, setForm] = useState({
    amount: "",
    desc: "",
    category: "food",
    account: "gtbank",
    date: "",
  });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));


    function handleAddTransaction (e: FormEvent) {
      e.preventDefault()

      console.log(form.account)
    }

  return (
    <Modal title="Add Transaction" onClose={onClose}>
      {/* Type toggle */}
      <div className="mb-5 flex gap-2 rounded-xl bg-input p-1">
        {(["expense", "income"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 rounded-[10px] px-3 py-2 text-[13px] font-semibold capitalize transition-colors ${
              type === t
                ? t === "expense"
                  ? "bg-danger/15 text-danger"
                  : "bg-brand/15 text-brand"
                : "bg-transparent text-muted"
            }`}
          >
            {t === "expense" ? "📤 Expense" : "📥 Income"}
          </button>
        ))}
      </div>
      <form onSubmit={handleAddTransaction}>
        <Input
          label="Amount (₦)"
          type="number"
          placeholder="0.00"
          value={form.amount}
          onChange={set("amount")}
          icon="₦"
        />
        <Input
          label="Description"
          placeholder="What was this for?"
          value={form.desc}
          onChange={set("desc")}
        />
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
            { value: "income", label: "💰 Income" },
          ]}
        />
        <Select
          label="Account"
          value={form.account}
          onChange={set("account")}
          options={
            userAccounts?.map((account: { name: string }) => ({
              value: account.name.toLowerCase().replace(/\s+/g, "-"),
              label: account.name,
            })) || []
          }
        />
        <Input
          label="Date"
          type="date"
          value={form.date}
          onChange={set("date")}
        />
        <div className="mt-2 flex gap-2">
          <Button type="submit" variant="ghost" onClick={onClose} full>
            Cancel
          </Button>
          <Button type="submit" variant="primary" full>
            Save Transaction
          </Button>
        </div>
      </form>
    </Modal>
  );
}
