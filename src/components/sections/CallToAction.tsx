"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export function CallToAction() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const track1Ref = useRef<HTMLDivElement | null>(null);

  // Parallax sliding single-line watermark text driven by scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (track1Ref.current && sectionRef.current) {
        gsap.fromTo(
          track1Ref.current,
          { xPercent: 5 },
          {
            xPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      className="relative w-full py-28 sm:py-36 md:py-44 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#050507] overflow-hidden flex flex-col items-center justify-center text-center border-t border-white/[0.08]"
    >
      {/* Ambient radial lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.06)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* BACKGROUND SINGLE COOL SLIDING WATERMARK TEXT (NO DOTS)   */}
      {/* ========================================================= */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-full flex items-center justify-center select-none -z-0 overflow-visible"
        aria-hidden="true"
      >
        <div
          ref={track1Ref}
          className="flex whitespace-nowrap text-white/[0.035] font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight uppercase leading-none will-change-transform"
        >
          <span>ARCHITECTING THE FUTURE &nbsp; CREATIVE ENGINEERING &nbsp; EXPERIENCES BEYOND PIXELS &nbsp; DIGITAL MASTERPIECES &nbsp; </span>
          <span>ARCHITECTING THE FUTURE &nbsp; CREATIVE ENGINEERING &nbsp; EXPERIENCES BEYOND PIXELS &nbsp; DIGITAL MASTERPIECES &nbsp; </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FOREGROUND CENTERED HERO INVITATION - STRICT 3 LINES      */}
      {/* ========================================================= */}
      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto overflow-visible py-2">
        {/* Editorial Bodoni Headline - Guaranteed 3 Clean Lines with Zero Clipping */}
        <h2 className="font-bodoni font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white tracking-tight leading-[1.2] sm:leading-[1.24] text-center px-4 overflow-visible">
          <span className="block whitespace-nowrap overflow-visible">Let&apos;s build</span>
          <span className="block whitespace-nowrap overflow-visible py-0.5">
            something{" "}
            <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent inline-block pr-2 py-0.5">
              extraordinary
            </span>
          </span>
          <span className="block font-bodoni italic font-normal bg-gradient-to-r from-sky-200 via-cyan-300 to-teal-300 bg-clip-text text-transparent whitespace-nowrap overflow-visible pr-2 py-0.5">
            together.
          </span>
        </h2>
      </div>
    </section>
  );
}
