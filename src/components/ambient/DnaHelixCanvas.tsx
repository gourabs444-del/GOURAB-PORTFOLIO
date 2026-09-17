"use client";

import React, { useEffect, useRef } from "react";

interface DnaHelixCanvasProps {
  className?: string;
  opacity?: number;
  colorProgress?: number; // 0 (Slide 1: Amber/Cyan) to 1 (Slide 2: Fuchsia/Teal)
  speed?: number;
}

export function DnaHelixCanvas({
  className = "",
  opacity = 0.85,
  colorProgress = 0,
  speed = 1,
}: DnaHelixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const opacityRef = useRef(opacity);
  const colorProgressRef = useRef(colorProgress);

  useEffect(() => {
    opacityRef.current = opacity;
  }, [opacity]);

  useEffect(() => {
    colorProgressRef.current = colorProgress;
  }, [colorProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let angle = 0;
    let lastTime = performance.now();

    // Helper: interpolate RGB color
    const lerpColor = (
      r1: number,
      g1: number,
      b1: number,
      r2: number,
      g2: number,
      b2: number,
      t: number
    ) => {
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);
      return { r, g, b };
    };

    // Text sequences for Strand 1 & Strand 2
    const strand1RawText = "DISRUPT • INNOVATE • ELEVATE • TRANSCEND • ARCHITECT • MASTERPIECE • FUTURE • BEYOND • ";
    const strand2RawText = "CREATIVE • ENGINEERING • VISION • PRECISION • PIXELS • CODE • EXTRAORDINARY • MOTION • ";

    const strand1Chars = strand1RawText.repeat(3).split("");
    const strand2Chars = strand2RawText.repeat(3).split("");

    const basePairs = ["A — T", "G — C", "T — A", "C — G", "0 — 1", "1 — 0"];

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Rotation speed
      angle += dt * 0.85 * speed;

      ctx.clearRect(0, 0, width, height);

      const currentOpacity = opacityRef.current;
      if (currentOpacity <= 0.001) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const p = Math.max(0, Math.min(1, colorProgressRef.current));

      // Slide 1 Colors: Amber/Gold (245, 158, 11) & Electric Cyan (56, 189, 248)
      // Slide 2 Colors: Fuchsia/Pink (232, 121, 249) & Neon Mint/Teal (45, 212, 191)
      const strand1Color = lerpColor(245, 158, 11, 232, 121, 249, p);
      const strand2Color = lerpColor(56, 189, 248, 45, 212, 191, p);

      const isMobile = width < 768;
      const centerY = height * 0.5;
      const radius = Math.min(height * 0.38, isMobile ? 85 : 130);
      const focalLength = isMobile ? 320 : 420;
      const totalWidth = width * 1.35;
      const startX = (width - totalWidth) / 2;

      const charCount = Math.min(Math.max(Math.floor(width / (isMobile ? 18 : 22)), 48), 84);
      const cycles = isMobile ? 3.2 : 4.5;

      interface RenderableItem {
        z: number;
        draw: () => void;
      }

      const renderQueue: RenderableItem[] = [];

      // Structure to hold points for connecting rungs
      interface StrandPoint {
        x: number;
        y: number;
        z: number;
        scale: number;
        char: string;
        color: { r: number; g: number; b: number };
        isStrand1: boolean;
        tangent: number;
      }

      const strand1Points: StrandPoint[] = [];
      const strand2Points: StrandPoint[] = [];

      for (let i = 0; i < charCount; i++) {
        const u = i / (charCount - 1);
        const x = startX + u * totalWidth;

        // Helix phase calculation
        const phase = angle + u * Math.PI * 2 * cycles;
        const waveTilt = Math.sin(u * Math.PI * 2 + angle * 0.2) * (height * 0.035);

        // Strand 1 calculations
        const y1Raw = Math.sin(phase) * radius;
        const z1 = Math.cos(phase) * radius;
        const scale1 = focalLength / (focalLength + z1);
        const y1 = centerY + y1Raw * scale1 + waveTilt;
        const char1 = strand1Chars[i % strand1Chars.length];
        const tangent1 = Math.atan2(Math.cos(phase) * radius * scale1 * 0.2, totalWidth / charCount);

        strand1Points.push({
          x,
          y: y1,
          z: z1,
          scale: scale1,
          char: char1,
          color: strand1Color,
          isStrand1: true,
          tangent: tangent1,
        });

        // Strand 2 calculations (offset by PI for double helix opposite strand)
        const phase2 = phase + Math.PI;
        const y2Raw = Math.sin(phase2) * radius;
        const z2 = Math.cos(phase2) * radius;
        const scale2 = focalLength / (focalLength + z2);
        const y2 = centerY + y2Raw * scale2 + waveTilt;
        const char2 = strand2Chars[i % strand2Chars.length];
        const tangent2 = Math.atan2(Math.cos(phase2) * radius * scale2 * 0.2, totalWidth / charCount);

        strand2Points.push({
          x,
          y: y2,
          z: z2,
          scale: scale2,
          char: char2,
          color: strand2Color,
          isStrand1: false,
          tangent: tangent2,
        });
      }

      // 1. Add Connecting Rungs at periodic intervals
      const rungStep = isMobile ? 3 : 2;
      for (let i = 0; i < charCount; i += rungStep) {
        const p1 = strand1Points[i];
        const p2 = strand2Points[i];
        if (!p1 || !p2) continue;

        const avgZ = (p1.z + p2.z) / 2;
        const normZ = (avgZ / radius + 1) * 0.5; // 0 (far) to 1 (close)
        const rungAlpha = Math.max(0.04, Math.min(0.45, normZ * 0.4 + 0.05)) * currentOpacity;
        const basePairLabel = basePairs[Math.floor(i / rungStep) % basePairs.length];

        renderQueue.push({
          z: avgZ,
          draw: () => {
            // Draw gradient laser connector between Strand 1 and Strand 2
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(
              0,
              `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${rungAlpha * 0.7})`
            );
            grad.addColorStop(
              0.5,
              `rgba(255, 255, 255, ${rungAlpha * 0.9})`
            );
            grad.addColorStop(
              1,
              `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${rungAlpha * 0.7})`
            );

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = Math.max(0.6, 1.4 * normZ);
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash

            // Connecting node dots
            const dotSize = Math.max(1.2, 2.8 * normZ);
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${rungAlpha * 1.2})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p2.x, p2.y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${rungAlpha * 1.2})`;
            ctx.fill();

            // Center base-pair micro label (e.g. A — T, G — C)
            if (normZ > 0.4 && !isMobile) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              ctx.save();
              ctx.translate(midX, midY);
              ctx.font = `700 ${Math.round(8 * normZ)}px monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = `rgba(255, 255, 255, ${rungAlpha * 0.75})`;
              ctx.fillText(basePairLabel, 0, 0);
              ctx.restore();
            }
          },
        });
      }

      // 2. Add Typography Characters to Render Queue for both strands
      const addCharToQueue = (p: StrandPoint) => {
        const normZ = (p.z / radius + 1) * 0.5; // 0 = far back, 1 = closest front
        // Dynamic opacity: close characters are brighter with luminous glow; far characters are darker
        const alpha = Math.max(0.08, Math.min(0.85, Math.pow(normZ, 1.2) * 0.78 + 0.07)) * currentOpacity;
        const fontSize = Math.round((isMobile ? 18 : 28) * p.scale);

        renderQueue.push({
          z: p.z,
          draw: () => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.tangent);

            ctx.font = `900 ${fontSize}px 'Cinzel', 'Syne', 'Playfair Display', sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Glow shadow for close/front characters
            if (normZ > 0.6) {
              ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.85})`;
              ctx.shadowBlur = 16 * normZ;
            }

            // Foreground Text Fill
            ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.fillText(p.char, 0, 0);

            // Bright specular highlight on top front characters
            if (normZ > 0.75) {
              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.65})`;
              ctx.fillText(p.char, 0, 0);
            }

            ctx.restore();
          },
        });
      };

      strand1Points.forEach(addCharToQueue);
      strand2Points.forEach(addCharToQueue);

      // 3. Depth Sorting: Back-to-Front Painter's Algorithm
      renderQueue.sort((a, b) => a.z - b.z);
      renderQueue.forEach((item) => item.draw());

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ willChange: "transform, opacity" }}
    />
  );
}
