"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { MapPin, ArrowUpRight, Sparkles, Zap, Award, Layers } from "lucide-react";

// Distinct color theory palette per era (Bleeding-edge Cyan -> Deep Indigo -> Hyper Magenta -> Neon Emerald)
const eraColorThemes = [
  {
    id: "lead-creative-architect",
    accent: "#38BDF8",
    accentText: "text-sky-400",
    accentBg: "bg-sky-400",
    borderActive: "border-sky-400/60",
    glowColor: "rgba(56, 189, 248, 0.12)",
    pillBg: "bg-sky-500/10 border-sky-400/30 text-sky-200",
    tag: "AI WORKSPACES & WEBGL",
    stat1: { value: "50,000+", label: "Active 3D Nodes" },
    stat2: { value: "60 FPS", label: "Steady Shader Pacing" },
  },
  {
    id: "senior-fullstack-engineer",
    accent: "#818CF8",
    accentText: "text-indigo-400",
    accentBg: "bg-indigo-400",
    borderActive: "border-indigo-400/60",
    glowColor: "rgba(129, 140, 248, 0.12)",
    pillBg: "bg-indigo-500/10 border-indigo-400/30 text-indigo-200",
    tag: "HIGH-FREQUENCY SYSTEMS",
    stat1: { value: "-72%", label: "Frontend State Latency" },
    stat2: { value: "12 Lines", label: "Design Tokens Standardized" },
  },
  {
    id: "creative-developer-video",
    accent: "#EC4899",
    accentText: "text-pink-400",
    accentBg: "bg-pink-400",
    borderActive: "border-pink-400/60",
    glowColor: "rgba(236, 72, 153, 0.12)",
    pillBg: "bg-pink-500/10 border-pink-400/30 text-pink-200",
    tag: "EDITORIAL & MOTION DIRECTION",
    stat1: { value: "SOTD", label: "Awwwards Recognition" },
    stat2: { value: "200K+", label: "Launch Day Sessions" },
  },
  {
    id: "foundation-engineer",
    accent: "#10B981",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-400",
    borderActive: "border-emerald-400/60",
    glowColor: "rgba(16, 185, 129, 0.12)",
    pillBg: "bg-emerald-500/10 border-emerald-400/30 text-emerald-200",
    tag: "CLOUD INFRASTRUCTURE",
    stat1: { value: "99.99%", label: "Cloud Service Uptime" },
    stat2: { value: "Zero", label: "Downtime Deployments" },
  },
];

