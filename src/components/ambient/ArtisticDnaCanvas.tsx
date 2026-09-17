"use client";

import React, { useEffect, useRef } from "react";

interface ArtisticDnaCanvasProps {
  className?: string;
  scrollProgress?: number;
}

export function ArtisticDnaCanvas({ className = "", scrollProgress }: ArtisticDnaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Rotation & Physics State
    let currentAngle = 0;
    let targetAngle = 0;
    let idleTime = 0;

    const calculateScrollProgress = () => {
      if (typeof scrollProgress === "number") {
        return Math.min(Math.max(scrollProgress, 0), 1);
      }

      const container = canvas.closest("[data-pinned-container]") || canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;
        if (scrollableHeight > 0) {
          return Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
        }
      }

      const rect = canvas.getBoundingClientRect();
      const totalDist = window.innerHeight + rect.height;
      const currentDist = window.innerHeight - rect.top;
      return Math.min(Math.max(currentDist / totalDist, 0), 1);
    };

    const handleScroll = () => {
      const progress = calculateScrollProgress();
      targetAngle = progress * Math.PI * 3.2;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Floating Cinematic Ambient Particles
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 0.8,
      z: Math.random() * 2 - 1,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.25 + 0.05,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const numNodes = 44;

    const render = () => {
      idleTime += 0.008;
      const diff = targetAngle - currentAngle;
      currentAngle += diff * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const strandLength = Math.max(width * 0.95, 980);
      const spacing = strandLength / numNodes;
      const startX = centerX - strandLength / 2;
      const amplitude = Math.min(height * 0.16, 75);

      // Deep Faded Ambient Center Radial Aura
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.42);
      bgGlow.addColorStop(0, "rgba(168, 85, 247, 0.06)");
      bgGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.03)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Render Ambient Background Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(idleTime * p.pulseSpeed * 100) * 0.002;

        if (p.x < -width / 2) p.x = width / 2;
        if (p.x > width / 2) p.x = -width / 2;
        if (p.y < -height / 2) p.y = height / 2;
        if (p.y > height / 2) p.y = -height / 2;

        const pX = centerX + p.x;
        const pY = centerY + p.y;
        const pAlpha = Math.max(0.02, Math.min(0.25, p.alpha));

        ctx.beginPath();
        ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${pAlpha})`;
        ctx.fill();
      });

      // 3D Point arrays
      const strandA: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
      const strandB: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      for (let i = 0; i < numNodes; i++) {
        const x = startX + i * spacing;
        // Combine scroll angle + micro idle wave
        const phase = currentAngle + i * 0.21 + Math.sin(idleTime + i * 0.05) * 0.15;

        const yA = centerY + Math.sin(phase) * amplitude;
        const zA = Math.cos(phase);

        const yB = centerY + Math.sin(phase + Math.PI) * amplitude;
        const zB = Math.cos(phase + Math.PI);

        // Soft faded perspective opacity
        const scaleA = 0.5 + (zA + 1) * 0.35;
        const alphaA = 0.08 + (zA + 1) * 0.28; // Max ~0.40 for subtle background fade

        const scaleB = 0.5 + (zB + 1) * 0.35;
        const alphaB = 0.08 + (zB + 1) * 0.28;

        strandA.push({ x, y: yA, z: zA, size: 4.2 * scaleA, alpha: alphaA });
        strandB.push({ x, y: yB, z: zB, size: 4.2 * scaleB, alpha: alphaB });

        // Draw connecting base pair rung lines
        const rungAlpha = Math.min(alphaA, alphaB) * 0.45;
        if (rungAlpha > 0.04) {
          ctx.beginPath();
          ctx.moveTo(x, yA);
          ctx.lineTo(x, yB);

          const lineGrad = ctx.createLinearGradient(x, yA, x, yB);
          lineGrad.addColorStop(0, `rgba(217, 70, 239, ${rungAlpha})`);
          lineGrad.addColorStop(0.5, `rgba(245, 158, 11, ${rungAlpha * 0.8})`);
          lineGrad.addColorStop(1, `rgba(56, 189, 248, ${rungAlpha})`);

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1.1;
          ctx.stroke();

          // Small illuminated mid-point connector dot
          const midY = (yA + yB) / 2;
          ctx.beginPath();
          ctx.arc(x, midY, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${rungAlpha * 0.9})`;
          ctx.fill();
        }
      }

      // Draw continuous backbone splines
      const drawSpline = (
        pts: typeof strandA,
        colorStart: string,
        colorMid: string,
        colorEnd: string,
        widthPx: number
      ) => {
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        const grad = ctx.createLinearGradient(pts[0].x, centerY, pts[pts.length - 1].x, centerY);
        grad.addColorStop(0, colorStart);
        grad.addColorStop(0.5, colorMid);
        grad.addColorStop(1, colorEnd);
        ctx.strokeStyle = grad;
        ctx.lineWidth = widthPx;
        ctx.stroke();
      };

      // Outer glow spline pass
      drawSpline(
        strandA,
        "rgba(217, 70, 239, 0.08)",
        "rgba(192, 132, 252, 0.25)",
        "rgba(217, 70, 239, 0.08)",
        4.0
      );
      drawSpline(
        strandB,
        "rgba(56, 189, 248, 0.08)",
        "rgba(45, 212, 191, 0.25)",
        "rgba(56, 189, 248, 0.08)",
        4.0
      );

      // Core sharp spline pass
      drawSpline(
        strandA,
        "rgba(217, 70, 239, 0.15)",
        "rgba(192, 132, 252, 0.45)",
        "rgba(217, 70, 239, 0.15)",
        1.6
      );
      drawSpline(
        strandB,
        "rgba(56, 189, 248, 0.15)",
        "rgba(45, 212, 191, 0.45)",
        "rgba(56, 189, 248, 0.15)",
        1.6
      );

      // Sort and render 3D glowing sphere nodes from back to front
      const allNodes = [
        ...strandA.map((n) => ({ ...n, type: "A" })),
        ...strandB.map((n) => ({ ...n, type: "B" })),
      ].sort((a, b) => a.z - b.z);

      allNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);

        if (node.type === "A") {
          ctx.fillStyle = `rgba(232, 121, 249, ${node.alpha})`;
          ctx.shadowColor = "rgba(217, 70, 239, 0.5)";
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${node.alpha})`;
          ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
        }
        ctx.shadowBlur = node.size * 2.2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen ${className}`}
    />
  );
}
