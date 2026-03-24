'use client'

import { getCompleteDate, getPeriod } from "@/app/lib/nameAbbr";
import { T } from "@/app/lib/theme";
import { ReactNode } from "react";

export function UserGreeting ({children}:{children: ReactNode}) {

  return (
    <div>
      <p style={{ fontSize: 13, color: T.di, marginBottom: 4 }}>
        {getCompleteDate()}
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
        {getPeriod()}, {children || "User"} 👋
      </h1>
      <p style={{ fontSize: 14, color: T.mu }}>
        Here&apos;s your financial overview for March.
      </p>
    </div>
  );
}