// ============================================================
// components/ChatMessage.tsx
// Renders a single chat message bubble — user or AI.
// AI messages support markdown-like bold (**text**) formatting
// and quick-reply suggestion chips.
// ============================================================

import { Compass, Sparkles } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "ai";
  content: string;
  time: string;
  suggestions?: string[];
  // Called when user clicks a suggestion chip
  onSuggestion?: (text: string) => void;
}

// Simple renderer: converts **bold** markers to <strong> elements
function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: "var(--text)", fontWeight: 600 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function ChatMessage({
  role,
  content,
  time,
  suggestions = [],
  onSuggestion,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} animate-fade-up opacity-0`}
      style={{ animationFillMode: "forwards" }}
    >
      {/* ---- Avatar ---- */}
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
            boxShadow: "0 0 14px rgba(99,102,241,0.4)",
          }}
        >
          <Compass size={14} color="#fff" />
        </div>
      )}

      <div className={`flex flex-col gap-2 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        {/* ---- Name + time row ---- */}
        <div className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            {isUser ? "You" : "CareerCompass AI"}
          </span>
          {!isUser && <Sparkles size={10} style={{ color: "var(--primary)" }} />}
          <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
            {time}
          </span>
        </div>

        {/* ---- Bubble ---- */}
        <div
          className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}
          style={{ padding: "12px 16px", fontSize: "14px", lineHeight: "1.65" }}
        >
          {/* Render newlines as paragraphs */}
          {content.split("\n\n").map((para, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {renderContent(para)}
            </p>
          ))}
        </div>

        {/* ---- Suggestion chips (AI only) ---- */}
        {!isUser && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => onSuggestion?.(s)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
