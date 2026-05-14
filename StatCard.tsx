// ============================================================
// components/StatCard.tsx
// Dashboard metric card with icon, value, trend indicator.
// ============================================================

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  color: "primary" | "accent" | "success" | "warning";
  // Delay for staggered entrance animation (ms)
  delay?: number;
}

// Map color names to CSS variable strings
const colorMap = {
  primary: { bg: "var(--primary-dim)",              text: "var(--primary)" },
  accent:  { bg: "var(--accent-dim)",               text: "var(--accent)"  },
  success: { bg: "rgba(52,211,153,0.12)",            text: "var(--success)" },
  warning: { bg: "rgba(251,191,36,0.12)",            text: "var(--warning)" },
};

export default function StatCard({ label, value, change, trend, color, delay = 0 }: StatCardProps) {
  const colors = colorMap[color];

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const trendColor =
    trend === "up" ? "var(--success)" : trend === "down" ? "#f87171" : "var(--text-muted)";

  return (
    <div
      className="glass-card p-5 animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Header row: label + colored indicator dot */}
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
        <span
          className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
          style={{ background: colors.text, boxShadow: `0 0 8px ${colors.text}` }}
        />
      </div>

      {/* Main value */}
      <p
        className="font-display text-3xl mb-2"
        style={{ color: "var(--text)" }}
      >
        {value}
      </p>

      {/* Trend / change label */}
      <div className="flex items-center gap-1.5">
        <TrendIcon size={13} style={{ color: trendColor }} strokeWidth={2.5} />
        <span className="text-xs font-medium" style={{ color: trendColor }}>
          {change}
        </span>
      </div>
    </div>
  );
}
