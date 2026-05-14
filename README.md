# 🧭 CareerCompass — AI Career Guidance Web App

A full-stack-ready Next.js 14 frontend for an AI-powered career guidance platform.
Clean, modern dark UI with sidebar navigation, rich data components, and full responsiveness.

---

## 📁 Folder Structure

```
careercompass/
├── app/                          # Next.js App Router pages
│   ├── globals.css               # Global styles, CSS vars, design tokens
│   ├── layout.tsx                # Root layout (Sidebar + main area)
│   ├── loading.tsx               # Route-transition skeleton (auto by Next.js)
│   ├── not-found.tsx             # Custom 404 page
│   ├── page.tsx                  # 🏠 Landing page (full-width hero)
│   ├── dashboard/
│   │   └── page.tsx              # 📊 Dashboard — stats, roadmap, activity
│   ├── chat/
│   │   └── page.tsx              # 💬 AI Chat interface
│   ├── recommendations/
│   │   └── page.tsx              # 🧭 Career path recommendation cards
│   ├── profile/
│   │   └── page.tsx              # 👤 User profile, skills, resources
│   └── settings/
│       └── page.tsx              # ⚙️  Settings — notifications, privacy
│
├── components/                   # Reusable UI components
│   ├── Sidebar.tsx               # Fixed sidebar with nav links + user info
│   ├── TopBar.tsx                # Sticky page header with search + avatar
│   ├── StatCard.tsx              # Dashboard metric card w/ trend indicator
│   ├── CareerCard.tsx            # Rich career path card with match score
│   ├── ChatMessage.tsx           # Chat bubble (user + AI), with suggestions
│   └── LoadingSkeleton.tsx       # Skeleton loader for Suspense boundaries
│
├── lib/
│   └── dummyData.ts              # All mock data (user, stats, messages, etc.)
│
├── public/                       # Static assets (add your own images here)
│
├── package.json
├── tailwind.config.ts            # Custom tokens: colors, fonts, animations
├── tsconfig.json
├── postcss.config.js
└── next.config.mjs
```

---

## 🎨 Design System

### Aesthetic
Dark editorial — premium, authoritative, and calm. Like a high-end career advisory firm brought online.

### Fonts
| Role    | Font             | Usage                              |
|---------|------------------|------------------------------------|
| Display | Instrument Serif | Page titles, card headings, hero   |
| UI      | Figtree          | Body text, labels, buttons, inputs |

### Color Palette
| Token             | Value                       | Usage                              |
|-------------------|-----------------------------|------------------------------------|
| `--bg-base`       | `#08090d`                   | Page background                    |
| `--bg-surface`    | `#10131c`                   | Sidebar, topbar background         |
| `--bg-card`       | `#161b28`                   | Cards and panels                   |
| `--bg-raised`     | `#1c2234`                   | Inputs, hover states               |
| `--primary`       | `#818cf8` (soft indigo)     | CTAs, links, highlights            |
| `--accent`        | `#fb923c` (warm orange)     | Secondary actions, badges          |
| `--success`       | `#34d399` (emerald)         | Completed states, positive metrics |
| `--warning`       | `#fbbf24` (amber)           | Gaps, caution indicators           |
| `--text`          | `#f1f5f9`                   | Primary text                       |
| `--text-muted`    | `#94a3b8`                   | Secondary text                     |
| `--text-subtle`   | `#475569`                   | Timestamps, labels, meta           |

### Utility Classes (globals.css)
| Class             | Description                                                    |
|-------------------|----------------------------------------------------------------|
| `.glass-card`     | Dark card with subtle shine, hover border glow                 |
| `.btn-primary`    | Indigo filled button with hover lift + shadow                  |
| `.btn-ghost`      | Transparent bordered button                                    |
| `.chip`           | Compact status badge (use with `.chip-primary` etc.)           |
| `.input-base`     | Styled text input with focus ring                              |
| `.progress-bar`   | Slim progress bar container                                    |
| `.progress-fill`  | Gradient fill for progress bar                                 |
| `.sidebar-link`   | Nav link with active state + left border indicator             |
| `.gradient-text`  | Multi-color background-clip text gradient                      |
| `.skeleton`       | Animated shimmer loading placeholder                           |
| `.divider`        | 1px horizontal separator                                       |

