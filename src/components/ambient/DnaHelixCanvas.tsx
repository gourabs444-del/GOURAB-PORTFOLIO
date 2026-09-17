"use client";

import React, { useEffect, useRef } from "react";

interface DnaHelixCanvasProps {
  className?: string;
  opacity?: number; // 0 to 1
  colorProgress?: number; // 0 (Slide 1: amber-cyan) to 1 (Slide 2: violet-teal)
  speed?: number;
}

export function DnaHelixCanvas({
  className = "",
  opacity = 0.5,
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

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      angle += dt * 0.95 * speed;

      ctx.clearRect(0, 0, width, height);

      const currentOpacity = opacityRef.current;
      if (currentOpacity <= 0.001) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const p = Math.max(0, Math.min(1, colorProgressRef.current));

      // Slide 1 Colors: Amber (245, 158, 11) & Cyan (56, 189, 248)
      // Slide 2 Colors: Fuchsia (232, 121, 249) & Mint (52, 211, 153)
      const strand1Color = lerpColor(245, 158, 11, 232, 121, 249, p);
      const strand2Color = lerpColor(56, 189, 248, 52, 211, 153, p);

      const count = Math.min(Math.max(Math.floor(width / 30), 30), 56);
      const centerY = height * 0.5;
      const radius = Math.min(height * 0.32, 95);
      const focalLength = 320;
      const totalWidth = width * 1.18;
      const startX = (width - totalWidth) / 2;

      interface DepthItem {
        type: "rung" | "node1" | "node2";
        z: number;
        render: () => void;
      }

      const drawItems: DepthItem[] = [];

      // Calculate base pairs and nodes
      const pointsStrand1: { x: number; y: number; z: number; scale: number; alpha: number }[] = [];
      const pointsStrand2: { x: number; y: number; z: number; scale: number; alpha: number }[] = [];

      for (let i = 0; i < count; i++) {
        const u = i / (count - 1);
        const x = startX + u * totalWidth;

        // Wave phase along X with diagonal slope
        const wave = angle + u * Math.PI * 4.6;
        const waveYOffset = Math.sin(u * Math.PI * 2 + angle * 0.3) * (height * 0.04);

        // 3D coordinates for Strand 1
        const y1Offset = Math.sin(wave) * radius;
        const z1 = Math.cos(wave) * radius;
        const scale1 = focalLength / (focalLength + z1);
        const y1 = centerY + y1Offset * scale1 + waveYOffset;
        const alpha1 = Math.max(0.08, Math.min(0.9, (z1 / radius + 1) * 0.45 + 0.1)) * currentOpacity;

        pointsStrand1.push({ x, y: y1, z: z1, scale: scale1, alpha: alpha1 });

        // 3D coordinates for Strand 2 (opposite phase + PI)
        const y2Offset = Math.sin(wave + Math.PI) * radius;
        const z2 = Math.cos(wave + Math.PI) * radius;
        const scale2 = focalLength / (focalLength + z2);
        const y2 = centerY + y2Offset * scale2 + waveYOffset;
        const alpha2 = Math.max(0.08, Math.min(0.9, (z2 / radius + 1) * 0.45 + 0.1)) * currentOpacity;

        pointsStrand2.push({ x, y: y2, z: z2, scale: scale2, alpha: alpha2 });

        // Add Rung connecting Strand 1 and Strand 2
        const avgZ = (z1 + z2) / 2;
        const rungAlpha = Math.max(0.05, Math.min(0.65, (avgZ / radius + 1) * 0.3 + 0.08)) * currentOpacity;

        drawItems.push({
          type: "rung",
          z: avgZ,
          render: () => {
            // Draw connecting rung line
            const grad = ctx.createLinearGradient(x, y1, x, y2);
            grad.addColorStop(
              0,
              `rgba(${strand1Color.r}, ${strand1Color.g}, ${strand1Color.b}, ${alpha1 * 0.6})`
            );
            grad.addColorStop(
              0.5,
              `rgba(255, 255, 255, ${rungAlpha * 0.8})`
            );
            grad.addColorStop(
              1,
              `rgba(${strand2Color.r}, ${strand2Color.g}, ${strand2Color.b}, ${alpha2 * 0.6})`
            );

            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.strokeStyle = grad;
            ctx.lineWidth = Math.max(0.8, 1.6 * ((avgZ / radius + 1) * 0.5 + 0.3));
            ctx.stroke();

            // Intermediate micro-dots along rung
            const dotCount = 3;
            for (let d = 1; d <= dotCount; d++) {
              const f = d / (dotCount + 1);
              const dx = x;
              const dy = y1 + (y2 - y1) * f;
              const dz = z1 + (z2 - z1) * f;
              const dAlpha = Math.max(0.05, (dz / radius + 1) * 0.35) * currentOpacity;
              const dSize = Math.max(0.8, 1.6 * (focalLength / (focalLength + dz)));

              ctx.beginPath();
              ctx.arc(dx, dy, dSize, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${dAlpha * 0.9})`;
              ctx.fill();
            }
          },
        });

        // Add Strand 1 Node
        drawItems.push({
          type: "node1",
          z: z1,
          render: () => {
            const size = Math.max(1.8, 3.8 * scale1);
            // Outer soft glow
            ctx.beginPath();
            ctx.arc(x, y1, size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${strand1Color.r}, ${strand1Color.g}, ${strand1Color.b}, ${alpha1 * 0.25})`;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(x, y1, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${strand1Color.r}, ${strand1Color.g}, ${strand1Color.b}, ${alpha1})`;
            ctx.fill();

            // Bright specular center for close nodes
            if (z1 > 0) {
              ctx.beginPath();
              ctx.arc(x, y1, size * 0.45, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha1 * 0.9})`;
              ctx.fill();
            }
          },
        });

        // Add Strand 2 Node
        drawItems.push({
          type: "node2",
          z: z2,
          render: () => {
            const size = Math.max(1.8, 3.8 * scale2);
            // Outer soft glow
            ctx.beginPath();
            ctx.arc(x, y2, size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${strand2Color.r}, ${strand2Color.g}, ${strand2Color.b}, ${alpha2 * 0.25})`;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(x, y2, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${strand2Color.r}, ${strand2Color.g}, ${strand2Color.b}, ${alpha2})`;
            ctx.fill();

            // Bright specular center for close nodes
            if (z2 > 0) {
              ctx.beginPath();
              ctx.arc(x, y2, size * 0.45, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha2 * 0.9})`;
              ctx.fill();
            }
          },
        });
      }

      // Draw continuous backbones / ribbons for Strand 1 & Strand 2
      if (pointsStrand1.length > 1) {
        // Strand 1 Backbone
        ctx.beginPath();
        ctx.moveTo(pointsStrand1[0].x, pointsStrand1[0].y);
        for (let i = 1; i < pointsStrand1.length; i++) {
          const prev = pointsStrand1[i - 1];
          const curr = pointsStrand1[i];
          const mx = (prev.x + curr.x) / 2;
          const my = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
        }
        ctx.lineTo(pointsStrand1[pointsStrand1.length - 1].x, pointsStrand1[pointsStrand1.length - 1].y);
        ctx.strokeStyle = `rgba(${strand1Color.r}, ${strand1Color.g}, ${strand1Color.b}, ${0.28 * currentOpacity})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Strand 2 Backbone
        ctx.beginPath();
        ctx.moveTo(pointsStrand2[0].x, pointsStrand2[0].y);
        for (let i = 1; i < pointsStrand2.length; i++) {
          const prev = pointsStrand2[i - 1];
          const curr = pointsStrand2[i];
          const mx = (prev.x + curr.x) / 2;
          const my = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
        }
        ctx.lineTo(pointsStrand2[pointsStrand2.length - 1].x, pointsStrand2[pointsStrand2.length - 1].y);
        ctx.strokeStyle = `rgba(${strand2Color.r}, ${strand2Color.g}, ${strand2Color.b}, ${0.28 * currentOpacity})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Depth sort items (Z-index Painter's Algorithm: back to front)
      drawItems.sort((a, b) => a.z - b.z);
      drawItems.forEach((item) => item.render());

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
