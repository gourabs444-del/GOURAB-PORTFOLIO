"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { testimonials, Testimonial } from "@/data/testimonials";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Star, ArrowUpRight } from "lucide-react";

export function MovingTestimonials() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal - snappy & clean
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".header-item"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Scroll Velocity Scrub Boost on Tracks
      if (track1Ref.current && track2Ref.current) {
        gsap.to(track1Ref.current, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        });

        gsap.to(track2Ref.current, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const row1 = [...testimonials, ...testimonials];
  const row2 = [
    ...testimonials.slice(3),
    ...testimonials.slice(0, 3),
    ...testimonials.slice(3),
    ...testimonials.slice(0, 3),
  ];

  const renderOpenCard = (t: Testimonial, idx: number) => {
    const accent = t.highlightColor || "#38BDF8";

    return (
      <div
        key={`${t.id}-${idx}`}
        onMouseEnter={() => playHover()}
        className="group relative w-[360px] sm:w-[440px] md:w-[480px] shrink-0 p-8 sm:p-10 border-t border-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-default select-none flex flex-col justify-between gap-6 bg-transparent"
      >
        {/* Subtle Accent Glow on Hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accent}12 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Top Meta: Index, Rating & Company */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs font-bold tracking-widest uppercase"
              style={{ color: accent }}
            >
              // 0{((idx % testimonials.length) + 1)}
            </span>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
              ))}
            </div>
          </div>

          <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase">
            {t.company}
          </span>
        </div>

        {/* Headline & Quote Narrative */}
        <div className="relative z-10 flex flex-col gap-3">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors duration-200">
            &ldquo;{t.headline}&rdquo;
          </h3>

          <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            {t.quote}
          </p>
        </div>

        {/* Author Signature Line */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between relative z-10">
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-white group-hover:text-amber-100 transition-colors">
              {t.author}
            </span>
            <span className="font-sans text-xs text-neutral-400 mt-0.5">
              {t.role}
            </span>
          </div>

          <span
            className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden bg-[#050507] text-[#F4F4F6] select-none border-t border-white/[0.08]"
    >
      {/* Subtle Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.05)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 mb-16 md:mb-20 relative z-10 flex flex-col items-center text-center">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-4 sm:gap-5 max-w-3xl">
          {/* Top Tag */}
          <div className="header-item flex items-center justify-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white font-semibold">06 // TESTIMONIALS</span>
            <span className="text-white/20">/</span>
            <span>CLIENT PERSPECTIVES &amp; IMPACT</span>
          </div>

          {/* Main Editorial Bodoni Title */}
          <h2 className="header-item font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
            Client Perspectives &amp; <br className="hidden sm:inline" />
            <span className="font-bodoni italic font-normal bg-gradient-to-r from-sky-200 via-sky-400 to-sky-500 bg-clip-text text-transparent">
              Endorsements
            </span>
          </h2>

          {/* Clean Inline Verification Meta (Zero Capsule Badges) */}
          <div className="header-item flex items-center gap-3 text-xs font-mono text-neutral-400 pt-1">
            <span className="text-amber-400 font-bold">5.0 ★</span>
            <span className="text-white/20">•</span>
            <span>VERIFIED FOUNDER &amp; LEADER FEEDBACK</span>
          </div>

          {/* Professional Narrative Subtitle */}
          <p className="header-item font-sans text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed mt-2 font-normal">
            Direct feedback from founders, VP engineers, and creative directors who experienced obsessive craftsmanship, systems rigor, and high-performance execution firsthand.
          </p>
        </div>
      </div>

      {/* Infinite Fluid Testimonial Stream */}
      <div className="relative w-full flex flex-col gap-6 sm:gap-8 overflow-hidden pointer-events-auto">
        {/* Left & Right Gradient Horizon Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#050507] via-[#050507]/80 to-transparent z-20" />

        {/* Stream Track 1 */}
        <div ref={track1Ref} className="flex w-fit will-change-transform">
          <div className="flex w-fit animate-marquee gap-8 sm:gap-12 will-change-transform">
            {row1.map((t, i) => renderOpenCard(t, i))}
          </div>
        </div>

        {/* Stream Track 2 */}
        <div ref={track2Ref} className="flex w-fit will-change-transform">
          <div className="flex w-fit animate-marquee-reverse gap-8 sm:gap-12 will-change-transform">
            {row2.map((t, i) => renderOpenCard(t, i))}
          </div>
        </div>
      </div>
    </section>
  );
}

