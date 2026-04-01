'use client'

import { getCompleteDate, getMonth, getPeriod } from "@/app/lib/nameAbbr";
import { T } from "@/app/lib/theme";
import { ReactNode } from "react";

export function UserGreeting ({children}:{children: ReactNode}) {

  const fullDate = getCompleteDate()
  const period = getPeriod();
  const month = getMonth()

  return (
    <div>
      <p style={{ fontSize: 13, color: T.di, marginBottom: 4 }}>
        {fullDate}
      </p>
      <h1
        style={{
          fontFamily: T.FD,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-0.8px",
          color: T.tx,
          margin: "0 0 4px",
        }}
      >
        {period}, {children || "User"} 👋
      </h1>
      <p style={{ fontSize: 14, color: T.mu }}>
        Here&apos;s your financial overview for {month}.
      </p>
    </div>
  );
}