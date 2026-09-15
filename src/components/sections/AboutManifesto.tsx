"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface WordItem {
  text: string;
  isItalic?: boolean;
  isSky?: boolean;
  isBold?: boolean;
}

const manifestoParagraphs: WordItem[][] = [
  // Statement 1: Vision & Philosophy
  [
    { text: "I" },
    { text: "forge" },
    { text: "digital", isBold: true },
    { text: "experiences", isBold: true },
    { text: "where" },
    { text: "precision", isSky: true, isBold: true },
    { text: "engineering", isSky: true, isBold: true },
    { text: "converges" },
    { text: "with" },
    { text: "cinematic", isItalic: true, isSky: true },
    { text: "art", isItalic: true, isSky: true },
    { text: "direction.", isItalic: true, isSky: true },
    { text: "Every" },
    { text: "interface" },
    { text: "is" },
    { text: "built" },
    { text: "with" },
    { text: "obsessive", isBold: true },
    { text: "craft,", isBold: true },
    { text: "sculpted", isItalic: true },
    { text: "motion,", isSky: true, isBold: true },
    { text: "and" },
    { text: "tactile", isItalic: true, isSky: true },
    { text: "micro-physics.", isItalic: true, isSky: true },
  ],
  // Statement 2: Execution & Impact
  [
    { text: "From" },
    { text: "bespoke", isItalic: true, isSky: true },
    { text: "WebGL", isSky: true, isBold: true },
    { text: "architectures", isSky: true, isBold: true },
    { text: "to" },
    { text: "intelligent", isBold: true },
    { text: "AI", isBold: true },
    { text: "ecosystems,", isBold: true },
    { text: "I" },
    { text: "transform" },
    { text: "ambitious", isItalic: true },
    { text: "visions" },
    { text: "into" },
    { text: "high-performance,", isSky: true, isBold: true },
    { text: "future-proof", isSky: true, isBold: true },
    { text: "digital", isBold: true },
    { text: "realities", isBold: true },
    { text: "that" },
    { text: "command", isItalic: true },
    { text: "attention.", isItalic: true, isSky: true },
  ],
];

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  // 1. Interactive Cursor Light Follower
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
        duration: 0.9,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. High-Grade 3D Elastic Pop-Up Animation on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".manifesto-word-inner");
      if (!words || words.length === 0) return;

      // 3D Kinetic Pop-Up Motion
      gsap.fromTo(
        words,
        {
          opacity: 0.1,
          scale: 0.45,
          y: 45,
          rotateX: -55,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1.0,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          stagger: 0.04,
          ease: "back.out(2.2)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 76%",
            end: "bottom 38%",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Interactive Word Pop on Hover
  const handleWordHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    playHover();
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 1.18,
      y: -5,
      rotateZ: -2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleWordLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 1.0,
      y: 0,
      rotateZ: 0,
      duration: 0.5,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Interactive Cursor Spotlight Aura */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.16)_0%,_rgba(14,165,233,0.05)_45%,_transparent_70%)] blur-[110px] will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Top Tag Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-white font-semibold">01 // MANIFESTO</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline font-mono">PHILOSOPHY &amp; CRAFT</span>
      </div>

      {/* Main Centered Spacious Manifesto Statement (3D Kinetic Pop-Up Words) */}
      <div
        ref={contentRef}
        style={{ perspective: "1200px" }}
        className="max-w-5xl mx-auto w-full my-auto py-12 sm:py-16 md:py-20 flex flex-col gap-12 sm:gap-16 md:gap-20 text-left sm:text-center relative z-10"
      >
        {manifestoParagraphs.map((paragraph, pIdx) => (
          <p
            key={pIdx}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.7] sm:leading-[1.75] md:leading-[1.8] tracking-tight font-normal text-neutral-300"
          >
            {paragraph.map((item, wIdx) => {
              const fontClasses = item.isItalic
                ? "font-serif italic font-normal"
                : item.isBold
                ? "font-sans font-semibold text-white"
                : "font-sans font-normal text-neutral-300";

              const colorClass = item.isSky
                ? "text-sky-400 drop-shadow-[0_0_22px_rgba(56,189,248,0.35)]"
                : "";

              return (
                <span
                  key={wIdx}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                  className="inline-block mr-2 sm:mr-3.5 align-baseline"
                >
                  <span
                    onMouseEnter={handleWordHover}
                    onMouseLeave={handleWordLeave}
                    className={`manifesto-word-inner inline-block will-change-transform cursor-pointer origin-bottom ${fontClasses} ${colorClass}`}
                  >
                    {item.text}
                  </span>
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {/* Bottom Meta Bar */}
      <div className="max-w-5xl mx-auto w-full pb-4 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest relative z-10">
        <div className="flex items-center gap-3">
          <span>FULL-STACK ARCHITECTURE</span>
          <span className="text-white/20">•</span>
          <span className="text-sky-400 font-semibold">INTERACTIVE 3D &amp; MOTION</span>
          <span className="text-white/20">•</span>
          <span>AI SYSTEMS</span>
        </div>
        <span className="text-white font-medium">EDITION 2026</span>
      </div>
    </section>
  );
}
