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
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [selectedScope, setSelectedScope] = useState("01 // FULLSTACK ARCHITECTURE");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  const containerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const lightAuraRef = useRef<HTMLDivElement | null>(null);
  const emailPillRef = useRef<HTMLAnchorElement | null>(null);
  const copyPillRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const { playClick, playHover } = useAudioFeedback();

  // Live Local Time in IST / User location
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

  // 1. GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance on scroll
      const maskLines = containerRef.current?.querySelectorAll(".mask-reveal-inner");
      if (maskLines && maskLines.length > 0) {
        gsap.fromTo(
          maskLines,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
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

      // Form entrance on scroll
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

  // 2. Interactive Spotlight Follower
  useEffect(() => {
    const container = containerRef.current;
    const aura = lightAuraRef.current;
    if (!container || !aura) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(aura, {
        x: x,
        y: y,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Magnetic Button Physics
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>, targetRef: React.RefObject<HTMLElement | null>) => {
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (targetRef: React.RefObject<HTMLElement | null>) => {
    const el = targetRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1.1, 0.4)" });
  };

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
    }, 800);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projectScopes = [
    "01 // FULLSTACK ARCHITECTURE",
    "02 // WEBGL & CREATIVE TECH",
    "03 // AI SYSTEMS & AGENTS",
    "04 // BRAND & PRODUCT DESIGN",
  ];

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#050507] text-[#F4F4F6] border-t border-white/[0.08] select-none"
    >
      {/* Dynamic Cursor Light Aura Follower */}
      <div
        ref={lightAuraRef}
        className="pointer-events-none absolute -top-[250px] -left-[250px] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.12)_0%,_rgba(56,189,248,0.04)_45%,_transparent_70%)] blur-[100px] opacity-80 will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Top HUD Telemetry Bar */}
      <div className="w-full border-b border-white/[0.06] py-3.5 px-6 sm:px-12 md:px-20 text-xs font-mono text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">CAPACITY: OPEN FOR COMMISSIONS (Q3/Q4 2026)</span>
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 md:px-20 pt-24 sm:pt-32 md:pt-40 pb-20 flex flex-col items-center text-center">
        {/* ========================================================= */}
        {/* 1. HERO INVITATION & LUXURY TYPOGRAPHY                    */}
        {/* ========================================================= */}
        <div ref={heroRef} className="flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Top Tag */}
          <div className="mask-reveal-inner flex items-center justify-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-white">07 // COLLABORATION</span>
            <span className="text-neutral-600">/</span>
            <span>INITIATE TRANSMISSION</span>
          </div>

          {/* Masterpiece Editorial Heading */}
          <h2
            ref={headlineRef}
            className="font-bodoni font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white my-3"
          >
            <div className="mask-reveal-inner block">
              Let&apos;s Build Something
            </div>
            <div className="mask-reveal-inner block">
              <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Iconic Together.
              </span>
            </div>
          </h2>

          {/* Narrative Subtitle */}
          <p className="mask-reveal-inner font-sans text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 mb-12 font-normal leading-relaxed">
            Have an ambitious digital product, 3D experience, or scalable AI architecture? I collaborate worldwide with forward-thinking founders and creative brands.
          </p>

          {/* Direct Email Actions with Magnetic Physics */}
          <div className="mask-reveal-inner flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-20">
            {/* Magnetic Primary Email Pill */}
            <a
              ref={emailPillRef}
              href={`mailto:${siteConfig.contact.email}`}
              onMouseMove={(e) => handleMagneticMove(e, emailPillRef)}
              onMouseLeave={() => handleMagneticLeave(emailPillRef)}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="group/btn relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-white text-black hover:bg-amber-300 font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-xl shadow-white/10 active:scale-95 cursor-pointer overflow-hidden"
            >
              <Mail className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              <span className="relative z-10 flex flex-col overflow-hidden h-[1.2em]">
                <span className="transition-transform duration-300 group-hover/btn:-translate-y-full">
                  {siteConfig.contact.email}
                </span>
                <span className="absolute top-full transition-transform duration-300 group-hover/btn:-translate-y-full font-bold">
                  {siteConfig.contact.email}
                </span>
              </span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            {/* Magnetic Copy Address Pill */}
            <button
              ref={copyPillRef}
              onClick={handleCopyEmail}
              onMouseMove={(e) => handleMagneticMove(e, copyPillRef)}
              onMouseLeave={() => handleMagneticLeave(copyPillRef)}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-white/20 hover:border-amber-400 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-200 hover:text-white font-mono text-xs transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-medium">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL DIRECT BRIEF TRANSMISSION FORM               */}
        {/* ========================================================= */}
        <div
          ref={formRef}
          className="w-full max-w-2xl mx-auto pt-14 border-t border-white/[0.08] text-left"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              PROJECT BRIEF &amp; DIRECT INQUIRY
            </span>
            <h3 className="font-bodoni font-medium text-2xl sm:text-3xl text-white tracking-tight">
              Tell me about your project vision.
            </h3>
          </div>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bodoni font-medium text-2xl text-white">
                Transmission Dispatched Successfully
              </h4>
              <p className="font-sans text-sm text-neutral-400 max-w-md">
                Thank you for reaching out. Gourab will review your brief and follow up with you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: "", email: "", budget: "", message: "" });
                }}
                className="mt-2 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
              >
                Transmit another brief &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Interactive Scope Selection Chips */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  SELECT PROJECT SCOPE
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {projectScopes.map((scope) => {
                    const isSelected = selectedScope === scope;
                    return (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => {
                          setSelectedScope(scope);
                          playClick();
                        }}
                        onMouseEnter={() => playHover()}
                        className={`text-left px-4 py-3 rounded-xl border text-xs font-mono transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                            : "border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name Field */}
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

                {/* Email Field */}
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

              {/* Message / Brief */}
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
                  placeholder="Describe your vision, target launch timeframe, and goals..."
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors resize-none font-sans rounded-none"
                />
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                  focusedField === "message" ? "scale-x-100" : "scale-x-0"
                }`} />
              </div>

              {/* Submit Button & Response Time */}
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black hover:bg-amber-300 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 shadow-lg"
                >
                  <span>{isSubmitting ? "Transmitting..." : "Send Transmission"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL BRAND NETWORKS (Frosted Discs)                  */}
        {/* ========================================================= */}
        <div className="w-full pt-16 mt-16 border-t border-white/[0.08] flex flex-col items-center gap-10">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {siteConfig.socials.map((soc) => {
              const socialIcons: Record<string, React.ReactNode> = {
                GitHub: (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                ),
                LinkedIn: (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                ),
                "X (Twitter)": (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                ReadCV: (
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
                Awwwards: (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.31 9.28l1.45-3.6h-2.18l-.89 2.52-.94-2.52h-2.22l1.49 3.6-1.57 3.86h2.22l.98-2.73.94 2.73h2.18zm-7.65 0l1.45-3.6H9.93l-.89 2.52-.94-2.52H5.88l1.49 3.6-1.57 3.86h2.22l.98-2.73.94 2.73h2.18z" />
                  </svg>
                ),
              };

              const icon = socialIcons[soc.name] || <ArrowUpRight className="w-4 h-4" />;

              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.1] hover:border-amber-400 text-neutral-300 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-95 cursor-pointer"
                  aria-label={soc.name}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </span>

                  {/* Floating Tooltip */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#121217] border border-white/10 text-[11px] font-sans font-medium text-neutral-200 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shadow-xl z-20">
                    {soc.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Giant Ambient Monogram Watermark */}
          <div className="w-full text-center overflow-hidden select-none pointer-events-none opacity-[0.04] -my-6">
            <span className="font-bodoni italic font-bold text-[18vw] leading-none tracking-tighter text-white block">
              Gourab.
            </span>
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

