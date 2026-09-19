export interface SiteConfig {
  name: string;
  moniker: string;
  title: string;
  roles: string[];
  tagline: string;
  location: {
    city: string;
    country: string;
    coordinates: string;
    timezone: string;
  };
  availability: {
    status: "available" | "limited" | "booked";
    label: string;
    quarter: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
  socials: {
    name: string;
    url: string;
    handle: string;
  }[];
  manifesto: {
    headline: string;
    subheadline: string;
    paragraphs: string[];
    metrics: {
      value: string;
      label: string;
      detail: string;
    }[];
  };
}

export const siteConfig: SiteConfig = {
  name: "Gourab",
  moniker: "GXR",
  title: "Creative Developer & Digital Architect",
  roles: [
    "Full-Stack Architect",
    "Creative Technologist",
    "Motion & Video Director",
    "AI Systems Engineer"
  ],
  tagline: "Crafting bespoke digital artifacts at the intersection of cinematic art, ultra-performant engineering, and intelligent systems.",
  location: {
    city: "San Francisco / Remote",
    country: "Global",
    coordinates: "37.7749° N, 122.4194° W",
    timezone: "UTC",
  },
  availability: {
    status: "available",
    label: "Available for Select Commissions & Architecture",
    quarter: "Q3 / Q4 2026",
  },
  contact: {
    email: "gourabs444@gmail.com",
  },
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/gourab-maji-4964a4397/", handle: "in/gourab-maji-4964a4397" },
    { name: "GitHub", url: "https://github.com/gourabs444-del", handle: "@gourabs444-del" },
    { name: "Instagram", url: "https://www.instagram.com/01env/", handle: "@01env" },
    { name: "Email", url: "mailto:gourabs444@gmail.com", handle: "gourabs444@gmail.com" }
  ],
  manifesto: {
    headline: "BRIDGING COMPUTATION, CINEMA & INTENTIONAL DESIGN.",
    subheadline: "I don't just build websites. I construct immersive digital landscapes where every micro-interaction, frame, and render serves a precise narrative.",
    paragraphs: [
      "In an era of disposable templates and derivative interfaces, I design with uncompromising rigor. Every animation is mathematically tuned to feel organic. Every system architecture is built to withstand massive scale.",
      "From reactive distributed backends and high-performance WebGL viewports to cinematic visual storytelling and generative AI pipelines, my craft lives at the convergence of deep technical mastery and radical aesthetic discipline."
    ],
    metrics: [
      { value: "08+", label: "Years of Craft", detail: "Spanning full-stack web, motion graphics & software architecture" },
      { value: "40+", label: "Production Deployments", detail: "High-throughput platforms, 3D web experiences & SaaS products" },
      { value: "99.9%", label: "Uptime & Performance", detail: "Sub-second LCP and 60fps GPU-accelerated motion execution" },
      { value: "100%", label: "Bespoke Art Direction", detail: "Zero generic templates, custom typography & spatial layout" },
    ]
  }
};
