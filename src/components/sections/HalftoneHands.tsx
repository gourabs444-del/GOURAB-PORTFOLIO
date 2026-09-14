"use client";

import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Cpu, Fingerprint, Activity, Zap } from "lucide-react";

export function HalftoneHands() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1200);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1200;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500;
    };

    window.addEventListener("resize", handleResize);

    // Particle system for the energetic spark in the middle
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * 60,
      y: height * 0.5 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 1.8,
      vy: (Math.random() - 0.5) * 1.8,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.4 ? "#111111" : "#E5A93C",
    }));

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw interactive electrical arc connecting the fingertips
      ctx.save();
      ctx.beginPath();
      const leftTipX = width * 0.44 + Math.sin(time * 1.2) * 4;
      const leftTipY = height * 0.5 + Math.cos(time * 1.5) * 3;
      const rightTipX = width * 0.56 + Math.cos(time * 1.2) * 4;
      const rightTipY = height * 0.5 + Math.sin(time * 1.5) * 3;

      ctx.moveTo(leftTipX, leftTipY);

      // Arc with jagged lightning/energy variations
      const segments = 6;
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const curX = leftTipX + (rightTipX - leftTipX) * t;
        const jitter = (Math.sin(time * 6 + i * 2) * 8 + (Math.random() - 0.5) * 4) * (isHovered ? 1.5 : 0.8);
        const curY = leftTipY + (rightTipY - leftTipY) * t + jitter;
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(rightTipX, rightTipY);

      ctx.strokeStyle = isHovered ? "#E5A93C" : "rgba(17, 17, 17, 0.4)";
      ctx.lineWidth = isHovered ? 2.5 : 1.2;
      ctx.shadowColor = "#E5A93C";
      ctx.shadowBlur = isHovered ? 12 : 4;
      ctx.stroke();
      ctx.restore();

      // Render energy spark particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Pull slightly back to center
        p.vx += (centerX - p.x) * 0.002;
        p.vy += (centerY - p.y) * 0.002;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(time * 3 + p.x) * 0.4);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      className="relative w-full max-w-5xl mx-auto my-8 md:my-14 select-none overflow-hidden rounded-3xl border border-neutral-300/80 bg-gradient-to-b from-white/95 via-neutral-50/90 to-neutral-100/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_25px_70px_-12px_rgba(0,0,0,0.12)] hover:border-neutral-400 group"
    >
      {/* Background Technical Grid and Blueprint Circles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="card-tech-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#111111" strokeWidth="0.5" opacity="0.15" />
              <circle cx="0" cy="0" r="1" fill="#111111" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#card-tech-grid)" />
        </svg>
      </div>

      {/* Atmospheric Glow Center Spotlight */}
      <div
        className="absolute w-[380px] h-[380px] rounded-full blur-[100px] pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: `calc(${mousePos.x * 100}% - 190px)`,
          top: `calc(${mousePos.y * 100}% - 190px)`,
          background: "radial-gradient(circle, rgba(229,169,60,0.12) 0%, rgba(17,17,17,0.03) 60%, transparent 100%)",
        }}
      />

      {/* Main Visual Stage */}
      <div className="relative w-full aspect-[21/10] sm:aspect-[2.4/1] md:aspect-[2.8/1] flex items-center justify-center p-4 sm:p-8">
        
        {/* Particle Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* High-Definition Masterpiece SVG Artwork */}
        <svg
          viewBox="0 0 1200 480"
          className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shading & Texture Patterns */}
            <pattern id="stipple-dense" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill="#111111" />
              <circle cx="4.5" cy="4.5" r="0.8" fill="#111111" opacity="0.75" />
            </pattern>

            <pattern id="stipple-fade" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="0.9" fill="#111111" opacity="0.6" />
              <circle cx="8" cy="8" r="0.6" fill="#111111" opacity="0.3" />
            </pattern>

            <linearGradient id="metalSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181B" />
              <stop offset="45%" stopColor="#27272A" />
              <stop offset="50%" stopColor="#52525B" />
              <stop offset="55%" stopColor="#27272A" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>

            <linearGradient id="humanSkin" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#27272A" />
              <stop offset="60%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
          </defs>

          {/* Central Target Reticle & Radar Coordinates */}
          <g transform="translate(600, 240)" opacity="0.35" className="font-mono text-[10px]">
            <circle cx="0" cy="0" r="110" fill="none" stroke="#111111" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="0" cy="0" r="65" fill="none" stroke="#111111" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="0" cy="0" r="4" fill="#E5A93C" />
            <line x1="-125" y1="0" x2="125" y2="0" stroke="#111111" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="0" y1="-125" x2="0" y2="125" stroke="#111111" strokeWidth="0.6" strokeDasharray="3 3" />
          </g>

          {/* ========================================================= */}
          {/* LEFT: ADVANCED CYBERNETIC MECHANICAL HAND                 */}
          {/* ========================================================= */}
          <g
            id="cyber-hand"
            style={{
              transform: `translateX(${(mousePos.x - 0.5) * 12}px) translateY(${(mousePos.y - 0.5) * 6}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Robot Forearm Chassis */}
            <path
              d="M-40,360 C50,330 160,310 240,295 C270,255 310,225 360,215 C330,175 290,140 220,165 C130,195 20,225 -40,245 Z"
              fill="url(#metalSheen)"
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.15))"
            />
            {/* Inner skeleton & carbon texture */}
            <path
              d="M40,250 L200,210 L235,275 L65,320 Z"
              fill="url(#stipple-dense)"
              opacity="0.85"
            />

            {/* Precision Mechanical Plates */}
            <path
              d="M100,230 L250,190 L280,245 L130,290 Z"
              fill="none"
              stroke="#E5A93C"
              strokeWidth="1.5"
              strokeDasharray="6 3"
            />

            {/* Glowing Circuit Bus Lines */}
            <path
              d="M-20,290 L140,260 L210,285 L320,240"
              fill="none"
              stroke="#E5A93C"
              strokeWidth="1.8"
              opacity="0.85"
            />
            <circle cx="140" cy="260" r="3.5" fill="#E5A93C" />
            <circle cx="210" cy="285" r="3.5" fill="#E5A93C" />

            {/* Complex Wrist Gimbal Joint */}
            <circle cx="340" cy="245" r="34" fill="#18181B" stroke="#52525B" strokeWidth="3" />
            <circle cx="340" cy="245" r="22" fill="url(#stipple-dense)" />
            <circle cx="340" cy="245" r="10" fill="#E5A93C" opacity="0.9" />
            <circle cx="340" cy="245" r="4" fill="#FFFFFF" />

            {/* Robot Palm Housing */}
            <path
              d="M340,220 C380,195 430,200 470,215 C485,250 460,290 410,305 C370,305 345,275 340,245 Z"
              fill="url(#metalSheen)"
            />

            {/* Robot Thumb Assembly */}
            <path
              d="M380,285 C410,325 435,355 470,365 C485,360 490,340 475,320 C445,290 420,270 395,265 Z"
              fill="#27272A"
              stroke="#52525B"
              strokeWidth="1.5"
            />
            <circle cx="470" cy="345" r="6" fill="#E5A93C" />

            {/* Robot Index Finger (Reaches to Center Spark ~550,240) */}
            {/* Proximal Segment */}
            <path
              d="M460,215 L515,210 L510,235 L455,240 Z"
              fill="#18181B"
              stroke="#3F3F46"
              strokeWidth="1.5"
            />
            <circle cx="512" cy="222" r="7" fill="#27272A" stroke="#E5A93C" strokeWidth="1.5" />

            {/* Intermediate Segment */}
            <path
              d="M512,218 L565,224 L562,244 L512,238 Z"
              fill="#27272A"
              stroke="#52525B"
              strokeWidth="1.5"
            />
            <circle cx="563" cy="233" r="6" fill="#18181B" stroke="#E5A93C" strokeWidth="1.5" />

            {/* Distal Micro-Needle Sensor Tip */}
            <path
              d="M563,228 L605,236 C610,237 610,241 605,242 L563,242 Z"
              fill="#111111"
            />
            <line x1="565" y1="235" x2="612" y2="239" stroke="#E5A93C" strokeWidth="2" />
            <circle cx="612" cy="239" r="3.5" fill="#E5A93C" />

            {/* Remaining robotic fingers (Middle, Ring, Pinky) */}
            <path
              d="M450,245 C495,255 530,270 565,282 C572,287 568,296 558,295 C520,285 485,275 440,265 Z"
              fill="#27272A"
              stroke="#3F3F46"
              strokeWidth="1.2"
            />
            <circle cx="560" cy="288" r="5" fill="#18181B" />

            <path
              d="M435,270 C475,290 510,310 540,322 C546,327 540,335 530,332 C500,320 465,300 425,285 Z"
              fill="#18181B"
              stroke="#3F3F46"
              strokeWidth="1.2"
            />

            <path
              d="M420,290 C450,315 480,340 505,352 C510,357 504,364 496,360 C470,346 440,322 410,305 Z"
              fill="#09090B"
            />
          </g>

          {/* ========================================================= */}
          {/* RIGHT: SCULPTED HUMAN HAND                                */}
          {/* ========================================================= */}
          <g
            id="human-hand"
            style={{
              transform: `translateX(${(mousePos.x - 0.5) * -12}px) translateY(${(mousePos.y - 0.5) * -6}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Human Forearm & Wrist entering from right */}
            <path
              d="M1240,220 C1140,210 1040,205 960,220 C920,240 875,275 850,310 C895,345 970,370 1070,380 C1160,390 1240,400 1240,400 Z"
              fill="url(#humanSkin)"
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.15))"
            />

            {/* Muscle Tone & Anatomy Contours */}
            <path
              d="M1000,225 C950,238 895,265 865,298 C905,320 960,332 1010,338 Z"
              fill="url(#stipple-dense)"
              opacity="0.6"
            />

            {/* Human Palm Body */}
            <path
              d="M900,245 C860,240 810,245 765,265 C760,300 790,340 840,345 C880,345 905,315 910,280 Z"
              fill="url(#humanSkin)"
            />

            {/* Human Thumb (Gracefully curved downwards) */}
            <path
              d="M845,315 C820,350 790,385 755,400 C738,400 732,382 745,365 C770,335 800,305 825,285 Z"
              fill="#18181B"
            />
            <path
              d="M748,382 C745,392 755,395 762,392"
              fill="none"
              stroke="#52525B"
              strokeWidth="2"
            />

            {/* Human Index Finger (Reaching left to meet the spark at ~650,240) */}
            {/* Base knuckle & Phalanx */}
            <path
              d="M775,255 C730,248 685,242 630,238 C622,238 622,244 630,248 C675,258 725,270 770,275 Z"
              fill="#27272A"
            />
            {/* Finger Contour shading */}
            <path
              d="M775,255 C728,246 680,240 630,238 C624,238 622,242 626,245 C672,256 720,268 768,274 Z"
              fill="#111111"
              opacity="0.75"
            />
            {/* Fingertip & Nail Highlight */}
            <path
              d="M626,238 C622,240 622,244 628,246"
              fill="none"
              stroke="#E5A93C"
              strokeWidth="2.5"
            />
            <circle cx="622" cy="241" r="3.5" fill="#E5A93C" />

            {/* Human Middle Finger */}
            <path
              d="M770,280 C720,298 675,322 638,340 C632,344 638,352 646,350 C688,332 732,312 770,300 Z"
              fill="#18181B"
            />

            {/* Human Ring Finger */}
            <path
              d="M780,302 C742,326 702,354 670,375 C664,380 670,387 678,384 C710,362 748,338 784,318 Z"
              fill="#27272A"
            />

            {/* Human Pinky Finger */}
            <path
              d="M795,322 C762,350 730,380 702,402 C696,407 702,414 710,411 C738,390 770,360 802,334 Z"
              fill="#09090B"
            />
          </g>
        </svg>

        {/* Floating Glassmorphism Technical HUD Badges */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-300 text-[11px] font-mono uppercase tracking-wider text-neutral-900 shadow-md flex items-center gap-2 pointer-events-none transition-transform group-hover:scale-105">
          <Cpu className="w-3.5 h-3.5 text-neutral-900" />
          <span className="font-bold">CYBERNETIC CORE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-300 text-[11px] font-mono uppercase tracking-wider text-neutral-900 shadow-md flex items-center gap-2 pointer-events-none transition-transform group-hover:scale-105">
          <Fingerprint className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-bold">HUMAN INTELLECT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        </div>

        {/* Bottom Interactive Prompt Overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neutral-900/90 text-white backdrop-blur-md text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 opacity-75 group-hover:opacity-100 transition-opacity">
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>SYNTHESIS // HOVER TO ACTIVATE ARC</span>
        </div>
      </div>
    </div>
  );
}

