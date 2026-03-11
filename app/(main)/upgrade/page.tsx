import { authOptions } from "@/app/lib/auth";
import { T } from "@/app/lib/theme";
import { getServerSession } from "next-auth";


const FREE_FEATURES = [
  "20 transactions/month",
  "3 budget categories",
  "Basic dashboard",
  "2 accounts",
  "Basic charts",
];
const PREMIUM_FEATURES = [
  "Unlimited transactions",
  "Unlimited categories",
  "Full analytics suite",
  "Unlimited accounts",
  "Real-time budget alerts",
  "CSV & PDF export",
  "AI spending insights",
  "Priority support",
];

const FAQ = [
  [
    "Can I cancel anytime?",
    "Yes. Cancel anytime from your billing settings. No questions asked, no penalties.",
  ],
  [
    "What happens to my data?",
    "Your data stays for 30 days after cancellation. You can export it before downgrading.",
  ],
  [
    "Is there a yearly plan?",
    "Yes! Pay annually and save 20% — that's ₦24,000/year instead of ₦30,000.",
  ],
  [
    "Is my payment secure?",
    "Absolutely. All payments are handled by Stripe, a PCI DSS Level 1 certified provider.",
  ],
];

export default async function UpgradePage() {
  const session = await getServerSession(authOptions)
  // console.log(session?.user)
  return (
    <div style={{ padding: 32, maxWidth: 820, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 20,
            background: `${T.A}18`,
            color: T.A,
            border: `1px solid ${T.A}30`,
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          ⋆ Premium
        </span>
        <h1
          style={{
            fontFamily: T.FD,
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: "-1.5px",
            color: T.tx,
            margin: "16px 0 12px",
          }}
        >
          Unlock your full financial potential
        </h1>
        <p style={{ fontSize: 16, color: T.mu, lineHeight: 1.7 }}>
          Start a 7-day free trial. Cancel anytime. No surprises.
        </p>
      </div>

      {/* Plans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {/* Free */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdr}`,
            borderRadius: 20,
            padding: 32,
          }}
        >
          <div
            style={{
              fontFamily: T.FD,
              fontSize: 22,
              fontWeight: 800,
              color: T.tx,
              marginBottom: 6,
            }}
          >
            Free
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 4,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontFamily: T.FD,
                fontSize: 40,
                fontWeight: 800,
                color: T.mu,
              }}
            >
              ₦0
            </span>
            <span style={{ fontSize: 14, color: T.di }}>/forever</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {FREE_FEATURES.map((f) => (
              <div
                key={f}
                style={{ display: "flex", gap: 10, fontSize: 14, color: T.mu }}
              >
                <span style={{ color: T.mu, flexShrink: 0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>
          <button
            disabled
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: `1px solid ${T.bdr}`,
              background: T.inp,
              color: T.mu,
              fontSize: 14,
              fontWeight: 600,
              cursor: "default",
            }}
          >
            Current plan
          </button>
        </div>

        {/* Premium */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.bdA}`,
            borderRadius: 20,
            padding: 32,
            position: "relative",
            boxShadow: `0 0 50px ${T.G}12`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 20,
                background: `${T.G}18`,
                color: T.G,
                border: `1px solid ${T.G}30`,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Most popular
            </span>
          </div>
          <div
            style={{
              fontFamily: T.FD,
              fontSize: 22,
              fontWeight: 800,
              color: T.tx,
              marginBottom: 6,
            }}
          >
            Premium
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 4,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontFamily: T.FD,
                fontSize: 40,
                fontWeight: 800,
                color: T.G,
              }}
            >
              ₦2,500
            </span>
            <span style={{ fontSize: 14, color: T.di }}>/month</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {PREMIUM_FEATURES.map((f) => (
              <div
                key={f}
                style={{ display: "flex", gap: 10, fontSize: 14, color: T.mu }}
              >
                <span style={{ color: T.G, flexShrink: 0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>
          <button
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: "none",
              background: `linear-gradient(135deg,${T.GM},${T.GD})`,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: `0 4px 20px ${T.G}30`,
            }}
          >
            Start 7-day free trial
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div
        style={{
          background: T.card,
          border: `1px solid ${T.bdr}`,
          borderRadius: 18,
          padding: 28,
        }}
      >
        <h3
          style={{
            fontFamily: T.FD,
            fontSize: 18,
            fontWeight: 700,
            color: T.tx,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Frequently asked questions
        </h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {FAQ.map(([q, a]) => (
            <div
              key={q}
              style={{
                padding: 18,
                background: T.inp,
                borderRadius: 14,
                border: `1px solid ${T.bdr}`,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: T.tx,
                  marginBottom: 8,
                }}
              >
                {q}
              </p>
              <p style={{ fontSize: 13, color: T.mu, lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
