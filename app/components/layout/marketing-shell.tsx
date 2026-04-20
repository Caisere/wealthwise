import { ReactNode } from "react";
import { MarketingBackground } from "./marketing-background";
import { MarketingFooter } from "./marketing-footer";
import { Navbar } from "./navbar";

type MarketingShellProps = {
  children: ReactNode;
};

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg font-body text-text">
      <Navbar />
      <MarketingBackground />
      {children}
      <MarketingFooter />
    </div>
  );
}
