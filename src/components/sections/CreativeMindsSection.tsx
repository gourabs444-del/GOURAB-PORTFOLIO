"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export function CreativeMindsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const activeProgressRef = useRef<HTMLDivElement | null>(null);
  const label1Ref = useRef<HTMLSpanElement | null>(null);
  const label2Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      if (!card1 || !card2 || !sectionRef.current) return;

      // Master ScrollTrigger timeline for pinning section & horizontal transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1400", // Scroll duration
          pin: true,
          scrub: 0.8,
        },
      });

      // Card 1 slides off to left while fading & scaling down slightly
      tl.to(
        card1,
        {
          xPercent: -115,
          scale: 0.88,
          opacity: 0,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // Card 2 slides in from right into center while scaling up to 1
      tl.fromTo(
        card2,
        {
          xPercent: 115,
          scale: 0.88,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // Bottom Indicator Progress Pill Fill
      if (activeProgressRef.current) {
        tl.to(
          activeProgressRef.current,
          {
            width: "100%",
            ease: "power2.inOut",
            duration: 1,
          },
          0
        );
      }

      // Indicator Label Color highlights
      if (label1Ref.current && label2Ref.current) {
        tl.to(
          label1Ref.current,
          { color: "#9ca3af", ease: "power2.inOut", duration: 0.5 },
          0.2
        );
        tl.to(
          label2Ref.current,
          { color: "#000000", ease: "power2.inOut", duration: 0.5 },
          0.5
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="creative-minds"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#fafafa] text-black overflow-hidden select-none border-t border-b border-black/10"
    >
      {/* Soft Ambient Background Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.015)_0%,_transparent_75%)] z-0" />

      {/* Sticky Stage Container for Dual Cards */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* CARD 1: Creative Minds Poster (Lines & 01 & 'More than just a hobby' removed) */}
        <div
          ref={card1Ref}
          className="absolute inset-0 m-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 will-change-transform z-10"
        >
          <div className="relative w-full flex items-center justify-center bg-[#fafafa]">
            <img
              src="/assets/creative-minds-poster.jpg"
              alt="The Power of Creative Minds - Poster 1"
              className="w-auto h-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] max-w-full object-contain block mx-auto"
            />
            {/* Clean Overlay Patch hiding lines, 01 & 'MORE THAN JUST A HOBBY' */}
            <div
              className="absolute right-0 bottom-0 w-[34%] h-[36%] bg-[#fafafa] z-20 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* CARD 2: Cyber/Tech Vision 2026 Poster */}
        <div
          ref={card2Ref}
          className="absolute inset-0 m-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 will-change-transform z-10 opacity-0"
        >
          <div className="relative w-full flex items-center justify-center bg-[#fafafa]">
            <img
              src="/assets/creative-minds-poster-2.jpg"
              alt="More Than Just A Vision 2026 - Poster 2"
              className="w-auto h-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] max-w-full object-contain block mx-auto shadow-[0_15px_50px_rgba(0,0,0,0.06)] rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom Minimal Interactive Indicator (01 / 02) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/[0.04] backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10">
        <span
          ref={label1Ref}
          className="font-mono text-[11px] font-bold text-black tracking-widest transition-colors duration-300"
        >
          01
        </span>
        <div className="w-12 h-1 bg-black/15 rounded-full relative overflow-hidden">
          <div
            ref={activeProgressRef}
            className="w-0 h-full bg-black rounded-full absolute left-0 top-0"
          />
        </div>
        <span
          ref={label2Ref}
          className="font-mono text-[11px] font-bold text-neutral-400 tracking-widest transition-colors duration-300"
        >
          02
        </span>
      </div>
    </section>
  );
}
