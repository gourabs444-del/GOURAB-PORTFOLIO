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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const lightAuraRef = useRef<HTMLDivElement | null>(null);
  const emailPillRef = useRef<HTMLAnchorElement | null>(null);
  const copyPillRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const { playClick, playHover } = useAudioFeedback();

  // 1. Interactive Cursor Spotlight / Light Follower
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

      // 3D Tilt on Headline
      if (headlineRef.current) {
        const hRect = headlineRef.current.getBoundingClientRect();
        const centerX = hRect.left + hRect.width / 2;
        const centerY = hRect.top + hRect.height / 2;
        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

        gsap.to(headlineRef.current, {
          rotateY: deltaX * 8,
          rotateX: -deltaY * 8,
          duration: 0.6,
          ease: "power1.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 2. Magnetic Pill Button Physics
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>, targetRef: React.RefObject<HTMLElement | null>) => {
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (targetRef: React.RefObject<HTMLElement | null>) => {
    const el = targetRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1.1, 0.4)" });
  };

  // 3. Scroll Trigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".kinetic-reveal"),
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
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
          particleCount: 90,
          spread: 75,
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
      className="relative w-full overflow-hidden bg-[#050507] text-[#F4F4F6] border-t border-white/[0.08] select-none"
    >
      {/* Dynamic Cursor Light Aura Follower */}
      <div
        ref={lightAuraRef}
        className="pointer-events-none absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.14)_0%,_rgba(168,85,247,0.06)_45%,_transparent_70%)] blur-[90px] opacity-75 will-change-transform z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 pt-20 sm:pt-28 md:pt-36 pb-16 flex flex-col items-center text-center">
        {/* ========================================================= */}
        {/* 1. INTERACTIVE HERO HEADLINE & INVITATION                  */}
        {/* ========================================================= */}
        <div ref={heroRef} className="flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Top Monospace Tag */}
          <div className="kinetic-reveal flex items-center justify-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-neutral-200">07 // COLLABORATION</span>
            <span className="text-neutral-600">/</span>
            <span>GET IN TOUCH</span>
          </div>

          {/* 3D Magnetic Parallax Headline */}
          <h2
            ref={headlineRef}
            className="kinetic-reveal font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white my-2 will-change-transform transition-all"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="block drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              Let&apos;s Build
            </span>
            <span className="inline-block bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent font-black drop-shadow-[0_0_35px_rgba(245,158,11,0.3)]">
              Something Worth
            </span>{" "}
            <span className="font-serif italic font-normal text-white relative inline-block group/rem">
              Remembering.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover/rem:scale-x-100 transition-transform duration-500 origin-center" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="kinetic-reveal font-sans text-sm sm:text-base md:text-lg text-neutral-300 font-normal max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
            Have an ambitious project or design vision? Available worldwide for bespoke web development, creative tech, and scalable full-stack applications.
          </p>

          {/* Direct Email Actions with Magnetic Physics & Rolling Text */}
          <div className="kinetic-reveal flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            {/* Magnetic Primary Email Pill */}
            <a
              ref={emailPillRef}
              href={`mailto:${siteConfig.contact.email}`}
              onMouseMove={(e) => handleMagneticMove(e, emailPillRef)}
              onMouseLeave={() => handleMagneticLeave(emailPillRef)}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="group/btn relative inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 rounded-full bg-white text-black hover:bg-amber-300 font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-xl shadow-white/10 active:scale-95 cursor-pointer overflow-hidden"
            >
              <Mail className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              <span className="relative z-10 flex flex-col overflow-hidden h-[1.2em]">
                <span className="transition-transform duration-300 group-hover/btn:-translate-y-full">
                  {siteConfig.contact.email}
                </span>
                <span className="absolute top-full transition-transform duration-300 group-hover/btn:-translate-y-full">
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
                    placeholder="e.g. Elena Rostova"
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
                    placeholder="e.g. elena@brand.com"
                    className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors font-sans rounded-none"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                    focusedField === "email" ? "scale-x-100" : "scale-x-0"
                  }`} />
                </div>
              </div>

              {/* Scope Selection */}
              <div className="flex flex-col gap-2 relative">
                <label className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                  focusedField === "scope" ? "text-amber-400 font-bold" : "text-neutral-400"
                }`}>
                  Scope of Work
                </label>
                <select
                  value={formState.scope}
                  onFocus={() => setFocusedField("scope")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, scope: e.target.value })}
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white text-sm focus:outline-none transition-colors font-sans rounded-none cursor-pointer"
                >
                  <option value="full-stack" className="bg-[#070709] text-white">Full-Stack Web Architecture &amp; App</option>
                  <option value="creative-tech" className="bg-[#070709] text-white">Creative Development / WebGL &amp; Motion</option>
                  <option value="design-dev" className="bg-[#070709] text-white">Complete Brand Design &amp; Development</option>
                  <option value="ai-systems" className="bg-[#070709] text-white">Generative AI &amp; Intelligent Workspaces</option>
                  <option value="other" className="bg-[#070709] text-white">Bespoke Advisory / Exploration</option>
                </select>
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                  focusedField === "scope" ? "scale-x-100" : "scale-x-0"
                }`} />
              </div>

              {/* Narrative Textarea */}
              <div className="flex flex-col gap-2 relative">
                <label className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                  focusedField === "message" ? "text-amber-400 font-bold" : "text-neutral-400"
                }`}>
                  Project Narrative
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your timeline, expectations, and vision..."
                  className="w-full py-3 bg-transparent border-b border-white/20 focus:border-amber-400 text-white placeholder-neutral-600 text-sm focus:outline-none transition-colors resize-none font-sans rounded-none"
                />
                <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 origin-left transition-transform duration-300 ${
                  focusedField === "message" ? "scale-x-100" : "scale-x-0"
                }`} />
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
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-amber-300 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 shadow-lg"
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





