"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { MapPin } from "lucide-react";

export function ExperienceTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const spineRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal - instantaneous & clean (transform + opacity only, zero heavy filter)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".timeline-header-reveal"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Vertical Spine Progress Fill - lightweight 60fps scrub
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
              scrub: 0.3,
            },
          }
        );
      }

      // 3. Timeline Items Entrance - lightweight transform
      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
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
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] border-t border-white/[0.08] select-none"
    >
      {/* Subtle, Ultra-Lightweight Ambient Glow (No Heavy GPU Blur Filters) */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.06)_0%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Editorial Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/[0.08]"
        >
          <div className="flex flex-col gap-3">
            <div className="timeline-header-reveal flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest uppercase">
                05 // CAREER CHRONOLOGY
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                TRAJECTORY &amp; IMPACT
              </span>
            </div>

            <h2 className="timeline-header-reveal font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
              Experience &amp; <br className="hidden sm:inline" />
              <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
          </div>

          <div className="timeline-header-reveal flex items-center gap-3 font-mono text-xs text-neutral-400 border border-white/10 px-4 py-2 rounded-full w-fit bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>2018 — 2026 ARCHIVE</span>
          </div>
        </div>

        {/* Lightweight Fluid Timeline Track */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 flex flex-col gap-16 sm:gap-20 md:gap-24">
          {/* Vertical Track Hairline + Smooth Animated Spine */}
          <div className="absolute left-0 top-3 bottom-8 w-[1px] bg-white/[0.08]">
            <div
              ref={spineRef}
              className="w-full h-full bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.5)] will-change-transform"
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
                className={`timeline-item group relative transition-opacity duration-300 cursor-default ${
                  isAnyHovered && !isHovered ? "opacity-35" : "opacity-100"
                }`}
              >
                {/* Glowing Node Dot on Spine */}
                <div className="absolute -left-[27px] sm:-left-[43px] md:-left-[51px] top-1.5 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isHovered || isPresent
                        ? "border-amber-400 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.7)] scale-110"
                        : "border-white/30 bg-[#050507] group-hover:border-amber-400"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start transition-transform duration-300 group-hover:translate-x-1.5">
                  {/* Left Column: Year & Index & Location */}
                  <div className="lg:col-span-4 flex flex-col gap-2">
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

                  {/* Right Column: Role, Company, Summary, Highlights & Stack */}
                  <div className="lg:col-span-8 flex flex-col gap-3.5">
                    <div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-100 transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <p className="font-serif italic text-base sm:text-lg text-amber-400 font-normal mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    {/* Milestones Bullets */}
                    <div className="space-y-2 pt-1">
                      {exp.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed"
                        >
                          <span className="text-amber-400 font-mono font-bold select-none mt-0.5">&mdash;</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Minimalist Tech Stack */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-baseline gap-2 flex-wrap text-xs font-mono">
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

