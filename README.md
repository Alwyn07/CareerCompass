# CareerCompass — Setup Guide

A full-stack AI-powered career guidance app for students.

## Project Structure

```
careercompass/
├── backend/          # Node.js + Express + MongoDB API (port 5000)
└── frontend/         # Next.js 14 app (port 3000)
```

---

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm

---

## 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env and set your MONGO_URI if using Atlas

# (Optional) Seed the database with sample data
npm run seed

# Start the server
npm run dev
```

The API will run at **http://localhost:5000**

---

## 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The UI will be available at **http://localhost:3000**

---

## Available API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET/POST | /api/students | Student CRUD |
| GET/POST | /api/chat | AI chat |
| GET | /api/recommendations | Career recommendations |
| GET | /api/colleges | College listings |
| GET | /api/careers | Career listings |
| GET | /api/progress/:id | Student progress |
| GET | /api/resume/:id | Resume data |

---

## Environment Variables (backend/.env)

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/career_guidance
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_MAX=100
```
