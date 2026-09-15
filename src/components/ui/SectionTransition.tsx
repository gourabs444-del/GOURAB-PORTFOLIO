"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowDown } from "lucide-react";

interface SectionTransitionProps {
  fromLabel?: string;
  toLabel?: string;
  accentColor?: string;
  secondaryColor?: string;
}

export function SectionTransition({
  fromLabel,
  toLabel,
  accentColor = "#F59E0B",
  secondaryColor = "#38BDF8",
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const flareRef = useRef<HTMLDivElement | null>(null);
  const compassRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const beam = beamRef.current;
      const flare = flareRef.current;
      const compass = compassRef.current;
      const text = textRef.current;

      if (!container) return;

      // 1. Horizontal Laser Beam & Flare Sweep on Scroll Scrub
      if (beam && flare) {
        gsap.fromTo(
          beam,
          { scaleX: 0.05, opacity: 0.2 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              end: "bottom 30%",
              scrub: 1.0,
            },
          }
        );

        gsap.fromTo(
          flare,
          { scale: 0.3, opacity: 0, filter: "blur(20px)" },
          {
            scale: 1.6,
            opacity: 0.9,
            filter: "blur(40px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              end: "center center",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Rotating Kinetic Compass & Parallax Text
      if (compass) {
        gsap.fromTo(
          compass,
          { rotate: -90, scale: 0.8, opacity: 0.3 },
          {
            rotate: 90,
            scale: 1.1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 95%",
              end: "bottom 15%",
              scrub: 1.2,
            },
          }
        );
      }

      if (text) {
        gsap.fromTo(
          text,
          { y: 25, opacity: 0.2 },
          {
            y: -15,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 0.9,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [accentColor, secondaryColor]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden flex flex-col items-center justify-center select-none z-20 pointer-events-none"
    >
      {/* Ambient Gradient Glow Flare */}
      <div
        ref={flareRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[120px] rounded-full blur-[50px] pointer-events-none opacity-40 will-change-transform"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}40 0%, ${secondaryColor}20 50%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Kinetic Expanding Laser Beam */}
      <div className="relative w-full max-w-7xl px-6 sm:px-12 flex items-center justify-center">
        <div
          ref={beamRef}
          className="w-full h-[1px] will-change-transform"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 15%, ${accentColor} 50%, rgba(255,255,255,0.06) 85%, transparent 100%)`,
            boxShadow: `0 0 15px ${accentColor}50`,
          }}
        />

        {/* Center Floating HUD Capsule */}
        <div
          ref={compassRef}
          className="absolute left-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-[#050507]/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] will-change-transform pointer-events-auto"
        >
          {/* Subtle Outer Dashed Track */}
          <div
            className="absolute inset-0 rounded-full border border-dashed opacity-40"
            style={{ borderColor: accentColor }}
          />
          <ArrowDown
            className="w-4 h-4 transition-transform duration-300 animate-bounce"
            style={{ color: accentColor }}
          />
        </div>
      </div>

      {/* Section Transition Metadata */}
      {(fromLabel || toLabel) && (
        <div
          ref={textRef}
          className="mt-6 flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-neutral-400 will-change-transform"
        >
          {fromLabel && (
            <span className="text-neutral-500 font-medium">{fromLabel}</span>
          )}
          {fromLabel && toLabel && (
            <span className="text-white/25 flex items-center gap-1 font-bold">
              ➔
            </span>
          )}
          {toLabel && (
            <span
              className="font-bold tracking-wider"
              style={{ color: accentColor }}
            >
              {toLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
