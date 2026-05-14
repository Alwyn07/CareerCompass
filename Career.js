const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    // e.g. "Software Engineer", "Doctor", "Graphic Designer"

    category: {
      type: String,
      required: true,
      enum: [
        "Technology", "Healthcare", "Business", "Arts & Design",
        "Science", "Law", "Education", "Engineering",
        "Social Sciences", "Media & Communication",
      ],
    },

    description: { type: String, required: true },

    // Matching criteria (used by rule-based engine)
    requiredStreams: {
      type: [String],
      enum: ["Science", "Commerce", "Arts", "General", "Any"],
      default: ["Any"],
    },
    requiredInterests: [String], // tags that boost match score
    requiredSkills:   [String],
    minPercentage:    { type: Number, default: 0 },

    // Career meta
    averageSalary: {
      entry:  { type: String }, // e.g. "₹3–5 LPA"
      mid:    { type: String },
      senior: { type: String },
    },
    jobOutlook:   { type: String, enum: ["Excellent", "Good", "Moderate", "Declining"] },
    workStyle:    { type: [String], default: ["any"] },
    topRecruiters:[String],
    entrancExams: [String], // e.g. ["JEE", "NEET"]

    // Scoring weight (higher = prioritized in results)
    weight: { type: Number, default: 1 },
  },
  { timestamps: true }
);

CareerSchema.index({ category: 1, requiredInterests: 1 });

module.exports = mongoose.model("Career", CareerSchema);
