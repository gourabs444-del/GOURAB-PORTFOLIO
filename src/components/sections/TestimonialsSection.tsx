"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { testimonials, Testimonial } from "@/data/testimonials";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Star, CheckCircle2, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".anim-header"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Build 3 staggered arrays (9 items each duplicated to 18 items for seamless 50% translation)
  const set1 = [...testimonials];
  const set2 = [...testimonials.slice(3), ...testimonials.slice(0, 3)];
  const set3 = [...testimonials.slice(6), ...testimonials.slice(0, 6)];

  const row1 = [...set1, ...set1];
  const row2 = [...set2, ...set2];
  const row3 = [...set3, ...set3];

  const renderCard = (t: Testimonial, keyId: string) => {
    return (
      <div
        key={keyId}
        onMouseEnter={() => playHover()}
        className={`group/card relative w-[320px] sm:w-[370px] md:w-[400px] shrink-0 p-5 sm:p-6 rounded-2xl ${t.theme.cardBg} border ${t.theme.borderColor} ${t.theme.hoverBorder} shadow-2xl transition-all duration-300 hover:-translate-y-1.5 select-none flex flex-col justify-between gap-4 backdrop-blur-xl overflow-hidden cursor-default`}
      >
        {/* Subtle Ambient Radial Highlight on Card Hover */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: t.theme.accent }}
          aria-hidden="true"
        />

        {/* Top Header: Monogram Avatar + Author Info + Impact Badge */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Gradient Monogram Avatar */}
            <div
              className={`w-9 h-9 rounded-xl ${t.theme.avatarBg} ${t.theme.avatarText} flex items-center justify-center font-mono text-xs font-bold shadow-md shrink-0 ring-1 ring-white/20`}
            >
              {t.avatar}
            </div>

            {/* Author Name + Role */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-sm font-semibold text-white tracking-tight truncate group-hover/card:text-white transition-colors">
                  {t.author}
                </span>
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: t.theme.accent }}
                />
              </div>
              <span className="font-sans text-[11px] text-neutral-400 truncate">
                {t.role} • {t.company}
              </span>
            </div>
          </div>

          {/* Star Rating Badge */}
          <div className="flex items-center gap-0.5 shrink-0 bg-black/40 px-2 py-1 rounded-md border border-white/10">
            {[...Array(t.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-current"
                style={{ color: t.theme.accent }}
              />
            ))}
          </div>
        </div>

        {/* Review Quote */}
        <p className="relative z-10 font-sans text-xs sm:text-[13px] text-neutral-200/90 leading-relaxed font-normal">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Bottom Bar: Impact Pill & Review Date */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between relative z-10 text-xs">
          <span
            className={`font-mono text-[10px] font-semibold px-2.5 py-1 rounded-md border tracking-wider uppercase ${t.theme.badgeBg}`}
          >
            {t.impactTag}
          </span>

          <span className="font-mono text-[11px] text-neutral-500">
            {t.date}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-40 overflow-hidden bg-[#030305] text-[#F4F4F6] select-none border-t border-white/[0.08]"
    >
      {/* Dynamic Colorful Aurora Mesh Background Elements */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.12)_0%,_transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.1)_0%,_transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.09)_0%,_transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 mb-14 md:mb-18 relative z-10 flex flex-col items-center text-center">
        <div ref={headerRef} className="flex flex-col items-center gap-4 sm:gap-5 max-w-3xl">
          {/* Top Pill Tag */}
          <div className="anim-header inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-white font-semibold">06 // TESTIMONIALS</span>
            <span className="text-white/30">•</span>
            <span className="text-neutral-400">FOUNDER &amp; LEADER FEEDBACK</span>
          </div>

          {/* Editorial Bodoni Title with Rich Gradient */}
          <h2 className="anim-header font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
            Voices of Trust &amp; <br className="hidden sm:inline" />
            <span className="font-bodoni italic font-normal bg-gradient-to-r from-sky-300 via-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              High-Velocity Impact
            </span>
          </h2>

          {/* Colorful Verified Badges Row */}
          <div className="anim-header flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
              ★ 5.0 RATING ON 40+ REVIEWS
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20">
              ⚡ 99+ LIGHTHOUSE SCORE
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ✓ 100% ON-TIME SHIP RATE
            </span>
          </div>

          {/* Subtitle */}
          <p className="anim-header font-sans text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed mt-2 font-light">
            Real feedback from engineering leaders, product heads, and startup founders who partnered to craft industry-defining digital experiences.
          </p>
        </div>
      </div>

      {/* 3 Infinite Moving Stream Rows */}
      <div className="relative w-full flex flex-col gap-6 overflow-hidden pointer-events-auto">
        {/* Left & Right Horizon Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#030305] via-[#030305]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#030305] via-[#030305]/80 to-transparent z-20" />

        {/* Row 1: Leftward Stream */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="animate-stream-left gap-6 pr-6">
            {row1.map((t, i) => renderCard(t, `row1-${i}`))}
          </div>
        </div>

        {/* Row 2: Rightward Stream */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="animate-stream-right gap-6 pr-6">
            {row2.map((t, i) => renderCard(t, `row2-${i}`))}
          </div>
        </div>

        {/* Row 3: Leftward Stream */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="animate-stream-left gap-6 pr-6">
            {row3.map((t, i) => renderCard(t, `row3-${i}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
