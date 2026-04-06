export const profile = {
  name: "Prajwal Srinivas",
  title: "Full-Stack Cloud Developer & MSCS Graduate",
  email: "prajwal.srinivas238@gmail.com",
  phone: "848-230-1591",
  location: "New Brunswick, NJ",
  linkedin: "https://linkedin.com/in/prajwalsrinivas238",
  github: "https://github.com/Prajwal-17",
};

export const about = {
  summary: "Full-Stack Cloud Developer & Master's Student with 2.5+ years of experience building high-availability AI platforms and secure cloud infrastructure. As Co-Founder & CTO of Beunec, developed an end-to-end AI ecosystem leveraging AWS, MongoDB & Cloudflare to optimize performance and scalability.",
  bio: "Currently pursuing my Master's in Computer Science at Rutgers University with a 3.65 GPA, I specialize in architecting scalable cloud systems and AI-driven platforms. As CTO of Beunec, I lead development of production systems serving 1K+ users at 99.9% uptime.",
  location: "New Brunswick, NJ",
  education: {
    current: "Rutgers University - MS Computer Science (GPA 3.65/4.0) | Expected 2026",
    prior: "MVJ College of Engineering - BS Computer Science (GPA 9.1/10) | 2023",
  },
  stats: [
    { label: "Years Exp", value: "2.5+", icon: "Clock" },
    { label: "Uptime", value: "99.9%", icon: "TrendingUp" },
    { label: "Users Served", value: "1K+", icon: "Users" },
    { label: "GPA @ Rutgers", value: "3.65", icon: "Award" },
  ],
};

export const skills = [
  {
    category: "Languages",
    icon: "Code",
    skills: ["Python", "JavaScript", "TypeScript", "Go (Golang)", "Java", "SQL"],
  },
  {
    category: "Frameworks",
    icon: "Layers",
    skills: ["Next.js", "React", "Node.js / Express", "Flask", "TailwindCSS"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["AWS", "GCP", "Docker", "Kubernetes", "Cloudflare", "GitHub Actions"],
  },
  {
    category: "AI & Data",
    icon: "Brain",
    skills: ["PyTorch", "LangChain", "OpenAI API", "Redis", "MongoDB", "MySQL"],
  },
];

export const certifications = [
  "AWS Cloud Practitioner",
  "Machine Learning A-Z (Udemy)",
  "Salesforce Developer Catalyst",
];

export const experiences = [
  {
    company: "Beunec Technologies",
    role: "Co-Founder & CTO, Team Lead",
    period: "May 2025 - Present",
    tech: ["Next.js", "Node.js", "Cloudflare", "MongoDB", "AWS", "GCP", "Redis"],
    bullets: [
      "Architected and scaled Beunec Cloud, an AI productivity ecosystem with failover and global load balancing supporting 1K+ users with 99.9% uptime.",
      "Engineered Aselius AI, a proprietary GenAI engine with ground-search and privacy-first infrastructure, end-to-end encryption, and GDPR-compliant handling.",
      "Optimized platform infrastructure achieving 99.9% availability with real-time behavioral analytics via Python for resource monitoring and traffic scaling.",
    ],
    link: "https://beunec.com",
    current: true,
    highlight: true,
  },
  {
    company: "Universal Selfcare",
    role: "Cloud Systems Engineer & Project Lead",
    period: "Dec 2025 - Jan 2026",
    tech: ["GCP", "Cloud Run", "Cloud Functions", "Postgres", "GKE", "Go"],
    bullets: [
      "Engineered GCP-based serverless backend using Cloud Functions, Cloud Run, and GKE, achieving 95% test coverage within a 4-week high-intensity cycle.",
      "Leveraged AI-assisted development to accelerate cloud-native module delivery, reducing development cycles by 30%.",
      "Coordinated technical delivery with 5 developers, enforcing coding standards and ensuring 100% on-time MVP delivery.",
    ],
    current: false,
    highlight: false,
  },
  {
    company: "Rutgers University",
    role: "Teaching Assistant & Grader",
    period: "Sept 2024 - Present",
    tech: ["JavaScript", "HTML", "CSS", "SQL"],
    bullets: [
      "Teaching and mentoring 150+ students in web technologies and SQL, improving assignment performance by 25%.",
      "Reducing submission errors by 30% through structured technical reviews and hands-on debugging sessions.",
    ],
    current: true,
    highlight: false,
  },
  {
    company: "CSG International",
    role: "Software Developer",
    period: "Feb 2023 - Aug 2024",
    tech: ["REST API", "Azure DevOps", "Java", "Perl", "Unit Testing"],
    bullets: [
      "Developed core features for Customer Connect agent desktop for global telecom clients.",
      "Collaborated on agile SDLC to reduce post-release defect rates by 20% while ensuring high-performance service delivery.",
    ],
    current: false,
    highlight: false,
  },
];

export const projects = [
  {
    title: "Hyper-Orchestrator",
    subtitle: "Dynamic AI Task Orchestration Engine",
    description:
      "World's first intelligent dynamic task orchestration engine for Zo Computer. Planner Agent analyzes goals, decomposes into specialized sub-tasks, and executes with adaptive worker pools achieving 4.2x speedup.",
    tech: ["Python", "AsyncIO", "AI Orchestration", "DAG", "Parallel Execution"],
    icon: "Zap",
    github: "https://github.com/prajwal2308/hyper-orchestrator",
    featured: true,
    metric: "4.2x Speedup",
  },
  {
    title: "Beunec Cloud",
    subtitle: "AI Productivity Ecosystem",
    description:
      "End-to-end AI productivity ecosystem with global load balancing, failover architecture, and real-time behavioral analytics serving 1K+ users at 99.9% uptime.",
    tech: ["Next.js", "Node.js", "AWS", "Cloudflare", "MongoDB", "Redis"],
    icon: "Cloud",
    link: "https://beunec.com",
    github: undefined,
    featured: true,
    metric: "1K+ Users",
  },
  {
    title: "Aselius AI",
    subtitle: "Proprietary GenAI Engine",
    description:
      "Privacy-first generative AI engine with ground-search capability, end-to-end encryption, and secure vector storage for GDPR-compliant data handling.",
    tech: ["Python", "OpenAI API", "LangChain", "Vector DB", "Cloudflare"],
    icon: "Sparkles",
    featured: true,
    metric: "GDPR-Ready",
  },
  {
    title: "Proactive Retrieval Thinker-Curator",
    subtitle: "Multi-Agent AI System",
    description:
      "Multi-agent AI system enhancing LLM long-term memory using proactive retrieval, reducing hallucination rates by 15% across large-scale datasets.",
    tech: ["Python", "LangChain", "LLM", "Vector Embeddings", "RAG"],
    icon: "Brain",
    github: "https://github.com/prajwal2308/Proactive_Retrieval_Thinker_Curator_Model_for_AI_Memory",
    featured: false,
    metric: "-15% Hallucination",
  },
  {
    title: "LoRaWAN-style Mesh IoT Simulator",
    subtitle: "Containerized Network Simulation",
    description:
      "Simulated lightweight IoT mesh network using containerized UDP nodes with multi-hop routing and failure injection mimicking real-world LoRaWAN behavior.",
    tech: ["Docker", "Kubernetes", "UDP", "Python"],
    icon: "Radio",
    github: "https://github.com/prajwal2308/DIS_PROJECT_LoRAWAN",
    featured: false,
    metric: "Multi-hop",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
