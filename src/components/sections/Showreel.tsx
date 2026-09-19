"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(38);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const { playClick, playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { scale: 0.9, opacity: 0.4, y: 60 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center 50%",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTogglePlay = () => {
    playClick();
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    playClick();
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">03 // MOTION & EDITORIAL ARCHIVE</span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-mist">
              CINEMATIC VISUAL REEL
            </span>
          </div>
          <span className="font-mono text-xs text-mist/60">
            [ 4K PRORES 422 HQ // 2.39:1 CINEMASCOPE ]
          </span>
        </div>

        {/* Video Reel Container */}
        <div
          ref={videoContainerRef}
          className="relative group rounded-3xl overflow-hidden border border-white/10 bg-surface-300 shadow-[0_20px_80px_rgba(0,0,0,0.8)] aspect-[21/9] sm:aspect-[16/9] lg:aspect-[2.39/1] flex items-center justify-center"
        >
          {/* Background simulated video/cinematic artwork */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isPlaying ? "scale-105 filter-none" : "scale-100 contrast-125 brightness-75"
            }`}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1920&auto=format&fit=crop')`,
            }}
          />

          {/* Film Grain & Letterbox Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Center Play/Pause Trigger */}
          <div className="relative z-20 flex flex-col items-center gap-4">
            <button
              onClick={handleTogglePlay}
              onMouseEnter={() => playHover()}
              data-cursor="play"
              data-cursor-text={isPlaying ? "PAUSE" : "PLAY REEL"}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/90 hover:bg-accent text-black flex items-center justify-center shadow-[0_0_50px_rgba(229,169,60,0.6)] transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label={isPlaying ? "Pause Showreel" : "Play Showreel"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-black" />
              ) : (
                <Play className="w-8 h-8 fill-black translate-x-0.5" />
              )}
            </button>
            <span className="font-mono text-xs uppercase tracking-widest text-white/90 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              {isPlaying ? "STREAMING 4K MOTION ARCHIVE" : "INITIATE SHOWREEL SEQUENCE"}
            </span>
          </div>

          {/* Top HUD Telemetry */}
          <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/80 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-white/40"}`} />
              <span>{isPlaying ? "REC ● 00:01:42:18" : "STANDBY // REEL 2026"}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span>CODEC: PRORES 4444</span>
              <span>FPS: 60.00</span>
              <span>COLOR: ACEScc</span>
            </div>
          </div>

          {/* Bottom Custom Playback Bar */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-3 bg-black/70 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
            {/* Scrubber track */}
            <div
              className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.round((clickX / rect.width) * 100);
                setProgress(newProgress);
              }}
            >
              <div
                className="h-full bg-accent relative transition-all duration-150"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-mist">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleTogglePlay}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>
                <span>01:14 / 03:28</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleMute}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
                </button>
                <span className="hidden sm:inline">2.39:1 CINEMATIC RATIO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
