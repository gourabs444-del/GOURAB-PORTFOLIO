"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/siteConfig";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import {
  Send,
  Copy,
  Check,
  ArrowUp,
  ArrowUpRight,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";
import confetti from "canvas-confetti";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  const containerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const { playClick, playHover } = useAudioFeedback();

  // Live Local Time in IST
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const maskLines = containerRef.current?.querySelectorAll(".footer-reveal");
      if (maskLines && maskLines.length > 0) {
        gsap.fromTo(
          maskLines,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
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
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
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
          origin: { y: 0.8 },
          colors: ["#F59E0B", "#FFFFFF", "#38BDF8", "#10B981"],
        });
      } catch {}
    }, 700);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#050507] text-[#F4F4F6] border-t border-white/[0.08] select-none"
    >
      {/* Subtle Background Glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.06)_0%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Telemetry Bar */}
      <div className="w-full border-b border-white/[0.06] py-3.5 px-6 sm:px-12 md:px-20 text-xs font-mono text-neutral-400">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">OPEN FOR COMMISSIONS &amp; ROLES (2026)</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-neutral-300">INDIA // GLOBAL REMOTE</span>
            </div>
            {currentTime && (
              <div className="flex items-center gap-1.5 text-neutral-300 hidden sm:flex">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentTime} IST</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-28 md:pt-36 pb-12 flex flex-col items-center text-center">
        {/* ========================================================= */}
        {/* 1. HERO INVITATION & MASSIVE EDITORIAL TYPOGRAPHY         */}
        {/* ========================================================= */}
        <div ref={heroRef} className="flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Top Tag */}
          <div className="footer-reveal flex items-center justify-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-white">07 // INITIATE TRANSMISSION</span>
            <span className="text-neutral-600">/</span>
            <span>GET IN TOUCH</span>
          </div>

          {/* Masterpiece Editorial Heading */}
          <h2 className="footer-reveal font-bodoni font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white my-2">
            Let&apos;s Build Something <br />
            <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Iconic Together.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="footer-reveal font-sans text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 mb-10 font-normal leading-relaxed">
            Have an ambitious vision, 3D interactive experience, or fullstack product? Let&apos;s turn bold ideas into high-performance digital realities.
          </p>

          {/* Clean Editorial Email Link (Zero Capsule Pills) */}
          <div className="footer-reveal flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16 sm:mb-20">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="group flex items-center gap-2.5 text-xl sm:text-2xl md:text-3xl font-mono font-medium text-white hover:text-amber-300 transition-colors border-b border-white/20 hover:border-amber-400 pb-1"
            >
              <span>{siteConfig.contact.email}</span>
              <ArrowUpRight className="w-6 h-6 stroke-[2] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-amber-400" />
            </a>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => playHover()}
              className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Address</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MINIMALIST INQUIRY DISPATCH (Clean Underlines Only)     */}
        {/* ========================================================= */}
        <div
          ref={formRef}
          className="w-full max-w-2xl mx-auto pt-12 border-t border-white/[0.08] text-left"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              DIRECT INQUIRY &amp; BRIEF
            </span>
            <h3 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight">
              Tell me about your goals.
            </h3>
          </div>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-3 border-y border-white/[0.08] p-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bodoni font-medium text-2xl text-white">
                Transmission Dispatched
              </h4>
              <p className="font-sans text-sm text-neutral-400 max-w-md">
                Thank you for reaching out. Gourab will review your brief and follow up with you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: "", email: "", message: "" });
                }}
                className="mt-2 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                Transmit another brief &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col gap-2 relative">
                  <label className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "name" ? "text-amber-400 font-bold" : "text-neutral-400"
                  }`}>
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                    focusedField === "name" ? "scale-x-100" : "scale-x-0"
                  }`} />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 relative">
                  <label className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "email" ? "text-amber-400 font-bold" : "text-neutral-400"
                  }`}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alexander@aether.ai"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                    focusedField === "email" ? "scale-x-100" : "scale-x-0"
                  }`} />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 relative">
                <label className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                  focusedField === "message" ? "text-amber-400 font-bold" : "text-neutral-400"
                }`}>
                  Project Narrative &amp; Timeline
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your vision, scope, and timeline goals..."
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors resize-none font-sans rounded-none"
                />
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                  focusedField === "message" ? "scale-x-100" : "scale-x-0"
                }`} />
              </div>

              {/* Submit Line */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Estimated reply within 24 business hours
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group flex items-center gap-2 text-sm font-mono font-bold text-white hover:text-amber-300 transition-colors border-b border-white/30 hover:border-amber-400 pb-1 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Transmitting..." : "Send Transmission"}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL BRAND LINKS (Clean Typographic Links)           */}
        {/* ========================================================= */}
        <div className="w-full pt-16 mt-16 border-t border-white/[0.08] flex flex-col items-center gap-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
            {siteConfig.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 group cursor-pointer"
              >
                <span>{soc.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-500 group-hover:text-amber-300" />
              </a>
            ))}
          </div>

          {/* ========================================================= */}
          {/* 4. FULL NAME WATERMARK (100% Edge-to-Edge SVG, NO CUTOFF)  */}
          {/* ========================================================= */}
          <div className="w-full max-w-5xl mx-auto px-2 overflow-visible select-none pointer-events-none opacity-[0.07] hover:opacity-[0.14] transition-opacity duration-500 my-2">
            <svg
              viewBox="0 0 1000 170"
              className="w-full h-auto overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="500"
                y="135"
                textAnchor="middle"
                className="font-bodoni italic font-bold"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontSize: "155px",
                  fill: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                GOURAB
              </text>
            </svg>
          </div>

          {/* Bottom Colophon Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 pt-6 border-t border-white/[0.06]">
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


