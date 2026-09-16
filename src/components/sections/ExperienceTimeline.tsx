"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Code2, Palette, Film } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const devRef = useRef<HTMLDivElement | null>(null);
  const designRef = useRef<HTMLDivElement | null>(null);
  const creativeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".skill-reveal"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
            },
          }
        );
      }

      // Skill items reveal and progress bar fill
      const sections = [devRef.current, designRef.current, creativeRef.current];
      sections.forEach((sec) => {
        if (!sec) return;
        const items = sec.querySelectorAll(".skill-item-row");
        const fills = sec.querySelectorAll(".skill-bar-fill");

        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          fills,
          { width: "0%" },
          {
            width: (i, target) => target.getAttribute("data-level") || "80%",
            duration: 1.1,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 1. Engineering & Full-Stack Skills (3 Columns)
  const devSkills = [
    {
      name: "React",
      role: "Frontend & Architecture",
      level: "96%",
      barColor: "from-[#087ea4] to-[#00d8ff]",
      icon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#087EA4" />
          <g stroke="#087EA4" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: "TypeScript",
      role: "Strict Type Systems",
      level: "92%",
      barColor: "from-[#3178c6] to-[#4f95e6]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="128" height="128" rx="16" fill="#3178C6" />
          <path
            d="M72.2 46.4h37.7v10.9H94.7v50.4H83V57.3H72.2V46.4zm-19.1 27.6c0-4.3-1.6-7.3-4.8-9.1-3.2-1.8-8.1-3.2-14.7-4.2-4.5-.7-7.7-1.8-9.6-3.3-1.9-1.5-2.8-3.6-2.8-6.3 0-3.1 1.3-5.5 3.9-7.2 2.6-1.7 6.3-2.6 11.1-2.6 4.9 0 8.7.9 11.4 2.8 2.7 1.9 4.1 4.5 4.2 7.8l.1.5h10.9c-.1-5.9-2.5-10.7-7.2-14.4-4.7-3.7-11.2-5.5-19.4-5.5-8.4 0-14.9 1.9-19.5 5.6C12 52.1 9.7 57 9.7 63.3c0 4.1 1.4 7.2 4.2 9.3 2.8 2.1 7.2 3.6 13.2 4.6 5.5.9 9.3 2.1 11.4 3.6 2.1 1.5 3.1 3.7 3.1 6.6 0 3.3-1.4 5.9-4.2 7.7-2.8 1.8-6.9 2.7-12.3 2.7-5.5 0-9.8-1.1-12.9-3.3-3.1-2.2-4.7-5.3-4.9-9.3l-.1-.5H6.2c.2 6.6 2.8 11.9 7.8 15.9 5 4 11.7 6 20.1 6 8.7 0 15.4-1.9 20.1-5.7 4.7-3.8 7-9 7-15.6z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      role: "ESNext & Performance",
      level: "98%",
      barColor: "from-[#f7df1e] to-[#eab308]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="128" height="128" rx="16" fill="#F7DF1E" />
          <path
            d="M67 101.4c0-5.7 1.5-10.4 4.5-14.1 3-3.7 7.2-6 12.6-6.9 4-.7 7.7-.3 11 .1v12.2c-2.8-.8-5.7-1.2-8.7-1.2-2.9 0-5.2.7-6.9 2.1-1.7 1.4-2.5 3.4-2.5 6 0 2.2.7 4 2.1 5.4 1.4 1.4 3.7 2.6 6.9 3.6 4.7 1.5 8.3 3.3 10.8 5.4 2.5 2.1 3.7 5.2 3.7 9.3 0 4.6-1.6 8.5-4.8 11.7-3.2 3.2-7.8 4.8-13.8 4.8-5.3 0-10.2-1.3-14.7-3.9v-13.5c4.1 3.2 8.6 4.8 13.5 4.8 2.6 0 4.7-.6 6.3-1.8 1.6-1.2 2.4-2.8 2.4-4.8 0-2.3-.8-4.2-2.4-5.7-1.6-1.5-4.1-2.8-7.5-3.9-4.8-1.6-8.3-3.4-10.5-5.4-2.2-2-3.3-4.9-3.3-8.8zm-41-1.2h14.8v37.4c0 6.6-1.8 11.6-5.4 15-3.6 3.4-8.7 5.1-15.3 5.1-3.6 0-7.3-.6-11.1-1.8v-12.8c2.9 1.4 5.9 2.1 9 2.1 2.9 0 5-.7 6.3-2.1 1.3-1.4 2-3.7 2-6.9V100.2z"
            fill="#000000"
            transform="translate(10,-14) scale(0.85)"
          />
        </svg>
      ),
    },
    {
      name: "Next.js",
      role: "App Router & SSR",
      level: "94%",
      barColor: "from-neutral-900 to-neutral-700",
      icon: (
        <svg viewBox="0 0 180 180" className="w-5 h-5 fill-neutral-900">
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path
            d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.141 149.508 157.438Z"
            fill="#ffffff"
          />
          <rect fill="#ffffff" height="72" width="12" x="115" y="54" />
        </svg>
      ),
    },
    {
      name: "WebGL / Three.js",
      role: "3D Shaders & Canvas",
      level: "88%",
      barColor: "from-emerald-500 to-teal-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-neutral-900"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      role: "Responsive Design Systems",
      level: "98%",
      barColor: "from-[#38bdf8] to-[#0284c7]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#38BDF8]" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      role: "Server Microservices",
      level: "90%",
      barColor: "from-[#539e43] to-[#388e3c]",
      icon: (
        <svg viewBox="0 0 32 32" className="w-5 h-5 fill-[#539E43]">
          <path d="M16 2.5L2.8 10.1v15.2L16 32.9l13.2-7.6V10.1L16 2.5zm0 3.2l10.4 6-4.5 2.6-10.4-6 4.5-2.6zm-1.6 8.9v10.9L5.4 20.3v-8.2l9 5.2zm3.2 0l9-5.2v8.2l-9 5.2V14.6z" />
        </svg>
      ),
    },
    {
      name: "Python & AI",
      role: "Automation & LLM Pipelines",
      level: "92%",
      barColor: "from-[#387eb8] to-[#ffe052]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5">
          <path
            d="M63.2 2.2c-15.6 0-24.8 6.9-24.8 18.2v13.5h25.4v3.6H25.4C11.3 37.5 0 47.9 0 65.4c0 17.6 11 27.5 24.3 27.5h8.3v-12.8c0-10.3 8.7-18.7 18.9-18.7h25.5c8.3 0 15.1-6.8 15.1-15.1V20.4c0-11.3-9.2-18.2-28.9-18.2zm-9.7 10.7c3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6z"
            fill="#387EB8"
          />
          <path
            d="M64.8 125.8c15.6 0 24.8-6.9 24.8-18.2V94.1H64.2v-3.6h38.4c14.1 0 25.4-10.4 25.4-27.9 0-17.6-11-27.5-24.3-27.5h-8.3v12.8c0 10.3-8.7 18.7-18.9 18.7H55.9c-8.3 0-15.1 6.8-15.1 15.1v25.9c0 11.3 9.2 18.2 28.9 18.2zm9.7-10.7c-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6 3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6z"
            fill="#FFE052"
          />
        </svg>
      ),
    },
    {
      name: "Git & DevOps",
      role: "CI/CD & Version Control",
      level: "95%",
      barColor: "from-[#f05032] to-[#ea580c]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F05032]" fill="currentColor">
          <path d="M2.6 10.59L10.6 2.6a2 2 0 0 1 2.82 0l7.98 7.99a2 2 0 0 1 0 2.82l-7.98 8a2 2 0 0 1-2.82 0L2.6 13.41a2 2 0 0 1 0-2.82zm8.71 4.12v-2.07a1.5 1.5 0 0 1-1-1.42 1.5 1.5 0 0 1 .44-1.06l1.9-1.9a1.5 1.5 0 1 1 1.06 1.06l-1.84 1.84a1.5 1.5 0 0 1-.56.98v1.57a1.5 1.5 0 1 1-1.06 0z" />
        </svg>
      ),
    },
  ];

  // 2. Design & Motion Skills (3 Columns)
  const designSkills = [
    {
      name: "Figma",
      role: "Design Systems & UI/UX",
      level: "96%",
      barColor: "from-[#a259ff] via-[#f24e1e] to-[#0acf83]",
      icon: (
        <svg viewBox="0 0 38 57" className="w-5 h-5">
          <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1abcfe" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19z" fill="#ff7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
        </svg>
      ),
    },
    {
      name: "GSAP Motion",
      role: "ScrollTrigger & Timelines",
      level: "98%",
      barColor: "from-[#88ce02] to-[#65a30d]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <circle cx="50" cy="50" r="46" fill="#88CE02" />
          <path d="M30 45 C35 32, 65 32, 70 45 C65 58, 35 58, 30 45 Z" fill="#0E100F" />
          <circle cx="50" cy="45" r="7" fill="#88CE02" />
          <path d="M36 68 Q50 78 64 68" stroke="#0E100F" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      name: "UI / UX Architecture",
      role: "Human-Centered Flows",
      level: "94%",
      barColor: "from-purple-500 to-indigo-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      name: "Kinetic Prototyping",
      role: "Micro-Interactions",
      level: "92%",
      barColor: "from-pink-500 to-rose-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
    {
      name: "Spatial 3D & Blender",
      role: "Lighting & Materials",
      level: "86%",
      barColor: "from-[#ea7600] to-[#225780]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12.5 2a4.5 4.5 0 0 0-4.48 4.13L3.1 8.7a1.25 1.25 0 0 0 .9 2.16h.37l3.65-.95a4.5 4.5 0 1 0 4.48-7.91zm0 2.5a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm-6.17 6.37l-2.07.54 3.03-1.46c-.34.3-.67.61-.96.92z" fill="#EA7600"/>
          <circle cx="12.5" cy="14.5" r="3.5" fill="#225780"/>
          <circle cx="12.5" cy="14.5" r="1.5" fill="#FFFFFF"/>
        </svg>
      ),
    },
    {
      name: "Visual Art Direction",
      role: "Typography & Layouts",
      level: "95%",
      barColor: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20" />
        </svg>
      ),
    },
  ];

  // 3. Creative Post-Production Suite (3 Columns)
  const creativeSkills = [
    {
      name: "DaVinci Resolve",
      role: "Color Science & ACES LUTs",
      level: "96%",
      barColor: "from-rose-500 via-sky-500 to-amber-500",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 rounded-full overflow-hidden">
          <circle cx="50" cy="50" r="48" fill="#111118" />
          <path d="M50 14 C62 30, 70 42, 50 50 C30 42, 38 30, 50 14 Z" fill="#FF3B30" />
          <path d="M82 70 C66 66, 56 58, 50 50 C60 42, 76 50, 82 70 Z" fill="#007AFF" />
          <path d="M18 70 C24 50, 40 42, 50 50 C44 58, 34 66, 18 70 Z" fill="#FFCC00" />
        </svg>
      ),
    },
    {
      name: "Adobe Premiere Pro",
      role: "Video Editing & Film Pacing",
      level: "95%",
      barColor: "from-[#9999ff] to-[#7979ff]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="100" height="100" rx="16" fill="#00005B" />
          <text x="50" y="65" fill="#9999FF" fontSize="42" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            Pr
          </text>
        </svg>
      ),
    },
    {
      name: "Adobe After Effects",
      role: "Motion Graphics & Visual VFX",
      level: "92%",
      barColor: "from-[#d291ff] to-[#b359ff]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="100" height="100" rx="16" fill="#2D004D" />
          <text x="50" y="65" fill="#D291FF" fontSize="42" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            Ae
          </text>
        </svg>
      ),
    },
    {
      name: "Adobe Lightroom",
      role: "Editorial Color Grading",
      level: "90%",
      barColor: "from-[#31a8ff] to-[#0084e6]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="100" height="100" rx="16" fill="#001E36" />
          <text x="50" y="65" fill="#31A8FF" fontSize="42" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            Lr
          </text>
        </svg>
      ),
    },
    {
      name: "Cinematic Sound Design",
      role: "Foley & Sub-bass Impact",
      level: "88%",
      barColor: "from-violet-500 to-purple-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Video Encoding & HLS",
      role: "Adaptive Bitrate & Codecs",
      level: "94%",
      barColor: "from-cyan-500 to-blue-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-36 px-6 sm:px-12 md:px-16 lg:px-24 bg-white text-neutral-900 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16 sm:gap-20 relative z-10">
        {/* ========================================================= */}
        {/* HEADER: CLEAN EDITORIAL SKILLS TITLE                      */}
        {/* ========================================================= */}
        <div ref={headerRef} className="flex flex-col gap-3 text-left sm:text-center items-start sm:items-center">
          <div className="skill-reveal inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            <span>04 // CORE COMPETENCIES &amp; TECH STACK</span>
          </div>

          <h2 className="skill-reveal font-display font-black text-4xl sm:text-6xl md:text-7xl text-neutral-950 tracking-tight uppercase">
            SKILLS
          </h2>

          <p className="skill-reveal font-sans text-xs sm:text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed font-normal">
            Specialized competencies spanning high-performance fullstack engineering, human-centered UI/UX systems, and cinematic post-production toolkits.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. ENGINEERING & FULL-STACK (3 COLUMNS GRID)              */}
        {/* ========================================================= */}
        <div ref={devRef} className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-neutral-200/80 pb-3">
            <div className="w-7 h-7 flex items-center justify-center text-neutral-800">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
                Development &amp; Architecture
              </h3>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                Full-Stack Architecture &bull; WebGL &bull; Distributed Systems
              </span>
            </div>
          </div>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 sm:gap-y-5">
            {devSkills.map((s) => (
              <div
                key={s.name}
                className="skill-item-row group flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 hover:bg-neutral-50"
              >
                {/* Left: Original Small Software Logo + Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-bold text-sm text-neutral-900 tracking-tight truncate">
                      {s.name}
                    </span>
                    <span className="text-[10.5px] font-mono text-neutral-400 truncate">
                      {s.role}
                    </span>
                  </div>
                </div>

                {/* Right: Clean Level Bar + Percentage */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-16 sm:w-20 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      data-level={s.level}
                      className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${s.barColor}`}
                      style={{ width: s.level }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-700 w-7 text-right">
                    {s.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DESIGN & MOTION SYSTEMS (3 COLUMNS GRID)               */}
        {/* ========================================================= */}
        <div ref={designRef} className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-neutral-200/80 pb-3">
            <div className="w-7 h-7 flex items-center justify-center text-neutral-800">
              <Palette className="w-4 h-4" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
                Design &amp; Motion
              </h3>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                Product Design &bull; Motion Physics &bull; Systems
              </span>
            </div>
          </div>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 sm:gap-y-5">
            {designSkills.map((s) => (
              <div
                key={s.name}
                className="skill-item-row group flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 hover:bg-neutral-50"
              >
                {/* Left: Original Small Software Logo + Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-bold text-sm text-neutral-900 tracking-tight truncate">
                      {s.name}
                    </span>
                    <span className="text-[10.5px] font-mono text-neutral-400 truncate">
                      {s.role}
                    </span>
                  </div>
                </div>

                {/* Right: Clean Level Bar + Percentage */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-16 sm:w-20 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      data-level={s.level}
                      className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${s.barColor}`}
                      style={{ width: s.level }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-700 w-7 text-right">
                    {s.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. CREATIVE POST-PRODUCTION SUITE (3 COLUMNS GRID)        */}
        {/* ========================================================= */}
        <div ref={creativeRef} className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-neutral-200/80 pb-3">
            <div className="w-7 h-7 flex items-center justify-center text-neutral-800">
              <Film className="w-4 h-4" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
                Creative Suite
              </h3>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                Post-Production &bull; Color Science &bull; Motion Graphics
              </span>
            </div>
          </div>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 sm:gap-y-5">
            {creativeSkills.map((s) => (
              <div
                key={s.name}
                className="skill-item-row group flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl transition-all duration-200 hover:bg-neutral-50"
              >
                {/* Left: Original Small Software Logo + Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-bold text-sm text-neutral-900 tracking-tight truncate">
                      {s.name}
                    </span>
                    <span className="text-[10.5px] font-mono text-neutral-400 truncate">
                      {s.role}
                    </span>
                  </div>
                </div>

                {/* Right: Clean Level Bar + Percentage */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-16 sm:w-20 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      data-level={s.level}
                      className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${s.barColor}`}
                      style={{ width: s.level }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-700 w-7 text-right">
                    {s.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
