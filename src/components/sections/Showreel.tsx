"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Sparkles, Film } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import Image from "next/image";

interface SceneStep {
  id: number;
  time: string;
  tag: string;
  topLine: string;
  midLine: string;
  botLine: string;
  accent: string;
  showPortrait?: boolean;
}

const scenes: SceneStep[] = [
  {
    id: 1,
    time: "00:00 — 00:03",
    tag: "SCENE 01 // ARCHITECTURAL REVEAL",
    topLine: "DIGITAL",
    midLine: "ARCHITECT",
    botLine: "SYSTEMS",
    accent: "PRECISION AT SCALE",
  },
  {
    id: 2,
    time: "00:03 — 00:07",
    tag: "SCENE 02 // CINEMATIC CONVERGENCE",
    topLine: "MOTION",
    midLine: "& SHADERS",
    botLine: "INTERACTION",
    accent: "GPU-ACCELERATED PHYSICS",
    showPortrait: true,
  },
  {
    id: 3,
    time: "00:07 — 00:11",
    tag: "SCENE 03 // INTENTIONAL RIGOR",
    topLine: "BEYOND",
    midLine: "CONVENTIONAL",
    botLine: "INTERFACES",
    accent: "RADICAL AESTHETIC DISCIPLINE",
  },
  {
    id: 4,
    time: "00:11 — 00:14",
    tag: "SCENE 04 // FINAL RESOLUTION",
    topLine: "GOURAB",
    midLine: "DEVELOPER",
    botLine: "& DESIGNER",
    accent: "AVAILABLE WORLDWIDE // 2026",
    showPortrait: true,
  },
];

