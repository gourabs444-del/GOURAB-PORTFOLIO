"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Activity,
  Code2,
  Boxes,
  Compass,
} from "lucide-react";

export function ColorGraphicsShowcase() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playHover, playClick } = useAudioFeedback();
  const [activeTab, setActiveTab] = useState<"visual" | "shaders" | "neural">("visual");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive Colorful Particles & Energy Mesh Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes with vibrant colors (Cyan, Magenta, Violet, Emerald, Amber, Coral)
    const colorPalette = [
      "#38BDF8", // Vibrant Cyan
      "#818CF8", // Electric Indigo
      "#C084FC", // Purple Orchid
      "#F472B6", // Bright Rose
      "#FB923C", // Radiant Tangerine
      "#34D399", // Vivid Emerald
      "#FBBF24", // Golden Amber
    ];

    interface Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      phase: number;
    }

    const orbs: Orb[] = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 30 + 15,
      color: colorPalette[i % colorPalette.length],
      alpha: Math.random() * 0.35 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw chromatic connecting bezier waves
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const colors = ["#06B6D4", "#8B5CF6", "#EC4899", "#F59E0B"];
        const waveColor = colors[i % colors.length];

        ctx.strokeStyle = waveColor;
        ctx.globalAlpha = 0.25;

        for (let x = 0; x < width; x += 15) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.008 + time + i * 1.2) * 45 +
            Math.cos(x * 0.004 + time * 0.6) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw colorful glowing orbs & particle web
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        // Radial glowing gradient per orb
        const pulse = 1 + Math.sin(time + orb.phase) * 0.25;
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius * pulse
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.6, `${orb.color}40`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.globalAlpha = orb.alpha;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby orbs with vibrant gradient lines
        for (let j = i + 1; j < orbs.length; j++) {
          const other = orbs[j];
          const dx = orb.x - other.x;
          const dy = orb.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(orb.x, orb.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = orb.color;
            ctx.globalAlpha = (1 - dist / 140) * 0.3;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-6xl mx-auto my-8 select-none rounded-3xl overflow-hidden border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10"
    >
      {/* Background Interactive Color Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Dynamic Cursor Light Spotlight with Rainbow Prism Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 opacity-60"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.12), rgba(244, 114, 182, 0.1), transparent 70%)`,
        }}
      />

      {/* Foreground Content & Colorful Bento Showcase */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 animate-pulse" />
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-800 font-bold ml-2">
              CREATIVE COMPUTING STUDIO // v2.6
            </span>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100/90 border border-neutral-300 shadow-inner">
            {[
              { id: "visual", label: "🎨 Shaders & Canvas", icon: Sparkles },
              { id: "neural", label: "⚡ AI & Workflows", icon: Cpu },
              { id: "shaders", label: "🔮 3D Architecture", icon: Boxes },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id as any);
                }}
                onMouseEnter={() => playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-neutral-950 text-white shadow-md shadow-black/20"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-white/60"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Vibrant Feature Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: WebGL & Chromatic Shader Wave (Cyan & Rose) */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-cyan-50/80 via-white/90 to-blue-50/70 border border-cyan-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-cyan-700 bg-cyan-100/80 border border-cyan-300 px-2 py-0.5 rounded-full">
                GLSL // 60 FPS
              </span>
            </div>

            <h3 className="font-inter font-bold text-lg text-neutral-900 mb-1">
              WebGL &amp; Shader Art
            </h3>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed mb-4">
              Custom GLSL fragment shaders, interactive particle simulations, and GPU-accelerated 3D viewports.
            </p>

            {/* Visual Color Spectrum Bar */}
            <div className="space-y-1.5 pt-2 border-t border-cyan-100">
              <div className="flex justify-between text-[11px] font-mono text-cyan-900 font-semibold">
                <span>GPU Render Performance</span>
                <span>120 Hz Sync</span>
              </div>
              <div className="h-2 w-full rounded-full bg-cyan-100 overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-cyan-400 via-indigo-500 to-rose-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Card 2: Neural Architecture & Autonomous AI (Violet & Magenta) */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white/90 to-pink-50/70 border border-purple-200/80 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-400 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-purple-700 bg-purple-100/80 border border-purple-300 px-2 py-0.5 rounded-full">
                AI SYSTEMS
              </span>
            </div>

            <h3 className="font-inter font-bold text-lg text-neutral-900 mb-1">
              Autonomous Intelligence
            </h3>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed mb-4">
              Multi-agent orchestrations, LLM pipelines, and automated intelligence layers embedded in web apps.
            </p>

            {/* Neural Pulse Metrics */}
            <div className="space-y-1.5 pt-2 border-t border-purple-100">
              <div className="flex justify-between text-[11px] font-mono text-purple-900 font-semibold">
                <span>Neural Pipeline Status</span>
                <span>Sub-15ms Latency</span>
              </div>
              <div className="h-2 w-full rounded-full bg-purple-100 overflow-hidden">
                <div className="h-full w-[88%] bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Card 3: High-Performance Full-Stack (Emerald & Amber) */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white/90 to-amber-50/70 border border-emerald-200/80 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-400 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-full">
                FULL-STACK
              </span>
            </div>

            <h3 className="font-inter font-bold text-lg text-neutral-900 mb-1">
              High-Velocity Platform
            </h3>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed mb-4">
              Distributed edge backends, Next.js App Router, GSAP timeline choreography, and TypeScript rigor.
            </p>

            {/* Speedometer Bar */}
            <div className="space-y-1.5 pt-2 border-t border-emerald-100">
              <div className="flex justify-between text-[11px] font-mono text-emerald-900 font-semibold">
                <span>Lighthouse CWV Score</span>
                <span>100 / 100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
                <div className="h-full w-[99%] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Tech Tokens Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.08] text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-neutral-800">SPECIALIZED STACK:</span>
            {[
              { name: "Three.js", color: "bg-blue-500/15 text-blue-800 border-blue-300" },
              { name: "GLSL / Shaders", color: "bg-cyan-500/15 text-cyan-800 border-cyan-300" },
              { name: "Next.js 15", color: "bg-neutral-900 text-white border-neutral-800" },
              { name: "GSAP / Lenis", color: "bg-emerald-500/15 text-emerald-800 border-emerald-300" },
              { name: "PyTorch / GenAI", color: "bg-purple-500/15 text-purple-800 border-purple-300" },
              { name: "TypeScript", color: "bg-indigo-500/15 text-indigo-800 border-indigo-300" },
            ].map((tag) => (
              <span
                key={tag.name}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-transform hover:scale-105 ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-neutral-500">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
            <span className="text-[11px]">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
