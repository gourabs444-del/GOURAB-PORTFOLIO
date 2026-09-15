"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header kinetic entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".header-reveal"),
          { opacity: 0, y: 35, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Hairline dividers draw across
      const dividers = sectionRef.current?.querySelectorAll(".timeline-divider");
      dividers?.forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power2.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: divider,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Rows reveal on scroll
      const rows = sectionRef.current?.querySelectorAll(".timeline-row");
      rows?.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 45, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
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
      className="relative py-28 sm:py-36 md:py-44 px-5 sm:px-10 md:px-16 lg:px-24 border-t border-white/[0.08] overflow-hidden bg-[#050507] text-[#F4F4F6] select-none"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.035)_0%,_transparent_70%)] blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-14 md:gap-20 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div className="flex flex-col gap-3">
            <div className="header-reveal flex items-center gap-3">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest uppercase">
                06 // CAREER CHRONOLOGY
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                TRAJECTORY &amp; IMPACT
              </span>
            </div>

            <h2 className="header-reveal font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
              EXPERIENCE &amp; <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                MILESTONES
              </span>
            </h2>
          </div>

          <div className="header-reveal flex items-center gap-3 font-mono text-xs text-neutral-400 border border-white/10 px-4 py-2 rounded-full w-fit bg-white/[0.02]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>2018 — 2026 ARCHIVE</span>
          </div>
        </div>

        {/* Minimalist Editorial Ledger */}
        <div className="flex flex-col">
          {experiences.map((exp, idx) => {
            const isPresent = exp.year.includes("PRESENT");
            const formattedIndex = String(idx + 1).padStart(2, "0");

            return (
              <div key={exp.id} className="relative">
                {/* Hairline Divider */}
                <div className="timeline-divider w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                <div
                  onMouseEnter={() => playHover()}
                  className="timeline-row group relative py-12 sm:py-16 transition-all duration-300 hover:bg-white/[0.015] px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-2xl cursor-default"
                >
                  {/* Glowing Amber Left Indicator */}
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-y-0 group-hover:scale-y-100 rounded-full" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Index, Year, Location */}
                    <div className="lg:col-span-4 flex flex-col gap-3.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          // {formattedIndex}
                        </span>
                        <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-300 transition-colors duration-200">
                          {exp.year}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-neutral-400">
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          {exp.location}
                        </span>
                        <span className="text-white/20">&bull;</span>
                        <span className="text-neutral-400">
                          {exp.period}
                        </span>
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

                    {/* Middle Column: Role, Company, Concise Impact & Stack */}
                    <div className="lg:col-span-7 flex flex-col gap-3.5 group-hover:translate-x-1.5 transition-transform duration-300">
                      {/* Role & Company */}
                      <div>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-200 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="font-serif italic text-base sm:text-lg text-amber-400 font-normal mt-1">
                          {exp.company}
                        </p>
                      </div>

                      {/* Concise Summary */}
                      <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                        {exp.summary}
                      </p>

                      {/* Key High-Impact Milestones */}
                      <div className="space-y-1.5 pt-1">
                        {exp.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed"
                          >
                            <span className="text-amber-400 font-mono font-bold">&mdash;</span>
                            <span className="text-neutral-300 font-normal">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Clean Inline Monospace Stack */}
                      <div className="pt-2 flex items-baseline gap-2 flex-wrap text-xs font-mono">
                        <span className="text-neutral-500 uppercase text-[10px] tracking-wider font-semibold">
                          STACK:
                        </span>
                        <span className="text-neutral-400 font-mono tracking-wide">
                          {exp.techStack.join("  /  ")}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Interactive Arrow */}
                    <div className="hidden lg:flex lg:col-span-1 justify-end pt-1">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:border-amber-400/40 group-hover:bg-amber-400/10 group-hover:rotate-45 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Bottom Hairline Divider */}
          <div className="timeline-divider w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
