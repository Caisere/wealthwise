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
    description: "Grocery — Shoprite",
    category: "Food",
    accountId: "GTBank",
    amount: -8500,
    date: "Mar 8, 2026",
    type: "EXPENSE",
    transactionId: "thhe",
  },
  {
    description: "March Salary",
    category: "Income",
    accountId: "GTBank",
    amount: 420000,
    date: "Mar 8, 2026",
    transactionId: "thhe",
    type: "INCOME",
  },
  {
    description: "Uber to VI",
    category: "Transport",
    accountId: "Opay",
    amount: -2300,
    date: "Mar 7, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
  },
  {
    description: "Netflix Subscription",
    category: "Entertainment",
    accountId: "Opay",
    amount: -4600,
    date: "Mar 5, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
  },
  {
    description: "EKEDC Electricity",
    category: "Utilities",
    accountId: "Cash",
    amount: -15000,
    date: "Mar 4, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
  },
  {
    description: "Freelance Payment",
    category: "Income",
    accountId: "GTBank",
    amount: 75000,
    date: "Mar 3, 2026",
    transactionId: "thhe",
    type: "INCOME",
  },
  {
    description: "Mr Biggs — Dinner",
    category: "Food",
    accountId: "Opay",
    amount: -3800,
    date: "Mar 2, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
  },
  {
    description: "Danfo — Ikeja",
    category: "Transport",
    accountId: "Cash",
    amount: -200,
    date: "Mar 1, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
  },
  {
    description: "Rent — March",
    category: "Rent",
    accountId: "GTBank",
    amount: -80000,
    date: "Mar 1, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
  },
  {
    description: "Spotify",
    category: "Entertainment",
    accountId: "Opay",
    amount: -2900,
    date: "Feb 28, 2026",
    transactionId: "thhe",
    type: "EXPENSE",
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
    type: "BANK",
    balance: 842500,
    icon: "🏦",
    color: "#4ade80",
    currency: "NGN",
  },
  {
    name: "Opay Wallet",
    type: "EMONEY",
    balance: 34200,
    icon: "📱",
    color: "#38bdf8",
    currency: "NGN",
  },
  {
    name: "Cash (Wallet)",
    type: "CASH",
    balance: 12800,
    icon: "💵",
    color: "#fbbf24",
    currency: "NGN",
  },
  {
    name: "PiggyVest",
    type: "SAVINGS",
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

export const features = [
  {
    icon: "📊",
    title: "Smart Dashboard",
    desc: "See your entire financial picture at a glance — net worth, cash flow, and budget health in one clean view.",
  },
  {
    icon: "🏷️",
    title: "Category Budgets",
    desc: "Set monthly limits per category. Get real-time alerts before you overspend on Food, Transport, or Entertainment.",
  },
  {
    icon: "⚡",
    title: "Real-Time Alerts",
    desc: "Instant notifications when you're approaching your budget limit. Know before it's too late.",
  },
  {
    icon: "🏦",
    title: "Multi-Account",
    desc: "Track across GTBank, Opay, Cash, and credit cards. One place for all your money.",
  },
  {
    icon: "📈",
    title: "Deep Analytics",
    desc: "Monthly comparisons, spending trends, and savings rate charts that actually tell you something.",
  },
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    desc: "Your data is encrypted, your sessions are secure, and we never touch your actual bank account.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign up free in under 30 seconds. No credit card needed.",
  },
  {
    n: "02",
    title: "Add accounts & budgets",
    desc: "Tell WealthWise your bank accounts, cash, and monthly budget limits per category.",
  },
  {
    n: "03",
    title: "Log transactions as you go",
    desc: "Spent money? Log it in seconds. The app does the math and keeps your budgets updated.",
  },
];

export const pricing = [
  {
    name: "Free",
    price: "₦0",
    period: "/forever",
    color: "#94a3b8",
    badge: false,
    features: [
      "Up to 20 transactions/month",
      "3 budget categories",
      "Basic dashboard",
      "2 accounts",
    ],
    cta: "Get started free",
    href: "/register",
    primary: false,
  },
  {
    name: "Premium",
    price: "₦2,500",
    period: "/month",
    color: "#4ade80",
    badge: true,
    features: [
      "Unlimited transactions",
      "Unlimited categories",
      "Full analytics & charts",
      "Unlimited accounts",
      "Real-time budget alerts",
      "CSV & PDF export",
      "AI spending insights",
    ],
    cta: "Start 7-day free trial",
    href: "/register",
    primary: true,
  },
];

export const NAV = [
  { icon: "⊞", label: "Dashboard", href: "/dashboard" },
  { icon: "⇄", label: "Transactions", href: "/transactions" },
  { icon: "◎", label: "Budgets", href: "/budgets" },
  { icon: "◈", label: "Accounts", href: "/accounts" },
  { icon: "↗", label: "Analytics", href: "/analytics" },
  { icon: "⋆", label: "Upgrade", href: "/upgrade", accent: true },
  { icon: "⚙", label: "Settings", href: "/settings" },
];

export const ALL_TX = [
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
