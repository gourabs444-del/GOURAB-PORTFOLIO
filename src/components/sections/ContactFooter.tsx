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
      {/* 3D Lavender Ripple Sphere Artwork Background Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen scale-105 filter brightness-110 saturate-125"
          style={{ backgroundImage: `url('/assets/thank-you-ripple.jpg')` }}
        />
        {/* Cinematic dark gradients to preserve perfect readability of footer text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-[#050508]/60 to-[#050508]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_75%)]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* ========================================================= */}
        {/* CLEAN 3-COLUMN FOOTER LAYOUT                             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Identity & Bio (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-2 text-white shadow-sm hover:border-purple-400/40 hover:bg-white/[0.08] transition-all duration-300">
                <svg
                  viewBox="315 85 394 450"
                  className="w-full h-full text-white fill-current stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="22"/>
                  <polygon points="512,197 483,243.5 550,368 604,368" strokeWidth="6" strokeLinejoin="round"/>
                  <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" strokeWidth="6" strokeLinejoin="round"/>
                  <path fillRule="evenodd" d="M 341.00 524.00 L 343.04 520.00 L 352.33 520.00 L 361.62 520.00 L 363.38 524.00 C 365.01 527.69, 365.45 528.00, 369.07 528.00 C 371.23 528.00, 373.00 527.79, 373.00 527.54 C 373.00 527.29, 369.33 519.41, 364.85 510.04 L 356.69 493.00 L 352.58 493.00 L 348.46 493.00 L 342.04 505.75 C 338.51 512.76, 334.61 520.64, 333.36 523.25 L 331.09 528.00 L 335.03 528.00 C 338.61 528.00, 339.14 527.64, 341.00 524.00 Z M 427.00 524.50 L 427.00 521.00 L 417.50 521.00 L 408.00 521.00 L 408.00 507.00 L 408.00 493.00 L 404.50 493.00 L 401.00 493.00 L 401.00 510.50 L 401.00 528.00 L 414.00 528.00 L 427.00 528.00 L 427.00 524.50 Z M 485.04 525.75 L 489.50 523.50 L 489.79 515.75 L 490.08 508.00 L 482.04 508.00 L 474.00 508.00 L 474.00 511.00 C 474.00 513.89, 474.17 514.00, 478.50 514.00 C 482.82 514.00, 483.00 514.12, 483.00 516.96 C 483.00 519.53, 482.49 520.07, 479.10 521.09 C 474.20 522.55, 468.80 521.59, 465.38 518.65 C 463.35 516.90, 462.63 515.19, 462.24 511.18 C 461.77 506.21, 461.91 505.82, 465.44 502.49 C 468.53 499.57, 469.88 499.00, 473.62 499.00 C 476.08 499.00, 479.49 499.72, 481.18 500.59 C 484.15 502.13, 484.36 502.10, 486.72 499.73 L 489.18 497.27 L 485.56 495.04 C 483.37 493.68, 479.62 492.59, 476.01 492.27 C 470.94 491.81, 469.28 492.12, 464.59 494.41 C 457.21 498.02, 454.51 502.36, 454.51 510.66 C 454.50 516.03, 454.89 517.30, 457.57 520.66 C 461.91 526.08, 466.20 528.00, 474.04 528.00 C 478.83 528.00, 481.77 527.40, 485.04 525.75 Z M 548.75 526.46 C 555.97 523.44, 559.29 518.42, 559.29 510.50 C 559.29 499.59, 550.97 492.02, 538.95 492.01 C 533.99 492.00, 525.49 496.47, 523.12 500.32 C 517.49 509.49, 520.82 521.70, 530.22 526.34 C 534.40 528.40, 543.95 528.46, 548.75 526.46 Z M 597.00 522.00 L 597.00 516.00 L 601.00 516.00 C 604.71 516.00, 605.35 516.44, 609.66 522.00 C 613.92 527.48, 614.65 528.00, 618.16 528.00 C 620.27 528.00, 622.00 527.69, 622.00 527.31 C 622.00 526.93, 619.95 524.01, 617.43 520.81 C 614.92 517.62, 613.31 515.00, 613.86 515.00 C 614.40 515.00, 616.23 513.62, 617.92 511.92 C 620.45 509.39, 621.00 508.04, 621.00 504.32 C 621.00 500.51, 620.46 499.26, 617.60 496.40 L 614.20 493.00 L 602.10 493.00 L 590.00 493.00 L 590.00 510.50 L 590.00 528.00 L 593.50 528.00 L 597.00 528.00 L 597.00 522.00 Z M 659.00 524.00 L 661.04 520.00 L 670.00 520.00 L 678.96 520.00 L 681.00 524.00 C 682.88 527.68, 683.37 528.00, 687.10 528.00 C 689.34 528.00, 691.02 527.60, 690.83 527.12 C 690.65 526.64, 686.90 518.77, 682.50 509.63 L 674.50 493.01 L 670.32 493.01 L 666.14 493.00 L 658.07 509.42 C 653.63 518.45, 650.00 526.33, 650.00 526.92 C 650.00 527.51, 651.57 528.00, 653.48 528.00 C 656.53 528.00, 657.21 527.51, 659.00 524.00 Z M 534.01 520.25 C 529.88 518.17, 528.03 514.92, 528.01 509.65 C 527.99 504.03, 533.16 499.00, 538.95 499.00 C 544.56 499.00, 548.86 501.42, 550.58 505.53 C 552.41 509.91, 552.37 511.42, 550.33 515.72 C 547.56 521.56, 540.52 523.51, 534.01 520.25 Z M 348.02 509.97 C 349.15 507.75, 350.55 504.71, 351.12 503.22 L 352.17 500.50 L 354.46 505.00 C 358.99 513.93, 358.97 514.00, 352.05 514.00 L 345.96 514.00 L 348.02 509.97 Z M 664.70 512.33 C 665.06 511.41, 666.46 508.38, 667.82 505.58 L 670.29 500.50 L 673.07 506.50 C 674.60 509.80, 675.88 512.84, 675.92 513.25 C 675.97 513.66, 673.31 514.00, 670.03 514.00 C 664.87 514.00, 664.15 513.77, 664.70 512.33 Z M 597.00 504.50 L 597.00 499.00 L 603.07 499.00 C 610.98 499.00, 613.00 500.12, 613.00 504.50 C 613.00 508.88, 610.98 510.00, 603.07 510.00 L 597.00 510.00 L 597.00 522.00 Z" stroke="none"/>
                </svg>
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
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 text-neutral-400 opacity-80 flex items-center justify-center">
              <svg
                viewBox="315 85 394 450"
                className="w-full h-full fill-current stroke-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="22"/>
                <polygon points="512,197 483,243.5 550,368 604,368" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" strokeWidth="6" strokeLinejoin="round"/>
                <path fillRule="evenodd" d="M 341.00 524.00 L 343.04 520.00 L 352.33 520.00 L 361.62 520.00 L 363.38 524.00 C 365.01 527.69, 365.45 528.00, 369.07 528.00 C 371.23 528.00, 373.00 527.79, 373.00 527.54 C 373.00 527.29, 369.33 519.41, 364.85 510.04 L 356.69 493.00 L 352.58 493.00 L 348.46 493.00 L 342.04 505.75 C 338.51 512.76, 334.61 520.64, 333.36 523.25 L 331.09 528.00 L 335.03 528.00 C 338.61 528.00, 339.14 527.64, 341.00 524.00 Z M 427.00 524.50 L 427.00 521.00 L 417.50 521.00 L 408.00 521.00 L 408.00 507.00 L 408.00 493.00 L 404.50 493.00 L 401.00 493.00 L 401.00 510.50 L 401.00 528.00 L 414.00 528.00 L 427.00 528.00 L 427.00 524.50 Z M 485.04 525.75 L 489.50 523.50 L 489.79 515.75 L 490.08 508.00 L 482.04 508.00 L 474.00 508.00 L 474.00 511.00 C 474.00 513.89, 474.17 514.00, 478.50 514.00 C 482.82 514.00, 483.00 514.12, 483.00 516.96 C 483.00 519.53, 482.49 520.07, 479.10 521.09 C 474.20 522.55, 468.80 521.59, 465.38 518.65 C 463.35 516.90, 462.63 515.19, 462.24 511.18 C 461.77 506.21, 461.91 505.82, 465.44 502.49 C 468.53 499.57, 469.88 499.00, 473.62 499.00 C 476.08 499.00, 479.49 499.72, 481.18 500.59 C 484.15 502.13, 484.36 502.10, 486.72 499.73 L 489.18 497.27 L 485.56 495.04 C 483.37 493.68, 479.62 492.59, 476.01 492.27 C 470.94 491.81, 469.28 492.12, 464.59 494.41 C 457.21 498.02, 454.51 502.36, 454.51 510.66 C 454.50 516.03, 454.89 517.30, 457.57 520.66 C 461.91 526.08, 466.20 528.00, 474.04 528.00 C 478.83 528.00, 481.77 527.40, 485.04 525.75 Z M 548.75 526.46 C 555.97 523.44, 559.29 518.42, 559.29 510.50 C 559.29 499.59, 550.97 492.02, 538.95 492.01 C 533.99 492.00, 525.49 496.47, 523.12 500.32 C 517.49 509.49, 520.82 521.70, 530.22 526.34 C 534.40 528.40, 543.95 528.46, 548.75 526.46 Z M 597.00 522.00 L 597.00 516.00 L 601.00 516.00 C 604.71 516.00, 605.35 516.44, 609.66 522.00 C 613.92 527.48, 614.65 528.00, 618.16 528.00 C 620.27 528.00, 622.00 527.69, 622.00 527.31 C 622.00 526.93, 619.95 524.01, 617.43 520.81 C 614.92 517.62, 613.31 515.00, 613.86 515.00 C 614.40 515.00, 616.23 513.62, 617.92 511.92 C 620.45 509.39, 621.00 508.04, 621.00 504.32 C 621.00 500.51, 620.46 499.26, 617.60 496.40 L 614.20 493.00 L 602.10 493.00 L 590.00 493.00 L 590.00 510.50 L 590.00 528.00 L 593.50 528.00 L 597.00 528.00 L 597.00 522.00 Z M 659.00 524.00 L 661.04 520.00 L 670.00 520.00 L 678.96 520.00 L 681.00 524.00 C 682.88 527.68, 683.37 528.00, 687.10 528.00 C 689.34 528.00, 691.02 527.60, 690.83 527.12 C 690.65 526.64, 686.90 518.77, 682.50 509.63 L 674.50 493.01 L 670.32 493.01 L 666.14 493.00 L 658.07 509.42 C 653.63 518.45, 650.00 526.33, 650.00 526.92 C 650.00 527.51, 651.57 528.00, 653.48 528.00 C 656.53 528.00, 657.21 527.51, 659.00 524.00 Z M 534.01 520.25 C 529.88 518.17, 528.03 514.92, 528.01 509.65 C 527.99 504.03, 533.16 499.00, 538.95 499.00 C 544.56 499.00, 548.86 501.42, 550.58 505.53 C 552.41 509.91, 552.37 511.42, 550.33 515.72 C 547.56 521.56, 540.52 523.51, 534.01 520.25 Z M 348.02 509.97 C 349.15 507.75, 350.55 504.71, 351.12 503.22 L 352.17 500.50 L 354.46 505.00 C 358.99 513.93, 358.97 514.00, 352.05 514.00 L 345.96 514.00 L 348.02 509.97 Z M 664.70 512.33 C 665.06 511.41, 666.46 508.38, 667.82 505.58 L 670.29 500.50 L 673.07 506.50 C 674.60 509.80, 675.88 512.84, 675.92 513.25 C 675.97 513.66, 673.31 514.00, 670.03 514.00 C 664.87 514.00, 664.15 513.77, 664.70 512.33 Z M 597.00 504.50 L 597.00 499.00 L 603.07 499.00 C 610.98 499.00, 613.00 500.12, 613.00 504.50 C 613.00 508.88, 610.98 510.00, 603.07 510.00 L 597.00 510.00 L 597.00 522.00 Z" stroke="none"/>
              </svg>
            </div>
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>

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

