import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display serif for headings — editorial, prestigious feel
        display: ["'Instrument Serif'", "Georgia", "serif"],
        // Modern sans for UI elements
        sans: ["'Figtree'", "sans-serif"],
      },
      colors: {
        bg: {
          base: "#08090d",
          surface: "#10131c",
          card: "#161b28",
          raised: "#1c2234",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          DEFAULT: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.18)",
        },
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          DEFAULT: "#818cf8",
        },
        accent: {
          DEFAULT: "#fb923c",
          muted: "rgba(251,146,60,0.15)",
        },
        success: "#34d399",
        warning: "#fbbf24",
        text: {
          DEFAULT: "#f1f5f9",
          muted: "#94a3b8",
          subtle: "#475569",
        },
      },
      backgroundImage: {
        "glow-primary": "radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 60%)",
        "glow-accent": "radial-gradient(ellipse at bottom right, rgba(251,146,60,0.12) 0%, transparent 60%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.2)",
        "glow-primary": "0 0 40px rgba(99,102,241,0.25)",
        "glow-accent": "0 0 40px rgba(251,146,60,0.20)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
