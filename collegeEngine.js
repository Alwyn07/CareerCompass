/**
 * College Suggestion Engine
 * Filters and scores colleges based on student profile + recommended careers.
 *
 * Scoring Breakdown (max 100 pts):
 *   Program match to career paths  → 40 pts
 *   Academic eligibility            → 30 pts
 *   Budget fit                      → 20 pts
 *   Location preference             → 10 pts
 */

const WEIGHTS = {
  PROGRAM:    40,
  ELIGIBILITY:30,
  BUDGET:     20,
  LOCATION:   10,
};

/**
 * Check if college offers programs related to the student's top careers.
 */
const programMatchScore = (college, topCareerTitles = []) => {
  if (!topCareerTitles.length) return 0;
  const careerSet = new Set(topCareerTitles.map((t) => t.toLowerCase()));

  let maxMatch = 0;
  for (const prog of college.programs) {
    const hits = (prog.careerPaths || []).filter((cp) =>
      careerSet.has(cp.toLowerCase())
    ).length;
    if (hits > 0) {
      const ratio = hits / Math.max(topCareerTitles.length, 1);
      maxMatch = Math.max(maxMatch, ratio);
    }
  }
  return parseFloat((maxMatch * WEIGHTS.PROGRAM).toFixed(2));
};

/**
 * Check academic eligibility.
 */
const eligibilityScore = (college, student) => {
  const pct = student.overallPercentage || 0;
  const minPct = college.admission?.minPercentage || 50;
  if (pct < minPct) return 0;

  // More marks above cutoff → higher score
  const buffer = pct - minPct;
  return parseFloat(Math.min(WEIGHTS.ELIGIBILITY, WEIGHTS.ELIGIBILITY * (1 + buffer / 100)).toFixed(2));
};

/**
 * Check budget fit.
 */
const budgetScore = (college, student) => {
  const pref = student.budgetPreference || "any";
  if (pref === "any") return WEIGHTS.BUDGET;
  return college.fees?.tier === pref ? WEIGHTS.BUDGET : 0;
};

/**
 * Check location preference.
 */
const locationScore = (college, student) => {
  if (!student.location) return WEIGHTS.LOCATION / 2; // neutral
  const studentLoc = student.location.toLowerCase();
  const colState   = (college.location?.state || "").toLowerCase();
  const colCity    = (college.location?.city  || "").toLowerCase();
  if (colCity.includes(studentLoc) || studentLoc.includes(colCity)) return WEIGHTS.LOCATION;
  if (colState.includes(studentLoc) || studentLoc.includes(colState)) return WEIGHTS.LOCATION * 0.7;
  return 0;
};

/**
 * Generate top N college suggestions for a student.
 * @param {Object}   student          - Student document
 * @param {Object[]} colleges         - All college documents from DB
 * @param {string[]} topCareerTitles  - Titles of top recommended careers
 * @param {number}   topN             - How many results to return
 */
const suggestColleges = (student, colleges, topCareerTitles = [], topN = 6) => {
  const results = colleges
    .map((college) => {
      const prog  = programMatchScore(college, topCareerTitles);
      const elig  = eligibilityScore(college, student);
      const budget= budgetScore(college, student);
      const loc   = locationScore(college, student);

      // Colleges that don't meet academic eligibility are excluded
      if (elig === 0) return null;

      const score = parseFloat((prog + elig + budget + loc).toFixed(2));
      return {
        collegeId:    college._id,
        name:         college.name,
        shortName:    college.shortName,
        type:         college.type,
        location:     college.location,
        ranking:      college.ranking,
        programs:     college.programs,
        admission:    college.admission,
        fees:         college.fees,
        accreditation:college.accreditation,
        highlights:   college.highlights,
        website:      college.website,
        score,
        breakdown: { prog, elig, budget, loc },
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || (a.ranking?.nirf || 999) - (b.ranking?.nirf || 999))
    .slice(0, topN);

  return results;
};

module.exports = { suggestColleges };