export function Showreel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 14; // 14 seconds timeline

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoViewportRef = useRef<HTMLDivElement | null>(null);
  const sceneContainerRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const { playClick, playHover, playShutter } = useAudioFeedback();

  // Cinematic Kinetic Timeline Clock
  useEffect(() => {
    let lastTime = performance.now();

    const updateClock = (now: number) => {
      if (isPlaying) {
        const delta = (now - lastTime) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= totalDuration) {
            return 0; // Seamless loop
          }
          return next;
        });
      }
      lastTime = now;
      animationFrameRef.current = requestAnimationFrame(updateClock);
    };

    animationFrameRef.current = requestAnimationFrame(updateClock);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, totalDuration]);

  // Derive current scene from time
  useEffect(() => {
    let index = 0;
    if (currentTime < 3.5) index = 0;
    else if (currentTime < 7.2) index = 1;
    else if (currentTime < 11.0) index = 2;
    else index = 3;

    if (index !== currentSceneIndex) {
      setCurrentSceneIndex(index);
      if (!isMuted) {
        try {
          playShutter();
        } catch {}
      }
    }
  }, [currentTime, currentSceneIndex, isMuted, playShutter]);

  // Subtle Mouse/Cursor motion through typography inside viewport
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoViewportRef.current || !cursorDotRef.current) return;
    const rect = videoViewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cursorDotRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleTogglePlay = () => {
    playClick();
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    playClick();
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const activeScene = scenes[currentSceneIndex];
  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-44 px-5 sm:px-10 md:px-16 lg:px-24 border-t border-white/[0.08] overflow-hidden bg-[#050507] text-white select-none"
    >
      {/* Background Ambient Atmosphere */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.06)_0%,_rgba(59,130,246,0.04)_40%,_transparent_70%)] blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest">
                03 // MOTION &amp; TYPOGRAPHY REEL
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                16:9 CINEMATIC ARCHIVE
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              KINETIC MOTION REEL
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>1080P // 60 FPS MOTION ENGINE</span>
          </div>
        </div>

        {/* 16:9 Cinematic Minimalist Typography Viewport */}
        <div
          ref={videoViewportRef}
          onMouseMove={handleMouseMove}
          className="relative group w-full aspect-[16/9] bg-[#070709] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.1] shadow-[0_25px_90px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-10 md:p-14"
        >
          {/* Subtle Film Grain Texture Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Atmospheric Edge Glow (Deep Blue/Purple Subtle Vignette) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(13,10,28,0.7)_90%,rgba(5,5,7,0.95)_100%)]" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-950/[0.08] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-950/[0.08] to-transparent" />

          {/* Interactive Micro Cursor Follower inside video */}
          <div
            ref={cursorDotRef}
            className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-amber-400/80 bg-amber-400/20 z-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
          >
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>

          {/* ========================================================= */}
          {/* TOP HUD TELEMETRY BAR                                    */}
          {/* ========================================================= */}
          <div className="relative z-20 flex items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest pointer-events-none">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">{activeScene.tag}</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-neutral-500">
              <span>TIMECODE: 00:{String(Math.floor(currentTime)).padStart(2, "0")}:{(currentTime % 1).toFixed(2).slice(2)}</span>
              <span>•</span>
              <span>RATIO: 16:9</span>
              <span>•</span>
              <span className="text-amber-400/90">{activeScene.accent}</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER: MASSIVE OVERSIZED KINETIC TYPOGRAPHY COMPOSITION  */}
          {/* ========================================================= */}
          <div
            ref={sceneContainerRef}
            key={activeScene.id}
            className="relative z-10 my-auto w-full flex flex-col justify-center items-center text-center overflow-hidden py-4 animate-in fade-in zoom-in-95 duration-700"
          >
            {/* Top Oversized Kinetic Word */}
            <div className="w-full overflow-hidden leading-none tracking-tighter">
              <span className="block font-display font-black text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[11vw] uppercase text-white whitespace-nowrap drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] transform transition-transform duration-1000 ease-out translate-y-0 opacity-95">
                {activeScene.topLine}
              </span>
            </div>

            {/* Middle Line (Stroked / High Contrast / Massive Scale) */}
            <div className="w-full overflow-hidden leading-none tracking-tighter my-[-0.08em] relative z-20">
              <span
                className="block font-display font-black text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[11.5vw] uppercase text-transparent whitespace-nowrap drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                style={{
                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.92)",
                }}
              >
                {activeScene.midLine}
              </span>
            </div>

            {/* Bottom Line + Optional Centered Monochrome Portrait Cutout */}
            <div className="relative w-full overflow-hidden leading-none tracking-tighter flex items-center justify-center">
              <span className="block font-display font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[10vw] uppercase text-neutral-300 whitespace-nowrap">
                {activeScene.botLine}
              </span>

              {/* Minimal Monochrome Cutout Element (at specific moments) */}
              {activeScene.showPortrait && (
                <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-44 aspect-[3/4] pointer-events-none opacity-80 mix-blend-screen filter contrast-125 brightness-110 grayscale animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]">
                    <Image
                      src="/assets/gourab.png"
                      alt="Gourab Minimal Visual Accent"
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* BOTTOM PLAYBACK CONTROLS & TIMELINE SCRUBBER              */}
          {/* ========================================================= */}
          <div className="relative z-30 flex flex-col gap-3 bg-black/60 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/[0.08]">
            {/* Scrubber Track */}
            <div
              className="w-full h-1.5 bg-white/10 hover:h-2.5 rounded-full overflow-hidden cursor-pointer relative transition-all duration-200"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                setCurrentTime(ratio * totalDuration);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-white to-amber-300 relative transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
              </div>
            </div>

            {/* Control Bar Actions */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={handleTogglePlay}
                  onMouseEnter={() => playHover()}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-white font-medium"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  onMouseEnter={() => playHover()}
                  className="hover:text-white transition-colors cursor-pointer hidden xs:flex items-center gap-1"
                  title="Restart reel"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>REPLAY</span>
                </button>

                <span className="text-neutral-500">
                  00:{String(Math.floor(currentTime)).padStart(2, "0")} / 00:{totalDuration}
                </span>
              </div>

              {/* Scene Indicator Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playClick();
                      if (idx === 0) setCurrentTime(0);
                      else if (idx === 1) setCurrentTime(3.6);
                      else if (idx === 2) setCurrentTime(7.3);
                      else setCurrentTime(11.1);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSceneIndex === idx
                        ? "w-6 bg-amber-400"
                        : "w-2 bg-white/20 hover:bg-white/50"
                    }`}
                    aria-label={`Jump to scene ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playClick();
                    setIsMuted(!isMuted);
                  }}
                  onMouseEnter={() => playHover()}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>
                <span className="hidden md:inline text-[11px] text-neutral-500">
                  CINEMATIC RATIO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

