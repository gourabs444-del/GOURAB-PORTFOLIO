"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Sparkles } from "lucide-react";

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  // 1. Subtle, gentle ambient glow following mouse with dampening
  useEffect(() => {
    const container = containerRef.current;
    const aura = auraRef.current;
    if (!container || !aura) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(aura, {
        x: x,
        y: y,
        duration: 1.4,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. High-End Progressive Scroll Text Illumination (Awwwards Grade)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = contentRef.current?.querySelectorAll(".manifesto-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        {
          opacity: 0.15,
          y: 8,
          filter: "blur(3px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper function to split text smoothly into animated words
  const renderAnimatedWords = (text: string, className = "") => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`manifesto-word inline-block mr-[0.24em] transition-colors duration-200 will-change-[transform,opacity,filter] ${className}`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col justify-between py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Gentle Ambient Dark Atmosphere */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12)_0%,_rgba(30,41,59,0.04)_45%,_transparent_70%)] blur-[100px] will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Top Monospace Tag Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
          <span className="text-white font-medium tracking-wider">01 // MANIFESTO</span>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-400">VISION &amp; PHILOSOPHY</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-400 font-mono text-[11px] tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-400/80" />
          <span>BESPOKE ENGINEERING</span>
        </div>
      </div>

      {/* Main Editorial Statement with Progressive Scroll Illumination */}
      <div
        ref={contentRef}
        className="max-w-4xl lg:max-w-5xl mx-auto w-full my-auto py-16 sm:py-20 md:py-28 flex flex-col gap-12 sm:gap-16 text-left sm:text-center relative z-10"
      >
        {/* Paragraph 1: Vision */}
        <p className="font-sans font-light text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.9rem] leading-[1.6] sm:leading-[1.65] md:leading-[1.7] tracking-[-0.02em] text-neutral-300">
          {renderAnimatedWords("I forge digital experiences where", "text-neutral-300 font-light")}
          {renderAnimatedWords("precision engineering", "text-white font-semibold")}
          {renderAnimatedWords("converges with", "text-neutral-300 font-light")}
          {renderAnimatedWords("cinematic art direction.", "font-serif italic font-normal text-sky-300")}
          {renderAnimatedWords("Every interface is sculpted with", "text-neutral-300 font-light")}
          {renderAnimatedWords("obsessive craft,", "text-white font-semibold")}
          {renderAnimatedWords("tactile physics,", "text-white font-medium")}
          {renderAnimatedWords("and soul.", "font-serif italic font-normal text-sky-300")}
        </p>

        {/* Minimal Subtle Hairline */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent mx-auto" />

        {/* Paragraph 2: Execution */}
        <p className="font-sans font-light text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.9rem] leading-[1.6] sm:leading-[1.65] md:leading-[1.7] tracking-[-0.02em] text-neutral-300">
          {renderAnimatedWords("From", "text-neutral-300 font-light")}
          {renderAnimatedWords("bespoke WebGL architectures", "font-serif italic font-normal text-sky-300")}
          {renderAnimatedWords("to", "text-neutral-300 font-light")}
          {renderAnimatedWords("intelligent AI systems,", "text-white font-semibold")}
          {renderAnimatedWords("I transform ambitious visions into", "text-neutral-300 font-light")}
          {renderAnimatedWords("high-performance,", "text-neutral-200 font-medium")}
          {renderAnimatedWords("future-proof realities", "text-white font-semibold")}
          {renderAnimatedWords("that command attention.", "font-serif italic font-normal text-sky-300")}
        </p>
      </div>

      {/* Bottom Meta Bar */}
      <div className="max-w-5xl mx-auto w-full pb-2 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest relative z-10">
        <div className="flex items-center gap-3">
          <span>FULL-STACK ARCHITECTURE</span>
          <span className="text-white/20">•</span>
          <span className="text-neutral-300 font-medium">INTERACTIVE 3D &amp; MOTION</span>
          <span className="text-white/20">•</span>
          <span>AI SYSTEMS</span>
        </div>
        <span className="text-neutral-400 font-medium tracking-widest">EDITION 2026</span>
      </div>
    </section>
  );
}

