"use client";

import React from "react";

interface TechLogoProps {
  name: string;
  className?: string;
}

export function TechLogo({ name, className = "w-4 h-4 shrink-0" }: TechLogoProps) {
  const normalized = name.toLowerCase();

  // Next.js
  if (normalized.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#nextjs_paint0)"
        />
        <rect x="115" y="54" width="12" height="72" fill="url(#nextjs_paint1)" />
        <defs>
          <linearGradient id="nextjs_paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nextjs_paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // React
  if (normalized.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes("typescript")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path
          d="M72.049 84.155c2.316 3.738 5.702 5.922 10.457 5.922 4.417 0 7.234-2.227 7.234-5.32 0-3.69-2.903-5.02-8.31-7.378l-4.04-1.745c-8.236-3.52-13.687-8.396-13.687-18.04 0-10.428 8.162-18.156 21.36-18.156 8.956 0 15.65 3.377 19.864 10.428l-8.736 5.568c-2.438-4.148-5.746-6.07-10.985-6.07-4.387 0-6.911 2.08-6.911 4.903 0 3.23 2.508 4.67 7.724 6.94l4.04 1.746c9.897 4.296 14.568 8.956 14.568 18.598 0 11.83-8.868 18.714-22.68 18.714-11.89 0-19.98-5.35-23.77-13.437l8.868-2.673zM28.09 50.156h34.61v10.37H46.105v43.766H33.882V60.526H28.09V50.156z"
          fill="white"
        />
      </svg>
    );
  }

  // JavaScript
  if (normalized.includes("javascript")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <path
          d="M66.45 99.85c2.45 3.9 6.05 6.2 11.1 6.2 4.7 0 7.7-2.35 7.7-5.65 0-3.9-3.1-5.35-8.85-7.85l-4.3-1.85c-8.75-3.75-14.55-8.9-14.55-19.2 0-11.1 8.7-19.3 22.7-19.3 9.5 0 16.65 3.6 21.1 11.1l-9.3 5.9c-2.6-4.4-6.1-6.45-11.7-6.45-4.65 0-7.35 2.2-7.35 5.2 0 3.45 2.65 4.95 8.2 7.4l4.3 1.85c10.5 4.55 15.5 9.5 15.5 19.8 0 12.6-9.45 19.9-24.1 19.9-12.65 0-21.25-5.7-25.3-14.3l10.8-2.75zm-38.35 0c1.7 2.8 3.75 4.8 7.35 4.8 3.8 0 6.2-1.9 6.2-7.35V40.2h12.4v57.3c0 12.05-6.9 17.5-17.7 17.5-9.15 0-15.05-4.8-17.85-11.9l9.6-3.25z"
          fill="#000000"
        />
      </svg>
    );
  }

  // Three.js
  if (normalized.includes("three")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.745 5.306l-8.799-5.08a2.008 2.008 0 0 0-2.008 0L2.14 5.306A2.008 2.008 0 0 0 1.136 7.04v10.16a2.008 2.008 0 0 0 1.004 1.734l8.799 5.08a2.008 2.008 0 0 0 2.008 0l8.799-5.08a2.008 2.008 0 0 0 1.004-1.734V7.04a2.008 2.008 0 0 0-1.004-1.734zm-9.8 14.93l-7.795-4.5V6.736l7.795 4.5v9zm1.008-10.23l-7.8-4.504 7.796-4.5 7.8 4.5-7.796 4.504zm7.796 5.73l-7.796 4.5v-9l7.796-4.5v9z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // WebGL
  if (normalized.includes("webgl")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 16L112 44V84L64 112L16 84V44L64 16Z" stroke="#990000" strokeWidth="8" fill="#990000" fillOpacity="0.2" />
        <path d="M64 16V64M112 44L64 64M16 44L64 64M64 64V112" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <circle cx="64" cy="64" r="12" fill="#E52E2E" />
      </svg>
    );
  }

  // GSAP (GreenSock)
  if (normalized.includes("gsap") || normalized.includes("greensock")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#0E100F" />
        <path
          d="M48.8 18.5c-15.8 0-28.6 12.8-28.6 28.6 0 15.8 12.8 28.6 28.6 28.6 12.4 0 23-7.9 26.8-19.1h-9.9c-3.1 6-9.4 10.1-16.9 10.1-10.8 0-19.6-8.8-19.6-19.6s8.8-19.6 19.6-19.6c7.5 0 13.8 4.1 16.9 10.1h9.9c-3.8-11.2-14.4-19.1-26.8-19.1zm22.4 20.3l-8.5 10.5 8.5 10.5h10.8l-8.5-10.5 8.5-10.5H71.2z"
          fill="#88CE02"
        />
        <circle cx="48.8" cy="47.1" r="5.5" fill="#88CE02" />
      </svg>
    );
  }

  // Tailwind CSS
  if (normalized.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64 32C42.667 32 29.333 42.667 24 64C32 53.333 40 48 48 48C60 48 65.333 56 72 66C78.667 76 86.667 85.333 104 85.333C125.333 85.333 138.667 74.667 144 53.333C136 64 128 69.333 120 69.333C108 69.333 102.667 61.333 96 51.333C89.333 41.333 81.333 32 64 32ZM24 64C2.667 64 -10.667 74.667 -16 96C-8 85.333 0 80 8 80C20 80 25.333 88 32 98C38.667 108 46.667 117.333 64 117.333C85.333 117.333 98.667 106.667 104 85.333C96 96 88 101.333 80 101.333C68 101.333 62.667 93.333 56 83.333C49.333 73.333 41.333 64 24 64Z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // Node.js
  if (normalized.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64 8L112 36V92L64 120L16 92V36L64 8Z"
          fill="#539E43"
        />
        <path
          d="M64 24L96 42V84L64 102L32 84V42L64 24Z"
          fill="#333333"
        />
        <path
          d="M64 40L80 50V74L64 84L48 74V50L64 40Z"
          fill="#539E43"
        />
      </svg>
    );
  }

  // WebSockets
  if (normalized.includes("websocket")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="56" stroke="#F43F5E" strokeWidth="8" fill="none" />
        <path d="M36 64H92M68 40L92 64L68 88M60 88L36 64L60 40" stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // GraphQL
  if (normalized.includes("graphql")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="64,8 112,36 112,92 64,120 16,92 16,36" stroke="#E10098" strokeWidth="8" fill="none" />
        <polygon points="64,28 96,84 32,84" stroke="#E10098" strokeWidth="6" fill="none" />
        <circle cx="64" cy="8" r="8" fill="#E10098" />
        <circle cx="112" cy="36" r="8" fill="#E10098" />
        <circle cx="112" cy="92" r="8" fill="#E10098" />
        <circle cx="64" cy="120" r="8" fill="#E10098" />
        <circle cx="16" cy="92" r="8" fill="#E10098" />
        <circle cx="16" cy="36" r="8" fill="#E10098" />
      </svg>
    );
  }

  // PostgreSQL
  if (normalized.includes("postgres")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M64 12C35.3 12 12 35.3 12 64C12 92.7 35.3 116 64 116C92.7 116 116 92.7 116 64C116 35.3 92.7 12 64 12Z"
          fill="#336791"
        />
        <path
          d="M64 28C48 28 36 38 36 54C36 68 44 76 52 82V96H62V86C68 88 74 88 80 86V96H90V82C96 76 100 68 100 54C100 38 84 28 64 28Z"
          fill="white"
        />
      </svg>
    );
  }

  // Rust / WASM
  if (normalized.includes("rust") || normalized.includes("wasm")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="54" stroke="#DEA584" strokeWidth="8" fill="#000000" />
        <path d="M44 48L64 88L84 48M52 68H76" stroke="#DEA584" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="64" cy="64" r="14" fill="#DEA584" />
      </svg>
    );
  }

  // Docker
  if (normalized.includes("docker")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M120 64C116 56 106 54 98 56C94 48 84 44 74 46V54H62V42H50V54H38V42H26V66C14 68 6 78 8 90C10 102 24 112 44 112C78 112 110 94 120 64Z"
          fill="#2496ED"
        />
        <rect x="50" y="44" width="10" height="8" fill="white" />
        <rect x="62" y="44" width="10" height="8" fill="white" />
        <rect x="74" y="48" width="10" height="8" fill="white" />
      </svg>
    );
  }

  // AWS
  if (normalized.includes("aws")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 74C36 86 64 92 92 82C96 80 102 76 108 72C110 70 112 72 110 74C102 82 86 92 64 96C42 100 24 94 14 82C12 80 14 78 16 78C17 78 18 78 20 74Z"
          fill="#FF9900"
        />
        <path d="M102 68L114 74L104 84L102 68Z" fill="#FF9900" />
        <path d="M34 38L42 66H48L56 38H50L45 58L40 38H34ZM66 48C60 48 56 52 56 58C56 64 60 67 66 67C72 67 76 63 76 58C76 52 72 48 66 48ZM84 38H78V66H84V38Z" fill="white" />
      </svg>
    );
  }

  // Redis
  if (normalized.includes("redis")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 16L112 40V88L64 112L16 88V40L64 16Z" fill="#DC382D" />
        <path d="M64 36L92 50V78L64 92L36 78V50L64 36Z" fill="#A41E11" />
        <circle cx="64" cy="64" r="8" fill="white" />
      </svg>
    );
  }

  // DaVinci Resolve / Motion Video
  if (normalized.includes("davinci") || normalized.includes("after effects") || normalized.includes("motion") || normalized.includes("video")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="56" fill="#1A1A24" stroke="#EC4899" strokeWidth="6" />
        <circle cx="64" cy="40" r="14" fill="#EF4444" />
        <circle cx="44" cy="76" r="14" fill="#3B82F6" />
        <circle cx="84" cy="76" r="14" fill="#EAB308" />
      </svg>
    );
  }

  // Express / Default API
  if (normalized.includes("express")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="56" fill="#000000" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M36 64H92M64 36V92" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  // Fallback Modern Tech Emblem
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
