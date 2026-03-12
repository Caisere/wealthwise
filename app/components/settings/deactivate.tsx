import { Button } from "../ui";

export function Deactivate() {
  return (
    <div className="rounded-[18px] border border-danger/25 bg-card p-6">
      <h3 className="mb-4 font-display text-[16px] font-bold text-danger">
        Danger Zone
      </h3>
      <p className="mb-4 text-[13px] leading-relaxed text-muted">
        Deleting your account is permanent and irreversible. All your data —
        transactions, budgets, accounts — will be gone forever.
      </p>
      <Button variant="danger">Delete my account</Button>
    </div>
  );
}