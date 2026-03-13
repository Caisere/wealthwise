import Link from "next/link";

export function AppLogo () {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-[10px] gradient-brand flex items-center justify-center text-lg font-extrabold text-white font-display">
        ₩
      </div>
      <span className="font-display font-extrabold text-lg text-text">
        WealthWise
      </span>
    </Link>
  );
}
