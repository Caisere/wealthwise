"use client";

import { useState } from "react";
import { Button, Input, Modal, Select } from "../ui";
import { toast } from "sonner";
import { type AccountType } from "@/app/types";
import { addAccounts } from "@/app/lib/actions";
import {nanoid} from "nanoid";

const requestId = `tnx_${nanoid(10)}`;

export function AddAccountModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    balance: "",
  });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));


  async function handleAddAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    try {
      const type = form.type as AccountType;
      const balance = form.balance.replace(/,/g, ""); // Remove commas for parsing
      const name = form.name.trim();

      if (!name.trim() || !balance.trim() || !type.trim()) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const response = await addAccounts({ name, type, balance, requestId });

      if (response.success) {
        toast.success("Account added successfully!");
        onClose();
      } else {
        toast.error(response.message || "Failed to add account.");
      }
    } catch (error) {
      console.error("Failed to add account:", error);
      toast.error("An error occurred while adding the account. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <Modal title="Add Account" onClose={onClose}>
      <form onSubmit={handleAddAccount}>
        <Input
          label="Account Name"
          placeholder="e.g. GTBank Savings, Opay Wallet"
          value={form.name}
          onChange={set("name")}
          required
        />
        <Select
          label="Account Type"
          value={form.type}
          onChange={set("type")}
          options={[
            { value: "BANK", label: "🏦 Bank Account" },
            { value: "EMONEY", label: "📱 E-Money / Wallet" },
            { value: "CASH", label: "💵 Cash" },
            { value: "SAVINGS", label: "🐷 Savings/Investment" },
            { value: "CREDIT", label: "💳 Credit Card" },
          ]}
        />
        <Input
          label="Current Balance (₦)"
          type="text"
          required
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
          <Button type="button" variant="ghost" onClick={onClose} full>
            Cancel
          </Button>
          <Button type="submit" variant="primary" full>
            {loading ? "Adding Account" : "Add Account"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
