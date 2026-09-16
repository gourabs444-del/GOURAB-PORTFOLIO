"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { TechLogo } from "@/components/ui/TechLogos";
import { MapPin, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";

export function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  const activeExp = experiences[activeIdx] || experiences[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
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
      detailRef.current.querySelectorAll(".infographic-anim"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
    );

    if (auraRef.current) {
      gsap.to(auraRef.current, {
        background: `radial-gradient(circle at center, ${activeExp.glowColor} 0%, transparent 70%)`,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [activeIdx, activeExp]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-20 lg:px-28 bg-black text-[#F4F4F6] border-t border-white/[0.08] select-none overflow-hidden"
    >
      {/* Dynamic Chromatic Ambient Light Mesh */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full blur-[170px] transition-all duration-700 opacity-80"
        style={{
          background: `radial-gradient(circle at center, ${activeExp.glowColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* ========================================================= */}
        {/* 1. EDITORIAL HEADER WITH HANDWRITTEN BLUEPRINT CALLOUT    */}
        {/* ========================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08] relative"
        >
          <div className="flex flex-col gap-4 max-w-2xl">
            {/* Top Tag */}
            <div className="stage-reveal flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-neutral-400">
              <span
                className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-500"
                style={{ backgroundColor: activeExp.accent, color: activeExp.accent }}
              />
              <span className="text-white font-medium">05 // CAREER CHRONOLOGY</span>
              <span className="text-white/20">/</span>
              <span className="text-neutral-400">TRAJECTORY &amp; MASTERY</span>
            </div>

            {/* Main Editorial Title */}
            <h2 className="stage-reveal font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              EXPERIENCE &amp; <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                ARCHITECTURAL IMPACT
              </span>
            </h2>

            {/* Narrative Subtitle */}
            <p className="stage-reveal font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
              An 8-year track record of engineering scalable architectures, cutting latency, and directing award-winning creative technology.
            </p>
          </div>

          {/* Right: Archive Meta + Handwritten Blueprint Note */}
          <div className="stage-reveal flex flex-col items-start md:items-end gap-3 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">//</span>
              <span className="text-neutral-300 tracking-wider">2018 &mdash; 2026 ARCHIVE</span>
            </div>

            {/* Handwritten Blueprint Note */}
            <div className="hidden sm:flex items-center gap-2 text-amber-300/90 font-serif italic text-base">
              <span>* continuous production evolution</span>
              <svg
                className="w-10 h-5 text-amber-400 shrink-0 rotate-12"
                viewBox="0 0 60 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M 5 22 Q 35 5, 52 18" />
                <path d="M 44 12 L 53 19 L 46 25" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. REORGANIZED 2-COLUMN TIMELINE & DOSSIER STAGE          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Connected Timeline Conduit (5 cols) */}
          <div className="lg:col-span-5 flex flex-col relative">
            {/* Continuous SVG Conduit Line */}
            <div className="absolute left-[3px] top-8 bottom-8 w-[1.5px] bg-gradient-to-b from-white/20 via-white/10 to-white/5 pointer-events-none hidden sm:block" />

            <div className="flex flex-col divide-y divide-white/[0.08]">
              {experiences.map((exp, idx) => {
                const isActive = activeIdx === idx;
                const isPresent = exp.year.includes("PRESENT");

                return (
                  <button
                    key={exp.id}
                    onClick={() => {
                      playHover();
                      setActiveIdx(idx);
                    }}
                    onMouseEnter={() => {
                      playHover();
                      setActiveIdx(idx);
                    }}
                    className={`group relative text-left py-7 sm:py-8 transition-all duration-300 cursor-pointer flex flex-col gap-2 ${
                      isActive
                        ? "opacity-100 pl-4 sm:pl-7"
                        : "opacity-40 hover:opacity-85 pl-0 sm:pl-7"
                    }`}
                  >
                    {/* Active Conduit Node / Indicator */}
                    {isActive ? (
                      <div
                        className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full shadow-[0_0_14px_currentColor] transition-all duration-300"
                        style={{ backgroundColor: exp.accent, color: exp.accent }}
                      />
                    ) : (
                      <div className="absolute left-0 top-10 w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block group-hover:bg-white/50 transition-colors" />
                    )}

                    {/* Timeline Node Meta */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300"
                          style={{ color: isActive ? exp.accent : "#94A3B8" }}
                        >
                          {exp.year}
                        </span>
                        {isPresent && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-neutral-400">
                        {exp.period}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3
                      className={`font-display font-black text-xl sm:text-2xl lg:text-3xl transition-all duration-300 leading-tight ${
                        isActive ? "text-white scale-[1.01]" : "text-neutral-300 group-hover:text-white"
                      }`}
                    >
                      {exp.role}
                    </h3>

                    {/* Company & Interactive Indicator */}
                    <div className="flex items-center justify-between pt-0.5">
                      <p
                        className="font-serif italic text-base sm:text-lg transition-colors duration-300"
                        style={{ color: isActive ? exp.accent : "#64748B" }}
                      >
                        {exp.company}
                      </p>

                      <ArrowUpRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 translate-x-1 -translate-y-1"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                        style={{ color: exp.accent }}
                      />
                    </div>

                    {/* Handwritten Micro Note for Active Era */}
                    {isActive && (
                      <div className="pt-0.5 flex items-center gap-2 text-xs font-serif italic text-neutral-400 animate-in fade-in duration-300">
                        <span className="text-amber-300/90 font-medium">↳ {exp.sketchAnnotation}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dedicated Infographic Dossier (7 cols) */}
          <div
            ref={detailRef}
            className="lg:col-span-7 flex flex-col justify-between gap-10 lg:pl-6"
          >
            <div className="flex flex-col gap-8">
              {/* Top Dossier Title & System Classification */}
              <div className="infographic-anim flex flex-col gap-2.5 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                    // {activeExp.category}
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06]">
                  {activeExp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <p
                    className="font-serif italic text-xl sm:text-2xl font-normal"
                    style={{ color: activeExp.accent }}
                  >
                    {activeExp.company}
                  </p>
                  <span className="text-neutral-500">//</span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-300">
                    <MapPin className="w-3.5 h-3.5" style={{ color: activeExp.accent }} />
                    <span>{activeExp.location}</span>
                  </div>
                </div>
              </div>

              {/* Free-Floating Infographic Metrics with Handwritten Sketch Note */}
              <div className="infographic-anim flex flex-col gap-3 py-2 border-b border-white/[0.08]">
                {/* Handwritten Callout Note */}
                <div className="flex items-center gap-2 font-serif italic text-sm sm:text-base text-amber-300/90">
                  <svg
                    className="w-8 h-4 text-amber-400 shrink-0"
                    viewBox="0 0 50 25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M 5 5 Q 25 20, 42 10" />
                    <path d="M 35 14 L 43 9 L 41 2" />
                  </svg>
                  <span>// &ldquo;{activeExp.handwrittenNote}&rdquo;</span>
                </div>

                {/* Free-Floating Metrics Row */}
                <div className="grid grid-cols-2 gap-8 pt-1">
                  {/* Metric 1 */}
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight drop-shadow-[0_0_25px_currentColor]"
                      style={{ color: activeExp.accent }}
                    >
                      {activeExp.stat1.value}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-neutral-300 tracking-wider uppercase font-medium">
                      {activeExp.stat1.label}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                      [{activeExp.stat1.telemetry}]
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="flex flex-col gap-1">
                    <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                      {activeExp.stat2.value}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-neutral-300 tracking-wider uppercase font-medium">
                      {activeExp.stat2.label}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                      [{activeExp.stat2.telemetry}]
                    </span>
                  </div>
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="infographic-anim font-sans text-base sm:text-lg text-neutral-200 leading-relaxed font-light">
                {activeExp.summary}
              </p>

              {/* Key Architectural Deliverables Matrix */}
              <div className="infographic-anim space-y-3 pt-1">
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" style={{ color: activeExp.accent }} />
                    <span>KEY ARCHITECTURAL DELIVERABLES &amp; IMPACT</span>
                  </div>
                  <span className="text-neutral-500 font-normal hidden sm:inline">// VERIFIED</span>
                </div>

                <div className="space-y-3 pl-1">
                  {activeExp.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-3.5 text-sm sm:text-base text-neutral-300 font-light leading-relaxed"
                    >
                      <span
                        className="font-bold select-none mt-1 text-sm shrink-0"
                        style={{ color: activeExp.accent }}
                      >
                        ✦
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. CORE ARCHITECTURE SKILLS WITH AUTHENTIC BRAND SVG LOGOS */}
            {/* ========================================================= */}
            <div className="infographic-anim pt-8 border-t border-white/[0.08] flex flex-col gap-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2 uppercase tracking-widest font-semibold">
                  <span className="text-neutral-500">//</span>
                  <span className="text-neutral-300">CORE ARCHITECTURE &amp; PRODUCTION STACK</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                  [{activeExp.techStack.length} TECHNOLOGIES]
                </span>
              </div>

              {/* Clean Grid of Tech Chips with Authentic Brand SVG Logos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
                {activeExp.techStack.map((tech, tIdx) => (
                  <div
                    key={tIdx}
                    className="group/tech flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200 select-none cursor-default"
                  >
                    <TechLogo
                      name={tech}
                      className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/tech:scale-110"
                    />
                    <span className="font-mono text-xs text-neutral-300 group-hover/tech:text-white transition-colors truncate">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
