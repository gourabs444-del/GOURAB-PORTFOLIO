export interface Testimonial {
  id: string;
  quote: string;
  headline: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  highlightColor?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    headline: "Exceptional technical rigor paired with world-class design taste.",
    quote: "Gourab architected our real-time interactive platform from concept to production. The performance is rock-solid at 60 FPS under massive load, and the attention to micro-interactions and motion physics is unmatched.",
    author: "Alexander Vance",
    role: "VP of Engineering",
    company: "Aether Systems",
    avatar: "AV",
    rating: 5,
    highlightColor: "#38BDF8",
  },
  {
    id: "test-2",
    headline: "Cut our frontend latency by 70% while elevating our brand identity.",
    quote: "Working with Gourab provided the rare advantage of a senior systems architect and an award-winning creative director in one person. He transformed our digital experience into an industry benchmark.",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "Nexus Interactive",
    avatar: "ER",
    rating: 5,
    highlightColor: "#E5A93C",
  },
  {
    id: "test-3",
    headline: "Flawless WebGL execution that captivated investors and clients.",
    quote: "Every shader, transition, and layout is mathematically calibrated. Our product launch drove over 250,000 unique sessions in 48 hours with 99+ Lighthouse scores across all devices.",
    author: "Marcus Sterling",
    role: "Managing Partner",
    company: "Vanguard Studio Ventures",
    avatar: "MS",
    rating: 5,
    highlightColor: "#F43F5E",
  },
  {
    id: "test-4",
    headline: "Unrivaled velocity and end-to-end fullstack mastery.",
    quote: "From complex AI agent pipelines to custom Three.js canvasses, Gourab delivered our flagship release ahead of schedule with zero production regressions. Simply the best developer I have collaborated with.",
    author: "Sophia Laurent",
    role: "Chief Technology Officer",
    company: "Hyperion Labs",
    avatar: "SL",
    rating: 5,
    highlightColor: "#10B981",
  },
  {
    id: "test-5",
    headline: "A masterclass in modern digital craftsmanship.",
    quote: "His ability to bridge complex computational logic with refined editorial aesthetics allowed us to stand out in a crowded market. The feedback from our enterprise partners has been overwhelmingly positive.",
    author: "Julian Thorne",
    role: "Director of Digital",
    company: "Apex Spatial Group",
    avatar: "JT",
    rating: 5,
    highlightColor: "#A855F7",
  },
  {
    id: "test-6",
    headline: "Transformed our digital presence into a luxury standard.",
    quote: "The visual storytelling, smooth Lenis physics, and bespoke backend integrations elevated our brand from standard tech startup to undisputed category leader.",
    author: "Chloe Dubois",
    role: "Co-Founder & CEO",
    company: "Synapse Digital",
    avatar: "CD",
    rating: 5,
    highlightColor: "#38BDF8",
  },
];

