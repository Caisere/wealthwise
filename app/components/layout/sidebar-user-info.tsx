import { nameAbbr } from "@/app/lib/nameAbbr";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SidebarUserInfo({ collapsed }: { collapsed: boolean }) {
  const session = useSession();
  const abbr = nameAbbr(session.data?.user.name || "");
  return (
    <div className="pt-4 px-2.5 border-t border-border justify-end">
      <div className="flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl bg-input border border-border overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] shrink-0 bg-[linear-gradient(135deg,#1e3a2f,#4ade80)] flex items-center justify-center text-xs font-bold text-white">
            {abbr}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-[13px] font-semibold text-text whitespace-nowrap">
                {session.data?.user.name}
              </div>
              <span className="text-[10px] font-bold px-[7px] py-1 rounded-md bg-brand/[0.09] text-brand border border-brand/20 uppercase tracking-[0.6px]">
                {session.data?.user.role}
              </span>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => signOut()} className="p-2 rounded-md text-muted hover:bg-[rgba(255,255,255,0.1)] transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
