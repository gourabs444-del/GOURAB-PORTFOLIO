"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface WordItem {
  text: string;
  isItalic?: boolean;
  isAccent?: boolean;
}

const manifestoParagraphs: WordItem[][] = [
  // Statement 1: Vision & Craft
  [
    { text: "I" },
    { text: "forge" },
    { text: "digital" },
    { text: "experiences" },
    { text: "where" },
    { text: "precision" },
    { text: "engineering" },
    { text: "converges" },
    { text: "with" },
    { text: "cinematic", isItalic: true, isAccent: true },
    { text: "art", isItalic: true, isAccent: true },
    { text: "direction.", isItalic: true, isAccent: true },
    { text: "Every" },
    { text: "interface" },
    { text: "is" },
    { text: "sculpted" },
    { text: "with" },
    { text: "obsessive" },
    { text: "craft," },
    { text: "tactile" },
    { text: "physics," },
    { text: "and" },
    { text: "soul.", isItalic: true, isAccent: true },
  ],
  // Statement 2: Execution & Impact
  [
    { text: "From" },
    { text: "bespoke" },
    { text: "WebGL" },
    { text: "architectures" },
    { text: "to" },
    { text: "intelligent", isItalic: true, isAccent: true },
    { text: "AI", isItalic: true, isAccent: true },
    { text: "ecosystems,", isItalic: true, isAccent: true },
    { text: "I" },
    { text: "transform" },
    { text: "ambitious" },
    { text: "visions" },
    { text: "into" },
    { text: "high-performance," },
    { text: "future-proof" },
    { text: "digital", isItalic: true, isAccent: true },
    { text: "realities", isItalic: true, isAccent: true },
    { text: "that" },
    { text: "command" },
    { text: "attention.", isItalic: true, isAccent: true },
  ],
];

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
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

  // 2. Sequential Word-by-Word Wave Reveal on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current?.querySelectorAll(".manifesto-paragraph");
      if (!paragraphs) return;

      paragraphs.forEach((paragraph) => {
        const words = paragraph.querySelectorAll(".manifesto-word-inner");
        if (!words || words.length === 0) return;

        // Wave scroll reveal: words trigger sequentially one after another as user scrolls
        gsap.fromTo(
          words,
          {
            opacity: 0.12,
            y: 32,
            rotateX: -35,
            scale: 0.9,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: {
              each: 0.06,
              ease: "power1.out",
            },
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 82%",
              end: "bottom 38%",
              scrub: 0.7,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Interactive Word Pop on Hover
  const handleWordHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    playHover();
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 1.12,
      y: -4,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleWordLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 1.0,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Interactive Cursor Spotlight Aura */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12)_0%,_rgba(14,165,233,0.03)_45%,_transparent_70%)] blur-[120px] will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Top Tag Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-white font-semibold">01 // MANIFESTO</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline font-mono">PHILOSOPHY &amp; CRAFT</span>
      </div>

      {/* Main Centered Spacious Manifesto Statements (Sequential Wave Scroll Reveal) */}
      <div
        style={{ perspective: "1400px" }}
        className="max-w-6xl mx-auto w-full my-auto py-16 sm:py-24 md:py-32 flex flex-col gap-24 sm:gap-32 md:gap-40 text-left sm:text-center relative z-10"
      >
        {manifestoParagraphs.map((paragraph, pIdx) => (
          <p
            key={pIdx}
            className="manifesto-paragraph text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] leading-[1.8] sm:leading-[1.9] md:leading-[2.0] tracking-normal font-light text-neutral-200"
          >
            {paragraph.map((item, wIdx) => {
              const fontClasses = item.isItalic
                ? "font-serif italic font-normal"
                : "font-sans font-light";

              const colorClass = item.isAccent
                ? "text-sky-400 font-normal drop-shadow-[0_0_18px_rgba(56,189,248,0.3)]"
                : "text-[#EDEDEF]";

              return (
                <span
                  key={wIdx}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                  className="inline-block mr-[0.38em] sm:mr-[0.45em] mb-1.5 align-baseline"
                >
                  <span
                    onMouseEnter={handleWordHover}
                    onMouseLeave={handleWordLeave}
                    className={`manifesto-word-inner inline-block will-change-transform cursor-pointer origin-bottom transition-colors duration-200 ${fontClasses} ${colorClass}`}
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
      <div className="max-w-6xl mx-auto w-full pb-2 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest relative z-10">
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

