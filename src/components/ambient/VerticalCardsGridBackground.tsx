"use client";

import React from "react";
import { Star } from "lucide-react";

interface CardItem {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarBg: string;
  avatarImg?: string;
  rating: string;
  feedback: string;
  status: string;
  date: string;
}

interface ColorPalette {
  border: string;
  bg: string;
  badge: string;
  text: string;
  glowDot: string;
  beam: string;
}

const COLUMN_PALETTES: ColorPalette[] = [
  // Col 0: Cyber Sky
  {
    border: "border-sky-500/15 hover:border-sky-400/30",
    bg: "bg-[#04080e]",
    badge: "text-sky-300/60 bg-sky-500/10 border-sky-400/20",
    text: "text-sky-400/70",
    glowDot: "bg-sky-400/60 shadow-[0_0_4px_rgba(56,189,248,0.4)]",
    beam: "from-transparent via-sky-400/25 to-transparent"
  },
  // Col 1: Holographic Orchid
  {
    border: "border-purple-500/15 hover:border-purple-400/30",
    bg: "bg-[#08030e]",
    badge: "text-purple-300/60 bg-purple-500/10 border-purple-400/20",
    text: "text-purple-400/70",
    glowDot: "bg-purple-400/60 shadow-[0_0_4px_rgba(192,132,252,0.4)]",
    beam: "from-transparent via-purple-400/25 to-transparent"
  },
  // Col 2: Sunset Amber
  {
    border: "border-amber-500/15 hover:border-amber-400/30",
    bg: "bg-[#0c0702]",
    badge: "text-amber-300/60 bg-amber-500/10 border-amber-400/20",
    text: "text-amber-400/70",
    glowDot: "bg-amber-400/60 shadow-[0_0_4px_rgba(251,191,36,0.4)]",
    beam: "from-transparent via-amber-400/25 to-transparent"
  },
  // Col 3: Emerald Aurora
  {
    border: "border-emerald-500/15 hover:border-emerald-400/30",
    bg: "bg-[#020a06]",
    badge: "text-emerald-300/60 bg-emerald-500/10 border-emerald-400/20",
    text: "text-emerald-400/70",
    glowDot: "bg-emerald-400/60 shadow-[0_0_4px_rgba(52,211,153,0.4)]",
    beam: "from-transparent via-emerald-400/25 to-transparent"
  },
  // Col 4: Crimson Cyber
  {
    border: "border-rose-500/15 hover:border-rose-400/30",
    bg: "bg-[#0c0207]",
    badge: "text-rose-300/60 bg-rose-500/10 border-rose-400/20",
    text: "text-rose-400/70",
    glowDot: "bg-rose-400/60 shadow-[0_0_4px_rgba(251,113,133,0.4)]",
    beam: "from-transparent via-rose-400/25 to-transparent"
  },
  // Col 5: Sapphire Matrix
  {
    border: "border-indigo-500/15 hover:border-indigo-400/30",
    bg: "bg-[#030610]",
    badge: "text-indigo-300/60 bg-indigo-500/10 border-indigo-400/20",
    text: "text-indigo-400/70",
    glowDot: "bg-indigo-400/60 shadow-[0_0_4px_rgba(129,140,248,0.4)]",
    beam: "from-transparent via-indigo-400/25 to-transparent"
  }
];

