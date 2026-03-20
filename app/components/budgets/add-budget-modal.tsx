"use client";
import { useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { UserCategories } from "@/app/lib/services";
import { toast } from "sonner";
import { AddBudget } from "@/app/lib/actions";
import { CreateBudgetSchema } from "@/app/types";

type AddBudgetModalType = {
  onClose: () => void;
  categories: UserCategories[];
};

export function AddBudgetModal({ onClose, categories }: AddBudgetModalType) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    categoryId: categories?.[0]?.id || "",
    limit: "",
    month: "2026-03",
  });

  const parsedLimit = Number(form.limit);
  const isValidNumber = Number.isFinite(parsedLimit) && parsedLimit > 0;

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleAddBudget(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true)

    try {
      const { categoryId, limit, month } = form;

      if (!categoryId || !limit || !month) {
        console.log({ categoryId, limit, month });
        return;
      }

      const parsedData = CreateBudgetSchema.safeParse({
        categoryId,
        limit,
        month,
      });

      if (!parsedData.success) {
        toast.error(parsedData.error.message);
        return;
      }

      const newBudget = {
        categoryId: parsedData.data.categoryId,
        limit: Number(parsedData.data.limit),
        month: parsedData.data.month,
      };

      const result = await AddBudget(newBudget);

      if (result?.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Server Error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal title="Create Budget" onClose={onClose}>
      <form onSubmit={handleAddBudget}>
        <Select
          label="Category"
          value={form.categoryId}
          onChange={set("categoryId")}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <Input
          label="Monthly Limit (₦)"
          type="text"
          min={1}
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
        {isValidNumber && (
          <div className="mb-4 rounded-xl border border-accent bg-brand/5 px-4 py-3 text-[13px] text-muted">
            You&apos;ll be alerted when spending reaches{" "}
            <span className="font-semibold text-warn">
              ₦{(parsedLimit * 0.8).toLocaleString()}
            </span>{" "}
            (80% of ₦{parsedLimit.toLocaleString()})
          </div>
        )}
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onClose} full>
            Cancel
          </Button>
          <Button variant="primary" type="submit" full>
            Create Budget
          </Button>
        </div>
      </form>
    </Modal>
  );
}
