// components/dashboard/cash-flow-chart-lazy.tsx
"use client";

import { SpendingPieChartType } from "@/app/components/dashboard/spending-pie-chart";
import dynamic from "next/dynamic";

const SpendingPieChart = dynamic(
  () => import("@/app/components/dashboard/spending-pie-chart"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function SpendingPieChartLazy({ data }: SpendingPieChartType) {
  return <SpendingPieChart data={data} />;
}
