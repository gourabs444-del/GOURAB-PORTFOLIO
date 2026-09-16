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
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const dimOverlayRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const headlineTopRef = useRef<HTMLHeadingElement | null>(null);
  const headlineBottomRef = useRef<HTMLHeadingElement | null>(null);
  const sideMetaLeftRef = useRef<HTMLDivElement | null>(null);
  const sideMetaRightRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const introEl = document.getElementById("hero-intro-container");
    const contentEl = heroContentRef.current;
    const dimEl = dimOverlayRef.current;

    if (!introEl || !contentEl) return;

    const updateHeroTransform = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress));
      const scale = 1 - p * 0.16; // from 1.0 down to 0.84
      const translateY = -p * (window.innerHeight * 0.30);
      const opacity = Math.max(0.08, 1 - p * 0.9);

      contentEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      contentEl.style.opacity = opacity.toFixed(3);

      if (dimEl) {
        dimEl.style.opacity = (p * 0.72).toFixed(3);
      }
    };

    // 1. GSAP ScrollTrigger synchronized with Lenis
    const st = ScrollTrigger.create({
      trigger: introEl,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        updateHeroTransform(self.progress);
      },
    });

    // 2. High-performance scroll listener for instant hardware lockstep
    const onScroll = () => {
      const rect = introEl.getBoundingClientRect();
      const travel = introEl.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const scrolled = -rect.top;
      const p = scrolled / travel;
      updateHeroTransform(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
      onScroll();
    }, { passive: true });

    onScroll();

    return () => {
      st.kill();
      window.removeEventListener("scroll", onScroll);
    };
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
      className="relative w-full h-full min-h-screen overflow-hidden bg-white text-[#111111] select-none"
    >
      {/* GPU Dimming Overlay */}
      <div
        ref={dimOverlayRef}
        className="absolute inset-0 bg-black pointer-events-none opacity-0 z-40 will-change-[opacity]"
      />

      {/* Main Hero Content (Shrinks & Fades Smoothly with 0 CPU lag) */}
      <div
        ref={heroContentRef}
        className="relative h-full min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 px-4 sm:px-8 md:px-16 will-change-[transform,opacity] transform-gpu origin-center"
      >
      {/* Main 2-Line Layered Typography & Centered Cutout Portrait Scene */}
      <div
        className="relative my-auto w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-2 sm:py-4 min-h-[320px] xs:min-h-[360px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px]"
      >
        {/* Background Typography Container (z-10, strictly behind the foreground portrait) */}
        <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col items-center justify-center text-center select-none -translate-y-10 xs:-translate-y-14 sm:-translate-y-20 md:-translate-y-28 lg:-translate-y-32 px-2 sm:px-4">
          {/* Line 1: WEB DEVELOPER (Solid Black, Vertically Stretched / Taller with Same Endpoints) */}
          <div
            ref={headlineTopRef}
            className="w-full relative z-10 -translate-y-6 xs:-translate-y-8 sm:-translate-y-12 md:-translate-y-16 lg:-translate-y-20 mb-1 sm:mb-2 transform scale-y-[1.35] sm:scale-y-[1.45] md:scale-y-[1.55] lg:scale-y-[1.65] origin-bottom"
          >
            <svg viewBox="0 0 1000 90" className="w-full h-auto overflow-visible" preserveAspectRatio="none">
              <text
                x="0"
                y="80"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                className="font-oswald font-black uppercase"
                style={{
                  fontFamily: "var(--font-oswald), sans-serif",
                  fontSize: "105px",
                  fontWeight: "800",
                  fill: "#111111",
                }}
              >
                WEB DEVELOPER
              </text>
            </svg>
          </div>

          {/* Line 2 (Outlined Stroked Text Behind Portrait): & DESIGNER (White Fill, White-Greyish Outline, Stretched Downward) */}
          <div
            ref={headlineBottomRef}
            className="w-full relative z-10 -translate-y-2 xs:-translate-y-3 sm:-translate-y-4 md:-translate-y-5 transform scale-y-[2.1] sm:scale-y-[2.3] md:scale-y-[2.5] lg:scale-y-[2.65] origin-top"
          >
            <svg viewBox="0 0 1000 120" className="w-full h-auto overflow-visible" preserveAspectRatio="none">
              <text
                x="0"
                y="102"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                className="font-oswald font-black uppercase"
                style={{
                  fontFamily: "var(--font-oswald), sans-serif",
                  fontSize: "135px",
                  fontWeight: "900",
                  fill: "#FFFFFF",
                  stroke: "#C4C4CC",
                  strokeWidth: "2.2px",
                }}
              >
                &amp; DESIGNER
              </text>
            </svg>
          </div>
        </div>

        {/* Foreground Layer: Gourab's Cutout Portrait (Strictly z-20 IN FRONT of & Designer, 100% Solid Body + Ultra Smooth Pure Gradient Fade) */}
        <div
          ref={portraitRef}
          className="absolute bottom-[-10px] sm:bottom-[-15px] md:bottom-[-20px] left-1/2 -translate-x-1/2 z-20 w-[210px] xs:w-[240px] sm:w-[320px] md:w-[390px] lg:w-[440px] xl:w-[480px] aspect-[3/4] pointer-events-none flex items-end justify-center"
        >
          <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,black_82%,rgba(0,0,0,0.7)_88%,rgba(0,0,0,0.3)_94%,rgba(0,0,0,0.05)_98%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_82%,rgba(0,0,0,0.7)_88%,rgba(0,0,0,0.3)_94%,rgba(0,0,0,0.05)_98%,transparent_100%)]">
            <Image
              src="/assets/gourab.png"
              alt="Gourab — Web Developer & Designer"
              fill
              priority
              className="object-contain object-bottom filter contrast-105 brightness-100"
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
        </div>
      </div>

      {/* Bottom Dual Action Buttons: Positioned higher up over the portrait base */}
      <div
        ref={ctaGroupRef}
        className="relative z-30 flex flex-row items-center justify-center gap-2.5 sm:gap-4 -mt-20 xs:-mt-28 sm:-mt-36 md:-mt-44 lg:-mt-52 mb-2 w-full mx-auto"
      >
        <button
          onClick={() => scrollToSection("work")}
          className="px-4 xs:px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#111111] text-white hover:bg-black text-xs sm:text-sm font-sans font-medium tracking-tight shadow-md transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
        >
          You need a developer
        </button>

        <button
          onClick={() => scrollToSection("contact")}
          className="px-4 xs:px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/95 hover:bg-white text-[#111111] border border-neutral-300 hover:border-[#111111] text-xs sm:text-sm font-sans font-medium tracking-tight shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
        >
          You need a designer
        </button>
      </div>

      {/* Mobile Location text */}
      <div className="lg:hidden text-center mt-2 text-xs font-sans text-neutral-500 flex items-center justify-center gap-1.5">
        <MapPin className="w-3 h-3 text-neutral-700" />
        <span>based in India • Available Worldwide</span>
      </div>
      </div>
    </section>
  );
}
