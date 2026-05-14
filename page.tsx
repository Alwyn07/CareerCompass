"use client";

// ============================================================
// app/settings/page.tsx — Settings Page
// Notification prefs, theme, account actions, and danger zone.
// ============================================================

import { useState } from "react";
import TopBar from "@/components/TopBar";
import { dummyUser } from "@/lib/dummyData";
import {
  Bell,
  Palette,
  Shield,
  Trash2,
  Download,
  Mail,
  Smartphone,
  Moon,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  User,
} from "lucide-react";

// Reusable toggle row
function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="flex-1">
        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{description}</p>
      </div>
      <button onClick={() => onChange(!value)} className="flex-shrink-0 mt-0.5">
        {value ? (
          <ToggleRight size={26} style={{ color: "var(--primary)" }} />
        ) : (
          <ToggleLeft size={26} style={{ color: "var(--text-subtle)" }} />
        )}
      </button>
    </div>
  );
}

// Reusable section card wrapper
function SettingsSection({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="glass-card p-6 animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-dim)" }}
        >
          <Icon size={16} style={{ color: "var(--primary)" }} />
        </div>
        <h3 className="font-display text-lg" style={{ color: "var(--text)" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  // ---- Notification toggles ----
  const [emailDigest,    setEmailDigest]    = useState(true);
  const [pushAlerts,     setPushAlerts]     = useState(false);
  const [weeklyReport,   setWeeklyReport]   = useState(true);
  const [newMatches,     setNewMatches]     = useState(true);

  // ---- Appearance ----
  const [darkMode,       setDarkMode]       = useState(true);
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [animationsOn,   setAnimationsOn]   = useState(true);

  // ---- Privacy ----
  const [profileVisible, setProfileVisible] = useState(false);
  const [shareInsights,  setShareInsights]  = useState(true);

  // ---- Account form fields ----
  const [name,     setName]     = useState(dummyUser.name);
  const [email,    setEmail]    = useState(dummyUser.email);
  const [location, setLocation] = useState(dummyUser.location);
  const [saved,    setSaved]    = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar title="Settings" subtitle="Manage your account and preferences" />

      <div className="flex-1 px-8 py-8 max-w-4xl mx-auto w-full space-y-6">

        {/* ============ Account Info ============ */}
        <SettingsSection icon={User} title="Account Information" delay={0}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name",    val: name,     set: setName,     type: "text"  },
              { label: "Email",        val: email,    set: setEmail,    type: "email" },
              { label: "Location",     val: location, set: setLocation, type: "text"  },
            ].map(({ label, val, set, type }) => (
              <div key={label}>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="input-base"
                />
              </div>
            ))}

            {/* Experience (static select demo) */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-subtle)" }}
              >
                Experience Level
              </label>
              <select
                className="input-base"
                defaultValue="mid"
                style={{ appearance: "none", cursor: "pointer" }}
              >
                <option value="entry">Entry (0–2 yrs)</option>
                <option value="mid">Mid (3–6 yrs)</option>
                <option value="senior">Senior (7–12 yrs)</option>
                <option value="lead">Lead / Principal (12+ yrs)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button className="btn-primary text-sm" onClick={handleSave}>
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
            <button className="btn-ghost text-sm">Discard</button>
          </div>
        </SettingsSection>

        {/* ============ Notifications ============ */}
        <SettingsSection icon={Bell} title="Notifications" delay={80}>
          <ToggleRow
            label="Weekly career digest"
            description="A summary of new matches, insights, and progress every Monday."
            value={weeklyReport}
            onChange={setWeeklyReport}
          />
          <ToggleRow
            label="Email alerts"
            description="Get notified by email when the AI has new recommendations for you."
            value={emailDigest}
            onChange={setEmailDigest}
          />
          <ToggleRow
            label="Push notifications"
            description="Browser push alerts for important career updates and reminders."
            value={pushAlerts}
            onChange={setPushAlerts}
          />
          <ToggleRow
            label="New career matches"
            description="Instant alert when a high-match career path is identified."
            value={newMatches}
            onChange={setNewMatches}
          />
        </SettingsSection>

        {/* ============ Appearance ============ */}
        <SettingsSection icon={Palette} title="Appearance" delay={160}>
          <ToggleRow
            label="Dark mode"
            description="Use the dark colour scheme (recommended for extended sessions)."
            value={darkMode}
            onChange={setDarkMode}
          />
          <ToggleRow
            label="Compact sidebar"
            description="Collapse the sidebar to icons only to gain more screen space."
            value={compactSidebar}
            onChange={setCompactSidebar}
          />
          <ToggleRow
            label="UI animations"
            description="Enable entrance animations and micro-interactions throughout the app."
            value={animationsOn}
            onChange={setAnimationsOn}
          />
        </SettingsSection>

        {/* ============ Privacy ============ */}
        <SettingsSection icon={Shield} title="Privacy" delay={240}>
          <ToggleRow
            label="Public profile"
            description="Allow other CareerCompass users to discover your profile."
            value={profileVisible}
            onChange={setProfileVisible}
          />
          <ToggleRow
            label="Share anonymous insights"
            description="Contribute anonymised data to improve AI recommendations for everyone."
            value={shareInsights}
            onChange={setShareInsights}
          />

          <div className="mt-4 pt-2">
            <button
              className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "var(--bg-raised)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
              }}
              onClick={() => alert("Downloading your data…")}
            >
              <div className="flex items-center gap-3">
                <Download size={15} />
                Download my data (GDPR)
              </div>
              <ChevronRight size={14} />
            </button>
          </div>
        </SettingsSection>

        {/* ============ Danger Zone ============ */}
        <div
          className="glass-card p-6 animate-fade-up opacity-0"
          style={{
            animationDelay: "320ms",
            animationFillMode: "forwards",
            border: "1px solid rgba(248,113,113,0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(248,113,113,0.10)" }}
            >
              <Trash2 size={16} style={{ color: "#f87171" }} />
            </div>
            <h3 className="font-display text-lg" style={{ color: "#f87171" }}>
              Danger Zone
            </h3>
          </div>

          <div className="space-y-3">
            <div
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.10)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  Reset career data
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Clear all skill assessments, roadmap progress, and chat history.
                </p>
              </div>
              <button
                className="text-sm px-4 py-2 rounded-lg font-semibold flex-shrink-0"
                style={{
                  background: "rgba(248,113,113,0.10)",
                  color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.20)",
                }}
                onClick={() => confirm("This cannot be undone. Reset all career data?") && alert("Data reset.")}
              >
                Reset
              </button>
            </div>

            <div
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.10)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  Delete account
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Permanently remove your account and all associated data.
                </p>
              </div>
              <button
                className="text-sm px-4 py-2 rounded-lg font-semibold flex-shrink-0"
                style={{
                  background: "rgba(248,113,113,0.15)",
                  color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.25)",
                }}
                onClick={() => confirm("This is permanent and cannot be undone. Delete your account?") && alert("Account scheduled for deletion.")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
