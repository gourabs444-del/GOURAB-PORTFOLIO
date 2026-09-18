"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles, Check, Database, Zap, Code, ShieldCheck } from "lucide-react";
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

      // Continuous Zoom-Through Camera Transition into Product (3.6 -> 4.1)
      tl.to(
        [".act-04-text", ".act-04-sub"],
        { scale: isMobile ? 3 : 5.5, opacity: 0, filter: "blur(18px)", duration: 0.5, ease: "power2.in" },
        3.6
      );
      tl.to(".act-04", { opacity: 0, duration: 0.3 }, 3.85);

      // =======================================================================
      // 05 — PRODUCT REVEAL (Time: 3.8 -> 5.0, Exits 4.7 -> 5.1)
      // =======================================================================
      tl.to(".act-05", { opacity: 1, pointerEvents: "auto", duration: 0.3 }, 3.8);

      tl.fromTo(
        ".product-layer-bg",
        { opacity: 0, y: 60, scale: 0.88 },
        { opacity: 0.5, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
        3.9
      );

      tl.fromTo(
        ".product-frame",
        { opacity: 0, y: 45, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
        4.0
      );

      tl.fromTo(
        ".product-layer-fg",
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
        4.15
      );

      // Morphing Exit into Act 06 (4.7 -> 5.1)
      tl.to(".act-05", { opacity: 0, scale: 0.93, y: -30, pointerEvents: "none", duration: 0.4, ease: "power2.inOut" }, 4.7);

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

        {/* ========================================================= */}
        {/* ACT 01 — THE INTERRUPTION                                 */}
        {/* ========================================================= */}
        <div className="act-01 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
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
        <div className="act-02 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
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
        {/* ACT 04 — WHY                                              */}
        {/* ========================================================= */}
        <div className="act-04 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 overflow-hidden transition-transform">
          <div className="relative max-w-4xl">
            <div className="act-04-light absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-xl pointer-events-none" />
            <h3 className="act-04-text font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight uppercase mb-4">
              BUILT FOR INTENTIONAL DIGITAL ENGINEERING.
            </h3>
            <p className="act-04-sub font-sans text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
              A simpler, highly disciplined way to architect, design, and deploy next-generation web applications.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 05 — PRODUCT REVEAL (COOL TYPOGRAPHY + SLEEK CARDS)   */}
        {/* ========================================================= */}
        <div className="act-05 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
            
            {/* Ambient Multi-Color Radial Aura (No Outer Box) */}
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.12)_0%,_rgba(232,121,249,0.1)_45%,_transparent_75%)] rounded-full blur-[100px]" />

            {/* 1. Cool Kinetic Typography Headline */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="font-mono text-xs font-extrabold tracking-[0.3em] text-cyan-400 uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ALGORA ENGINE // SYSTEM ARCHITECTURE
              </span>
              
              <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight uppercase mb-4">
                ENGINEERED WITH{" "}
                <span className="font-bodoni italic font-normal bg-gradient-to-r from-cyan-200 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent inline-block pr-2">
                  Precision &amp; Intelligence.
                </span>
              </h3>

              <p className="font-sans text-sm sm:text-base text-neutral-400 font-light max-w-xl leading-relaxed">
                Three specialized spatial nodes powering real-time WebGL rendering, neural design matrices, and zero-latency global edge deployment.
              </p>
            </div>

            {/* 2. 3 Sleek Modern Visual Graphic Cards */}
            <div className="product-layer-fg w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Card 1: Architecture Engine */}
              <button
                type="button"
                onClick={() => handleSimulateClick("build")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border ${
                  activeTab === "build"
                    ? "border-cyan-400/60 shadow-[0_15px_40px_rgba(56,189,248,0.3)] scale-[1.03] ring-1 ring-cyan-400/40"
                    : "border-white/10 hover:border-white/30 hover:scale-[1.01]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src="/assets/card-architecture-engine.jpg"
                    alt="Architecture Engine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {activeTab === "build" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8]" />
                )}
              </button>

              {/* Card 2: Neural Design Matrix */}
              <button
                type="button"
                onClick={() => handleSimulateClick("ai")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border ${
                  activeTab === "ai"
                    ? "border-fuchsia-400/60 shadow-[0_15px_40px_rgba(232,121,249,0.3)] scale-[1.03] ring-1 ring-fuchsia-400/40"
                    : "border-white/10 hover:border-white/30 hover:scale-[1.01]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src="/assets/card-neural-matrix.png"
                    alt="Neural Design Matrix"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {activeTab === "ai" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_15px_#e879f9]" />
                )}
              </button>

              {/* Card 3: Edge Deployment */}
              <button
                type="button"
                onClick={() => handleSimulateClick("deploy")}
                className={`group relative rounded-2xl transition-all duration-300 text-left cursor-pointer overflow-hidden border ${
                  activeTab === "deploy"
                    ? "border-amber-400/60 shadow-[0_15px_40px_rgba(245,158,11,0.3)] scale-[1.03] ring-1 ring-amber-400/40"
                    : "border-white/10 hover:border-white/30 hover:scale-[1.01]"
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src="/assets/card-edge-deployment.jpg"
                    alt="Edge Deployment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {activeTab === "deploy" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 06 — EXPERIENCE (ULTRA-CLEAN BOXLESS & CAPSULE-FREE)  */}
        {/* ========================================================= */}
        <div className="act-06 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 transition-transform">
          <div className="exp-flow w-full max-w-6xl flex flex-col items-center">
            {/* Minimal Monospace Header */}
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-[0.3em] text-neutral-400 uppercase mb-12 sm:mb-16">
              <span className="w-6 h-[1.5px] bg-white/20" />
              <span>EXPERIENCE THE PROCESS</span>
              <span className="w-6 h-[1.5px] bg-white/20" />
            </div>

            {/* Clean Boxless 3-Column Grid with Minimal Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full text-left relative divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              {/* Item 1: INPUT */}
              <div className="flex flex-col justify-between pt-6 md:pt-0 md:px-6 first:pl-0 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bodoni italic font-normal text-4xl sm:text-5xl text-amber-400/90 tracking-tight">
                      01
                    </span>
                    <Terminal className="w-5 h-5 text-amber-400/80 stroke-[1.5]" />
                  </div>

                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-amber-400/90 uppercase block mb-2">
                    INPUT // SPECIFICATION
                  </span>

                  <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight mb-3 group-hover:text-amber-200 transition-colors">
                    System Specification
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
                    Precise architectural vision &amp; technical specification defined from day one.
                  </p>
                </div>
              </div>

              {/* Item 2: ENGINE */}
              <div className="flex flex-col justify-between pt-6 md:pt-0 md:px-8 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bodoni italic font-normal text-4xl sm:text-5xl text-sky-400/90 tracking-tight">
                      02
                    </span>
                    <Cpu className="w-5 h-5 text-sky-400/80 stroke-[1.5]" />
                  </div>

                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-sky-400/90 uppercase block mb-2">
                    ENGINE // PIPELINE
                  </span>

                  <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight mb-3 group-hover:text-sky-200 transition-colors">
                    GPU Render Pipeline
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
                    High-throughput WebGL, React 19, and optimized GPU frame pipelines.
                  </p>
                </div>
              </div>

              {/* Item 3: RESULT */}
              <div className="flex flex-col justify-between pt-6 md:pt-0 md:px-8 last:pr-0 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bodoni italic font-normal text-4xl sm:text-5xl text-emerald-400/90 tracking-tight">
                      03
                    </span>
                    <Layers className="w-5 h-5 text-emerald-400/80 stroke-[1.5]" />
                  </div>

                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-emerald-400/90 uppercase block mb-2">
                    RESULT // OUTPUT
                  </span>

                  <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight mb-3 group-hover:text-emerald-200 transition-colors">
                    Cinematic Output
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
                    A flawless cinematic digital product engineered to redefine benchmarks.
                  </p>
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
