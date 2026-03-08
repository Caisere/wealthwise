"use client";
import { useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { T } from "@/app/lib/theme";


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
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          background: T.inp,
          borderRadius: 12,
          padding: 4,
        }}
      >
        {(["expense", "income"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            style={{
              flex: 1,
              padding: "9px",
              borderRadius: 10,
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "capitalize",
              background:
                type === t
                  ? t === "expense"
                    ? `${T.R}20`
                    : `${T.G}20`
                  : "transparent",
              color: type === t ? (t === "expense" ? T.R : T.G) : T.mu,
            }}
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
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
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
        <div
          style={{
            background: `${T.G}10`,
            border: `1px solid ${T.bdA}`,
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: T.mu,
          }}
        >
          You&apos;ll be alerted when spending reaches{" "}
          <span style={{ color: T.A, fontWeight: 600 }}>
            ₦{(Number(form.limit) * 0.8).toLocaleString()}
          </span>{" "}
          (80% of ₦{Number(form.limit).toLocaleString()})
        </div>
      )}
      <div style={{ display: "flex", gap: 10 }}>
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
      <p
        style={{ fontSize: 12, color: T.di, lineHeight: 1.7, marginBottom: 16 }}
      >
        This is your starting balance. Future transactions logged to this
        account will adjust it automatically.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
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
