"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".timeline-row-item");
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
      className="relative py-24 md:py-36 px-5 sm:px-8 md:px-16 border-t border-white/[0.08] overflow-hidden bg-[#070709]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 md:gap-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider">
                06 // CAREER CHRONOLOGY
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                THE TRAJECTORY & IMPACT
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              EXPERIENCE & MILESTONES
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>[ 2018 — 2026 ARCHIVE ]</span>
          </div>
        </div>

        {/* Minimalist Editorial Timeline Ledger (Clean typography rows - No heavy cards/boxes, No capsule badges) */}
        <div className="flex flex-col divide-y divide-white/[0.08] border-b border-white/[0.08]">
          {experiences.map((exp, idx) => {
            const isPresent = exp.year.includes("PRESENT");
            const formattedIndex = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={exp.id}
                onMouseEnter={() => playHover()}
                className="timeline-row-item group relative py-10 sm:py-12 md:py-14 transition-colors duration-300 hover:bg-white/[0.015]"
              >
                {/* Left glowing accent line indicator on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 to-amber-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
                  {/* Column 1: Time, Location & Index */}
                  <div className="lg:col-span-4 flex flex-col justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-amber-400/80 font-bold">
                        {formattedIndex}
                      </span>
                      <span className="font-mono font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight group-hover:text-amber-400 transition-colors duration-200">
                        {exp.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-neutral-400 mt-1">
                      <span className="flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {exp.location}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-neutral-500 uppercase tracking-wider">
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

                  {/* Column 2: Role, Organization, Narrative & Impact */}
                  <div className="lg:col-span-8 flex flex-col gap-4 pl-0 lg:pl-4">
                    {/* Role & Company Header */}
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight group-hover:translate-x-1 transition-transform duration-200">
                        {exp.role}
                      </h3>
                      <p className="font-serif italic text-base sm:text-lg text-amber-400/90 font-normal mt-1">
                        {exp.company}
                      </p>
                    </div>

                    {/* Concise Narrative */}
                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
                      {exp.summary}
                    </p>

                    {/* Key Accomplishments (Clean Editorial Em-Dash Format) */}
                    <div className="space-y-2 pt-2">
                      {exp.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed"
                        >
                          <span className="text-amber-400 font-mono select-none mt-[-1px]">—</span>
                          <span className="text-neutral-300">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack & Core Systems (Clean Inline Monospace - No Capsule Pills!) */}
                    <div className="pt-4 mt-2 flex items-baseline gap-2 flex-wrap text-xs font-mono">
                      <span className="text-neutral-500 uppercase text-[11px] tracking-wider font-semibold mr-1">
                        Stack:
                      </span>
                      <span className="text-neutral-400 font-mono tracking-wide leading-loose">
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

