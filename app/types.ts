export type TransactionType = "income" | "expense";

export type AccountType = "Bank" | "E-Money" | "Cash" | "Savings" | "Credit";

export type UserRole = "FREE" | "PREMIUM";

export interface Transaction {
  id: number;
  desc: string;
  cat: string;
  account: string;
  amount: number;
  date: string;
  icon: string;
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
