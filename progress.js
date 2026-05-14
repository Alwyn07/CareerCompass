const express = require("express");
const router  = express.Router();
const Student = require("../models/Student");

// ─── Milestone definitions ────────────────────────────────────────────────
const MILESTONES = [
  { id: "profile_complete",      label: "Complete profile",           points: 100, check: (s) => !!(s.name && s.email && s.currentClass && s.stream) },
  { id: "marks_added",           label: "Add subject marks",          points: 80,  check: (s) => s.marks?.length >= 3 },
  { id: "recommendations_viewed",label: "Get career recommendations", points: 120, check: (s) => !!s.lastRecommendations?.generatedAt },
  { id: "chat_used",             label: "Use AI counsellor",          points: 100, check: (s) => s.chatHistory?.length >= 2 },
  { id: "interests_added",       label: "Add 3+ interests",           points: 60,  check: (s) => s.interests?.length >= 3 },
  { id: "skills_added",          label: "Add 3+ skills",              points: 60,  check: (s) => s.skills?.length >= 3 },
];

/**
 * GET /api/progress/:studentId
 * Returns milestone completion, points, streak, and profile completion %.
 */
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    // Evaluate milestones
    const milestones = MILESTONES.map((m) => ({
      ...m,
      done: m.check(student),
    }));

    const completedMilestones = milestones.filter((m) => m.done);
    const totalPoints = completedMilestones.reduce((sum, m) => sum + m.points, 0);
    const maxPoints   = MILESTONES.reduce((sum, m) => sum + m.points, 0);

    // Profile completion %
    const fields = [
      student.name, student.email, student.stream, student.currentClass,
      student.interests?.length, student.skills?.length,
      student.marks?.length, student.location,
    ];
    const filled = fields.filter(Boolean).length;
    const profileCompletion = Math.round((filled / fields.length) * 100);

    res.json({
      success: true,
      data: {
        milestones,
        completedCount:  completedMilestones.length,
        totalCount:      MILESTONES.length,
        points:          totalPoints,
        maxPoints,
        profileCompletion,
        overallPercentage: student.overallPercentage,
        streak: 0, // Extend with a real streak system using login timestamps
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
