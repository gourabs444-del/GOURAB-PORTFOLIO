"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export function ExperienceTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const spineRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance - triggers earlier and smoothly
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".flow-header-reveal"),
          { opacity: 0, y: 24, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 94%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Vertical Spine Progress Fill on Lenis Scroll - responsive & smooth
      if (spineRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 90%",
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Snappy & Early Staggered Flow Items Reveal on Scroll
      const items = sectionRef.current?.querySelectorAll(".flow-item");
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28, filter: "blur(3px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-44 px-5 sm:px-10 md:px-16 lg:px-24 overflow-hidden bg-gradient-to-b from-[#0c0e14] via-[#11141d] to-[#0a0c12] text-[#F4F4F6] border-y border-white/[0.06] select-none"
    >
      {/* Dynamic Rich Atmospheric Mesh Gradients & Glows */}
      <div
        className="pointer-events-none absolute -top-20 left-1/4 w-[600px] md:w-[900px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.08)_0%,_rgba(59,130,246,0.03)_45%,_transparent_70%)] blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.05)_0%,_rgba(139,92,246,0.03)_50%,_transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />
      {/* Subtle architectural vertical grid lines for depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:160px_100%] opacity-40"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Minimal Editorial Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div className="flex flex-col gap-3">
            <div className="flow-header-reveal flex items-center gap-3">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest uppercase">
                05 // CAREER CHRONOLOGY
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                TRAJECTORY &amp; IMPACT
              </span>
            </div>

            <h2 className="flow-header-reveal font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
              Experience &amp; <br className="hidden sm:inline" />
              <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
          </div>

          <div className="flow-header-reveal flex items-center gap-3 font-mono text-xs text-neutral-400 border border-white/10 px-4 py-2 rounded-full w-fit bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>2018 — 2026 ARCHIVE</span>
          </div>
        </div>

        {/* Minimal Fluid Flow (Zero Boxes / Zero Table Dividers) */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 flex flex-col gap-16 sm:gap-20 md:gap-24">
          {/* Vertical Connecting Ambient Track */}
          <div className="absolute left-0 top-3 bottom-8 w-[1px] bg-white/[0.08]">
            <div
              ref={spineRef}
              className="w-full h-full bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.6)] will-change-transform"
            />
          </div>

          {experiences.map((exp, idx) => {
            const isPresent = exp.year.includes("PRESENT");
            const formattedIndex = String(idx + 1).padStart(2, "0");
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <div
                key={exp.id}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  playHover();
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flow-item group relative transition-all duration-500 cursor-default ${
                  isAnyHovered && !isHovered ? "opacity-35 blur-[0.5px]" : "opacity-100"
                }`}
              >
                {/* Glowing Node Dot on the Spine */}
                <div className="absolute -left-[27px] sm:-left-[43px] md:-left-[51px] top-1.5 flex items-center justify-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isHovered || isPresent
                        ? "border-amber-400 bg-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.8)] scale-125"
                        : "border-white/30 bg-[#07070a] group-hover:border-amber-400"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start transition-transform duration-300 group-hover:translate-x-2">
                  {/* Left Column: Year & Index & Metadata */}
                  <div className="lg:col-span-4 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-amber-400/80">
                        // {formattedIndex}
                      </span>
                      <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-300 transition-colors duration-200">
                        {exp.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-neutral-400">
                      <span className="flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {exp.location}
                      </span>
                      <span className="text-white/20">&bull;</span>
                      <span className="text-neutral-400">{exp.period}</span>
                      {isPresent && (
                        <>
                          <span className="text-white/20">&bull;</span>
                          <span className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
                            Active
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Middle Column: Role, Company, Summary, Milestones & Stack */}
                  <div className="lg:col-span-8 flex flex-col gap-3.5">
                    {/* Role Title & Company */}
                    <div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-100 transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <p className="font-serif italic text-base sm:text-lg text-amber-400 font-normal mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    {/* Concise Narrative */}
                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    {/* High-Impact Milestone Bullets */}
                    <div className="space-y-1.5 pt-1">
                      {exp.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed"
                        >
                          <span className="text-amber-400 font-mono font-bold select-none">&mdash;</span>
                          <span className="text-neutral-300">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Clean Monospace Tech Stack */}
                    <div className="pt-2 flex items-baseline gap-2 flex-wrap text-xs font-mono">
                      <span className="text-neutral-500 uppercase text-[10px] tracking-wider font-semibold">
                        STACK:
                      </span>
                      <span className="text-neutral-400 font-mono tracking-wide">
                        {exp.techStack.join("  /  ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
