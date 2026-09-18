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
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
        5.9
      );

      tl.fromTo(
        ".engine-line",
        { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
        6.05
      );

      tl.fromTo(
        ".engine-node",
        { opacity: 0, scale: 0.7, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "back.out(1.5)" },
        6.15
      );

      // Morphing Exit into Act 08 (6.7 -> 7.1)
      tl.to(".act-07", { opacity: 0, scale: 0.88, y: -30, duration: 0.4, ease: "power2.inOut" }, 6.7);

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
        ".founder-pill",
        { opacity: 0, y: 20, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.08, ease: "power3.out" },
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
        {/* ACT 05 — PRODUCT REVEAL (ULTRA-MINIMAL STUDIO TELEMETRY)  */}
        {/* ========================================================= */}
        <div className="act-05 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Minimal Framing Container with Hairline Border */}
            <div className="product-frame w-full border-y border-white/10 py-6 sm:py-8 px-4 sm:px-8 text-left bg-black/40 backdrop-blur-md">
              
              {/* Minimal Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                <span className="text-white font-bold tracking-widest">ALGORA // STUDIO ENGINE v2.4</span>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYSTEM ACTIVE // 60 FPS</span>
                </div>
              </div>

              {/* Minimal 2-Column Interface Grid */}
              <div className="product-layer-fg grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Minimal Workflow Nodes List */}
                <div className="md:col-span-1 flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
                    SELECT WORKFLOW NODE
                  </span>
                  
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleSimulateClick("build")}
                      className={`pl-3 py-2 text-xs font-mono font-bold text-left transition-all duration-200 border-l-2 flex items-center justify-between ${
                        activeTab === "build"
                          ? "border-white text-white bg-white/[0.04]"
                          : "border-transparent text-neutral-400 hover:text-white hover:border-white/30"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Code className="w-3.5 h-3.5" />
                        <span>Architecture Engine</span>
                      </span>
                      {activeTab === "build" && <Check className="w-3 h-3 text-white" />}
                    </button>

                    <button
                      onClick={() => handleSimulateClick("ai")}
                      className={`pl-3 py-2 text-xs font-mono font-bold text-left transition-all duration-200 border-l-2 flex items-center justify-between ${
                        activeTab === "ai"
                          ? "border-white text-white bg-white/[0.04]"
                          : "border-transparent text-neutral-400 hover:text-white hover:border-white/30"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Neural Design Matrix</span>
                      </span>
                      {activeTab === "ai" && <Check className="w-3 h-3 text-white" />}
                    </button>

                    <button
                      onClick={() => handleSimulateClick("deploy")}
                      className={`pl-3 py-2 text-xs font-mono font-bold text-left transition-all duration-200 border-l-2 flex items-center justify-between ${
                        activeTab === "deploy"
                          ? "border-white text-white bg-white/[0.04]"
                          : "border-transparent text-neutral-400 hover:text-white hover:border-white/30"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Edge Deployment</span>
                      </span>
                      {activeTab === "deploy" && <Check className="w-3 h-3 text-white" />}
                    </button>
                  </div>
                </div>

                {/* Right: Minimal Live Telemetry Output */}
                <div className="md:col-span-2 flex flex-col justify-between border-l border-white/10 pl-0 md:pl-8 pt-4 md:pt-0 min-h-[180px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-400 uppercase pb-2 border-b border-white/10">
                      <span>LIVE TELEMETRY OUTPUT</span>
                      <span className="text-emerald-400 font-bold">STATUS: OK</span>
                    </div>

                    <div className="font-mono text-xs text-white py-2 flex items-center gap-2">
                      <span className="text-neutral-400">&gt;</span>
                      <span>{promptText}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{isProcessing ? "Executing Live Pipeline..." : demoResult}</span>
                    </span>
                    <ShieldCheck className="w-4 h-4 text-white/60 shrink-0" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 06 — EXPERIENCE (3 CLEAN ISOLATED FROSTED CARDS)      */}
        {/* ========================================================= */}
        <div className="act-06 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="exp-flow w-full max-w-5xl flex flex-col items-center">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase mb-8">
              EXPERIENCE THE PROCESS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
              {/* Card 1: INPUT */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-amber-400/90 font-bold tracking-widest uppercase block mb-1">
                    1. INPUT
                  </span>
                  <h4 className="font-sans font-extrabold text-lg text-white tracking-tight mb-2">
                    System Specification
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    Precise architectural vision &amp; technical specification defined from day one.
                  </p>
                </div>
              </div>

              {/* Card 2: ENGINE */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-sky-400/90 font-bold tracking-widest uppercase block mb-1">
                    2. ENGINE
                  </span>
                  <h4 className="font-sans font-extrabold text-lg text-white tracking-tight mb-2">
                    GPU Render Pipeline
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    High-throughput WebGL, React 19, and optimized GPU frame pipelines.
                  </p>
                </div>
              </div>

              {/* Card 3: RESULT */}
              <div className="p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400/90 font-bold tracking-widest uppercase block mb-1">
                    3. RESULT
                  </span>
                  <h4 className="font-sans font-extrabold text-lg text-white tracking-tight mb-2">
                    Cinematic Output
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    A flawless cinematic digital product engineered to redefine benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 07 — ENGINE / ARCHITECTURE (CLEAN ISOLATED NODES)     */}
        {/* ========================================================= */}
        <div className="act-07 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase mb-8">
            ENGINEERED FROM THE GROUND UP
          </span>

          <div className="engine-graph relative w-full max-w-5xl p-6 sm:p-10 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
            {/* SVG Connecting Signal Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300">
              <line className="engine-line" x1="150" y1="150" x2="300" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" />
              <line className="engine-line" x1="300" y1="150" x2="450" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
              <line className="engine-line" x1="450" y1="150" x2="650" y2="150" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {/* Node 1 */}
              <div className="engine-node p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col items-center group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  <Code className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-xs text-white tracking-wide uppercase mb-1">
                  NEXT.JS 15
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  REACT 19 / TS
                </span>
              </div>

              {/* Node 2 */}
              <div className="engine-node p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col items-center group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-xs text-white tracking-wide uppercase mb-1">
                  GSAP &amp; WEBGLEngine
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  60FPS SHADERS
                </span>
              </div>

              {/* Node 3 */}
              <div className="engine-node p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col items-center group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-xs text-white tracking-wide uppercase mb-1">
                  NODE.JS API
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  EDGE ROUTING
                </span>
              </div>

              {/* Node 4 */}
              <div className="engine-node p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col items-center group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  <Database className="w-5 h-5" />
                </div>
                <span className="font-sans font-extrabold text-xs text-white tracking-wide uppercase mb-1">
                  POSTGRES &amp; AI
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
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

          {/* Professional Executive Roles Container */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl max-w-3xl w-full flex flex-wrap items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="founder-pill px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                FOUNDER &amp; ARCHITECT
              </span>
            </div>

            <div className="founder-pill px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                LEAD PRODUCT ENGINEER
              </span>
            </div>

            <div className="founder-pill px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                UI/UX &amp; MOTION SYSTEMS
              </span>
            </div>

            <div className="founder-pill px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                CREATIVE TECHNOLOGIST
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 09 — VISION                                           */}
        {/* ========================================================= */}
        <div className="act-09 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="vision-text max-w-3xl flex flex-col items-center">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase mb-3">
              NEXT HORIZON
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight mb-4">
              THIS IS ONLY THE BEGINNING.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl font-light leading-relaxed">
              Building toward autonomous creative systems and seamless cinematic digital experiences.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 10 — FINAL BRAND LOCKUP                               */}
        {/* ========================================================= */}
        <div className="act-10 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-transform">
          <div className="act-10-logo mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg viewBox="315 85 394 450" className="w-full h-full text-white overflow-visible">
              <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="20" />
              <polygon points="512,197 483,243.5 550,368 604,368" fill="white" stroke="none" />
              <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" fill="white" stroke="none" />
            </svg>
          </div>

          <h2 className="act-10-name font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[0.32em] text-white uppercase mb-6">
            ALGORA
          </h2>

          <span className="act-10-founder font-mono text-xs text-neutral-400 uppercase tracking-widest mb-8">
            FOUNDED &amp; BUILT BY GOURAB
          </span>

          <a
            href="#skills"
            onMouseEnter={() => playHover()}
            className="act-10-cta inline-flex items-center gap-2 px-7 py-3 rounded-none bg-white text-black hover:bg-neutral-100 font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] border border-white cursor-pointer active:scale-95"
          >
            <span>EXPLORE TECH STACK</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </a>
        </div>
      </div>
    </section>
  );
}
