"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email || "gourabs444@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Work", id: "work" },
    { label: "About", id: "about" },
    { label: "Reel", id: "showreel" },
    { label: "Pipeline", id: "pipeline" },
    { label: "Experience", id: "experience" },
    { label: "Reviews", id: "testimonials" },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#040407] text-[#F4F4F6] border-t border-white/[0.08] select-none pt-20 sm:pt-28 pb-10 sm:pb-12 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.05)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-14 sm:gap-18 relative z-10">
        {/* ========================================================= */}
        {/* 1. CLEAN HERO INVITATION & DIRECT ACTION                  */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="flex flex-col gap-4 max-w-xl">
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Available for Select Projects &bull; 2026</span>
            </div>

            {/* Editorial Bodoni Headline */}
            <h2 className="font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
              Let&apos;s build something <br />
              <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                extraordinary together.
              </span>
            </h2>
          </div>

          {/* Email Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${siteConfig.contact.email || "gourabs444@gmail.com"}`}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black hover:bg-amber-300 font-sans font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-black" />
              <span>{siteConfig.contact.email || "gourabs444@gmail.com"}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white font-mono text-xs tracking-wider transition-all duration-300 hover:bg-white/[0.06] active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MINIMAL 3-COLUMN PORTFOLIO MATRIX                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Identity & Live Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                {siteConfig.name}<span className="text-amber-400">.</span>
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              {siteConfig.title} &mdash; Crafting high-performance digital experiences, WebGL graphics, and intelligent systems.
            </p>

            {/* Location & Time Indicator */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-neutral-300">INDIA // GLOBAL REMOTE</span>
              </div>
              {timeString && (
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>{timeString} IST</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              // NAVIGATION
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-[13px] font-mono text-neutral-400">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Network Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              // CONNECT &amp; SOCIALS
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {siteConfig.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-400/40 text-neutral-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>{soc.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. CLEAN BOTTOM COLOPHON BAR                              */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

