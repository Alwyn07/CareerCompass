// ============================================================
// lib/dummyData.ts — All mock data for CareerCompass
// ============================================================

// ---- User Profile ----
export const dummyUser = {
  name: "Arjun Mehta",
  email: "arjun.mehta@email.com",
  avatar: "AM",
  title: "Software Engineer → Product Manager",
  location: "Bangalore, India",
  experience: "4 years",
  education: "B.Tech Computer Science, IIT Bombay",
  skills: ["JavaScript", "React", "Python", "Product Strategy", "Data Analysis", "Leadership"],
  bio: "Passionate engineer transitioning into product management. I love building user-centric products and bridging the gap between technical teams and business goals.",
  profileCompletion: 78,
  joinedDate: "March 2024",
  goalRole: "Senior Product Manager",
  goalTimeline: "12 months",
};

// ---- Dashboard Stats ----
export const dashboardStats = [
  {
    id: "1",
    label: "Career Match Score",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: "TrendingUp",
    color: "primary",
  },
  {
    id: "2",
    label: "Skills Assessed",
    value: "12 / 18",
    change: "+2 this week",
    trend: "up",
    icon: "Zap",
    color: "accent",
  },
  {
    id: "3",
    label: "Paths Explored",
    value: "6",
    change: "3 new",
    trend: "up",
    icon: "Map",
    color: "success",
  },
  {
    id: "4",
    label: "Sessions",
    value: "24",
    change: "This month",
    trend: "neutral",
    icon: "MessageSquare",
    color: "warning",
  },
];

// ---- Recent Activity ----
export const recentActivity = [
  {
    id: "1",
    type: "chat",
    title: "Explored PM interview prep strategies",
    time: "2 hours ago",
    icon: "MessageSquare",
  },
  {
    id: "2",
    type: "recommendation",
    title: "New path recommended: Product Analytics Lead",
    time: "Yesterday",
    icon: "Lightbulb",
  },
  {
    id: "3",
    type: "skill",
    title: "Completed: Product Roadmapping skill assessment",
    time: "2 days ago",
    icon: "CheckCircle",
  },
  {
    id: "4",
    type: "goal",
    title: "Updated career goal: Senior PM by Q1 2026",
    time: "4 days ago",
    icon: "Target",
  },
];

// ---- Career Roadmap Progress ----
export const roadmapProgress = [
  { step: "Assess Current Skills",   done: true,  progress: 100 },
  { step: "Define Career Goals",      done: true,  progress: 100 },
  { step: "Identify Skill Gaps",      done: true,  progress: 100 },
  { step: "Build Learning Plan",      done: false, progress: 65  },
  { step: "Apply & Network",          done: false, progress: 20  },
  { step: "Land Target Role",         done: false, progress: 0   },
];

// ---- Career Recommendations ----
export const careerRecommendations = [
  {
    id: "1",
    title: "Senior Product Manager",
    company_type: "Series B / C Startup",
    matchScore: 92,
    salaryRange: "₹28L – ₹45L",
    growthRate: "High",
    timeToTransition: "8–12 months",
    skills: ["Product Strategy", "Data Analysis", "Stakeholder Management", "Agile"],
    missingSkills: ["Market Research", "P&L Ownership"],
    description:
      "Leverage your engineering background to lead cross-functional product teams. Your technical depth gives you a strong edge over non-technical PMs.",
    tag: "Best Match",
    tagColor: "primary",
    demandLevel: "Very High",
    remote: true,
  },
  {
    id: "2",
    title: "Technical Product Manager",
    company_type: "Large Enterprise / FAANG",
    matchScore: 88,
    salaryRange: "₹35L – ₹60L",
    growthRate: "Very High",
    timeToTransition: "10–14 months",
    skills: ["System Design", "APIs", "Product Vision", "OKRs"],
    missingSkills: ["Enterprise Sales Exposure", "Executive Communication"],
    description:
      "Bridge engineering and business at scale. Your coding background is a prime asset for TPM roles at top tech companies.",
    tag: "High Salary",
    tagColor: "accent",
    demandLevel: "High",
    remote: true,
  },
  {
    id: "3",
    title: "Product Analyst",
    company_type: "Mid-size Tech Company",
    matchScore: 79,
    salaryRange: "₹18L – ₹28L",
    growthRate: "Medium",
    timeToTransition: "3–5 months",
    skills: ["SQL", "Python", "A/B Testing", "Dashboarding"],
    missingSkills: ["Business Intelligence Tools", "Executive Storytelling"],
    description:
      "A strong stepping stone to PM roles. Build your data storytelling and analytical chops while gaining product exposure.",
    tag: "Quick Entry",
    tagColor: "success",
    demandLevel: "High",
    remote: false,
  },
  {
    id: "4",
    title: "Entrepreneurship / Founder",
    company_type: "Self / Own Venture",
    matchScore: 71,
    salaryRange: "Variable",
    growthRate: "Unlimited",
    timeToTransition: "Anytime",
    skills: ["Full-stack Development", "Customer Discovery", "Resilience"],
    missingSkills: ["Fundraising", "Legal & Finance Basics", "Sales"],
    description:
      "Your engineering + product mindset is ideal for building your own product. Explore indie hacking or co-founding with a business-side partner.",
    tag: "Bold Move",
    tagColor: "warning",
    demandLevel: "N/A",
    remote: true,
  },
];

