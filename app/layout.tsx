import type { Metadata } from "next";
import "./globals.css";
import {Syne} from "next/font/google";

export const metadata: Metadata = {
  title: "WealthWise — Personal Finance OS",
  description:
    "Track income, expenses, and budgets across all your accounts. Know exactly where every naira goes.",
};

export const syne = Syne({
  subsets: ["latin"],
  // weight: ["400", "500", "700", "800"],
  variable: "--font-syne",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-bg text-text font-body antialiased ${syne.className}`}>{children}</body>
    </html>
  );
}