export function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  const activeExp = experiences[activeIdx] || experiences[0];
  const activeTheme = eraColorThemes[activeIdx] || eraColorThemes[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".stage-reveal"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth detail transition & ambient light color shift when switching items
  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current.querySelectorAll(".detail-item"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
    );

    if (auraRef.current) {
      gsap.to(auraRef.current, {
        background: `radial-gradient(circle at center, ${activeTheme.glowColor} 0%, transparent 70%)`,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [activeIdx, activeTheme]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#06070B] text-[#F4F4F6] border-t border-white/[0.08] select-none overflow-hidden"
    >
      {/* Dynamic Chromatic Ambient Light Mesh */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full blur-[150px] transition-all duration-700 opacity-80"
        style={{
          background: `radial-gradient(circle at center, ${activeTheme.glowColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Editorial Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]"
        >
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="stage-reveal flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-neutral-400">
              <span
                className={`w-2 h-2 rounded-full ${activeTheme.accentBg} shadow-[0_0_10px_currentColor] transition-colors duration-500`}
              />
              <span className="text-white font-medium">05 // CAREER CHRONOLOGY</span>
              <span className="text-white/20">/</span>
              <span className="text-neutral-400">TRAJECTORY &amp; MASTERY</span>
            </div>

            <h2 className="stage-reveal font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              EXPERIENCE &amp; <br />
              <span
                className="font-serif italic font-normal bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent"
              >
                ARCHITECTURAL IMPACT
              </span>
            </h2>

            <p className="stage-reveal font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
              An 8-year track record of engineering scalable architectures, cutting latency, and directing award-winning creative technology.
            </p>
          </div>

          <div className="stage-reveal flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="text-neutral-500">//</span>
            <span className="text-neutral-300 tracking-wider">2018 &mdash; 2026 ARCHIVE</span>
          </div>
        </div>

        {/* 2-Column Cinematic Open Stage (Zero Boxes / Zero Capsule Pills) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Cinematic Timeline List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/[0.08]">
            {experiences.map((exp, idx) => {
              const isActive = activeIdx === idx;
              const isPresent = exp.year.includes("PRESENT");
              const theme = eraColorThemes[idx] || eraColorThemes[0];

              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group relative text-left py-7 sm:py-8 transition-all duration-300 cursor-pointer flex flex-col gap-2 ${
                    isActive ? "opacity-100 pl-4 sm:pl-6" : "opacity-40 hover:opacity-85 pl-0"
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-7 bottom-7 w-[2.5px] rounded-full shadow-[0_0_12px_currentColor] transition-all duration-300"
                      style={{ backgroundColor: theme.accent, color: theme.accent }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300"
                        style={{ color: isActive ? theme.accent : "#94A3B8" }}
                      >
                        {exp.year}
                      </span>
                      {isPresent && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-neutral-400">
                      {exp.period}
                    </span>
                  </div>

                  <h3
                    className={`font-display font-black text-xl sm:text-2xl lg:text-3xl transition-all duration-300 leading-tight ${
                      isActive ? "text-white scale-[1.01]" : "text-neutral-300 group-hover:text-white"
                    }`}
                  >
                    {exp.role}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <p
                      className="font-serif italic text-base sm:text-lg transition-colors duration-300"
                      style={{ color: isActive ? theme.accent : "#64748B" }}
                    >
                      {exp.company}
                    </p>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "opacity-100 translate-x-1 -translate-y-1"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ color: theme.accent }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Seamless Cinematic Dossier (7 cols) - ZERO BOXES / ZERO CAPSULES */}
          <div
            ref={detailRef}
            className="lg:col-span-7 flex flex-col justify-between gap-10 lg:pl-6"
          >
            <div className="flex flex-col gap-8">
              {/* Top Meta Line (Clean Editorial Index) */}
              <div className="detail-item flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                      // {activeTheme.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.08]">
                    {activeExp.role}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <p
                      className="font-serif italic text-xl sm:text-2xl font-normal"
                      style={{ color: activeTheme.accent }}
                    >
                      {activeExp.company}
                    </p>
                    <span className="text-neutral-500">//</span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-300">
                      <MapPin className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                      <span>{activeExp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free-Floating Cinematic Key Metrics (Zero Stat Boxes) */}
              <div className="detail-item grid grid-cols-2 gap-8 py-2 border-b border-white/[0.08]">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight drop-shadow-[0_0_25px_currentColor]"
                    style={{ color: activeTheme.accent }}
                  >
                    {activeTheme.stat1.value}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-300 tracking-wide uppercase">
                    {activeTheme.stat1.label}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                    {activeTheme.stat2.value}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-300 tracking-wide uppercase">
                    {activeTheme.stat2.label}
                  </span>
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="detail-item font-sans text-base sm:text-lg text-neutral-200 leading-relaxed font-light">
                {activeExp.summary}
              </p>

              {/* Key Architectural Deliverables & Impact */}
              <div className="detail-item space-y-3 pt-2">
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                  <span>KEY DELIVERABLES &amp; IMPACT:</span>
                </div>

                <div className="space-y-3 pl-1">
                  {activeExp.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-3.5 text-sm sm:text-base text-neutral-300 font-light leading-relaxed"
                    >
                      <span
                        className="font-bold select-none mt-1 text-sm shrink-0"
                        style={{ color: activeTheme.accent }}
                      >
                        ✦
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Tech Stack (Zero Capsule Pills - Clean Editorial Slashes) */}
            <div className="detail-item pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-mono text-neutral-300">
              <span className="text-neutral-500 uppercase tracking-widest text-xs font-semibold mr-1">
                STACK:
              </span>
              {activeExp.techStack.map((tech, tIdx) => (
                <React.Fragment key={tIdx}>
                  <span className="hover:text-white transition-colors cursor-default">
                    {tech}
                  </span>
                  {tIdx < activeExp.techStack.length - 1 && (
                    <span className="text-neutral-600 select-none">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}








