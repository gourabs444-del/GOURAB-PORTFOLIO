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
    summary: "Leading high-end digital architecture, custom WebGL experiences, and generative AI systems for tier-1 tech startups, luxury brands, and venture studios.",
    highlights: [
      "Engineered real-time AI node workspace supporting 50,000+ nodes at 60 FPS.",
      "Directed motion and front-end execution for award-winning digital campaigns.",
      "Mentored engineering teams on performance profiling, GPU shaders, and Next.js optimization."
    ],
    techStack: ["Next.js 15", "TypeScript", "Three.js / Shaders", "GSAP", "Rust / WASM", "Tailwind CSS"]
  },
  {
    id: "senior-fullstack-engineer",
    year: "2022 — 2024",
    period: "2 Years",
    role: "Senior Full-Stack & Creative Developer",
    company: "Nexus Interactive Technologies",
    location: "San Francisco, CA",
    summary: "Built high-frequency trading terminals, real-time telemetry dashboards, and interactive brand platforms.",
    highlights: [
      "Cut frontend state latency by 72% via custom OffscreenCanvas and Web Worker pipelines.",
      "Architected core design token system and motion component library used across 12 product lines.",
      "Led migration from legacy architectures to Next.js App Router with 99+ Lighthouse scores."
    ],
    techStack: ["React", "TypeScript", "Node.js", "WebSockets", "GraphQL", "PostgreSQL", "Docker"]
  },
  {
    id: "creative-developer-video",
    year: "2020 — 2022",
    period: "2 Years",
    role: "Creative Developer & Motion Director",
    company: "Vanguard Media Lab",
    location: "New York, NY",
    summary: "Designed and delivered bespoke multimedia web experiences, commercial film trailers, and interactive editorial pieces.",
    highlights: [
      "Directed DaVinci Resolve color pipelines and post-production for high-profile client launches.",
      "Engineered kinetic typography engines and smooth scroll interactions.",
      "Achieved multiple digital design nominations and site-of-the-day recognitions."
    ],
    techStack: ["JavaScript", "GSAP", "WebGL", "DaVinci Resolve", "Premiere Pro", "After Effects"]
  },
  {
    id: "foundation-engineer",
    year: "2018 — 2020",
    period: "2 Years",
    role: "Full-Stack Software Engineer",
    company: "Apex Digital Solutions",
    location: "Remote",
    summary: "Developed scalable web applications, REST API gateways, and distributed cloud microservices.",
    highlights: [
      "Constructed secure authentication systems, automated CI/CD pipelines, and relational database migrations.",
      "Developed custom frontend widgets and responsive interfaces for enterprise clients."
    ],
    techStack: ["JavaScript", "Node.js", "Express", "React", "PostgreSQL", "AWS"]
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
