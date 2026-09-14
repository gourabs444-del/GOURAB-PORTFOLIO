"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export function AboutManifesto() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".scrub-word");
      if (!words || words.length === 0) return;

      // Smooth progressive word lighting on scroll
      gsap.fromTo(
        words,
        {
          opacity: 0.15,
          y: 6,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-32 md:py-48 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none"
    >
      {/* Soft Ambient Radial Backlight */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px] h-[350px] sm:h-[500px] bg-radial-gradient from-amber-500/10 via-cyan-500/5 to-transparent blur-[160px] opacity-70 -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
        {/* Subtle Top Label */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-neutral-400 font-medium">01 // MANIFESTO</span>
          <span className="text-neutral-700">/</span>
          <span>THE PHILOSOPHY</span>
        </div>

        {/* Spacious, Clean, High-End Editorial Typography */}
        <div ref={textContainerRef} className="w-full">
          <p className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.28] sm:leading-[1.26] tracking-tight text-neutral-400 font-light">
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 text-neutral-300">
              Hey, I&apos;m
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 font-display font-extrabold text-white tracking-tight">
              Gourab.
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 text-neutral-300">
              I operate at the frontier where
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-white font-normal underline decoration-amber-400/50 underline-offset-8">
              high-throughput architecture
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 text-neutral-300">
              converges with
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 font-display font-extrabold text-amber-400 tracking-tight">
              Cinematic Art Direction.
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 text-neutral-300">
              I engineer bespoke digital experiences,
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium tracking-wide">
              interactive shaders,
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 text-neutral-300">
              editorial motion, and
            </span>
            <span className="scrub-word inline-block mr-2.5 sm:mr-3 font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-amber-300 font-normal">
              intelligent AI systems
            </span>
            <span className="scrub-word inline-block text-neutral-400 font-light">
              designed to leave an indelible impression.
            </span>
          </p>
        </div>

        {/* Minimal Bottom Footnote */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <span>FULL-STACK ARCHITECTURE • CREATIVE SHADERS • AI SYSTEMS</span>
          <span className="text-amber-400/80 font-medium">EDITION 2026</span>
        </div>
      </div>
    </section>
  );
}
