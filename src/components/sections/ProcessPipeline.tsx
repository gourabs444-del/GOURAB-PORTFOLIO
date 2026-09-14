"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { processSteps } from "@/data/experience";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";

export function ProcessPipeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = containerRef.current?.querySelectorAll(".process-step-row");

      stepElements?.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-28 md:py-40 px-6 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-accent">05 // THE METHODOLOGY</span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-mist">
                HOW I ARCHITECT & DELIVER
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              EXECUTION PIPELINE
            </h2>
          </div>
          <span className="font-mono text-xs text-mist/70">
            [ FIVE-PHASE PRECISION BLUEPRINT ]
          </span>
        </div>

        {/* Steps Stack */}
        <div className="relative flex flex-col gap-12 md:gap-16">
          {/* Vertical Laser Progress Line (Desktop) */}
          <div
            className="hidden lg:block absolute left-[120px] top-4 bottom-4 w-[2px] bg-white/[0.06] pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-full bg-gradient-to-b from-accent via-accent to-emerald-400 transition-all duration-500 shadow-[0_0_12px_rgba(229,169,60,0.8)]"
              style={{
                height: `${((activeStepIndex + 1) / processSteps.length) * 100}%`,
              }}
            />
          </div>

          {processSteps.map((step, index) => {
            const isActive = index === activeStepIndex;
            const isPast = index < activeStepIndex;

            return (
              <div
                key={step.step}
                className={`process-step-row group transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-6 md:p-10 rounded-3xl border ${
                  isActive
                    ? "bg-surface-200/90 border-accent/40 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                    : isPast
                    ? "bg-surface-300/30 border-white/[0.04] opacity-70"
                    : "bg-surface-300/20 border-white/[0.04] opacity-50"
                }`}
              >
                {/* Step Number + Timeline Marker */}
                <div className="lg:col-span-3 flex items-center lg:flex-col lg:items-start justify-between lg:justify-start gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-display font-extrabold text-4xl md:text-5xl tracking-tighter transition-colors ${
                        isActive ? "text-accent" : "text-mist/40"
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="font-mono text-xs text-white/20 lg:hidden">/</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-mist">
                    <Clock className="w-3 h-3 text-accent" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                {/* Main Step Detail */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                  <div>
                    <h3
                      className={`font-display font-bold text-2xl md:text-3xl tracking-tight transition-colors ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="font-editorial text-base text-accent font-medium mt-1">
                      {step.subtitle}
                    </p>
                    <p className="font-sans text-sm md:text-base text-mist mt-3 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables tags */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-mist/80 block mb-3">
                      KEY DELIVERABLES & ARTIFACTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {step.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-mono text-foreground/80"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${
                              isActive ? "text-accent" : "text-mist/50"
                            }`}
                          />
                          <span>{item}</span>
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
