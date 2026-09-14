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
      className="relative w-full overflow-hidden bg-black text-white selection:bg-purple-600 selection:text-white"
    >
      {/* ========================================================= */}
      {/* 100% FULL-SCREEN ABSOLUTE BLACK & LUMINOUS GLOWING PURPLE */}
      {/* ========================================================= */}
      <div
        ref={fullScreenHeroRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 py-20 overflow-hidden bg-black"
      >
        {/* Intense Luminous Electric Purple Glow (Vibrant, Neon, Non-Glassy) */}
        <div className="pointer-events-none absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black" aria-hidden="true">
          {/* Broad outer atmospheric purple halo */}
          <div
            ref={flareSvgRef as any}
            className="absolute w-[800px] sm:w-[1200px] lg:w-[1500px] h-[500px] sm:h-[700px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.55)_0%,_rgba(107,33,168,0.3)_40%,_rgba(88,28,135,0.12)_60%,_transparent_75%)] blur-[90px] pointer-events-none"
          />
          
          {/* Intense hot core neon purple glow */}
          <div className="absolute w-[400px] sm:w-[650px] lg:w-[850px] h-[250px] sm:h-[380px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(192,132,252,0.85)_0%,_rgba(168,85,247,0.6)_35%,_rgba(126,34,206,0.25)_65%,_transparent_80%)] blur-[60px] pointer-events-none" />

          {/* Center bright electric violet bloom directly behind text */}
          <div className="absolute w-[250px] sm:w-[450px] h-[150px] sm:h-[220px] rounded-full bg-[#A855F7] opacity-40 blur-[45px] pointer-events-none" />
        </div>

        {/* Foreground Content with Clean Glowing Modern Typography */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-7 my-auto px-4">
          {/* Scroll-Animated Luminous Headline */}
          <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.04] select-none text-center drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
            <span ref={line1Ref} className="block text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
              Let&apos;s Build
            </span>
            <span ref={line2Ref} className="block text-[#F3E8FF] drop-shadow-[0_0_30px_rgba(192,132,252,0.7)]">
              Something
            </span>
            <span
              ref={line3Ref}
              className="block text-white drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]"
            >
              Worth Remembering.
            </span>
          </h2>

          {/* Subtitle with clean readable typography */}
          <p
            ref={subTextRef}
            className="font-sans text-sm sm:text-base md:text-lg text-purple-100/80 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Available for select digital architecture commissions, bespoke creative tech direction, and high-performance WebGL &amp; full-stack systems.
          </p>

          {/* Glowing Luminous Pill CTA Button */}
          <div ref={ctaBtnRef} className="pt-3">
            <a
              href="#terminal-inquiry"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-sans font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:shadow-[0_0_55px_rgba(192,132,252,1)] border border-purple-300/60 hover:scale-[1.04] active:scale-[0.98] group cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Floating scroll indicator at bottom of full-screen view */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-purple-300/80 font-mono text-[11px] uppercase tracking-widest pointer-events-none animate-bounce">
          <span>SCROLL TO CONTACT</span>
          <div className="w-4 h-7 rounded-full border border-purple-400/50 flex justify-center pt-1 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
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



