"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import {
  Monitor,
  Palette,
  Zap,
  Layers,
  Linkedin,
  Github,
  Instagram,
  Mail,
  ArrowUpRight,
  MousePointer,
} from "lucide-react";
import Image from "next/image";

interface HeroProps {
  isLoaded: boolean;
}

const serviceCards = [
  {
    icon: Monitor,
    title: "Web Development",
    description: "Modern, responsive and high-performance websites.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean and engaging designs that convert.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Smart solutions to save time and scale faster.",
  },
  {
    icon: Layers,
    title: "Creative Solutions",
    description: "Ideas tailored to your goals and vision.",
  },
];

export function Hero({ isLoaded }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const portraitContainerRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }
      );

      if (portraitContainerRef.current) {
        tl.fromTo(
          portraitContainerRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.7"
        );
      }

      tl.fromTo(
        ".service-card",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-12 px-6 sm:px-10 md:px-16 lg:px-20 bg-[#06040A] text-[#F4F4F6] overflow-hidden select-none"
    >
      {/* Ambient Purple/Violet Atmospheric Glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-10 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.14)_0%,_rgba(99,102,241,0.06)_40%,_transparent_70%)] blur-[140px] z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.05)_0%,_transparent_70%)] blur-[140px] z-0"
        aria-hidden="true"
      />

      {/* Main Hero Split: Left Typography + Right Portrait with Orbital Glow */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 my-auto">
        {/* Left Column: Heading, Subtitle, CTAs & Socials (6 cols) */}
        <div ref={leftContentRef} className="lg:col-span-6 flex flex-col gap-6 sm:gap-7">
          {/* Tag */}
          <div className="hero-reveal flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <span className="w-4 h-[1px] bg-purple-400" />
            <span>CREATIVE DEVELOPER</span>
          </div>

          {/* Headline */}
          <h1 className="hero-reveal font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-white tracking-tight leading-[1.05]">
            Ideas into <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              Impact
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-reveal font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-lg">
            I design and build digital experiences that look good, work flawlessly, and make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection("work")}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-sans text-sm font-semibold tracking-wide flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-purple-400/40 hover:border-purple-400 font-sans text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Get In Touch
            </button>
          </div>

          {/* Status Badge */}
          <div className="hero-reveal flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            <span>AVAILABLE FOR FREELANCE &amp; COMMISSIONS</span>
          </div>

          {/* Connect With Me Socials */}
          <div className="hero-reveal flex flex-col gap-3 pt-4 border-t border-white/[0.08]">
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500">
              — CONNECT WITH ME
            </span>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Mail, href: "mailto:contact@gourab.dev", label: "Email" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-400/50 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Portrait with Orbital Glowing Ring (6 cols) */}
        <div
          ref={portraitContainerRef}
          className="lg:col-span-6 relative flex items-center justify-center pointer-events-none"
        >
          {/* Orbital Neon Ring behind Portrait */}
          <div className="absolute w-[360px] sm:w-[460px] md:w-[540px] lg:w-[580px] aspect-square rounded-full border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex items-center justify-center pointer-events-none">
            {/* Orbiting Planet Dot */}
            <div className="absolute right-3 top-1/3 w-3 h-3 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,1)] animate-pulse" />
          </div>

          {/* Neon Handwritten Floating Text on Upper Right */}
          <div className="absolute top-2 right-4 sm:right-10 z-30 transform rotate-[12deg] pointer-events-none select-none text-right">
            <span className="font-serif italic text-purple-300/90 text-lg sm:text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
              Same Person <br />
              <span className="text-purple-200 font-normal">Better Ideas</span>
            </span>
          </div>

          {/* High-Resolution Portrait with Soft Gradient Dark Base Fade */}
          <div className="relative z-20 w-[300px] sm:w-[400px] md:w-[480px] lg:w-[540px] aspect-[4/5] flex items-end justify-center">
            <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.6)_88%,rgba(0,0,0,0.15)_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.6)_88%,rgba(0,0,0,0.15)_95%,transparent_100%)]">
              <Image
                src="/assets/gourab.png"
                alt="Gourab — Creative Developer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-bottom filter contrast-105 brightness-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Bento Service Cards */}
      <div
        ref={servicesRef}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-16 sm:mt-20 relative z-10"
      >
        {serviceCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="service-card p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.08] hover:border-purple-400/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:bg-purple-500/25 transition-colors">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-200 transition-colors">
                {card.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Scroll to Explore Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-12 mt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400 uppercase tracking-widest relative z-10">
        <span className="hidden sm:inline">BUILDING A BRIGHTER WEB</span>

        <div className="flex flex-col items-center gap-2 text-neutral-300">
          <div className="w-4 h-7 rounded-full border border-neutral-400 flex items-start justify-center p-1">
            <span className="w-1 h-1.5 rounded-full bg-purple-400 animate-bounce" />
          </div>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <span className="hidden sm:inline">✦ IDEAS // CODE // IMPACT</span>
      </div>
    </section>
  );
}

