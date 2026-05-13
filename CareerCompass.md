# CareerCompass 🧭
**AI-powered career guidance platform for students**

CareerCompass helps students discover careers, get AI-driven recommendations, track progress, and build resumes — all in one place.

---

## 🚀 Quick Start (Windows)

Double-click `start_app.bat` — it handles everything automatically:
- Clears ports 3000 & 5000
- Auto-creates `.env` from `.env.example` if missing
- Starts backend + frontend in separate windows
- Opens app in browser

> ✅ Requires Node.js 18+ and MongoDB running locally or on Atlas.

---

## ✨ Features

- 🤖 **AI Chat** — Personalized career guidance via conversational AI
- 🎯 **Career Recommendations** — Tailored paths based on student profile
- 🏫 **College Listings** — Explore colleges aligned with career goals
- 📈 **Progress Tracking** — Monitor student growth over time
- 📄 **Resume Builder** — Auto-generate resume data per student
- 👤 **Student Management** — Full CRUD for student profiles

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI | Integrated AI chat API |

---

## 📁 Project Structure

```
careercompass/
├── backend/               # Express + MongoDB API (port 5000)
│   ├── server.js
│   ├── .env.example
│   └── ...
├── frontend/              # Next.js 14 app (port 3000)
│   └── ...
└── start_app.bat          # One-click launcher (Windows)
```

---

## ⚙️ Manual Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env      # Edit MONGO_URI if using Atlas
npm run seed              # Optional: seed sample data
npm run dev
```

API runs at **http://localhost:5000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

UI runs at **http://localhost:3000**

---

## 🌐 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET/POST | `/api/students` | Student CRUD |
| GET/POST | `/api/chat` | AI chat |
| GET | `/api/recommendations` | Career recommendations |
| GET | `/api/colleges` | College listings |
| GET | `/api/careers` | Career listings |
| GET | `/api/progress/:id` | Student progress |
| GET | `/api/resume/:id` | Resume data |

---

## 🔧 Environment Variables

Create `backend/.env` (or let `start_app.bat` auto-generate it):

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/career_guidance
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_MAX=100
```

---

## 🔮 Roadmap

- [ ] OAuth student login
- [ ] PDF resume export
- [ ] Counselor dashboard
- [ ] Mobile-responsive PWA
- [ ] Email progress reports

---

## 🤝 Contributing

Pull requests welcome. Open an issue first for major changes.

---
---

> *What started as a group project became something we truly believe in.*