"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { skillGroups, SkillGroup } from "@/data/expertise";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { Code2, Sparkles, Film, Cpu, Check, ArrowRight, Layers } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

export function ExpertiseMatrix() {
  const [activeTab, setActiveTab] = useState<string>(skillGroups[0].id);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tabs = sectionRef.current?.querySelectorAll(".matrix-tab-btn");
      if (tabs && tabs.length > 0) {
        gsap.fromTo(
          tabs,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Film: <Film className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
  };

  const currentGroup = skillGroups.find((g) => g.id === activeTab) || skillGroups[0];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-accent">04 // CAPABILITY MATRIX</span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-mist">
                TECHNICAL DISCIPLINES & MASTERY
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              SKILLS & EXPERTISE
            </h2>
          </div>
          <p className="font-editorial text-sm text-mist max-w-md">
            Architectural depth spanning distributed server execution, GPU fragment shaders, film-grade post-production, and autonomous AI systems.
          </p>
        </div>

        {/* 4 Quadrant Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((group) => {
            const isActive = group.id === activeTab;
            return (
              <button
                key={group.id}
                onClick={() => {
                  playClick();
                  setActiveTab(group.id);
                }}
                onMouseEnter={() => playHover()}
                data-cursor="pointer"
                className={`matrix-tab-btn flex flex-col text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? "bg-surface-200 border-accent shadow-[0_0_30px_rgba(229,169,60,0.15)]"
                    : "bg-surface-300/40 border-white/[0.08] hover:border-white/20 hover:bg-surface-200/50"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="font-mono text-xs text-mist group-hover:text-accent transition-colors">
                    // {group.number}
                  </span>
                  <div
                    className="p-2 rounded-lg border border-white/10"
                    style={{ color: group.accent }}
                  >
                    {iconMap[group.iconName]}
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-accent transition-colors">
                  {group.title}
                </h3>
                <p className="font-sans text-xs text-mist line-clamp-2">
                  {group.subtitle}
                </p>

                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: group.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Quadrant In-Depth Blueprint */}
        <div className="rounded-3xl border border-white/10 bg-surface-300/60 backdrop-blur-xl p-6 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Narrative Overview */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div>
                <span
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border mb-3 inline-block"
                  style={{
                    color: currentGroup.accent,
                    borderColor: `${currentGroup.accent}40`,
                    backgroundColor: `${currentGroup.accent}15`,
                  }}
                >
                  DISCIPLINE // {currentGroup.number}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  {currentGroup.title}
                </h3>
                <p className="font-editorial text-base text-foreground/80 mt-3 leading-relaxed">
                  {currentGroup.description}
                </p>
              </div>

              {/* Core Competency Tags */}
              <div className="pt-4 border-t border-white/[0.08]">
                <span className="font-mono text-xs uppercase tracking-widest text-mist block mb-3">
                  CORE COMPETENCY DOMAINS
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentGroup.disciplines.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-foreground/90"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Detailed Tool Matrix */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGroup.skills.map((skill, idx) => (
                <CardSpotlight
                  key={idx}
                  className={`p-5 rounded-xl border ${
                    skill.highlight
                      ? "border-accent/30 bg-surface-200/90"
                      : "border-white/[0.06] bg-surface-300/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-sm sm:text-base text-white">
                      {skill.name}
                    </h4>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${currentGroup.accent}20`,
                        color: currentGroup.accent,
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-mist leading-relaxed">
                    {skill.description}
                  </p>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
