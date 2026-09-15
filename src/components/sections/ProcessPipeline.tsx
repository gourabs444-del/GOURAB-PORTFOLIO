"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { processSteps } from "@/data/experience";

// Distinct minimalist color accents for each pipeline phase
const phaseAccents = [
  { color: "#F59E0B", label: "PHASE 01 // DISCOVERY", glow: "rgba(245, 158, 11, 0.15)" },
  { color: "#38BDF8", label: "PHASE 02 // ART DIRECTION", glow: "rgba(56, 189, 248, 0.15)" },
  { color: "#A855F7", label: "PHASE 03 // ENGINEERING", glow: "rgba(168, 85, 247, 0.15)" },
  { color: "#F43F5E", label: "PHASE 04 // POLISH & AUDIO", glow: "rgba(244, 63, 94, 0.15)" },
  { color: "#10B981", label: "PHASE 05 // DEPLOYMENT", glow: "rgba(16, 185, 129, 0.15)" },
];

export function ProcessPipeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = containerRef.current?.querySelectorAll(".process-step-row");

      stepElements?.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentAccent = phaseAccents[activeStepIndex] || phaseAccents[0];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none"
    >
      {/* Dynamic ambient background glow tuned to current phase */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-[160px] pointer-events-none rounded-full transition-colors duration-700 opacity-20"
        style={{ backgroundColor: currentAccent.color }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
              <span
                className="w-2 h-2 rounded-full transition-colors duration-500 animate-pulse"
                style={{ backgroundColor: currentAccent.color }}
              />
              <span className="text-neutral-300 font-semibold">05 // METHODOLOGY</span>
              <span className="text-neutral-600">/</span>
              <span>PRECISION PIPELINE</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              EXECUTION PIPELINE
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span
              className="font-bold transition-colors duration-500 tracking-wider"
              style={{ color: currentAccent.color }}
            >
              {currentAccent.label}
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400">FIVE-PHASE BLUEPRINT</span>
          </div>
        </div>

        {/* Steps Stack (Clean, Open Editorial Timeline - No Clunky Boxes) */}
        <div className="relative flex flex-col">
          {processSteps.map((step, index) => {
            const isActive = index === activeStepIndex;
            const isPast = index < activeStepIndex;
            const accent = phaseAccents[index] || phaseAccents[0];

            return (
              <div
                key={step.step}
                className={`process-step-row group transition-all duration-500 py-12 sm:py-16 md:py-20 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start ${
                  isActive
                    ? "opacity-100"
                    : isPast
                    ? "opacity-50 hover:opacity-80"
                    : "opacity-35 hover:opacity-70"
                }`}
              >
                {/* Left Column: Number + Phase Timeline Meta */}
                <div className="lg:col-span-4 flex flex-row lg:flex-col items-baseline lg:items-start justify-between lg:justify-start gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-display font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter transition-all duration-500 leading-none"
                      style={{
                        color: isActive ? accent.color : "#3A3A42",
                        textShadow: isActive ? `0 0 30px ${accent.color}40` : "none",
                      }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span
                      className="font-semibold transition-colors duration-300 uppercase tracking-wider"
                      style={{ color: isActive ? accent.color : "#71717A" }}
                    >
                      {step.duration}
                    </span>
                    <span className="text-neutral-700">•</span>
                    <span className="text-neutral-500 uppercase tracking-widest text-[11px]">
                      STAGE {index + 1}
                    </span>
                  </div>
                </div>

                {/* Right Column: Title, Subtitle, Narrative & Clean Deliverables */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div>
                    <h3
                      className={`font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-sans text-sm sm:text-base font-medium mt-2 transition-colors duration-300"
                      style={{ color: isActive ? accent.color : "#A1A1AA" }}
                    >
                      {step.subtitle}
                    </p>
                    <p className="font-sans text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Clean Minimalist Deliverables List (No Box/Capsule Clutter) */}
                  <div className="pt-6 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-3 font-semibold">
                      KEY DELIVERABLES &amp; ARTIFACTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8">
                      {step.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs font-mono text-neutral-300"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full transition-colors duration-300 shrink-0"
                            style={{
                              backgroundColor: isActive ? accent.color : "#52525B",
                            }}
                          />
                          <span className={isActive ? "text-neutral-200" : "text-neutral-500"}>
                            {item}
                          </span>
                        </div>
                      ))}
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

