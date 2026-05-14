const express = require("express");
const router  = express.Router();
const Student = require("../models/Student");
const Career  = require("../models/Career");
const College = require("../models/College");
const { recommendCareers } = require("../logic/careerEngine");
const { suggestColleges }  = require("../logic/collegeEngine");

// ─── GET /api/recommendations/:studentId ── Full recommendation package ───
/**
 * Returns top careers + top colleges in one shot.
 * Query params:
 *   topCareers  (default 5)
 *   topColleges (default 6)
 *   refresh     (default false) — force recompute even if cached
 */
router.get("/:studentId", async (req, res) => {
  try {
    const { topCareers = 5, topColleges = 6, refresh = "false" } = req.query;
    const student = await Student.findById(req.params.studentId);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });

    // Return cached results if available and not stale (< 24 hours)
    const cache = student.lastRecommendations;
    const cacheAge = cache?.generatedAt
      ? (Date.now() - new Date(cache.generatedAt).getTime()) / 1000 / 60 / 60
      : Infinity;

    if (refresh !== "true" && cacheAge < 24 && cache?.careers?.length) {
      return res.json({
        success: true,
        cached: true,
        data: {
          careers:  cache.careers,
          colleges: cache.colleges,
          generatedAt: cache.generatedAt,
        },
      });
    }

    // Load all careers and colleges from DB
    const [allCareers, allColleges] = await Promise.all([
      Career.find().lean(),
      College.find().lean(),
    ]);

    // Run engines
    const careers  = recommendCareers(student, allCareers, parseInt(topCareers));
    const topTitles = careers.map((c) => c.title);
    const colleges  = suggestColleges(student, allColleges, topTitles, parseInt(topColleges));

    // Cache results on student document
    student.lastRecommendations = {
      careers:     topTitles,
      colleges:    colleges.map((c) => c.name),
      generatedAt: new Date(),
    };
    await student.save();

    res.json({
      success: true,
      cached: false,
      data: { careers, colleges, generatedAt: student.lastRecommendations.generatedAt },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/recommendations/:studentId/careers ── Careers only ──────────
router.get("/:studentId/careers", async (req, res) => {
  try {
    const { topN = 5 } = req.query;
    const [student, allCareers] = await Promise.all([
      Student.findById(req.params.studentId),
      Career.find().lean(),
    ]);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });

    const results = recommendCareers(student, allCareers, parseInt(topN));
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/recommendations/:studentId/colleges ── Colleges only ─────────
router.get("/:studentId/colleges", async (req, res) => {
  try {
    const { topN = 6 } = req.query;
    const [student, allColleges, allCareers] = await Promise.all([
      Student.findById(req.params.studentId),
      College.find().lean(),
      Career.find().lean(),
    ]);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });

    const topCareers = recommendCareers(student, allCareers, 3).map((c) => c.title);
    const results    = suggestColleges(student, allColleges, topCareers, parseInt(topN));
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
