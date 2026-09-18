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
    title: "AETHEL",
    client: "Aethel Labs // San Francisco",
    category: "AI Systems",
    year: "2026",
    tagline: "Autonomous neural intelligence workspace with dynamic spatial canvas and sub-40ms streaming pipeline.",
    description: "Architected a high-throughput, multimodal AI platform featuring real-time stream processing, graph-based node editors, and WebGL telemetry visualization.",
    fullOverview: "Aethel is an enterprise-grade AI operating layer that enables researchers to orchestrate multi-agent autonomous reasoning loops. Built with a custom WebGL node canvas, sub-50ms WebSocket streaming pipelines, and distributed vector embeddings.",
    challenge: "Rendering 10,000+ interactive graph nodes concurrently while streaming live token responses from multiple LLM endpoints at 60 FPS without memory leaks or UI lockups.",
    solution: "Engineered a custom PixiJS/WebGL viewport with spatial QuadTree indexing, Web Workers for heavy graph math calculations, and an optimistic state reconciliation engine in TypeScript.",
    metrics: [
      { label: "Rendering Framerate", value: "60 FPS Native" },
      { label: "Stream Latency", value: "< 38ms TTFT" },
      { label: "Node Capacity", value: "50,000+ nodes" },
      { label: "Active Inference Agents", value: "1.2M+" },
    ],
    technologies: ["Next.js 15", "TypeScript", "WebGL", "Rust", "WebSockets", "Tailwind CSS", "GSAP"],
    role: "Lead Systems Architect & Creative Developer",
    accentColor: "#F59E0B",
    heroImage: "/assets/aethel-iceberg-ui.png",
    secondaryImage: "/assets/aethel-iceberg-ui.png",
    liveUrl: "https://aethel.systems",
    githubUrl: "https://github.com/aethel-labs/engine",
    featured: true,
  },
  {
    id: "chronos-cinema",
    number: "02",
    title: "CHRONOS",
    client: "Chronos Motion Pictures // London",
    category: "Creative Dev",
    year: "2025",
    tagline: "Awwwards Site of the Year candidate: Volumetric 3D spatial web archive for a sci-fi documentary series.",
    description: "An experimental 3D web experience with volumetric light rays, custom post-processing shaders, and interactive soundscapes that adapt to user scroll velocity.",
    fullOverview: "Chronos is a narrative-driven interactive digital archive for a feature documentary. The experience guides the audience through five non-linear timeline dimensions using custom fragment shaders, raymarching volumetric dust, and an interactive audio synthesizer.",
    challenge: "Delivering ultra-high visual fidelity with full volumetric fog and depth-of-field post-processing while maintaining instantaneous load times across low-powered mobile devices.",
    solution: "Implemented adaptive dynamic resolution scaling, custom compressed KTX2/Basis textures, and dynamic GLSL LOD shader swapping based on real-time device GPU benchmarks.",
    metrics: [
      { label: "Awwwards Honors", value: "Site of the Day" },
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "Avg. Session Duration", value: "4m 12s" },
      { label: "Global Traffic", value: "850k+ Visits" },
    ],
    technologies: ["Three.js", "GLSL Shaders", "GSAP ScrollTrigger", "Lenis", "Web Audio API", "Next.js"],
    role: "Creative Technologist & 3D Shading Director",
    accentColor: "#38BDF8",
    heroImage: "/assets/jellyfish-spatial-code.png",
    secondaryImage: "/assets/jellyfish-spatial-code.png",
    liveUrl: "https://chronos-motion.world",
    githubUrl: "https://github.com/chronos-motion/archive",
    featured: true,
  },
  {
    id: "hyperion-trade",
    number: "03",
    title: "HYPERION",
    client: "Hyperion Capital // New York",
    category: "Full-Stack",
    year: "2025",
    tagline: "Institutional decentralized liquidity protocol handling $250M+ daily volume with sub-millisecond execution.",
    description: "Engineered a low-latency financial trading portal with real-time WebGL depth charts, automated algorithmic execution bots, and zero-knowledge privacy layers.",
    fullOverview: "Hyperion handles over $250M in daily transaction volume. The interface provides institutional traders with bespoke customizable workspaces, ultra-smooth candle charts with custom indicators, and biometric security authentication.",
    challenge: "Processing over 25,000 WebSocket market tick updates per second without triggering UI re-render bottlenecks or garbage collection spikes in React.",
    solution: "Built a custom OffscreenCanvas rendering engine that bypasses the React reconciliation tree for chart updates, combined with SharedArrayBuffers and Web Workers for zero-copy binary data decoding.",
    metrics: [
      { label: "Daily Volume", value: "$250M+ USD" },
      { label: "Chart Framerate", value: "120 FPS GPU" },
      { label: "State Sync Overhead", value: "< 1.4ms" },
      { label: "Security Audit", value: "100% Passed" },
    ],
    technologies: ["React 19", "Next.js", "TypeScript", "Rust / WASM", "Tailwind CSS", "OffscreenCanvas"],
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
    title: "NOIR",
    client: "Noir Haute Couture // Paris",
    category: "Motion & Film",
    year: "2024",
    tagline: "Cinematic commercial film campaign & interactive lookbook with dynamic audio-reactive typography.",
    description: "Directed visual style, motion sequences, DaVinci Resolve color grading, and dynamic interactive lookbook for an international luxury fashion house.",
    fullOverview: "A seamless synthesis of cinematic 4K video storytelling and interactive web design. Visitors interact with synchronized audio cues, multi-angle cutaways, and seamless fluid transitions between motion chapters.",
    challenge: "Delivering seamless 4K video streaming with instant scrub capability without stuttering on variable mobile bandwidth.",
    solution: "Authored an adaptive HLS multi-bitrate streaming pipeline with custom service worker caching, preloading next scene segments based on scroll velocity prediction.",
    metrics: [
      { label: "Video Engagement", value: "94% Completion" },
      { label: "Lookbook Conversions", value: "+340% YoY" },
      { label: "Vogue Spotlight", value: "Official Feature" },
      { label: "Cinematography", value: "4K 60fps HDR" },
    ],
    technologies: ["DaVinci Resolve", "Premiere Pro", "After Effects", "HLS Video API", "GSAP", "Lenis"],
    role: "Video Director, Colorist & Creative Technologist",
    accentColor: "#F43F5E",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://noir-studio.co",
    githubUrl: "https://github.com/noir-studio/lookbook",
    featured: true,
  },
];