const COLUMN_DATA: CardItem[][] = [
  // COLUMN 1 - Vertical UP
  [
    { id: "c1-1", name: "Aarav Sharma", role: "VP of Product", company: "RazorPay", initials: "AS", avatarBg: "from-sky-500 to-blue-600", avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rating: "4.9", status: "Excellent", date: "14 Feb 2026", feedback: "Delivered our WebGL platform 2 weeks ahead of deadline. Absolute masterclass in speed and quality." },
    { id: "c1-2", name: "Sarah Chen", role: "CTO @ Velo", company: "Fintech", initials: "SC", avatarBg: "from-purple-500 to-pink-600", rating: "4.8", status: "Great", date: "28 Jan 2026", feedback: "Transformed our UX — boosted enterprise conversions by +180% in month one. Highly recommended!" },
    { id: "c1-3", name: "Rohan Mehta", role: "Head of Eng", company: "Zepto Labs", initials: "RM", avatarBg: "from-emerald-500 to-teal-600", avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", rating: "5.0", status: "Exceptional", date: "05 Mar 2026", feedback: "Sub-millisecond API architecture that effortlessly scaled to over 2M active daily users." },
    { id: "c1-4", name: "Elena Rostova", role: "Design Lead", company: "Aether AI", initials: "ER", avatarBg: "from-amber-500 to-orange-600", rating: "4.7", status: "Good", date: "10 Nov 2025", feedback: "The level of motion engineering, visual polish, and clean code architecture is unmatched." }
  ],
  // COLUMN 2 - Vertical DOWN
  [
    { id: "c2-1", name: "Priya Patel", role: "Founder & CEO", company: "DevCloud", initials: "PP", avatarBg: "from-rose-500 to-pink-600", avatarImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80", rating: "4.9", status: "Outstanding", date: "22 Jan 2026", feedback: "Executed complex 3D raymarching shaders seamlessly. Our flagship web product was redefined." },
    { id: "c2-2", name: "Marcus Vance", role: "Product Lead", company: "StripeX", initials: "MV", avatarBg: "from-indigo-500 to-purple-600", rating: "4.8", status: "Great", date: "18 Dec 2025", feedback: "Reduced cloud infrastructure latency by 45%. Outstanding fullstack engineering expertise." },
    { id: "c2-3", name: "Ananya Sen", role: "VP Design", company: "Swiggy Tech", initials: "AS", avatarBg: "from-cyan-500 to-blue-600", avatarImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", rating: "5.0", status: "Exceptional", date: "09 Mar 2026", feedback: "Built our flagship investor deck & interactive platform with silky 60fps fluidity." },
    { id: "c2-4", name: "David Miller", role: "Tech Director", company: "Nexus Labs", initials: "DM", avatarBg: "from-violet-500 to-purple-700", avatarImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", rating: "4.6", status: "Good", date: "15 Oct 2025", feedback: "Brought our wildest 3D interactions to life with mathematical precision and elegance." }
  ],
  // COLUMN 3 - Vertical UP
  [
    { id: "c3-1", name: "Vikram Malhotra", role: "Co-Founder", company: "AI Infra", initials: "VM", avatarBg: "from-emerald-400 to-green-600", rating: "4.9", status: "Excellent", date: "04 Feb 2026", feedback: "Autonomous LLM orchestration pipeline built with unbelievable speed, rigor, and stability." },
    { id: "c3-2", name: "Claire Dubois", role: "CMO", company: "Luxe Media", initials: "CD", avatarBg: "from-fuchsia-500 to-pink-600", avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rating: "4.8", status: "Great", date: "30 Jan 2026", feedback: "Crafted an editorial digital experience that won Site of the Year. Exceptional creativity." },
    { id: "c3-3", name: "Aditi Rao", role: "Principal Arch", company: "Flipkart Tech", initials: "AR", avatarBg: "from-amber-400 to-yellow-600", rating: "5.0", status: "Exceptional", date: "25 Feb 2026", feedback: "Zero downtime deployment. Codebase architecture is pristine, modular, and future-proof." },
    { id: "c3-4", name: "Julian Thorne", role: "Product Lead", company: "HealthPulse", initials: "JT", avatarBg: "from-sky-400 to-indigo-600", avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", rating: "4.7", status: "Good", date: "12 Nov 2025", feedback: "Intuitive micro-interactions and zero layout shift. Our active users love the new UI." }
  ],
  // COLUMN 4 - Vertical DOWN
  [
    { id: "c4-1", name: "Kabir Verma", role: "Tech Lead", company: "Polymer Studio", initials: "KV", avatarBg: "from-rose-400 to-red-600", avatarImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80", rating: "4.9", status: "Outstanding", date: "08 Jan 2026", feedback: "100k point cloud GPU particle simulation rendered buttery smooth at 60 FPS." },
    { id: "c4-2", name: "Zoe Kravitz", role: "Head of Product", company: "Vogue Digital", initials: "ZK", avatarBg: "from-purple-400 to-indigo-600", rating: "4.8", status: "Great", date: "19 Dec 2025", feedback: "Redefined our video streaming workflow. Unparalleled attention to micro UX details." },
    { id: "c4-3", name: "Neha Gupta", role: "Partner", company: "Sequoia Growth", initials: "NG", avatarBg: "from-teal-400 to-emerald-600", avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", rating: "5.0", status: "Exceptional", date: "02 Mar 2026", feedback: "Extremely reliable partner. Shipped complex fullstack features well before deadline." },
    { id: "c4-4", name: "Ethan Sterling", role: "Creative Tech", company: "Spatial Web", initials: "ES", avatarBg: "from-blue-400 to-indigo-600", rating: "4.7", status: "Good", date: "17 Feb 2026", feedback: "Flawless Three.js canvas integration with kinetic GSAP physics scroll mechanics." }
  ],
  // COLUMN 5 - Vertical UP
  [
    { id: "c5-1", name: "Siddharth Nair", role: "Design Lead", company: "Cred Mobile", initials: "SN", avatarBg: "from-amber-500 to-red-600", rating: "4.9", status: "Excellent", date: "11 Jan 2026", feedback: "Unified our multi-brand design tokens into a seamless, reusable component design system." },
    { id: "c5-2", name: "Naomi Watts", role: "VP Product", company: "Mobile Apps", initials: "NW", avatarBg: "from-pink-500 to-rose-600", avatarImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", rating: "4.8", status: "Great", date: "26 Nov 2025", feedback: "Cross-platform mobile React Native app feels 100% native, ultra-responsive and fluid." },
    { id: "c5-3", name: "Devansh Roy", role: "Eng Director", company: "Freshworks", initials: "DR", avatarBg: "from-sky-500 to-cyan-600", avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rating: "5.0", status: "Exceptional", date: "03 Mar 2026", feedback: "Edge serverless bundling cut load times from 3.2s to sub-300ms globally." },
    { id: "c5-4", name: "Freya Lindqvist", role: "Art Director", company: "Nordic Digital", initials: "FL", avatarBg: "from-indigo-500 to-blue-700", rating: "4.6", status: "Good", date: "15 Feb 2026", feedback: "Typography, grid system layout, and color grading were executed flawlessly." }
  ],
  // COLUMN 6 - Vertical DOWN
  [
    { id: "c6-1", name: "Benjamin Hayes", role: "Director", company: "Apex Capital", initials: "BH", avatarBg: "from-purple-500 to-indigo-600", avatarImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", rating: "5.0", status: "Exceptional", date: "28 Feb 2026", feedback: "One of the sharpest fullstack creative engineers we've ever collaborated with." },
    { id: "c6-2", name: "Pooja Banerjee", role: "VP Cyber", company: "Paytm Security", initials: "PB", avatarBg: "from-emerald-500 to-teal-700", rating: "4.9", status: "Outstanding", date: "21 Jan 2026", feedback: "Secured our cloud infrastructure while creating a gorgeous customer admin portal." },
    { id: "c6-3", name: "Sebastian Bach", role: "Core Dev", company: "Open Source Lab", initials: "SB", avatarBg: "from-orange-500 to-amber-600", avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", rating: "4.8", status: "Great", date: "04 Dec 2025", feedback: "Pristine TypeScript codebase, comprehensive documentation, zero technical debt." },
    { id: "c6-4", name: "Ishita Mukherji", role: "Founder", company: "SaaS Rocket", initials: "IM", avatarBg: "from-rose-500 to-purple-600", rating: "4.9", status: "Excellent", date: "10 Jan 2026", feedback: "Transformed our rough prototype into a market-ready product that raised $5M series A." }
  ]
];

export function VerticalCardsGridBackground() {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.85) 22%, black 30%, black 70%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.15) 92%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 3%, black 8%, black 92%, rgba(0,0,0,0.4) 97%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.85) 22%, black 30%, black 70%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.15) 92%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 3%, black 8%, black 92%, rgba(0,0,0,0.4) 97%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        filter: "grayscale(70%) brightness(0.4) contrast(0.85)"
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5 w-full h-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6">
        {COLUMN_DATA.map((colCards, colIdx) => {
          const speedClass = `animate-vertical-col-${colIdx % 6}`;
          const palette = COLUMN_PALETTES[colIdx % COLUMN_PALETTES.length];
          // Triple array for continuous seamless looping
          const doubledCards = [...colCards, ...colCards, ...colCards];

          return (
            <div 
              key={`col-${colIdx}`} 
              className={`vertical-card-col vertical-card-col-${colIdx} relative h-full opacity-12 sm:opacity-20 transition-opacity duration-500`}
            >
              <div className={`vertical-card-track flex flex-col gap-4 sm:gap-5 md:gap-6 ${speedClass} py-2`}>
                {doubledCards.map((item, itemIdx) => {
                  return (
                    <div
                      key={`${item.id}-${itemIdx}`}
                      className={`vertical-card-item relative w-full h-44 sm:h-52 md:h-56 shrink-0 rounded-2xl ${palette.bg} border ${palette.border} p-3 sm:p-4 flex flex-col justify-between shadow-md shadow-black transition-all duration-300 overflow-hidden`}
                    >
                      {/* Top Laser Accent Beam */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${palette.beam} opacity-40`} />

                      {/* Card Header: Left PFP (Image or Initials) + Info, Right Star Rating */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {item.avatarImg ? (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-white/20">
                              <img src={item.avatarImg} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${item.avatarBg} text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0 shadow-sm border border-white/20`}>
                              {item.initials}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <h4 className="text-[11px] sm:text-xs font-sans font-bold text-white/90 leading-tight truncate">
                              {item.name}
                            </h4>
                            <p className="text-[8.5px] sm:text-[9px] font-mono text-neutral-400/80 leading-snug pt-0.5 truncate">
                              {item.role}
                            </p>
                          </div>
                        </div>

                        {/* Top Right Organic Star Rating Badge */}
                        <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-full shrink-0">
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-amber-300">
                            {item.rating}
                          </span>
                        </div>
                      </div>

                      {/* Card Body: Feedback Quote */}
                      <div className="relative z-10 my-1">
                        <p className="text-[10px] sm:text-[11px] text-neutral-300/80 font-normal leading-snug line-clamp-3 italic">
                          &ldquo;{item.feedback}&rdquo;
                        </p>
                      </div>

                      {/* Card Footer: Rating Status Badge + Date Display */}
                      <div className="relative z-10 w-full pt-1.5 border-t border-white/5 flex items-center justify-between">
                        <span className={`px-1.5 py-0.5 rounded border text-[8px] sm:text-[8.5px] font-mono font-semibold uppercase tracking-wider ${palette.badge}`}>
                          {item.status}
                        </span>
                        <div className="flex items-center gap-1 text-[8px] sm:text-[8.5px] font-mono text-neutral-400/80 font-medium">
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
