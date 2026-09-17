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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <g fill="#61DAFB">
            <circle cx="64" cy="64" r="11.4" />
            <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[4px] overflow-hidden" fill="none">
          <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" />
          <path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      role: "ESNext & Performance",
      level: "98%",
      barColor: "from-[#f7df1e] to-[#eab308]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[4px] overflow-hidden" fill="none">
          <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
          <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
        </svg>
      ),
    },
    {
      name: "Next.js",
      role: "App Router & SSR",
      level: "94%",
      barColor: "from-neutral-900 to-neutral-700",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="64" cy="64" r="64" fill="#000000" />
          <path fill="url(#next_a)" d="M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z" />
          <path fill="url(#next_b)" d="M81.778 38.4h8.533v51.2h-8.533z" />
          <defs>
            <linearGradient id="next_a" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientTransform="scale(.71111)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="next_b" x1="121" x2="120.799" y1="54" y2="106.875" gradientTransform="scale(.71111)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
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
          className="w-5 h-5 shrink-0 text-neutral-900"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      role: "Server Microservices",
      level: "90%",
      barColor: "from-[#539e43] to-[#388e3c]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <path fill="url(#node_a)" d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z" />
          <path fill="url(#node_b)" d="M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z" />
          <path fill="url(#node_c)" d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z" />
          <defs>
            <linearGradient id="node_a" x1="34.513" x2="27.157" y1="15.535" y2="30.448" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3F873F" />
              <stop offset=".33" stopColor="#3F8B3D" />
              <stop offset=".637" stopColor="#3E9638" />
              <stop offset=".934" stopColor="#3DA92E" />
              <stop offset="1" stopColor="#3DAE2B" />
            </linearGradient>
            <linearGradient id="node_b" x1="30.009" x2="50.533" y1="23.359" y2="8.288" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse">
              <stop offset=".138" stopColor="#3F873F" />
              <stop offset=".402" stopColor="#52A044" />
              <stop offset=".713" stopColor="#64B749" />
              <stop offset=".908" stopColor="#6ABF4B" />
            </linearGradient>
            <linearGradient id="node_c" x1="21.917" x2="40.555" y1="22.261" y2="22.261" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse">
              <stop offset=".092" stopColor="#6ABF4B" />
              <stop offset=".287" stopColor="#64B749" />
              <stop offset=".598" stopColor="#52A044" />
              <stop offset=".862" stopColor="#3F873F" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: "Python & AI",
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
      name: "Git & DevOps",
      role: "CI/CD & Version Control",
      level: "95%",
      barColor: "from-[#f05032] to-[#ea580c]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z" />
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
          <path fill="#0acf83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129zm0 0" />
          <path fill="#a259ff" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5zm0 0" />
          <path fill="#f24e1e" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5zm0 0" />
          <path fill="#ff7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0" />
          <path fill="#1abcfe" d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5zm0 0" />
        </svg>
      ),
    },
    {
      name: "GSAP Motion",
      role: "ScrollTrigger & Timelines",
      level: "98%",
      barColor: "from-[#88ce02] to-[#65a30d]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="50" cy="50" r="48" fill="#88CE02" />
          <circle cx="36" cy="40" r="6" fill="#0E100F" />
          <circle cx="64" cy="40" r="6" fill="#0E100F" />
          <path d="M32 60 C42 76, 58 76, 68 60" stroke="#0E100F" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      name: "UI / UX Architecture",
      role: "Human-Centered Flows",
      level: "94%",
      barColor: "from-purple-500 to-indigo-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#A855F7" strokeWidth="2" />
          <path d="M9 3V21" stroke="#A855F7" strokeWidth="2" />
          <path d="M9 12H21" stroke="#A855F7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Kinetic Prototyping",
      role: "Micro-Interactions",
      level: "92%",
      barColor: "from-pink-500 to-rose-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="12" cy="12" r="3" fill="#EC4899" />
          <circle cx="12" cy="3" r="2" fill="#F43F5E" />
          <circle cx="12" cy="21" r="2" fill="#F43F5E" />
          <circle cx="3" cy="12" r="2" fill="#EC4899" />
          <circle cx="21" cy="12" r="2" fill="#EC4899" />
          <circle cx="5.6" cy="5.6" r="1.8" fill="#FB7185" />
          <circle cx="18.4" cy="18.4" r="1.8" fill="#FB7185" />
          <circle cx="5.6" cy="18.4" r="1.8" fill="#FB7185" />
          <circle cx="18.4" cy="5.6" r="1.8" fill="#FB7185" />
        </svg>
      ),
    },
    {
      name: "Spatial 3D & Blender",
      role: "Lighting & Materials",
      level: "86%",
      barColor: "from-[#ea7600] to-[#225780]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0" fill="none">
          <path d="M66.332 70.032c.24-4.242 2.327-7.987 5.485-10.634 3.094-2.602 7.248-4.193 11.809-4.193 4.537 0 8.69 1.59 11.78 4.193 3.163 2.647 5.237 6.392 5.485 10.634.24 4.35-1.523 8.41-4.605 11.417-3.158 3.05-7.627 4.977-12.66 4.977-5.037 0-9.526-1.915-12.664-4.977-3.094-3.006-4.853-7.044-4.606-11.397zm0 0" fill="#235785" />
          <path d="M39.245 79.002c.028 1.66.564 4.89 1.36 7.404 1.682 5.336 4.537 10.273 8.49 14.599 4.062 4.465 9.074 8.055 14.85 10.61 6.073 2.67 12.665 4.037 19.505 4.037 6.84-.009 13.432-1.4 19.504-4.102 5.776-2.582 10.79-6.168 14.85-10.657 3.974-4.374 6.82-9.307 8.491-14.647a37 37 0 001.595-8.163c.208-2.69.12-5.405-.263-8.12a37.535 37.535 0 00-5.417-14.714c-2.574-4.15-5.916-7.76-9.89-10.813l.012-.004-39.955-30.506c-.036-.028-.068-.056-.104-.08-2.619-2.002-7.044-1.994-9.91.008-2.914 2.031-3.25 5.385-.656 7.496l-.012.008 16.682 13.484-50.789.051h-.068c-4.197.004-8.239 2.739-9.03 6.213-.82 3.521 2.035 6.46 6.412 6.46l-.008.016 25.736-.048L4.58 82.524c-.056.044-.12.088-.176.132C.069 85.95-1.33 91.446 1.4 94.9c2.778 3.522 8.666 3.546 13.047.02L39.505 74.51s-.368 2.758-.336 4.397zm64.56 9.219c-5.168 5.228-12.416 8.21-20.227 8.21-7.831.012-15.079-2.918-20.248-8.142-2.526-2.559-4.377-5.473-5.528-8.591a22.202 22.202 0 01-1.271-9.602 22.446 22.446 0 012.778-9.039c1.507-2.714 3.59-5.18 6.14-7.267 5.033-4.058 11.42-6.28 18.1-6.28 6.709-.008 13.097 2.174 18.13 6.236 2.55 2.075 4.625 4.529 6.14 7.243a22.302 22.302 0 012.774 9.043 22.313 22.313 0 01-1.271 9.598c-1.147 3.142-3.002 6.056-5.533 8.615zm0 0" fill="#e87500" />
        </svg>
      ),
    },
    {
      name: "Visual Art Direction",
      role: "Typography & Layouts",
      level: "95%",
      barColor: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#F59E0B" strokeWidth="2" />
          <line x1="3.6" y1="9" x2="20.4" y2="9" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="3.6" y1="15" x2="20.4" y2="15" stroke="#F59E0B" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="#F59E0B" strokeWidth="1.5" />
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
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[4px] overflow-hidden" fill="none">
          <path fill="#00005B" d="M0 0h128v128H0z" />
          <path fill="#9999FF" d="M0 0v128h128V0H0zm123 123H5V5h118v118z" />
          <path fill="#9999FF" d="M69 47.1c-.1-9.4-7.8-16.9-17.2-16.8H33.3v58.5h9.6V67.5h8.3C61 67.4 69 59.3 69 49.4v-2.3zm-9.6 3c0 5-4.1 9.1-9.1 9.1h-7.4V38.5h7.4c5 0 9.1 4.1 9.1 9.1v2.5zM77.1 88.8V48.9s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3v34.2H77.1z" />
        </svg>
      ),
    },
    {
      name: "Adobe After Effects",
      role: "Motion Graphics & Visual VFX",
      level: "92%",
      barColor: "from-[#d291ff] to-[#b359ff]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[4px] overflow-hidden" fill="none">
          <path fill="#2D004D" d="M6.5 6.5h115v115H6.5z" />
          <path fill="#D291FF" d="M0 0v128h128V0H0zm121.5 121.5H6.5V6.5h115v115z" />
          <path fill="#D291FF" d="M103.5 59.2s-.6-14.6-16.5-14.6c-16 0-17.3 22-17.3 22v4.7S72.5 89.6 86 89.6s14.8-2.6 14.8-2.6v-8.1s-19.3 9.2-21.2-10h24v-9.7zm-9 2.4h-15s0-8.3 7.5-9.2c8.2 0 7.5 9.2 7.5 9.2zM50.5 29.9H38.4v3.8l-16 54.9h9.4l4.4-16.1H53l4.5 16.1h10.3L50.5 29.9zM38.2 63.1l6.4-24.5L51 63.1H38.2z" />
        </svg>
      ),
    },
    {
      name: "Adobe Lightroom",
      role: "Editorial Color Grading",
      level: "90%",
      barColor: "from-[#31a8ff] to-[#0084e6]",
      icon: (
        <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 rounded-[4px] overflow-hidden" fill="none">
          <path fill="#001E36" d="M0 0h128v128H0z" />
          <path fill="#31A8FF" d="M0 0v128h128V0H0zm123 123H5V5h118v118z" />
          <path fill="#31A8FF" d="M33 30.3h10.5v48.2H66V89H33V30.3zm42.6 28.5V48.7s10.2-5.1 20.2-3.8v8.3s-7 0-10.1 1.3V89h-10.1V58.8z" />
        </svg>
      ),
    },
    {
      name: "Cinematic Sound Design",
      role: "Foley & Sub-bass Impact",
      level: "88%",
      barColor: "from-violet-500 to-purple-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <path d="M4 10V14M8 6V18M12 3V21M16 7V17M20 11V13" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Video Encoding & HLS",
      role: "Adaptive Bitrate & Codecs",
      level: "94%",
      barColor: "from-cyan-500 to-blue-600",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="3" stroke="#00D8FF" strokeWidth="2" />
          <polygon points="10 8 16 12 10 16 10 8" fill="#00D8FF" />
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
