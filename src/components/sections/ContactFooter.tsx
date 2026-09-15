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
  ChevronRight,
  Layers,
  Terminal,
  Compass,
} from "lucide-react";
import confetti from "canvas-confetti";

const projectScopes = [
  "Web Development",
  "UI/UX Design",
  "3D & WebGL",
  "Full-Stack Product",
  "AI & Automation",
];

const navigationLinks = [
  { label: "Selected Works", id: "work" },
  { label: "Experience & Roles", id: "experience" },
  { label: "Showreel & Motion", id: "showreel" },
  { label: "Design Philosophy", id: "about" },
  { label: "Process & Pipeline", id: "process" },
];

const disciplines = [
  { num: "01", title: "Next.js & Full-Stack Systems" },
  { num: "02", title: "WebGL, 3D & Shader Art" },
  { num: "03", title: "Autonomous AI & Agentic Tech" },
  { num: "04", title: "Ultra-High Performance (60fps)" },
];

const getSocialIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "X (Twitter)":
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "ReadCV":
      return (
        <svg
          className="w-4 h-4 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "Awwwards":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.31 9.28l1.45-3.6h-2.18l-.89 2.52-.94-2.52h-2.22l1.49 3.6-1.57 3.86h2.22l.98-2.73.94 2.73h2.18zm-7.65 0l1.45-3.6H9.93l-.89 2.52-.94-2.52H5.88l1.49 3.6-1.57 3.86h2.22l.98-2.73.94 2.73h2.18z" />
        </svg>
      );
    default:
      return <ArrowUpRight className="w-4 h-4" />;
  }
};

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["Web Development"]);
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
      // Ambient Background Kinetic Marquee sliding with mouse scroll
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
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter((s) => s !== scope));
      }
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
          particleCount: 100,
          spread: 80,
          origin: { y: 0.85 },
          colors: ["#F59E0B", "#FFFFFF", "#38BDF8", "#10B981"],
        });
      } catch {}
    }, 700);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1100px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.07)_0%,_rgba(56,189,248,0.03)_50%,_transparent_75%)] blur-[130px]"
        aria-hidden="true"
      />

      {/* Top Live Telemetry Status Bar */}
      <div className="w-full border-b border-white/[0.06] py-3.5 px-6 sm:px-12 md:px-20 text-xs font-mono text-neutral-400 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-white font-medium tracking-wider uppercase text-[11px] sm:text-xs">
              STATUS: ACCEPTING SELECT COMMISSIONS (2026)
            </span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400 text-[11px] sm:text-xs">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-28 md:pt-36 pb-12 flex flex-col items-center text-center">
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
        {/* 2. PRO INQUIRY BRIEF FORM WITH REFINED SCOPE SELECTOR      */}
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
              Select your required disciplines and describe your vision.
            </p>
          </div>

          {/* Interactive Project Scope Chips */}
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3.5">
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
                    className={`group relative px-4 py-2.5 rounded-full text-xs font-sans tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-amber-400 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-[1.02]"
                        : "bg-white/[0.03] text-neutral-300 border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isSelected ? "bg-black" : "bg-neutral-500 group-hover:bg-amber-400"
                      }`}
                    />
                    <span>{scope}</span>
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
                  setFormState({ name: "", email: "", message: "" });
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
        {/* 3. LUXURY 4-COLUMN EDITORIAL SITEMAP & BRAND MATRIX       */}
        {/* ========================================================= */}
        <div className="w-full pt-20 mt-20 border-t border-white/[0.08] text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
            {/* Col 1: Brand & Status (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                    Gourab<span className="text-amber-400">.</span>
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
                  Creative Developer &amp; Digital Architect crafting high-grade web platforms, interactive 3D spatial systems, and AI products.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs font-mono text-neutral-500 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Commissions &bull; 2026</span>
                </div>
                <span className="text-neutral-500">Based in India &bull; Serving Global Clients</span>
              </div>
            </div>

            {/* Col 2: Navigation / Sitemap (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                // SITEMAP
              </span>
              <ul className="flex flex-col gap-2.5 text-xs font-sans">
                {navigationLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Core Disciplines (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                // DISCIPLINES
              </span>
              <ul className="flex flex-col gap-2.5 text-xs font-sans text-neutral-400">
                {disciplines.map((d) => (
                  <li key={d.num} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-amber-400/80">{d.num}</span>
                    <span className="text-neutral-300">{d.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Official Social Network (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                // NETWORK &amp; SOCIALS
              </span>
              <div className="grid grid-cols-1 gap-2">
                {siteConfig.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-3.5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/40 text-neutral-300 hover:text-white transition-all duration-200 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-neutral-400 group-hover:text-amber-400 transition-colors">
                        {getSocialIcon(soc.name)}
                      </span>
                      <span className="text-xs font-sans font-medium">{soc.name}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. GRAND ARCHITECTURAL SIGNATURE WATERMARK                */}
          {/* ========================================================= */}
          <div className="w-full pt-8 pb-4 overflow-hidden select-none pointer-events-none border-t border-white/[0.06]">
            <div className="relative w-full flex items-center justify-center text-center">
              <span className="font-bodoni font-black tracking-tight text-[16vw] sm:text-[17vw] md:text-[18vw] leading-none bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent bg-clip-text text-transparent select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                GOURAB
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 5. BOTTOM COLOPHON & SYSTEM BAR                           */}
          {/* ========================================================= */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 pt-6 border-t border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-2.5 text-center sm:text-left">
              <span className="text-white font-semibold">{siteConfig.name}</span>
              <span className="text-neutral-700">/</span>
              <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
              <span className="hidden md:inline text-neutral-700">/</span>
              <span className="hidden md:inline text-neutral-400">DESIGN &bull; CODE &bull; MOTION</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Back to top of page"
              >
                <span className="text-[11px] font-mono tracking-wider">BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
