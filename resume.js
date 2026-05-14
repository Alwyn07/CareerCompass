const express = require("express");
const router  = express.Router();
const mongoose = require("mongoose");
const Student  = require("../models/Student");

// Lightweight inline schema — no separate file needed for MVP
const ResumeSchema = new mongoose.Schema({
  studentId:    { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
  name:         String,
  email:        String,
  phone:        String,
  location:     String,
  linkedin:     String,
  objective:    String,
  skills:       [String],
  projects:     [{ name: String, desc: String }],
  achievements: [String],
  updatedAt:    { type: Date, default: Date.now },
}, { timestamps: true });

const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

// ─── GET /api/resume/:studentId ── Fetch saved resume ─────────────────────
router.get("/:studentId", async (req, res) => {
  try {
    const resume = await Resume.findOne({ studentId: req.params.studentId });
    if (!resume) return res.status(404).json({ success: false, error: "No resume found for this student" });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/resume/:studentId ── Save / update resume ──────────────────
router.post("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    const resume = await Resume.findOneAndUpdate(
      { studentId: req.params.studentId },
      { ...req.body, studentId: req.params.studentId, updatedAt: new Date() },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── DELETE /api/resume/:studentId ── Clear resume ────────────────────────
router.delete("/:studentId", async (req, res) => {
  try {
    await Resume.findOneAndDelete({ studentId: req.params.studentId });
    res.json({ success: true, message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
