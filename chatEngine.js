/**
 * Chatbot Engine — Rule-based intent matching
 *
 * Intents handled:
 *   greeting, career_query, college_query, salary_query,
 *   exam_query, profile_help, fallback
 */

const INTENTS = [
  {
    name: "greeting",
    patterns: [/\b(hello|hi|hey|good (morning|afternoon|evening)|howdy)\b/i],
    handler: (_, student) =>
      `Hi ${student?.name || "there"}! 👋 I'm your career guidance assistant. Ask me about careers, colleges, entrance exams, or get personalised recommendations!`,
  },
  {
    name: "career_query",
    patterns: [/\b(career|job|profession|field|become|work as)\b/i],
    handler: (msg, student) => {
      const name = student?.name ? `, ${student.name}` : "";
      return `Great question${name}! Based on your profile, I recommend visiting the **Recommendations** section for a personalised career list. You can also ask me things like:\n- "What skills do I need for software engineering?"\n- "Which stream is best for medicine?"\n- "What is the salary of a data scientist?"`;
    },
  },
  {
    name: "stream_advice",
    patterns: [/\b(stream|science|commerce|arts|humanities)\b/i],
    handler: (msg) => {
      if (/science/i.test(msg))
        return "**Science stream** opens doors to Engineering (JEE), Medicine (NEET), Research, and more. Best if you love Math, Physics, Chemistry, or Biology.";
      if (/commerce/i.test(msg))
        return "**Commerce stream** leads to CA, MBA, Banking, Finance, and Entrepreneurship. Great if you enjoy Economics and Business Studies.";
      if (/arts|humanities/i.test(msg))
        return "**Arts/Humanities** is perfect for Law, Journalism, Design, Psychology, Teaching, and Civil Services. Very versatile!";
      return "Choosing the right stream is crucial. Tell me your interests and I can suggest the best fit between Science, Commerce, and Arts!";
    },
  },
  {
    name: "exam_query",
    patterns: [/\b(exam|entrance|jee|neet|cat|clat|upsc|gate|cuet|nda)\b/i],
    handler: (msg) => {
      const examMap = {
        jee:  "**JEE (Main + Advanced)** → Engineering at IITs, NITs. Math, Physics, Chemistry.",
        neet: "**NEET-UG** → MBBS, BDS at govt/private medical colleges.",
        cat:  "**CAT** → MBA at IIMs and top B-schools.",
        clat: "**CLAT** → LLB at National Law Universities.",
        gate: "**GATE** → M.Tech / PSU jobs for engineers.",
        upsc: "**UPSC CSE** → IAS, IPS, IFS and other civil services.",
        cuet: "**CUET** → Undergraduate admissions in central universities.",
        nda:  "**NDA** → National Defence Academy for Army, Navy, Air Force.",
      };
      const found = Object.entries(examMap).find(([key]) =>
        new RegExp(key, "i").test(msg)
      );
      return found
        ? found[1]
        : "Key entrance exams in India:\n• Engineering: JEE Main/Advanced\n• Medicine: NEET\n• Management: CAT/XAT\n• Law: CLAT\n• Civil Services: UPSC\n• Defence: NDA\n\nWhich one would you like details on?";
    },
  },
  {
    name: "salary_query",
    patterns: [/\b(salary|earn|income|pay|lpa|package|ctc)\b/i],
    handler: (msg) => {
      const salaryGuide = {
        "software engineer":   "₹4–8 LPA (entry) → ₹15–30 LPA (mid) → ₹40+ LPA (senior)",
        doctor:                "₹6–12 LPA (entry) → ₹15–40 LPA (specialist)",
        "data scientist":      "₹6–12 LPA (entry) → ₹20–40 LPA (mid) → ₹50+ LPA (senior)",
        lawyer:                "₹3–6 LPA (entry) → ₹15–50 LPA (experienced)",
        "graphic designer":    "₹2–4 LPA (entry) → ₹8–18 LPA (senior)",
        "chartered accountant":"₹6–10 LPA (entry) → ₹20–50 LPA (partner)",
        teacher:               "₹3–6 LPA (govt) → ₹4–10 LPA (private/international)",
      };
      const match = Object.entries(salaryGuide).find(([role]) =>
        msg.toLowerCase().includes(role)
      );
      return match
        ? `💰 **${match[0].charAt(0).toUpperCase() + match[0].slice(1)}** salary in India:\n${match[1]}`
        : "Salaries vary widely by field! Tell me a specific career (e.g. 'salary of a software engineer') and I'll give you details.";
    },
  },
  {
    name: "college_query",
    patterns: [/\b(college|university|iit|nit|aiims|institute|admission|campus)\b/i],
    handler: (_, student) => {
      return `For personalised college suggestions based on your marks and interests, check the **College Suggestions** tab! I can also answer:\n- "Top colleges for engineering?"\n- "Which college is best for medicine?"\n- "Government colleges with low fees?"`;
    },
  },
  {
    name: "skills_advice",
    patterns: [/\b(skill|learn|improve|develop|practice|course)\b/i],
    handler: (msg, student) => {
      const baseSkills = [
        "🧮 Critical Thinking & Problem Solving",
        "💬 Communication (written & verbal)",
        "💻 Digital Literacy",
        "🤝 Teamwork & Collaboration",
        "🕒 Time Management",
      ];
      return `Top skills valued across all careers:\n${baseSkills.join("\n")}\n\nBeyond these, domain-specific skills depend on your chosen field. Want tips for a specific career?`;
    },
  },
  {
    name: "profile_help",
    patterns: [/\b(profile|update|interest|marks|percentage|my data)\b/i],
    handler: () =>
      "You can update your profile (interests, marks, skills) in the **Profile** section. The more complete your profile, the more accurate your recommendations will be! 🎯",
  },
  {
    name: "thanks",
    patterns: [/\b(thank|thanks|thank you|thx|cheers)\b/i],
    handler: () =>
      "You're welcome! 😊 Feel free to ask anything else about careers, colleges, or exams. Good luck with your journey! 🚀",
  },
];

const FALLBACK_RESPONSES = [
  "Hmm, I'm not sure about that one. Try asking about careers, colleges, entrance exams, or salaries!",
  "I'm specialised in career guidance. Can you rephrase — or ask something like 'What career suits me?' or 'Tell me about JEE'?",
  "That's outside my expertise! I'm best at career advice, college suggestions, and exam info. What would you like to know?",
];

let fallbackIndex = 0;

/**
 * Process a user message and return a bot reply.
 * @param {string} message - User's chat message
 * @param {Object} student - Optional student document for personalisation
 * @returns {string} Bot response
 */
const processMessage = (message = "", student = null) => {
  const msg = message.trim();
  if (!msg) return "Please type a message and I'll help you!";

  for (const intent of INTENTS) {
    if (intent.patterns.some((p) => p.test(msg))) {
      return intent.handler(msg, student);
    }
  }

  // Fallback — cycle through variety
  const reply = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
  fallbackIndex++;
  return reply;
};

module.exports = { processMessage };
