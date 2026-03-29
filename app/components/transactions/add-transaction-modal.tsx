"use client";
import { FormEvent, useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { UserAccountName, UserCategories } from "@/app/lib/services";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { addTransaction } from "@/app/lib/actions";

type AddTransactionModalType = {
  userAccounts?: UserAccountName[];
  onClose: () => void;
  categories?: UserCategories[];
};

/* ── Add Transaction ── */
export function AddTransactionModal({
  onClose,
  userAccounts,
  categories,
}: AddTransactionModalType) {
  const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // console.log(userAccounts)
  const [form, setForm] = useState({
    amount: "",
    description: "",
    categoryId: categories?.[0]?.id || "",
    accountId: userAccounts?.[0]?.id || "",
    date: "",
  });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;

      setForm((p) => ({ ...p, [k]: value }));
    };

  async function handleAddTransaction(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { amount, description, categoryId, accountId, date } = form;

      if (
        !accountId ||
        !amount ||
        !description.trim() ||
        !categoryId ||
        !date
      ) {
        toast.error("Invalid Inputs");
        return;
      }

      const transactionId = `tnx_${nanoid(10)}`;
      const amountToNumber = Number(amount);

      const data = {
        amount: amountToNumber,
        description,
        categoryId,
        accountId,
        date,
        transactionId,
        type,
      };

      const result = await addTransaction(data);

      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      // toast.error(error)
      console.log(error);
      toast.error("Failed to add transaction");
    } finally {
      setIsLoading(false);
    }
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
      <div>
        {type === "EXPENSE" ? (
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
              value={form.categoryId}
              onChange={set("categoryId")}
              options={
                categories?.map((category: { name: string; id: string }) => ({
                  value: category.id,
                  label: category.name,
                })) || []
              }
            />
            <Select
              label="Account"
              value={form.accountId}
              onChange={set("accountId")}
              options={
                userAccounts?.map((account: { name: string; id: string }) => ({
                  // .toLowerCase().replace(/\s+/g, "-")
                  value: account.id,
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
              <Button type="submit" variant="primary" full disabled={isLoading}>
                {isLoading ? "Saving" : "Save Transaction"}
              </Button>
            </div>
          </form>
        ) : (
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
              value={form.categoryId}
              onChange={set("categoryId")}
              options={
                categories?.map((category: { name: string; id: string }) => ({
                  value: category.id,
                  label: category.name,
                })) || []
              }
            />
            <Select
              label="Account"
              value={form.accountId}
              onChange={set("accountId")}
              options={
                userAccounts?.map((account: { name: string; id: string }) => ({
                  // .toLowerCase().replace(/\s+/g, "-")
                  value: account.id,
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
              <Button type="submit" variant="primary" full disabled={isLoading}>
                {isLoading ? "Saving" : "Save Transaction"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
