"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { siteConfig } from "@/data/siteConfig";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import {
  Send,
  Copy,
  Check,
  ArrowUp,
  Sparkles,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    scope: "full-stack",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const fullScreenHeroRef = useRef<HTMLDivElement | null>(null);
  const flareSvgRef = useRef<SVGSVGElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const subTextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaBtnRef = useRef<HTMLDivElement | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  const { playClick, playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline scrubbed directly to scroll for the full-screen hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: fullScreenHeroRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 1.2,
        },
      });

      // 1. Background Purple Horizon Expansion
      tl.fromTo(
        flareSvgRef.current,
        { scaleY: 0.35, scaleX: 0.9, opacity: 0.25 },
        { scaleY: 1.0, scaleX: 1.0, opacity: 1, ease: "power2.out" },
        0
      );

      // 2. Line 1: "Let's Build"
      tl.fromTo(
        line1Ref.current,
        { y: 70, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out" },
        0.1
      );

      // 3. Line 2: "Something"
      tl.fromTo(
        line2Ref.current,
        { y: 70, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out" },
        0.25
      );

      // 4. Line 3: "Worth Remembering." with luminous bloom
      tl.fromTo(
        line3Ref.current,
        { y: 80, opacity: 0, filter: "blur(14px)", scale: 0.94 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, ease: "power3.out" },
        0.4
      );

      // 5. Subtitle
      tl.fromTo(
        subTextRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.55
      );

      // 6. Pill CTA Button
      tl.fromTo(
        ctaBtnRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, ease: "back.out(1.4)" },
        0.65
      );

      // Form Cards Scroll Entrance
      if (formSectionRef.current) {
        gsap.fromTo(
          formSectionRef.current,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.75 },
          colors: ["#A855F7", "#C084FC", "#FFFFFF", "#38BDF8", "#F59E0B"],
        });
      } catch {}
    }, 1000);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#06040C] text-white selection:bg-purple-600 selection:text-white"
    >
      {/* ========================================================= */}
      {/* 100% FULL-SCREEN PURPLE GLOWING HORIZON HERO SECTION     */}
      {/* ========================================================= */}
      <div
        ref={fullScreenHeroRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 py-20 overflow-hidden"
      >
        {/* Edge-to-Edge Full-Screen Glowing Aurora & Light Beam */}
        <div className="pointer-events-none absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden" aria-hidden="true">
          {/* Ambient soft glow backdrop */}
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,_rgba(147,51,234,0.38),_rgba(88,28,135,0.18)_40%,_transparent_75%)] blur-[90px]" />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_60%_35%_at_50%_50%,_rgba(192,132,252,0.45),_rgba(126,34,206,0.22)_45%,_transparent_75%)] blur-[50px]" />

          {/* Symmetrical Hourglass Purple Wings & Light Ray (Full-Screen 100% Vector) */}
          <svg
            ref={flareSvgRef}
            className="absolute inset-0 w-full h-full min-w-full min-h-full object-fill opacity-95 origin-center"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="fsCorePurpleGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="10%" stopColor="#F3E8FF" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#C084FC" stopOpacity="0.88" />
                <stop offset="50%" stopColor="#7E22CE" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#3B0764" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06040C" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="fsHorizontalBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#9333EA" stopOpacity="0" />
                <stop offset="12%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="30%" stopColor="#E9D5FF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="70%" stopColor="#E9D5FF" stopOpacity="0.9" />
                <stop offset="88%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Symmetrical Purple Aurora Wings (Curving to screen corners) */}
            <path
              d="M0,0 C500,380 800,530 960,540 C1120,530 1420,380 1920,0 L1920,1080 C1420,700 1120,550 960,540 C800,550 500,700 0,1080 Z"
              fill="url(#fsCorePurpleGlow)"
              opacity="0.92"
              filter="blur(45px)"
            />

            <path
              d="M0,-20 C500,390 820,545 960,550 C1100,545 1420,390 1920,-20 L1920,1100 C1420,690 1100,535 960,550 C820,535 500,690 0,1100 Z"
              fill="#A855F7"
              opacity="0.55"
              filter="blur(65px)"
            />

            {/* Smooth Glowing Horizon Core Bloom */}
            <ellipse cx="960" cy="540" rx="550" ry="45" fill="#FFFFFF" opacity="0.65" filter="blur(20px)" />
          </svg>
        </div>

        {/* Foreground Content with Scroll-Animated Typography */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-7 my-auto px-4">
          {/* Scroll-Animated Refined Headline */}
          <h2 className="font-display font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] text-white tracking-tight leading-[1.05] sm:leading-[1.0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none text-center">
            <span ref={line1Ref} className="block text-white">
              Let&apos;s Build
            </span>
            <span ref={line2Ref} className="block text-purple-100 font-light italic font-serif my-0.5 sm:my-1">
              Something
            </span>
            <span
              ref={line3Ref}
              className="block text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-200"
            >
              Worth Remembering.
            </span>
          </h2>

          {/* Subtitle with soft lavender typography */}
          <p
            ref={subTextRef}
            className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-purple-200/80 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
          >
            Available for select digital architecture commissions, bespoke creative tech direction, and high-performance WebGL &amp; full-stack systems.
          </p>

          {/* Glowing Purple Glass Pill CTA Button */}
          <div ref={ctaBtnRef} className="pt-2">
            <a
              href="#terminal-inquiry"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-purple-400/50 backdrop-blur-xl font-sans font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(168,85,247,0.4)] hover:shadow-[0_0_55px_rgba(168,85,247,0.7)] hover:scale-[1.04] active:scale-[0.98] group cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 text-purple-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Floating scroll indicator at bottom of full-screen view */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-purple-300/60 font-mono text-[11px] uppercase tracking-widest pointer-events-none animate-bounce">
          <span>SCROLL TO INITIATE DISPATCH</span>
          <div className="w-4 h-7 rounded-full border border-purple-400/40 flex justify-center pt-1">
            <div className="w-1 h-1.5 bg-purple-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE INQUIRY TERMINAL & DIRECT TRANSMISSION        */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 pb-20 pt-10">
        <div id="terminal-inquiry" ref={formSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Copy */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Email Card */}
            <CardSpotlight
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="p-8 bg-[#0D091F]/80 backdrop-blur-xl border border-purple-500/25 shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-purple-300/80 block mb-2 font-medium">
                DIRECT TRANSMISSION
              </span>
              <div className="flex items-center justify-between gap-4 mt-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-mono text-lg sm:text-xl font-bold text-white hover:text-purple-300 transition-colors truncate"
                >
                  {siteConfig.contact.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => playHover()}
                  data-cursor="pointer"
                  data-cursor-text={copied ? "COPIED" : "COPY"}
                  className="p-3 rounded-full border border-purple-500/30 bg-purple-950/50 hover:bg-purple-600 hover:text-white hover:border-purple-400 text-purple-200 transition-all shrink-0 shadow-sm"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="font-sans text-xs text-purple-300/60 mt-3 leading-relaxed">
                Click to copy email address directly or launch default mail client. Response within 24 hours.
              </p>
            </CardSpotlight>

            {/* Social Network Array */}
            <div className="p-8 rounded-2xl border border-purple-500/20 bg-[#0D091F]/70 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-xs uppercase tracking-widest text-purple-300/80 block mb-4 font-medium">
                DIGITAL NETWORKS &amp; REPOSITORIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siteConfig.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHover()}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-900/40 transition-all group shadow-sm"
                  >
                    <div>
                      <span className="font-sans text-sm font-bold text-white block group-hover:text-purple-300 transition-colors">
                        {soc.name}
                      </span>
                      <span className="font-mono text-[11px] text-purple-300/60">
                        {soc.handle}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Terminal */}
          <div className="lg:col-span-7">
            <CardSpotlight
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="p-8 sm:p-10 bg-[#0D091F]/85 backdrop-blur-xl border border-purple-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                    TRANSMISSION TERMINAL
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  ONLINE // ENCRYPTED
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-2 shadow-sm">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-inter font-bold text-2xl text-white">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="font-sans text-sm text-purple-200/80 max-w-sm">
                    Thank you for initiating contact. Your inquiry has been routed to Gourab&apos;s direct dispatch queue.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: "", email: "", scope: "full-stack", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full border border-purple-400/40 bg-purple-950/60 hover:bg-purple-600 hover:text-white text-purple-200 font-sans font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>SEND ANOTHER DISPATCH</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-purple-200/80 font-semibold">
                        YOUR NAME / ENTITY *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-purple-300/40 text-sm focus:bg-[#150e33] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-purple-200/80 font-semibold">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. elena@nexus.co"
                        className="w-full px-4 py-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-purple-300/40 text-sm focus:bg-[#150e33] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-purple-200/80 font-semibold">
                      ENGAGEMENT SCOPE
                    </label>
                    <select
                      value={formState.scope}
                      onChange={(e) => setFormState({ ...formState, scope: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-sm focus:bg-[#150e33] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-sm cursor-pointer font-sans"
                    >
                      <option value="full-stack" className="bg-[#0D091F] text-white">Full-Stack Platform Architecture</option>
                      <option value="creative-tech" className="bg-[#0D091F] text-white">Creative Development / WebGL / Shaders</option>
                      <option value="motion-film" className="bg-[#0D091F] text-white">Cinematic Motion &amp; Video Direction</option>
                      <option value="ai-systems" className="bg-[#0D091F] text-white">Autonomous AI &amp; Workflow Automation</option>
                      <option value="other" className="bg-[#0D091F] text-white">Bespoke Advisory / Exploration</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-purple-200/80 font-semibold">
                      PROJECT NARRATIVE &amp; TIMELINE
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline your vision, objectives, key constraints, and expected launch date..."
                      className="w-full px-4 py-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white placeholder-purple-300/40 text-sm focus:bg-[#150e33] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all resize-none shadow-sm font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="w-full mt-2 py-4 px-8 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(147,51,234,0.45)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH INQUIRY"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </CardSpotlight>
          </div>
        </div>

        {/* Bottom Colophon Bar & Back-to-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-16 border-t border-purple-500/20 text-xs font-mono text-purple-300/70">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold font-inter">{siteConfig.name}</span>
            <span className="text-purple-400/50">/</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <span>DESIGNED &amp; ARCHITECTED WITH RIGOR</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => playHover()}
              data-cursor="pointer"
              data-cursor-text="TOP"
              className="flex items-center gap-2 p-2.5 rounded-full border border-purple-500/30 bg-purple-950/40 hover:bg-purple-600 hover:text-white hover:border-purple-400 text-purple-200 transition-all shadow-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}



