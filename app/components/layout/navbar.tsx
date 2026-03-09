import Link from "next/link";

export function Navbar () {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-16 py-5 border-b border-base bg-[rgba(6,10,18,0.9)] backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-lg font-black text-white font-display">
          ₩
        </div>
        <span className="font-display font-extrabold text-lg text-text">
          WealthWise
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-[14px] text-muted">
        {["Features", "How it works", "Pricing"].map((l) => (
          <span
            key={l}
            className="cursor-pointer hover:text-brand transition-colors"
          >
            {l}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="px-4 py-2 text-[13px] font-semibold rounded-xl bg-transparent text-muted border border-base hover:bg-input transition-all no-underline"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-[13px] font-semibold rounded-xl gradient-brand text-white shadow-brand hover:opacity-90 transition-opacity no-underline"
        >
          Get started →
        </Link>
      </div>
    </nav>
  );
}