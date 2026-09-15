export interface Testimonial {
  id: string;
  project: string;
  year: string;
  author: string;
  handle: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  likes: string;
  highlightColor?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    project: "Aether OS",
    year: "2025",
    author: "Alexander Vance",
    handle: "@avance",
    role: "VP of Engineering",
    company: "Aether Systems",
    avatar: "AV",
    rating: 5,
    quote: "Pure digital cinema. Rock-solid 60 FPS physics under massive load, zero frame drops, and meticulous motion craft. An instant classic.",
    likes: "1,420",
    highlightColor: "#38BDF8",
  },
  {
    id: "test-2",
    project: "Nexus Canvas",
    year: "2025",
    author: "Elena Rostova",
    handle: "@erostova",
    role: "Head of Product",
    company: "Nexus Interactive",
    avatar: "ER",
    rating: 5,
    quote: "Cut our frontend latency by 70% while turning our digital experience into an industry benchmark. Senior systems architect meets creative director in one person.",
    likes: "894",
    highlightColor: "#E5A93C",
  },
  {
    id: "test-3",
    project: "Vanguard 3D",
    year: "2025",
    author: "Marcus Sterling",
    handle: "@msterling",
    role: "Managing Partner",
    company: "Vanguard Studio Ventures",
    avatar: "MS",
    rating: 5,
    quote: "Every shader, transition, and layout is mathematically calibrated. 250,000+ unique sessions with 99+ Lighthouse scores. Transcendent execution.",
    likes: "2,105",
    highlightColor: "#F43F5E",
  },
  {
    id: "test-4",
    project: "Hyperion Engine",
    year: "2025",
    author: "Sophia Laurent",
    handle: "@slaurent",
    role: "Chief Technology Officer",
    company: "Hyperion Labs",
    avatar: "SL",
    rating: 5,
    quote: "From complex AI agent pipelines to custom Three.js canvasses, delivered our flagship release ahead of schedule with zero regressions. Five stars, no notes.",
    likes: "1,830",
    highlightColor: "#10B981",
  },
  {
    id: "test-5",
    project: "Apex Spatial",
    year: "2025",
    author: "Julian Thorne",
    handle: "@jthorne",
    role: "Director of Digital",
    company: "Apex Spatial Group",
    avatar: "JT",
    rating: 5,
    quote: "Bridges complex computational logic with refined editorial aesthetics. The kind of frontend engineering that makes people stop and stare. Masterpiece craft.",
    likes: "940",
    highlightColor: "#A855F7",
  },
  {
    id: "test-6",
    project: "Synapse Pro",
    year: "2025",
    author: "Chloe Dubois",
    handle: "@cdubois",
    role: "Co-Founder & CEO",
    company: "Synapse Digital",
    avatar: "CD",
    rating: 5,
    quote: "Visual storytelling, butter-smooth Lenis physics, and bespoke backend integrations. Elevated our brand into an undisputed luxury standard.",
    likes: "1,260",
    highlightColor: "#38BDF8",
  },
];
