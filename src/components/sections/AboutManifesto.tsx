"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

const manifestoParagraphs = [
  {
    text: "Hey, I'm Gourab. I operate at the intersection of high-performance engineering and cinematic digital design.",
    highlight: ["Gourab.", "high-performance", "engineering", "cinematic", "digital", "design."],
  },
  {
    text: "I build bespoke web applications, interactive WebGL shaders, seamless motion systems, and intelligent digital products designed to leave a lasting impression.",
    highlight: ["bespoke", "web", "applications,", "WebGL", "shaders,", "motion", "systems,", "lasting", "impression."],
  },
];

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".manifesto-word");
      if (!words || words.length === 0) return;

      // Smooth progressive word lighting on scroll
      gsap.fromTo(
        words,
        {
          opacity: 0.2,
          color: "#52525b",
          y: 4,
        },
        {
          opacity: 1,
          color: "#ffffff",
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            end: "bottom 30%",
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
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 md:py-36 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none"
    >
      {/* Centered Ambient Violet Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] md:w-[1100px] h-[300px] sm:h-[450px] bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.12)_0%,_rgba(88,28,135,0.05)_40%,_transparent_70%)] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Tag Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-widest pt-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-neutral-300 font-semibold">01 // MANIFESTO</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">THE CORE PHILOSOPHY</span>
      </div>

      {/* Main Centered Spacious Manifesto Statement */}
      <div ref={contentRef} className="max-w-5xl mx-auto w-full my-auto py-12 sm:py-16 flex flex-col gap-10 sm:gap-14 text-left sm:text-center">
        {manifestoParagraphs.map((paragraph, pIdx) => {
          const wordsList = paragraph.text.split(" ");
          return (
            <p
              key={pIdx}
              className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.55] sm:leading-[1.5] tracking-tight font-normal"
            >
              {wordsList.map((word, wIdx) => {
                const isHighlight = paragraph.highlight.includes(word);
                return (
                  <span
                    key={wIdx}
                    className={`manifesto-word inline-block mr-2 sm:mr-3 transition-colors duration-200 ${
                      isHighlight ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      {/* Bottom Meta Bar */}
      <div className="max-w-5xl mx-auto w-full pb-4 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span>FULL-STACK ARCHITECTURE</span>
          <span className="text-neutral-700">•</span>
          <span>INTERACTIVE 3D &amp; SHADERS</span>
          <span className="text-neutral-700">•</span>
          <span>SYSTEMS DIRECTION</span>
        </div>
        <span className="text-neutral-400 font-medium">EDITION 2026</span>
      </div>
    </section>
  );
}
