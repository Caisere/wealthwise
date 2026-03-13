"use client";

import { SidebarUserInfo } from "./sidebar-user-info";
import { useState } from "react";
import { SidebarNav } from "./sidebar-nav";




export default function Sidebar() {
const [collapsed, setCollapsed] = useState(false);
  const w = collapsed ? 68 : 236;

  return (
    <aside
      className="shrink-0 transition-[width] duration-300 ease-in-out bg-[rgba(6,10,18,0.98)] border-r border-border flex flex-col py-6 sticky top-0 h-screen z-100"
      style={{ width: w }}
    >
      {/* Logo */}
      <div className="px-[18px] pb-6 border-b border-border flex items-center gap-2.5 overflow-hidden">
        <div className="w-[38px] h-[38px] rounded-xl shrink-0 gradient-brand flex items-center justify-center text-xl font-black text-white font-display">
          ₩
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-extrabold text-base text-text tracking-[-0.3px]">
              WealthWise
            </div>
            <div className="text-[10px] text-brand tracking-[1.2px] uppercase">
              Finance OS
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <SidebarNav collapsed={collapsed}/>

      <SidebarUserInfo collapsed={collapsed}/>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-[30px] -right-3 w-6 h-6 rounded-full bg-card border border-border-accent text-brand text-xs flex items-center justify-center z-20"
      >
        {collapsed ? "›" : "‹"}
      </button>
    </aside>
  );
}
