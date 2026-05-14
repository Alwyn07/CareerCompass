const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, unique: true, trim: true },
    shortName:{ type: String, trim: true },  // e.g. "IIT Bombay"

    type: {
      type: String,
      enum: ["Government", "Private", "Deemed", "Central University", "IIT", "NIT", "AIIMS"],
      required: true,
    },

    location: {
      city:  { type: String, required: true },
      state: { type: String, required: true },
    },

    ranking: {
      nirf:    { type: Number },   // NIRF rank
      overall: { type: Number },
    },

    // Programs this college offers
    programs: [
      {
        name:        String,   // e.g. "B.Tech Computer Science"
        duration:    String,   // "4 years"
        careerPaths: [String], // links to Career.title
      },
    ],

    // Admission criteria
    admission: {
      entranceExams: [String],       // ["JEE Main", "JEE Advanced"]
      minPercentage: { type: Number, default: 50 },
      cutoffRank:    { type: Number },
    },

    // Financials
    fees: {
      perYear: { type: Number },         // in INR
      total:   { type: Number },
      tier: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
    },

    // Meta
    website:       { type: String },
    accreditation: { type: String },  // e.g. "NAAC A++"
    description:   { type: String },
    highlights:    [String],
  },
  { timestamps: true }
);

CollegeSchema.index({ "location.state": 1 });
CollegeSchema.index({ "fees.tier": 1 });
CollegeSchema.index({ "ranking.nirf": 1 });

module.exports = mongoose.model("College", CollegeSchema);
