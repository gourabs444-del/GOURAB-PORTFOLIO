"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Sparkles, Terminal } from "lucide-react";

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const p1Ref = useRef<HTMLParagraphElement | null>(null);
  const p2Ref = useRef<HTMLParagraphElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  // 1. Smooth ambient cursor aura with dampening
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
        duration: 1.2,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Advanced Word-by-Word Crisp Luminous Scroll Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Paragraph 1 words
      const p1Words = p1Ref.current?.querySelectorAll(".word-reveal");
      if (p1Words && p1Words.length > 0) {
        gsap.fromTo(
          p1Words,
          {
            opacity: 0.18,
            y: 12,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p1Ref.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 0.6,
            },
          }
        );
      }

      // Animate Paragraph 2 words
      const p2Words = p2Ref.current?.querySelectorAll(".word-reveal");
      if (p2Words && p2Words.length > 0) {
        gsap.fromTo(
          p2Words,
          {
            opacity: 0.18,
            y: 12,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p2Ref.current,
              start: "top 82%",
              end: "bottom 52%",
              scrub: 0.6,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split string into animated words with individual tags
  const renderWords = (text: string, className = "") => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word-reveal inline-block mr-[0.26em] transition-all duration-300 will-change-transform ${className}`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col justify-between pt-20 sm:pt-28 md:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#040407] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Dynamic Cursor Light Aura Follower */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute -top-[250px] -left-[250px] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08)_0%,_rgba(245,158,11,0.03)_40%,_transparent_70%)] blur-[100px] will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Top Monospace Tag Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-2 relative z-10">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
          <span className="text-white font-semibold">01 // MANIFESTO</span>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-400">VISION &amp; PHILOSOPHY</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-400 font-mono text-[11px] tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-400/80" />
          <span>BESPOKE ENGINEERING &bull; 2026</span>
        </div>
      </div>

      {/* Main Editorial Statement with High-Definition Word-by-Word Scroll Reveal */}
      <div
        ref={contentRef}
        className="max-w-4xl lg:max-w-5xl mx-auto w-full my-auto py-16 sm:py-20 md:py-24 flex flex-col gap-12 sm:gap-16 text-left sm:text-center relative z-10"
      >
        {/* Paragraph 1: Vision */}
        <p
          ref={p1Ref}
          className="font-sans font-light text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.9rem] leading-[1.6] sm:leading-[1.65] md:leading-[1.7] tracking-[-0.02em] text-neutral-300"
        >
          {renderWords("I forge digital experiences where", "text-neutral-300 font-light")}
          {renderWords("precision engineering", "text-white font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]")}
          {renderWords("converges with", "text-neutral-300 font-light")}
          {renderWords("cinematic art direction.", "font-bodoni italic font-normal bg-gradient-to-r from-sky-200 via-sky-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]")}
          {renderWords("Every interface is sculpted with", "text-neutral-300 font-light")}
          {renderWords("obsessive craft,", "text-white font-bold")}
          {renderWords("tactile physics,", "text-white font-semibold")}
          {renderWords("and soul.", "font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]")}
        </p>

        {/* Minimal Subtle Illuminated Hairline Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent mx-auto" />

        {/* Paragraph 2: Execution */}
        <p
          ref={p2Ref}
          className="font-sans font-light text-2xl xs:text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.9rem] leading-[1.6] sm:leading-[1.65] md:leading-[1.7] tracking-[-0.02em] text-neutral-300"
        >
          {renderWords("From", "text-neutral-300 font-light")}
          {renderWords("bespoke WebGL architectures", "font-bodoni italic font-normal bg-gradient-to-r from-sky-200 via-sky-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]")}
          {renderWords("to", "text-neutral-300 font-light")}
          {renderWords("intelligent AI systems,", "text-white font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]")}
          {renderWords("I transform ambitious visions into", "text-neutral-300 font-light")}
          {renderWords("high-performance,", "text-neutral-200 font-medium")}
          {renderWords("future-proof realities", "text-white font-bold")}
          {renderWords("that command attention.", "font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]")}
        </p>
      </div>

      {/* Bottom Meta Bar */}
      <div className="max-w-5xl mx-auto w-full pb-2 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest relative z-10">
        <div className="flex items-center gap-3">
          <span>FULL-STACK ARCHITECTURE</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-neutral-300 font-medium">INTERACTIVE 3D &amp; MOTION</span>
          <span className="text-white/20">&bull;</span>
          <span>AI SYSTEMS</span>
        </div>
        <span className="text-neutral-400 font-medium tracking-widest">EDITION 2026</span>
      </div>
    </section>
  );
}


