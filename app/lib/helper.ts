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
      return T.R;
    case "Health":
      return "💊";
    default:
      return T.G;
  }
};
