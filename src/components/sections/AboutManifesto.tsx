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
  const p3Ref = useRef<HTMLParagraphElement | null>(null);
  const p4Ref = useRef<HTMLParagraphElement | null>(null);
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
      [p1Ref, p2Ref, p3Ref, p4Ref].forEach((ref) => {
        if (!ref.current) return;
        const words = ref.current.querySelectorAll(".word-reveal");
        if (words && words.length > 0) {
          gsap.fromTo(
            words,
            {
              opacity: 0.18,
              y: 8,
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 88%",
                end: "bottom 60%",
                scrub: 0.5,
              },
            }
          );
        }
      });
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
      className="relative min-h-[85vh] w-full flex flex-col justify-between pt-16 sm:pt-24 md:pt-28 pb-20 sm:pb-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#040407] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Dynamic Cursor Light Aura Follower */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute -top-[250px] -left-[250px] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08)_0%,_rgba(245,158,11,0.03)_40%,_transparent_70%)] blur-[100px] will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Top Tag Header - Clean white highlighted text without 01 // */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-start text-xs font-mono uppercase tracking-widest pt-2 relative z-10">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          <span className="text-white font-bold tracking-[0.2em] text-xs sm:text-sm font-mono uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
            A LITTLE ABOUT ME
          </span>
        </div>
      </div>

      {/* Main Editorial Statement with Crisp Tiny Clean Text */}
      <div
        ref={contentRef}
        className="max-w-3xl lg:max-w-4xl mx-auto w-full my-auto py-10 sm:py-14 md:py-16 flex flex-col gap-8 sm:gap-10 text-left relative z-10"
      >
        {/* Main Headline & Title Group */}
        <div className="flex flex-col gap-2.5">
          <h2 className="font-sans font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            Hello, I&apos;m Gourab
          </h2>
          <p className="font-bodoni italic text-lg sm:text-xl md:text-2xl font-medium bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
            a Full Stack Developer and Creative Technologist.
          </p>
        </div>

        {/* Minimal Subtle Hairline Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-sky-400/30 via-white/10 to-transparent" />

        {/* Body Paragraphs - Tiny, clean, refined micro text */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Paragraph 1 */}
          <p
            ref={p1Ref}
            className="font-sans text-xs sm:text-sm md:text-base leading-[1.8] tracking-normal text-neutral-300"
          >
            {renderWords("I work across the entire product journey — from", "text-neutral-300 font-normal")}
            {renderWords("concept and architecture", "text-white font-semibold")}
            {renderWords("to interface, development, and deployment. My work spans", "text-neutral-300 font-normal")}
            {renderWords("modern web applications,", "text-sky-300 font-medium")}
            {renderWords("AI & LLM integration,", "text-indigo-300 font-medium")}
            {renderWords("interactive experiences,", "text-amber-200 font-medium")}
            {renderWords("and product engineering.", "text-white font-semibold")}
          </p>

          {/* Paragraph 2 */}
          <p
            ref={p2Ref}
            className="font-sans text-xs sm:text-sm md:text-base leading-[1.8] tracking-normal text-neutral-300"
          >
            {renderWords("I’m particularly interested in understanding how", "text-neutral-300 font-normal")}
            {renderWords("systems work beneath the surface", "text-white font-medium")}
            {renderWords("and then turning that complexity into experiences that feel", "text-neutral-300 font-normal")}
            {renderWords("simple, intuitive, and purposeful.", "font-bodoni italic text-sky-200 font-medium")}
          </p>

          {/* Paragraph 3 & 4 Group */}
          <div className="flex flex-col gap-2 pt-1">
            <p
              ref={p3Ref}
              className="font-sans text-xs sm:text-sm md:text-base leading-[1.8] tracking-normal text-neutral-400"
            >
              {renderWords("I don't see development as just writing code.", "text-neutral-400 italic")}
            </p>
            <p
              ref={p4Ref}
              className="font-sans text-sm sm:text-base md:text-lg leading-[1.7] tracking-normal text-white"
            >
              {renderWords("I see it as solving problems, designing systems, and creating something worth using.", "text-white font-semibold drop-shadow-[0_0_15px_rgba(255,255,255,0.12)]")}
            </p>
          </div>
        </div>
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


