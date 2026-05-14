const express = require("express");
const router  = express.Router();
const Career  = require("../models/Career");

// ─── GET /api/careers ── List careers with optional filters ───────────────
router.get("/", async (req, res) => {
  try {
    const { category, stream, limit = 50 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (stream)   filter.requiredStreams = { $in: [stream, "Any"] };

    const careers = await Career.find(filter).sort({ weight: -1 }).limit(parseInt(limit)).lean();
    res.json({ success: true, count: careers.length, data: careers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/careers/:id ── Single career ────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career)
      return res.status(404).json({ success: false, error: "Career not found" });
    res.json({ success: true, data: career });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/careers/categories/list ── All categories ──────────────────
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Career.distinct("category");
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
