// components/dashboard/cash-flow-chart-lazy.tsx
"use client";

import { GetIncAndExpTrans } from "@/app/lib/services";
import dynamic from "next/dynamic";

const CashFlowChart = dynamic(
  () => import("@/app/components/dashboard/cash-flow-chart"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function CashFlowChartLazy({
  monthlyIncAndExp,
}: {
  monthlyIncAndExp: GetIncAndExpTrans[];
}) {
  return <CashFlowChart monthlyIncAndExp={monthlyIncAndExp} />;
}