// ---- Chat Messages ----
export const initialChatMessages = [
  {
    id: "1",
    role: "ai" as const,
    content:
      "Hi Arjun! 👋 I'm your CareerCompass AI. I've reviewed your profile — 4 years of software engineering with a goal of transitioning to Product Management. Great choice! Where would you like to start today?",
    time: "10:00 AM",
    suggestions: [
      "What skills do I need for PM?",
      "How do I break into product without PM experience?",
      "Review my career roadmap",
    ],
  },
  {
    id: "2",
    role: "user" as const,
    content: "What skills do I need to become a Senior PM at a startup?",
    time: "10:01 AM",
    suggestions: [],
  },
  {
    id: "3",
    role: "ai" as const,
    content:
      "Great question! For a Senior PM at a startup, the most valued skills split into three clusters:\n\n**Strategic Thinking** — You need to set product vision, write crisp PRDs, and make prioritization calls with limited data.\n\n**Cross-functional Leadership** — Startups move fast. You'll need to align engineers, designers, and founders without formal authority.\n\n**Data Fluency** — SQL, product metrics (DAU, retention, LTV), and A/B testing are non-negotiable.\n\nBased on your profile, you already have solid technical depth. Your biggest gaps are **stakeholder storytelling** and **market research**. Want me to suggest resources for those?",
    time: "10:01 AM",
    suggestions: ["Yes, suggest resources", "What about PM interviews?", "Show my skill gaps"],
  },
];

// ---- Skill Gap Data ----
export const skillGapData = [
  { skill: "Technical Depth",        current: 90, required: 75, status: "exceed" },
  { skill: "Product Strategy",       current: 55, required: 85, status: "gap"    },
  { skill: "Data Analysis",          current: 70, required: 80, status: "gap"    },
  { skill: "Stakeholder Management", current: 45, required: 80, status: "gap"    },
  { skill: "User Research",          current: 40, required: 75, status: "gap"    },
  { skill: "Agile / Scrum",          current: 75, required: 70, status: "exceed" },
  { skill: "Communication",          current: 65, required: 75, status: "gap"    },
  { skill: "Market Analysis",        current: 30, required: 70, status: "gap"    },
];

// ---- Learning Resources ----
export const learningResources = [
  {
    id: "1",
    title: "Cracking the PM Interview",
    type: "Book",
    duration: "12 hrs",
    skill: "Product Strategy",
    url: "#",
  },
  {
    id: "2",
    title: "SQL for Data Analysis — Mode Analytics",
    type: "Course",
    duration: "8 hrs",
    skill: "Data Analysis",
    url: "#",
  },
  {
    id: "3",
    title: "Lenny's Newsletter",
    type: "Newsletter",
    duration: "Weekly",
    skill: "Product Strategy",
    url: "#",
  },
  {
    id: "4",
    title: "PM Exercises — Product Cases",
    type: "Practice",
    duration: "Self-paced",
    skill: "Stakeholder Management",
    url: "#",
  },
];
