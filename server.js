require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const app = express();

// ─── Connect to MongoDB ────────────────────────────────────────────────────
connectDB();

// ─── Security & Middleware ─────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Rate limiter for all API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { success: false, error: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// ─── Routes ───────────────────────────────────────────────────────────────
app.use("/api/students",       require("./routes/students"));
app.use("/api/chat",           require("./routes/chat"));
app.use("/api/recommendations",require("./routes/recommendations"));
app.use("/api/colleges",       require("./routes/colleges"));
app.use("/api/careers",        require("./routes/careers"));
app.use("/api/progress",       require("./routes/progress"));
app.use("/api/resume",         require("./routes/resume"));

// ─── Health Check ─────────────────────────────────────────────────────────
app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "Career Guidance API is running 🚀", timestamp: new Date() })
);

// ─── 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` })
);

// ─── Global Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("❌ Error:", err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}\n`);
});
