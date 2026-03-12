import { Button } from "../ui";

export function ManageSubscription() {
  return (
    <div className="mb-4 rounded-[18px] border border-base bg-card p-6">
      <h3 className="mb-4 font-display text-[16px] font-bold text-text">
        Subscription
      </h3>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[15px] font-semibold text-text">
            Premium Plan
          </p>
          <p className="text-[13px] text-muted">
            ₦2,500/month · Renews April 8, 2026
          </p>
        </div>
        <Button variant="outline" size="sm">
          Manage billing
        </Button>
      </div>
    </div>
  );
}