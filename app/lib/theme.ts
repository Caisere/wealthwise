import { AccountType } from "../types";

export const T = {
  bg: "#060a12",
  card: "rgba(10,17,30,0.95)",
  inp: "rgba(255,255,255,0.04)",
  bdr: "rgba(255,255,255,0.07)",
  bdA: "rgba(74,222,128,0.25)",
  G: "#4ade80",
  GD: "#16a34a",
  GM: "#22c55e",
  B: "#38bdf8",
  R: "#f87171",
  A: "#fbbf24",
  V: "#a78bfa",
  E: "#34d399",
  tx: "#f1f5f9",
  mu: "#94a3b8",
  di: "#475569",
  FD: "'Syne', sans-serif",
  FB: "'DM Sans', sans-serif",
} as const;

export const fmt = (n: number) => {
  const prefix = n < 0 ? "-₦" : "₦";
  return prefix + Math.abs(n).toLocaleString("en-NG");
};

export const generateAccountIcon = (type: AccountType) => {
  switch (type) {
    case "BANK":
      return "🏦";
    case "EMONEY":
      return "📱";
    case "CASH":
      return "💵";
    case "SAVINGS":
      return "🐷";
    case "CREDIT":
      return "💳";
    default:
      return "🏦";
  }
};

export const generateAccountColor = (type: AccountType) => {
  switch (type) {
    case "BANK":
      return T.G;
    case "EMONEY":
      return T.B;
    case "CASH":
      return T.A;
    case "SAVINGS":
      return T.V;
    case "CREDIT":
      return T.R;
    default:
      return T.G;
  }
};

export const generateBudgetColor = (category: string) => {
  switch (category) {
    case "Food & Groceries":
      return T.G;
    case "Transport":
      return T.B;
    case "Utilities":
      return T.A;
    case "Entertainment":
      return T.V;
    case "Rent":
      return T.R;
    case "Income":
      return T.R;
    case "Health":
      return T.R;
    default:
      return T.G;
  }
};

export const generateBudgetIcon = (category: string) => {
  switch (category) {
    case "Food & Groceries":
      return "🛒";
    case "Transport":
      return "🚗";
    case "Utilities":
      return "⚡";
    case "Entertainment":
      return "🎬";
    case "Rent":
      return "🏠";
    case "Income":
      return "💰";
    case "Health":
      return "💊";
    default:
      return "🧾";
  }
};
