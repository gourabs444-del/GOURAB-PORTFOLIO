"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { MapPin, Briefcase, ChevronRight, Award } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".timeline-card-item");
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
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
      className="relative py-28 md:py-40 px-6 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-accent">06 // CAREER CHRONOLOGY</span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-mist">
                THE TRAJECTORY & IMPACT
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              EXPERIENCE & MILESTONES
            </h2>
          </div>
          <span className="font-mono text-xs text-mist/70">
            [ 2018 — 2026 ARCHIVE ]
          </span>
        </div>

        {/* Timeline Stack */}
        <div className="flex flex-col gap-12">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="timeline-card-item group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-3xl border border-white/[0.06] bg-surface-300/30 hover:bg-surface-200/60 hover:border-white/20 transition-all duration-300"
            >
              {/* Year Column */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="font-mono font-bold text-2xl sm:text-3xl text-white group-hover:text-accent transition-colors">
                  {exp.year}
                </span>
                <span className="font-mono text-xs text-mist flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {exp.location}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-mist/60">
                  DURATION: {exp.period}
                </span>
              </div>

              {/* Role & Accomplishments Column */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {exp.role}
                  </h3>
                  <p className="font-editorial text-sm font-semibold text-accent mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <p className="font-sans text-sm text-mist leading-relaxed">
                  {exp.summary}
                </p>

                {/* Key Accomplishments */}
                <div className="space-y-2 mt-2">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/80 font-sans">
                      <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {exp.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-mist"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
