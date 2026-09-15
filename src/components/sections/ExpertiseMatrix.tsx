"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { skillGroups, SkillGroup } from "@/data/expertise";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Code2, Sparkles, Film, Cpu, ArrowUpRight, Check } from "lucide-react";

export function ExpertiseMatrix() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const { playHover, playClick } = useAudioFeedback();

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Film: <Film className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const disciplineItems = sectionRef.current?.querySelectorAll(".discipline-scroll-section");

      disciplineItems?.forEach((item, index) => {
        // High quality spatial entrance with smooth easing
        gsap.fromTo(
          item,
          {
            opacity: 0.15,
            y: 60,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
              onEnter: () => setActiveGroupIndex(index),
              onEnterBack: () => setActiveGroupIndex(index),
            },
          }
        );

        // Staggered reveal for individual skill rows
        const skillRows = item.querySelectorAll(".skill-detail-row");
        gsap.fromTo(
          skillRows,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeGroup = skillGroups[activeGroupIndex] || skillGroups[0];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-48 px-5 sm:px-10 md:px-16 lg:px-24 bg-[#070709] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Dynamic Ambient Glow tied to Active Discipline Color */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activeGroup.accent} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-32 relative z-10">
        {/* ========================================================= */}
        {/* 1. EDITORIAL SECTION HEADER                               */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest uppercase">
                04 // CAPABILITY MATRIX
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                TECHNICAL DISCIPLINES &amp; SYSTEMS
              </span>
            </div>
            <h2 className="font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
              Skills &amp; Expertise
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-neutral-400 max-w-md text-left md:text-right">
            <p className="leading-relaxed">
              Architectural depth spanning distributed full-stack engines, WebGL fragment shaders, cinematic direction &amp; autonomous AI orchestration.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MODERN SPATIAL SCROLL DISCIPLINES (Zero Boxes / Zero Pills) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Sticky Left Navigation HUD (Desktop) */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:flex flex-col gap-6">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              ACTIVE DISCIPLINE
            </span>

            <div className="flex flex-col gap-4 border-l border-white/[0.1] pl-6 relative">
              {/* Vertical Active Indicator Track */}
              <div
                className="absolute left-[-1px] w-[2px] transition-all duration-500 ease-out"
                style={{
                  top: `${activeGroupIndex * 25}%`,
                  height: "25%",
                  backgroundColor: activeGroup.accent,
                  boxShadow: `0 0 15px ${activeGroup.accent}`,
                }}
              />

              {skillGroups.map((group, idx) => {
                const isActive = idx === activeGroupIndex;
                return (
                  <button
                    key={group.id}
                    onClick={() => {
                      playClick();
                      const target = document.getElementById(`discipline-${group.id}`);
                      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    onMouseEnter={() => playHover()}
                    className={`flex flex-col items-start text-left transition-all duration-300 cursor-pointer ${
                      isActive ? "opacity-100 translate-x-2" : "opacity-40 hover:opacity-75"
                    }`}
                  >
                    <span className="font-mono text-xs text-neutral-500">
                      // {group.number}
                    </span>
                    <span
                      className="font-display font-bold text-xl tracking-tight transition-colors"
                      style={{ color: isActive ? group.accent : "#FFFFFF" }}
                    >
                      {group.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Discipline Metric Footer */}
            <div className="pt-6 mt-4 border-t border-white/[0.08] font-mono text-xs text-neutral-400">
              <span className="text-neutral-500 uppercase block mb-1">Architecture Standard:</span>
              <span className="text-white font-semibold">60 FPS &bull; Strict Type-Safety &bull; Zero Lag</span>
            </div>
          </div>

          {/* Right Fluid Kinetic Stream */}
          <div className="lg:col-span-8 flex flex-col gap-24 sm:gap-32 md:gap-40">
            {skillGroups.map((group, idx) => (
              <div
                id={`discipline-${group.id}`}
                key={group.id}
                className="discipline-scroll-section relative flex flex-col gap-10 pb-16 border-b border-white/[0.08]"
              >
                {/* Discipline Header Banner */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                      style={{
                        color: group.accent,
                        borderColor: `${group.accent}40`,
                        backgroundColor: `${group.accent}10`,
                      }}
                    >
                      DISCIPLINE // {group.number}
                    </span>
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                      {group.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                    {group.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mt-1">
                    {group.description}
                  </p>
                </div>

                {/* Detailed Skills Spectrum (Clean Typographic Rows - Zero Bulky Boxes) */}
                <div className="flex flex-col divide-y divide-white/[0.06]">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      onMouseEnter={() => playHover()}
                      className="skill-detail-row group relative py-6 transition-all duration-300 hover:bg-white/[0.015] flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-8 -mx-3 px-3 rounded-lg"
                    >
                      {/* Left: Skill Name & Description */}
                      <div className="flex flex-col gap-1 max-w-xl">
                        <div className="flex items-center gap-3">
                          <h4 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors">
                            {skill.name}
                          </h4>
                          {skill.highlight && (
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: group.accent }}
                            />
                          )}
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                          {skill.description}
                        </p>
                      </div>

                      {/* Right: Mastery Level (Clean Typographic Monospace - No Capsule Pills) */}
                      <div className="shrink-0 flex items-center gap-2 font-mono text-xs">
                        <span className="text-neutral-500 uppercase text-[10px] tracking-wider">
                          Proficiency:
                        </span>
                        <span
                          className="font-bold tracking-wide"
                          style={{ color: group.accent }}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline Competency Stack */}
                <div className="pt-4 flex items-baseline gap-2 flex-wrap text-xs font-mono">
                  <span className="text-neutral-500 uppercase font-semibold text-[11px] tracking-wider mr-2">
                    Core Domains:
                  </span>
                  <span className="text-neutral-300 leading-loose">
                    {group.disciplines.join("  /  ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. EDITORIAL INQUIRY TRIGGER                              */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-neutral-400">Continuous technical research &amp; production refinement</span>
          </div>
          <a
            href="#contact"
            onClick={() => {
              playClick();
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-white hover:text-amber-400 transition-colors underline underline-offset-4 decoration-white/30"
          >
            Request Custom Technical Consultation &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
