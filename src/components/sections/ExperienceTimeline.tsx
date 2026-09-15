"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { MapPin, ArrowUpRight, Sparkles, ChevronRight } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll(".timeline-row-item");
      const lines = sectionRef.current?.querySelectorAll(".timeline-divider-line");

      // Animate horizontal divider lines drawing across
      lines?.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate row content entrance
      rows?.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
      className="relative py-28 sm:py-36 md:py-44 px-5 sm:px-10 md:px-16 lg:px-24 border-t border-white/[0.08] overflow-hidden bg-[#070709] text-[#F4F4F6] select-none"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.04)_0%,_transparent_70%)] blur-[100px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest">
                06 // CAREER CHRONOLOGY
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                THE TRAJECTORY & IMPACT
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
              EXPERIENCE &amp; <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
                MILESTONES
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-full w-fit">
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
                {/* Top Animated Hairline Divider */}
                <div className="timeline-divider-line w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                <div
                  onMouseEnter={() => playHover()}
                  className="timeline-row-item group relative py-10 sm:py-14 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/[0.03] hover:via-white/[0.015] hover:to-transparent px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-2xl cursor-default"
                >
                  {/* Left glowing amber accent bar on hover */}
                  <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-y-0 group-hover:scale-y-100 rounded-full" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Index & Date & Location */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {formattedIndex}
                        </span>
                        <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-400 transition-colors duration-200">
                          {exp.year}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-neutral-400">
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          {exp.location}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-neutral-400 font-medium">
                          {exp.period}
                        </span>
                        {isPresent && (
                          <>
                            <span className="text-white/20">•</span>
                            <span className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
                              Active
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Middle Column: Role, Company, Narrative, Accomplishments & Tech Stack */}
                    <div className="lg:col-span-7 flex flex-col gap-4 group-hover:translate-x-1.5 transition-transform duration-300">
                      {/* Role & Company */}
                      <div>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-200 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="font-serif italic text-base sm:text-lg text-amber-400/90 font-normal mt-1">
                          {exp.company}
                        </p>
                      </div>

                      {/* Summary Narrative */}
                      <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                        {exp.summary}
                      </p>

                      {/* Accomplishments */}
                      <div className="space-y-2 pt-1">
                        {exp.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed"
                          >
                            <span className="text-amber-400 font-mono select-none mt-[-1px] font-bold">—</span>
                            <span className="text-neutral-300">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Clean Inline Monospace Tech Stack */}
                      <div className="pt-3 flex items-baseline gap-2 flex-wrap text-xs font-mono">
                        <span className="text-neutral-500 uppercase text-[11px] tracking-wider font-semibold">
                          Stack:
                        </span>
                        <span className="text-neutral-400 font-mono tracking-wide leading-loose">
                          {exp.techStack.join("  /  ")}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Arrow Action Icon */}
                    <div className="hidden lg:flex lg:col-span-1 justify-end pt-2">
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
          <div className="timeline-divider-line w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}




