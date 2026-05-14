const express = require("express");
const router  = express.Router();
const Student = require("../models/Student");
const { processMessage } = require("../logic/chatEngine");

// ─── POST /api/chat/:studentId ── Send a message ──────────────────────────
/**
 * Body: { message: "What career suits me?" }
 * Returns: { success, reply, history }
 */
router.post("/:studentId", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim())
      return res.status(400).json({ success: false, error: "Message is required" });

    const student = await Student.findById(req.params.studentId);
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });

    // Generate bot reply
    const reply = processMessage(message, student);

    // Persist conversation
    student.chatHistory.push({ role: "user", message: message.trim() });
    student.chatHistory.push({ role: "bot",  message: reply });

    // Keep history bounded to last 100 messages
    if (student.chatHistory.length > 100)
      student.chatHistory = student.chatHistory.slice(-100);

    await student.save();

    res.json({
      success: true,
      reply,
      history: student.chatHistory.slice(-10), // Return last 10 for UI
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/chat/anonymous ── Chat without a student profile ───────────
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim())
      return res.status(400).json({ success: false, error: "Message is required" });

    const reply = processMessage(message, null);
    res.json({ success: true, reply });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/chat/:studentId/history ── Get chat history ─────────────────
router.get("/:studentId/history", async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query;
    const student = await Student.findById(req.params.studentId).select("chatHistory name");
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });

    const history = student.chatHistory
      .slice(-(parseInt(limit) + parseInt(skip)))
      .slice(0, parseInt(limit));

    res.json({ success: true, count: history.length, data: history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── DELETE /api/chat/:studentId/history ── Clear chat history ────────────
router.delete("/:studentId/history", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $set: { chatHistory: [] } },
      { new: true }
    );
    if (!student)
      return res.status(404).json({ success: false, error: "Student not found" });
    res.json({ success: true, message: "Chat history cleared" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
