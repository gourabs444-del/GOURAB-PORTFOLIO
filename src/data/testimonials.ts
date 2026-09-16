export interface ColorTheme {
  accent: string;
  cardBg: string;
  borderColor: string;
  hoverBorder: string;
  badgeBg: string;
  avatarBg: string;
  avatarText: string;
  glowColor: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  impactTag: string;
  date: string;
  theme: ColorTheme;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Alexander Vance",
    role: "VP of Engineering",
    company: "Aether Systems",
    avatar: "AV",
    rating: 5,
    quote: "Pure digital cinema. Rock-solid 60 FPS WebGL physics under massive production load with zero frame drops. Absolute engineering mastery.",
    impactTag: "99.9% Uptime // 60 FPS",
    date: "Feb 2026",
    theme: {
      accent: "#38BDF8", // Cyan
      cardBg: "bg-gradient-to-b from-[#0a1526]/90 via-[#07111e]/90 to-[#050912]/95",
      borderColor: "border-sky-500/20",
      hoverBorder: "group-hover/card:border-sky-400/60",
      badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/25",
      avatarBg: "bg-gradient-to-tr from-sky-600 to-cyan-400",
      avatarText: "text-white",
      glowColor: "rgba(56, 189, 248, 0.16)",
    },
  },
  {
    id: "t2",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "Nexus Interactive",
    avatar: "ER",
    rating: 5,
    quote: "Cut our frontend latency by 72% while transforming our entire brand presence into an international award-winning showcase.",
    impactTag: "+340% Conversions",
    date: "Jan 2026",
    theme: {
      accent: "#F59E0B", // Warm Amber / Gold
      cardBg: "bg-gradient-to-b from-[#1c1409]/90 via-[#150f06]/90 to-[#0c0803]/95",
      borderColor: "border-amber-500/20",
      hoverBorder: "group-hover/card:border-amber-400/60",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/25",
      avatarBg: "bg-gradient-to-tr from-amber-600 to-yellow-400",
      avatarText: "text-amber-950 font-bold",
      glowColor: "rgba(245, 158, 11, 0.16)",
    },
  },
  {
    id: "t3",
    author: "Marcus Sterling",
    role: "Managing Partner",
    company: "Vanguard Studio Ventures",
    avatar: "MS",
    rating: 5,
    quote: "Every shader, transition, and layout is mathematically calibrated. 300,000+ unique sessions with 99+ Lighthouse scores.",
    impactTag: "Awwwards SOTD",
    date: "Dec 2025",
    theme: {
      accent: "#EC4899", // Vivid Rose / Pink
      cardBg: "bg-gradient-to-b from-[#1c0a15]/90 via-[#14060e]/90 to-[#0c0308]/95",
      borderColor: "border-pink-500/20",
      hoverBorder: "group-hover/card:border-pink-400/60",
      badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/25",
      avatarBg: "bg-gradient-to-tr from-pink-600 to-rose-400",
      avatarText: "text-white",
      glowColor: "rgba(236, 72, 153, 0.16)",
    },
  },
  {
    id: "t4",
    author: "Sophia Laurent",
    role: "Chief Technology Officer",
    company: "Hyperion Labs",
    avatar: "SL",
    rating: 5,
    quote: "From complex AI agent pipelines to custom Three.js canvasses, delivered our flagship product ahead of schedule with zero regressions.",
    impactTag: "$14M Series A",
    date: "Nov 2025",
    theme: {
      accent: "#10B981", // Emerald
      cardBg: "bg-gradient-to-b from-[#081a14]/90 via-[#05130e]/90 to-[#030a07]/95",
      borderColor: "border-emerald-500/20",
      hoverBorder: "group-hover/card:border-emerald-400/60",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
      avatarBg: "bg-gradient-to-tr from-emerald-600 to-teal-400",
      avatarText: "text-white",
      glowColor: "rgba(16, 185, 129, 0.16)",
    },
  },
  {
    id: "t5",
    author: "Julian Thorne",
    role: "Creative Director",
    company: "Apex Spatial Group",
    avatar: "JT",
    rating: 5,
    quote: "Bridges computational precision with refined luxury editorial aesthetics. The kind of frontend engineering that makes people stop and stare.",
    impactTag: "FWA of the Month",
    date: "Oct 2025",
    theme: {
      accent: "#8B5CF6", // Electric Purple
      cardBg: "bg-gradient-to-b from-[#150a26]/90 via-[#0f071c]/90 to-[#080310]/95",
      borderColor: "border-purple-500/20",
      hoverBorder: "group-hover/card:border-purple-400/60",
      badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/25",
      avatarBg: "bg-gradient-to-tr from-purple-600 to-indigo-400",
      avatarText: "text-white",
      glowColor: "rgba(139, 92, 246, 0.16)",
    },
  },
  {
    id: "t6",
    author: "Chloe Dubois",
    role: "Co-Founder & CEO",
    company: "Synapse Digital",
    avatar: "CD",
    rating: 5,
    quote: "Butter-smooth Lenis scroll physics, bespoke sound engineering, and flawless responsive layouts. Elevated our startup into a market leader.",
    impactTag: "2.8M Active Users",
    date: "Sep 2025",
    theme: {
      accent: "#06B6D4", // Ocean Teal / Cyan
      cardBg: "bg-gradient-to-b from-[#061820]/90 via-[#041117]/90 to-[#020a0d]/95",
      borderColor: "border-cyan-500/20",
      hoverBorder: "group-hover/card:border-cyan-400/60",
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
      avatarBg: "bg-gradient-to-tr from-cyan-600 to-sky-400",
      avatarText: "text-white",
      glowColor: "rgba(6, 182, 212, 0.16)",
    },
  },
  {
    id: "t7",
    author: "David Kelling",
    role: "Head of Design Systems",
    company: "Orbital Cloud",
    avatar: "DK",
    rating: 5,
    quote: "Our design-to-code velocity doubled. Token architecture, dynamic micro-interactions, and accessible UI patterns built to absolute perfection.",
    impactTag: "100/100 Accessibility",
    date: "Aug 2025",
    theme: {
      accent: "#6366F1", // Indigo
      cardBg: "bg-gradient-to-b from-[#0d1028]/90 via-[#090b1e]/90 to-[#050612]/95",
      borderColor: "border-indigo-500/20",
      hoverBorder: "group-hover/card:border-indigo-400/60",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
      avatarBg: "bg-gradient-to-tr from-indigo-600 to-blue-400",
      avatarText: "text-white",
      glowColor: "rgba(99, 102, 241, 0.16)",
    },
  },
  {
    id: "t8",
    author: "Amira Naser",
    role: "Founder & Lead Architect",
    company: "Solaria Protocol",
    avatar: "AN",
    rating: 5,
    quote: "Unbelievable attention to typographic hierarchy and micro-details. Delivered our entire multi-chain dashboard in record time with zero hitches.",
    impactTag: "$450M TVL Locked",
    date: "Jul 2025",
    theme: {
      accent: "#14B8A6", // Teal Jade
      cardBg: "bg-gradient-to-b from-[#061c1a]/90 via-[#041412]/90 to-[#020b0a]/95",
      borderColor: "border-teal-500/20",
      hoverBorder: "group-hover/card:border-teal-400/60",
      badgeBg: "bg-teal-500/10 text-teal-300 border-teal-500/25",
      avatarBg: "bg-gradient-to-tr from-teal-600 to-emerald-400",
      avatarText: "text-white",
      glowColor: "rgba(20, 184, 166, 0.16)",
    },
  },
  {
    id: "t9",
    author: "Liam O'Connor",
    role: "Executive Producer",
    company: "Kinetics Media",
    avatar: "LO",
    rating: 5,
    quote: "Rarely do you find an engineer who understands cinematic rhythm, sound design, and code performance at this elite level. Irreplaceable talent.",
    impactTag: "Top 1% Global Rank",
    date: "Jun 2025",
    theme: {
      accent: "#FB923C", // Tangerine / Coral
      cardBg: "bg-gradient-to-b from-[#1f1008]/90 via-[#170a04]/90 to-[#0c0502]/95",
      borderColor: "border-orange-500/20",
      hoverBorder: "group-hover/card:border-orange-400/60",
      badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/25",
      avatarBg: "bg-gradient-to-tr from-orange-600 to-amber-400",
      avatarText: "text-white",
      glowColor: "rgba(251, 146, 60, 0.16)",
    },
  },
];
