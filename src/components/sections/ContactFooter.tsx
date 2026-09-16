"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Sparkles,
} from "lucide-react";

const getSocialIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("git")) {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (n.includes("link")) {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (n.includes("x") || n.includes("twitter")) {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (n.includes("insta")) {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (n.includes("mail") || n.includes("email")) {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    );
  }
  return null;
};

export function ContactFooter() {
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
    { label: "Selected Works", id: "work" },
    { label: "About Me", id: "about" },
    { label: "Showreel", id: "showreel" },
    { label: "Process Pipeline", id: "pipeline" },
    { label: "Experience", id: "experience" },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#050508] text-[#F4F4F6] border-t border-white/[0.08] select-none pt-16 sm:pt-24 pb-10 sm:pb-12 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden font-sans"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.06)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* ========================================================= */}
        {/* CLEAN 3-COLUMN FOOTER LAYOUT                             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Identity & Bio (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center text-white border border-white/10 shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg tracking-tight text-white leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-neutral-400 font-normal mt-1">
                  Creative Developer &amp; Motion Director
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
              Designing and engineering high-impact digital experiences, bespoke WebGL interfaces, and scalable creative systems.
            </p>

            {/* Location Indicator */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-400 pt-2">
              <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-neutral-300">India &bull; Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-sans">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-normal text-neutral-400 font-sans">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Icons in a Single Clean Line (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-sans">
              Connect
            </h4>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {siteConfig.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  title={soc.name}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  {getSocialIcon(soc.name)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CLEAN BOTTOM COPYRIGHT BAR                                */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-neutral-500 font-sans">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

