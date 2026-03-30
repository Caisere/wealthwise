import "server-only";

import bcrypt from "bcrypt";
import { T } from "./theme";
import { AccountType } from "../types";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}

export function getLastMonthDate() {
  const now = new Date();
  const lastMonthFirstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthLastDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
  );

  return {
    lastMonthFirstDay,
    lastMonthLastDay,
  };
}

export function getCurrentMonthDate() {
  const now = new Date();
  const currentMonthFirstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthLastDay = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  return {
    currentMonthFirstDay, currentMonthLastDay
  }
}

export function getPercentageChange(current: number, previous: number){
  // both zero, no change
  if (previous === 0 && current === 0) return 0;

  // new data, 100% growth
  if (previous === 0) return 100;

  return ((current - previous) / previous) * 100;
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
