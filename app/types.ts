import { userAccounts } from "@/db/schema";
import z from "zod";

export const RegisterFormData = z.object({
  name: z.string().trim().min(1, "name must be at least 1 character"),
  email: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const UpdateProfileSchema = z.object({
  name: z.string().trim().min(1, "name must be at least 1 character"),
  email: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .transform((email) => email.toLowerCase()),
});

export const CredentialsSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "New Password must be at least 8 characters"),
  confirmNewPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
});


export const createTransactionSchema = z.object({
  // accountId: z.string().uuid(),

  // categoryId: z.string().uuid().optional().nullable(),

  type: z.enum(["INCOME", "EXPENSE"]),

  transactionId: z.string().min(1),

  amount: z.coerce.number().positive("Amount must be greater than 0"),
  // numeric comes as string from forms

  description: z.string().min(1).max(256),

  date: z.coerce.date(),

  accountId: z.string().min(1),
  categoryId: z.string().min(1).uuid().optional().nullable(),
});


export type UserAccountData = {
  accounts: (typeof userAccounts.$inferSelect)[];
  totalBalanceResult: number;
};


export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;

export type LoginSchema = z.infer<typeof CredentialsSchema>;

export type RegisterSchema = z.infer<typeof RegisterFormData>;

export type TransactionType = "INCOME" | "EXPENSE";

export type AccountType = "BANK" | "EMONEY" | "CASH" | "SAVINGS" | "CREDIT";

export type UserRole = "FREE" | "PREMIUM";

export interface Transaction {
  transactionId: string,
  description: string;
  categoryId: string;
  accountId: string;
  amount: number;
  date: string;
  type: TransactionType;
}

export interface Budget {
  cat: string;
  icon: string;
  spent: number;
  limit: number;
  color: string;
  txCount: number;
}

export interface Account {
  name: string;
  type: AccountType;
  balance: number;
  icon: string;
  color: string;
  currency: string;
}

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  accent?: boolean;
}

export interface SpendDataPoint {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface LineDataPoint {
  month: string;
  rate: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon: string;
}
