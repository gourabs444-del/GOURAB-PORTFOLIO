"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

interface WordItem {
  text: string;
  style: string;
  isSky?: boolean;
}

const manifestoSegments: WordItem[][] = [
  // Paragraph 1
  [
    { text: "Hey,", style: "font-sans font-normal text-neutral-400" },
    { text: "I'm", style: "font-sans font-normal text-neutral-400" },
    { text: "Gourab.", style: "font-serif italic font-bold text-sky-400 text-3xl sm:text-4xl md:text-5xl", isSky: true },
    { text: "I", style: "font-sans font-normal text-white" },
    { text: "operate", style: "font-sans font-normal text-white" },
    { text: "at", style: "font-sans font-normal text-white" },
    { text: "the", style: "font-sans font-normal text-white" },
    { text: "intersection", style: "font-sans font-normal text-white" },
    { text: "of", style: "font-sans font-normal text-white" },
    { text: "high-performance", style: "font-display font-black tracking-tight text-sky-300 uppercase", isSky: true },
    { text: "engineering", style: "font-mono font-bold text-sky-400 tracking-wider", isSky: true },
    { text: "and", style: "font-sans font-normal text-neutral-400" },
    { text: "cinematic", style: "font-serif italic font-normal text-sky-300", isSky: true },
    { text: "digital", style: "font-display font-extrabold text-white" },
    { text: "design.", style: "font-display font-extrabold text-white" },
  ],
  // Paragraph 2
  [
    { text: "I", style: "font-sans font-normal text-neutral-300" },
    { text: "build", style: "font-sans font-normal text-neutral-300" },
    { text: "bespoke", style: "font-serif italic font-bold text-sky-400", isSky: true },
    { text: "web", style: "font-display font-bold text-white" },
    { text: "applications,", style: "font-display font-bold text-white" },
    { text: "interactive", style: "font-sans font-normal text-neutral-300" },
    { text: "WebGL", style: "font-mono font-black text-sky-300 tracking-wider", isSky: true },
    { text: "shaders,", style: "font-serif italic font-semibold text-sky-400", isSky: true },
    { text: "seamless", style: "font-sans font-light text-neutral-400" },
    { text: "motion", style: "font-display font-black text-sky-300 uppercase", isSky: true },
    { text: "systems,", style: "font-display font-black text-sky-300 uppercase", isSky: true },
    { text: "and", style: "font-sans font-normal text-neutral-400" },
    { text: "intelligent", style: "font-sans font-medium text-white" },
    { text: "digital", style: "font-sans font-medium text-white" },
    { text: "products", style: "font-sans font-medium text-white" },
    { text: "designed", style: "font-sans font-normal text-neutral-400" },
    { text: "to", style: "font-sans font-normal text-neutral-400" },
    { text: "leave", style: "font-sans font-normal text-neutral-400" },
    { text: "a", style: "font-sans font-normal text-neutral-400" },
    { text: "lasting", style: "font-serif italic font-bold text-sky-400", isSky: true },
    { text: "impression.", style: "font-serif italic font-bold text-sky-400", isSky: true },
  ],
];

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".manifesto-word");
      if (!words || words.length === 0) return;

      // Kinetic Pop-Up animation scrubbed smoothly to scroll without disappearing
      gsap.fromTo(
        words,
        {
          opacity: 0.25,
          y: 18,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1.0,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 78%",
            end: "bottom 40%",
            scrub: 1,
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
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 md:py-36 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Centered Ambient Sky Blue Glow on Dark Base */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px] h-[350px] sm:h-[500px] bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.14)_0%,_rgba(56,189,248,0.04)_45%,_transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      {/* Top Tag Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-white font-semibold">01 // MANIFESTO</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline font-mono">THE CORE PHILOSOPHY</span>
      </div>

      {/* Main Centered Spacious Manifesto Statement */}
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto w-full my-auto py-12 sm:py-16 flex flex-col gap-10 sm:gap-14 md:gap-18 text-left sm:text-center"
      >
        {manifestoSegments.map((segment, pIdx) => (
          <p
            key={pIdx}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.85] sm:leading-[1.8] md:leading-[1.85] lg:leading-[1.9] tracking-tight"
          >
            {segment.map((item, wIdx) => (
              <span
                key={wIdx}
                className={`manifesto-word inline-block mr-2 sm:mr-3.5 transition-all duration-200 ${item.style}`}
              >
                {item.text}
              </span>
            ))}
          </p>
        ))}
      </div>

      {/* Bottom Meta Bar */}
      <div className="max-w-5xl mx-auto w-full pb-4 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span>FULL-STACK ARCHITECTURE</span>
          <span className="text-white/20">•</span>
          <span className="text-sky-400 font-semibold">INTERACTIVE 3D &amp; SHADERS</span>
          <span className="text-white/20">•</span>
          <span>SYSTEMS DIRECTION</span>
        </div>
        <span className="text-white font-medium">EDITION 2026</span>
      </div>
    </section>
  );
}
