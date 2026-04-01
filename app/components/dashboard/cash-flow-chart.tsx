'use client'

import { GetIncAndExpTrans } from "@/app/lib/services";
import { T } from "@/app/lib/theme";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

export default function CashFlowChart({
  monthlyIncAndExp,
}: {
  monthlyIncAndExp: GetIncAndExpTrans[];
}) {

  const chartData = monthlyIncAndExp.map(data => ({
    month: data.month, 
    income: Number(data.income),
    expense: Number(data.expense)
}))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={chartData}>
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