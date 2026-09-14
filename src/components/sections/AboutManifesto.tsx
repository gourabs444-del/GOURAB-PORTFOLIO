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
      className="relative min-h-screen w-full flex flex-col justify-center py-32 sm:py-44 md:py-52 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none"
    >
      {/* Soft Ambient Radial Backlight */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px] h-[350px] sm:h-[500px] bg-radial-gradient from-white/[0.03] via-transparent to-transparent blur-[160px] opacity-70 -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-14 sm:gap-20">
        {/* Minimal Clean Top Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <span className="text-neutral-300 font-medium">01 // MANIFESTO</span>
          <span className="text-neutral-700">/</span>
          <span>THE PHILOSOPHY</span>
        </div>

        {/* Minimal, Easy-to-Read, Well-Spaced Statement */}
        <div ref={textContainerRef} className="w-full flex flex-col gap-8 sm:gap-12">
          <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.65] sm:leading-[1.6] tracking-tight font-normal text-neutral-400">
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-white font-semibold">
              Hey, I&apos;m Gourab.
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-neutral-300">
              I operate at the frontier where
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-white font-medium">
              high-throughput architecture
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-neutral-300">
              converges with
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-white font-medium">
              cinematic art direction.
            </span>
          </p>

          <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.65] sm:leading-[1.6] tracking-tight font-normal text-neutral-400">
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-neutral-300">
              I engineer bespoke digital experiences,
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-white font-medium">
              interactive shaders,
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-neutral-300">
              editorial motion, and
            </span>
            <span className="scrub-word inline-block mr-2 sm:mr-2.5 text-white font-medium">
              intelligent AI systems
            </span>
            <span className="scrub-word inline-block text-neutral-300">
              designed to leave an indelible impression.
            </span>
          </p>
        </div>

        {/* Minimal Clean Bottom Meta */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span>FULL-STACK ARCHITECTURE</span>
            <span className="text-neutral-700">•</span>
            <span>CREATIVE SHADERS</span>
            <span className="text-neutral-700">•</span>
            <span>AI SYSTEMS</span>
          </div>
          <span className="text-neutral-400 font-medium">EDITION 2026</span>
        </div>
      </div>
    </section>
  );
}
