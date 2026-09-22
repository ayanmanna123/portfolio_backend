const supabase = require('../config/supabase');
const fs = require('fs');
const path = require('path');

// Local storage fallback file
const LOCAL_DATA_PATH = path.join(__dirname, '..', 'data_store.json');

// Default initial dataset matching the frontend static data
const defaultData = {
  heroData: {
    title: "I'm Ayan Manna",
    subtitle: "Full-Stack Engineer",
    description: "I build high-performance web applications that drive business growth. Specializing in React, Node.js, and scalable architecture for startups and enterprises.",
    status: "Available Immediately",
    codeSnippets: [
      "import { FullStackDeveloper } from 'ayanmanna.in';",
      "",
      "const developer = new FullStackDeveloper({",
      "  name: 'Ayan Manna',",
      "  stack: ['React', 'Next.js', 'Node.js', 'TypeScript'],",
      "  focus: 'Building scalable web applications',",
      "  status: 'Open to new opportunities'",
      "});",
      "",
      "await developer.launchPortfolio();",
      "console.log('🚀 Let\'s build something exceptional together!');"
    ]
  },
  heroAchievements: [
    { number: "10+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" }
  ],
  projects: [
    {
      id: 8,
      title: "BPPIMT Quiz",
      category: "Web Application",
      description: "An interactive quiz platform developed for B.P. Poddar Institute of Management and Technology, facilitating engaging quizzes for students.",
      image: "/projects/project8.png",
      video: "/projects/videos/bppimt-quiz-demo.mp4",
      tags: ["React", "Node.js", "Express", "MongoDB", "Vercel", "Educational"],
      demoUrl: "https://bppimt-quiz.vercel.app",
      githubUrl: "https://github.com/ayanmanna123/bppimt_quiz",
      featured: true,
      accentColor: "from-indigo-500 to-purple-600",
      status: "Live",
      highlights: ["User Authentication", "Dynamic Quiz Generation", "Real-time Scoring", "Responsive Design"],
      details: {
        problem: "Traditional quiz methods lacked interactivity and real-time feedback.",
        solution: "BPPIMT Quiz offers a dynamic platform with instant scoring and management.",
        features: [
          { title: "User Authentication", description: "Secure login system." },
          { title: "Dynamic Quiz Management", description: "Create and manage quizzes." }
        ],
        techStack: {
          Frontend: ["React", "TailwindCSS"],
          Backend: ["Node.js", "Express", "MongoDB"]
        }
      }
    },
    {
      id: 9,
      title: "Where Is My Bus",
      category: "Full Stack Web Application / Smart Transport",
      description: "Real-time bus tracking and smart public transport platform with live location tracking, route planning, and secure booking system.",
      image: "/projects/project9.png",
      video: "/projects/videos/where-is-my-bus-demo.mp4",
      tags: ["MERN Stack", "Real-Time Tracking", "Google Maps API", "Socket.io", "Razorpay Payments"],
      demoUrl: "https://gps-tracker-umber.vercel.app/",
      githubUrl: "https://github.com/ayanmanna123/GPS_Tracker",
      featured: true,
      accentColor: "from-blue-500 to-cyan-600",
      status: "Live",
      highlights: ["Live Bus Location Tracking", "Smart Route Planning", "Secure Ticket Booking"],
      details: {
        problem: "Public transport users lack real-time bus tracking.",
        solution: "Provides real-time GPS tracking and instant ticket booking.",
        features: [
          { title: "Real-Time Bus Tracking", description: "Track buses live on map." }
        ]
      }
    }
  ],
  skillsData: [
    { name: "React", category: "Frontend", level: 90, icon: "/icons/react.png" },
    { name: "Node.js", category: "Backend", level: 88, icon: "/icons/nodejs.png" },
    { name: "TypeScript", category: "Languages", level: 85, icon: "/icons/typescript.png" },
    { name: "Express.js", category: "Backend", level: 88, icon: "/icons/express.png" },
    { name: "MongoDB", category: "Database", level: 82, icon: "/icons/mongodb.png" },
    { name: "PostgreSQL", category: "Database", level: 80, icon: "/icons/postgresql.png" }
  ],
  experience: [
    {
      id: 1,
      title: "Full-Stack Developer",
      company: "Independent Projects & Freelance",
      period: "2023 - Present",
      description: "Architecting and building responsive full-stack applications with React, Node.js, Express, and modern cloud technologies.",
      highlights: ["Built scalable backend APIs", "Integrated live tracking & payments"],
      type: "work"
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.Tech in Computer Science & Engineering",
      institution: "B.P. Poddar Institute of Management and Technology",
      period: "2021 - 2025",
      grade: "8.5 CGPA",
      highlights: ["Full Stack Development", "Algorithms & Data Structures"]
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Udemy / Meta",
      date: "2024",
      credentialUrl: "#",
      image: "/projects/project1.png",
      tags: ["React", "Node.js", "Express"]
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      company: "TechCorp",
      quote: "Ayan delivered an exceptional web application on schedule with outstanding performance.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
  ],
  contactInfo: {
    email: "ayanmanna.work@gmail.com",
    phone: "+91 98765 43210",
    location: "Kolkata, India",
    socialLinks: [
      { name: "GitHub", url: "https://github.com/ayanmanna123", icon: "Github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/ayan-manna", icon: "Linkedin" },
      { name: "Twitter", url: "https://twitter.com/ayanmanna", icon: "Twitter" }
    ]
  }
};

// Helper to read local data file
function loadLocalData() {
  try {
    if (!fs.existsSync(LOCAL_DATA_PATH)) {
      fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const raw = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading local data:', err);
    return defaultData;
  }
}

// Helper to save local data file
function saveLocalData(data) {
  try {
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving local data:', err);
  }
}

// Data Store Controller
const DataStore = {
  // Get all content
  async getAllContent() {
    if (supabase) {
      try {
        const [heroRes, aboutRes, projectsRes, skillsRes, expRes, eduRes, certRes, testRes, contactRes] = await Promise.all([
          supabase.from('hero_section').select('*').limit(1),
          supabase.from('about_section').select('*').limit(1),
          supabase.from('projects').select('*').order('id', { ascending: true }),
          supabase.from('skills').select('*').order('id', { ascending: true }),
          supabase.from('experience').select('*').order('id', { ascending: true }),
          supabase.from('education').select('*').order('id', { ascending: true }),
          supabase.from('certificates').select('*').order('id', { ascending: true }),
          supabase.from('testimonials').select('*').order('id', { ascending: true }),
          supabase.from('contact_socials').select('*').limit(1)
        ]);

        const localData = loadLocalData();

        return {
          heroData: heroRes.data && heroRes.data.length > 0 ? heroRes.data[0] : localData.heroData,
          projects: projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : localData.projects,
          skillsData: skillsRes.data && skillsRes.data.length > 0 ? skillsRes.data : localData.skillsData,
          experience: expRes.data && expRes.data.length > 0 ? expRes.data : localData.experience,
          education: eduRes.data && eduRes.data.length > 0 ? eduRes.data : localData.education,
          certificates: certRes.data && certRes.data.length > 0 ? certRes.data : localData.certificates,
          testimonials: testRes.data && testRes.data.length > 0 ? testRes.data : localData.testimonials,
          contactInfo: contactRes.data && contactRes.data.length > 0 ? contactRes.data[0] : localData.contactInfo
        };
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local file store:', err.message);
      }
    }
    return loadLocalData();
  },

  // Save/Update Section Data
  async updateSection(key, payload) {
    const localData = loadLocalData();
    localData[key] = payload;
    saveLocalData(localData);

    if (supabase) {
      try {
        if (key === 'heroData') {
          await supabase.from('hero_section').upsert({ id: '00000000-0000-0000-0000-000000000001', ...payload });
        } else if (key === 'projects') {
          // Sync projects
        }
      } catch (err) {
        console.warn('Supabase update sync failed:', err.message);
      }
    }

    return localData[key];
  }
};

module.exports = { DataStore, loadLocalData, saveLocalData };
