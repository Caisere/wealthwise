"use client";
import { T } from "@/app/lib/theme";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";


const CASH_DATA = [
  { month: "Oct", income: 320000, expense: 198000 },
  { month: "Nov", income: 290000, expense: 241000 },
  { month: "Dec", income: 410000, expense: 189000 },
  { month: "Jan", income: 380000, expense: 302000 },
  { month: "Feb", income: 350000, expense: 215000 },
  { month: "Mar", income: 420000, expense: 178000 },
];

export const PIE_DATA = [
  { name: "Food", value: 42000, color: T.G },
  { name: "Rent", value: 80000, color: T.B },
  { name: "Transport", value: 18000, color: T.A },
  { name: "Utilities", value: 22000, color: T.V },
  { name: "Entertainment", value: 16000, color: T.R },
];

const BAR_DATA = [
  { month: "Oct", income: 320000, expense: 198000, savings: 122000 },
  { month: "Nov", income: 290000, expense: 241000, savings: 49000 },
  { month: "Dec", income: 410000, expense: 189000, savings: 221000 },
  { month: "Jan", income: 380000, expense: 302000, savings: 78000 },
  { month: "Feb", income: 350000, expense: 215000, savings: 135000 },
  { month: "Mar", income: 420000, expense: 178000, savings: 242000 },
];

const LINE_DATA = [
  { month: "Oct", rate: 38 },
  { month: "Nov", rate: 17 },
  { month: "Dec", rate: 54 },
  { month: "Jan", rate: 21 },
  { month: "Feb", rate: 39 },
  { month: "Mar", rate: 58 },
];

const tipStyle = {
  background: "#0a111e",
  border: `1px solid ${T.bdr}`,
  borderRadius: 10,
  fontFamily: T.FB,
  fontSize: 12,
};
const tick = { fill: T.di, fontSize: 12 };

function CashTip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0a111e",
        border: `1px solid ${T.bdr}`,
        borderRadius: 10,
        padding: "10px 16px",
        fontSize: 13,
      }}
    >
      <p style={{ color: T.G, margin: "2px 0" }}>
        Income: ₦{payload[0]?.value?.toLocaleString()}
      </p>
      <p style={{ color: T.R, margin: "2px 0" }}>
        Expense: ₦{payload[1]?.value?.toLocaleString()}
      </p>
    </div>
  );
}

export function CashFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={CASH_DATA}>
        <defs>
          <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.G} stopOpacity={0.25} />
            <stop offset="100%" stopColor={T.G} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.R} stopOpacity={0.25} />
            <stop offset="100%" stopColor={T.R} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={T.bdr} />
        <XAxis dataKey="month" tick={tick} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: T.di, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CashTip />} />
        <Area
          type="monotone"
          dataKey="income"
          stroke={T.G}
          strokeWidth={2}
          fill="url(#gi)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke={T.R}
          strokeWidth={2}
          fill="url(#ge)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SpendingPieChart() {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <PieChart>
        <Pie
          data={PIE_DATA}
          cx="50%"
          cy="50%"
          innerRadius={38}
          outerRadius={62}
          paddingAngle={3}
          dataKey="value"
        >
          {PIE_DATA.map((e, i) => (
            <Cell key={i} fill={e.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function IncomeExpenseBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={BAR_DATA} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke={T.bdr} />
        <XAxis dataKey="month" tick={tick} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: T.di, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={tipStyle}
          formatter={(v: number) => `₦${v.toLocaleString()}`}
        />
        <Bar
          dataKey="income"
          name="Income"
          fill={`${T.G}80`}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expense"
          name="Expense"
          fill={`${T.R}80`}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="savings"
          name="Savings"
          fill={`${T.B}80`}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SavingsRateChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={LINE_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke={T.bdr} />
        <XAxis dataKey="month" tick={tick} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fill: T.di, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={tipStyle}
          formatter={(v: number) => [`${v}%`, "Savings Rate"]}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke={T.G}
          strokeWidth={3}
          dot={{ fill: T.G, r: 5, strokeWidth: 0 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
