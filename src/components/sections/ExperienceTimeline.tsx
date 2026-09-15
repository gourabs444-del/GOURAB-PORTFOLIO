"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { ArrowUpRight, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const activeExp = experiences[activeIdx] || experiences[0];

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

  // Smooth detail transition when switching items
  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current.querySelectorAll(".detail-item"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" }
    );
  }, [activeIdx]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] border-t border-white/[0.08] select-none overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.05)_0%,_transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.1]"
        >
          <div className="flex flex-col gap-3.5 max-w-2xl">
            <div className="stage-reveal flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span className="text-white font-medium">05 // CAREER</span>
              <span className="text-white/20">/</span>
              <span className="text-neutral-400">EXPERIENCE &amp; LEADERSHIP</span>
            </div>

            <h2 className="stage-reveal font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              EXPERIENCE &amp; <span className="font-serif italic font-normal text-sky-300">IMPACT</span>
            </h2>

            <p className="stage-reveal font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              An 8-year track record of engineering scalable architectures, cutting latency, and directing award-winning creative technology.
            </p>
          </div>

          <div className="stage-reveal font-mono text-xs text-neutral-400">
            <span>2018 &mdash; 2026 ARCHIVE</span>
          </div>
        </div>

        {/* 2-Column Interactive Career Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Interactive Era Timeline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {experiences.map((exp, idx) => {
              const isActive = activeIdx === idx;
              const isPresent = exp.year.includes("PRESENT");

              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group relative text-left p-6 sm:p-7 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col gap-2 border ${
                    isActive
                      ? "bg-white/[0.04] border-white/[0.15] shadow-lg shadow-black/40 translate-x-1 sm:translate-x-2"
                      : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.06] opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* Left Accent Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold tracking-wide ${
                        isActive ? "text-sky-300" : "text-neutral-400"
                      }`}
                    >
                      {exp.year}
                    </span>

                    {isPresent ? (
                      <span className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                    )}
                  </div>

                  <h3
                    className={`font-display font-bold text-xl sm:text-2xl transition-colors leading-snug ${
                      isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                    }`}
                  >
                    {exp.role}
                  </h3>

                  <p
                    className={`font-serif italic text-sm sm:text-base ${
                      isActive ? "text-sky-300/90" : "text-neutral-400"
                    }`}
                  >
                    {exp.company}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Architecture Dossier (7 cols) */}
          <div
            ref={detailRef}
            className="lg:col-span-7 relative p-8 sm:p-10 md:p-12 rounded-3xl border border-white/[0.1] bg-[#09090d]/80 backdrop-blur-xl flex flex-col justify-between gap-8 min-h-[440px]"
          >
            <div className="flex flex-col gap-6">
              {/* Dossier Header */}
              <div className="detail-item flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                    {activeExp.role}
                  </h3>
                  <p className="font-serif italic text-lg sm:text-xl text-sky-300 font-normal mt-1">
                    {activeExp.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{activeExp.location}</span>
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="detail-item font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                {activeExp.summary}
              </p>

              {/* Key Architectural Highlights */}
              <div className="detail-item space-y-3 pt-2">
                <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                  KEY DELIVERABLES &amp; IMPACT:
                </span>
                {activeExp.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed"
                  >
                    <span className="text-sky-400 font-mono font-bold select-none">&mdash;</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stack */}
            <div className="detail-item pt-6 border-t border-white/[0.08] flex items-center gap-2 flex-wrap">
              <span className="text-neutral-400 uppercase text-[10px] font-mono tracking-wider font-semibold mr-1">
                STACK:
              </span>
              {activeExp.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}







