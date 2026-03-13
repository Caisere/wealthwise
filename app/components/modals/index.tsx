"use client";
import { useState } from "react";
import { Button, Input, Modal, Select } from "../ui";


/* ── Add Transaction ── */
export function AddTransactionModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<"expense" | "income">("expense");
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
        options={[
          { value: "gtbank", label: "🏦 GTBank Savings" },
          { value: "opay", label: "📱 Opay Wallet" },
          { value: "cash", label: "💵 Cash" },
          { value: "piggyvest", label: "🐷 PiggyVest" },
        ]}
      />
      <Input
        label="Date"
        type="date"
        value={form.date}
        onChange={set("date")}
      />
      <div className="mt-2 flex gap-2">
        <Button variant="ghost" onClick={onClose} full>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClose} full>
          Save Transaction
        </Button>
      </div>
    </Modal>
  );
}

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
export function AddAccountModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", type: "bank", balance: "" });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <Modal title="Add Account" onClose={onClose}>
      <Input
        label="Account Name"
        placeholder="e.g. GTBank Savings, Opay Wallet"
        value={form.name}
        onChange={set("name")}
      />
      <Select
        label="Account Type"
        value={form.type}
        onChange={set("type")}
        options={[
          { value: "bank", label: "🏦 Bank Account" },
          { value: "emoney", label: "📱 E-Money / Wallet" },
          { value: "cash", label: "💵 Cash" },
          { value: "savings", label: "🐷 Savings/Investment" },
          { value: "credit", label: "💳 Credit Card" },
        ]}
      />
      <Input
        label="Current Balance (₦)"
        type="number"
        placeholder="Enter your current balance"
        value={form.balance}
        onChange={set("balance")}
        icon="₦"
      />
      <p className="mb-4 text-[12px] leading-relaxed text-dim">
        This is your starting balance. Future transactions logged to this
        account will adjust it automatically.
      </p>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onClose} full>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClose} full>
          Add Account
        </Button>
      </div>
    </Modal>
  );
}
