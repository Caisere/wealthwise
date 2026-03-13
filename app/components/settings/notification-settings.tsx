"use client";

import { useState } from "react";

export function NotificationSettings() {
  const [notif, setNotif] = useState({
    budget: true,
    weekly: true,
    tips: false,
  });

  return (
    <div className="mb-4 rounded-[18px] border border-base p-6">
      <h3 className="mb-5 font-display text-[16px] font-bold text-text">
        Notifications
      </h3>
      <div className="flex flex-col gap-5">
        {(
          [
            [
              "budget",
              "Budget alerts",
              "Get notified when you hit 80% of a budget limit",
            ],
            [
              "weekly",
              "Weekly summary",
              "Receive a weekly email summary of your finances",
            ],
            [
              "tips",
              "Financial tips",
              "Occasional tips and insights from WealthWise",
            ],
          ] as const
        ).map(([k, t, d]) => (
          <div
            key={k}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <p className="mb-0.5 text-[14px] font-semibold text-text">
                {t}
              </p>
              <p className="text-[12px] text-muted">{d}</p>
            </div>
            <Toggle
              on={notif[k]}
              toggle={() => setNotif((p) => ({ ...p, [k]: !p[k] }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ on, toggle }: { on: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        on ? "bg-brand" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-[left] duration-200 ${
          on ? "left-[22px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}
