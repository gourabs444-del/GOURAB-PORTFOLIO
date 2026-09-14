export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: "Full-Stack" | "Creative Dev" | "Motion & Film" | "AI Systems";
  year: string;
  tagline: string;
  description: string;
  fullOverview: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  role: string;
  accentColor: string;
  heroImage: string;
  secondaryImage: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "aethel-os",
    number: "01",
    title: "AETHEL // Autonomous Neural Engine",
    client: "Aethel Labs",
    category: "AI Systems",
    year: "2026",
    tagline: "Real-time generative intelligence workspace with spatial canvas and low-latency streaming pipeline.",
    description: "Architected a high-throughput, multimodal AI platform featuring real-time stream processing, graph-based node editors, and WebGL telemetry visualization.",
    fullOverview: "Aethel is an enterprise-grade AI operating layer that enables researchers to orchestrate multi-agent autonomous reasoning loops. Built with a custom WebGL node canvas, sub-50ms WebSocket streaming pipelines, and distributed vector embeddings.",
    challenge: "Rendering 10,000+ interactive graph nodes concurrently while streaming live token responses from multiple LLM endpoints at 60 FPS without memory leaks or UI lockups.",
    solution: "Engineered a custom PixiJS/WebGL viewport with spatial QuadTree indexing, Web Workers for heavy graph math calculations, and an optimistic state reconciliation engine in TypeScript.",
    metrics: [
      { label: "Rendering Framerate", value: "60 FPS steady" },
      { label: "Stream Latency", value: "< 42ms TTFT" },
      { label: "Node Capacity", value: "50,000+ nodes" },
      { label: "Daily Active Agents", value: "1.2M+" },
    ],
    technologies: ["Next.js 15", "TypeScript", "WebGL", "Rust", "WebSockets", "Tailwind CSS", "GSAP", "Redis"],
    role: "Lead Systems Architect & Creative Developer",
    accentColor: "#E5A93C",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://aethel.systems",
    githubUrl: "https://github.com/aethel-labs/engine",
    featured: true,
  },
  {
    id: "chronos-cinema",
    number: "02",
    title: "CHRONOS // Film Title & Spatial Archive",
    client: "Chronos Motion Pictures",
    category: "Creative Dev",
    year: "2025",
    tagline: "Awwwards-winning spatial web archive for an independent sci-fi documentary series.",
    description: "An experimental 3D web experience with volumetric light rays, custom post-processing shaders, and interactive soundscapes that adapt to user scroll velocity.",
    fullOverview: "Chronos is a narrative-driven interactive digital archive for a feature documentary. The experience guides the audience through five non-linear timeline dimensions using custom fragment shaders, raymarching volumetric dust, and an interactive audio synthesizer.",
    challenge: "Delivering ultra-high visual fidelity with full volumetric fog and depth-of-field post-processing while maintaining instantaneous load times across low-powered mobile devices.",
    solution: "Implemented adaptive dynamic resolution scaling, custom compressed KTX2/Basis textures, and dynamic GLSL LOD (Level of Detail) shader swapping based on real-time device GPU benchmarks.",
    metrics: [
      { label: "Awwwards Honors", value: "Site of the Day" },
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Avg. Session Duration", value: "4m 12s" },
      { label: "Global Traffic", value: "850k+ Visits" },
    ],
    technologies: ["Three.js", "GLSL Shaders", "GSAP ScrollTrigger", "Lenis", "Web Audio API", "Next.js", "Tailwind CSS"],
    role: "Creative Technologist & 3D Shading Director",
    accentColor: "#38BDF8",
    heroImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://chronos-motion.world",
    githubUrl: "https://github.com/chronos-motion/archive",
    featured: true,
  },
  {
    id: "hyperion-trade",
    number: "03",
    title: "HYPERION // High-Frequency Liquidity Protocol",
    client: "Hyperion Capital",
    category: "Full-Stack",
    year: "2025",
    tagline: "Institutional-grade decentralized trading terminal with millisecond order book execution.",
    description: "Engineered a low-latency financial trading portal with real-time WebGL depth charts, automated algorithmic execution bots, and zero-knowledge privacy layers.",
    fullOverview: "Hyperion handles over $250M in daily transaction volume. The interface provides institutional traders with bespoke customizable workspaces, ultra-smooth candle charts with custom indicators, and biometric security authentication.",
    challenge: "Processing over 25,000 WebSocket market tick updates per second without triggering UI re-render bottlenecks or garbage collection spikes in React.",
    solution: "Built a custom OffscreenCanvas rendering engine that bypasses the React reconciliation tree for chart updates, combined with SharedArrayBuffers and Web Workers for zero-copy binary data decoding.",
    metrics: [
      { label: "Daily Volume", value: "$250M+" },
      { label: "Chart Render Rate", value: "120 FPS Native" },
      { label: "State Sync Overhead", value: "< 1.8ms" },
      { label: "Security Audit Score", value: "100% Passed" },
    ],
    technologies: ["React 19", "Next.js", "TypeScript", "Rust / WASM", "Tailwind CSS", "OffscreenCanvas", "Node.js", "Docker"],
    role: "Full-Stack Lead Architect & Frontend Engine Engineer",
    accentColor: "#10B981",
    heroImage: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1644357076595-ab357eef6c82?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://hyperion.fi",
    githubUrl: "https://github.com/hyperion-protocol/core",
    featured: true,
  },
  {
    id: "noir-reel",
    number: "04",
    title: "NOIR // Editorial Motion & Cinematic Color Grade",
    client: "Noir Haute Couture",
    category: "Motion & Film",
    year: "2024",
    tagline: "Commercial film campaign and interactive lookbook with cinematic pacing and custom typographic reveals.",
    description: "Directed visual style, motion sequences, DaVinci Resolve color grading, and dynamic interactive lookbook for an international luxury fashion house.",
    fullOverview: "A seamless synthesis of cinematic 4K video storytelling and interactive web design. Visitors interact with synchronized audio cues, multi-angle cutaways, and seamless fluid transitions between motion chapters.",
    challenge: "Delivering seamless 4K video streaming with instant scrub capability without stuttering on variable mobile bandwidth.",
    solution: "Authored an adaptive HLS multi-bitrate streaming pipeline with custom service worker caching, preloading next scene segments based on scroll velocity prediction.",
    metrics: [
      { label: "Video Engagement", value: "92% Completion" },
      { label: "Lookbook Conversions", value: "+340% YoY" },
      { label: "Vogue Feature", value: "Editorial Spotlight" },
      { label: "Frame Rate", value: "4K 60fps HDR" },
    ],
    technologies: ["DaVinci Resolve Studio", "Premiere Pro", "After Effects", "HLS Video API", "GSAP", "Lenis", "Tailwind CSS"],
    role: "Video Director, Colorist & Creative Technologist",
    accentColor: "#F43F5E",
    heroImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    liveUrl: "https://noir-studio.co",
    githubUrl: "https://github.com/noir-studio/lookbook",
    featured: true,
  },
];
