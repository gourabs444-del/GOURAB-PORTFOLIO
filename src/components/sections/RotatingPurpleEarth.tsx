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

    // Background cosmic stars
    const numStars = 80;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.0004 + 0.0001,
      });
    }

    // High-tech pulsed connection hubs on cities (Image 2 style)
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

    // Initial orientation showing Americas & Europe like Image 2
    let rot = 0.75;
    const rotSpeed = 0.0026; // Silky smooth celestial planetary rotation
    const tilt = 19 * (Math.PI / 180); // 19-degree axial tilt
    const sinTilt = Math.sin(tilt);
    const cosTilt = Math.cos(tilt);

    const render = (time: number) => {
      rot += rotSpeed;

      ctx.clearRect(0, 0, width, height);

      // Sphere radius sized generously to match Image 2's prominent Earth curve
      const radius = Math.min(width * 0.42, height * 0.52, 420);
      const cx = width * 0.5;
      const cy = height * 0.53;

      // 1. Space Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha =
          star.alpha * (0.6 + 0.4 * Math.sin(time * star.speed * 10 + i));
        ctx.fillStyle = "rgba(216, 180, 254, " + currentAlpha.toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Cosmic Ambient Purple Nebula Aura behind the sphere
      const ambientGlow = ctx.createRadialGradient(
        cx,
        cy - radius * 0.25,
        radius * 0.35,
        cx,
        cy,
        radius * 1.65
      );
      ambientGlow.addColorStop(0, "rgba(168, 85, 247, 0.32)");
      ambientGlow.addColorStop(0.4, "rgba(126, 34, 206, 0.18)");
      ambientGlow.addColorStop(0.75, "rgba(88, 28, 135, 0.08)");
      ambientGlow.addColorStop(1, "transparent");

      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.65, 0, Math.PI * 2);
      ctx.fill();

      // 3. Dark Celestial Base Sphere
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.2,
        cy - radius * 0.45,
        radius * 0.08,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "#1c0f33");
      sphereGrad.addColorStop(0.45, "#0e061e");
      sphereGrad.addColorStop(0.85, "#06030e");
      sphereGrad.addColorStop(1, "#030107");

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip inside sphere
      ctx.clip();

      // 4. Subtle Orbital Latitudes Grid
      ctx.strokeStyle = "rgba(168, 85, 247, 0.07)";
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

      // 5. Render 3D Rotating Dot-Matrix Continents
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
          const dotRadius = Math.max(0.65, 1.1 + depthFactor * 0.9 + topAura * 0.45);

          let r = 240;
          let g = 215;
          let b = 255;
          let alpha = Math.min(1, 0.22 + depthFactor * 0.75);

          if (topAura > 0.45) {
            r = 255;
            g = 230;
            b = 255;
            alpha = Math.min(1, alpha + 0.22);
          } else {
            r = Math.round(180 + 60 * depthFactor);
            g = Math.round(140 + 80 * depthFactor);
            b = 255;
          }

          ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha.toFixed(2) + ")";
          ctx.beginPath();
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Draw Pulsing Hub Nodes on Global Tech/Finance Centers
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

          ctx.strokeStyle = "rgba(232, 121, 249, " + (0.85 * (1 - pulse)).toFixed(2) + ")";
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + pulse * 6.5, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore(); // Restore clip

      // 7. SIGNATURE ELECTRIC PURPLE ATMOSPHERIC CRESCENT HORIZON (Image 2 Key Visual Feature)
      ctx.save();
      // Outer soft atmospheric glow
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, Math.PI * 0.84, Math.PI * 2.16);
      ctx.lineWidth = 15;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.45)";
      ctx.shadowColor = "#c084fc";
      ctx.shadowBlur = 45;
      ctx.stroke();

      // Sharp electric violet arc
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, Math.PI * 0.82, Math.PI * 2.18);
      ctx.lineWidth = 5.5;
      ctx.strokeStyle = "rgba(217, 70, 239, 0.95)";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 28;
      ctx.stroke();

      // Brilliant top white highlight crest
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 0.5, Math.PI * 1.05, Math.PI * 1.95);
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "rgba(255, 245, 255, 0.95)";
      ctx.shadowColor = "#e879f9";
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
      {/* Deep Violet Cosmic Base */}
      <div className="absolute inset-0 bg-[#06030c] bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,_rgba(46,16,101,0.45)_0%,_rgba(15,8,30,0.85)_55%,_#05020A_100%)]" />

      {/* 60fps Real-Time High-Definition Rotating Earth Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block will-change-transform"
      />

      {/* Atmospheric Top & Bottom Vignettes */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#05020A] via-[#05020A]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#05020A] via-[#05020A]/85 to-transparent" />
    </div>
  );
}
