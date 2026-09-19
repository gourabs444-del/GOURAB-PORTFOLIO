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

    const landCoords: [number, number][] = earthDotsData as [number, number][];

    // Subtle floating violet stardust particles
    const numStars = 60;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.4 + 0.15,
        speed: Math.random() * 0.0004 + 0.0001,
      });
    }

    // High-tech pulsed connection hubs on cities
    const pulseNodes = [
      { lat: 40.7, lon: -74.0, phase: 0 },   // New York
      { lat: 51.5, lon: -0.1, phase: 1.5 },  // London
      { lat: 35.6, lon: 139.6, phase: 3.0 }, // Tokyo
      { lat: 37.7, lon: -122.4, phase: 4.2 },// San Francisco
      { lat: 1.35, lon: 103.8, phase: 2.1 }, // Singapore
      { lat: 47.3, lon: 8.5, phase: 5.0 },   // Zurich
    ];

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initial orientation showing Americas & Europe
    let rot = 0.75;
    const rotSpeed = 0.0026; // Silky smooth celestial planetary rotation
    const tilt = 19 * (Math.PI / 180); // 19-degree axial tilt
    const sinTilt = Math.sin(tilt);
    const cosTilt = Math.cos(tilt);

    const render = (time: number) => {
      rot += rotSpeed;

      ctx.clearRect(0, 0, width, height);

      // Sphere radius sized generously to match reference
      const radius = Math.min(width * 0.42, height * 0.52, 420);
      const cx = width * 0.5;
      const cy = height * 0.53;

      // 1. Subtle Floating Violet Dust Particles
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha =
          star.alpha * (0.6 + 0.4 * Math.sin(time * star.speed * 10 + i));
        ctx.fillStyle = "rgba(147, 51, 234, " + currentAlpha.toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Radiant Violet Ambient Aura behind the sphere on white canvas
      const ambientGlow = ctx.createRadialGradient(
        cx,
        cy - radius * 0.25,
        radius * 0.35,
        cx,
        cy,
        radius * 1.65
      );
      ambientGlow.addColorStop(0, "rgba(168, 85, 247, 0.16)");
      ambientGlow.addColorStop(0.4, "rgba(192, 132, 252, 0.09)");
      ambientGlow.addColorStop(0.75, "rgba(232, 121, 249, 0.03)");
      ambientGlow.addColorStop(1, "transparent");

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.65, 0, Math.PI * 2);
      ctx.fill();

      // 3. Translucent Holographic Base Sphere (Frosted Violet on White)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.2,
        cy - radius * 0.45,
        radius * 0.08,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "rgba(243, 232, 255, 0.65)");
      sphereGrad.addColorStop(0.45, "rgba(238, 224, 255, 0.35)");
      sphereGrad.addColorStop(0.85, "rgba(224, 204, 250, 0.16)");
      sphereGrad.addColorStop(1, "rgba(216, 180, 254, 0.04)");

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip inside sphere
      ctx.clip();

      // 4. Subtle Orbital Latitudes Grid in Violet
      ctx.strokeStyle = "rgba(147, 51, 234, 0.12)";
      ctx.lineWidth = 1;
      [-45, -20, 0, 20, 45, 65].forEach((latDeg) => {
        const phi = (latDeg * Math.PI) / 180;
        const latRadius = radius * Math.cos(phi);
        const yOffset = -radius * Math.sin(phi) * cosTilt;
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy + yOffset,
          latRadius,
          latRadius * sinTilt * 0.8,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      });

      // 5. Render 3D Rotating Dot-Matrix Continents in Vibrant High-Contrast Violet
      for (let i = 0; i < landCoords.length; i++) {
        const [latDeg, lonDeg] = landCoords[i];
        const lat = (latDeg * Math.PI) / 180;
        const lon = (lonDeg * Math.PI) / 180 + rot;

        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);

        const x0 = radius * cosLat * Math.sin(lon);
        const y0 = -radius * sinLat;
        const z0 = radius * cosLat * Math.cos(lon);

        const y1 = y0 * cosTilt - z0 * sinTilt;
        const z1 = y0 * sinTilt + z0 * cosTilt;
        const x1 = x0;

        if (z1 > -radius * 0.05) {
          const depthFactor = (z1 + radius * 0.05) / (radius * 1.05);
          const px = cx + x1;
          const py = cy + y1;

          const topAura = Math.max(0, 1 - Math.abs(y1 + radius * 0.4) / (radius * 0.9));
          const dotRadius = Math.max(0.75, 1.2 + depthFactor * 0.95 + topAura * 0.45);

          // Deep, saturated violet dots for crisp visibility on white
          let r = 109;
          let g = 40;
          let b = 217;
          let alpha = Math.min(1, 0.4 + depthFactor * 0.6);

          if (topAura > 0.45) {
            // Illuminated by the atmospheric crest in electric magenta-violet
            r = 192;
            g = 38;
            b = 211;
            alpha = Math.min(1, alpha + 0.25);
          } else {
            // Saturated deep violet
            r = Math.round(109 + 25 * (1 - depthFactor));
            g = Math.round(40 + 35 * (1 - depthFactor));
            b = Math.round(217 + 25 * (1 - depthFactor));
          }

          ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha.toFixed(2) + ")";
          ctx.beginPath();
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Draw Pulsing Hub Nodes on Global Centers in Violet/Magenta
      pulseNodes.forEach((node) => {
        const lat = (node.lat * Math.PI) / 180;
        const lon = (node.lon * Math.PI) / 180 + rot;
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
          const pulse = (Math.sin(time * 0.004 + node.phase) + 1) * 0.5;

          ctx.strokeStyle = "rgba(168, 85, 247, " + (0.9 * (1 - pulse)).toFixed(2) + ")";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + pulse * 6.5, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#7c3aed";
          ctx.beginPath();
          ctx.arc(px, py, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore(); // Restore clip

      // 7. SIGNATURE ELECTRIC PURPLE ATMOSPHERIC CRESCENT HORIZON
      ctx.save();
      // Outer soft atmospheric glow
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, Math.PI * 0.84, Math.PI * 2.16);
      ctx.lineWidth = 16;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 35;
      ctx.stroke();

      // Sharp electric violet arc
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, Math.PI * 0.82, Math.PI * 2.18);
      ctx.lineWidth = 5.5;
      ctx.strokeStyle = "rgba(192, 38, 211, 0.95)";
      ctx.shadowColor = "#7c3aed";
      ctx.shadowBlur = 24;
      ctx.stroke();

      // Brilliant top magenta highlight crest
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 0.5, Math.PI * 1.05, Math.PI * 1.95);
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = "rgba(217, 70, 239, 0.95)";
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
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent" />
    </div>
  );
}
