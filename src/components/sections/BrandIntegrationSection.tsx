"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { RotatingPurpleEarth } from "./RotatingPurpleEarth";
import { EngineArchitectureGrid } from "./EngineArchitectureGrid";
import { WhyChooseAlgoraGrid } from "./WhyChooseAlgoraGrid";

export function BrandIntegrationSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  // Interactive Product Demo State
  const [activeTab, setActiveTab] = useState<"build" | "ai" | "deploy">("build");

  const handleSimulateClick = (tab: "build" | "ai" | "deploy") => {
    setActiveTab(tab);
    playHover();
  };

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Master Continuous Scroll-Driven Timeline over 800vh track
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stageRef.current,
          invalidateOnRefresh: true,
        },
      });

      // Class selectors for all 10 acts
      const allActClasses = [
        ".act-01",
        ".act-02",
        ".act-03",
        ".act-04",
        ".act-05",
        ".act-06",
        ".act-07",
        ".act-why-us",
        ".act-why-choose",
        ".act-08",
        ".act-09",
        ".act-10",
      ];

      // Initial state: Opacity 0, pointer-events none
      gsap.set(allActClasses, {
        opacity: 0,
        pointerEvents: "none",
      });

      // =======================================================================
      // 01 — THE INTERRUPTION (Time: 0.0 -> 1.0, Exits 0.8 -> 1.15)
      // =======================================================================
      tl.to(".act-01", { opacity: 1, duration: 0.2 }, 0.0);

      // Text enters on a single line spaced out ("abhi itne dur rhne do")
      tl.fromTo(
        ".act-01-text",
        { opacity: 0, filter: "blur(14px)", y: 35, letterSpacing: "0.1em", wordSpacing: "0.2em" },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.35, ease: "power2.out" },
        0.05
      );

      tl.fromTo(
        ".act-01-emph",
        { opacity: 0.7, scale: 0.96, letterSpacing: "0.1em" },
        { opacity: 1, scale: 1.02, duration: 0.35, ease: "power1.out" },
        0.05
      );

      // Kinetic inward compression: letters & words pull together on 1 single line ("animte krke nazdik ajayega")
      tl.to(
        [".act-01-text", ".act-01-emph"],
        {
          letterSpacing: "0.01em",
          duration: 0.45,
          ease: "power2.inOut",
        },
        0.35
      );

      tl.to(
        ".act-01-text",
        {
          wordSpacing: "0.05em",
          duration: 0.45,
          ease: "power2.inOut",
        },
        0.35
      );

      tl.to(
        ".act-01-gap",
        {
          width: "0.55rem",
          duration: 0.45,
          ease: "power2.inOut",
        },
        0.35
      );

      // Morphing Exit into Act 02 (0.8 -> 1.15)
      tl.to(
        ".act-01-text",
        { opacity: 0, filter: "blur(10px)", y: -45, scale: 0.95, duration: 0.35, ease: "power2.in" },
        0.8
      );
      tl.to(".act-01", { opacity: 0, duration: 0.25 }, 0.9);

      // =======================================================================
      // 02 & 03 — BRAND REVEAL & LOGO DRAW (Time: 0.9 -> 3.0, Exits 2.7 -> 3.2)
      // =======================================================================
      tl.to(".act-02", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.9);

      // Smooth, natural vector SVG stroke drawing
      tl.fromTo(
        ".svg-circle",
        { strokeDasharray: 1100, strokeDashoffset: 1100, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        0.95
      );

      tl.fromTo(
        [".svg-poly", ".svg-path"],
        { strokeDasharray: 600, strokeDashoffset: 600, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.1 },
        1.1
      );

      // Soft, seamless white fill transition for inner emblem
      tl.to(
        [".svg-poly", ".svg-path"],
        { fill: "#ffffff", duration: 0.6, ease: "power2.inOut" },
        1.55
      );

      // Ultra-smooth ALGORA title fade-up directly beneath emblem
      tl.fromTo(
        ".brand-name",
        { opacity: 0, y: 16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power2.out" },
        1.6
      );

      // Soft, elegant morphing exit into Act 04 (2.7 -> 3.2)
      tl.to(
        ".act-02",
        { opacity: 0, filter: "blur(8px)", scale: 0.96, duration: 0.5, ease: "power2.inOut" },
        2.7
      );

      // =======================================================================
      // 04 — WHY (Time: 2.8 -> 4.0, Exits 3.6 -> 4.1)
      // =======================================================================
      tl.to(".act-04", { opacity: 1, duration: 0.3 }, 2.8);

      tl.fromTo(
        ".act-04-text",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        2.9
      );

      tl.fromTo(
        ".act-04-sub",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        3.1
      );

      tl.fromTo(
        ".act-04-light",
        { xPercent: -100 },
        { xPercent: 100, duration: 0.6, ease: "power1.inOut" },
        3.0
      );

      // Continuous Zoom-Through Camera Transition:
      // Subtitle blurs away, and the main white text zooms forward dramatically into the lens.
      // As the white letters expand across the entire screen, the white canvas blooms to full opacity,
      // transitioning the stage seamlessly into a luxury white world for the next scene!
      tl.to(
        ".act-04-sub",
        { opacity: 0, scale: 1.8, filter: "blur(12px)", duration: 0.35, ease: "power2.in" },
        3.4
      );
      tl.to(
        ".act-04-text",
        {
          scale: isMobile ? 30 : 55,
          filter: "blur(3px) drop-shadow(0 0 50px rgba(255,255,255,0.9))",
          duration: 0.55,
          ease: "power3.in",
        },
        3.45
      );
      tl.to(
        ".act-earth-canvas",
        { opacity: 1, duration: 0.45, ease: "power2.inOut" },
        3.65
      );
      tl.to(".act-04-text", { opacity: 0, duration: 0.15 }, 3.9);
      tl.to(".act-04", { opacity: 0, duration: 0.2 }, 3.9);

      // =======================================================================
      // 05 — PRODUCT REVEAL ON CELESTIAL EARTH CANVAS (Time: 3.85 -> 5.0, Exits 4.7 -> 5.1)
      // =======================================================================
      tl.to(".act-05", { opacity: 1, pointerEvents: "auto", duration: 0.35 }, 3.85);

      tl.fromTo(
        ".product-layer-fg",
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
        4.0
      );

      // Morphing Exit into Act 06 (4.7 -> 5.1): Earth canvas dissolves gracefully into Act 06
      tl.to(".act-05", { opacity: 0, scale: 0.94, y: -30, pointerEvents: "none", duration: 0.4, ease: "power2.inOut" }, 4.7);
      tl.to(".act-earth-canvas", { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 4.75);

      // =======================================================================
      // 06 — EXPERIENCE (Time: 4.8 -> 6.0, Exits 5.7 -> 6.1)
      // =======================================================================
      tl.to(".act-06", { opacity: 1, duration: 0.3 }, 4.8);

      tl.fromTo(
        ".exp-flow",
        { opacity: 0, y: 45, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
        4.95
      );

      // Morphing Exit into Act 07 (5.7 -> 6.1)
      tl.to(".act-06", { opacity: 0, y: -40, scale: 0.94, duration: 0.4, ease: "power2.inOut" }, 5.7);

      // =======================================================================
      // 07 — ENGINE / ARCHITECTURE (Time: 5.8 -> 7.0, Exits 6.7 -> 7.1)
      // =======================================================================
      tl.to(".act-07", { opacity: 1, duration: 0.3 }, 5.8);

      tl.fromTo(
        ".engine-header",
        { opacity: 0, y: -25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" },
        5.85
      );

      tl.fromTo(
        ".engine-bus-track",
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
        5.9
      );

      tl.fromTo(
        ".engine-graph",
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
        5.9
      );

      tl.fromTo(
        ".engine-node",
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out" },
        6.0
      );

      // Morphing Exit into Act WHY US (6.7 -> 7.0)
      tl.to(".act-07", { opacity: 0, scale: 0.92, y: -30, duration: 0.35, ease: "power2.inOut" }, 6.7);

      // =======================================================================
      // WHY US?? — DRAMATIC INQUIRY (Time: 6.95 -> 8.0, Exits 7.8 -> 8.2)
      // =======================================================================
      tl.to(".act-why-us", { opacity: 1, duration: 0.3 }, 6.95);

      tl.fromTo(
        ".why-us-content",
        { opacity: 0, scale: 0.9, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
        7.05
      );

      tl.fromTo(
        ".why-us-laser",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: "power2.out" },
        7.15
      );

      // Morphing Exit into WHY CHOOSE (7.8 -> 8.2)
      tl.to(
        ".act-why-us",
        { opacity: 0, scale: 1.12, filter: "blur(8px)", duration: 0.35, ease: "power2.in" },
        7.8
      );

      // =======================================================================
      // WHY CHOOSE ALGORA // DIGITAL EXPLANATION (Time: 7.95 -> 9.4, Exits 9.25 -> 9.6)
      // =======================================================================
      tl.to(".act-why-choose", { opacity: 1, pointerEvents: "auto", duration: 0.3 }, 7.95);

      tl.fromTo(
        ".why-choose-header",
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        8.05
      );

      tl.fromTo(
        ".why-choose-content .why-card",
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out" },
        8.15
      );

      // Morphing Exit into Act 08 (9.25 -> 9.6)
      tl.to(
        ".act-why-choose",
        { opacity: 0, scale: 0.92, y: -30, pointerEvents: "none", duration: 0.35, ease: "power2.inOut" },
        9.25
      );

      // =======================================================================
      // 08 — FOUNDER CONNECTION (Time: 9.35 -> 10.4, Exits 10.25 -> 10.6)
      // =======================================================================
      tl.to(".act-08", { opacity: 1, duration: 0.3 }, 9.35);

      tl.fromTo(
        ".founder-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        9.45
      );

      tl.fromTo(
        ".founder-roles",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        9.65
      );

      // Morphing Exit into Act 09 (10.25 -> 10.6)
      tl.to(".act-08", { opacity: 0, y: -40, scale: 0.94, duration: 0.35, ease: "power2.inOut" }, 10.25);

      // =======================================================================
      // 09 — VISION (Time: 10.4 -> 11.4, Exits 11.25 -> 11.6)
      // =======================================================================
      tl.to(".act-09", { opacity: 1, duration: 0.3 }, 10.4);

      tl.fromTo(
        ".vision-text",
        { opacity: 0, scale: 0.94, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
        10.5
      );

      // Morphing Exit into Act 10 (11.25 -> 11.6)
      tl.to(".act-09", { opacity: 0, scale: 0.94, filter: "blur(10px)", duration: 0.35, ease: "power2.inOut" }, 11.25);

      // =======================================================================
      // 10 — FINAL BRAND LOCKUP (Time: 11.4 -> 12.6)
      // =======================================================================
      tl.to(".act-10", { opacity: 1, pointerEvents: "auto", duration: 0.3 }, 11.4);

      tl.fromTo(
        ".act-10-logo",
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" },
        11.55
      );

      tl.fromTo(
        ".act-10-name",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        11.7
      );

      tl.fromTo(
        ".act-10-tag",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        11.85
      );

      tl.fromTo(
        [".act-10-founder", ".act-10-cta"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" },
        12.0
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="brand-integration"
      className="relative w-full h-[1050vh] bg-[#030305] text-white select-none overflow-clip border-t border-white/10"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 z-20"
      >
        {/* Subtle Ambient Background Grid & Lighting */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.08)_0%,_rgba(56,189,248,0.04)_45%,_transparent_75%)] rounded-full blur-[130px] pointer-events-none" />

        {/* Celestial Rotating Purple Earth Background Canvas (Image 2 Aesthetic) */}
        <div className="act-earth-canvas absolute inset-0 w-full h-full opacity-0 pointer-events-none z-[5] will-change-transform">
          <RotatingPurpleEarth />
        </div>

        {/* ========================================================= */}
        {/* ACT 01 — THE INTERRUPTION                                 */}
        {/* ========================================================= */}
        <div className="act-01 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 transition-transform z-10 pointer-events-none">
          <p className="act-01-text font-display font-medium text-xl sm:text-3xl md:text-5xl lg:text-6xl text-white/95 tracking-[0.1em] [word-spacing:0.2em] leading-none whitespace-nowrap flex items-center justify-center will-change-transform">
            <span>AN IDEA IS ONLY THE</span>
            <span className="act-01-gap inline-block w-3 sm:w-4 md:w-5 shrink-0" />
            <span className="act-01-emph font-display font-extrabold tracking-[0.1em] bg-gradient-to-r from-cyan-200 via-[#00F0FF] to-teal-300 bg-clip-text text-transparent inline-block drop-shadow-[0_0_35px_rgba(0,240,255,0.65)] will-change-transform">
              BEGINNING.
            </span>
          </p>
        </div>

        {/* ========================================================= */}
        {/* ACT 02 & 03 — BRAND REVEAL & LOGO DRAW                    */}
        {/* ========================================================= */}
        <div className="act-02 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform z-10">
          {/* SVG Vector Logo Drawing & Lift-Up Container - Large, prominent circular logo matching reference */}
          <div className="logo-svg-wrapper w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center transition-transform">
            <svg viewBox="315 85 394 450" className="w-full h-full text-white overflow-visible drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
              <circle
                className="svg-circle"
                cx="512"
                cy="284.5"
                r="175"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
              />
              <polygon
                className="svg-poly"
                points="512,197 483,243.5 550,368 604,368"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinejoin="round"
              />
              <path
                className="svg-path"
                d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Clean Geometric Typography Title Matching Image 2 Reference */}
          <h2 className="brand-name font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-[0.55em] sm:tracking-[0.65em] pl-[0.55em] sm:pl-[0.65em] text-white uppercase mt-7 sm:mt-8 opacity-0">
            ALGORA
          </h2>
        </div>

        {/* ========================================================= */}
        {/* ACT 04 — WHY (ZOOMS WHITE TEXT INTO CAMERA TO BLOOM WHITE) */}
        {/* ========================================================= */}
        <div className="act-04 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 overflow-hidden transition-transform z-20">
          <div className="relative max-w-4xl flex flex-col items-center justify-center">
            <div className="act-04-light absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-xl pointer-events-none" />
            <h3 className="act-04-text font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight uppercase mb-4 origin-center will-change-transform">
              BUILT FOR INTENTIONAL DIGITAL ENGINEERING.
            </h3>
            <p className="act-04-sub font-sans text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed origin-center will-change-transform">
              A simpler, highly disciplined way to architect, design, and deploy next-generation web applications.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 05 — PRODUCT REVEAL (LUXURY WHITE CANVAS HUD)         */}
        {/* ========================================================= */}
        <div className="act-05 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform z-10">
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
            
            {/* Ambient Blue-Violet Radial Aura tuned for White Canvas */}
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_rgba(99,102,241,0.05)_45%,_transparent_75%)] rounded-full blur-[110px]" />

            {/* 1. Cool Kinetic Typography Headline on White Background with Blue Accents & Solid Black Text */}
            <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto mb-4 sm:mb-6">
              <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black tracking-tight leading-tight uppercase mb-3">
                ENGINEERED WITH{" "}
                <span className="font-bodoni italic font-normal bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block pr-2">
                  Precision &amp; Intelligence.
                </span>
              </h3>

              <p className="font-sans text-[11px] sm:text-xs text-neutral-600 font-normal max-w-xl leading-relaxed">
                Three specialized spatial nodes powering real-time WebGL rendering, neural design matrices, and zero-latency global edge deployment.
              </p>
            </div>

            {/* 2. 3 Sleek Modern Visual Graphic Cards - Shifted Lower Down with Clear Breathing Room */}
            <div className="product-layer-fg w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left mt-4 sm:mt-8 md:mt-12 translate-y-3 sm:translate-y-6 md:translate-y-8">
              
              {/* Card 1: Architecture Engine */}
              <button
                type="button"
                onClick={() => handleSimulateClick("build")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border bg-white/90 backdrop-blur-xl ${
                  activeTab === "build"
                    ? "border-cyan-500/80 shadow-[0_20px_45px_rgba(56,189,248,0.25)] scale-[1.03] ring-2 ring-cyan-400/40"
                    : "border-neutral-200/80 hover:border-blue-400/60 shadow-[0_15px_35px_rgba(37,99,235,0.06)] hover:scale-[1.01]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <img
                    src="/assets/card-architecture-engine.jpg"
                    alt="Architecture Engine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {activeTab === "build" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#38bdf8]" />
                )}
              </button>

              {/* Card 2: Neural Design Matrix */}
              <button
                type="button"
                onClick={() => handleSimulateClick("ai")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border bg-white/90 backdrop-blur-xl ${
                  activeTab === "ai"
                    ? "border-blue-500/80 shadow-[0_20px_45px_rgba(59,130,246,0.25)] scale-[1.03] ring-2 ring-blue-400/40"
                    : "border-neutral-200/80 hover:border-blue-400/60 shadow-[0_15px_35px_rgba(37,99,235,0.06)] hover:scale-[1.01]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <img
                    src="/assets/card-neural-matrix.png"
                    alt="Neural Design Matrix"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {activeTab === "ai" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_#3b82f6]" />
                )}
              </button>

              {/* Card 3: Edge Deployment */}
              <button
                type="button"
                onClick={() => handleSimulateClick("deploy")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border bg-white/90 backdrop-blur-xl ${
                  activeTab === "deploy"
                    ? "border-indigo-500/80 shadow-[0_20px_45px_rgba(99,102,241,0.25)] scale-[1.03] ring-2 ring-indigo-400/40"
                    : "border-neutral-200/80 hover:border-blue-400/60 shadow-[0_15px_35px_rgba(37,99,235,0.06)] hover:scale-[1.01]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <img
                    src="/assets/card-edge-deployment.jpg"
                    alt="Edge Deployment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {activeTab === "deploy" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_#6366f1]" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 06 — EXPERIENCE (CLEAN OFFICIAL BOXLESS SHOWCASE)      */}
        {/* ========================================================= */}
        <div className="act-06 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-12 transition-transform">
          
          {/* Subtle Top Metadata Headers */}
          <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>SYS // DESIGN FRAMEWORK</span>
          </div>

          <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span>ACT.06 / EXPERIENCE</span>
          </div>

          <div className="exp-flow w-full max-w-7xl flex flex-col items-center my-auto">
            {/* Minimal Monospace Header */}
            <div className="flex flex-col items-center mb-8 sm:mb-12">
              <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.35em] text-white uppercase mb-1.5">
                <span className="w-8 h-[1px] bg-white/20" />
                <span>EXPERIENCE THE PROCESS</span>
                <span className="w-8 h-[1px] bg-white/20" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                FROM CONCEPT TO DIGITAL REALITY
              </span>
            </div>

            {/* 3-Column Clean Boxless Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full text-left relative items-stretch">
              
              {/* Column 01: System Specification */}
              <div className="flex flex-col justify-between group">
                <div>
                  {/* Top Number & Tag */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                    <span className="font-mono font-bold text-base sm:text-lg text-amber-400 tracking-wider">
                      01
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-amber-400/80 uppercase">
                      INPUT // SPECIFICATION
                    </span>
                  </div>

                  {/* Normal Main Title */}
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight mb-1.5 group-hover:text-amber-200 transition-colors">
                    System Specification
                  </h4>

                  {/* Micro Subtext Description */}
                  <p className="font-sans text-[11px] sm:text-xs text-neutral-400 font-normal leading-relaxed mb-4">
                    Precise architectural vision &amp; technical specification defined from day one.
                  </p>

                  {/* Micro Feature Bullet Points */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
                    {[
                      "Design System Blueprint",
                      "Tech Stack Architecture",
                      "Interactive Wireframes",
                      "Requirement Mapping",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Gold Tablet Graphic */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40 group-hover:border-amber-400/40 transition-all duration-500 shadow-lg">
                  <img
                    src="/assets/exp-3d-input-gold.jpg"
                    alt="01 System Specification 3D Asset"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Column 02: GPU Render Pipeline */}
              <div className="flex flex-col justify-between group">
                <div>
                  {/* Top Number & Tag */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                    <span className="font-mono font-bold text-base sm:text-lg text-sky-400 tracking-wider">
                      02
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-sky-400/80 uppercase">
                      ENGINE // PIPELINE
                    </span>
                  </div>

                  {/* Normal Main Title */}
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight mb-1.5 group-hover:text-sky-200 transition-colors">
                    GPU Render Pipeline
                  </h4>

                  {/* Micro Subtext Description */}
                  <p className="font-sans text-[11px] sm:text-xs text-neutral-400 font-normal leading-relaxed mb-4">
                    High-throughput WebGL, React 19, and optimized GPU frame pipelines.
                  </p>

                  {/* Micro Feature Bullet Points */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
                    {[
                      "Custom Shaders",
                      "WebGL Acceleration",
                      "60FPS Physics Engine",
                      "Dynamic Geometry",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Cyan Stack Graphic */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40 group-hover:border-sky-400/40 transition-all duration-500 shadow-lg">
                  <img
                    src="/assets/exp-3d-engine-blue.jpg"
                    alt="02 GPU Render Pipeline 3D Asset"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Column 03: Cinematic Output */}
              <div className="flex flex-col justify-between group">
                <div>
                  {/* Top Number & Tag */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                    <span className="font-mono font-bold text-base sm:text-lg text-emerald-400 tracking-wider">
                      03
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-400/80 uppercase">
                      RESULT // OUTPUT
                    </span>
                  </div>

                  {/* Normal Main Title */}
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight mb-1.5 group-hover:text-emerald-200 transition-colors">
                    Cinematic Output
                  </h4>

                  {/* Micro Subtext Description */}
                  <p className="font-sans text-[11px] sm:text-xs text-neutral-400 font-normal leading-relaxed mb-4">
                    A flawless cinematic digital product engineered to redefine benchmarks.
                  </p>

                  {/* Micro Feature Bullet Points */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
                    {[
                      "Pixel-Perfect Render",
                      "3D Spatial Audio",
                      "Cross-Platform Ready",
                      "Enterprise Security",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Emerald Screen Graphic */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40 group-hover:border-emerald-400/40 transition-all duration-500 shadow-lg">
                  <img
                    src="/assets/exp-3d-result-green.jpg"
                    alt="03 Cinematic Output 3D Asset"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 07 — ENGINE / ARCHITECTURE (AI CYBERNETIC CORES)      */}
        {/* ========================================================= */}
        <div className="act-07 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 transition-transform z-10 pointer-events-auto">
          {/* Futuristic Section Header */}
          <div className="engine-header flex flex-col items-center mb-6 sm:mb-8 relative z-20 select-none">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold tracking-[0.35em] text-white uppercase">
              <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400" />
              <span className="drop-shadow-[0_0_16px_rgba(255,255,255,0.25)]">ENGINEERED FROM THE GROUND UP</span>
              <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-emerald-400 via-emerald-400/50 to-transparent" />
            </div>
          </div>

          <EngineArchitectureGrid onHoverSound={playHover} />
        </div>

        {/* ========================================================= */}
        {/* ACT WHY US — CLEAN INQUIRY (WHY CHOOSE US?)               */}
        {/* ========================================================= */}
        <div className="act-why-us absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform z-10 pointer-events-none">
          <div className="why-us-content flex flex-col items-center max-w-4xl select-none">
            {/* Clean White Title */}
            <h2 className="why-us-title font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Why Choose Us?
            </h2>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT WHY CHOOSE — DIGITAL EXPLANATION // CLEAN & SECURE    */}
        {/* ========================================================= */}
        <div className="act-why-choose absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-2.5 sm:px-6 transition-transform z-10 pointer-events-auto overflow-y-auto lg:overflow-visible py-3 sm:py-0">
          {/* Header */}
          <div className="why-choose-header flex flex-col items-center mb-2.5 sm:mb-5 lg:mb-7 relative z-20 select-none">
            <h3 className="font-sans font-extrabold text-base sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-tight uppercase">
              WHY ENTRUST YOUR PROJECT TO US
            </h3>
            <p className="font-sans text-[10px] sm:text-xs md:text-sm text-neutral-400 mt-1 max-w-xl">
              Digitally engineered with clean architecture, enterprise-grade security, and deterministic on-time delivery.
            </p>
          </div>

          <WhyChooseAlgoraGrid onHoverSound={playHover} />
        </div>

        {/* ========================================================= */}
        {/* ACT 08 — FOUNDER CONNECTION (EXECUTIVE PROFESSIONAL LOCKUP) */}
        {/* ========================================================= */}
        <div className="act-08 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="founder-header flex flex-col items-center mb-8 max-w-3xl">
            {/* Clean Vector Emblem */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 flex items-center justify-center">
              <svg viewBox="315 85 394 450" className="w-full h-full text-white overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="20" />
                <polygon points="512,197 483,243.5 550,368 604,368" fill="white" stroke="none" />
                <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" fill="white" stroke="none" />
              </svg>
            </div>

            <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-neutral-400 uppercase mb-2">
              CREATIVE DIRECTION &amp; LEADERSHIP
            </span>

            <h3 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none">
              BUILT BY GOURAB
            </h3>
          </div>

          {/* Clean Editorial Roles Line (No Capsules, No Box Card) */}
          <div className="founder-roles flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 font-mono text-xs sm:text-sm text-neutral-400 font-medium tracking-[0.2em] uppercase max-w-2xl px-4">
            <span>FOUNDER &amp; ARCHITECT</span>
            <span className="text-amber-400 font-bold">•</span>
            <span>LEAD PRODUCT ENGINEER</span>
            <span className="text-cyan-400 font-bold hidden sm:inline-block">•</span>
            <span>UI/UX &amp; MOTION SYSTEMS</span>
            <span className="text-purple-400 font-bold hidden sm:inline-block">•</span>
            <span>CREATIVE TECHNOLOGIST</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 09 — VISION (HIGH-END EDITORIAL TYPOGRAPHY)           */}
        {/* ========================================================= */}
        <div className="act-09 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="vision-text max-w-4xl flex flex-col items-center">
            {/* Top Micro Monospace Category Tag */}
            <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-neutral-400 uppercase mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>NEXT HORIZON</span>
            </span>

            {/* High-Contrast Editorial Headline */}
            <h3 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none mb-6">
              THIS IS ONLY THE <span className="font-bodoni italic font-normal text-amber-200 lowercase tracking-normal">beginning.</span>
            </h3>

            {/* Refined Subtext Paragraph */}
            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed tracking-wide">
              Building toward autonomous creative systems and seamless cinematic digital experiences.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 10 — FINAL BRAND LOCKUP (OPEN MINIMAL EDITORIAL)     */}
        {/* ========================================================= */}
        <div className="act-10 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          {/* Open Vector Emblem - Large prominent circular logo matching reference */}
          <div className="act-10-logo mb-7 sm:mb-9 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center transition-transform">
            <svg viewBox="315 85 394 450" className="w-full h-full text-white overflow-visible drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
              <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="20" />
              <polygon points="512,197 483,243.5 550,368 604,368" fill="white" stroke="none" />
              <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" fill="white" stroke="none" />
            </svg>
          </div>

          {/* Original Clean Geometric Brand Title Matching Image 2 Reference */}
          <h2 className="act-10-name font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-[0.55em] sm:tracking-[0.65em] pl-[0.55em] sm:pl-[0.65em] text-white uppercase mb-5 leading-none">
            ALGORA
          </h2>

          {/* Open Founder Credit */}
          <span className="act-10-founder font-mono text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-[0.3em] pl-[0.3em] mb-8 sm:mb-10 block">
            FOUNDED &amp; BUILT BY GOURAB
          </span>

          {/* Cool Modern Minimal Text CTA (No Capsule / Box) */}
          <a
            href="#skills"
            onMouseEnter={() => playHover()}
            className="act-10-cta pointer-events-auto inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-white hover:text-amber-300 uppercase transition-all duration-300 pb-1.5 border-b border-white/30 hover:border-amber-300 cursor-pointer"
          >
            <span>EXPLORE TECH STACK</span>
            <ArrowUpRight className="w-4 h-4 text-white hover:text-amber-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
