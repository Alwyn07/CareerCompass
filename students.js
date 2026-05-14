const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const Student = require("../models/Student");

// Helper: send validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

// ─── POST /api/students ── Create a new student profile ───────────────────
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("currentClass").notEmpty().withMessage("Class is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json({ success: true, data: student });
    } catch (err) {
      if (err.code === 11000)
        return res.status(409).json({ success: false, error: "Email already registered." });
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ─── GET /api/students ── List all students (dev/admin) ───────────────────
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().select("-chatHistory").lean();
    res.json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/students/:id ── Get single student ──────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/students/email/:email ── Find by email ─────────────────────
router.get("/email/:email", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email.toLowerCase() });
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── PUT /api/students/:id ── Update student profile ─────────────────────
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── PATCH /api/students/:id/marks ── Update just marks ──────────────────
router.patch("/:id/marks", async (req, res) => {
  try {
    const { marks } = req.body;
    if (!Array.isArray(marks))
      return res.status(400).json({ success: false, error: "marks must be an array" });

    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });

    student.marks = marks;
    await student.save(); // triggers pre-save hook for grade & percentage
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── PATCH /api/students/:id/profile ── Update interests/skills/prefs ─────
router.patch("/:id/profile", async (req, res) => {
  try {
    const allowed = ["interests", "skills", "preferredWorkStyle", "careerGoal", "location", "budgetPreference", "stream"];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── DELETE /api/students/:id ── Delete student ───────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
