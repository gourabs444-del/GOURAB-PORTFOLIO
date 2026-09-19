"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/siteConfig";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainTopRef = useRef<HTMLDivElement | null>(null);
  const curtainBottomRef = useRef<HTMLDivElement | null>(null);
  const introGreetingRef = useRef<HTMLDivElement | null>(null);
  const introNameRef = useRef<HTMLHeadingElement | null>(null);
  const introRoleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const { playShutter } = useAudioFeedback();
  const playShutterRef = useRef(playShutter);
  playShutterRef.current = playShutter;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onCompleteRef.current();
        },
      });

      // 1. Initial State
      gsap.set(introGreetingRef.current, { y: 25, opacity: 0, filter: "blur(6px)" });
      gsap.set(introNameRef.current, { y: 40, opacity: 0, scale: 0.94, filter: "blur(10px)" });
      gsap.set(introRoleRef.current, { y: 20, opacity: 0 });

      // 2. Entrance Sequence: "Hi, my name is" -> "Gourab." -> "Creative Developer & Designer"
      tl.to(introGreetingRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      })
        .to(
          introNameRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          introRoleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // Hold briefly for cinematic impact
        .to({}, { duration: 0.7 })
        // 3. Exit Motion: Content slides up & blurs
        .to(contentRef.current, {
          y: -40,
          opacity: 0,
          filter: "blur(8px)",
          scale: 1.05,
          duration: 0.5,
          ease: "power3.in",
          onStart: () => {
            try {
              playShutterRef.current();
            } catch (e) {
              // audio fallback
            }
          },
        })
        // 4. Shutter Curtains split open to reveal Hero (Gourab Portrait & Web Dev Scene)
        .to(
          curtainTopRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.2"
        )
        .to(
          curtainBottomRef.current,
          {
            yPercent: 100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "<"
        )
        // 5. Hide container completely
        .to(containerRef.current, {
          opacity: 0,
          display: "none",
          duration: 0.1,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      aria-label="Loading portfolio experience"
    >
      {/* Top Shutter Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050507] border-b border-white/[0.06] will-change-transform"
      />

      {/* Bottom Shutter Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050507] border-t border-white/[0.06] will-change-transform"
      />

      {/* Central Animated Cool Typography Intro */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-10 text-center max-w-2xl mx-auto will-change-transform"
      >
        {/* Intro Greeting Line */}
        <div
          ref={introGreetingRef}
          className="font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-neutral-400 font-medium mb-3 sm:mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Hi, my name is</span>
        </div>

        {/* Big Impact Name Headline */}
        <h1
          ref={introNameRef}
          className="font-display font-extrabold text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-none my-1 select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
        >
          Gourab
        </h1>

        {/* Subtitle / Role Tagline */}
        <div
          ref={introRoleRef}
          className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans tracking-widest text-neutral-400 uppercase font-medium"
        >
          <span>Creative Developer</span>
          <span className="text-amber-400/80">•</span>
          <span>Digital Architect</span>
        </div>
      </div>
    </div>
  );
}
