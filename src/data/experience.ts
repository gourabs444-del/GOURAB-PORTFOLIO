export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "lead-creative-architect",
    year: "2024 — PRESENT",
    period: "2 Years",
    role: "Principal Systems Architect & Creative Director",
    company: "Autonomous Studio / Bespoke Engagements",
    location: "Global / Remote",
    summary: "Leading high-end digital architecture, bespoke WebGL experiences, and generative AI systems for tier-1 tech startups and venture studios.",
    highlights: [
      "Engineered real-time AI node workspace supporting 50,000+ active nodes at 60 FPS.",
      "Architected Next.js 15 & GPU shader pipelines delivering 99+ Lighthouse scores."
    ],
    techStack: ["Next.js 15", "TypeScript", "Three.js", "GSAP", "Rust / WASM", "Tailwind CSS"]
  },
  {
    id: "senior-fullstack-engineer",
    year: "2022 — 2024",
    period: "2 Years",
    role: "Senior Full-Stack & Creative Developer",
    company: "Nexus Interactive Technologies",
    location: "San Francisco, CA",
    summary: "Engineered high-frequency trading terminals, real-time telemetry dashboards, and interactive platforms.",
    highlights: [
      "Cut frontend state latency by 72% via custom OffscreenCanvas & Web Worker pipelines.",
      "Built core design token & motion library standardized across 12 product lines."
    ],
    techStack: ["React", "TypeScript", "Node.js", "WebSockets", "GraphQL", "PostgreSQL"]
  },
  {
    id: "creative-developer-video",
    year: "2020 — 2022",
    period: "2 Years",
    role: "Creative Developer & Motion Director",
    company: "Vanguard Media Lab",
    location: "New York, NY",
    summary: "Crafted bespoke multimedia experiences, commercial trailers, and interactive editorial storytelling.",
    highlights: [
      "Directed cinematic post-production and motion systems for high-profile client launches.",
      "Multiple Awwwards & Site of the Day recognitions for creative frontend innovation."
    ],
    techStack: ["JavaScript", "GSAP", "WebGL", "DaVinci Resolve", "After Effects"]
  },
  {
    id: "foundation-engineer",
    year: "2018 — 2020",
    period: "2 Years",
    role: "Full-Stack Software Engineer",
    company: "Apex Digital Solutions",
    location: "Remote",
    summary: "Developed scalable cloud microservices, REST API gateways, and distributed data systems.",
    highlights: [
      "Engineered zero-downtime CI/CD deployment pipelines and automated database migrations.",
      "Implemented high-throughput authentication and caching layers."
    ],
    techStack: ["Node.js", "React", "PostgreSQL", "Express", "Docker", "AWS"]
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
