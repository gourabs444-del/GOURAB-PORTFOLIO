"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function ContactFooter() {
  const showcaseLinks = [
    "All Projects",
    "Creative Work",
    "Personal Labs",
    "Collaborations",
    "Favorite Works",
    "Landing Pages",
  ];

  const caseStudiesLinks = [
    "Aesthetic Studio",
    "Mansour & Sons",
    "BloomFi Banking",
    "Lumina AI Studio",
    "JurisLexicon Dark",
    "Volvox Real Estate",
    "Vanya Safari Lodge",
  ];

  const servicesStackLinks = [
    "Editorial Web Design",
    "Full Stack Web Apps",
    "E-Commerce Engines",
    "120 FPS Motion Physics",
    "WebGL & 3D Systems",
    "Performance & SEO",
  ];

  const platformContactLinks = [
    { label: "Start a Project", isSpecial: true },
    { label: "Editorial Articles", isSpecial: false },
    { label: "Design Gallery", isSpecial: false },
    { label: "Author Profile", isSpecial: false },
    { label: "Inquiry & Discovery", isSpecial: false },
    { label: "gourabs444@gmail.com", isSpecial: false },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#040306] text-[#F4F4F6] border-t border-white/[0.08] select-none pt-24 pb-16 px-6 sm:px-12 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        {/* ========================================================= */}
        {/* 1. TOP HEADER: LOGO, BIO & START PROJECT BUTTON           */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-4">
          {/* Left: Brand Identity & Narrative */}
          <div className="flex flex-col gap-5 max-w-xl">
            {/* Logo Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white font-serif font-bold text-lg shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                G
              </div>
              <span className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                STUDIO
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="font-sans text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Curating the Web&apos;s finest digital craft, interactive 3D systems, and high-fidelity enterprise web applications. Designed &amp; engineered by Gourab.
            </p>
          </div>

          {/* Right: Start Project Pill Button */}
          <div className="self-start md:self-center">
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:border-white/30 text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 shadow-sm cursor-default">
              <span>START PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. 4-COLUMN LUXURY EDITORIAL DIRECTORY                    */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
          {/* Col 1: SHOWCASE */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              SHOWCASE
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm font-sans text-neutral-400 font-light">
              {showcaseLinks.map((item) => (
                <li
                  key={item}
                  className="hover:text-neutral-200 transition-colors py-0.5 cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: CASE STUDIES */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              CASE STUDIES
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm font-sans text-neutral-400 font-light">
              {caseStudiesLinks.map((item) => (
                <li
                  key={item}
                  className="hover:text-neutral-200 transition-colors py-0.5 cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: SERVICES & STACK */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              SERVICES &amp; STACK
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm font-sans text-neutral-400 font-light">
              {servicesStackLinks.map((item) => (
                <li
                  key={item}
                  className="hover:text-neutral-200 transition-colors py-0.5 cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: PLATFORM & CONTACT */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              PLATFORM &amp; CONTACT
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm font-sans text-neutral-400 font-light">
              {platformContactLinks.map((item) => (
                <li
                  key={item.label}
                  className={`hover:text-neutral-200 transition-colors py-0.5 cursor-default flex items-center gap-1.5 ${
                    item.isSpecial ? "text-amber-400 font-medium" : ""
                  }`}
                >
                  {item.isSpecial && <span className="text-amber-400 text-xs">✦</span>}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM BAR: COPYRIGHT & SOCIAL BRAND ICONS             */}
        {/* ========================================================= */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Copyright Notice */}
          <p className="font-mono text-xs text-neutral-500 tracking-tight text-center sm:text-left">
            &copy; 2026 GOURAB STUDIO. Crafted with precision by Gourab. All rights reserved.
          </p>

          {/* Right: Social Icons Row */}
          <div className="flex items-center gap-4 text-neutral-400">
            {/* GitHub */}
            <span
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:text-white hover:border-white/20 transition-all cursor-default"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </span>

            {/* LinkedIn */}
            <span
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:text-white hover:border-white/20 transition-all cursor-default"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </span>

            {/* Instagram */}
            <span
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:text-white hover:border-white/20 transition-all cursor-default"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </span>

            {/* X (Twitter) */}
            <span
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:text-white hover:border-white/20 transition-all cursor-default"
              aria-label="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>

            {/* Discord */}
            <span
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:text-white hover:border-white/20 transition-all cursor-default"
              aria-label="Discord"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </span>

            {/* Dribbble */}
            <span
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:text-white hover:border-white/20 transition-all cursor-default"
              aria-label="Dribbble"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.312c-.51-.1-2.58-.51-5.11-.21-.05-.12-.1-.24-.16-.36a22.25 22.25 0 0 0-1.28-2.59c2.81-1.09 4.39-2.01 4.62-2.152zm-6.19 1.72c.43.89.84 1.77 1.22 2.64-3.32.96-6.86.97-7.23.97-.04-.3-.06-.61-.06-.92 0-3.3 1.88-6.17 4.63-7.58.07.08 1.13 1.17 1.44 4.89zm-7.05 5.69c.5 0 3.51-.01 6.57-.86.41.74.8 1.49 1.14 2.24-4.22 1.33-5.83 4.29-5.96 4.54A8.528 8.528 0 0 1 3.5 12c0-.66.07-1.34.17-1.98h-.31zm8.01 7.15c.16-.3.94-1.8 4.25-3.05 1.12 3.01 1.57 5.56 1.63 5.92-1.52.88-3.29 1.38-5.18 1.38-.24 0-.47-.02-.7-.05zm6.84-2.43c-.09-.45-.59-2.85-1.63-5.65 2.17-.3 4.09.08 4.47.16a8.47 8.47 0 0 1-2.84 5.49z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
