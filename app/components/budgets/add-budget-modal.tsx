"use client";
import { useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { UserCategories } from "@/app/lib/services";

type AddBudgetModalType = {
  onClose: () => void;
  categories: UserCategories[];
};

export function AddBudgetModal({ onClose, categories }: AddBudgetModalType) {
  const [form, setForm] = useState({
    category: categories?.[0]?.id || "",
    limit: "",
    month: "2026-03",
  });

  const parsedLimit = Number(form.limit)
  const isValidNumber = Number.isFinite(parsedLimit)  && parsedLimit > 0

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
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />
      <Input
        label="Monthly Limit (₦)"
        type="number"
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
    </Modal>
  );
}