---

## 📄 Pages

### `/` — Landing Page
Full-width hero bypassing the sidebar layout. Features:
- Navbar with logo and CTAs
- Animated hero headline with gradient text
- Social proof stats strip
- 4-feature grid with icon cards
- Final CTA card + footer

### `/dashboard` — Dashboard
Main app home after sign-in:
- Goal banner with AI advisor CTA
- 4 stat cards (Match Score, Skills, Paths, Sessions)
- Career roadmap progress tracker (6 steps, visual bars)
- Recent activity feed
- Skill gap overview bar chart

### `/chat` — AI Advisor Chat
Scrollable message thread interface:
- Pre-loaded conversation with dummy AI/user messages
- Typing indicator (animated dots)
- Quick-prompt chips at the bottom
- Textarea input supporting Enter-to-send
- Simulated AI responses from a `demoResponses` dictionary
- Suggestion chip bubbles under AI messages

### `/recommendations` — Career Paths
Filterable grid of career recommendation cards:
- AI insight banner summarising the analysis
- Sort filters: All, Highest Match, Highest Salary, Quickest Entry
- `CareerCard` with match score ring, salary, skills, gaps, and CTA

### `/profile` — My Profile
3-column layout:
- User card with avatar, completion bar, and metadata
- Skills chip list
- Career goal banner
- Editable bio textarea
- Skill assessment bars
- Recommended learning resources list

### `/settings` — Settings
Full settings page with:
- Account information form (name, email, location, experience)
- Notification toggles (email, push, weekly digest, new matches)
- Appearance toggles (dark mode, compact sidebar, animations)
- Privacy toggles + GDPR data download
- Danger zone: reset data / delete account

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd careercompass
npm install
```

### 2. Run the development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

Start on the landing page (`/`), then navigate to `/dashboard` to see the full app.

---

## 🔌 Connecting a Real Backend

All data currently comes from `lib/dummyData.ts`. To connect a real API:

1. Replace imports from `@/lib/dummyData` with `fetch()` / `axios` calls in each page.
2. For server components (no `"use client"`), fetch data directly in the component body using `async/await`.
3. For client components, use `useEffect` + `useState` or a data-fetching library like **SWR** or **React Query**.

Example server-side fetch pattern:
```tsx
// app/dashboard/page.tsx (server component)
async function getDashboardStats() {
  const res = await fetch("https://your-api.com/stats", { cache: "no-store" });
  return res.json();
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  // ...
}
```

---

## 🤖 Adding Real AI (Anthropic API)

To power the chat with Claude:

```ts
// app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    system: `You are CareerCompass, an expert AI career advisor. 
             The user is a software engineer transitioning to Product Management.
             Give clear, specific, actionable career guidance.`,
    messages,
  });

  return Response.json({ content: response.content[0] });
}
```

Then replace the `setTimeout` simulation in `app/chat/page.tsx` with a `fetch("/api/chat", ...)` call.

---

## 📦 Key Dependencies

| Package        | Version   | Purpose                              |
|----------------|-----------|--------------------------------------|
| `next`         | 14.2.3    | React framework with App Router      |
| `react`        | ^18       | UI library                           |
| `lucide-react` | ^0.383.0  | Icon library                         |
| `clsx`         | ^2.1.1    | Conditional className utility        |
| `tailwindcss`  | ^3.4.1    | Utility-first CSS framework          |
| `typescript`   | ^5        | Type safety                          |

---

## 📱 Responsive Behaviour

| Breakpoint | Sidebar        | Layout changes                       |
|------------|----------------|--------------------------------------|
| `< 768px`  | Hidden (0px)   | Full-width content, no sidebar       |
| `≥ 768px`  | 260px fixed    | Content offset by `--sidebar-width`  |

On mobile, add a hamburger menu button to `TopBar.tsx` and toggle a `.mobile-open` class on the sidebar to slide it in.

---

*Built with Next.js 14 App Router · Tailwind CSS · TypeScript · Lucide Icons*
