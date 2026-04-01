"use client";


import { T } from "@/app/lib/theme";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

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
          // formatter={(v: number) => `₦${v.toLocaleString()}`}
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
          // formatter={(v: number) => [`${v}%`, "Savings Rate"]}
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
