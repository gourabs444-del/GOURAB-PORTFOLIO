"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
} from "lucide-react";

const getSocialIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("git")) {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (n.includes("link")) {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (n.includes("x") || n.includes("twitter")) {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (n.includes("insta")) {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (n.includes("mail") || n.includes("email")) {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
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
      className="relative w-full bg-[#dfdeda] text-[#121214] border-t border-neutral-300/80 select-none pt-12 sm:pt-16 pb-10 sm:pb-12 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden font-sans min-h-[580px] sm:min-h-[620px] flex flex-col justify-between"
    >
      {/* ========================================================= */}
      {/* AUTHENTIC TOPOGRAPHIC VECTOR CONTOUR BACKGROUND MAP       */}
      {/* ========================================================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 1440 760"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#1a1a1a" strokeWidth="0.85" strokeOpacity="0.32" strokeLinecap="round" strokeLinejoin="round">
            {/* Right Hill Peak Concentric Elevation Contour Rings */}
            <ellipse cx="1200" cy="410" rx="85" ry="46" />
            <ellipse cx="1200" cy="410" rx="130" ry="70" />
            <ellipse cx="1200" cy="410" rx="175" ry="94" strokeWidth="1.15" strokeOpacity="0.48" />
            <ellipse cx="1200" cy="410" rx="220" ry="118" />
            <ellipse cx="1200" cy="410" rx="268" ry="144" />
            <ellipse cx="1200" cy="410" rx="320" ry="172" strokeWidth="1.15" strokeOpacity="0.48" />
            <ellipse cx="1200" cy="410" rx="375" ry="202" />
            <ellipse cx="1200" cy="410" rx="435" ry="234" />
            <ellipse cx="1200" cy="410" rx="500" ry="270" strokeWidth="1.15" strokeOpacity="0.48" />
            <ellipse cx="1200" cy="410" rx="570" ry="308" />
            <ellipse cx="1200" cy="410" rx="645" ry="350" />
            <ellipse cx="1200" cy="410" rx="725" ry="395" strokeWidth="1.15" strokeOpacity="0.48" />
            <ellipse cx="1200" cy="410" rx="810" ry="445" />
            <ellipse cx="1200" cy="410" rx="900" ry="500" />
            <ellipse cx="1200" cy="410" rx="1000" ry="560" strokeWidth="1.15" strokeOpacity="0.48" />

            {/* Left Valley / Ridge Contour Rings */}
            <ellipse cx="270" cy="590" rx="60" ry="32" />
            <ellipse cx="270" cy="590" rx="100" ry="54" />
            <ellipse cx="270" cy="590" rx="145" ry="78" strokeWidth="1.15" strokeOpacity="0.48" />
            <ellipse cx="270" cy="590" rx="195" ry="105" />
            <ellipse cx="270" cy="590" rx="250" ry="135" />
            <ellipse cx="270" cy="590" rx="310" ry="168" strokeWidth="1.15" strokeOpacity="0.48" />

            {/* Flowing Organic Topographic Contour Wave Lines Across Canvas */}
            <path d="M-50,220 C180,220 370,210 510,260 C650,310 790,420 920,430 C1060,440 1250,290 1500,270" />
            <path d="M-50,245 C175,245 360,230 500,280 C640,325 780,435 910,445 C1050,455 1240,305 1500,285" />
            <path d="M-50,270 C170,270 350,250 490,300 C630,340 770,450 900,460 C1040,470 1230,320 1500,300" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M-50,295 C160,295 340,275 480,318 C620,355 760,465 890,475 C1030,485 1220,335 1500,315" />
            <path d="M-50,320 C150,320 330,300 470,338 C610,370 750,480 880,490 C1020,500 1210,350 1500,330" />
            <path d="M-50,345 C140,345 320,325 460,358 C600,385 740,495 870,505 C1010,515 1200,365 1500,345" />
            <path d="M-50,370 C130,370 310,350 450,378 C590,400 730,510 860,520 C1000,530 1190,380 1500,360" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M-50,395 C120,395 300,375 440,398 C580,415 720,525 850,535 C990,545 1180,395 1500,375" />
            <path d="M-50,420 C110,420 290,400 430,418 C570,430 710,540 840,550 C980,560 1170,410 1500,390" />
            <path d="M-50,445 C100,445 280,425 420,438 C560,445 700,555 830,565 C970,575 1160,425 1500,405" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M-50,470 C90,470 270,450 410,458 C550,460 690,570 820,580 C960,590 1150,440 1500,420" />
            <path d="M-50,495 C80,495 260,475 400,478 C540,475 680,585 810,595 C950,605 1140,455 1500,435" />
            <path d="M-50,520 C70,520 250,500 390,498 C530,490 670,600 800,610 C940,620 1130,470 1500,450" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M-50,545 C60,545 240,525 380,518 C520,505 660,615 790,625 C930,635 1120,485 1500,465" />
            <path d="M-50,570 C50,570 230,550 370,538 C510,520 650,630 780,640 C920,650 1110,500 1500,480" />
            <path d="M-50,595 C40,595 220,575 360,558 C500,535 640,645 770,655 C910,665 1100,515 1500,495" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M-50,620 C30,620 210,600 350,578 C490,550 630,660 760,670 C900,680 1090,530 1500,510" />
            <path d="M-50,645 C20,645 200,625 340,598 C480,565 620,675 750,685 C890,695 1080,545 1500,525" />
            <path d="M-50,670 C10,670 190,650 330,618 C470,580 610,690 740,700 C880,710 1070,560 1500,540" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M-50,695 C0,695 180,675 320,638 C460,595 600,705 730,715 C870,725 1060,575 1500,555" />
            <path d="M-50,720 C-10,720 170,700 310,658 C450,610 590,720 720,730 C860,740 1050,590 1500,570" strokeWidth="1.15" strokeOpacity="0.48" />

            {/* Saddle Valley Convergence Contours */}
            <path d="M590,460 C675,545 735,650 755,745" />
            <path d="M610,470 C690,555 745,660 765,745" />
            <path d="M630,480 C705,565 755,670 775,745" strokeWidth="1.15" strokeOpacity="0.48" />
            <path d="M650,490 C720,575 765,680 785,745" />
            <path d="M670,500 C735,585 775,690 795,745" />
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 1. TOP MINIMALIST NAVIGATION BAR (MATCHING REFERENCE)     */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full flex items-center justify-between pb-6 sm:pb-8">
        {/* Top-Left Tag */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-widest text-neutral-900 uppercase">
          <span>-TOPO</span>
          <span className="text-neutral-400 font-normal">/</span>
          <span className="text-neutral-600 font-medium text-[11px] sm:text-xs">CREATIVE_ENGINEERING</span>
        </div>

        {/* Top-Right Spaced Minimal Navigation Links */}
        <nav className="flex items-center gap-5 sm:gap-8 md:gap-10 text-xs sm:text-sm font-medium text-neutral-800 font-sans tracking-tight">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-neutral-950 hover:underline underline-offset-4 transition-all duration-200 cursor-pointer lowercase"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN EDITORIAL CONTENT (LEFT-ALIGNED MATCHING IMAGE)    */}
      {/* ========================================================= */}
      <div className="relative z-10 my-auto py-8 sm:py-12 max-w-2xl">
        {/* Bold Abstract Vector Headline */}
        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-neutral-950 tracking-[-0.03em] leading-[1.05] uppercase mb-4">
          ABSTRACT VECTOR <br />
          DESIGNS
        </h2>

        {/* Editorial Sub-headline */}
        <p className="font-sans text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed max-w-md mb-8">
          Designing and engineering high-impact digital experiences, bespoke WebGL interfaces, and scalable creative systems.
        </p>

        {/* Outlined Action Box (Matching `[ Read More ]` in Image) */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:gourabs444@gmail.com"
            className="inline-flex items-center justify-center px-6 py-2.5 border border-neutral-900 bg-transparent text-neutral-950 font-sans text-xs sm:text-sm font-semibold tracking-tight hover:bg-neutral-950 hover:text-white transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
          >
            <span>Read More</span>
          </a>

          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("work");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-neutral-800 hover:text-neutral-950 font-sans text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 cursor-pointer"
          >
            <span>Explore Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM UTILITY & SOCIAL BAR                           */}
      {/* ========================================================= */}
      <div className="relative z-10 pt-6 sm:pt-8 border-t border-neutral-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
        {/* Bottom Left Minimal Stamp */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-neutral-900 tracking-wider uppercase">
            ME-COLLAGE // {siteConfig.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-neutral-400">&bull;</span>
          <span className="hidden sm:inline text-[11px] text-neutral-600">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Bottom Center Social Links */}
        <div className="flex items-center gap-4">
          {siteConfig.socials.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-neutral-950 transition-colors p-1"
              aria-label={soc.name}
              title={soc.name}
            >
              {getSocialIcon(soc.name)}
            </a>
          ))}
        </div>

        {/* Bottom Right Back to Top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-950 transition-colors duration-200 cursor-pointer font-sans text-xs font-medium"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-950 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}

