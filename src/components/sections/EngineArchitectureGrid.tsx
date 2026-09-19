"use client";

import React, { useState } from "react";
import { Code, Layers, Cpu, Database, Sparkles } from "lucide-react";

interface EngineArchitectureGridProps {
  onHoverSound?: () => void;
}

export function EngineArchitectureGrid({ onHoverSound }: EngineArchitectureGridProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardEnter = (index: number) => {
    setHoveredCard(index);
    if (onHoverSound) onHoverSound();
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="engine-graph relative w-full max-w-6xl mx-auto px-4 sm:px-6">
      {/* ===================================================================== */}
      {/* 1. INTERCONNECTING NEURAL DATA BUS (SVG Circuit Trace with Flowing Photons) */}
      {/* ===================================================================== */}
      <div className="hidden lg:block absolute top-[148px] left-8 right-8 h-12 pointer-events-none z-0">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 40">
          <defs>
            <linearGradient id="neuralBusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="33%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="66%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            <filter id="busGlow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Under-glow ambient path */}
          <path
            d="M 125 20 L 375 20 L 625 20 L 875 20"
            fill="none"
            stroke="url(#neuralBusGrad)"
            strokeWidth="3"
            strokeOpacity="0.3"
            filter="url(#busGlow)"
          />

          {/* Core Circuit Line with tech dashes */}
          <path
            className="engine-bus-track"
            d="M 125 20 L 375 20 L 625 20 L 875 20"
            fill="none"
            stroke="url(#neuralBusGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />

          {/* Traveling Photon Energy Packets (Simulating live data flow) */}
          <circle r="4" fill="#fbbf24" filter="url(#busGlow)">
            <animateMotion
              path="M 125 20 L 875 20"
              dur="3.2s"
              repeatCount="indefinite"
              keyTimes="0;1"
              keyPoints="0;1"
              calcMode="linear"
            />
          </circle>

          <circle r="3.5" fill="#38bdf8" filter="url(#busGlow)">
            <animateMotion
              path="M 125 20 L 875 20"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
              keyTimes="0;1"
              keyPoints="0;1"
              calcMode="linear"
            />
          </circle>

          <circle r="3.5" fill="#c084fc" filter="url(#busGlow)">
            <animateMotion
              path="M 125 20 L 875 20"
              dur="3.6s"
              begin="2s"
              repeatCount="indefinite"
              keyTimes="0;1"
              keyPoints="0;1"
              calcMode="linear"
            />
          </circle>

          {/* Connection Junction Nodes */}
          {[125, 375, 625, 875].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="20" r="7" fill="#0b0c14" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
              <circle
                cx={cx}
                cy="20"
                r="3"
                fill={i === 0 ? "#f59e0b" : i === 1 ? "#38bdf8" : i === 2 ? "#c084fc" : "#10b981"}
              >
                <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            </g>
          ))}
        </svg>
      </div>

      {/* ===================================================================== */}
      {/* 2. THE 4 MODERN AI GRAPHICS CARDS (GRID)                              */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
        
        {/* =================================================================== */}
        {/* NODE 1: NEXT.JS 15 (QUANTUM REACT & TURBOPACK)                     */}
        {/* =================================================================== */}
        <div
          onMouseEnter={() => handleCardEnter(1)}
          onMouseLeave={handleCardLeave}
          className="engine-node group relative rounded-2xl bg-gradient-to-b from-[#0e1017]/90 via-[#0a0b10]/95 to-[#07080c]/98 border border-amber-500/20 hover:border-amber-400/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(245,158,11,0.25)] backdrop-blur-xl cursor-default overflow-hidden"
        >
          {/* Ambient Glow Aura */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-500/15 blur-[50px] group-hover:bg-amber-500/30 group-hover:scale-125 transition-all duration-500" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between mb-4 text-[10px] font-mono tracking-wider text-neutral-400 relative z-10">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              SYS.01
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 font-semibold text-[9px] uppercase tracking-widest">
              ACTIVE
            </span>
          </div>

          {/* Modern AI Graphic: Quantum React Core & Orbiting Telemetry Lattice */}
          <div className="relative w-full h-32 flex items-center justify-center my-2 select-none">
            <svg className="w-28 h-28 overflow-visible" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="amberHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <filter id="amberCoreGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Concentric Radar Circles */}
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(245,158,11,0.12)" strokeWidth="1" />
              
              {/* Outer Counter-Rotating Dashed Orbit */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeDasharray="4 8"
                strokeOpacity="0.45"
                className="animate-[spin_18s_linear_infinite_reverse] origin-center"
              />

              {/* Inner Fast Orbit with Photon Electron */}
              <g className="animate-[spin_8s_linear_infinite] origin-center">
                <ellipse cx="60" cy="60" rx="38" ry="18" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 5" />
                <circle cx="98" cy="60" r="3.5" fill="#fef3c7" filter="url(#amberCoreGlow)" />
              </g>

              {/* Second Cross Orbital Ring */}
              <g className="animate-[spin_10s_linear_infinite_reverse] origin-center">
                <ellipse cx="60" cy="60" rx="18" ry="38" fill="none" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 6" />
                <circle cx="60" cy="22" r="3" fill="#fbbf24" filter="url(#amberCoreGlow)" />
              </g>

              {/* Central Hexagonal Quantum Reactor */}
              <polygon
                points="60,38 79,49 79,71 60,82 41,71 41,49"
                fill="#16171f"
                stroke="url(#amberHexGrad)"
                strokeWidth="2"
                filter="url(#amberCoreGlow)"
                className="group-hover:scale-110 transition-transform duration-300 origin-center"
              />

              {/* Inner Pulsing Core */}
              <circle cx="60" cy="60" r="11" fill="#f59e0b" fillOpacity="0.25">
                <animate attributeName="r" values="9;13;9" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="fillOpacity" values="0.2;0.45;0.2" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Floating Syntax Icon Centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Code className="w-6 h-6 text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] group-hover:scale-125 transition-transform duration-300" />
            </div>

            {/* Corner HUD Telemetry Brackets */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-amber-500/50">┌ 0ms</span>
            <span className="absolute bottom-2 right-2 text-[8px] font-mono text-amber-500/50">SSR ┘</span>
          </div>

          {/* Typography Details */}
          <div className="text-center mt-3 mb-4 relative z-10">
            <h4 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-amber-300 transition-colors">
              NEXT.JS 15
            </h4>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-[0.18em]">
                REACT 19
              </span>
              <span className="text-neutral-600 font-mono text-xs">•</span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                TURBOPACK
              </span>
            </div>
            <p className="font-sans text-[11px] text-neutral-400 mt-2.5 leading-relaxed">
              Hybrid server architecture with zero-runtime compilation and edge streaming.
            </p>
          </div>

          {/* Bottom Live Equalizer / Telemetry Bar */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="text-neutral-400 text-[9px] uppercase tracking-wider">COMPUTE FLUX</span>
            <div className="flex items-end gap-1 h-3">
              <span className="w-1 bg-amber-400/80 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
              <span className="w-1 bg-amber-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-amber-400/70 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] h-1.5" />
              <span className="w-1 bg-amber-400/90 rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-2.5" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* NODE 2: GSAP & WEBGLEngine (3D OPTICS & SHADERS)                   */}
        {/* =================================================================== */}
        <div
          onMouseEnter={() => handleCardEnter(2)}
          onMouseLeave={handleCardLeave}
          className="engine-node group relative rounded-2xl bg-gradient-to-b from-[#0e1017]/90 via-[#0a0b10]/95 to-[#07080c]/98 border border-sky-500/20 hover:border-sky-400/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(56,189,248,0.25)] backdrop-blur-xl cursor-default overflow-hidden"
        >
          {/* Ambient Glow Aura */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-sky-500/15 blur-[50px] group-hover:bg-sky-500/30 group-hover:scale-125 transition-all duration-500" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between mb-4 text-[10px] font-mono tracking-wider text-neutral-400 relative z-10">
            <span className="flex items-center gap-1.5 text-sky-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              SYS.02
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 font-semibold text-[9px] uppercase tracking-widest">
              60 FPS
            </span>
          </div>

          {/* Modern AI Graphic: Isometric 3D Shader Crystal & Refraction Grid */}
          <div className="relative w-full h-32 flex items-center justify-center my-2 select-none">
            <svg className="w-28 h-28 overflow-visible" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="cyanShaderGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="cyanShaderGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Geometric Coordinate Grid */}
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="2 4" />
              
              {/* Rotating Diamond Matrix */}
              <rect
                x="25"
                y="25"
                width="70"
                height="70"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                strokeDasharray="5 7"
                transform="rotate(45 60 60)"
                className="animate-[spin_24s_linear_infinite] origin-center"
              />

              {/* Counter-Rotating Outer Gyro Ring */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.5"
                strokeDasharray="16 32"
                className="animate-[spin_12s_linear_infinite_reverse] origin-center"
              />

              {/* 3D Isometric Shaders Glass Planes */}
              <g className="group-hover:scale-110 transition-transform duration-300 origin-center" filter="url(#cyanGlow)">
                {/* Top Plane */}
                <polygon points="60,32 86,47 60,62 34,47" fill="url(#cyanShaderGrad2)" fillOpacity="0.75" stroke="#7dd3fc" strokeWidth="1.2" />
                {/* Right Plane */}
                <polygon points="60,62 86,47 86,77 60,92" fill="#0369a1" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                {/* Left Plane */}
                <polygon points="60,62 34,47 34,77 60,92" fill="#0c4a6e" fillOpacity="0.9" stroke="#0284c7" strokeWidth="1" />
              </g>

              {/* Vertex Refraction Points */}
              <circle cx="60" cy="32" r="2.5" fill="#f0f9ff" />
              <circle cx="86" cy="47" r="2.5" fill="#38bdf8" />
              <circle cx="34" cy="47" r="2.5" fill="#38bdf8" />
              <circle cx="60" cy="92" r="2.5" fill="#0284c7" />
            </svg>

            {/* Floating Layers Icon Centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Layers className="w-6 h-6 text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] group-hover:scale-125 transition-transform duration-300" />
            </div>

            {/* Corner HUD Telemetry Brackets */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-sky-500/50">┌ GL_FX</span>
            <span className="absolute bottom-2 right-2 text-[8px] font-mono text-sky-500/50">60FPS ┘</span>
          </div>

          {/* Typography Details */}
          <div className="text-center mt-3 mb-4 relative z-10">
            <h4 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-sky-300 transition-colors">
              GSAP &amp; WEBGLEngine
            </h4>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-[0.18em]">
                60FPS SHADERS
              </span>
              <span className="text-neutral-600 font-mono text-xs">•</span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                POST-FX
              </span>
            </div>
            <p className="font-sans text-[11px] text-neutral-400 mt-2.5 leading-relaxed">
              Custom GLSL fragment shaders, physics simulation, and smooth GPU canvas blitting.
            </p>
          </div>

          {/* Bottom Live Equalizer / Telemetry Bar */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="text-neutral-400 text-[9px] uppercase tracking-wider">FRAME RENDER</span>
            <div className="flex items-end gap-1 h-3">
              <span className="w-1 bg-sky-400/90 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-sky-400 rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-2.5" />
              <span className="w-1 bg-sky-400/80 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-sky-400/60 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-2" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* NODE 3: NODE.JS API (CYBERNETIC EDGE AI RUNTIME)                   */}
        {/* =================================================================== */}
        <div
          onMouseEnter={() => handleCardEnter(3)}
          onMouseLeave={handleCardLeave}
          className="engine-node group relative rounded-2xl bg-gradient-to-b from-[#0e1017]/90 via-[#0a0b10]/95 to-[#07080c]/98 border border-purple-500/20 hover:border-purple-400/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(192,132,252,0.25)] backdrop-blur-xl cursor-default overflow-hidden"
        >
          {/* Ambient Glow Aura */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-purple-500/15 blur-[50px] group-hover:bg-purple-500/30 group-hover:scale-125 transition-all duration-500" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between mb-4 text-[10px] font-mono tracking-wider text-neutral-400 relative z-10">
            <span className="flex items-center gap-1.5 text-purple-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
              SYS.03
            </span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 font-semibold text-[9px] uppercase tracking-widest">
              12MS EDGE
            </span>
          </div>

          {/* Modern AI Graphic: Cybernetic NPU Die & Neural Signal Circuitry */}
          <div className="relative w-full h-32 flex items-center justify-center my-2 select-none">
            <svg className="w-28 h-28 overflow-visible" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="purpleCpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Motherboard Silicon Traces radiating out */}
              <g stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.35">
                <line x1="60" y1="12" x2="60" y2="34" />
                <line x1="60" y1="86" x2="60" y2="108" />
                <line x1="12" y1="60" x2="34" y2="60" />
                <line x1="86" y1="60" x2="108" y2="60" />

                <line x1="26" y1="26" x2="42" y2="42" />
                <line x1="94" y1="26" x2="78" y2="42" />
                <line x1="26" y1="94" x2="42" y2="78" />
                <line x1="94" y1="94" x2="78" y2="78" />
              </g>

              {/* Pulsing Neural Ingestion Photons */}
              <circle r="2" fill="#e9d5ff">
                <animateMotion path="M 60 12 L 60 34" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle r="2" fill="#e9d5ff">
                <animateMotion path="M 12 60 L 34 60" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle r="2" fill="#e9d5ff">
                <animateMotion path="M 108 60 L 86 60" dur="1.9s" repeatCount="indefinite" />
              </circle>

              {/* Outer Circular Synapse Orbit */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#c084fc"
                strokeWidth="1.2"
                strokeDasharray="6 12"
                strokeOpacity="0.4"
                className="animate-[spin_20s_linear_infinite] origin-center"
              />

              {/* Silicon Processor Housing Box */}
              <rect
                x="35"
                y="35"
                width="50"
                height="50"
                rx="10"
                fill="#131021"
                stroke="url(#purpleCpuGrad)"
                strokeWidth="2"
                filter="url(#purpleGlow)"
                className="group-hover:scale-110 transition-transform duration-300 origin-center"
              />

              {/* Die Pattern Details */}
              <rect x="42" y="42" width="36" height="36" rx="6" fill="#1e1838" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Floating CPU Icon Centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Cpu className="w-6 h-6 text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.9)] group-hover:scale-125 transition-transform duration-300" />
            </div>

            {/* Corner HUD Telemetry Brackets */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-purple-500/50">┌ NPU</span>
            <span className="absolute bottom-2 right-2 text-[8px] font-mono text-purple-500/50">EDGE ┘</span>
          </div>

          {/* Typography Details */}
          <div className="text-center mt-3 mb-4 relative z-10">
            <h4 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-purple-300 transition-colors">
              NODE.JS API
            </h4>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-[0.18em]">
                EDGE ROUTING
              </span>
              <span className="text-neutral-600 font-mono text-xs">•</span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                AI RUNTIME
              </span>
            </div>
            <p className="font-sans text-[11px] text-neutral-400 mt-2.5 leading-relaxed">
              Global serverless edge endpoints with real-time SSE streaming for neural agent outputs.
            </p>
          </div>

          {/* Bottom Live Equalizer / Telemetry Bar */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="text-neutral-400 text-[9px] uppercase tracking-wider">AGENT STREAM</span>
            <div className="flex items-end gap-1 h-3">
              <span className="w-1 bg-purple-400/70 rounded-full animate-[pulse_1.3s_ease-in-out_infinite] h-2" />
              <span className="w-1 bg-purple-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-purple-400/90 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2.5" />
              <span className="w-1 bg-purple-400/60 rounded-full animate-[pulse_1.6s_ease-in-out_infinite] h-1.5" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* NODE 4: POSTGRES & AI (NEURAL VECTOR VAULT)                        */}
        {/* =================================================================== */}
        <div
          onMouseEnter={() => handleCardEnter(4)}
          onMouseLeave={handleCardLeave}
          className="engine-node group relative rounded-2xl bg-gradient-to-b from-[#0e1017]/90 via-[#0a0b10]/95 to-[#07080c]/98 border border-emerald-500/20 hover:border-emerald-400/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(16,185,129,0.25)] backdrop-blur-xl cursor-default overflow-hidden"
        >
          {/* Ambient Glow Aura */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-emerald-500/15 blur-[50px] group-hover:bg-emerald-500/30 group-hover:scale-125 transition-all duration-500" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between mb-4 text-[10px] font-mono tracking-wider text-neutral-400 relative z-10">
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              SYS.04
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-semibold text-[9px] uppercase tracking-widest">
              INDEXED
            </span>
          </div>

          {/* Modern AI Graphic: Quantum Vector Memory Cylinder & Sweeping Laser Beam */}
          <div className="relative w-full h-32 flex items-center justify-center my-2 select-none">
            <svg className="w-28 h-28 overflow-visible" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="emeraldVaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Circular Coordinate Dial */}
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="4 10"
                strokeOpacity="0.4"
                className="animate-[spin_16s_linear_infinite] origin-center"
              />

              {/* 3D Multi-Layered Vector Memory Cylinder Discs */}
              <g className="group-hover:scale-110 transition-transform duration-300 origin-center" filter="url(#emeraldGlow)">
                {/* Top Disc */}
                <ellipse cx="60" cy="40" rx="30" ry="11" fill="#064e3b" fillOpacity="0.8" stroke="url(#emeraldVaultGrad)" strokeWidth="1.5" />
                
                {/* Middle Disc */}
                <path d="M 30 55 A 30 11 0 0 0 90 55" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <line x1="30" y1="40" x2="30" y2="76" stroke="#059669" strokeWidth="1.5" />
                <line x1="90" y1="40" x2="90" y2="76" stroke="#059669" strokeWidth="1.5" />

                {/* Bottom Disc */}
                <path d="M 30 76 A 30 11 0 0 0 90 76" fill="none" stroke="url(#emeraldVaultGrad)" strokeWidth="1.8" />
              </g>

              {/* Vertically Sweeping AI Scanning Laser */}
              <g>
                <line x1="34" y1="48" x2="86" y2="48" stroke="#a7f3d0" strokeWidth="1.5" filter="url(#emeraldGlow)">
                  <animate attributeName="y1" values="42;72;42" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="42;72;42" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Floating Synaptic Data Embeddings Nodes */}
              <circle cx="45" cy="58" r="2" fill="#6ee7b7" />
              <circle cx="75" cy="58" r="2" fill="#6ee7b7" />
              <circle cx="60" cy="58" r="2.5" fill="#ecfdf5" filter="url(#emeraldGlow)" />
              <line x1="45" y1="58" x2="60" y2="58" stroke="#10b981" strokeWidth="0.8" strokeDasharray="1 2" />
              <line x1="60" y1="58" x2="75" y2="58" stroke="#10b981" strokeWidth="0.8" strokeDasharray="1 2" />
            </svg>

            {/* Floating Database Icon Centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Database className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)] group-hover:scale-125 transition-transform duration-300" />
            </div>

            {/* Corner HUD Telemetry Brackets */}
            <span className="absolute top-2 left-2 text-[8px] font-mono text-emerald-500/50">┌ 1536D</span>
            <span className="absolute bottom-2 right-2 text-[8px] font-mono text-emerald-500/50">VEC ┘</span>
          </div>

          {/* Typography Details */}
          <div className="text-center mt-3 mb-4 relative z-10">
            <h4 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-emerald-300 transition-colors">
              POSTGRES &amp; AI
            </h4>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-[0.18em]">
                NEURAL VECTOR DB
              </span>
              <span className="text-neutral-600 font-mono text-xs">•</span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                RAG MEMORY
              </span>
            </div>
            <p className="font-sans text-[11px] text-neutral-400 mt-2.5 leading-relaxed">
              Pgvector semantic embedding vault with high-dimensional cosine similarity indexing.
            </p>
          </div>

          {/* Bottom Live Equalizer / Telemetry Bar */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="text-neutral-400 text-[9px] uppercase tracking-wider">VECTOR SYNC</span>
            <div className="flex items-end gap-1 h-3">
              <span className="w-1 bg-emerald-400/90 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-emerald-400/70 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-1.5" />
              <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-2.5" />
              <span className="w-1 bg-emerald-400/80 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Bottom Architecture Specs Pill */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] font-mono text-neutral-400 tracking-wider uppercase">
        <span className="flex items-center gap-1.5 text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NEURAL PIPELINE LATENCY: &lt;14MS</span>
        </span>
        <span className="text-neutral-700">•</span>
        <span className="text-neutral-400">ZERO DOWNTIME FAILOVER</span>
        <span className="text-neutral-700 hidden sm:inline">•</span>
        <span className="text-neutral-400 hidden sm:inline">END-TO-END TYPE-SAFETY</span>
      </div>
    </div>
  );
}
