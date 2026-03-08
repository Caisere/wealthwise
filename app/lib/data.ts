import { Account, Budget, NavItem, Transaction } from "../types";


export const fmt = (n: number) => "₦" + Math.abs(n).toLocaleString("en-NG");

export const NAV_ITEMS: NavItem[] = [
  { icon: "⊞", label: "Dashboard", href: "/dashboard" },
  { icon: "⇄", label: "Transactions", href: "/dashboard/transactions" },
  { icon: "◎", label: "Budgets", href: "/dashboard/budgets" },
  { icon: "◈", label: "Accounts", href: "/dashboard/accounts" },
  { icon: "↗", label: "Analytics", href: "/dashboard/analytics" },
  { icon: "⋆", label: "Upgrade", href: "/dashboard/upgrade", accent: true },
  { icon: "⚙", label: "Settings", href: "/dashboard/settings" },
];

export const SPEND_DATA = [
  { month: "Oct", income: 320000, expense: 198000, savings: 122000 },
  { month: "Nov", income: 290000, expense: 241000, savings: 49000 },
  { month: "Dec", income: 410000, expense: 189000, savings: 221000 },
  { month: "Jan", income: 380000, expense: 302000, savings: 78000 },
  { month: "Feb", income: 350000, expense: 215000, savings: 135000 },
  { month: "Mar", income: 420000, expense: 178000, savings: 242000 },
];

export const PIE_DATA = [
  { name: "Food", value: 42000, color: "#4ade80" },
  { name: "Rent", value: 80000, color: "#38bdf8" },
  { name: "Transport", value: 18000, color: "#fbbf24" },
  { name: "Utilities", value: 22000, color: "#a78bfa" },
  { name: "Others", value: 16000, color: "#f87171" },
];

export const LINE_DATA = [
  { month: "Oct", rate: 38 },
  { month: "Nov", rate: 17 },
  { month: "Dec", rate: 54 },
  { month: "Jan", rate: 21 },
  { month: "Feb", rate: 39 },
  { month: "Mar", rate: 58 },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    desc: "Grocery — Shoprite",
    cat: "Food",
    account: "GTBank",
    amount: -8500,
    date: "Mar 8, 2026",
    icon: "🛒",
    type: "expense",
  },
  {
    id: 2,
    desc: "March Salary",
    cat: "Income",
    account: "GTBank",
    amount: 420000,
    date: "Mar 8, 2026",
    icon: "💰",
    type: "income",
  },
  {
    id: 3,
    desc: "Uber to VI",
    cat: "Transport",
    account: "Opay",
    amount: -2300,
    date: "Mar 7, 2026",
    icon: "🚗",
    type: "expense",
  },
  {
    id: 4,
    desc: "Netflix Subscription",
    cat: "Entertainment",
    account: "Opay",
    amount: -4600,
    date: "Mar 5, 2026",
    icon: "🎬",
    type: "expense",
  },
  {
    id: 5,
    desc: "EKEDC Electricity",
    cat: "Utilities",
    account: "Cash",
    amount: -15000,
    date: "Mar 4, 2026",
    icon: "⚡",
    type: "expense",
  },
  {
    id: 6,
    desc: "Freelance Payment",
    cat: "Income",
    account: "GTBank",
    amount: 75000,
    date: "Mar 3, 2026",
    icon: "💼",
    type: "income",
  },
  {
    id: 7,
    desc: "Mr Biggs — Dinner",
    cat: "Food",
    account: "Opay",
    amount: -3800,
    date: "Mar 2, 2026",
    icon: "🍔",
    type: "expense",
  },
  {
    id: 8,
    desc: "Danfo — Ikeja",
    cat: "Transport",
    account: "Cash",
    amount: -200,
    date: "Mar 1, 2026",
    icon: "🚌",
    type: "expense",
  },
  {
    id: 9,
    desc: "Rent — March",
    cat: "Rent",
    account: "GTBank",
    amount: -80000,
    date: "Mar 1, 2026",
    icon: "🏠",
    type: "expense",
  },
  {
    id: 10,
    desc: "Spotify",
    cat: "Entertainment",
    account: "Opay",
    amount: -2900,
    date: "Feb 28, 2026",
    icon: "🎵",
    type: "expense",
  },
];

export const BUDGETS: Budget[] = [
  {
    cat: "Food",
    icon: "🛒",
    spent: 42000,
    limit: 60000,
    color: "#4ade80",
    txCount: 8,
  },
  {
    cat: "Rent",
    icon: "🏠",
    spent: 80000,
    limit: 80000,
    color: "#38bdf8",
    txCount: 1,
  },
  {
    cat: "Transport",
    icon: "🚗",
    spent: 18000,
    limit: 20000,
    color: "#fbbf24",
    txCount: 12,
  },
  {
    cat: "Utilities",
    icon: "⚡",
    spent: 22000,
    limit: 25000,
    color: "#a78bfa",
    txCount: 3,
  },
  {
    cat: "Entertainment",
    icon: "🎬",
    spent: 9200,
    limit: 15000,
    color: "#f87171",
    txCount: 4,
  },
  {
    cat: "Health",
    icon: "💊",
    spent: 4500,
    limit: 20000,
    color: "#34d399",
    txCount: 2,
  },
];

export const ACCOUNTS: Account[] = [
  {
    name: "GTBank Savings",
    type: "Bank",
    balance: 842500,
    icon: "🏦",
    color: "#4ade80",
    currency: "NGN",
  },
  {
    name: "Opay Wallet",
    type: "E-Money",
    balance: 34200,
    icon: "📱",
    color: "#38bdf8",
    currency: "NGN",
  },
  {
    name: "Cash (Wallet)",
    type: "Cash",
    balance: 12800,
    icon: "💵",
    color: "#fbbf24",
    currency: "NGN",
  },
  {
    name: "PiggyVest",
    type: "Savings",
    balance: 395000,
    icon: "🐷",
    color: "#a78bfa",
    currency: "NGN",
  },
];

export const CATEGORY_OPTIONS = [
  { value: "food", label: "🛒 Food & Groceries" },
  { value: "transport", label: "🚗 Transport" },
  { value: "utilities", label: "⚡ Utilities" },
  { value: "entertainment", label: "🎬 Entertainment" },
  { value: "rent", label: "🏠 Rent" },
  { value: "health", label: "💊 Health" },
  { value: "income", label: "💰 Income" },
];

export const ACCOUNT_OPTIONS = [
  { value: "gtbank", label: "🏦 GTBank Savings" },
  { value: "opay", label: "📱 Opay Wallet" },
  { value: "cash", label: "💵 Cash" },
  { value: "piggyvest", label: "🐷 PiggyVest" },
];
