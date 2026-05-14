// ============================================================
// components/CareerCard.tsx
// Rich career recommendation card with match score,
// salary, skills, and missing skills highlight.
// ============================================================

import { MapPin, TrendingUp, Clock, Wifi, WifiOff } from "lucide-react";
import clsx from "clsx";

interface CareerCardProps {
  title: string;
  company_type: string;
  matchScore: number;
  salaryRange: string;
  growthRate: string;
  timeToTransition: string;
  skills: string[];
  missingSkills: string[];
  description: string;
  tag: string;
  tagColor: "primary" | "accent" | "success" | "warning";
  demandLevel: string;
  remote: boolean;
  delay?: number;
}

// Map tagColor to CSS classes
const tagColorClass = {
  primary: "chip-primary",
  accent:  "chip-accent",
  success: "chip-success",
  warning: "chip-warning",
};

export default function CareerCard({
  title,
  company_type,
  matchScore,
  salaryRange,
  growthRate,
  timeToTransition,
  skills,
  missingSkills,
  description,
  tag,
  tagColor,
  demandLevel,
  remote,
  delay = 0,
}: CareerCardProps) {
  // Score color: green > 85, amber > 70, red otherwise
  const scoreColor =
    matchScore >= 85
      ? "var(--success)"
      : matchScore >= 70
      ? "var(--warning)"
      : "#f87171";

  return (
    <div
      className="glass-card p-6 animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* ---- Header ---- */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          {/* Tag chip */}
          <span className={clsx("chip mb-2", tagColorClass[tagColor])}>{tag}</span>
          <h3
            className="font-display text-xl truncate"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            {company_type}
          </p>
        </div>

        {/* Match Score ring */}
        <div className="flex-shrink-0 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
            style={{
              background: `conic-gradient(${scoreColor} ${matchScore}%, var(--bg-raised) 0%)`,
              boxShadow: `0 0 0 4px var(--bg-card), 0 0 20px ${scoreColor}40`,
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--bg-card)", color: scoreColor }}
            >
              {matchScore}%
            </div>
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
            Match
          </p>
        </div>
      </div>

      {/* ---- Description ---- */}
      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>

      {/* ---- Meta chips row ---- */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium"
          style={{ background: "var(--bg-raised)", color: "var(--text-muted)" }}
        >
          💰 {salaryRange}
        </span>
        <span
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium"
          style={{ background: "var(--bg-raised)", color: "var(--text-muted)" }}
        >
          <TrendingUp size={11} /> {growthRate} Growth
        </span>
        <span
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium"
          style={{ background: "var(--bg-raised)", color: "var(--text-muted)" }}
        >
          <Clock size={11} /> {timeToTransition}
        </span>
        <span
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium"
          style={{ background: "var(--bg-raised)", color: "var(--text-muted)" }}
        >
          {remote ? <Wifi size={11} /> : <WifiOff size={11} />}
          {remote ? "Remote OK" : "On-site"}
        </span>
      </div>

      {/* ---- Required Skills ---- */}
      <div className="mb-4">
        <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
          Key Skills Needed
        </p>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span key={s} className="chip chip-primary text-xs">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Missing Skills ---- */}
      {missingSkills.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
            Gaps to Bridge
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{
                  background: "rgba(248,113,113,0.10)",
                  color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.15)",
                }}
              >
                ⚠ {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ---- CTA ---- */}
      <div className="divider mb-4" />
      <div className="flex gap-3">
        <button className="btn-primary flex-1 justify-center text-sm">
          Explore This Path
        </button>
        <button className="btn-ghost text-sm">
          Save
        </button>
      </div>
    </div>
  );
}
