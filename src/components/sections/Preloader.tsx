"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/siteConfig";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainTopRef = useRef<HTMLDivElement | null>(null);
  const curtainBottomRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { playShutter } = useAudioFeedback();

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        triggerExit();
      } else {
        setProgress(current);
      }
    }, 45);

    const triggerExit = () => {
      setTimeout(() => {
        playShutter();

        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power3.in",
        })
          .to(
            curtainTopRef.current,
            {
              yPercent: -100,
              duration: 0.9,
              ease: "power4.inOut",
            },
            "-=0.1"
          )
          .to(
            curtainBottomRef.current,
            {
              yPercent: 100,
              duration: 0.9,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            containerRef.current,
            {
              opacity: 0,
              display: "none",
              duration: 0.1,
            }
          );
      }, 300);
    };

    return () => clearInterval(interval);
  }, [onComplete, playShutter]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto select-none"
      aria-label="Loading portfolio experience"
    >
      {/* Top Shutter Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-void border-b border-white/[0.08]"
      />

      {/* Bottom Shutter Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-void border-t border-white/[0.08]"
      />

      {/* Central Monogram & Progress Counter */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-sm"
      >
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden bg-surface-200/50 backdrop-blur-md">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
              {siteConfig.moniker}
            </span>
            <div className="absolute inset-0 border border-accent/40 rounded-full animate-ping opacity-25" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}
          </span>
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">
            %
          </span>
        </div>

        <div className="w-48 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent/50 to-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
            INITIALIZING SYSTEM KERNEL
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-mist/60">
            {siteConfig.location.coordinates}
          </span>
        </div>
      </div>
    </div>
  );
}
