"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".timeline-row-item");
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
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
      className="relative py-24 sm:py-32 md:py-36 px-6 sm:px-12 md:px-20 lg:px-28 border-t border-white/[0.08] overflow-hidden bg-[#050507] text-[#F4F4F6] select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 md:gap-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-neutral-300 font-semibold">06 // CAREER CHRONOLOGY</span>
              <span className="text-neutral-600">/</span>
              <span>2018 — 2026</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              EXPERIENCE &amp; MILESTONES
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR SELECT COMMISSIONS</span>
          </div>
        </div>

        {/* Minimalist Editorial Ledger (Clean, Fast to Scan & High Impact) */}
        <div className="flex flex-col divide-y divide-white/[0.08] border-b border-white/[0.08]">
          {experiences.map((exp, idx) => {
            const isPresent = exp.year.includes("PRESENT");
            const formattedIndex = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={exp.id}
                onMouseEnter={() => playHover()}
                className="timeline-row-item group relative py-10 sm:py-12 md:py-14 transition-all duration-300 hover:bg-white/[0.02] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
              >
                {/* Left Glowing Accent Line on Hover */}
                <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-y-0 group-hover:scale-y-100 origin-center rounded-full" />

                {/* Column 1: Timeline Year & Status */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-amber-400 font-bold">
                      // {formattedIndex}
                    </span>
                    <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-400 transition-colors duration-200">
                      {exp.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500">
                    <span className="text-neutral-400">{exp.location}</span>
                    <span>&bull;</span>
                    {isPresent ? (
                      <span className="text-emerald-400 font-medium">Present</span>
                    ) : (
                      <span>{exp.period}</span>
                    )}
                  </div>
                </div>

                {/* Column 2: Role, Organization & Core Impact Line */}
                <div className="lg:col-span-8 flex flex-col gap-3 group-hover:translate-x-1.5 transition-transform duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="font-sans text-xs sm:text-sm text-neutral-400 font-medium shrink-0">
                      {exp.company}
                    </span>
                  </div>

                  {/* Single Key High-Impact Metric (No Paragraph Clutter) */}
                  <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                    {exp.highlights[0]}
                  </p>

                  {/* Clean Inline Stack */}
                  <div className="text-xs font-mono text-neutral-500 pt-1">
                    {exp.techStack.slice(0, 5).join("  •  ")}
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



