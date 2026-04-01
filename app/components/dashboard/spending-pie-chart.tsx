"use client";

import { UserCatsWithTransSum } from "@/app/lib/services";
import { generateBudgetColor } from "@/app/lib/theme";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type SpendingPieChartType = {
  data: UserCatsWithTransSum[];
};

export default function SpendingPieChart({ data }: SpendingPieChartType) {
  const formattedData = data.map((item) => ({
    ...item,
    total: Number(item.total),
  }));

  return (
    <ResponsiveContainer width="100%" height={140}>
      <PieChart>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          innerRadius={38}
          outerRadius={62}
          paddingAngle={3}
          dataKey="total"
        >
          {formattedData.map((el, i) => {
            const color = generateBudgetColor(el.name);
            return <Cell key={i} fill={color} />;
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
