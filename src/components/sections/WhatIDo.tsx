"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import {
  Monitor,
  Palette,
  Zap,
  Layers,
  ArrowUpRight,
  Mouse,
  Linkedin,
  Github,
  Instagram,
  Mail,
} from "lucide-react";

const services = [
  {
    id: "web-dev",
    title: "Web Development",
    desc: "Modern, responsive and high-performance websites & web applications.",
    icon: <Monitor className="w-5 h-5 text-purple-400" />,
    badge: "01",
    tech: "Next.js / WebGL / Three.js",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    desc: "Clean, intuitive and engaging editorial interfaces that convert.",
    icon: <Palette className="w-5 h-5 text-purple-400" />,
    badge: "02",
    tech: "Figma / Spatial / Design Systems",
  },
  {
    id: "automation",
    title: "Automation & AI",
    desc: "Smart autonomous agents and workflows to save time and scale faster.",
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    badge: "03",
    tech: "LLMs / Workflows / API Integration",
  },
  {
    id: "creative",
    title: "Creative Solutions",
    desc: "Bespoke digital artifacts tailored to your ambitious goals and vision.",
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    badge: "04",
    tech: "Motion / Shaders / Sound Design",
  },
];

export function WhatIDo() {
  const containerRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const haloRingRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { playClick, playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for content
      if (leftContentRef.current) {
        gsap.fromTo(
          leftContentRef.current.querySelectorAll(".reveal-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Portrait entrance & continuous slow rotation on halo ring
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (haloRingRef.current) {
        gsap.to(haloRingRef.current, {
          rotate: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      // 3. Staggered reveal for service cards
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".service-card"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D mouse parallax on portrait
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!portraitRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(portraitRef.current, {
      x: x * 20,
      y: y * 20,
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!portraitRef.current) return;
    gsap.to(portraitRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const scrollToSection = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#05030A] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Background Ambient Violet / Neon Glows */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_rgba(126,34,206,0.05)_45%,_transparent_70%)] blur-[130px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-20 sm:gap-28 md:gap-36 relative z-10">
        {/* ========================================================= */}
        {/* TOP COMPOSITION: EDITORIAL HERO & CUTOUT PORTRAIT         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[500px]">
          {/* Left Column: Typography & CTAs */}
          <div
            ref={leftContentRef}
            className="lg:col-span-7 flex flex-col items-start text-left z-20"
          >
            {/* Tag */}
            <div className="reveal-item flex items-center gap-2.5 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
              <span className="w-5 h-[1.5px] bg-purple-400" />
              <span>CREATIVE DEVELOPER &amp; ARCHITECT</span>
            </div>

            {/* Massive Heading: Ideas into Impact */}
            <h2 className="reveal-item font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] text-white my-3">
              Ideas into <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                Impact
              </span>
            </h2>

            {/* Narrative Subtitle */}
            <p className="reveal-item font-sans text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl mt-4 mb-8 leading-relaxed font-normal">
              I design and build digital experiences that look good, work flawlessly, and make a difference.
            </p>

            {/* CTA Buttons */}
            <div className="reveal-item flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => scrollToSection("work")}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-sans font-bold text-xs sm:text-sm tracking-tight shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-purple-400 bg-white/[0.03] hover:bg-white/[0.08] text-white font-sans font-medium text-xs sm:text-sm tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Get In Touch</span>
              </button>
            </div>

            {/* Availability Indicator */}
            <div className="reveal-item flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-wider">AVAILABLE FOR FREELANCE &amp; COMMISSIONS</span>
            </div>

            {/* Social Connect Line */}
            <div className="reveal-item flex items-center gap-4 pt-6 border-t border-white/[0.08] w-full max-w-md">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                CONNECT WITH ME:
              </span>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Github className="w-4 h-4" />, url: "https://github.com", label: "GitHub" },
                  { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com", label: "Instagram" },
                  { icon: <Mail className="w-4 h-4" />, url: `mailto:${siteConfig.contact.email}`, label: "Email" },
                ].map((soc, i) => (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-purple-500/20 hover:border-purple-400 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer"
                    aria-label={soc.label}
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Neon Halo & Portrait Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px]">
            {/* Outer Glowing Neon Portal Halo Ring */}
            <div
              ref={haloRingRef}
              className="absolute w-[340px] sm:w-[440px] md:w-[480px] h-[340px] sm:h-[440px] md:h-[480px] rounded-full border border-purple-500/25 pointer-events-none will-change-transform"
              style={{
                boxShadow: "0 0 60px rgba(168,85,247,0.18), inset 0 0 40px rgba(168,85,247,0.1)",
              }}
            >
              {/* Orbital Glow Bead */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_#C084FC]" />
            </div>

            {/* Stylistic Handwritten Chalk Badge */}
            <div className="absolute right-2 sm:right-6 top-8 z-30 pointer-events-none select-none rotate-6 text-right hidden sm:block">
              <span className="font-serif italic text-purple-300 text-lg sm:text-xl font-normal leading-tight block opacity-90 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
                Same Person <br />
                <span className="text-white">Better Ideas</span>
              </span>
            </div>

            {/* Gourab's High-Res Portrait with Smooth Bottom Gradient Fade */}
            <div
              ref={portraitRef}
              className="relative z-10 w-[280px] sm:w-[350px] md:w-[390px] h-[400px] sm:h-[480px] md:h-[520px] will-change-transform"
            >
              <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.6)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.6)_88%,transparent_100%)]">
                <Image
                  src="/assets/gourab-portrait.png"
                  alt="Gourab — Ideas into Impact"
                  fill
                  priority
                  className="object-cover object-top filter contrast-105 brightness-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: 4 PILLARS / WHAT I DO GRID                */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-10">
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((s) => {
              const isHovered = hoveredCard === s.id;

              return (
                <div
                  key={s.id}
                  onMouseEnter={() => {
                    setHoveredCard(s.id);
                    playHover();
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`service-card group relative p-7 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-6 cursor-default ${
                    isHovered
                      ? "border-purple-400/60 bg-gradient-to-b from-[#161026] via-[#100b1d] to-[#0a0714] shadow-[0_0_30px_rgba(168,85,247,0.2)] -translate-y-1.5"
                      : "border-white/[0.08] bg-[#0c0914]/80 hover:border-white/20"
                  }`}
                >
                  {/* Top: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <span className="font-mono text-xs text-neutral-500 font-semibold tracking-wider">
                      //{s.badge}
                    </span>
                  </div>

                  {/* Content: Title & Desc */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-xl text-white tracking-tight group-hover:text-purple-200 transition-colors">
                      {s.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Bottom Tech Meta */}
                  <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-500 group-hover:text-purple-300 transition-colors">
                    {s.tech}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Scroll Indicator & Meta */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500 pt-8 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 uppercase tracking-widest text-neutral-400">
              <span>BUILDING A BRIGHTER WEB</span>
            </div>

            <div className="flex items-center gap-2">
              <Mouse className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
              <span className="uppercase tracking-widest">SCROLL TO EXPLORE</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 font-semibold tracking-wider">
              <span>IDEAS</span>
              <span>//</span>
              <span>CODE</span>
              <span>//</span>
              <span className="text-purple-400">IMPACT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
