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
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[3px] overflow-hidden" fill="none">
          <rect width="128" height="128" rx="14" fill="#3178C6" />
          <path
            d="M72.049 84.155c2.316 3.738 5.702 5.922 10.457 5.922 4.417 0 7.234-2.227 7.234-5.32 0-3.69-2.903-5.02-8.31-7.378l-4.04-1.745c-8.236-3.52-13.687-8.396-13.687-18.04 0-10.428 8.162-18.156 21.36-18.156 8.956 0 15.65 3.377 19.864 10.428l-8.736 5.568c-2.438-4.148-5.746-6.07-10.985-6.07-4.387 0-6.911 2.08-6.911 4.903 0 3.23 2.508 4.67 7.724 6.94l4.04 1.746c9.897 4.296 14.568 8.956 14.568 18.598 0 11.83-8.868 18.714-22.68 18.714-11.89 0-19.98-5.35-23.77-13.437l8.868-2.673zM28.09 50.156h34.61v10.37H46.105v43.766H33.882V60.526H28.09V50.156z"
            fill="#FFFFFF"
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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[3px] overflow-hidden" fill="none">
          <rect width="128" height="128" rx="14" fill="#F7DF1E" />
          <path
            d="M66.45 99.85c2.45 3.9 6.05 6.2 11.1 6.2 4.7 0 7.7-2.35 7.7-5.65 0-3.9-3.1-5.35-8.85-7.85l-4.3-1.85c-8.75-3.75-14.55-8.9-14.55-19.2 0-11.1 8.7-19.3 22.7-19.3 9.5 0 16.65 3.6 21.1 11.1l-9.3 5.9c-2.6-4.4-6.1-6.45-11.7-6.45-4.65 0-7.35 2.2-7.35 5.2 0 3.45 2.65 4.95 8.2 7.4l4.3 1.85c10.5 4.55 15.5 9.5 15.5 19.8 0 12.6-9.45 19.9-24.1 19.9-12.65 0-21.25-5.7-25.3-14.3l10.8-2.75zm-38.35 0c1.7 2.8 3.75 4.8 7.35 4.8 3.8 0 6.2-1.9 6.2-7.35V40.2h12.4v57.3c0 12.05-6.9 17.5-17.7 17.5-9.15 0-15.05-4.8-17.85-11.9l9.6-3.25z"
            fill="#000000"
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
        <svg viewBox="0 0 180 180" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="url(#nextjs_bar_a)"
          />
          <rect x="115" y="54" width="12" height="72" fill="url(#nextjs_bar_b)" />
          <defs>
            <linearGradient id="nextjs_bar_a" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nextjs_bar_b" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: "Three.js",
      role: "3D Shaders & Canvas",
      level: "88%",
      barColor: "from-emerald-500 to-teal-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <path
            d="M21.745 5.306l-8.799-5.08a2.008 2.008 0 0 0-2.008 0L2.14 5.306A2.008 2.008 0 0 0 1.136 7.04v10.16a2.008 2.008 0 0 0 1.004 1.734l8.799 5.08a2.008 2.008 0 0 0 2.008 0l8.799-5.08a2.008 2.008 0 0 0 1.004-1.734V7.04a2.008 2.008 0 0 0-1.004-1.734zm-9.8 14.93l-7.795-4.5V6.736l7.795 4.5v9zm1.008-10.23l-7.8-4.504 7.796-4.5 7.8 4.5-7.796 4.504zm7.796 5.73l-7.796 4.5v-9l7.796-4.5v9z"
            fill="#000000"
          />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      role: "Responsive Design Systems",
      level: "98%",
      barColor: "from-[#38bdf8] to-[#0284c7]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <path
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C9.337 13.382 7.976 12 6.001 12z"
            fill="#06B6D4"
          />
        </svg>
      ),
    },
    {
      name: "Node.js",
      role: "Server Microservices",
      level: "90%",
      barColor: "from-[#539e43] to-[#388e3c]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <path
            d="M11.998.002a2.008 2.008 0 0 0-1.004.269L2.195 5.352A2.008 2.008 0 0 0 1.19 7.09v9.82a2.008 2.008 0 0 0 1.004 1.739l8.799 5.08a2.008 2.008 0 0 0 2.008 0l8.799-5.08a2.008 2.008 0 0 0 1.005-1.74V7.091a2.008 2.008 0 0 0-1.005-1.739L13.002.271a2.008 2.008 0 0 0-1.004-.269zm.002 2.316l7.795 4.5v9l-7.795 4.5-7.795-4.5v-9l7.795-4.5z"
            fill="#539E43"
          />
          <path
            d="M12 5.5l5.5 3.17v6.34L12 18.18l-5.5-3.17V8.67L12 5.5z"
            fill="#539E43"
          />
        </svg>
      ),
    },
    {
      name: "Python",
      role: "Automation & LLM Pipelines",
      level: "92%",
      barColor: "from-[#387eb8] to-[#ffe052]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <linearGradient id="py_a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#5A9FD4" />
            <stop offset="1" stopColor="#306998" />
          </linearGradient>
          <linearGradient id="py_b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#FFD43B" />
            <stop offset="1" stopColor="#FFE873" />
          </linearGradient>
          <path fill="url(#py_a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 5)" />
          <path fill="url(#py_b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 5)" />
        </svg>
      ),
    },
    {
      name: "Git",
      role: "CI/CD & Version Control",
      level: "95%",
      barColor: "from-[#f05032] to-[#ea580c]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <path fill="#F05032" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z" />
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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <path fill="#0ACF83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129zm0 0" />
          <path fill="#A259FF" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5zm0 0" />
          <path fill="#F24E1E" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5zm0 0" />
          <path fill="#FF7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0" />
          <path fill="#1ABCFE" d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5zm0 0" />
        </svg>
      ),
    },
    {
      name: "GSAP",
      role: "ScrollTrigger & Timelines",
      level: "98%",
      barColor: "from-[#88ce02] to-[#65a30d]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0 rounded-[3px] overflow-hidden" fill="none">
          <rect width="100" height="100" rx="12" fill="#0E100F" />
          <path
            d="M48.8 18.5c-15.8 0-28.6 12.8-28.6 28.6 0 15.8 12.8 28.6 28.6 28.6 12.4 0 23-7.9 26.8-19.1h-9.9c-3.1 6-9.4 10.1-16.9 10.1-10.8 0-19.6-8.8-19.6-19.6s8.8-19.6 19.6-19.6c7.5 0 13.8 4.1 16.9 10.1h9.9c-3.8-11.2-14.4-19.1-26.8-19.1zm22.4 20.3l-8.5 10.5 8.5 10.5h10.8l-8.5-10.5 8.5-10.5H71.2z"
            fill="#88CE02"
          />
          <circle cx="48.8" cy="47.1" r="5.5" fill="#88CE02" />
        </svg>
      ),
    },
    {
      name: "UI / UX Architecture",
      role: "Human-Centered Flows",
      level: "94%",
      barColor: "from-neutral-800 to-neutral-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      name: "Kinetic Prototyping",
      role: "Micro-Interactions",
      level: "92%",
      barColor: "from-neutral-800 to-neutral-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      name: "Blender",
      role: "3D Modeling & Lighting",
      level: "86%",
      barColor: "from-[#ea7600] to-[#225780]",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <path
            d="M12.518 13.158c.045-.797.437-1.5 1.03-1.996.582-.489 1.362-.788 2.22-.788.852 0 1.633.299 2.213.788.594.497.985 1.2 1.03 1.996.046.817-.285 1.58-1.866 2.146-.593.573-1.433.935-2.377.935-.947 0-1.79-.36-2.38-.935-.58-.565-.912-1.323-.87-2.146zm-5.09 1.685c.005.312.106.918.256 1.391.316 1.002.852 1.93 1.595 2.743.763.839 1.704 1.513 2.789 1.994 1.14.502 2.378.758 3.663.758 1.284-.002 2.523-.263 3.662-.77 1.085-.486 2.027-1.16 2.79-2.003.746-.822 1.28-1.748 1.594-2.752a6.95 6.95 0 0 0 .3-1.533c.039-.506.022-1.016-.05-1.526a7.05 7.05 0 0 0-1.017-2.764c-.484-.78-1.112-1.46-1.859-2.032l.003-.001-7.505-5.73a.853.853 0 0 0-.02-.015c-.492-.376-1.323-.375-1.861.001-.548.382-.61 1.012-.123 1.408l-.002.002 3.133 2.533-9.54.01h-.012c-.789.001-1.55.514-1.698 1.167-.154.662.382 1.214 1.204 1.214l-.001.003 4.834-.009-8.498 6.985c-.01.008-.022.016-.033.025-.815.617-1.077 1.65-.564 2.298.522.662 1.628.666 2.451.004l6.59-5.467s-.07.519-.063.827zm12.13 1.732c-.971.982-2.332 1.542-3.8 1.542-1.472.002-2.833-.548-3.804-1.53-.475-.48-.823-1.028-1.039-1.614a4.17 4.17 0 0 1-.239-1.804c0-.59.176-1.144.522-1.699.283-.51.674-.973 1.153-1.365.946-.762 2.146-1.18 3.401-1.18 1.261-.001 2.46.409 3.406 1.172.48.39.87.85 1.154 1.36.345.556.52 1.11.52 1.7a4.19 4.19 0 0 1-.238 1.803 4.25 4.25 0 0 1-1.036 1.615z"
            fill="#E87D0D"
          />
          <circle cx="15.75" cy="13.15" r="2.8" fill="#265787" />
          <circle cx="15.75" cy="13.15" r="1.3" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: "Visual Art Direction",
      role: "Typography & Layouts",
      level: "95%",
      barColor: "from-neutral-800 to-neutral-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19 7-7 3 3-7 7-3-3z" />
          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="m2 2 7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
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
        <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0 rounded-full overflow-hidden" fill="none">
          <defs>
            <linearGradient id="dvr_ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C8FF" />
              <stop offset="25%" stopColor="#8A3FFC" />
              <stop offset="55%" stopColor="#FA2D55" />
              <stop offset="80%" stopColor="#FF832B" />
              <stop offset="100%" stopColor="#25A244" />
            </linearGradient>
            <linearGradient id="dvr_top" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#48EBFF" />
              <stop offset="50%" stopColor="#00A2FF" />
              <stop offset="100%" stopColor="#1E5CDB" />
            </linearGradient>
            <linearGradient id="dvr_left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E9FA48" />
              <stop offset="60%" stopColor="#D2E823" />
              <stop offset="100%" stopColor="#E8A900" />
            </linearGradient>
            <linearGradient id="dvr_right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF708F" />
              <stop offset="50%" stopColor="#FF3058" />
              <stop offset="100%" stopColor="#DE1B3A" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="48" stroke="url(#dvr_ring)" strokeWidth="3.5" fill="#181B24" />
          <path d="M50 50 C46 42, 34 38, 34 27 C34 18, 41 12, 50 12 C59 12, 66 18, 66 27 C66 38, 54 42, 50 50 Z" fill="url(#dvr_top)" />
          <ellipse cx="48" cy="20" rx="5" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(-15 48 20)" />
          <path d="M50 50 C44 48, 32 56, 23 62 C15 67, 14 77, 21 83 C28 89, 39 88, 44 80 C50 71, 48 56, 50 50 Z" fill="url(#dvr_left)" />
          <ellipse cx="27" cy="74" rx="5" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 27 74)" />
          <path d="M50 50 C56 48, 68 56, 77 62 C85 67, 86 77, 79 83 C72 89, 61 88, 56 80 C50 71, 52 56, 50 50 Z" fill="url(#dvr_right)" />
          <ellipse cx="73" cy="74" rx="5" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(30 73 74)" />
        </svg>
      ),
    },
    {
      name: "Adobe Premiere Pro",
      role: "Video Editing & Film Pacing",
      level: "95%",
      barColor: "from-[#9999ff] to-[#7979ff]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[3px] overflow-hidden" fill="none">
          <rect width="128" height="128" rx="14" fill="#00005B" />
          <rect x="2" y="2" width="124" height="124" rx="12" stroke="#9999FF" strokeWidth="4" />
          <path
            d="M69 47.1c-.1-9.4-7.8-16.9-17.2-16.8H33.3v58.5h9.6V67.5h8.3C61 67.4 69 59.3 69 49.4v-2.3zm-9.6 3c0 5-4.1 9.1-9.1 9.1h-7.4V38.5h7.4c5 0 9.1 4.1 9.1 9.1v2.5zM77.1 88.8V48.9s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3v34.2H77.1z"
            fill="#9999FF"
          />
        </svg>
      ),
    },
    {
      name: "Adobe After Effects",
      role: "Motion Graphics & Visual VFX",
      level: "92%",
      barColor: "from-[#d291ff] to-[#b359ff]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[3px] overflow-hidden" fill="none">
          <rect width="128" height="128" rx="14" fill="#2D004D" />
          <rect x="2" y="2" width="124" height="124" rx="12" stroke="#D291FF" strokeWidth="4" />
          <path
            d="M103.5 59.2s-.6-14.6-16.5-14.6c-16 0-17.3 22-17.3 22v4.7S72.5 89.6 86 89.6s14.8-2.6 14.8-2.6v-8.1s-19.3 9.2-21.2-10h24v-9.7zm-9 2.4h-15s0-8.3 7.5-9.2c8.2 0 7.5 9.2 7.5 9.2zM50.5 29.9H38.4v3.8l-16 54.9h9.4l4.4-16.1H53l4.5 16.1h10.3L50.5 29.9zM38.2 63.1l6.4-24.5L51 63.1H38.2z"
            fill="#D291FF"
          />
        </svg>
      ),
    },
    {
      name: "Adobe Lightroom",
      role: "Editorial Color Grading",
      level: "90%",
      barColor: "from-[#31a8ff] to-[#0084e6]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[3px] overflow-hidden" fill="none">
          <rect width="128" height="128" rx="14" fill="#001E36" />
          <rect x="2" y="2" width="124" height="124" rx="12" stroke="#31A8FF" strokeWidth="4" />
          <path
            d="M33 30.3h10.5v48.2H66V89H33V30.3zm42.6 28.5V48.7s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3V89h-10.1V58.8z"
            fill="#31A8FF"
          />
        </svg>
      ),
    },
    {
      name: "Cinematic Sound Design",
      role: "Foley & Sub-bass Impact",
      level: "88%",
      barColor: "from-neutral-800 to-neutral-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" />
        </svg>
      ),
    },
    {
      name: "Video Encoding & HLS",
      role: "Adaptive Bitrate & Codecs",
      level: "94%",
      barColor: "from-neutral-800 to-neutral-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="15" height="16" rx="2" />
          <path d="m17 8 5-3v14l-5-3" />
          <path d="M7 10h5M7 14h3" />
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
