"use client";
import { Button, Input, Select } from "@/app/components/ui";
import { T } from "@/app/lib/theme";
import { useState } from "react";


function Toggle({ on, toggle }: { on: boolean; toggle: () => void }) {
  return (
    <div
      onClick={toggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: on ? T.G : T.bdr,
        position: "relative",
        cursor: "pointer",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: on ? 22 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .2s",
        }}
      />
    </div>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState("Adebayo Okafor");
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({
    budget: true,
    weekly: true,
    tips: false,
  });

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: 32, maxWidth: 680 }}>
      <h1
        style={{
          fontFamily: T.FD,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-0.8px",
          color: T.tx,
          marginBottom: 32,
        }}
      >
        Settings
      </h1>

      {saved && (
        <div
          style={{
            background: `${T.G}15`,
            border: `1px solid ${T.bdA}`,
            borderRadius: 12,
            padding: "12px 18px",
            marginBottom: 20,
            color: T.G,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ✓ Changes saved successfully
        </div>
      )}

      {/* Profile */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 16,
            fontWeight: 700,
            color: T.tx,
            marginBottom: 20,
          }}
        >
          Profile
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: `linear-gradient(135deg,#1e3a2f,${T.G})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            AO
          </div>
          <div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: T.tx,
                marginBottom: 2,
              }}
            >
              {name}
            </p>
            <p style={{ fontSize: 13, color: T.mu }}>adebayo@example.com</p>
          </div>
          <button
            style={{
              marginLeft: "auto",
              background: T.inp,
              border: `1px solid ${T.bdr}`,
              borderRadius: 10,
              color: T.mu,
              padding: "7px 14px",
              fontSize: 12,
            }}
          >
            Change photo
          </button>
        </div>
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value="adebayo@example.com"
          onChange={() => {}}
        />
        <Select
          label="Currency"
          value="NGN"
          onChange={() => {}}
          options={[
            { value: "NGN", label: "₦ Nigerian Naira (NGN)" },
            { value: "USD", label: "$ US Dollar (USD)" },
            { value: "GBP", label: "£ British Pound (GBP)" },
          ]}
        />
        <Button variant="primary" size="sm" onClick={save}>
          Save changes
        </Button>
      </div>

      {/* Notifications */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 16,
            fontWeight: 700,
            color: T.tx,
            marginBottom: 20,
          }}
        >
          Notifications
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: T.tx,
                    marginBottom: 2,
                  }}
                >
                  {t}
                </p>
                <p style={{ fontSize: 12, color: T.mu }}>{d}</p>
              </div>
              <Toggle
                on={notif[k]}
                toggle={() => setNotif((p) => ({ ...p, [k]: !p[k] }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 16,
            fontWeight: 700,
            color: T.tx,
            marginBottom: 20,
          }}
        >
          Security
        </h3>
        <Input
          label="Current Password"
          type="password"
          placeholder="••••••••"
          value=""
          onChange={() => {}}
        />
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          value=""
          onChange={() => {}}
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          value=""
          onChange={() => {}}
        />
        <Button variant="primary" size="sm" onClick={save}>
          Update password
        </Button>
      </div>

      {/* Subscription */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 16,
            fontWeight: 700,
            color: T.tx,
            marginBottom: 16,
          }}
        >
          Subscription
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: T.tx,
                marginBottom: 4,
              }}
            >
              Premium Plan
            </p>
            <p style={{ fontSize: 13, color: T.mu }}>
              ₦2,500/month · Renews April 8, 2026
            </p>
          </div>
          <Button variant="outline" size="sm">
            Manage billing
          </Button>
        </div>
      </div>

      {/* Danger zone */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.R}25`,
          borderRadius: 18,
          padding: 24,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 16,
            fontWeight: 700,
            color: T.R,
            marginBottom: 16,
          }}
        >
          Danger Zone
        </h3>
        <p
          style={{
            fontSize: 13,
            color: T.mu,
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          Deleting your account is permanent and irreversible. All your data —
          transactions, budgets, accounts — will be gone forever.
        </p>
        <Button variant="danger">Delete my account</Button>
      </div>
    </div>
  );
}
