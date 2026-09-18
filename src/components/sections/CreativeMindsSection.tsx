"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export function CreativeMindsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const pillStripsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title & Header reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Vertical Pill Strips stagger animation
      if (pillStripsRef.current) {
        const strips = pillStripsRef.current.children;
        gsap.fromTo(
          strips,
          { opacity: 0, y: 70, scaleY: 0.8 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            stagger: 0.08,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillStripsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 3. Subtle Parallax on scroll
      if (posterRef.current) {
        gsap.to(posterRef.current, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="creative-minds"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 bg-[#07070a] text-neutral-900 overflow-hidden select-none border-t border-white/10"
    >
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.06)_0%,_transparent_70%)]" />

      {/* Main Magazine Poster Canvas (Crisp Editorial 4K Sheet) */}
      <div
        ref={posterRef}
        className="relative max-w-4xl lg:max-w-5xl mx-auto bg-[#fafafa] text-black rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-neutral-200 overflow-hidden"
      >
        {/* Decorative Fine Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

        {/* 1. TOP HEADER GROUP */}
        <div className="relative z-10 flex flex-col items-center text-center mb-6 sm:mb-10">
          <p className="font-mono text-xs sm:text-sm tracking-[0.45em] uppercase text-neutral-600 mb-1 font-medium">
            THE POWER OF
          </p>
          <h2
            ref={titleRef}
            className="font-bodoni font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-none text-black my-1 drop-shadow-sm"
          >
            CREATIVE
          </h2>
          <div className="w-full flex justify-end pr-2 sm:pr-6 md:pr-10">
            <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.55em] uppercase text-black font-semibold">
              MINDS
            </p>
          </div>
        </div>

        {/* 2. MAIN VISUAL COMPOSITION (Staggered Capsule Pill Mask Strips + Portrait) */}
        <div className="relative z-10 w-full min-h-[420px] sm:min-h-[500px] md:min-h-[600px] my-4 sm:my-8 flex items-center justify-center">
          
          {/* Left Side Editorial Micro-Texts */}
          <div className="hidden md:flex flex-col justify-between absolute left-0 top-0 bottom-0 z-20 w-44 pointer-events-none text-left py-2">
            <div className="space-y-1">
              <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-700 uppercase font-semibold leading-relaxed">
                DIFFERENT
                <br />
                PERSPECTIVE
                <br />
                A BRIGHTER
                <br />
                TOMORROW
              </p>
              <div className="w-8 h-[1px] bg-black/40 mt-2" />
            </div>

            <div className="space-y-2 pt-16">
              <h3 className="font-bodoni font-black text-xl lg:text-2xl text-black leading-none uppercase tracking-tight">
                CREATE
                <br />
                EXPLORE
                <br />
                EVOLVE.
              </h3>
              <p className="font-sans text-[11px] leading-relaxed text-neutral-600 font-normal">
                Ideas don&apos;t just appear, they are built through curiosity, discipline and a different perspective. Keep creating.
              </p>
            </div>
          </div>

          {/* Right Side Editorial Micro-Texts */}
          <div className="hidden md:flex flex-col justify-between absolute right-0 top-0 bottom-0 z-20 w-44 pointer-events-none text-right py-2">
            <div className="space-y-1 font-mono text-[10px] tracking-[0.25em] text-neutral-700 uppercase font-semibold leading-relaxed">
              <p>IDEAS</p>
              <p>DESIGN</p>
              <p>DEVELOP</p>
              <p>IMPACT</p>
            </div>

            <div className="space-y-1 font-mono text-[10px] tracking-[0.25em] text-neutral-700 uppercase font-semibold leading-relaxed my-auto">
              <p>SAME</p>
              <p>HUMAN</p>
              <p>BIGGER</p>
              <p>IDEAS</p>
            </div>

            <div className="border border-black/60 p-3 relative text-left bg-white/40 backdrop-blur-sm">
              <div className="w-6 h-[1px] bg-black mb-2" />
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-700 font-semibold leading-snug">
                MORE THAN
                <br />
                JUST A HOBBY
              </p>
              <span className="font-bodoni text-3xl font-black text-black block mt-2 leading-none">
                01
              </span>
            </div>
          </div>

          {/* Central Staggered Pill Mask Container */}
          <div
            ref={pillStripsRef}
            className="relative z-10 w-full max-w-xl h-[420px] sm:h-[480px] md:h-[580px] flex items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 px-2"
          >
            {/* Pill 1 */}
            <div className="w-1/5 h-[78%] mt-auto rounded-full overflow-hidden relative shadow-lg border border-black/10">
              <img
                src="/assets/creative-minds-portrait.jpg"
                alt="Creative portrait pill 1"
                className="absolute w-[500%] h-[115%] max-w-none object-cover left-0 -top-[8%]"
              />
            </div>
            {/* Pill 2 */}
            <div className="w-1/5 h-[90%] mb-auto rounded-full overflow-hidden relative shadow-lg border border-black/10">
              <img
                src="/assets/creative-minds-portrait.jpg"
                alt="Creative portrait pill 2"
                className="absolute w-[500%] h-[115%] max-w-none object-cover -left-[100%] -top-[8%]"
              />
            </div>
            {/* Pill 3 (Center Key Strip) */}
            <div className="w-1/5 h-[100%] my-auto rounded-full overflow-hidden relative shadow-2xl border border-black/20">
              <img
                src="/assets/creative-minds-portrait.jpg"
                alt="Creative portrait pill 3"
                className="absolute w-[500%] h-[115%] max-w-none object-cover -left-[200%] -top-[8%]"
              />
            </div>
            {/* Pill 4 */}
            <div className="w-1/5 h-[86%] mt-auto rounded-full overflow-hidden relative shadow-lg border border-black/10">
              <img
                src="/assets/creative-minds-portrait.jpg"
                alt="Creative portrait pill 4"
                className="absolute w-[500%] h-[115%] max-w-none object-cover -left-[300%] -top-[8%]"
              />
            </div>
            {/* Pill 5 */}
            <div className="w-1/5 h-[74%] mb-auto rounded-full overflow-hidden relative shadow-lg border border-black/10">
              <img
                src="/assets/creative-minds-portrait.jpg"
                alt="Creative portrait pill 5"
                className="absolute w-[500%] h-[115%] max-w-none object-cover -left-[400%] -top-[8%]"
              />
            </div>
          </div>
        </div>

        {/* Mobile Editorial Block (visible on small screens) */}
        <div className="flex md:hidden flex-col gap-5 my-4 pt-4 border-t border-black/10 text-left">
          <div className="space-y-1">
            <h3 className="font-bodoni font-black text-xl text-black uppercase tracking-tight">
              CREATE &bull; EXPLORE &bull; EVOLVE.
            </h3>
            <p className="font-sans text-xs leading-relaxed text-neutral-700">
              Ideas don&apos;t just appear, they are built through curiosity, discipline and a different perspective. Keep creating.
            </p>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase pt-2 border-t border-black/10">
            <span>MORE THAN JUST A HOBBY</span>
            <span className="font-bodoni text-xl font-bold text-black">01</span>
          </div>
        </div>

        {/* 3. BOTTOM FOOTER BAR */}
        <div className="relative z-10 w-full pt-5 mt-2 border-t border-black/15 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-neutral-700 uppercase font-medium">
          <span>PEOPLE</span>
          <span className="text-black/30">/</span>
          <span>IDEAS</span>
          <span className="text-black/30">/</span>
          <span>TECHNOLOGY</span>
          <span className="text-black/30">/</span>
          <span>A BETTER TOMORROW</span>
        </div>
      </div>
    </section>
  );
}
