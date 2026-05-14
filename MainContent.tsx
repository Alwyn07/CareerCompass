"use client";

// ============================================================
// components/MainContent.tsx
// Wraps <main> so it can read SidebarContext and slide its
// left margin in sync with the sidebar open/closed state.
// Landing page (pathname "/") gets no margin at all.
// ============================================================

import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  // Landing page: always full-width, no sidebar offset
  const isLanding = pathname === "/";

  return (
    <main
      className="main-content"
      style={{
        marginLeft: isLanding ? "0px" : isOpen ? "var(--sidebar-width)" : "0px",
      }}
    >
      {children}
    </main>
  );
}
