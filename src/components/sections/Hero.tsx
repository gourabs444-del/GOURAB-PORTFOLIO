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
      className="relative min-h-[96vh] sm:min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-6 sm:px-12 md:px-16 overflow-hidden bg-white text-[#111111] select-none"
    >
      {/* Top Greeting Headline */}
      <div
        ref={introGreetingRef}
        className="relative z-30 flex items-center justify-center gap-2 text-center text-sm sm:text-base md:text-lg font-sans text-neutral-600 font-normal mt-2 sm:mt-4 mb-1"
      >
        <span className="text-xl sm:text-2xl">👋</span>
        <span>, my name is</span>
        <strong className="text-[#111111] font-semibold underline decoration-amber-400 decoration-2 underline-offset-4 font-sans">
          Gourab
        </strong>
        <span>and I am a freelance</span>
      </div>

      {/* Main 2-Line Layered Typography & Centered Cutout Portrait Scene */}
      <div className="relative my-auto w-full max-w-7xl mx-auto flex flex-col items-center justify-between pt-2 pb-6 sm:pb-8 min-h-[520px] sm:min-h-[600px] md:min-h-[660px]">
        {/* Top Line 1 (Solid Bold Black): Web Developer (Strictly Above the Head) */}
        <div
          ref={headlineTopRef}
          className="w-full flex items-center justify-center gap-2 sm:gap-3.5 relative z-10 whitespace-nowrap pt-2 sm:pt-4"
        >
          <h1 className="font-display font-extrabold text-[8vw] sm:text-[6.5vw] md:text-[5.2vw] lg:text-[4.5vw] xl:text-[4.1vw] leading-none tracking-tight text-[#111111] whitespace-nowrap">
            Web Developer
          </h1>
          {/* Embedded Circular Arrow Accent Button */}
          <button
            type="button"
            onClick={() => scrollToSection("work")}
            className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border border-neutral-300 bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-sm cursor-pointer transform hover:scale-110 align-middle"
            title="Explore selected work"
          >
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
          </button>
        </div>

        {/* Bottom Line 2 (Outlined Stroked Text Layered Behind Portrait): & Designer (Behind Chest/Torso) */}
        <div
          ref={headlineBottomRef}
          className="w-full text-center relative z-10 whitespace-nowrap my-auto pb-4 sm:pb-8"
        >
          <h2
            className="font-display font-extrabold text-[8vw] sm:text-[6.5vw] md:text-[5.2vw] lg:text-[4.5vw] xl:text-[4.1vw] leading-none tracking-tight select-none text-transparent whitespace-nowrap"
            style={{
              WebkitTextStroke: "1.5px #111111",
            }}
          >
            &amp; Designer
          </h2>
        </div>

        {/* Foreground Layer: Gourab's Cutout Portrait (Strictly z-20 IN FRONT of & Designer, Head Below Line 1) */}
        <div
          ref={portraitRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[220px] sm:w-[290px] md:w-[350px] lg:w-[400px] xl:w-[430px] aspect-[3/4] pointer-events-none flex items-end justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src="/assets/gourab.png"
              alt="Gourab — Web Developer & Designer"
              fill
              priority
              className="object-contain object-bottom filter contrast-105 brightness-100 drop-shadow-2xl"
            />
          </div>
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
        className="relative z-30 flex flex-row items-center justify-center gap-3 pt-2 mt-1"
      >
        <button
          onClick={() => scrollToSection("work")}
          className="px-6 sm:px-8 py-3 rounded-md bg-[#111111] text-white hover:bg-black text-xs sm:text-sm font-sans font-medium tracking-tight shadow-md transition-all duration-200 active:scale-95 min-w-[160px] sm:min-w-[180px]"
        >
          You need a developer
        </button>

        <button
          onClick={() => scrollToSection("contact")}
          className="px-6 sm:px-8 py-3 rounded-md bg-white/90 hover:bg-white text-[#111111] border border-[#111111]/30 hover:border-[#111111] text-xs sm:text-sm font-sans font-medium tracking-tight shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-95 min-w-[160px] sm:min-w-[180px]"
        >
          You need a designer
        </button>
      </div>

      {/* Mobile Location text */}
      <div className="lg:hidden text-center mt-3 text-xs font-sans text-neutral-500 flex items-center justify-center gap-1.5">
        <MapPin className="w-3 h-3 text-neutral-700" />
        <span>based in India • Available Worldwide</span>
      </div>
    </section>
  );
}
