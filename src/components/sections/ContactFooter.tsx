"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { siteConfig } from "@/data/siteConfig";
import {
  Send,
  Copy,
  Check,
  ArrowUp,
  ArrowUpRight,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Layers,
} from "lucide-react";
import confetti from "canvas-confetti";

const projectScopes = [
  "Web Development",
  "UI/UX Design",
  "3D & WebGL",
  "Full-Stack Product",
  "AI & Automation",
];

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["Web Development"]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    budget: "$5k - $15k",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  const containerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

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

  // Entrance animations & Marquee Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient Background Kinetic Marquee
      if (marqueeTrackRef.current) {
        gsap.fromTo(
          marqueeTrackRef.current,
          { xPercent: 0 },
          {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1.2,
            },
          }
        );
      }

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

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter((s) => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.85 },
          colors: ["#F59E0B", "#FFFFFF", "#38BDF8", "#10B981"],
        });
      } catch {}
    }, 700);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#040306] text-[#F4F4F6] border-t border-white/[0.08] select-none"
    >
      {/* Dynamic Ambient Background Glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1000px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.07)_0%,_rgba(56,189,248,0.03)_50%,_transparent_75%)] blur-[120px]"
        aria-hidden="true"
      />

      {/* Top Live Telemetry Status Bar */}
      <div className="w-full border-b border-white/[0.06] py-3.5 px-6 sm:px-12 md:px-20 text-xs font-mono text-neutral-400 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-white font-medium tracking-wider uppercase">
              STATUS: ACCEPTING SELECT COMMISSIONS (2026)
            </span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-neutral-300">INDIA // GLOBAL REMOTE</span>
            </div>
            {currentTime && (
              <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentTime} IST</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-28 md:pt-36 pb-12 flex flex-col items-center text-center">
        {/* ========================================================= */}
        {/* 1. HERO INVITATION & MASSIVE EDITORIAL TYPOGRAPHY         */}
        {/* ========================================================= */}
        <div ref={heroRef} className="relative flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Ambient Kinetic Marquee Watermark Directly Behind Heading */}
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-[62%] left-1/2 -translate-x-1/2 w-screen overflow-hidden whitespace-nowrap opacity-[0.06] sm:opacity-[0.08] select-none z-0"
            aria-hidden="true"
          >
            <div
              ref={marqueeTrackRef}
              className="inline-block text-[14vw] sm:text-[13vw] font-display font-black tracking-tighter uppercase leading-none will-change-transform text-white"
            >
              GET IN TOUCH &bull; START A PROJECT &bull; LET&apos;S TALK &bull; CREATE &bull; AVAILABLE 2026 &bull; GET IN TOUCH &bull; START A PROJECT &bull; LET&apos;S TALK &bull;
            </div>
          </div>

          {/* Top Tag */}
          <div className="footer-reveal flex items-center justify-center gap-2.5 text-xs font-mono text-amber-400/90 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">06 // INITIATE TRANSMISSION</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">LET&apos;S TALK</span>
          </div>

          {/* Masterpiece Editorial Heading */}
          <h2 className="footer-reveal font-bodoni font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white my-2">
            Have an ambitious idea? <br />
            <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.25)]">
              Let&apos;s Make It Iconic.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="footer-reveal font-sans text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 mb-10 font-light leading-relaxed">
            Whether you need a high-performance web platform, interactive 3D spatial experience, or bespoke fullstack product — let&apos;s build something that commands attention.
          </p>

          {/* Pro Direct Email Button & Copy Action */}
          <div className="footer-reveal flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 sm:mb-20">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-amber-300 font-sans font-bold text-sm sm:text-base tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Mail className="w-4 h-4 text-black" />
              <span>{siteConfig.contact.email}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:border-amber-400 bg-white/[0.03] hover:bg-white/[0.08] text-white font-mono text-xs tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">COPIED ADDRESS</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. PRO INQUIRY BRIEF FORM WITH INTERACTIVE SCOPE SELECTOR  */}
        {/* ========================================================= */}
        <div
          ref={formRef}
          className="w-full max-w-3xl mx-auto pt-14 border-t border-white/[0.08] text-left"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              PROJECT BRIEF &amp; ESTIMATE
            </span>
            <h3 className="font-bodoni font-medium text-2xl sm:text-4xl text-white tracking-tight">
              Tell me about your project.
            </h3>
            <p className="text-neutral-400 font-sans text-xs sm:text-sm mt-2">
              Select your required disciplines and describe your timeline.
            </p>
          </div>

          {/* Interactive Project Scope Chips */}
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
              I am looking for:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {projectScopes.map((scope) => {
                const isSelected = selectedScopes.includes(scope);
                return (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => toggleScope(scope)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "bg-white/[0.04] text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {scope}
                  </button>
                );
              })}
            </div>
          </div>

          {isSubmitted ? (
            <div className="py-14 flex flex-col items-center text-center gap-3 border border-white/[0.08] rounded-2xl bg-white/[0.02] p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bodoni font-medium text-2xl sm:text-3xl text-white mt-2">
                Transmission Received
              </h4>
              <p className="font-sans text-sm text-neutral-400 max-w-md">
                Thank you for the brief. Gourab will review the specifications and follow up directly within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: "", email: "", budget: "$5k - $15k", message: "" });
                }}
                className="mt-4 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                Send another message &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col gap-2 relative">
                  <label
                    className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                      focusedField === "name" ? "text-amber-400 font-semibold" : "text-neutral-400"
                    }`}
                  >
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                      focusedField === "name" ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 relative">
                  <label
                    className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                      focusedField === "email" ? "text-amber-400 font-semibold" : "text-neutral-400"
                    }`}
                  >
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. elena@nexus.com"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                      focusedField === "email" ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Message / Brief */}
              <div className="flex flex-col gap-2 relative">
                <label
                  className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    focusedField === "message" ? "text-amber-400 font-semibold" : "text-neutral-400"
                  }`}
                >
                  Project Vision &amp; Goals
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your product, timeline, aesthetic direction, and objectives..."
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors resize-none font-sans rounded-none"
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                    focusedField === "message" ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>

              {/* Submit Line */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Fast response guaranteed within 24 business hours
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-sans font-bold text-xs sm:text-sm tracking-tight shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Dispatching..." : "Send Transmission"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL BRAND NETWORK                                   */}
        {/* ========================================================= */}
        <div className="w-full pt-16 mt-16 border-t border-white/[0.08] flex flex-col items-center gap-10">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono">
            {siteConfig.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-400/50 text-neutral-300 hover:text-white transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>{soc.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-500 group-hover:text-amber-400" />
              </a>
            ))}
          </div>

          {/* ========================================================= */}
          {/* 4. FULL NAME WATERMARK (100% Edge-to-Edge SVG, NO CUTOFF)  */}
          {/* ========================================================= */}
          <div className="w-full max-w-5xl mx-auto px-2 overflow-visible select-none pointer-events-none opacity-[0.06] hover:opacity-[0.12] transition-opacity duration-500 my-4">
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



