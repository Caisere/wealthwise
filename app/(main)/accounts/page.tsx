import { AddAccountBtn } from "@/app/components/accounts/add-account-btn";
import { generateAccountColor, generateAccountIcon } from "@/app/lib/helper";
import { getUserAccountData } from "@/app/lib/services";
import { T } from "@/app/lib/theme";


export default async function AccountsPage() {
  const { accounts, totalBalanceResult } = await getUserAccountData();

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-7">
        <div>
          <h1
            className="mb-1 text-2xl font-extrabold tracking-tight"
            style={{
              fontFamily: T.FD,
              color: T.tx,
            }}
          >
            Accounts
          </h1>
          <p style={{ fontSize: 14, color: T.mu }}>
            {accounts.length} accounts tracked
          </p>
        </div>

        <AddAccountBtn />
      </div>

      {/* Net worth hero */}
      <div
        style={{
          background: "linear-gradient(135deg,#0a1a0f,#060a12)",
          border: `1px solid ${T.bdA}`,
          borderRadius: 20,
          padding: 32,
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle,${T.G}15,transparent)`,
          }}
        />
        <p
          style={{
            fontSize: 13,
            color: T.G,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: 12,
          }}
        >
          Total Net Worth
        </p>
        <p
          style={{
            fontFamily: T.FD,
            fontSize: 48,
            fontWeight: 800,
            color: T.tx,
            letterSpacing: "-2px",
            marginBottom: 8,
          }}
        >
          ₦{totalBalanceResult.toLocaleString()}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              background: `${T.G}18`,
              color: T.G,
              border: `1px solid ${T.G}30`,
              textTransform: "uppercase" as const,
            }}
          >
            ↑ 12.4% this month
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              background: `${T.mu}18`,
              color: T.mu,
              border: `1px solid ${T.mu}30`,
              textTransform: "uppercase" as const,
            }}
          >
            Across {accounts.length} accounts
          </span>
        </div>
      </div>

      {/* Account cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 16,
        }}
      >
        {accounts.map(({ name, type, balance }) => {
          const icon = generateAccountIcon(type);
          const color = generateAccountColor(type);
          return (
            <div
              key={name}
              className="card-hover"
              style={{
                background: T.card,
                border: `1px solid ${T.bdr}`,
                borderRadius: 18,
                padding: 24,
                transition: "all .2s",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      background: `${color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: T.FD,
                        fontSize: 15,
                        fontWeight: 700,
                        color: T.tx,
                        marginBottom: 4,
                      }}
                    >
                      {name}
                    </h3>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 20,
                        background: `${color}18`,
                        color,
                        border: `1px solid ${color}30`,
                        textTransform: "uppercase" as const,
                      }}
                    >
                      {type}
                    </span>
                  </div>
                </div>
                <button
                type="button"
                  style={{
                    background: T.inp,
                    border: `1px solid ${T.bdr}`,
                    borderRadius: 8,
                    color: T.mu,
                    padding: "5px 10px",
                    fontSize: 12,
                  }}
                >
                  ···
                </button>
              </div>
              <p
                style={{
                  fontFamily: T.FD,
                  fontSize: 28,
                  fontWeight: 800,
                  color: T.tx,
                  letterSpacing: "-1px",
                  marginBottom: 4,
                }}
              >
                ₦{balance.toLocaleString()}
              </p>
              <p style={{ fontSize: 12, color: T.di }}>
                Available balance · NGN
              </p>
              <div style={{ height: 1, background: T.bdr, margin: "16px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: T.mu,
                }}
              >
                <span>Last 30 days</span>
                <span style={{ color: T.R }}>↓ ₦45,600 spent</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
