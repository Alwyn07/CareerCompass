/**
 * Career Recommendation Engine
 * Rule-based scoring system that matches student profiles to careers.
 *
 * Scoring Breakdown (max 100 pts):
 *   Stream match        → 25 pts
 *   Interest overlap    → 30 pts
 *   Skill overlap       → 20 pts
 *   Percentage cutoff   → 15 pts
 *   Work style match    → 10 pts
 */

const WEIGHTS = {
  STREAM:      25,
  INTEREST:    30,
  SKILL:       20,
  PERCENTAGE:  15,
  WORK_STYLE:  10,
};

/**
 * Normalise a string array for comparison.
 */
const normalise = (arr = []) =>
  arr.map((s) => s.trim().toLowerCase());

/**
 * Count overlapping elements between two arrays (normalised).
 */
const overlapCount = (a = [], b = []) => {
  const setA = new Set(normalise(a));
  return normalise(b).filter((x) => setA.has(x)).length;
};

/**
 * Score a single career against a student profile.
 * @param {Object} career   - Career document from DB
 * @param {Object} student  - Student document from DB
 * @returns {{ score: number, breakdown: Object }}
 */
const scoreCareer = (career, student) => {
  let score = 0;
  const breakdown = {};

  // ── 1. Stream Match ───────────────────────────────────────────────────
  const streamAllowed =
    career.requiredStreams.includes("Any") ||
    career.requiredStreams.includes(student.stream);
  breakdown.stream = streamAllowed ? WEIGHTS.STREAM : 0;
  score += breakdown.stream;

  // ── 2. Interest Match ─────────────────────────────────────────────────
  const interestHits = overlapCount(career.requiredInterests, student.interests);
  const maxInterests = Math.max(career.requiredInterests.length, 1);
  breakdown.interest = parseFloat(
    ((interestHits / maxInterests) * WEIGHTS.INTEREST).toFixed(2)
  );
  score += breakdown.interest;

  // ── 3. Skill Match ────────────────────────────────────────────────────
  const skillHits = overlapCount(career.requiredSkills, student.skills);
  const maxSkills = Math.max(career.requiredSkills.length, 1);
  breakdown.skill = parseFloat(
    ((skillHits / maxSkills) * WEIGHTS.SKILL).toFixed(2)
  );
  score += breakdown.skill;

  // ── 4. Percentage / Academic Fit ──────────────────────────────────────
  const pct = student.overallPercentage || 0;
  if (pct >= career.minPercentage) {
    // Bonus for exceeding minimum by more
    const buffer = pct - career.minPercentage;
    const pctScore = Math.min(WEIGHTS.PERCENTAGE, WEIGHTS.PERCENTAGE * (1 + buffer / 100));
    breakdown.percentage = parseFloat(pctScore.toFixed(2));
  } else {
    breakdown.percentage = 0;
  }
  score += breakdown.percentage;

  // ── 5. Work Style Match ───────────────────────────────────────────────
  const styleMatch =
    career.workStyle.includes("any") ||
    student.preferredWorkStyle === "any" ||
    career.workStyle.includes(student.preferredWorkStyle);
  breakdown.workStyle = styleMatch ? WEIGHTS.WORK_STYLE : 0;
  score += breakdown.workStyle;

  // ── Apply career weight multiplier ────────────────────────────────────
  score = parseFloat((score * (career.weight || 1)).toFixed(2));

  return { score: Math.min(score, 100), breakdown };
};

/**
 * Generate top N career recommendations for a student.
 * @param {Object}   student  - Populated student document
 * @param {Object[]} careers  - All career documents from DB
 * @param {number}   topN     - How many results to return (default 5)
 */
const recommendCareers = (student, careers, topN = 5) => {
  const results = careers
    .map((career) => {
      const { score, breakdown } = scoreCareer(career, student);
      return {
        careerId:    career._id,
        title:       career.title,
        category:    career.category,
        description: career.description,
        score,
        breakdown,
        salary:      career.averageSalary,
        jobOutlook:  career.jobOutlook,
        entrancExams:career.entrancExams,
        topRecruiters:career.topRecruiters,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return results;
};

module.exports = { recommendCareers, scoreCareer };
