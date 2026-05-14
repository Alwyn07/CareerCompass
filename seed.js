require("dotenv").config();
const mongoose = require("mongoose");
const Career   = require("../models/Career");
const College  = require("../models/College");
const Student  = require("../models/Student");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/career_guidance";

// ═══════════════════════════════════════════════════════════════════════════
//  SAMPLE CAREERS
// ═══════════════════════════════════════════════════════════════════════════
const careers = [
  {
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software systems and applications.",
    requiredStreams: ["Science", "Any"],
    requiredInterests: ["coding", "technology", "problem solving", "mathematics"],
    requiredSkills: ["programming", "problem solving", "logical thinking", "teamwork"],
    minPercentage: 60,
    averageSalary: { entry: "₹4–8 LPA", mid: "₹15–30 LPA", senior: "₹40–80 LPA" },
    jobOutlook: "Excellent",
    workStyle: ["office", "remote"],
    entrancExams: ["JEE Main", "CUET"],
    topRecruiters: ["Google", "Microsoft", "Infosys", "TCS", "Wipro"],
    weight: 1.2,
  },
  {
    title: "Data Scientist",
    category: "Technology",
    description: "Analyse large datasets to extract insights and build predictive models.",
    requiredStreams: ["Science", "Any"],
    requiredInterests: ["data", "mathematics", "statistics", "coding", "research"],
    requiredSkills: ["python", "mathematics", "statistics", "problem solving"],
    minPercentage: 65,
    averageSalary: { entry: "₹6–12 LPA", mid: "₹20–40 LPA", senior: "₹50+ LPA" },
    jobOutlook: "Excellent",
    workStyle: ["office", "remote"],
    entrancExams: ["JEE Main", "CUET"],
    topRecruiters: ["Amazon", "Flipkart", "Mu Sigma", "Analytics Vidhya"],
    weight: 1.2,
  },
  {
    title: "Doctor (MBBS)",
    category: "Healthcare",
    description: "Diagnose and treat patients, promote health and prevent disease.",
    requiredStreams: ["Science"],
    requiredInterests: ["biology", "medicine", "helping people", "science"],
    requiredSkills: ["empathy", "communication", "critical thinking", "biology"],
    minPercentage: 70,
    averageSalary: { entry: "₹6–10 LPA", mid: "₹15–40 LPA", senior: "₹50+ LPA" },
    jobOutlook: "Excellent",
    workStyle: ["indoor", "lab", "field"],
    entrancExams: ["NEET-UG"],
    topRecruiters: ["AIIMS", "Government Hospitals", "Apollo", "Fortis"],
    weight: 1.3,
  },
  {
    title: "Chartered Accountant",
    category: "Business",
    description: "Manage financial records, audits, and tax compliance for organisations.",
    requiredStreams: ["Commerce", "Any"],
    requiredInterests: ["finance", "accounting", "business", "mathematics"],
    requiredSkills: ["mathematics", "attention to detail", "analytical thinking"],
    minPercentage: 55,
    averageSalary: { entry: "₹6–10 LPA", mid: "₹15–30 LPA", senior: "₹40–80 LPA" },
    jobOutlook: "Good",
    workStyle: ["office"],
    entrancExams: ["CA Foundation", "CA Intermediate", "CA Final"],
    topRecruiters: ["Deloitte", "KPMG", "PwC", "EY", "Big 4 firms"],
    weight: 1.1,
  },
  {
    title: "Graphic Designer",
    category: "Arts & Design",
    description: "Create visual content for brands, digital media, and print.",
    requiredStreams: ["Arts", "Any"],
    requiredInterests: ["art", "design", "creativity", "visual media", "drawing"],
    requiredSkills: ["creativity", "adobe suite", "communication", "attention to detail"],
    minPercentage: 45,
    averageSalary: { entry: "₹2.5–5 LPA", mid: "₹8–18 LPA", senior: "₹20+ LPA" },
    jobOutlook: "Good",
    workStyle: ["office", "remote"],
    entrancExams: ["NID DAT", "UCEED", "NIFT"],
    topRecruiters: ["Ogilvy", "Wieden+Kennedy", "Tech startups", "Freelance"],
    weight: 1.0,
  },
  {
    title: "Civil Engineer",
    category: "Engineering",
    description: "Plan and oversee construction of infrastructure like roads, bridges, and buildings.",
    requiredStreams: ["Science"],
    requiredInterests: ["construction", "mathematics", "physics", "architecture"],
    requiredSkills: ["mathematics", "physics", "project management", "problem solving"],
    minPercentage: 60,
    averageSalary: { entry: "₹3–6 LPA", mid: "₹8–20 LPA", senior: "₹25+ LPA" },
    jobOutlook: "Good",
    workStyle: ["outdoor", "field", "office"],
    entrancExams: ["JEE Main", "JEE Advanced", "GATE"],
    topRecruiters: ["L&T", "AECOM", "PWD", "NHAI", "DDA"],
    weight: 1.0,
  },
  {
    title: "Lawyer",
    category: "Law",
    description: "Represent clients in legal matters, draft legal documents, and provide counsel.",
    requiredStreams: ["Arts", "Commerce", "Any"],
    requiredInterests: ["law", "justice", "debate", "writing", "social issues"],
    requiredSkills: ["critical thinking", "communication", "research", "argumentation"],
    minPercentage: 50,
    averageSalary: { entry: "₹3–6 LPA", mid: "₹15–50 LPA", senior: "₹80+ LPA" },
    jobOutlook: "Good",
    workStyle: ["office", "indoor"],
    entrancExams: ["CLAT", "AILET", "LSAT India"],
    topRecruiters: ["Law firms", "Corporates", "Government", "Courts"],
    weight: 1.0,
  },
  {
    title: "Teacher / Educator",
    category: "Education",
    description: "Teach and mentor students in schools, colleges, or online platforms.",
    requiredStreams: ["Any"],
    requiredInterests: ["teaching", "helping people", "communication", "learning"],
    requiredSkills: ["communication", "patience", "subject knowledge", "creativity"],
    minPercentage: 50,
    averageSalary: { entry: "₹3–6 LPA", mid: "₹6–15 LPA", senior: "₹15–30 LPA" },
    jobOutlook: "Good",
    workStyle: ["indoor", "office"],
    entrancExams: ["CTET", "TET", "NET/JRF"],
    topRecruiters: ["Government Schools", "Private Schools", "Universities", "EdTech companies"],
    weight: 0.9,
  },
  {
    title: "Psychologist",
    category: "Social Sciences",
    description: "Study human behaviour and help people manage mental health challenges.",
    requiredStreams: ["Arts", "Science", "Any"],
    requiredInterests: ["psychology", "helping people", "human behaviour", "counselling"],
    requiredSkills: ["empathy", "communication", "critical thinking", "listening"],
    minPercentage: 55,
    averageSalary: { entry: "₹3–5 LPA", mid: "₹8–20 LPA", senior: "₹25+ LPA" },
    jobOutlook: "Good",
    workStyle: ["office", "indoor"],
    entrancExams: ["CUET PG", "University Entrance Tests"],
    topRecruiters: ["Hospitals", "Schools", "NGOs", "Private Practice"],
    weight: 0.9,
  },
  {
    title: "Journalist / Media Professional",
    category: "Media & Communication",
    description: "Research, write, and broadcast news and stories across media platforms.",
    requiredStreams: ["Arts", "Any"],
    requiredInterests: ["writing", "journalism", "media", "current affairs", "communication"],
    requiredSkills: ["writing", "communication", "research", "adaptability"],
    minPercentage: 45,
    averageSalary: { entry: "₹2.5–5 LPA", mid: "₹8–20 LPA", senior: "₹25+ LPA" },
    jobOutlook: "Moderate",
    workStyle: ["field", "office", "remote"],
    entrancExams: ["IIMC Entrance", "CUET", "University Tests"],
    topRecruiters: ["NDTV", "The Hindu", "Times of India", "The Wire", "BBC India"],
    weight: 0.85,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  SAMPLE COLLEGES
// ═══════════════════════════════════════════════════════════════════════════
const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    type: "IIT",
    location: { city: "Mumbai", state: "Maharashtra" },
    ranking: { nirf: 3, overall: 3 },
    programs: [
      { name: "B.Tech Computer Science", duration: "4 years", careerPaths: ["Software Engineer", "Data Scientist"] },
      { name: "B.Tech Civil Engineering", duration: "4 years", careerPaths: ["Civil Engineer"] },
    ],
    admission: { entranceExams: ["JEE Advanced"], minPercentage: 85, cutoffRank: 2000 },
    fees: { perYear: 230000, total: 920000, tier: "medium" },
    accreditation: "NAAC A++",
    highlights: ["Top 3 in NIRF", "World-class research", "Strong alumni network"],
    website: "https://www.iitb.ac.in",
  },
  {
    name: "All India Institute of Medical Sciences Delhi",
    shortName: "AIIMS Delhi",
    type: "AIIMS",
    location: { city: "New Delhi", state: "Delhi" },
    ranking: { nirf: 1, overall: 1 },
    programs: [
      { name: "MBBS", duration: "5.5 years", careerPaths: ["Doctor (MBBS)"] },
    ],
    admission: { entranceExams: ["NEET-UG"], minPercentage: 85, cutoffRank: 50 },
    fees: { perYear: 6500, total: 36000, tier: "low" },
    accreditation: "NAAC A++",
    highlights: ["#1 Medical College in India", "Best hospital training", "Government funded"],
    website: "https://www.aiims.edu",
  },
  {
    name: "National Law School of India University",
    shortName: "NLSIU Bangalore",
    type: "Central University",
    location: { city: "Bangalore", state: "Karnataka" },
    ranking: { nirf: 1, overall: 1 },
    programs: [
      { name: "B.A. LL.B (Hons)", duration: "5 years", careerPaths: ["Lawyer"] },
    ],
    admission: { entranceExams: ["CLAT"], minPercentage: 60, cutoffRank: 100 },
    fees: { perYear: 250000, total: 1250000, tier: "medium" },
    accreditation: "NAAC A",
    highlights: ["Top NLU in India", "Best placement in law", "Moot court tradition"],
    website: "https://www.nls.ac.in",
  },
  {
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    type: "Central University",
    location: { city: "Ahmedabad", state: "Gujarat" },
    ranking: { nirf: 1, overall: 1 },
    programs: [
      { name: "MBA (PGP)", duration: "2 years", careerPaths: ["Chartered Accountant", "Data Scientist", "Software Engineer"] },
    ],
    admission: { entranceExams: ["CAT"], minPercentage: 60, cutoffRank: 50 },
    fees: { perYear: 1250000, total: 2500000, tier: "high" },
    accreditation: "AACSB",
    highlights: ["#1 B-School in India", "Global alumni network", "₹30+ LPA avg package"],
    website: "https://www.iima.ac.in",
  },
  {
    name: "National Institute of Design Ahmedabad",
    shortName: "NID Ahmedabad",
    type: "Government",
    location: { city: "Ahmedabad", state: "Gujarat" },
    ranking: { nirf: 1, overall: 1 },
    programs: [
      { name: "B.Des", duration: "4 years", careerPaths: ["Graphic Designer"] },
    ],
    admission: { entranceExams: ["NID DAT"], minPercentage: 50 },
    fees: { perYear: 280000, total: 1120000, tier: "medium" },
    accreditation: "NAAC A",
    highlights: ["Premier design school", "Industry collaborations", "Global recognition"],
    website: "https://www.nid.edu",
  },
  {
    name: "Delhi University (DU)",
    shortName: "DU",
    type: "Central University",
    location: { city: "New Delhi", state: "Delhi" },
    ranking: { nirf: 11, overall: 11 },
    programs: [
      { name: "B.A. Psychology", duration: "3 years", careerPaths: ["Psychologist", "Teacher / Educator"] },
      { name: "B.A. Journalism", duration: "3 years", careerPaths: ["Journalist / Media Professional"] },
      { name: "B.Com (Hons)", duration: "3 years", careerPaths: ["Chartered Accountant"] },
      { name: "B.Sc Computer Science", duration: "3 years", careerPaths: ["Software Engineer"] },
    ],
    admission: { entranceExams: ["CUET"], minPercentage: 60 },
    fees: { perYear: 25000, total: 75000, tier: "low" },
    accreditation: "NAAC A++",
    highlights: ["Affordable fees", "Diverse campus life", "Strong reputation"],
    website: "https://www.du.ac.in",
  },
  {
    name: "Manipal Institute of Technology",
    shortName: "MIT Manipal",
    type: "Deemed",
    location: { city: "Manipal", state: "Karnataka" },
    ranking: { nirf: 50, overall: 50 },
    programs: [
      { name: "B.Tech Computer Science", duration: "4 years", careerPaths: ["Software Engineer", "Data Scientist"] },
      { name: "B.Tech Civil Engineering", duration: "4 years", careerPaths: ["Civil Engineer"] },
    ],
    admission: { entranceExams: ["MET", "JEE Main"], minPercentage: 60 },
    fees: { perYear: 350000, total: 1400000, tier: "high" },
    accreditation: "NAAC A++",
    highlights: ["Strong industry ties", "Modern labs", "Good placement record"],
    website: "https://manipal.edu/mit.html",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  SAMPLE STUDENT
// ═══════════════════════════════════════════════════════════════════════════
const sampleStudents = [
  {
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    age: 17,
    currentClass: "12th",
    stream: "Science",
    marks: [
      { subject: "Mathematics", score: 88 },
      { subject: "Physics",     score: 82 },
      { subject: "Chemistry",   score: 75 },
      { subject: "English",     score: 91 },
      { subject: "Computer Science", score: 95 },
    ],
    interests: ["coding", "technology", "mathematics", "problem solving"],
    skills: ["programming", "logical thinking", "teamwork"],
    preferredWorkStyle: "remote",
    careerGoal: "Want to build impactful software products",
    location: "Mumbai",
    budgetPreference: "medium",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    age: 16,
    currentClass: "11th",
    stream: "Science",
    marks: [
      { subject: "Biology",   score: 94 },
      { subject: "Chemistry", score: 89 },
      { subject: "Physics",   score: 78 },
      { subject: "English",   score: 85 },
    ],
    interests: ["biology", "medicine", "helping people", "science"],
    skills: ["empathy", "critical thinking", "communication", "biology"],
    preferredWorkStyle: "indoor",
    careerGoal: "Become a paediatrician",
    location: "Kerala",
    budgetPreference: "low",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  SEED FUNCTION
// ═══════════════════════════════════════════════════════════════════════════
const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      Career.deleteMany({}),
      College.deleteMany({}),
      Student.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    // Insert fresh data
    await Career.insertMany(careers);
    console.log(`🎓 Inserted ${careers.length} careers`);

    await College.insertMany(colleges);
    console.log(`🏫 Inserted ${colleges.length} colleges`);

    for (const s of sampleStudents) {
      const student = new Student(s);
      await student.save(); // triggers pre-save hooks
    }
    console.log(`👤 Inserted ${sampleStudents.length} sample students`);

    console.log("\n✅ Database seeded successfully!\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
