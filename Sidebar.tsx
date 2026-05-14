"use client";

// ============================================================
// components/Sidebar.tsx
// Collapsible sidebar — toggles via SidebarContext.
// Hidden entirely on the landing page ("/").
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  MessageSquare,
  Lightbulb,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  PanelLeftClose,
} from "lucide-react";
import { dummyUser } from "@/lib/dummyData";
import { useSidebar } from "./SidebarContext";
import clsx from "clsx";

const navLinks = [
  { href: "/dashboard",       label: "Dashboard",   icon: LayoutDashboard },
  { href: "/chat",            label: "AI Advisor",   icon: MessageSquare   },
  { href: "/recommendations", label: "Career Paths", icon: Lightbulb       },
  { href: "/profile",         label: "My Profile",   icon: User            },
];

const bottomLinks = [
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  // Don't render sidebar on the landing page at all
  if (pathname === "/") return null;

  return (
    <aside
      className="sidebar-shell"
      style={{
        width: isOpen ? "var(--sidebar-width)" : "0px",
        minWidth: isOpen ? "var(--sidebar-width)" : "0px",
      }}
    >
      {/* Inner wrapper: always full width so content doesn't reflow during animation */}
      <div className="sidebar-inner">

        {/* ---- Logo / Brand ---- */}
        <div className="px-5 py-6 flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
              boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
            }}
          >
            <Compass size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-lg leading-none truncate" style={{ color: "var(--text)" }}>
              CareerCompass
            </p>
            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-subtle)" }}>
              AI Career Advisor
            </p>
          </div>
          {/* Collapse button inside sidebar */}
          <button
            onClick={toggle}
            className="sidebar-toggle-btn flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={15} />
          </button>
        </div>

        {/* ---- AI Session Chip ---- */}
        <div className="px-4 mb-4">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{
              background: "var(--primary-dim)",
              color: "var(--primary)",
              border: "1px solid rgba(129,140,248,0.15)",
            }}
          >
            <Sparkles size={13} />
            <span>AI Session Active</span>
            <span
              className="ml-auto w-2 h-2 rounded-full"
              style={{ background: "var(--success)", boxShadow: "0 0 6px var(--success)" }}
            />
          </div>
        </div>

        {/* ---- Section label ---- */}
        <p
          className="px-5 mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-subtle)" }}
        >
          Navigation
        </p>

        {/* ---- Main Nav ---- */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={clsx("sidebar-link", isActive && "active")}
              >
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{label}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto" style={{ color: "var(--primary)" }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ---- Divider ---- */}
        <div className="divider mx-4 my-3" />

        {/* ---- User Info ---- */}
        <div className="px-4 pb-2">
          <div
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
            style={{ background: "var(--bg-card)" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #fb923c)", color: "#fff" }}
            >
              {dummyUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
                {dummyUser.name}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                {dummyUser.goalRole}
              </p>
            </div>
          </div>
        </div>

        {/* ---- Bottom Links ---- */}
        <div className="px-3 pb-4 space-y-1">
          {bottomLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="sidebar-link">
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          ))}
          <button
            className="sidebar-link w-full text-left"
            style={{ color: "var(--text-muted)" }}
            onClick={() => alert("Logging out…")}
          >
            <LogOut size={17} strokeWidth={1.8} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
