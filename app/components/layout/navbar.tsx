import { Route } from "next";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-work" },
  { label: "Pricing", href: "/pricing" },
] as const;

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-base bg-[rgba(6,10,18,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-lg font-display font-black text-white">
            ₩
          </div>
          <span className="font-display text-base font-extrabold text-text sm:text-lg">
            WealthWise
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-[14px] text-muted md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href as Route}
              className="no-underline transition-colors hover:text-brand"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl border border-base bg-transparent px-4 py-2 text-[13px] font-semibold text-muted no-underline transition-all hover:bg-input sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex rounded-xl px-3 py-2 text-[12px] font-semibold text-white gradient-brand shadow-brand no-underline transition-opacity hover:opacity-90 sm:px-4 sm:text-[13px]"
          >
            Get started →
          </Link>
        </div>
      </div>

      <div className="border-t border-base px-4 py-2 md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto whitespace-nowrap text-[13px] text-muted sm:px-2">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href as Route}
              className="no-underline transition-colors hover:text-brand"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
