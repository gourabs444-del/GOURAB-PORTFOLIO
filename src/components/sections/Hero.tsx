"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  isLoaded: boolean;
}

export function Hero({ isLoaded }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const headlineTopRef = useRef<HTMLHeadingElement | null>(null);
  const headlineBottomRef = useRef<HTMLHeadingElement | null>(null);
  const introGreetingRef = useRef<HTMLDivElement | null>(null);
  const sideMetaLeftRef = useRef<HTMLDivElement | null>(null);
  const sideMetaRightRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle initial entrance if isLoaded, ensuring final state is 100% visible
      if (isLoaded) {
        gsap.fromTo(
          [headlineTopRef.current, headlineBottomRef.current],
          { y: 15, opacity: 0.8 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 }
        );
      }

      // Scroll-driven fade-out ONLY for text (Image does NOT fade on scroll)
      gsap.to(headlineTopRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1,
        },
        y: -60,
        opacity: 0,
        ease: "none",
      });

      gsap.to(headlineBottomRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1,
        },
        y: -40,
        opacity: 0,
        ease: "none",
      });

      gsap.to(introGreetingRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "35% top",
          scrub: 1,
        },
        y: -20,
        opacity: 0,
        ease: "none",
      });

      // Subtle parallax for portrait only (opacity stays 100% solid, NO FADE)
      gsap.to(portraitRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: 40,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 px-4 sm:px-8 md:px-16 overflow-hidden bg-white text-[#111111] select-none"
    >
      {/* Top Greeting Headline */}
      <div
        ref={introGreetingRef}
        className="relative z-30 text-center text-xs xs:text-sm sm:text-base md:text-lg font-sans text-neutral-600 font-normal mt-2 sm:mt-3 mb-1 px-2 leading-relaxed"
      >
        <span className="inline-block mr-1 text-sm sm:text-lg">👋</span>
        <span>, my name is </span>
        <strong className="text-[#111111] font-semibold underline decoration-amber-400 decoration-2 underline-offset-4 font-sans">
          Gourab
        </strong>
        <span> and I am a freelance</span>
      </div>

      {/* Main 2-Line Layered Typography & Centered Cutout Portrait Scene (Exact Bazil Reference Match) */}
      <div className="relative my-auto w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-2 sm:py-4 min-h-[320px] xs:min-h-[360px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px]">
        {/* Background Typography Container (z-10, strictly behind the foreground portrait) */}
        <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col items-center justify-center text-center select-none -translate-y-10 xs:-translate-y-14 sm:-translate-y-20 md:-translate-y-28 lg:-translate-y-32 px-2 sm:px-4">
          {/* Line 1 (Solid Bold Black): WEB DEVELOPER (Original Oswald Font, 1 Inch Above 2nd Line) */}
          <div
            ref={headlineTopRef}
            className="w-full relative z-10 -translate-y-8 xs:-translate-y-12 sm:-translate-y-16 md:-translate-y-20 lg:-translate-y-24 mb-2 sm:mb-3"
          >
            <svg viewBox="0 0 1000 85" className="w-full h-auto overflow-visible" preserveAspectRatio="none">
              <text
                x="0"
                y="74"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                className="font-oswald font-bold uppercase fill-[#111111]"
                style={{
                  fontFamily: "var(--font-oswald), sans-serif",
                  fontSize: "98px",
                  fontWeight: "700",
                }}
              >
                WEB DEVELOPER
              </text>
            </svg>
          </div>

          {/* Line 2 (Outlined Stroked Text Behind Portrait): & DESIGNER (Original Oswald Font, Locked Start & End Point, Tall Stretch) */}
          <div
            ref={headlineBottomRef}
            className="w-full relative z-10 mt-1 sm:mt-2 transform scale-y-[1.75] sm:scale-y-[1.9] md:scale-y-[2.05] lg:scale-y-[2.15] origin-top"
          >
            <svg viewBox="0 0 1000 120" className="w-full h-auto overflow-visible" preserveAspectRatio="none">
              <text
                x="0"
                y="102"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                className="font-oswald font-black uppercase fill-transparent"
                style={{
                  fontFamily: "var(--font-oswald), sans-serif",
                  fontSize: "135px",
                  fontWeight: "900",
                  stroke: "#111111",
                  strokeWidth: "2.2px",
                }}
              >
                &amp; DESIGNER
              </text>
            </svg>
          </div>
        </div>

        {/* Foreground Layer: Gourab's Cutout Portrait (Strictly z-20 IN FRONT of & Designer, 100% Solid Body + Ultra Smooth Feathered Blur Bottom) */}
        <div
          ref={portraitRef}
          className="absolute bottom-[-10px] sm:bottom-[-15px] md:bottom-[-20px] left-1/2 -translate-x-1/2 z-20 w-[210px] xs:w-[240px] sm:w-[320px] md:w-[390px] lg:w-[440px] xl:w-[480px] aspect-[3/4] pointer-events-none flex items-end justify-center"
        >
          <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,black_76%,rgba(0,0,0,0.7)_86%,rgba(0,0,0,0.2)_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_76%,rgba(0,0,0,0.7)_86%,rgba(0,0,0,0.2)_94%,transparent_100%)]">
            <Image
              src="/assets/gourab.png"
              alt="Gourab — Web Developer & Designer"
              fill
              priority
              className="object-contain object-bottom filter contrast-105 brightness-100"
            />
          </div>
          {/* Ultra-smooth multi-stop feathered gradient blur overlay */}
          <div className="absolute -bottom-2 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none backdrop-blur-[1.5px]" />
        </div>

        {/* Left Side Metadata: Based in India */}
        <div
          ref={sideMetaLeftRef}
          className="absolute left-2 sm:left-4 bottom-8 z-30 hidden lg:flex flex-col items-start text-left font-sans text-sm text-neutral-700 max-w-[200px]"
        >
          <span className="font-medium text-[#111111]">based in India.</span>
          <span className="text-xs text-neutral-400 mt-0.5">Available for global projects</span>
        </div>

        {/* Right Side Metadata: Partner/client tags */}
        <div
          ref={sideMetaRightRef}
          className="absolute right-2 sm:right-4 bottom-8 z-30 hidden lg:flex items-center gap-6 font-serif italic text-xs text-neutral-400 select-none"
        >
          <span className="font-sans text-[11px] font-semibold text-neutral-500 tracking-wider uppercase">
            Audible
          </span>
          <span className="font-serif italic text-neutral-500">Ballantine&apos;s</span>
          <span className="font-mono text-[10px] uppercase text-neutral-500 font-bold">
            OLYMPUS
          </span>
          <span className="font-serif italic text-neutral-500">Veuve Clicquot</span>
        </div>
      </div>

      {/* Bottom Dual Action Buttons: "You need a designer" / "You need a developer" */}
      <div
        ref={ctaGroupRef}
        className="relative z-30 flex flex-col xs:flex-row items-center justify-center gap-2.5 sm:gap-3.5 pt-2 mt-1 w-full max-w-md mx-auto sm:max-w-none"
      >
        <button
          onClick={() => scrollToSection("work")}
          className="w-full xs:w-auto px-5 sm:px-8 py-2.5 sm:py-3 rounded-md bg-[#111111] text-white hover:bg-black text-xs sm:text-sm font-sans font-medium tracking-tight shadow-md transition-all duration-200 active:scale-95 text-center sm:min-w-[170px]"
        >
          You need a developer
        </button>

        <button
          onClick={() => scrollToSection("contact")}
          className="w-full xs:w-auto px-5 sm:px-8 py-2.5 sm:py-3 rounded-md bg-white/90 hover:bg-white text-[#111111] border border-[#111111]/30 hover:border-[#111111] text-xs sm:text-sm font-sans font-medium tracking-tight shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-95 text-center sm:min-w-[170px]"
        >
          You need a designer
        </button>
      </div>

      {/* Mobile Location text */}
      <div className="lg:hidden text-center mt-2.5 text-xs font-sans text-neutral-500 flex items-center justify-center gap-1.5">
        <MapPin className="w-3 h-3 text-neutral-700" />
        <span>based in India • Available Worldwide</span>
      </div>
    </section>
  );
}
