import { useState, useRef, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import {
  LayoutDashboard, Compass, FileText, Users, MessageCircle, User,
  TrendingUp, Award, Star, ChevronDown, ChevronUp, Send, Download,
  Clock, CheckCircle, Sparkles, X, Target, Zap, ArrowRight,
  MapPin, BookOpen, GraduationCap, Briefcase, Search, Plus,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
//  MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════

const STUDENT = {
  name: "Arjun Sharma", email: "arjun.sharma@example.com",
  class: "12th", stream: "Science", location: "Mumbai, Maharashtra",
  overallPercentage: 85.6, profileCompletion: 78, streak: 12, points: 300,
  marks: [
    { subject: "Maths", score: 92, grade: "A+" },
    { subject: "Physics", score: 85, grade: "A" },
    { subject: "Chemistry", score: 78, grade: "B" },
    { subject: "English", score: 88, grade: "A" },
    { subject: "Comp. Sci", score: 95, grade: "A+" },
  ],
  interests: ["Coding", "Mathematics", "Technology", "Problem Solving", "Data"],
  skills: ["Programming", "Logical Thinking", "Teamwork", "Python"],
  careerGoal: "Build impactful software products and solve real-world problems.",
};

const CAREERS = [
  {
    id: 1, title: "Software Engineer", category: "Technology", icon: "💻",
    score: 91, color: "#0EA5E9",
    salary: { entry: "₹4–8 LPA", mid: "₹15–30 LPA", senior: "₹40–80 LPA" },
    outlook: "Excellent", exams: ["JEE Main", "CUET"],
    recruiters: ["Google", "Microsoft", "Infosys", "TCS"],
    why: "Based on your Science stream, exceptional CS (95%) and Math (92%) scores, and declared interests in coding and technology, Software Engineering is your strongest match with a 91% compatibility score. Your skill profile overlaps 4 out of 4 required skills — programming, logical thinking, Python, and teamwork are all essential in this field.",
    strengths: [
      "Computer Science score of 95% shows exceptional aptitude",
      "Programming & Logical Thinking skills directly match job requirements",
      "Technology and coding interests align perfectly with this career",
      "Mathematics 92% provides a strong algorithmic foundation",
    ],
    gaps: [
      "Study Data Structures & Algorithms — core for engineering interviews",
      "Build 2–3 portfolio projects to strengthen college applications",
    ],
  },
  {
    id: 2, title: "Data Scientist", category: "Technology", icon: "📊",
    score: 84, color: "#10B981",
    salary: { entry: "₹6–12 LPA", mid: "₹20–40 LPA", senior: "₹50+ LPA" },
    outlook: "Excellent", exams: ["JEE Main", "CUET"],
    recruiters: ["Amazon", "Flipkart", "Mu Sigma", "Analytics Vidhya"],
    why: "Your quantitative strength (Math 92%, CS 95%) and interest in data and problem solving make Data Science a natural second choice. The field rewards exactly the kind of analytical thinking your academic profile demonstrates.",
    strengths: [
      "Math 92% + CS 95% form the ideal academic foundation",
      "Interest in data and problem solving is core to the role",
      "Python skills provide a significant practical head start",
    ],
    gaps: [
      "Study Statistics and Probability in depth",
      "Learn data visualisation tools — Matplotlib, Tableau, Power BI",
    ],
  },
  {
    id: 3, title: "AI / ML Engineer", category: "Technology", icon: "🤖",
    score: 78, color: "#8B5CF6",
    salary: { entry: "₹8–15 LPA", mid: "₹30–60 LPA", senior: "₹60+ LPA" },
    outlook: "Excellent", exams: ["JEE Main", "GATE"],
    recruiters: ["ISRO", "OpenAI India", "Flipkart AI", "Jio"],
    why: "AI/ML is a fast-growing but technically demanding field. Your profile has the raw ingredients — strong Math and coding interest — but this path requires advanced mathematics and specialisation at the undergraduate and postgraduate levels.",
    strengths: [
      "Science stream + strong Math is the ideal academic starting point",
      "Coding interest and Python skills provide a solid foundation",
    ],
    gaps: [
      "Must master Linear Algebra, Calculus, and Probability",
      "Learn ML frameworks — TensorFlow or PyTorch post-12th",
      "Requires B.Tech specialisation or M.Tech in AI/ML",
    ],
  },
  {
    id: 4, title: "Civil Engineer", category: "Engineering", icon: "🏗️",
    score: 62, color: "#F59E0B",
    salary: { entry: "₹3–6 LPA", mid: "₹8–20 LPA", senior: "₹25+ LPA" },
    outlook: "Good", exams: ["JEE Main", "JEE Advanced"],
    recruiters: ["L&T", "NHAI", "PWD", "AECOM"],
    why: "While your Science stream academically qualifies you for Civil Engineering, your declared interests and skills lean strongly towards technology roles. This career is viable but less naturally aligned with your personality and strengths profile.",
    strengths: [
      "Science stream and Math background is directly relevant",
      "Physics 85% applies to structural engineering concepts",
    ],
    gaps: [
      "No declared interest in construction or architecture",
      "Skills profile does not emphasise outdoor or field work preference",
    ],
  },
];

const COLLEGES = [
  { id: 1, name: "IIT Bombay", type: "IIT", city: "Mumbai, MH", nirf: 3, score: 88, fees: "₹2.3L/yr", exam: "JEE Advanced", cutoff: "Top 2,000 rank", programs: ["B.Tech CSE", "B.Tech EE"], accent: "#F59E0B" },
  { id: 2, name: "NIT Trichy", type: "NIT", city: "Trichy, TN", nirf: 10, score: 79, fees: "₹1.5L/yr", exam: "JEE Main", cutoff: "Top 15,000 rank", programs: ["B.Tech CSE", "B.Tech IT"], accent: "#10B981" },
  { id: 3, name: "Manipal IT", type: "Deemed", city: "Manipal, KA", nirf: 50, score: 71, fees: "₹3.5L/yr", exam: "MET / JEE Main", cutoff: "80%+ in 12th", programs: ["B.Tech CSE", "Data Science"], accent: "#8B5CF6" },
  { id: 4, name: "Delhi University", type: "Central", city: "New Delhi, DL", nirf: 11, score: 65, fees: "₹25K/yr", exam: "CUET", cutoff: "90%+ in 12th", programs: ["B.Sc CS", "B.Sc Math"], accent: "#F43F5E" },
];

const MENTORS = [
  { id: 1, name: "Priya Rajagopalan", role: "Senior Software Engineer", company: "Google India", domain: "Technology", exp: "8 yrs", rating: 4.9, sessions: 142, price: "₹800", available: true, tags: ["Software Eng", "System Design", "JEE"], initials: "PR", color: "#0EA5E9" },
  { id: 2, name: "Dr. Vikram Nair", role: "Associate Professor", company: "IIT Delhi", domain: "Research", exp: "15 yrs", rating: 4.8, sessions: 89, price: "₹1,200", available: true, tags: ["Research", "PhD", "Data Science"], initials: "VN", color: "#10B981" },
  { id: 3, name: "Sneha Mehta", role: "UX Design Lead", company: "Swiggy", domain: "Design", exp: "6 yrs", rating: 4.7, sessions: 67, price: "₹600", available: false, tags: ["UX Design", "Portfolio", "NIFT"], initials: "SM", color: "#F43F5E" },
  { id: 4, name: "Aryan Kapoor", role: "CA & Financial Advisor", company: "Deloitte", domain: "Finance", exp: "10 yrs", rating: 4.6, sessions: 210, price: "₹1,000", available: true, tags: ["CA Guidance", "Finance", "UPSC"], initials: "AK", color: "#8B5CF6" },
  { id: 5, name: "Dr. Ananya Sen", role: "Resident Doctor", company: "AIIMS Delhi", domain: "Medicine", exp: "5 yrs", rating: 4.9, sessions: 55, price: "₹900", available: true, tags: ["NEET Prep", "Medical", "MBBS"], initials: "AS", color: "#14B8A6" },
  { id: 6, name: "Rohan Verma", role: "Advocate", company: "Supreme Court of India", domain: "Law", exp: "12 yrs", rating: 4.5, sessions: 178, price: "₹1,500", available: false, tags: ["CLAT", "Law Career", "NLU"], initials: "RV", color: "#F97316" },
];

const MILESTONES = [
  { id: 1, label: "Complete profile", done: true, pts: 100 },
  { id: 2, label: "Add subject marks", done: true, pts: 80 },
  { id: 3, label: "Get recommendations", done: true, pts: 120 },
  { id: 4, label: "Book a mentor session", done: false, pts: 150 },
  { id: 5, label: "Generate resume", done: false, pts: 200 },
  { id: 6, label: "Apply to 3 colleges", done: false, pts: 250 },
];

const ACTIVITIES = [
  { icon: "🎯", text: "Received 4 career recommendations", time: "2h ago" },
  { icon: "📚", text: "Updated marks for 5 subjects", time: "1d ago" },
  { icon: "💬", text: "Chatted with AI counsellor", time: "2d ago" },
  { icon: "👤", text: "Profile created successfully", time: "3d ago" },
];

const CHAT_INIT = [{ role: "bot", text: "Hi Arjun! 👋 I'm your AI career counsellor. Ask me about careers, exams, colleges, or salaries — I'm here to help!" }];

const SUGGESTIONS = ["Best careers for me?", "Tell me about JEE", "Salary of a software engineer", "Top colleges for CS"];

const getReply = (msg) => {
  const m = msg.toLowerCase();
  if (/hello|hi|hey/.test(m)) return "Hi there! What would you like to explore — careers, colleges, or entrance exams?";
  if (/career|job|recommend/.test(m)) return "Based on your profile, Software Engineering is your top match at 91%! Data Science (84%) and AI/ML (78%) are close behind. Check the Recommendations tab for detailed analysis.";
  if (/college|iit|nit|admission/.test(m)) return "For CS at 85.6%, IIT Bombay (JEE Advanced) and NIT Trichy (JEE Main) are strong targets. Manipal IT is a great backup. Head to Recommendations → Colleges for your personalised shortlist!";
  if (/jee|engineering exam/.test(m)) return "JEE Main (April) qualifies you for NITs. JEE Advanced (for top ~2.5L JEE Main scorers) opens IIT doors. With your Math 92% and CS 95%, you have a strong shot — start with JEE Main as the foundation!";
  if (/neet|medical|doctor/.test(m)) return "NEET-UG is for MBBS/BDS. Given your strong Technology interests, NEET may not be your primary path — but if medicine interests you, your Biology marks would be worth checking. Want to explore medical careers?";
  if (/salary|earn|lpa|package/.test(m)) return "Entry-level Software Engineers in India earn ₹4–8 LPA. With 3–5 years experience at product companies, expect ₹15–30 LPA. Senior engineers at FAANG India earn ₹40–80+ LPA. Data Scientists follow a similar trajectory.";
  if (/skill|learn|improve/.test(m)) return "For your target careers, prioritise: (1) Data Structures & Algorithms for JEE + placements, (2) Python projects for your portfolio, (3) Statistics for Data Science. Platforms like LeetCode, NPTEL, and Coursera are excellent.";
  return "Great question! I recommend visiting the Recommendations tab for a personalised breakdown. You can also ask me about specific careers, exams, college admission cutoffs, or skill roadmaps.";
};

// ═══════════════════════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════════════════════
const s = {
  card: { background: "#fff", border: "1px solid #E8EDF5", borderRadius: 16, padding: "1.25rem" },
  cardSm: { background: "#fff", border: "1px solid #E8EDF5", borderRadius: 12, padding: "1rem" },
  h2: { fontSize: 15, fontWeight: 700, color: "#1A202C", margin: "0 0 1rem" },
  h3: { fontSize: 13, fontWeight: 600, color: "#718096", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" },
  muted: { fontSize: 13, color: "#718096", margin: 0 },
  tag: (color = "#0EA5E9") => ({ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: color + "18", color: color }),
  btn: (color = "#0EA5E9") => ({ background: color, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }),
  btnOutline: (color = "#0EA5E9") => ({ background: "transparent", color, border: `1.5px solid ${color}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }),
  input: { border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "9px 14px", fontSize: 13, color: "#1A202C", width: "100%", outline: "none", fontFamily: "inherit" },
  badge: (color) => ({ background: color + "15", color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: `1px solid ${color}30` }),
};

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function CareerGuidanceApp() {
  const [tab, setTab] = useState("dashboard");
  const [expandedCareer, setExpandedCareer] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorFilter, setMentorFilter] = useState("All");
  const [bookedSlot, setBookedSlot] = useState(null);
  const [chat, setChat] = useState(CHAT_INIT);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);
  const [resumeData, setResumeData] = useState({
    name: STUDENT.name, email: STUDENT.email,
    phone: "+91 98765 43210", location: STUDENT.location,
    linkedin: "linkedin.com/in/arjunsharma",
    objective: "",
    skills: [...STUDENT.skills, "JavaScript", "Problem Solving"],
    projects: [
      { name: "Student Grade Tracker", desc: "Python app to track and visualise subject performance." },
      { name: "", desc: "" },
    ],
    achievements: ["School topper in Computer Science (95%)", ""],
  });
  const [genLoading, setGenLoading] = useState(false);
  const [genDone, setGenDone] = useState(false);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", text: chatInput };
    const botMsg = { role: "bot", text: getReply(chatInput) };
    setChat(prev => [...prev, userMsg, botMsg]);
    setChatInput("");
  };

  const generateObjective = async () => {
    setGenLoading(true);
    setGenDone(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 250,
          messages: [{
            role: "user",
            content: `Write a concise, compelling 3-sentence resume objective for a student with these details:
Name: ${STUDENT.name}
Stream: ${STUDENT.stream}, Class: ${STUDENT.class}
Top subjects: Computer Science 95%, Mathematics 92%, English 88%
Skills: ${STUDENT.skills.join(", ")}
Interests: ${STUDENT.interests.join(", ")}
Career goal: ${STUDENT.careerGoal}

Return ONLY the objective text. No labels, no quotes, no preamble.`,
          }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "";
      if (text) {
        setResumeData(p => ({ ...p, objective: text.trim() }));
        setGenDone(true);
      }
    } catch {
      setResumeData(p => ({ ...p, objective: `A highly motivated Science student with a strong academic record (85.6% overall), specialising in Computer Science and Mathematics. Passionate about technology and software development, with hands-on experience in Python and logical problem solving. Seeking to leverage strong analytical skills and coding aptitude to build impactful software solutions at a leading engineering institution.` }));
      setGenDone(true);
    }
    setGenLoading(false);
  };

  const NAV = [
    { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
    { id: "recommendations", Icon: Compass, label: "Recommendations" },
    { id: "resume", Icon: FileText, label: "Resume Builder" },
    { id: "mentors", Icon: Users, label: "Mentors" },
    { id: "chat", Icon: MessageCircle, label: "AI Counsellor" },
    { id: "profile", Icon: User, label: "My Profile" },
  ];

  // ─── SIDEBAR ──────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div style={{ width: 220, minWidth: 220, background: "#0C1628", height: "100vh", display: "flex", flexDirection: "column", position: "sticky", top: 0, borderRight: "1px solid #1A2B47" }}>
      <div style={{ padding: "1.5rem 1.25rem 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2rem" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#0EA5E9,#6366F1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={18} color="#fff" />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>PathFinder</div>
            <div style={{ color: "#4B6A9B", fontSize: 11 }}>Career Guidance</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(({ id, Icon, label }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? "#0EA5E9" : "transparent", color: active ? "#fff" : "#6B8AB8", fontWeight: active ? 600 : 400, fontSize: 13, transition: "all 0.15s", textAlign: "left", width: "100%" }}>
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: "auto", padding: "1rem 1.25rem", borderTop: "1px solid #1A2B47" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#0EA5E9,#6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>AS</div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{STUDENT.name}</div>
            <div style={{ color: "#4B6A9B", fontSize: 11 }}>Class {STUDENT.class} · {STUDENT.stream}</div>
          </div>
        </div>
        <div style={{ marginTop: 10, background: "#1A2B47", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <span style={{ color: "#4B6A9B", fontSize: 11 }}>Profile completion</span>
            <span style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>{STUDENT.profileCompletion}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 4, background: "#263A57" }}>
            <div style={{ height: 4, borderRadius: 4, background: "#0EA5E9", width: `${STUDENT.profileCompletion}%` }} />
          </div>
        </div>
      </div>
    </div>
  );

  // ─── DASHBOARD VIEW ───────────────────────────────────────────────────────
  const DashboardView = () => {
    const profileRing = [{ value: STUDENT.profileCompletion, fill: "#0EA5E9" }];
    const marksData = STUDENT.marks.map(m => ({ name: m.subject, score: m.score }));
    const completed = MILESTONES.filter(m => m.done).length;

    return (
      <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Good morning, {STUDENT.name.split(" ")[0]} 👋</h1>
            <p style={{ ...s.muted, fontSize: 14 }}>{STUDENT.stream} · Class {STUDENT.class} · {STUDENT.location}</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={15} color="#D97706" />
              <span style={{ fontWeight: 700, color: "#92400E", fontSize: 13 }}>{STUDENT.streak} day streak</span>
            </div>
            <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <Award size={15} color="#7C3AED" />
              <span style={{ fontWeight: 700, color: "#5B21B6", fontSize: 13 }}>{STUDENT.points} pts</span>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: "1.5rem" }}>
          {[
            { label: "Overall Score", value: `${STUDENT.overallPercentage}%`, Icon: TrendingUp, col: "#0EA5E9", bg: "#EFF8FF" },
            { label: "Profile Done", value: `${STUDENT.profileCompletion}%`, Icon: CheckCircle, col: "#10B981", bg: "#F0FDF4" },
            { label: "Milestones", value: `${completed} / ${MILESTONES.length}`, Icon: Target, col: "#8B5CF6", bg: "#F5F3FF" },
            { label: "Top Career Match", value: "91%", Icon: Briefcase, col: "#F59E0B", bg: "#FFFBEB" },
          ].map(({ label, value, Icon, col, bg }) => (
            <div key={label} style={{ ...s.card, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} color={col} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>{value}</div>
                <div style={{ fontSize: 12, color: "#718096" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {/* Progress ring + milestones */}
          <div style={s.card}>
            <h2 style={s.h2}>Progress Tracker</h2>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 130, height: 130, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="58%" outerRadius="100%" data={profileRing} startAngle={90} endAngle={90 - 360 * STUDENT.profileCompletion / 100}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={10} fill="#0EA5E9" background={{ fill: "#EFF8FF" }} />
                    <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" fill="#0F172A" fontSize="22" fontWeight="800">{STUDENT.profileCompletion}%</text>
                    <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" fill="#94A3B8" fontSize="11">complete</text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1 }}>
                {MILESTONES.map(m => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: m.done ? "#10B981" : "#F1F5F9", border: `2px solid ${m.done ? "#10B981" : "#E2E8F0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {m.done && <CheckCircle size={12} color="#fff" />}
                    </div>
                    <span style={{ fontSize: 12, color: m.done ? "#0F172A" : "#94A3B8", flex: 1 }}>{m.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B" }}>+{m.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject marks chart */}
          <div style={s.card}>
            <h2 style={s.h2}>Subject Performance</h2>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={marksData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v => [`${v}%`, "Score"]} contentStyle={{ borderRadius: 10, border: "1px solid #E8EDF5", fontSize: 12 }} />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {marksData.map((entry, i) => (
                    <rect key={i} fill={entry.score >= 90 ? "#10B981" : entry.score >= 80 ? "#0EA5E9" : "#F59E0B"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {[["#10B981", "≥90 (A+)"], ["#0EA5E9", "80–89 (A)"], ["#F59E0B", "<80 (B+)"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                  <span style={{ fontSize: 11, color: "#718096" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity + Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={s.card}>
            <h2 style={s.h2}>Recent Activity</h2>
            {ACTIVITIES.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < ACTIVITIES.length - 1 ? 14 : 0, paddingBottom: i < ACTIVITIES.length - 1 ? 14 : 0, borderBottom: i < ACTIVITIES.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#1A202C", fontWeight: 500 }}>{a.text}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94A3B8" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <h2 style={s.h2}>Quick Actions</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "View Recommendations", Icon: Compass, col: "#0EA5E9", bg: "#EFF8FF", to: "recommendations" },
                { label: "Build My Resume", Icon: FileText, col: "#10B981", bg: "#F0FDF4", to: "resume" },
                { label: "Find Mentors", Icon: Users, col: "#8B5CF6", bg: "#F5F3FF", to: "mentors" },
                { label: "Chat with AI", Icon: MessageCircle, col: "#F59E0B", bg: "#FFFBEB", to: "chat" },
              ].map(({ label, Icon, col, bg, to }) => (
                <button key={label} onClick={() => setTab(to)} style={{ background: bg, border: `1px solid ${col}22`, borderRadius: 12, padding: "14px 12px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8, textAlign: "left", transition: "transform 0.1s" }}>
                  <Icon size={18} color={col} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1A202C", lineHeight: 1.3 }}>{label}</span>
                  <ArrowRight size={12} color={col} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── RECOMMENDATIONS VIEW ─────────────────────────────────────────────────
  const RecommendationsView = () => (
    <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Your Recommendations</h1>
        <p style={{ ...s.muted }}>Personalised career and college matches based on your profile, marks, and interests.</p>
      </div>

      {/* Career Cards */}
      <h2 style={{ ...s.h2, fontSize: 13, ...s.h3, marginBottom: "0.75rem" }}>Career Matches</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "2rem" }}>
        {CAREERS.map((c, i) => {
          const open = expandedCareer === c.id;
          return (
            <div key={c.id} style={{ ...s.card, padding: 0, overflow: "hidden", border: open ? `1.5px solid ${c.color}44` : "1px solid #E8EDF5" }}>
              {/* Card header */}
              <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }} onClick={() => setExpandedCareer(open ? null : c.id)}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: c.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{c.title}</span>
                    <span style={s.tag(c.color)}>{c.category}</span>
                    {i === 0 && <span style={{ ...s.tag("#F59E0B"), background: "#FEF3C7" }}>⭐ Best Match</span>}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "#718096" }}>Entry: {c.salary.entry}</span>
                    <span style={{ fontSize: 12, color: "#718096" }}>Senior: {c.salary.senior}</span>
                    <span style={{ fontSize: 12, color: c.outlook === "Excellent" ? "#10B981" : "#F59E0B", fontWeight: 600 }}>● {c.outlook} outlook</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  {/* Score ring */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.score}</div>
                    <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600 }}>MATCH %</div>
                    <div style={{ width: 60, height: 5, borderRadius: 5, background: "#F1F5F9", marginTop: 4 }}>
                      <div style={{ width: `${c.score}%`, height: "100%", borderRadius: 5, background: c.color }} />
                    </div>
                  </div>
                  <div style={{ color: "#94A3B8" }}>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>
              </div>

              {/* Expanded explanation */}
              {open && (
                <div style={{ padding: "0 1.25rem 1.25rem", borderTop: `1px solid ${c.color}20` }}>
                  <div style={{ background: c.color + "08", borderRadius: 12, padding: "1rem", marginTop: "1rem", marginBottom: "1rem", borderLeft: `3px solid ${c.color}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: c.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Why this career?</div>
                    <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, margin: 0 }}>{c.why}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#10B981", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                        <CheckCircle size={14} /> Your Strengths
                      </div>
                      {c.strengths.map((st, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#334155", marginBottom: 5, display: "flex", gap: 8 }}>
                          <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>{st}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                        <Target size={14} /> Gaps to Bridge
                      </div>
                      {c.gaps.map((g, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#334155", marginBottom: 5, display: "flex", gap: 8 }}>
                          <span style={{ color: "#F59E0B", flexShrink: 0 }}>→</span>{g}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: "1rem", flexWrap: "wrap" }}>
                    <div style={{ fontSize: 12, color: "#718096" }}>Entrance exams:</div>
                    {c.exams.map(e => <span key={e} style={s.tag(c.color)}>{e}</span>)}
                    <div style={{ fontSize: 12, color: "#718096", marginLeft: 8 }}>Top recruiters:</div>
                    {c.recruiters.slice(0, 3).map(r => <span key={r} style={{ fontSize: 12, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 20, padding: "3px 10px", color: "#475569" }}>{r}</span>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* College Cards */}
      <h2 style={{ ...s.h3, marginBottom: "0.75rem" }}>Suggested Colleges</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
        {COLLEGES.map(col => (
          <div key={col.id} style={{ ...s.card, borderTop: `3px solid ${col.accent}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{col.name}</div>
                <div style={{ fontSize: 12, color: "#718096", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <MapPin size={11} /> {col.city}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: col.accent }}>{col.score}%</div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600 }}>MATCH</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              <span style={s.badge(col.accent)}>{col.type}</span>
              <span style={s.badge("#6B7280")}>NIRF #{col.nirf}</span>
            </div>
            <div style={{ fontSize: 12, color: "#475569", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", gap: 6 }}><span style={{ color: "#94A3B8", minWidth: 75 }}>Fees</span><strong>{col.fees}</strong></div>
              <div style={{ display: "flex", gap: 6 }}><span style={{ color: "#94A3B8", minWidth: 75 }}>Exam</span><strong>{col.exam}</strong></div>
              <div style={{ display: "flex", gap: 6 }}><span style={{ color: "#94A3B8", minWidth: 75 }}>Cutoff</span><strong>{col.cutoff}</strong></div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {col.programs.map(p => <span key={p} style={{ fontSize: 11, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 20, padding: "3px 10px", color: "#475569" }}>{p}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── RESUME BUILDER ───────────────────────────────────────────────────────
  const ResumeView = () => {
    const updateField = (key, val) => setResumeData(p => ({ ...p, [key]: val }));
    const updateProject = (i, key, val) => setResumeData(p => { const arr = [...p.projects]; arr[i] = { ...arr[i], [key]: val }; return { ...p, projects: arr }; });
    const updateAchievement = (i, val) => setResumeData(p => { const arr = [...p.achievements]; arr[i] = val; return { ...p, achievements: arr }; });
    const updateSkill = (i, val) => setResumeData(p => { const arr = [...p.skills]; arr[i] = val; return { ...p, skills: arr }; });

    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Form panel */}
        <div style={{ width: "45%", overflow: "auto", padding: "2rem", borderRight: "1px solid #E8EDF5", background: "#F8FAFC" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 2px" }}>Resume Builder</h1>
              <p style={s.muted}>Fill in the form, preview on the right</p>
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ ...s.card, marginBottom: 14 }}>
            <h3 style={{ ...s.h2, borderBottom: "1px solid #F1F5F9", paddingBottom: 8 }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["name", "Full Name"], ["email", "Email"], ["phone", "Phone"], ["location", "Location"], ["linkedin", "LinkedIn URL"]].map(([key, label]) => (
                <div key={key} style={{ gridColumn: key === "linkedin" ? "1/-1" : "auto" }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 }}>{label}</label>
                  <input style={s.input} value={resumeData[key]} onChange={e => updateField(key, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {/* Career Objective */}
          <div style={{ ...s.card, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3 style={s.h2}>Career Objective</h3>
              <button onClick={generateObjective} disabled={genLoading} style={{ ...s.btn(genDone ? "#10B981" : "#8B5CF6"), fontSize: 12, padding: "7px 14px", opacity: genLoading ? 0.7 : 1 }}>
                <Sparkles size={14} />
                {genLoading ? "Generating…" : genDone ? "Regenerate" : "Generate with AI"}
              </button>
            </div>
            {genLoading && <div style={{ fontSize: 13, color: "#8B5CF6", marginBottom: 8, background: "#F5F3FF", borderRadius: 8, padding: "8px 12px" }}>✨ AI is crafting your objective…</div>}
            <textarea rows={4} style={{ ...s.input, resize: "vertical" }} value={resumeData.objective} onChange={e => updateField("objective", e.target.value)} placeholder="Write a career objective or click 'Generate with AI'…" />
          </div>

          {/* Skills */}
          <div style={{ ...s.card, marginBottom: 14 }}>
            <h3 style={s.h2}>Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {resumeData.skills.map((sk, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <input style={{ ...s.input, width: 120, fontSize: 12, padding: "5px 10px" }} value={sk} onChange={e => updateSkill(i, e.target.value)} />
                </div>
              ))}
            </div>
            <button onClick={() => setResumeData(p => ({ ...p, skills: [...p.skills, ""] }))} style={{ ...s.btnOutline("#10B981"), fontSize: 12, padding: "5px 12px" }}><Plus size={12} />Add Skill</button>
          </div>

          {/* Projects */}
          <div style={{ ...s.card, marginBottom: 14 }}>
            <h3 style={s.h2}>Projects</h3>
            {resumeData.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < resumeData.projects.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 }}>Project Name</label>
                <input style={{ ...s.input, marginBottom: 6 }} value={proj.name} onChange={e => updateProject(i, "name", e.target.value)} placeholder="e.g. Student Portal App" />
                <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 }}>Description</label>
                <input style={s.input} value={proj.desc} onChange={e => updateProject(i, "desc", e.target.value)} placeholder="Short description of what you built" />
              </div>
            ))}
            <button onClick={() => setResumeData(p => ({ ...p, projects: [...p.projects, { name: "", desc: "" }] }))} style={{ ...s.btnOutline("#10B981"), fontSize: 12, padding: "5px 12px" }}><Plus size={12} />Add Project</button>
          </div>

          {/* Achievements */}
          <div style={s.card}>
            <h3 style={s.h2}>Achievements</h3>
            {resumeData.achievements.map((ach, i) => (
              <input key={i} style={{ ...s.input, marginBottom: 8 }} value={ach} onChange={e => updateAchievement(i, e.target.value)} placeholder={`Achievement ${i + 1}`} />
            ))}
            <button onClick={() => setResumeData(p => ({ ...p, achievements: [...p.achievements, ""] }))} style={{ ...s.btnOutline("#10B981"), fontSize: 12, padding: "5px 12px" }}><Plus size={12} />Add Achievement</button>
          </div>
        </div>

        {/* Preview panel */}
        <div style={{ flex: 1, overflow: "auto", padding: "2rem", background: "#E8EDF5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#334155", margin: 0 }}>Live Preview</h2>
            <button style={{ ...s.btn("#0F172A"), fontSize: 12 }} onClick={() => alert("Resume downloaded as PDF! (Connect a PDF library in production)")}><Download size={14} />Download PDF</button>
          </div>

          {/* Resume document */}
          <div style={{ background: "#fff", maxWidth: 680, margin: "0 auto", borderRadius: 4, padding: "2.5rem", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", fontFamily: "'Georgia', serif", minHeight: 900 }}>
            {/* Header */}
            <div style={{ textAlign: "center", borderBottom: "2px solid #0F172A", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", margin: "0 0 4px", fontFamily: "Georgia" }}>{resumeData.name || "Your Name"}</h1>
              <div style={{ fontSize: 12, color: "#475569", display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                {resumeData.email && <span>{resumeData.email}</span>}
                {resumeData.phone && <span>{resumeData.phone}</span>}
                {resumeData.location && <span>{resumeData.location}</span>}
                {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
              </div>
            </div>

            {/* Objective */}
            {resumeData.objective && (
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #CBD5E1", paddingBottom: 4, marginBottom: 8 }}>Career Objective</div>
                <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.7, margin: 0 }}>{resumeData.objective}</p>
              </div>
            )}

            {/* Education */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #CBD5E1", paddingBottom: 4, marginBottom: 8 }}>Education</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>Class XII — {STUDENT.stream} Stream</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>Maharashtra State Board</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>2025</div>
                  <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>85.6%</div>
                </div>
              </div>
              <div style={{ marginTop: 6 }}>
                {STUDENT.marks.filter(m => m.score >= 85).map(m => (
                  <span key={m.subject} style={{ fontSize: 11, background: "#F0FDF4", color: "#166534", padding: "2px 8px", borderRadius: 20, marginRight: 6 }}>{m.subject}: {m.score}%</span>
                ))}
              </div>
            </div>

            {/* Skills */}
            {resumeData.skills.filter(Boolean).length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #CBD5E1", paddingBottom: 4, marginBottom: 8 }}>Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {resumeData.skills.filter(Boolean).map((sk, i) => (
                    <span key={i} style={{ fontSize: 12, background: "#F1F5F9", border: "1px solid #CBD5E1", borderRadius: 4, padding: "3px 10px", color: "#334155" }}>{sk}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.filter(p => p.name).length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #CBD5E1", paddingBottom: 4, marginBottom: 8 }}>Projects</div>
                {resumeData.projects.filter(p => p.name).map((p, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{p.name}</span>
                    {p.desc && <p style={{ fontSize: 12, color: "#475569", margin: "2px 0 0", lineHeight: 1.6 }}>{p.desc}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {resumeData.achievements.filter(Boolean).length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #CBD5E1", paddingBottom: 4, marginBottom: 8 }}>Achievements</div>
                {resumeData.achievements.filter(Boolean).map((a, i) => (
                  <div key={i} style={{ fontSize: 12, color: "#334155", marginBottom: 4, display: "flex", gap: 8 }}>
                    <span>•</span>{a}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── MENTORS VIEW ─────────────────────────────────────────────────────────
  const MentorsView = () => {
    const DOMAINS = ["All", "Technology", "Research", "Design", "Finance", "Medicine", "Law"];
    const filtered = mentorFilter === "All" ? MENTORS : MENTORS.filter(m => m.domain === mentorFilter);
    const SLOTS = ["Mon 10:00 AM", "Mon 2:00 PM", "Tue 11:00 AM", "Wed 9:00 AM", "Wed 4:00 PM", "Thu 3:00 PM"];

    return (
      <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Find a Mentor</h1>
          <p style={s.muted}>Connect with industry experts for personalised career guidance.</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {DOMAINS.map(d => (
            <button key={d} onClick={() => setMentorFilter(d)} style={{ background: mentorFilter === d ? "#0F172A" : "#fff", color: mentorFilter === d ? "#fff" : "#475569", border: "1px solid #E2E8F0", borderRadius: 20, padding: "7px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>{d}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {filtered.map(m => (
            <div key={m.id} style={{ ...s.card, display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Mentor header */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: m.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: m.color, flexShrink: 0 }}>{m.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: "#718096", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.role}</div>
                  <div style={{ fontSize: 11, color: m.color, fontWeight: 600 }}>{m.company}</div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {m.tags.map(t => <span key={t} style={s.tag(m.color)}>{t}</span>)}
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 12, background: "#F8FAFC", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{m.rating}</div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>Rating</div>
                </div>
                <div style={{ width: 1, background: "#E2E8F0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{m.sessions}</div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>Sessions</div>
                </div>
                <div style={{ width: 1, background: "#E2E8F0" }} />
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{m.exp}</div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>Exp.</div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{m.price}</span>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>/session</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: m.available ? "#10B981" : "#94A3B8", background: m.available ? "#F0FDF4" : "#F8FAFC", padding: "3px 8px", borderRadius: 20 }}>
                    {m.available ? "● Available" : "○ Busy"}
                  </span>
                  <button onClick={() => m.available && setSelectedMentor(m)} style={{ ...s.btn(m.available ? m.color : "#94A3B8"), fontSize: 12, padding: "7px 14px", opacity: m.available ? 1 : 0.6, cursor: m.available ? "pointer" : "not-allowed" }}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedMentor && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "2rem", width: 420, maxWidth: "90vw" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 2px" }}>Book a Session</h2>
                  <p style={s.muted}>with {selectedMentor.name}</p>
                </div>
                <button onClick={() => { setSelectedMentor(null); setBookedSlot(null); }} style={{ background: "#F1F5F9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
              </div>

              {!bookedSlot ? (
                <>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 12 }}>Choose a time slot:</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {SLOTS.map(slot => (
                      <button key={slot} onClick={() => setBookedSlot(slot)} style={{ border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 12px", cursor: "pointer", background: "#fff", fontSize: 13, color: "#334155", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={13} color="#94A3B8" /> {slot}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "1rem 0" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <CheckCircle size={28} color="#10B981" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>Session Booked!</h3>
                  <p style={{ ...s.muted, marginBottom: 16 }}>Your session with <strong>{selectedMentor.name}</strong> is confirmed for <strong>{bookedSlot}</strong>.</p>
                  <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 20 }}>A confirmation will be sent to {STUDENT.email}</p>
                  <button onClick={() => { setSelectedMentor(null); setBookedSlot(null); }} style={s.btn("#10B981")}>Done</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── CHAT VIEW ────────────────────────────────────────────────────────────
  const ChatView = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #E8EDF5", background: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#0EA5E9,#6366F1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>AI Career Counsellor</div>
          <div style={{ fontSize: 12, color: "#10B981" }}>● Online</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: 14, background: "#F8FAFC" }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "bot" && (
              <div style={{ width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg,#0EA5E9,#6366F1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 2 }}>
                <Sparkles size={13} color="#fff" />
              </div>
            )}
            <div style={{ maxWidth: "70%", background: msg.role === "user" ? "#0EA5E9" : "#fff", color: msg.role === "user" ? "#fff" : "#1A202C", border: msg.role === "bot" ? "1px solid #E8EDF5" : "none", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 14px", fontSize: 13, lineHeight: 1.6 }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #E8EDF5", background: "#fff" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => { setChat(prev => [...prev, { role: "user", text: s }, { role: "bot", text: getReply(s) }]); }} style={{ background: "#EFF8FF", border: "1px solid #BAE6FD", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#0369A1", cursor: "pointer", fontWeight: 500 }}>{s}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input style={{ ...s.input, flex: 1 }} value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask me about careers, exams, colleges…" />
          <button onClick={sendChat} style={{ ...s.btn("#0EA5E9"), padding: "10px 18px", flexShrink: 0 }}><Send size={16} /></button>
        </div>
      </div>
    </div>
  );

  // ─── PROFILE VIEW ─────────────────────────────────────────────────────────
  const ProfileView = () => (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 1.5rem" }}>My Profile</h1>

      {/* Profile header */}
      <div style={{ ...s.card, display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
        <div style={{ width: 70, height: 70, borderRadius: 18, background: "linear-gradient(135deg,#0EA5E9,#6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff", flexShrink: 0 }}>AS</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>{STUDENT.name}</h2>
          <p style={{ ...s.muted, marginBottom: 8 }}>{STUDENT.email}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={s.badge("#0EA5E9")}>Class {STUDENT.class}</span>
            <span style={s.badge("#10B981")}>{STUDENT.stream} Stream</span>
            <span style={s.badge("#8B5CF6")}>{STUDENT.location}</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#0EA5E9" }}>{STUDENT.overallPercentage}%</div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>OVERALL</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Interests */}
        <div style={s.card}>
          <h3 style={s.h2}>Interests</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {STUDENT.interests.map(i => <span key={i} style={{ ...s.tag("#0EA5E9"), fontSize: 12, padding: "5px 12px" }}>{i}</span>)}
            <button style={{ ...s.btnOutline("#0EA5E9"), fontSize: 12, padding: "4px 10px" }}><Plus size={11} />Add</button>
          </div>
        </div>

        {/* Skills */}
        <div style={s.card}>
          <h3 style={s.h2}>Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {STUDENT.skills.map(sk => <span key={sk} style={{ ...s.tag("#10B981"), fontSize: 12, padding: "5px 12px" }}>{sk}</span>)}
            <button style={{ ...s.btnOutline("#10B981"), fontSize: 12, padding: "4px 10px" }}><Plus size={11} />Add</button>
          </div>
        </div>
      </div>

      {/* Marks table */}
      <div style={{ ...s.card, marginBottom: 16 }}>
        <h3 style={s.h2}>Academic Marks</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Subject", "Score", "Grade", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENT.marks.map((m, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "10px 12px", fontSize: 13, color: "#0F172A", fontWeight: 500 }}>{m.subject}</td>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 5, borderRadius: 5, background: "#F1F5F9" }}>
                      <div style={{ width: `${m.score}%`, height: "100%", borderRadius: 5, background: m.score >= 90 ? "#10B981" : m.score >= 80 ? "#0EA5E9" : "#F59E0B" }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", minWidth: 32 }}>{m.score}%</span>
                  </div>
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={s.badge(m.grade === "A+" ? "#10B981" : m.grade === "A" ? "#0EA5E9" : "#F59E0B")}>{m.grade}</span>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: m.score >= 85 ? "#10B981" : "#F59E0B", fontWeight: 600 }}>
                  {m.score >= 85 ? "✓ Strong" : "→ Improve"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Career Goal */}
      <div style={s.card}>
        <h3 style={s.h2}>Career Goal</h3>
        <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0, background: "#F0F9FF", borderRadius: 10, padding: "12px 14px", borderLeft: "3px solid #0EA5E9" }}>{STUDENT.careerGoal}</p>
      </div>
    </div>
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────
  const views = { dashboard: DashboardView, recommendations: RecommendationsView, resume: ResumeView, mentors: MentorsView, chat: ChatView, profile: ProfileView };
  const ActiveView = views[tab];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#F0F4F8" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; } button:hover { opacity: 0.9; }`}</style>
      <Sidebar />
      <main style={{ flex: 1, overflow: tab === "resume" || tab === "chat" ? "hidden" : "auto" }}>
        <ActiveView />
      </main>
    </div>
  );
}
