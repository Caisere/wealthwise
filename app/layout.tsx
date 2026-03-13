import type { Metadata } from "next";
import "./globals.css";
import { Syne, Geist } from "next/font/google";
import { SessionProviderComponent } from "./components/layout/session-provider-component";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "WealthWise — Personal Finance OS",
  description:
    "Track income, expenses, and budgets across all your accounts. Know exactly where every naira goes.",
};

export const syne = Syne({
  subsets: ["latin"],
  // weight: ["400", "500", "700", "800"],
  variable: "--font-syne",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`bg-bg text-text font-body antialiased ${syne.className}`}
      >
        <SessionProviderComponent>{children}</SessionProviderComponent>
        <Toaster />
      </body>
    </html>
  );
}
