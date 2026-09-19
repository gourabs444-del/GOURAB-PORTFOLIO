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
