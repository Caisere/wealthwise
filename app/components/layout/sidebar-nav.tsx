import { NAV } from "@/app/lib/data";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function SidebarNav({collapsed}:{collapsed: boolean}) {
  const pathname = usePathname();
  return (
    <div className="flex-1">
      <nav className="p-4 px-2.5 flex flex-col gap-0.5">
        {NAV.map(({ icon, label, href, accent }) => {
          const active =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href as Route}
              className={`nav-hover relative flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl px-3 py-2.5 text-[13px] no-underline transition-all duration-150 ${
                active
                  ? "bg-brand/8 text-brand font-semibold"
                  : accent
                    ? "text-warn font-normal"
                    : "text-muted font-normal"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] rounded bg-brand" />
              )}
              <span className="text-[17px] shrink-0">{icon}</span>
              {!collapsed && <span>{label}</span>}
              {!collapsed && accent && !active && (
                <span className="ml-auto rounded-[10px] bg-warn/12 px-1.5 py-px text-[9px] font-bold text-warn">
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
