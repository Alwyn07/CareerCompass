const mongoose = require("mongoose");

// ─── Sub-schemas ──────────────────────────────────────────────────────────

const MarksSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    grade: { type: String, trim: true }, // auto-derived or user-provided
  },
  { _id: false }
);

const ChatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "bot"], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ─── Main Student Schema ──────────────────────────────────────────────────

const StudentSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    age: { type: Number, min: 10, max: 30 },
    currentClass: {
      type: String,
      enum: ["8th", "9th", "10th", "11th", "12th", "Undergraduate", "Graduate"],
      required: true,
    },
    stream: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "General", "Not Decided"],
      default: "Not Decided",
    },

    // Academic Performance
    marks: [MarksSchema],
    overallPercentage: { type: Number, min: 0, max: 100 }, // auto-calculated

    // Profile Data (used for recommendations)
    interests: {
      type: [String],
      default: [],
      // e.g. ["coding", "design", "biology", "business", "art"]
    },
    skills: {
      type: [String],
      default: [],
      // e.g. ["problem solving", "communication", "mathematics"]
    },
    preferredWorkStyle: {
      type: String,
      enum: ["indoor", "outdoor", "remote", "field", "lab", "office", "any"],
      default: "any",
    },
    careerGoal: { type: String, trim: true, maxlength: 300 },

    // Location & Preferences
    location: { type: String, trim: true }, // city/state for college filtering
    budgetPreference: {
      type: String,
      enum: ["low", "medium", "high", "any"],
      default: "any",
    },

    // Recommendation Cache (updated on each recommendation call)
    lastRecommendations: {
      careers: [{ type: String }],
      colleges: [{ type: String }],
      generatedAt: { type: Date },
    },

    // Chat History
    chatHistory: [ChatMessageSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtual: auto overall percentage ────────────────────────────────────
StudentSchema.virtual("computedPercentage").get(function () {
  if (!this.marks || this.marks.length === 0) return null;
  const total = this.marks.reduce((sum, m) => sum + m.score, 0);
  return parseFloat((total / this.marks.length).toFixed(2));
});

// ─── Pre-save hook: derive grade labels & overall % ───────────────────────
StudentSchema.pre("save", function (next) {
  if (this.marks && this.marks.length > 0) {
    this.marks = this.marks.map((m) => {
      let grade;
      if (m.score >= 90)      grade = "A+";
      else if (m.score >= 80) grade = "A";
      else if (m.score >= 70) grade = "B";
      else if (m.score >= 60) grade = "C";
      else if (m.score >= 50) grade = "D";
      else                    grade = "F";
      return { ...m.toObject ? m.toObject() : m, grade };
    });
    const total = this.marks.reduce((sum, m) => sum + m.score, 0);
    this.overallPercentage = parseFloat((total / this.marks.length).toFixed(2));
  }
  next();
});

// ─── Index ────────────────────────────────────────────────────────────────
StudentSchema.index({ email: 1 });
StudentSchema.index({ interests: 1 });

module.exports = mongoose.model("Student", StudentSchema);
