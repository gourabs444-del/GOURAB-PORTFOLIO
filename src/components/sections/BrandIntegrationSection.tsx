"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles, Check, Database, Zap, Code, ShieldCheck, ChevronRight } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

export function BrandIntegrationSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  // Interactive Product Demo State
  const [activeTab, setActiveTab] = useState<"build" | "ai" | "deploy">("build");
  const [promptText, setPromptText] = useState("Generate high-performance WebGL portfolio architecture");
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoResult, setDemoResult] = useState<string | null>("System Ready // 60FPS Render Pipeline Active");

  const handleSimulateClick = (tab: "build" | "ai" | "deploy") => {
    setActiveTab(tab);
    setIsProcessing(true);
    playHover();
    setTimeout(() => {
      setIsProcessing(false);
      if (tab === "build") setDemoResult("Modular React 19 + GSAP Engine Deployed");
      if (tab === "ai") setDemoResult("Neural Design Matrix Tokenized [99.8% Precision]");
      if (tab === "deploy") setDemoResult("Edge Node Sync Complete // Latency 14ms");
    }, 600);
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
      // 01 — THE INTERRUPTION (Time: 0.0 -> 1.0, Exits 0.7 -> 1.1)
      // =======================================================================
      tl.to(".act-01", { opacity: 1, duration: 0.2 }, 0.0);

      tl.fromTo(
        ".act-01-text",
        { opacity: 0, filter: "blur(14px)", y: 35 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.5, ease: "power2.out" },
        0.05
      );

      tl.fromTo(
        ".act-01-emph",
        { opacity: 0.6, scale: 0.98 },
        { opacity: 1, scale: 1.05, color: "#ffffff", duration: 0.3, ease: "power1.out" },
        0.4
      );

      // Morphing Exit into Act 02 (0.7 -> 1.1)
      tl.to(
        ".act-01-text",
        { opacity: 0, filter: "blur(10px)", y: -45, scale: 0.95, duration: 0.4, ease: "power2.in" },
        0.7
      );
      tl.to(".act-01", { opacity: 0, duration: 0.3 }, 0.85);

      // =======================================================================
      // 02 & 03 — BRAND REVEAL & LOGO DRAW (Time: 0.8 -> 3.0, Exits 2.7 -> 3.2)
      // =======================================================================
      tl.to(".act-02", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.8);

      // Smooth, natural vector SVG stroke drawing
      tl.fromTo(
        ".svg-circle",
        { strokeDasharray: 1100, strokeDashoffset: 1100, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        0.85
      );

      tl.fromTo(
        [".svg-poly", ".svg-path"],
        { strokeDasharray: 600, strokeDashoffset: 600, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.1 },
        1.0
      );

      // Soft, seamless white fill transition for inner emblem
      tl.to(
        [".svg-poly", ".svg-path"],
        { fill: "#ffffff", duration: 0.6, ease: "power2.inOut" },
        1.45
      );

      // Ultra-smooth ALGORA title fade-up directly beneath emblem
      tl.fromTo(
        ".brand-name",
        { opacity: 0, y: 16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power2.out" },
        1.5
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
        ".act-white-canvas",
        { opacity: 1, duration: 0.45, ease: "power2.inOut" },
        3.65
      );
      tl.to(".act-04-text", { opacity: 0, duration: 0.15 }, 3.9);
      tl.to(".act-04", { opacity: 0, duration: 0.2 }, 3.9);

      // =======================================================================
      // 05 — PRODUCT REVEAL ON WHITE BACKGROUND (Time: 3.85 -> 5.0, Exits 4.7 -> 5.1)
      // =======================================================================
      tl.to(".act-05", { opacity: 1, pointerEvents: "auto", duration: 0.35 }, 3.85);

      tl.fromTo(
        ".product-layer-fg",
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
        4.0
      );

      // Morphing Exit into Act 06 (4.7 -> 5.1): White canvas gently returns to dark for Act 06
      tl.to(".act-05", { opacity: 0, scale: 0.94, y: -30, pointerEvents: "none", duration: 0.4, ease: "power2.inOut" }, 4.7);
      tl.to(".act-white-canvas", { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 4.75);

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
        ".engine-graph",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
        5.9
      );

      tl.fromTo(
        ".engine-node",
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power3.out" },
        6.05
      );

      // Morphing Exit into Act 08 (6.7 -> 7.1)
      tl.to(".act-07", { opacity: 0, scale: 0.92, y: -30, duration: 0.4, ease: "power2.inOut" }, 6.7);

      // =======================================================================
      // 08 — FOUNDER CONNECTION (Time: 6.8 -> 8.0, Exits 7.7 -> 8.1)
      // =======================================================================
      tl.to(".act-08", { opacity: 1, duration: 0.3 }, 6.8);

      tl.fromTo(
        ".founder-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        6.95
      );

      tl.fromTo(
        ".founder-roles",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        7.15
      );

      // Morphing Exit into Act 09 (7.7 -> 8.1)
      tl.to(".act-08", { opacity: 0, y: -40, scale: 0.94, duration: 0.4, ease: "power2.inOut" }, 7.7);

      // =======================================================================
      // 09 — VISION (Time: 7.8 -> 8.8, Exits 8.6 -> 9.0)
      // =======================================================================
      tl.to(".act-09", { opacity: 1, duration: 0.3 }, 7.8);

      tl.fromTo(
        ".vision-text",
        { opacity: 0, scale: 0.94, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
        7.95
      );

      // Morphing Exit into Act 10 (8.6 -> 9.0)
      tl.to(".act-09", { opacity: 0, scale: 0.94, filter: "blur(10px)", duration: 0.4, ease: "power2.inOut" }, 8.6);

      // =======================================================================
      // 10 — FINAL BRAND LOCKUP (Time: 8.8 -> 10.0)
      // =======================================================================
      tl.to(".act-10", { opacity: 1, pointerEvents: "auto", duration: 0.3 }, 8.8);

      tl.fromTo(
        ".act-10-logo",
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" },
        8.95
      );

      tl.fromTo(
        ".act-10-name",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        9.1
      );

      tl.fromTo(
        ".act-10-tag",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        9.25
      );

      tl.fromTo(
        [".act-10-founder", ".act-10-cta"],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" },
        9.4
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="brand-integration"
      className="relative w-full h-[800vh] bg-[#030305] text-white select-none overflow-clip border-t border-white/10"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 z-20"
      >
        {/* Subtle Ambient Background Grid & Lighting */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08)_0%,_rgba(56,189,248,0.05)_45%,_transparent_75%)] rounded-full blur-[130px] pointer-events-none" />

        {/* Cinematic White Canvas Layer (Revealed when Act 04 white text zooms into camera) */}
        <div className="act-white-canvas absolute inset-0 w-full h-full bg-[#FAF7F2] bg-gradient-to-br from-[#FFFFFF] via-[#FAF6F0] to-[#F4ECE1] opacity-0 pointer-events-none z-[5] will-change-transform" />

        {/* ========================================================= */}
        {/* ACT 01 — THE INTERRUPTION                                 */}
        {/* ========================================================= */}
        <div className="act-01 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform z-10">
          <p className="act-01-text font-display font-medium text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight leading-snug max-w-4xl">
            AN IDEA IS ONLY THE{" "}
            <span className="act-01-emph font-display font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent inline-block drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              BEGINNING.
            </span>
          </p>
        </div>

        {/* ========================================================= */}
        {/* ACT 02 & 03 — BRAND REVEAL & LOGO DRAW                    */}
        {/* ========================================================= */}
        <div className="act-02 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform z-10">
          {/* SVG Vector Logo Drawing & Lift-Up Container */}
          <div className="logo-svg-wrapper w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center transition-transform">
            <svg viewBox="315 85 394 450" className="w-full h-full text-white overflow-visible">
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

          {/* Clean Typography Title Matching Image 3 */}
          <h2 className="brand-name font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[0.32em] text-white uppercase mt-6 opacity-0">
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
            
            {/* Ambient Multi-Color Radial Aura tuned for White Canvas */}
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.15)_0%,_rgba(232,121,249,0.12)_45%,_transparent_75%)] rounded-full blur-[100px]" />

            {/* 1. Cool Kinetic Typography Headline on White Background */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="font-mono text-xs font-extrabold tracking-[0.3em] text-[#090714] bg-black/[0.05] border border-black/10 px-3.5 py-1 rounded-full uppercase mb-3 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                ALGORA ENGINE // SYSTEM ARCHITECTURE
              </span>
              
              <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#090714] tracking-tight leading-tight uppercase mb-4">
                ENGINEERED WITH{" "}
                <span className="font-bodoni italic font-normal bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-600 bg-clip-text text-transparent inline-block pr-2">
                  Precision &amp; Intelligence.
                </span>
              </h3>

              <p className="font-sans text-sm sm:text-base text-neutral-600 font-normal max-w-xl leading-relaxed">
                Three specialized spatial nodes powering real-time WebGL rendering, neural design matrices, and zero-latency global edge deployment.
              </p>
            </div>

            {/* 2. 3 Sleek Modern Visual Graphic Cards on Luxury White Surface */}
            <div className="product-layer-fg w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Card 1: Architecture Engine */}
              <button
                type="button"
                onClick={() => handleSimulateClick("build")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border bg-white/80 backdrop-blur-md ${
                  activeTab === "build"
                    ? "border-cyan-500/70 shadow-[0_20px_45px_rgba(56,189,248,0.28)] scale-[1.03] ring-2 ring-cyan-400/40"
                    : "border-black/10 hover:border-black/25 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:scale-[1.01]"
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
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border bg-white/80 backdrop-blur-md ${
                  activeTab === "ai"
                    ? "border-fuchsia-500/70 shadow-[0_20px_45px_rgba(232,121,249,0.28)] scale-[1.03] ring-2 ring-fuchsia-400/40"
                    : "border-black/10 hover:border-black/25 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:scale-[1.01]"
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
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_15px_#e879f9]" />
                )}
              </button>

              {/* Card 3: Edge Deployment */}
              <button
                type="button"
                onClick={() => handleSimulateClick("deploy")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border bg-white/80 backdrop-blur-md ${
                  activeTab === "deploy"
                    ? "border-amber-500/70 shadow-[0_20px_45px_rgba(245,158,11,0.28)] scale-[1.03] ring-2 ring-amber-400/40"
                    : "border-black/10 hover:border-black/25 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:scale-[1.01]"
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
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_#f59e0b]" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 06 — EXPERIENCE (ULTRA-HIGH-END 3-COLUMN SHOWCASE)    */}
        {/* ========================================================= */}
        <div className="act-06 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-12 transition-transform">
          
          {/* Subtle Top Metadata Headers */}
          <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>SYS // DESIGN FRAMEWORK</span>
          </div>

          <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
            <span>ACT.06 / EXPERIENCE</span>
          </div>

          <div className="exp-flow w-full max-w-7xl flex flex-col items-center my-auto">
            {/* Minimal Monospace Header */}
            <div className="flex flex-col items-center mb-6 sm:mb-10">
              <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-[0.35em] text-white uppercase mb-1">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                <span>EXPERIENCE THE PROCESS</span>
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                FROM CONCEPT TO DIGITAL REALITY
              </span>
            </div>

            {/* 3-Column Grid with Glowing Chevrons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full text-left relative items-stretch">
              
              {/* Chevron Connector 1 -> 2 (Desktop) */}
              <div className="hidden md:flex absolute left-[32.5%] top-1/2 -translate-y-1/2 z-20 items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] backdrop-blur-sm">
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Chevron Connector 2 -> 3 (Desktop) */}
              <div className="hidden md:flex absolute left-[65.8%] top-1/2 -translate-y-1/2 z-20 items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-sm">
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Column 01: INPUT / SPECIFICATION */}
              <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/[0.015] border border-amber-500/15 hover:border-amber-400/40 hover:bg-white/[0.03] transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div>
                  {/* Top Header & Number */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-bodoni italic font-normal text-4xl sm:text-5xl text-amber-400 tracking-tight drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                      01
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-amber-400/90 uppercase">
                      INPUT // SPECIFICATION
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight mb-2 group-hover:text-amber-200 transition-colors">
                    System Specification
                  </h4>

                  <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed mb-5">
                    Precise architectural vision &amp; technical specification defined from day one.
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="space-y-2 mb-5 border-t border-white/5 pt-4">
                    {[
                      "Design System Blueprint",
                      "Tech Stack Architecture",
                      "Interactive Wireframes",
                      "Requirement Mapping",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_#f59e0b]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Gold Tablet Graphic */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-amber-400/20 bg-black/40 group-hover:border-amber-400/50 transition-all duration-500 shadow-[0_8px_25px_rgba(245,158,11,0.15)]">
                  <img
                    src="/assets/exp-3d-input-gold.jpg"
                    alt="01 System Specification 3D Asset"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Column 02: ENGINE / PIPELINE */}
              <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/[0.015] border border-sky-500/15 hover:border-sky-400/40 hover:bg-white/[0.03] transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div>
                  {/* Top Header & Number */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-bodoni italic font-normal text-4xl sm:text-5xl text-sky-400 tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                      02
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-sky-400/90 uppercase">
                      ENGINE // PIPELINE
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight mb-2 group-hover:text-sky-200 transition-colors">
                    GPU Render Pipeline
                  </h4>

                  <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed mb-5">
                    High-throughput WebGL, React 19, and optimized GPU frame pipelines.
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="space-y-2 mb-5 border-t border-white/5 pt-4">
                    {[
                      "Custom Shaders",
                      "WebGL Acceleration",
                      "60FPS Physics Engine",
                      "Dynamic Geometry",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shadow-[0_0_6px_#38bdf8]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Cyan Stack Graphic */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-sky-400/20 bg-black/40 group-hover:border-sky-400/50 transition-all duration-500 shadow-[0_8px_25px_rgba(56,189,248,0.15)]">
                  <img
                    src="/assets/exp-3d-engine-blue.jpg"
                    alt="02 GPU Render Pipeline 3D Asset"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Column 03: RESULT / OUTPUT */}
              <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/[0.015] border border-emerald-500/15 hover:border-emerald-400/40 hover:bg-white/[0.03] transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div>
                  {/* Top Header & Number */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-bodoni italic font-normal text-4xl sm:text-5xl text-emerald-400 tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      03
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-emerald-400/90 uppercase">
                      RESULT // OUTPUT
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight mb-2 group-hover:text-emerald-200 transition-colors">
                    Cinematic Output
                  </h4>

                  <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed mb-5">
                    A flawless cinematic digital product engineered to redefine benchmarks.
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="space-y-2 mb-5 border-t border-white/5 pt-4">
                    {[
                      "Pixel-Perfect Render",
                      "3D Spatial Audio",
                      "Cross-Platform Ready",
                      "Enterprise Security",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_6px_#10b981]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Emerald Screen Graphic */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-emerald-400/20 bg-black/40 group-hover:border-emerald-400/50 transition-all duration-500 shadow-[0_8px_25px_rgba(16,185,129,0.15)]">
                  <img
                    src="/assets/exp-3d-result-green.jpg"
                    alt="03 Cinematic Output 3D Asset"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 07 — ENGINE / ARCHITECTURE (ULTRA-CLEAN BOXLESS NODES) */}
        {/* ========================================================= */}
        <div className="act-07 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-[0.3em] text-neutral-400 uppercase mb-8 sm:mb-10">
            <span className="w-6 h-[1.5px] bg-white/20" />
            <span>ENGINEERED FROM THE GROUND UP</span>
            <span className="w-6 h-[1.5px] bg-white/20" />
          </div>

          <div className="engine-graph relative w-full max-w-5xl mx-auto">
            {/* Architecture Node Grid (No outer box container, no connecting lines) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {/* Node 1 */}
              <div className="engine-node p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-400/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300">
                  <Code className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase mb-1 group-hover:text-amber-300 transition-colors">
                  NEXT.JS 15
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                  REACT 19 / TS
                </span>
              </div>

              {/* Node 2 */}
              <div className="engine-node p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-sky-400/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase mb-1 group-hover:text-sky-300 transition-colors">
                  GSAP &amp; WEBGLEngine
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                  60FPS SHADERS
                </span>
              </div>

              {/* Node 3 */}
              <div className="engine-node p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-400/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 rounded-xl bg-purple-400/10 border border-purple-400/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase mb-1 group-hover:text-purple-300 transition-colors">
                  NODE.JS API
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                  EDGE ROUTING
                </span>
              </div>

              {/* Node 4 */}
              <div className="engine-node p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-400/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-11 h-11 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                  <Database className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase mb-1 group-hover:text-emerald-300 transition-colors">
                  POSTGRES &amp; AI
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                  NEURAL VECTOR DB
                </span>
              </div>
            </div>
          </div>
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
              BUILT BY GOURAB.
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
          {/* Open Vector Emblem */}
          <div className="act-10-logo mb-6 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="315 85 394 450" className="w-full h-full text-white overflow-visible drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="20" />
              <polygon points="512,197 483,243.5 550,368 604,368" fill="white" stroke="none" />
              <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" fill="white" stroke="none" />
            </svg>
          </div>

          {/* Open Brand Title */}
          <h2 className="act-10-name font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-[0.35em] text-white uppercase mb-4 leading-none">
            ALGORA
          </h2>

          {/* Open Founder Credit */}
          <span className="act-10-founder font-mono text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-[0.3em] mb-10 block">
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
