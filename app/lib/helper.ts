import bcrypt from "bcrypt";
import { T } from "./theme";

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

export const generateAccountIcon = (type: string) => {
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

export const generateAccountColor = (type: string) => {
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