"use client";
import { FormEvent, useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { UserAccountName } from "@/app/lib/services";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { addTransaction } from "@/app/lib/actions";

type AddTransactionModalType = {
  userAccounts?: UserAccountName[];
  onClose: () => void;
};

/* ── Add Transaction ── */
export function AddTransactionModal({
  onClose,
  userAccounts,
}: AddTransactionModalType) {
  const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE");

  // console.log(userAccounts)
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "food",
    accountId: userAccounts?.[0]?.id?.toLowerCase() || "",
    date: "",
  });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value

      if(k === 'accountId') {
        const selectedAccount = userAccounts?.find((acc) => acc.name.toLowerCase() === value)
        setForm((prev) => ({...prev, accountId: selectedAccount?.id || ''}))
      }
      setForm((p) => ({ ...p, [k]: value }));
    }




  async function handleAddTransaction(e: FormEvent) {
    e.preventDefault();

    try {
      const { amount, description, category, accountId, date } = form;

      if (!accountId || !amount || !category || !date) {
        toast.error("Invalid Inputs");
        return;
      }

      const transactionId = `tnx_${nanoid(10)}`;
      const amountToNumber = Number(amount);

      const data = {
        amount: amountToNumber,
        description,
        category,
        accountId,
        date,
        transactionId,
        type,
      };

      const result = await addTransaction(data);

      if (result.success) {
        toast.success(result.message)
      }

    } catch (error) {
      // toast.error(error)
      console.log(error);
    }

    console.log(form);
  }

  return (
    <Modal title="Add Transaction" onClose={onClose}>
      {/* Type toggle */}
      <div className="mb-5 flex gap-2 rounded-xl bg-input p-1">
        {(["EXPENSE", "INCOME"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 rounded-[10px] px-3 py-2 text-[13px] font-semibold capitalize transition-colors ${
              type === t
                ? t === "EXPENSE"
                  ? "bg-danger/15 text-danger"
                  : "bg-brand/15 text-brand"
                : "bg-transparent text-muted"
            }`}
          >
            {t === "EXPENSE" ? "📤 Expense" : "📥 Income"}
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
          value={form.description}
          onChange={set("description")}
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
          value={form.accountId}
          onChange={set("accountId")}
          options={
            userAccounts?.map((account: { name: string, id:string }) => ({
              // .toLowerCase().replace(/\s+/g, "-")
              value: account.name,
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