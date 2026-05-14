"use client";

// ============================================================
// components/TopBar.tsx
// Page-level header with sidebar toggle, title, quick actions.
// ============================================================

import { Bell, Search, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { dummyUser } from "@/lib/dummyData";
import { useSidebar } from "./SidebarContext";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const { isOpen, toggle } = useSidebar();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(8,9,13,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Sidebar toggle button */}
        <button
          onClick={toggle}
          className="sidebar-toggle-btn w-9 h-9 flex items-center justify-center rounded-lg"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen
            ? <PanelLeftClose size={17} />
            : <PanelLeftOpen size={17} />
          }
        </button>

        {/* Page title */}
        <div>
          <h1 className="font-display text-2xl leading-tight" style={{ color: "var(--text)" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
          onClick={() => alert("Search coming soon")}
        >
          <Search size={14} />
          <span className="hidden sm:block">Quick search…</span>
          <kbd
            className="hidden sm:block text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--bg-card)", color: "var(--text-subtle)" }}
          >
            ⌘K
          </kbd>
        </button>

        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
          onClick={() => alert("No new notifications")}
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </button>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #fb923c)", color: "#fff" }}
          title={dummyUser.name}
        >
          {dummyUser.avatar}
        </div>
      </div>
    </header>
  );
}
