import { Route } from "next";
import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-work" },
  { label: "Pricing", href: "/pricing" },
] as const;

export function MarketingFooter() {
  return (
    <footer className="relative z-[1] border-t border-base px-4 py-8 sm:px-6 sm:py-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-brand text-sm font-extrabold text-white">
            ₩
          </div>
          <span className="font-display font-bold text-text">WealthWise</span>
        </div>
        <p className="text-[13px] text-dim" suppressHydrationWarning>
          © {new Date().getFullYear()} WealthWise. Built for financial clarity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-[13px] text-dim md:justify-end">
          {footerLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href as Route}
              className="no-underline transition-colors hover:text-muted"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
