export interface ExperienceStat {
  value: string;
  label: string;
  telemetry: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  category: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  stat1: ExperienceStat;
  stat2: ExperienceStat;
  handwrittenNote: string;
  sketchAnnotation: string;
  accent: string;
  accentText: string;
  accentBg: string;
  glowColor: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "lead-creative-architect",
    year: "2024 — PRESENT",
    period: "2 Years",
    role: "Principal Systems Architect & Creative Director",
    company: "Autonomous Studio / Bespoke Engagements",
    location: "Global / Remote",
    category: "AI WORKSPACES & WEBGL SYSTEMS",
    summary: "Leading high-end digital architecture, bespoke WebGL experiences, and generative AI systems for tier-1 tech startups and venture studios.",
    highlights: [
      "Engineered real-time AI node workspace supporting 50,000+ active nodes at 60 FPS.",
      "Architected Next.js 15 & GPU shader pipelines delivering 99+ Lighthouse scores.",
      "Directed end-to-end creative direction, sound design, and kinetic brand systems."
    ],
    techStack: ["Next.js 15", "TypeScript", "Three.js", "GSAP", "Rust / WASM", "Tailwind CSS"],
    stat1: { value: "50,000+", label: "Active 3D Nodes", telemetry: "STABLE CONCURRENCY" },
    stat2: { value: "60 FPS", label: "Steady Shader Pacing", telemetry: "ZERO FRAME DROPS" },
    handwrittenNote: "rock-solid 60 FPS under massive load",
    sketchAnnotation: "current focus: WebGL + generative AI pipelines",
    accent: "#38BDF8",
    accentText: "text-sky-400",
    accentBg: "bg-sky-400",
    glowColor: "rgba(56, 189, 248, 0.16)",
  },
  {
    id: "senior-fullstack-engineer",
    year: "2022 — 2024",
    period: "2 Years",
    role: "Senior Full-Stack & Creative Developer",
    company: "Nexus Interactive Technologies",
    location: "San Francisco, CA",
    category: "HIGH-FREQUENCY SYSTEMS & TELEMETRY",
    summary: "Engineered high-frequency trading terminals, real-time telemetry dashboards, and interactive platforms under massive real-time load.",
    highlights: [
      "Cut frontend state latency by 72% via custom OffscreenCanvas & Web Worker pipelines.",
      "Built core design token & motion library standardized across 12 product lines.",
      "Scaled real-time WebSocket infrastructure handling 100K+ concurrent market events."
    ],
    techStack: ["React", "TypeScript", "Node.js", "WebSockets", "GraphQL", "PostgreSQL"],
    stat1: { value: "-72%", label: "Frontend State Latency", telemetry: "OFFSCREEN WORKERS" },
    stat2: { value: "12 Lines", label: "Standardized Token Systems", telemetry: "GLOBAL DESIGN SYSTEM" },
    handwrittenNote: "sub-millisecond state propagation",
    sketchAnnotation: "standardized design tokens across 12 product lines",
    accent: "#818CF8",
    accentText: "text-indigo-400",
    accentBg: "bg-indigo-400",
    glowColor: "rgba(129, 140, 248, 0.16)",
  },
  {
    id: "creative-developer-video",
    year: "2020 — 2022",
    period: "2 Years",
    role: "Creative Developer & Motion Director",
    company: "Vanguard Media Lab",
    location: "New York, NY",
    category: "EDITORIAL DIRECTION & MOTION PHYSICS",
    summary: "Crafted bespoke multimedia experiences, commercial product showcases, and interactive editorial storytelling for global luxury brands.",
    highlights: [
      "Directed cinematic post-production and motion physics for high-profile digital product releases.",
      "Multiple Awwwards Site of the Day & FWA recognitions for creative frontend innovation.",
      "Engineered bespoke audio-visual sync engines with zero frame drops across mobile and desktop."
    ],
    techStack: ["JavaScript", "GSAP", "WebGL", "Three.js", "DaVinci Resolve", "After Effects"],
    stat1: { value: "SOTD", label: "Awwwards Recognition", telemetry: "SITE OF THE DAY" },
    stat2: { value: "300K+", label: "Launch Day Sessions", telemetry: "ZERO REGRESSIONS" },
    handwrittenNote: "cinematic 60fps audio-visual storytelling",
    sketchAnnotation: "multiple Awwwards SOTD & FWA honors",
    accent: "#F43F5E",
    accentText: "text-rose-400",
    accentBg: "bg-rose-400",
    glowColor: "rgba(244, 63, 94, 0.16)",
  },
  {
    id: "foundation-engineer",
    year: "2018 — 2020",
    period: "2 Years",
    role: "Full-Stack Software Engineer",
    company: "Apex Digital Solutions",
    location: "Remote",
    category: "CLOUD ARCHITECTURE & DISTRIBUTED APIS",
    summary: "Developed scalable cloud microservices, high-throughput REST API gateways, and distributed database synchronization pipelines.",
    highlights: [
      "Engineered zero-downtime CI/CD deployment pipelines and automated database migrations.",
      "Implemented high-throughput authentication, rate-limiting, and Redis caching layers.",
      "Maintained 99.99% service uptime across critical enterprise production clusters."
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "Express", "Docker", "AWS", "Redis"],
    stat1: { value: "99.99%", label: "Cloud Service Uptime", telemetry: "ENTERPRISE SLA" },
    stat2: { value: "Zero", label: "Downtime Deployments", telemetry: "AUTOMATED CI/CD" },
    handwrittenNote: "99.99% production uptime SLA",
    sketchAnnotation: "high-throughput microservices & distributed caches",
    accent: "#10B981",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.16)",
  }
];

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "DISCOVERY & VISION",
    subtitle: "Deconstructing constraints, architectural requirements, and aesthetic DNA.",
    description: "Every great piece of work begins with deep listening. We define the core narrative, technical benchmarks, target audience psychoacoustics, and visual posture before writing a single line of code.",
    deliverables: ["Technical Scope Blueprint", "Moodboards & Typography Study", "Performance Benchmarks", "System Architecture Plan"],
    duration: "Week 01"
  },
  {
    step: "02",
    title: "ART DIRECTION & SPATIAL DESIGN",
    subtitle: "Composing the visual rhythm, wireframes, and kinetic language.",
    description: "Designing layout hierarchies with aggressive negative space, custom typographic proportion systems, and cinematic lighting treatments. We establish the emotional tone and interaction physics.",
    deliverables: ["Fidelity Prototypes", "Custom Motion Specs", "Color Pacing Matrix", "Component Design Tokens"],
    duration: "Week 02"
  },
  {
    step: "03",
    title: "ENGINEERING & MOTION CHOREOGRAPHY",
    subtitle: "Precision TypeScript implementation, GPU acceleration, and micro-physics.",
    description: "Developing clean, modular Next.js architecture integrated with GSAP ScrollTrigger timelines and Lenis inertia physics. Zero jank, optimized bundle sizing, and strict type safety.",
    deliverables: ["Full-Stack App Architecture", "Custom GSAP Choreography", "Interactive Shaders/Canvas", "Responsive Viewports"],
    duration: "Week 03 — 04"
  },
  {
    step: "04",
    title: "POLISH, PERF & SOUND DESIGN",
    subtitle: "Frame-by-frame scrutiny, acoustic tuning, and GPU optimization.",
    description: "Testing against aggressive throttling, optimizing paint cycles, smoothing touch gestures on iOS/Android, and embedding subtle tactile sound synthesis for unforgettable tactile delight.",
    deliverables: ["60+ FPS Profiling Report", "Audio Haptic Synthesis", "Cross-Browser Hardening", "Accessibility Audits"],
    duration: "Week 05"
  },
  {
    step: "05",
    title: "DEPLOYMENT & SCALE",
    subtitle: "Edge distribution, automated caching, and handover.",
    description: "Seamless deployment across global edge CDN networks with zero-downtime health monitoring, production analytics integration, and comprehensive architectural documentation.",
    deliverables: ["Global Edge Deployment", "Lighthouse 95+ Certification", "SEO & OpenGraph Assets", "Clean Codebase Handover"],
    duration: "Launch Day"
  }
];
