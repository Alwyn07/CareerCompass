const express = require("express");
const router  = express.Router();
const College = require("../models/College");

// ─── GET /api/colleges ── List colleges with optional filters ─────────────
router.get("/", async (req, res) => {
  try {
    const { state, type, budget, minRank, maxRank, limit = 20 } = req.query;
    const filter = {};
    if (state)  filter["location.state"] = new RegExp(state, "i");
    if (type)   filter.type = type;
    if (budget) filter["fees.tier"] = budget;
    if (minRank || maxRank) {
      filter["ranking.nirf"] = {};
      if (minRank) filter["ranking.nirf"].$gte = parseInt(minRank);
      if (maxRank) filter["ranking.nirf"].$lte = parseInt(maxRank);
    }

    const colleges = await College.find(filter).sort({ "ranking.nirf": 1 }).limit(parseInt(limit)).lean();
    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/colleges/:id ── Single college ──────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college)
      return res.status(404).json({ success: false, error: "College not found" });
    res.json({ success: true, data: college });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
