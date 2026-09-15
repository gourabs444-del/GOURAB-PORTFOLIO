"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { siteConfig } from "@/data/siteConfig";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import {
  Send,
  Copy,
  Check,
  ArrowUp,
  ArrowUpRight,
  Mail,
  Sparkles,
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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const { playClick, playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear, immediate entrance without scrub fading to black
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".reveal-text"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
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

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.75 },
          colors: ["#F59E0B", "#FFFFFF", "#38BDF8", "#A855F7"],
        });
      } catch {}
    }, 900);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#070709] text-white border-t border-white/[0.08] select-none"
    >
      {/* Centered Ambient Warm Radial Glow */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[650px] sm:w-[950px] h-[400px] sm:h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.12)_0%,_rgba(168,85,247,0.08)_40%,_transparent_70%)] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-20 sm:pt-28 md:pt-36 pb-16 flex flex-col items-center text-center">
        {/* ========================================================= */}
        {/* 1. CENTERED HERO HEADLINE & INVITATION                     */}
        {/* ========================================================= */}
        <div ref={heroRef} className="flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Top Monospace Tag */}
          <div className="reveal-text flex items-center justify-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-neutral-200">07 // COLLABORATION</span>
            <span className="text-neutral-600">/</span>
            <span>GET IN TOUCH</span>
          </div>

          {/* High-Impact Centered Typography */}
          <h2 className="reveal-text font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white my-2">
            Let&apos;s Build <br />
            <span className="bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-clip-text text-transparent font-black">
              Something Worth
            </span>{" "}
            <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-white">
              Remembering.
            </span>
          </h2>

          {/* Centered Subtitle */}
          <p className="reveal-text font-sans text-sm sm:text-base md:text-lg text-neutral-300 font-normal max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
            Have an ambitious project or design vision? Available worldwide for bespoke web development, creative tech, and scalable full-stack applications.
          </p>

          {/* Direct Email Actions (Centered) */}
          <div className="reveal-text flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-white text-black hover:bg-amber-300 font-sans font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-white/5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{siteConfig.contact.email}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-white font-mono text-xs transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-medium">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MINIMALIST INQUIRY DISPATCH (Clean Underlined Form)     */}
        {/* ========================================================= */}
        <div
          ref={formRef}
          className="w-full max-w-2xl mx-auto pt-12 border-t border-white/[0.08] text-left"
        >
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              OR TRANSMIT A DIRECT BRIEF
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Tell me about your goals.
            </h3>
          </div>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-2xl text-white">
                Message Dispatched Successfully
              </h4>
              <p className="font-sans text-sm text-neutral-400 max-w-md">
                Thank you for reaching out, Gourab will review your transmission and respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: "", email: "", scope: "full-stack", message: "" });
                }}
                className="mt-2 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                Send another message &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. elena@brand.com"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                </div>
              </div>

              {/* Scope Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Scope of Work
                </label>
                <select
                  value={formState.scope}
                  onChange={(e) => setFormState({ ...formState, scope: e.target.value })}
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white text-sm focus:outline-none transition-colors font-sans rounded-none cursor-pointer"
                >
                  <option value="full-stack" className="bg-[#070709] text-white">Full-Stack Web Architecture &amp; App</option>
                  <option value="creative-tech" className="bg-[#070709] text-white">Creative Development / WebGL &amp; Motion</option>
                  <option value="design-dev" className="bg-[#070709] text-white">Complete Brand Design &amp; Development</option>
                  <option value="ai-systems" className="bg-[#070709] text-white">Generative AI &amp; Intelligent Workspaces</option>
                  <option value="other" className="bg-[#070709] text-white">Bespoke Advisory / Exploration</option>
                </select>
              </div>

              {/* Narrative Textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Project Narrative
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your timeline, expectations, and vision..."
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors resize-none font-sans rounded-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">
                  Response within 24–48 hours.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-amber-300 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Transmitting..." : "Send Transmission"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL NETWORKS & FOOTER COLOPHON                      */}
        {/* ========================================================= */}
        <div className="w-full pt-16 mt-16 border-t border-white/[0.08] flex flex-col items-center gap-8">
          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono">
            {siteConfig.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
              >
                <span>{soc.name}</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </a>
            ))}
          </div>

          {/* Bottom Colophon Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 pt-6 border-t border-white/[0.04]">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">{siteConfig.name}</span>
              <span className="text-neutral-700">/</span>
              <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            </div>

            <div className="flex items-center gap-6">
              <span>DESIGN &bull; CODE &bull; MOTION</span>
              <button
                onClick={scrollToTop}
                onMouseEnter={() => playHover()}
                className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}





