"use client";

import React, { useEffect, useRef } from "react";
import earthDotsData from "@/data/earthDots.json";

export function RotatingPurpleEarth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const landCoords: [number, number, number][] = earthDotsData as [number, number, number][];

    // Pre-allocate typed arrays for fast trigonometric calculation
    const numPoints = landCoords.length;
    const lats = new Float32Array(numPoints);
    const lons = new Float32Array(numPoints);
    const isEdges = new Uint8Array(numPoints);
    for (let i = 0; i < numPoints; i++) {
      lats[i] = (landCoords[i][0] * Math.PI) / 180;
      lons[i] = (landCoords[i][1] * Math.PI) / 180;
      isEdges[i] = landCoords[i][2] || 0;
    }

    // Subtle floating violet stardust particles
    const numStars = 50;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.28 + 0.1,
        speed: Math.random() * 0.0004 + 0.0001,
      });
    }

    // High-tech glowing city hub nodes (rendered as glowing dots, zero line strokes)
    const pulseNodes = [
      { lat: (40.7 * Math.PI) / 180, lon: (-74.0 * Math.PI) / 180, phase: 0 },   // New York
      { lat: (51.5 * Math.PI) / 180, lon: (-0.1 * Math.PI) / 180, phase: 1.5 },  // London
      { lat: (35.6 * Math.PI) / 180, lon: (139.6 * Math.PI) / 180, phase: 3.0 }, // Tokyo
      { lat: (37.7 * Math.PI) / 180, lon: (-122.4 * Math.PI) / 180, phase: 4.2 },// San Francisco
      { lat: (1.35 * Math.PI) / 180, lon: (103.8 * Math.PI) / 180, phase: 2.1 }, // Singapore
      { lat: (47.3 * Math.PI) / 180, lon: (8.5 * Math.PI) / 180, phase: 5.0 },   // Zurich
    ];

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const isMobileDevice = window.innerWidth < 768;
      const dpr = isMobileDevice ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Continuous celestial rotation - tuned to a slow, majestic planetary drift
    let rot = 0.75;
    const rotSpeed = 0.00095; // Slowed down per user request
    const tilt = 19 * (Math.PI / 180);
    const sinTilt = Math.sin(tilt);
    const cosTilt = Math.cos(tilt);

    const render = (time: number) => {
      rot += rotSpeed;

      ctx.clearRect(0, 0, width, height);

      // =======================================================================
      // MASSIVE PLANETARY DOME (HALF GLOBE - BOTTOM HALF SUNK BELOW SCREEN)
      // =======================================================================
      const isMobile = width < 768;
      const topMargin = isMobile ? 55 : 75;
      
      // Anchor center at bottom of viewport
      const cy = isMobile ? height * 0.90 : height * 0.94;
      const radius = cy - topMargin;
      const cx = width * 0.5;

      // 1. Subtle Floating Violet Dust Particles
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha =
          star.alpha * (0.6 + 0.4 * Math.sin(time * star.speed * 10 + i));
        ctx.fillStyle = `rgba(168, 85, 247, ${currentAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Radiant Violet Ambient Aura radiating above the dome horizon
      const ambientGlow = ctx.createRadialGradient(
        cx,
        cy - radius * 0.95,
        radius * 0.1,
        cx,
        cy - radius * 0.5,
        radius * 1.05
      );
      ambientGlow.addColorStop(0, "rgba(168, 85, 247, 0.20)");
      ambientGlow.addColorStop(0.35, "rgba(139, 92, 246, 0.10)");
      ambientGlow.addColorStop(0.7, "rgba(216, 180, 254, 0.03)");
      ambientGlow.addColorStop(1, "transparent");

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 3. Translucent Holographic Base Sphere (Frosted Violet Dome on White Canvas)
      const sphereGrad = ctx.createRadialGradient(
        cx,
        cy - radius * 0.85,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "rgba(245, 238, 255, 0.72)");
      sphereGrad.addColorStop(0.4, "rgba(238, 224, 255, 0.35)");
      sphereGrad.addColorStop(0.75, "rgba(233, 213, 255, 0.14)");
      sphereGrad.addColorStop(1, "rgba(216, 180, 254, 0.02)");

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip inside sphere
      ctx.clip();

      // ALL GRID LINES HAVE BEEN DELETED PER USER REQUEST (No latitude / longitude lines)

      // 4. Continents & Countries Dot-Matrix (Edges slightly bold, interior delicate stipple)
      const edgeCrest: { px: number; py: number; r: number }[] = [];
      const edgeFront: { px: number; py: number; r: number }[] = [];
      const edgeLimb: { px: number; py: number; r: number }[] = [];

      const intCrest: { px: number; py: number; r: number }[] = [];
      const intFront: { px: number; py: number; r: number }[] = [];
      const intLimb: { px: number; py: number; r: number }[] = [];

      const bottomCutoff = height + 30;

      const step = isMobile ? 2 : 1;
      for (let i = 0; i < numPoints; i += step) {
        const lat = lats[i];
        const lon = lons[i] + rot;

        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);

        const x0 = radius * cosLat * Math.sin(lon);
        const y0 = -radius * sinLat;
        const z0 = radius * cosLat * Math.cos(lon);

        const y1 = y0 * cosTilt - z0 * sinTilt;
        const z1 = y0 * sinTilt + z0 * cosTilt;
        const x1 = x0;

        // Front hemisphere culling
        if (z1 > -radius * 0.05) {
          const py = cy + y1;
          if (py < bottomCutoff) {
            const px = cx + x1;
            const depthFactor = (z1 + radius * 0.05) / (radius * 1.05);
            const topAura = Math.max(0, 1 - Math.abs(y1 + radius * 0.5) / (radius * 0.8));
            const isEdge = isEdges[i] === 1;

            if (isEdge) {
              // Edge dots defining countries & continents: slightly bold ("thoda bold hoga thoda bold jyada nhi")
              const dotRadius = Math.max(0.65, 0.90 + depthFactor * 0.65 + topAura * 0.25);
              if (topAura > 0.45) {
                edgeCrest.push({ px, py, r: dotRadius });
              } else if (depthFactor > 0.35) {
                edgeFront.push({ px, py, r: dotRadius });
              } else {
                edgeLimb.push({ px, py, r: dotRadius });
              }
            } else {
              // Interior land dots: delicate, thin, fine stipple
              const dotRadius = Math.max(0.36, 0.50 + depthFactor * 0.40 + topAura * 0.15);
              if (topAura > 0.45) {
                intCrest.push({ px, py, r: dotRadius });
              } else if (depthFactor > 0.35) {
                intFront.push({ px, py, r: dotRadius });
              } else {
                intLimb.push({ px, py, r: dotRadius });
              }
            }
          }
        }
      }

      // Draw Interior Dots first (subtle background fill)
      if (intLimb.length > 0) {
        ctx.fillStyle = "rgba(167, 139, 250, 0.18)";
        ctx.beginPath();
        for (let i = 0; i < intLimb.length; i++) {
          const b = intLimb[i];
          ctx.moveTo(b.px + b.r, b.py);
          ctx.arc(b.px, b.py, b.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (intFront.length > 0) {
        ctx.fillStyle = "rgba(139, 92, 246, 0.30)";
        ctx.beginPath();
        for (let i = 0; i < intFront.length; i++) {
          const b = intFront[i];
          ctx.moveTo(b.px + b.r, b.py);
          ctx.arc(b.px, b.py, b.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (intCrest.length > 0) {
        ctx.fillStyle = "rgba(192, 38, 211, 0.42)";
        ctx.beginPath();
        for (let i = 0; i < intCrest.length; i++) {
          const b = intCrest[i];
          ctx.moveTo(b.px + b.r, b.py);
          ctx.arc(b.px, b.py, b.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Draw Edge Dots on top (clearly outlining countries & continents, thoda bold!)
      if (edgeLimb.length > 0) {
        ctx.fillStyle = "rgba(139, 92, 246, 0.55)";
        ctx.beginPath();
        for (let i = 0; i < edgeLimb.length; i++) {
          const b = edgeLimb[i];
          ctx.moveTo(b.px + b.r, b.py);
          ctx.arc(b.px, b.py, b.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (edgeFront.length > 0) {
        ctx.fillStyle = "rgba(109, 40, 217, 0.78)"; // Deep crisp violet outline
        ctx.beginPath();
        for (let i = 0; i < edgeFront.length; i++) {
          const b = edgeFront[i];
          ctx.moveTo(b.px + b.r, b.py);
          ctx.arc(b.px, b.py, b.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (edgeCrest.length > 0) {
        ctx.fillStyle = "rgba(192, 38, 211, 0.85)"; // Radiant fuchsia-violet outline
        ctx.beginPath();
        for (let i = 0; i < edgeCrest.length; i++) {
          const b = edgeCrest[i];
          ctx.moveTo(b.px + b.r, b.py);
          ctx.arc(b.px, b.py, b.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 5. Glowing Hub Nodes on Global Cities (Violet glow, zero lines)
      pulseNodes.forEach((node) => {
        const lat = node.lat;
        const lon = node.lon + rot;
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);

        const x0 = radius * cosLat * Math.sin(lon);
        const y0 = -radius * sinLat;
        const z0 = radius * cosLat * Math.cos(lon);

        const y1 = y0 * cosTilt - z0 * sinTilt;
        const z1 = y0 * sinTilt + z0 * cosTilt;
        const x1 = x0;

        if (z1 > 0) {
          const px = cx + x1;
          const py = cy + y1;

          if (py < bottomCutoff) {
            const pulse = (Math.sin(time * 0.004 + node.phase) + 1) * 0.5;

            // Soft glowing outer dot
            ctx.fillStyle = `rgba(168, 85, 247, ${(0.38 * (1 - pulse * 0.5)).toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(px, py, 3.5 + pulse * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Core solid dot
            ctx.fillStyle = "#7c3aed";
            ctx.beginPath();
            ctx.arc(px, py, 2.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      ctx.restore(); // Restore clip

      // =======================================================================
      // 6. ATMOSPHERIC HORIZON GLOW DOME IN VIOLET
      // Soft glowing violet & fuchsia planetary crest framing the dome
      // =======================================================================
      ctx.save();
      // Outer soft ambient glow
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, Math.PI * 0.84, Math.PI * 2.16);
      ctx.lineWidth = 16;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.28)";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 35;
      ctx.stroke();

      // Atmospheric rim highlight
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, Math.PI * 0.86, Math.PI * 2.14);
      ctx.lineWidth = 4.0;
      ctx.strokeStyle = "rgba(147, 51, 234, 0.75)";
      ctx.shadowColor = "#7c3aed";
      ctx.shadowBlur = 20;
      ctx.stroke();

      // Delicate top apex crest in radiant magenta-violet
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 0.5, Math.PI * 1.08, Math.PI * 1.92);
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = "rgba(217, 70, 239, 0.90)";
      ctx.shadowColor = "#d946ef";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none">
      {/* Clean Luxury White Canvas Background */}
      <div className="absolute inset-0 bg-[#FAF7F2] bg-gradient-to-b from-[#FFFFFF] via-[#FAF6F0] to-[#F5EFE6]" />

      {/* 60fps Real-Time High-Definition Rotating Earth Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block will-change-transform"
      />

      {/* Subtle Top & Bottom Blending Gradients in White */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/75 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent" />
    </div>
  );
}
