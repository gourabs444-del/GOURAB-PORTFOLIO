"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Code2, Palette, Film, Sparkles } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const devRef = useRef<HTMLDivElement | null>(null);
  const designRef = useRef<HTMLDivElement | null>(null);
  const creativeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".skill-reveal"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
            },
          }
        );
      }

      // Development Bars Stagger
      if (devRef.current) {
        const bars = devRef.current.querySelectorAll(".dev-skill-bar");
        const fills = devRef.current.querySelectorAll(".dev-bar-fill");
        
        gsap.fromTo(
          bars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: devRef.current,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          fills,
          { width: "0%" },
          {
            width: (i, target) => target.getAttribute("data-level") || "80%",
            duration: 1.2,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: devRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Design Cards Stagger
      if (designRef.current) {
        gsap.fromTo(
          designRef.current.querySelectorAll(".design-card-item"),
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: designRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Creative App Badges Stagger
      if (creativeRef.current) {
        gsap.fromTo(
          creativeRef.current.querySelectorAll(".creative-app-item"),
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: creativeRef.current,
              start: "top 88%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 1. Development Skills (with iOS style level bars as sketched)
  const devSkills = [
    { name: "React", level: "96%", color: "from-cyan-400 to-sky-400" },
    { name: "TypeScript", level: "92%", color: "from-blue-400 to-indigo-400" },
    { name: "JavaScript", level: "98%", color: "from-amber-300 to-amber-500" },
    { name: "Next.js", level: "94%", color: "from-white to-neutral-300" },
    { name: "WebGL / Three.js", level: "88%", color: "from-emerald-400 to-teal-400" },
    { name: "Tailwind CSS", level: "98%", color: "from-sky-300 to-cyan-400" },
  ];

  // 2. Design Skills (3 Column clean grouping as sketched)
  const designGroups = [
    {
      title: "UI / UX & GSAP",
      badge: "INTERACTION",
      items: ["UI/UX Architecture", "GSAP Physics & Motion", "Human-Centered Systems"],
      color: "border-purple-500/20 bg-purple-500/5 text-purple-300",
    },
    {
      title: "Figma & Visual",
      badge: "INTERFACE",
      items: ["Figma Design Systems", "Visual Art Direction", "Typography & Layouts"],
      color: "border-amber-500/20 bg-amber-500/5 text-amber-300",
    },
    {
      title: "Motion & Prototyping",
      badge: "PROTOTYPING",
      items: ["Micro-Interactions", "Kinetic Prototyping", "Spatial 3D Layouts"],
      color: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300",
    },
  ];

  // 3. Creative Apps (4 App Badges: Pr, Lr, Ae, DaVinci Resolve as sketched)
  const creativeApps = [
    {
      symbol: "Pr.",
      fullName: "Premiere Pro",
      role: "Video Editing",
      border: "border-[#9999ff]/30",
      bg: "bg-[#00005b]/30",
      textColor: "text-[#9999ff]",
      glow: "shadow-[0_0_20px_rgba(153,153,255,0.15)]",
    },
    {
      symbol: "Lr.",
      fullName: "Lightroom",
      role: "Color Grading",
      border: "border-[#31a8ff]/30",
      bg: "bg-[#001e36]/30",
      textColor: "text-[#31a8ff]",
      glow: "shadow-[0_0_20px_rgba(49,168,255,0.15)]",
    },
    {
      symbol: "Ae.",
      fullName: "After Effects",
      role: "Motion & VFX",
      border: "border-[#d291ff]/30",
      bg: "bg-[#2d004d]/30",
      textColor: "text-[#d291ff]",
      glow: "shadow-[0_0_20px_rgba(210,145,255,0.15)]",
    },
    {
      isResolve: true,
      symbol: "Resolve",
      fullName: "DaVinci Resolve",
      role: "Color Science",
      border: "border-rose-500/30",
      bg: "bg-[#180a12]/50",
      textColor: "text-white",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#050508] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.06)_0%,_rgba(56,189,248,0.04)_40%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 sm:gap-20 relative z-10">
        {/* ========================================================= */}
        {/* HEADER: SKILLS TITLE & SUBTITLE                           */}
        {/* ========================================================= */}
        <div ref={headerRef} className="flex flex-col gap-4 text-left sm:text-center items-start sm:items-center">
          <div className="skill-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>04 // CORE COMPETENCIES</span>
          </div>

          <h2 className="skill-reveal font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            SKILLS
          </h2>

          <p className="skill-reveal font-sans text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed font-normal">
            Specialized competencies spanning high-performance fullstack engineering, human-centered UI/UX systems, and cinematic post-production toolkits.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. DEVELOPMENT SECTION (iOS Style Level Bars)              */}
        {/* ========================================================= */}
        <div ref={devRef} className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#0a0b12]/80 border border-white/[0.08] backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight">
                Development
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Full-Stack Architecture &bull; WebGL &bull; Distributed Systems
              </span>
            </div>
          </div>

          {/* 2-Column Grid of iOS Style Level Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {devSkills.map((s) => (
              <div
                key={s.name}
                className="dev-skill-bar flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <span className="font-sans font-semibold text-sm sm:text-base text-neutral-200">
                  {s.name}
                </span>

                {/* iOS Style Capsule Level Bar */}
                <div className="flex items-center gap-3">
                  <div className="relative w-28 sm:w-36 md:w-44 h-3 sm:h-3.5 bg-white/[0.08] rounded-full border border-white/10 p-0.5 overflow-hidden shadow-inner">
                    <div
                      data-level={s.level}
                      className={`dev-bar-fill h-full rounded-full bg-gradient-to-r ${s.color} shadow-[0_0_10px_rgba(56,189,248,0.4)]`}
                      style={{ width: s.level }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-400 w-8 text-right">
                    {s.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DESIGN SECTION (3 Columns as Sketched)                 */}
        {/* ========================================================= */}
        <div ref={designRef} className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#0a0b12]/80 border border-white/[0.08] backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Palette className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight uppercase">
                DESIGN
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Product Design &bull; Motion Physics &bull; Systems
              </span>
            </div>
          </div>

          {/* 3 Column Design Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            {designGroups.map((g) => (
              <div
                key={g.title}
                className="design-card-item flex flex-col justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border uppercase ${g.color}`}>
                      {g.badge}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
                  </div>

                  <h4 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight">
                    {g.title}
                  </h4>

                  <ul className="flex flex-col gap-2 pt-1">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 font-normal">
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. CREATIVE SUITE (Pr, Lr, Ae, DaVinci Resolve App Badges) */}
        {/* ========================================================= */}
        <div ref={creativeRef} className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#0a0b12]/80 border border-white/[0.08] backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight">
                Creative
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Post-Production &bull; Color Grading &bull; Motion Graphics
              </span>
            </div>
          </div>

          {/* 4 App Icon Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {creativeApps.map((app) => (
              <div
                key={app.fullName}
                className="creative-app-item flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
              >
                {/* App Icon Square */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${app.bg} border ${app.border} ${app.glow} flex items-center justify-center shadow-lg transition-transform duration-300`}
                >
                  {app.isResolve ? (
                    /* DaVinci Resolve 3-Petal Color Aperture Vector Logo */
                    <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9">
                      <circle cx="50" cy="50" r="46" fill="#10111a" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
                      {/* Top Red Petal */}
                      <path d="M50 14 C62 30, 70 42, 50 50 C30 42, 38 30, 50 14 Z" fill="#ff3b30" />
                      {/* Bottom Right Blue Petal */}
                      <path d="M82 70 C66 66, 56 58, 50 50 C60 42, 76 50, 82 70 Z" fill="#007aff" />
                      {/* Bottom Left Yellow Petal */}
                      <path d="M18 70 C24 50, 40 42, 50 50 C44 58, 34 66, 18 70 Z" fill="#ffcc00" />
                    </svg>
                  ) : (
                    <span className={`font-display font-black text-xl sm:text-2xl ${app.textColor} tracking-tighter`}>
                      {app.symbol}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm sm:text-base text-white">
                    {app.fullName}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    {app.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
