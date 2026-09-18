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

      // Master Scroll-Driven Timeline over 800vh track
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

      // Class selectors scoped inside gsap.context
      const allActs = [
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

      // =======================================================================
      // INITIAL STATES
      // =======================================================================
      gsap.set(allActs, {
        opacity: 0,
        display: "none",
      });

      // -----------------------------------------------------------------------
      // ACT 01 — THE INTERRUPTION (Time: 0.0 -> 1.0)
      // -----------------------------------------------------------------------
      tl.set(".act-01", { display: "flex", opacity: 1 }, 0.0);

      tl.fromTo(
        ".act-01-text",
        { opacity: 0, filter: "blur(14px)", y: 30 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.5, ease: "power2.out" },
        0.05
      );

      tl.fromTo(
        ".act-01-emph",
        { opacity: 0.6, scale: 0.98 },
        { opacity: 1, scale: 1.05, color: "#ffffff", duration: 0.3, ease: "power1.out" },
        0.4
      );

      tl.to(
        ".act-01-text",
        { opacity: 0, filter: "blur(12px)", y: -30, duration: 0.3, ease: "power2.in" },
        0.75
      );

      tl.set(".act-01", { display: "none" }, 1.0);

      // -----------------------------------------------------------------------
      // ACT 02 — THE SIGNAL (Time: 1.0 -> 2.0)
      // -----------------------------------------------------------------------
      tl.set(".act-02", { display: "flex", opacity: 1 }, 1.0);

      tl.fromTo(
        ".signal-dot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" },
        1.05
      );

      tl.to(".signal-dot", { scale: 3, opacity: 0, duration: 0.2 }, 1.25);

      tl.fromTo(
        ".svg-circle",
        { strokeDasharray: 1100, strokeDashoffset: 1100, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        1.3
      );

      tl.fromTo(
        [".svg-poly", ".svg-path"],
        { strokeDasharray: 600, strokeDashoffset: 600, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.1 },
        1.45
      );

      tl.to(".act-02", { opacity: 0, scale: 0.96, duration: 0.2 }, 1.85);
      tl.set(".act-02", { display: "none" }, 2.0);

      // -----------------------------------------------------------------------
      // ACT 03 — BRAND REVEAL (Time: 2.0 -> 3.0)
      // -----------------------------------------------------------------------
      tl.set(".act-03", { display: "flex", opacity: 1 }, 2.0);

      tl.fromTo(
        ".brand-name",
        { opacity: 0, y: 35, clipPath: "inset(0% 0% 100% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power3.out" },
        2.1
      );

      tl.fromTo(
        ".brand-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        2.35
      );

      tl.fromTo(
        ".act-03",
        { scale: 0.98 },
        { scale: 1.02, duration: 0.4, ease: "none" },
        2.4
      );

      tl.to(".act-03", { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, 2.8);
      tl.set(".act-03", { display: "none" }, 3.0);

      // -----------------------------------------------------------------------
      // ACT 04 — WHY (Time: 3.0 -> 4.0)
      // -----------------------------------------------------------------------
      tl.set(".act-04", { display: "flex", opacity: 1 }, 3.0);

      tl.fromTo(
        ".act-04-text",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        3.08
      );

      tl.fromTo(
        ".act-04-sub",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        3.25
      );

      tl.fromTo(
        ".act-04-light",
        { xPercent: -100 },
        { xPercent: 100, duration: 0.5, ease: "power1.inOut" },
        3.2
      );

      tl.to(
        [".act-04-text", ".act-04-sub"],
        { scale: isMobile ? 3 : 5.5, opacity: 0, filter: "blur(16px)", duration: 0.4, ease: "power2.in" },
        3.6
      );

      tl.set(".act-04", { display: "none" }, 4.0);

      // -----------------------------------------------------------------------
      // ACT 05 — PRODUCT REVEAL (Time: 4.0 -> 5.0)
      // -----------------------------------------------------------------------
      tl.set(".act-05", { display: "flex", opacity: 1 }, 4.0);

      tl.fromTo(
        ".product-layer-bg",
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 0.5, y: 0, scale: 1, duration: 0.35, ease: "power2.out" },
        4.05
      );

      tl.fromTo(
        ".product-frame",
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
        4.15
      );

      tl.fromTo(
        ".product-layer-fg",
        { opacity: 0, y: 25, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
        4.3
      );

      tl.to(".act-05", { opacity: 0, scale: 0.95, duration: 0.25, ease: "power2.in" }, 4.8);
      tl.set(".act-05", { display: "none" }, 5.0);

      // -----------------------------------------------------------------------
      // ACT 06 — EXPERIENCE (Time: 5.0 -> 6.0)
      // -----------------------------------------------------------------------
      tl.set(".act-06", { display: "flex", opacity: 1 }, 5.0);

      tl.fromTo(
        ".exp-flow",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        5.1
      );

      tl.to(".act-06", { opacity: 0, y: -30, duration: 0.25 }, 5.8);
      tl.set(".act-06", { display: "none" }, 6.0);

      // -----------------------------------------------------------------------
      // ACT 07 — ENGINE / ARCHITECTURE (Time: 6.0 -> 7.0)
      // -----------------------------------------------------------------------
      tl.set(".act-07", { display: "flex", opacity: 1 }, 6.0);

      tl.fromTo(
        ".engine-graph",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
        6.05
      );

      tl.fromTo(
        ".engine-line",
        { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
        6.15
      );

      tl.fromTo(
        ".engine-node",
        { opacity: 0, scale: 0.7, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "back.out(1.5)" },
        6.25
      );

      tl.to(".act-07", { opacity: 0, scale: 0.9, duration: 0.25 }, 6.8);
      tl.set(".act-07", { display: "none" }, 7.0);

      // -----------------------------------------------------------------------
      // ACT 08 — FOUNDER CONNECTION (Time: 7.0 -> 8.0)
      // -----------------------------------------------------------------------
      tl.set(".act-08", { display: "flex", opacity: 1 }, 7.0);

      tl.fromTo(
        ".founder-header",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        7.1
      );

      tl.fromTo(
        ".founder-pill",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.08, ease: "power3.out" },
        7.3
      );

      tl.to(".act-08", { opacity: 0, y: -30, duration: 0.25 }, 7.8);
      tl.set(".act-08", { display: "none" }, 8.0);

      // -----------------------------------------------------------------------
      // ACT 09 — VISION (Time: 8.0 -> 8.8)
      // -----------------------------------------------------------------------
      tl.set(".act-09", { display: "flex", opacity: 1 }, 8.0);

      tl.fromTo(
        ".vision-text",
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" },
        8.1
      );

      tl.to(".act-09", { opacity: 0, scale: 0.96, filter: "blur(8px)", duration: 0.25 }, 8.6);
      tl.set(".act-09", { display: "none" }, 8.8);

      // -----------------------------------------------------------------------
      // ACT 10 — FINAL BRAND LOCKUP (Time: 8.8 -> 10.0)
      // -----------------------------------------------------------------------
      tl.set(".act-10", { display: "flex", opacity: 1 }, 8.8);

      tl.fromTo(
        ".act-10-logo",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" },
        8.9
      );

      tl.fromTo(
        ".act-10-name",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
        9.05
      );

      tl.fromTo(
        ".act-10-tag",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        9.2
      );

      tl.fromTo(
        [".act-10-founder", ".act-10-cta"],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" },
        9.35
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.07)_0%,_rgba(56,189,248,0.04)_45%,_transparent_75%)] rounded-full blur-[120px] pointer-events-none" />

        {/* ========================================================= */}
        {/* ACT 01 — THE INTERRUPTION                                 */}
        {/* ========================================================= */}
        <div className="act-01 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <p className="act-01-text font-display font-medium text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight leading-snug max-w-4xl">
            AN IDEA IS ONLY THE{" "}
            <span className="act-01-emph font-display font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent inline-block drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              BEGINNING.
            </span>
          </p>
        </div>

        {/* ========================================================= */}
        {/* ACT 02 — THE SIGNAL                                       */}
        {/* ========================================================= */}
        <div className="act-02 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          {/* Signal Point */}
          <div className="signal-dot w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_30px_#f59e0b] mb-6" />

          {/* SVG Vector Logo Drawing */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center">
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
        </div>

        {/* ========================================================= */}
        {/* ACT 03 — BRAND REVEAL                                     */}
        {/* ========================================================= */}
        <div className="act-03 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <img
            src="/assets/algora-icon.png"
            alt="ALGORA Emblem"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]"
          />
          <h2 className="brand-name font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] text-white uppercase mb-3">
            ALGORA
          </h2>
          <p className="brand-tagline font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-amber-400 uppercase">
            CREATIVE ENGINEERING &amp; INTELLIGENT SYSTEMS
          </p>
        </div>

        {/* ========================================================= */}
        {/* ACT 04 — WHY                                              */}
        {/* ========================================================= */}
        <div className="act-04 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
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
        {/* ACT 05 — PRODUCT REVEAL                                   */}
        {/* ========================================================= */}
        <div className="act-05 absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8">
          <div className="w-full max-w-5xl relative flex flex-col items-center">
            {/* Background Parallax Wireframe Grid */}
            <div className="product-layer-bg absolute -inset-6 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-3xl pointer-events-none" />

            {/* Main Product Interface Frame */}
            <div className="product-frame relative w-full bg-[#0d0e14] border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#08090d] border-b border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-semibold text-white/80">ALGORA // STUDIO ENGINE v2.4</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-amber-400/90">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYSTEM ACTIVE // 60 FPS</span>
                </div>
              </div>

              {/* Product Body */}
              <div className="product-layer-fg p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Control Panel */}
                <div className="md:col-span-1 flex flex-col gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/10">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
                    1. SELECT WORKFLOW NODE
                  </span>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleSimulateClick("build")}
                      className={`px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold text-left transition-all flex items-center justify-between ${
                        activeTab === "build"
                          ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Code className="w-3.5 h-3.5" />
                        <span>Architecture Engine</span>
                      </span>
                      {activeTab === "build" && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleSimulateClick("ai")}
                      className={`px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold text-left transition-all flex items-center justify-between ${
                        activeTab === "ai"
                          ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Neural Design Matrix</span>
                      </span>
                      {activeTab === "ai" && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleSimulateClick("deploy")}
                      className={`px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold text-left transition-all flex items-center justify-between ${
                        activeTab === "deploy"
                          ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Edge Deployment</span>
                      </span>
                      {activeTab === "deploy" && <Check className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Display Output Preview */}
                <div className="md:col-span-2 flex flex-col justify-between bg-black/60 p-5 rounded-xl border border-white/10 min-h-[220px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>LIVE TELEMETRY OUTPUT</span>
                      <span className="text-emerald-400 font-bold">STATUS: OK</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-amber-200">
                      {promptText}
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-medium">
                      {isProcessing ? "Executing Live Pipeline..." : demoResult}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 06 — EXPERIENCE                                       */}
        {/* ========================================================= */}
        <div className="act-06 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <div className="exp-flow w-full max-w-4xl flex flex-col items-center">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-amber-400 uppercase mb-4">
              EXPERIENCE THE PROCESS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-base text-white">1. INPUT</h4>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  Precise architectural vision &amp; technical specification defined from day one.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-base text-white">2. ENGINE</h4>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  High-throughput WebGL, React 19, and optimized GPU frame pipelines.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-base text-white">3. RESULT</h4>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  A flawless cinematic digital product engineered to redefine benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 07 — ENGINE / ARCHITECTURE                             */}
        {/* ========================================================= */}
        <div className="act-07 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase mb-6">
            ENGINEERED FROM THE GROUND UP
          </span>

          <div className="engine-graph relative w-full max-w-4xl p-8 rounded-3xl bg-black/80 border border-white/15 backdrop-blur-2xl">
            {/* SVG Connecting Signal Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300">
              <line className="engine-line" x1="150" y1="150" x2="300" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" />
              <line className="engine-line" x1="300" y1="150" x2="450" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
              <line className="engine-line" x1="450" y1="150" x2="650" y2="150" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              <div className="engine-node p-4 rounded-xl bg-white/5 border border-amber-400/30 flex flex-col items-center">
                <Code className="w-6 h-6 text-amber-400 mb-2" />
                <span className="font-sans font-bold text-xs text-white">NEXT.JS 15</span>
                <span className="font-mono text-[10px] text-neutral-400">REACT 19 / TS</span>
              </div>

              <div className="engine-node p-4 rounded-xl bg-white/5 border border-sky-400/30 flex flex-col items-center">
                <Layers className="w-6 h-6 text-sky-400 mb-2" />
                <span className="font-sans font-bold text-xs text-white">GSAP &amp; WEBGLEngine</span>
                <span className="font-mono text-[10px] text-neutral-400">60FPS SHADERS</span>
              </div>

              <div className="engine-node p-4 rounded-xl bg-white/5 border border-purple-400/30 flex flex-col items-center">
                <Cpu className="w-6 h-6 text-purple-400 mb-2" />
                <span className="font-sans font-bold text-xs text-white">NODE.JS API</span>
                <span className="font-mono text-[10px] text-neutral-400">EDGE ROUTING</span>
              </div>

              <div className="engine-node p-4 rounded-xl bg-white/5 border border-emerald-400/30 flex flex-col items-center">
                <Database className="w-6 h-6 text-emerald-400 mb-2" />
                <span className="font-sans font-bold text-xs text-white">POSTGRES &amp; AI</span>
                <span className="font-mono text-[10px] text-neutral-400">NEURAL VECTOR DB</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 08 — FOUNDER CONNECTION                               */}
        {/* ========================================================= */}
        <div className="act-08 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <div className="founder-header flex flex-col items-center mb-8">
            <img
              src="/assets/algora-icon.png"
              alt="ALGORA Emblem"
              className="w-16 h-16 object-contain mb-4 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            />
            <h3 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              BUILT BY GOURAB.
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
            <span className="founder-pill px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono text-xs font-bold tracking-widest text-amber-400 uppercase">
              FOUNDER
            </span>
            <span className="font-mono text-neutral-600">&bull;</span>
            <span className="founder-pill px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono text-xs font-bold tracking-widest text-sky-400 uppercase">
              PRODUCT ARCHITECT
            </span>
            <span className="font-mono text-neutral-600">&bull;</span>
            <span className="founder-pill px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono text-xs font-bold tracking-widest text-purple-400 uppercase">
              DESIGNER
            </span>
            <span className="font-mono text-neutral-600">&bull;</span>
            <span className="founder-pill px-4 py-2 rounded-full bg-white/5 border border-white/15 font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
              ENGINEER
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 09 — VISION                                           */}
        {/* ========================================================= */}
        <div className="act-09 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
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
        <div className="act-10 absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <div className="act-10-logo mb-6">
            <img
              src="/assets/algora-icon.png"
              alt="ALGORA Official Emblem"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain shadow-[0_0_40px_rgba(255,255,255,0.45)]"
            />
          </div>

          <h2 className="act-10-name font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] text-white uppercase mb-3">
            ALGORA
          </h2>

          <p className="act-10-tag font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-amber-400 uppercase mb-8">
            CREATIVE ENGINEERING &amp; INTELLIGENT SYSTEMS
          </p>

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
