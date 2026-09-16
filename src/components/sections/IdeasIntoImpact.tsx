"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

export function IdeasIntoImpact() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ascensionRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !stageRef.current) return;

      const isMobile = window.innerWidth < 768;

      // Master ScrollTrigger Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=160%",
          pin: stageRef.current,
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // 1. Initial State: ASCENSION pops in front and center
      tl.fromTo(
        ascensionRef.current,
        {
          opacity: 0,
          scale: isMobile ? 1.1 : 1.45,
          y: isMobile ? 30 : 60,
          filter: "blur(12px) drop-shadow(0 0 60px rgba(168,85,247,0.8))",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px) drop-shadow(0 0 25px rgba(168,85,247,0.3))",
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );

      // 2. Portrait flies in from bottom-right and docks into place
      tl.fromTo(
        portraitRef.current,
        {
          opacity: 0,
          x: isMobile ? 40 : 160,
          y: isMobile ? 80 : 180,
          scale: 0.82,
          rotate: isMobile ? 0 : 3,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        0.4
      );

      // 3. Backlight Aura blooms behind the head
      tl.fromTo(
        auraRef.current,
        {
          opacity: 0,
          scale: 0.4,
        },
        {
          opacity: 0.85,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        0.5
      );

      // 4. Left Hero Content items fly in from the left and assemble
      if (leftContentRef.current) {
        const items = leftContentRef.current.querySelectorAll(".assemble-item");
        tl.fromTo(
          items,
          {
            opacity: 0,
            x: isMobile ? -30 : -90,
            y: 20,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            stagger: 0.08,
            duration: 1.2,
            ease: "power3.out",
          },
          0.6
        );
      }

      // 5. Bottom Services Cards glide up and lock into place
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card-anim");
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: isMobile ? 40 : 90,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.07,
            duration: 1.2,
            ease: "power3.out",
          },
          0.9
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Web Development",
      desc: "Modern, responsive and high-performance websites.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 sm:w-6 h-5 sm:h-6 stroke-[#c4b5fd] group-hover:stroke-white transition-colors duration-300"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: "UI/UX Design",
      desc: "Clean and engaging designs that convert.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 sm:w-6 h-5 sm:h-6 stroke-[#c4b5fd] group-hover:stroke-white transition-colors duration-300"
        >
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
        </svg>
      ),
    },
    {
      title: "Automation",
      desc: "Smart solutions to save time and scale faster.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 sm:w-6 h-5 sm:h-6 stroke-[#c4b5fd] group-hover:stroke-white transition-colors duration-300"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: "Creative Solutions",
      desc: "Ideas tailored to your goals and vision.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 sm:w-6 h-5 sm:h-6 stroke-[#c4b5fd] group-hover:stroke-white transition-colors duration-300"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      id="impact-scroll-stage"
      className="relative w-full bg-[#020204] text-white select-none border-t border-white/[0.08]"
    >
      {/* Sticky Fullscreen Pinned Stage */}
      <div
        ref={stageRef}
        className="relative w-full min-h-screen h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-12"
      >
        {/* Studio Lighting Ambient Glows */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] rounded-full blur-[140px] opacity-70 bg-[radial-gradient(ellipse_at_top,_rgba(147,51,234,0.25)_0%,_rgba(124,58,237,0.1)_40%,_transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[120px] opacity-40 bg-[radial-gradient(circle,_rgba(99,102,241,0.15)_0%,_transparent_70%)]"
          aria-hidden="true"
        />

        {/* Top Laser Accent Line */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c4b5fd]/60 to-transparent shadow-[0_0_16px_rgba(167,139,250,0.5)]" />

        <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full max-h-[860px] relative z-10 my-auto py-4">
          {/* ========================================================= */}
          {/* 1. HERO SECTION: ASSEMBLED CONTENT & PORTRAIT            */}
          {/* ========================================================= */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 flex-1 min-h-0">
            {/* Left Column: Assembling Headline & Interactive Actions */}
            <div
              ref={leftContentRef}
              className="w-full lg:max-w-[540px] flex flex-col z-20 justify-center"
            >
              {/* Top Badge */}
              <div className="assemble-item flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-6 h-[1.5px] bg-[#64748b]" />
                <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#94a3b8] uppercase">
                  CREATIVE DEVELOPER
                </span>
              </div>

              {/* Main Hero Title */}
              <h2 className="assemble-item font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight leading-[1.04] mb-4 text-white">
                Ideas into <br />
                <span className="bg-gradient-to-r from-[#c4b5fd] via-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.4)]">
                  Impact
                </span>
              </h2>

              {/* Narrative Subtitle */}
              <p className="assemble-item font-sans text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-md mb-6 font-normal">
                I design and build digital experiences that look good, work flawlessly, and make a difference.
              </p>

              {/* Action Buttons */}
              <div className="assemble-item flex flex-wrap items-center gap-3.5 mb-6">
                <a
                  href="#works"
                  onMouseEnter={() => playHover()}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black hover:bg-[#c4b5fd] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(196,181,253,0.4)] active:scale-95 cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#contact"
                  onMouseEnter={() => playHover()}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:border-white/30 text-white font-sans font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 hover:bg-white/[0.08] active:scale-95 cursor-pointer"
                >
                  Get In Touch
                </a>
              </div>

              {/* Availability Status */}
              <div className="assemble-item flex items-center gap-2.5 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.15em] text-[#64748b] uppercase">
                  AVAILABLE FOR FREELANCE
                </span>
              </div>

              {/* Connect With Me Socials */}
              <div className="assemble-item flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[11px] font-mono font-semibold tracking-[0.15em] text-[#64748b] uppercase">
                  <span className="w-4 h-[1.5px] bg-[#64748b]" />
                  <span>CONNECT WITH ME</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHover()}
                    className="w-10 h-10 rounded-xl bg-[#12131c]/85 border border-white/10 hover:border-[#0a66c2]/65 hover:bg-[#0a66c2]/20 hover:shadow-[0_4px_18px_rgba(10,102,194,0.38)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" className="group-hover:scale-110 transition-transform">
                      <path
                        fill="#0A66C2"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74V10.13H5.06v8.37h2.8z"
                      />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHover()}
                    className="w-10 h-10 rounded-xl bg-[#12131c]/85 border border-white/10 hover:border-white/50 hover:bg-white/15 hover:shadow-[0_4px_18px_rgba(255,255,255,0.25)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
                    aria-label="GitHub"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" className="group-hover:scale-110 transition-transform">
                      <path
                        fill="#FFFFFF"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHover()}
                    className="w-10 h-10 rounded-xl bg-[#12131c]/85 border border-white/10 hover:border-[#e1306c]/65 hover:bg-[#e1306c]/20 hover:shadow-[0_4px_18px_rgba(225,48,108,0.38)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" className="group-hover:scale-110 transition-transform">
                      <defs>
                        <radialGradient id="impactIgGrad2" cx="20%" cy="105%" r="130%">
                          <stop offset="0%" stopColor="#fdf497" />
                          <stop offset="5%" stopColor="#fdf497" />
                          <stop offset="45%" stopColor="#fd5949" />
                          <stop offset="60%" stopColor="#d6249f" />
                          <stop offset="90%" stopColor="#285AEB" />
                        </radialGradient>
                      </defs>
                      <path
                        fill="url(#impactIgGrad2)"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </a>

                  {/* Gmail */}
                  <a
                    href="mailto:gourabs444@gmail.com"
                    onMouseEnter={() => playHover()}
                    className="w-10 h-10 rounded-xl bg-[#12131c]/85 border border-white/10 hover:border-[#ea4335]/65 hover:bg-[#ea4335]/20 hover:shadow-[0_4px_18px_rgba(234,67,53,0.38)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
                    aria-label="Email"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" className="group-hover:scale-110 transition-transform">
                      <path fill="#4285F4" d="M20 18h2V7.5L18.5 10v7.5c0 .83.67 1.5 1.5 1.5z" />
                      <path fill="#34A853" d="M4 19h-2V7.5L5.5 10v7.5c0 .83-.67 1.5-1.5 1.5z" />
                      <path fill="#EA4335" d="M18.5 6H5.5L12 11l6.5-5z" />
                      <path
                        fill="#FBBC05"
                        d="M2 7.5V6c0-.83.67-1.5 1.5-1.5h1.5l7 5.5 7-5.5h1.5c.83 0 1.5.67 1.5 1.5v1.5L12 14 2 7.5z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with ASCENSION & Flying Portrait */}
            <div className="w-full lg:w-[54%] relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] pointer-events-none">
              {/* Environmental Backlight Glow */}
              <div
                ref={auraRef}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[240px] sm:h-[280px] rounded-full blur-[50px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.35)_0%,_rgba(124,58,237,0.15)_40%,_transparent_70%)]"
                aria-hidden="true"
              />

              {/* Behind-the-Head Tall Condensed Editorial Typography */}
              <div
                ref={ascensionRef}
                className="absolute top-[4%] sm:top-[2%] left-1/2 -translate-x-1/2 font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[0.05em] uppercase select-none z-10 opacity-90 scale-y-[1.8] origin-center whitespace-nowrap bg-gradient-to-b from-white/75 via-white/35 to-transparent bg-clip-text text-transparent will-change-transform"
                aria-hidden="true"
              >
                ASCENSION
              </div>

              {/* Flying Portrait Image */}
              <div
                ref={portraitRef}
                className="relative z-20 w-full max-w-[400px] sm:max-w-[460px] h-[380px] sm:h-[480px] flex items-end justify-center will-change-transform"
              >
                <img
                  src="/assets/hero-hd.png"
                  alt="Gourab Creative Developer"
                  className="w-auto h-full max-h-[480px] object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] filter contrast-[1.05] brightness-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. SERVICES FEATURE CARDS GRID (4 BENTO TILES)           */}
          {/* ========================================================= */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-2"
          >
            {services.map((s, idx) => (
              <div
                key={idx}
                onMouseEnter={() => playHover()}
                className="service-card-anim group relative flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#0e0f17]/70 border border-white/[0.06] hover:border-[#9333ea]/45 hover:bg-[#161724]/90 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-default overflow-hidden will-change-transform"
              >
                {/* Top Laser Accent Hover Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col gap-2">
                  {/* Icon Wrapper */}
                  <div className="w-8 h-8 flex items-center justify-start text-[#d8b4fe]">
                    {s.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-[13px] text-[#94a3b8] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom Status Tag */}
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  <span>0{idx + 1} // CAPABILITY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
