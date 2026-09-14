export interface SkillGroup {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    description: string;
    highlight?: boolean;
  }[];
  disciplines: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "engineering",
    number: "01",
    title: "Full-Stack Architecture",
    subtitle: "High-Throughput Distributed Systems & Reactive Interfaces",
    description: "Building resilient, performant full-stack platforms from bare-metal cloud infrastructure down to zero-latency frontend client states.",
    accent: "#E5A93C",
    iconName: "Code2",
    skills: [
      { name: "React & Next.js 15 (App Router)", level: "Mastery", description: "SSR, Server Components, Streaming UI & Turbopack optimization", highlight: true },
      { name: "TypeScript & Modern JavaScript", level: "Mastery", description: "Strict type systems, AST manipulation & high-performance design patterns", highlight: true },
      { name: "Node.js, Rust & WASM", level: "Advanced", description: "Low-overhead microservices, native performance modules & background workers" },
      { name: "PostgreSQL, Redis & Vector DBs", level: "Advanced", description: "Complex relational schemas, cache hierarchies & semantic embedding storage" },
      { name: "REST, GraphQL & WebSockets", level: "Mastery", description: "Bi-directional real-time telemetry streams & sub-50ms RPC protocols" },
      { name: "Tailwind CSS & Modular Design", level: "Mastery", description: "Design tokens, bespoke typography systems & CSS custom properties" },
    ],
    disciplines: ["System Architecture", "Zero-Latency State", "API Design", "Database Modeling", "Edge Computing"]
  },
  {
    id: "creative-tech",
    number: "02",
    title: "Creative Tech & Shaders",
    subtitle: "Spatial Viewports, WebGL & Kinetic Choreography",
    description: "Translating physical materials, lighting, and motion physics into immersive browser experiences at steady 60+ FPS.",
    accent: "#38BDF8",
    iconName: "Sparkles",
    skills: [
      { name: "GSAP & ScrollTrigger Suite", level: "Mastery", description: "Complex timeline choreography, pinned scrub sequences & custom easing", highlight: true },
      { name: "Three.js & Custom GLSL Shaders", level: "Advanced", description: "Fragment/vertex shaders, raymarching, volumetric dust & post-processing", highlight: true },
      { name: "Lenis Smooth Scroll Physics", level: "Mastery", description: "Custom momentum damping, viewport anchoring & ticker synchronization" },
      { name: "HTML5 Canvas & 2D Context", level: "Mastery", description: "Pixel manipulation, particle physics systems & procedural noise grids" },
      { name: "Web Audio API Synthesis", level: "Advanced", description: "Tactile acoustic micro-interactions & real-time audio visualizers" },
      { name: "Responsive Spatial Layouts", level: "Mastery", description: "Fluid typography scaling, clamp algorithms & fluid aspect ratios" },
    ],
    disciplines: ["Shader Programming", "Scroll Mechanics", "Kinetic Typography", "Micro-Interactions", "Audio Design"]
  },
  {
    id: "motion-film",
    number: "03",
    title: "Motion & Cinematic Video",
    subtitle: "Rhythm, Color Pacing & High-End Visual Narrative",
    description: "Crafting editorial pacing and cinematic atmosphere through industry-standard color grading and visual effects.",
    accent: "#F43F5E",
    iconName: "Film",
    skills: [
      { name: "DaVinci Resolve Studio", level: "Mastery", description: "ACES color management, custom LUT curves & high dynamic range mastering", highlight: true },
      { name: "Adobe Premiere Pro", level: "Mastery", description: "Narrative assembly, rhythmic cuts, sound design & multi-track pacing", highlight: true },
      { name: "Adobe After Effects", level: "Advanced", description: "Kinetic typography, compositing, visual tracking & title sequence design" },
      { name: "Cinematic Sound Design", level: "Advanced", description: "Sub-bass impacts, spatial Foley & psychoacoustic tension building" },
      { name: "Camera Choreography & Lighting", level: "Advanced", description: "Aspect ratios (2.39:1 / 16:9), anamorphic framing & lens diffusion" },
      { name: "Video Encoding & Web HLS", level: "Mastery", description: "Adaptive bitrate ladder optimization, AV1/HEVC codecs & streaming CDN" },
    ],
    disciplines: ["Color Grading", "Film Pacing", "Sound Mastering", "Title Sequences", "Adaptive Streaming"]
  },
  {
    id: "ai-automation",
    number: "04",
    title: "AI & Intelligent Systems",
    subtitle: "Autonomous Agents, LLM Pipelines & Workflow Automation",
    description: "Architecting generative AI pipelines and autonomous workflow automations that eliminate friction and unlock creative scale.",
    accent: "#10B981",
    iconName: "Cpu",
    skills: [
      { name: "Multi-Agent Orchestration", level: "Advanced", description: "Autonomous task delegation, state memory loops & self-healing workflows", highlight: true },
      { name: "Gemini / OpenAI API Integration", level: "Mastery", description: "Structured function calling, multimodal reasoning & streaming synthesis", highlight: true },
      { name: "Vector Search & RAG Pipelines", level: "Advanced", description: "Hierarchical chunking, hybrid retrieval & semantic search reranking" },
      { name: "Automated Data & Tooling Pipelines", level: "Mastery", description: "Headless browser automation, background task queues & CLI toolchains" },
      { name: "Creative Generative Tools", level: "Advanced", description: "Diffusion model controlnets, generative video workflows & prompt engineering" },
    ],
    disciplines: ["Agent Architectures", "Prompt Engineering", "Semantic Search", "Workflow Automation", "Multimodal Systems"]
  }
];
