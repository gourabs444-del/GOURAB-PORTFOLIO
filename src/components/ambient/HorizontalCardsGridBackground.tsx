"use client";

import React from "react";
import { 
  Code2, 
  Sparkles, 
  Cpu, 
  Layers, 
  Zap, 
  Box, 
  Globe, 
  Terminal, 
  Palette, 
  ShieldCheck, 
  Workflow, 
  Orbit,
  Flame,
  Activity,
  Compass,
  Layout,
  Sliders,
  Feather
} from "lucide-react";

interface CardItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  accent: string;
  tag: string;
}

const ROW_DATA: CardItem[][] = [
  // ROW 1 - Left sliding
  [
    { id: "r1-1", title: "WebGL Shaders", category: "Graphics Engine", icon: Sparkles, accent: "from-purple-500/20 to-pink-500/20 text-pink-400 border-pink-500/30", tag: "60 FPS" },
    { id: "r1-2", title: "React 19 Architecture", category: "Core Framework", icon: Code2, accent: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30", tag: "Concurrent" },
    { id: "r1-3", title: "Next.js 15 App Router", category: "Fullstack SSG", icon: Globe, accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30", tag: "Server Edge" },
    { id: "r1-4", title: "GSAP Timeline FX", category: "Motion Control", icon: Zap, accent: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30", tag: "Hardware Accel" },
    { id: "r1-5", title: "Three.js Viewports", category: "3D Rendering", icon: Box, accent: "from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30", tag: "Raymarching" },
    { id: "r1-6", title: "Tailwind v4 Engine", category: "Design Tokens", icon: Palette, accent: "from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30", tag: "JIT Compiler" }
  ],
  // ROW 2 - Right sliding
  [
    { id: "r2-1", title: "Spatial Audio FX", category: "Web Audio API", icon: Orbit, accent: "from-fuchsia-500/20 to-rose-500/20 text-fuchsia-400 border-fuchsia-500/30", tag: "3D Sound" },
    { id: "r2-2", title: "Custom Physics Engine", category: "Verlet Integration", icon: Cpu, accent: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30", tag: "Sub-ms" },
    { id: "r2-3", title: "Micro-Interactions", category: "UX Architecture", icon: Sliders, accent: "from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30", tag: "Haptic" },
    { id: "r2-4", title: "Zero Layout Shift", category: "Performance Audit", icon: ShieldCheck, accent: "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30", tag: "100 CWV" },
    { id: "r2-5", title: "Type-Safe Contracts", category: "TypeScript 5.5", icon: Terminal, accent: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30", tag: "Strict Mode" },
    { id: "r2-6", title: "Glassmorphism UI", category: "Visual Design", icon: Layout, accent: "from-pink-500/20 to-purple-500/20 text-pink-400 border-pink-500/30", tag: "Backdrop Blur" }
  ],
  // ROW 3 - Left sliding
  [
    { id: "r3-1", title: "GPU Particles", category: "Compute Shaders", icon: Flame, accent: "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30", tag: "100k Nodes" },
    { id: "r3-2", title: "Design Systems", category: "Component Kits", icon: Layers, accent: "from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30", tag: "Atomic" },
    { id: "r3-3", title: "Realtime Telemetry", category: "WebSockets Sync", icon: Activity, accent: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30", tag: "Live Pipeline" },
    { id: "r3-4", title: "Smooth Lenis Scroll", category: "Scroll Physics", icon: Compass, accent: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30", tag: "Lerp 0.1" },
    { id: "r3-5", title: "Minimalist Craft", category: "Editorial Typography", icon: Feather, accent: "from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30", tag: "Bodoni Type" },
    { id: "r3-6", title: "CI/CD Deployment", category: "Edge Infrastructure", icon: Workflow, accent: "from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30", tag: "Zero Downtime" }
  ],
  // ROW 4 - Right sliding
  [
    { id: "r4-1", title: "Figma Master Files", category: "UI Prototyping", icon: Layout, accent: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30", tag: "Auto-Layout" },
    { id: "r4-2", title: "Sub-second Latency", category: "Edge Serverless", icon: Zap, accent: "from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30", tag: "Global CDN" },
    { id: "r4-3", title: "Clean Codebase", category: "Refactoring & SOLID", icon: Code2, accent: "from-blue-500/20 to-sky-500/20 text-sky-400 border-sky-500/30", tag: "Maintainable" },
    { id: "r4-4", title: "Custom Shaders", category: "GLSL Fragment Work", icon: Sparkles, accent: "from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30", tag: "Post-Processing" },
    { id: "r4-5", title: "Responsive Mesh", category: "Viewport Scaling", icon: Box, accent: "from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/30", tag: "Mobile Ready" },
    { id: "r4-6", title: "Algorithmic Motion", category: "Math & Curves", icon: Orbit, accent: "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30", tag: "Bézier Easing" }
  ],
  // ROW 5 - Left sliding
  [
    { id: "r5-1", title: "Dark Luxury Mode", category: "OLED Contrast", icon: Palette, accent: "from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30", tag: "#0A0A0C" },
    { id: "r5-2", title: "Custom Cursor FX", category: "Pointer Physics", icon: Sliders, accent: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30", tag: "Magnetic" },
    { id: "r5-3", title: "High-FPS Canvas", category: "RequestAnimationFrame", icon: Cpu, accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30", tag: "No Jank" },
    { id: "r5-4", title: "Dynamic Routing", category: "Next App Router", icon: Workflow, accent: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30", tag: "Parallel Routes" },
    { id: "r5-5", title: "Responsive Grid", category: "Fluid Typography", icon: Layers, accent: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30", tag: "Clamp Math" },
    { id: "r5-6", title: "Web Vitals 100", category: "PageSpeed Engine", icon: ShieldCheck, accent: "from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30", tag: "LCP 0.6s" }
  ],
  // ROW 6 - Right sliding
  [
    { id: "r6-1", title: "Creative Engineering", category: "Fullstack Portfolio", icon: Sparkles, accent: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-400 border-fuchsia-500/30", tag: "Masterpiece" },
    { id: "r6-2", title: "Modular Components", category: "Clean Abstractions", icon: Box, accent: "from-violet-500/20 to-indigo-500/20 text-violet-400 border-violet-500/30", tag: "Reusable" },
    { id: "r6-3", title: "Smooth Transitions", category: "View Transition API", icon: Compass, accent: "from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30", tag: "Native Feel" },
    { id: "r6-4", title: "Interactive Canvas", category: "Three.js Orbit", icon: Orbit, accent: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30", tag: "Ethereal" },
    { id: "r6-5", title: "Bespoke UI Tokens", category: "Tailwind Config", icon: Layout, accent: "from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30", tag: "Tailored" },
    { id: "r6-6", title: "Scalable Core", category: "Production Tested", icon: ShieldCheck, accent: "from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30", tag: "Battle Ready" }
  ]
];

export function HorizontalCardsGridBackground() {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-around py-4 pointer-events-none select-none z-0"
      style={{
        maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.15) 75%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.15) 75%, transparent 100%)"
      }}
    >
      {ROW_DATA.map((rowCards, rowIndex) => {
        const isLeft = rowIndex % 2 === 0;
        const speedClass = isLeft ? "animate-stream-left" : "animate-stream-right";
        // Double array for seamless loop
        const doubledCards = [...rowCards, ...rowCards, ...rowCards];

        return (
          <div key={`row-${rowIndex}`} className="relative w-full overflow-hidden my-1 flex items-center opacity-30 sm:opacity-40">
            <div className={`flex gap-4 sm:gap-6 ${speedClass} py-1`}>
              {doubledCards.map((item, itemIdx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${item.id}-${itemIdx}`}
                    className="w-52 sm:w-64 md:w-72 h-14 sm:h-16 shrink-0 rounded-xl bg-neutral-900/60 backdrop-blur-md border border-white/10 p-2.5 flex items-center justify-between gap-3 shadow-lg shadow-black/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${item.accent} border flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <div className="min-w-0 flex flex-col justify-center">
                        <h4 className="text-xs sm:text-sm font-sans font-semibold text-neutral-200 truncate leading-tight">
                          {item.title}
                        </h4>
                        <span className="text-[10px] sm:text-xs font-mono text-neutral-400 truncate leading-tight">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono font-medium text-neutral-300">
                      {item.tag}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
