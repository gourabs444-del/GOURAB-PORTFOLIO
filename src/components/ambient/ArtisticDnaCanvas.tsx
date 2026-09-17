"use client";

import React, { useEffect, useRef } from "react";

interface ArtisticDnaCanvasProps {
  className?: string;
  scrollProgress?: number; // Optional direct controlled progress (0 to 1)
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
    let amplitude = 70; // Helix vertical spread

    const calculateScrollProgress = () => {
      if (typeof scrollProgress === "number") {
        return Math.min(Math.max(scrollProgress, 0), 1);
      }

      // Automatically find pinned container or fallback to section/window
      const container = canvas.closest("[data-pinned-container]") || canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;
        if (scrollableHeight > 0) {
          return Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
        }
      }

      // Window scroll fallback
      const rect = canvas.getBoundingClientRect();
      const totalDist = window.innerHeight + rect.height;
      const currentDist = window.innerHeight - rect.top;
      return Math.min(Math.max(currentDist / totalDist, 0), 1);
    };

    const handleScroll = () => {
      const progress = calculateScrollProgress();
      // Fixed 1.5 full rounds (540 degrees / 3*PI) bound strictly to full scroll path
      targetAngle = progress * Math.PI * 3;
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Number of base-pair steps along the helix
    const numNodes = 38;

    const render = () => {
      // Liquid-smooth lerp towards target scroll rotation
      // Stops completely when scroll stops, no endless spinning
      const diff = targetAngle - currentAngle;
      currentAngle += diff * 0.075;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const strandLength = Math.max(width * 0.9, 940);
      const spacing = strandLength / numNodes;
      const startX = centerX - strandLength / 2;

      // Soft ambient background aura
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, width * 0.45);
      bgGlow.addColorStop(0, "rgba(168, 85, 247, 0.08)");
      bgGlow.addColorStop(0.5, "rgba(56, 189, 248, 0.04)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Arrays for 3D projected points along Strand A and Strand B
      const strandA: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
      const strandB: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      for (let i = 0; i < numNodes; i++) {
        const x = startX + i * spacing;
        const phase = currentAngle + i * 0.22;

        // Strand A 3D coordinates
        const yA = centerY + Math.sin(phase) * amplitude;
        const zA = Math.cos(phase); // -1 (back) to +1 (front)

        // Strand B 3D coordinates (180° out of phase)
        const yB = centerY + Math.sin(phase + Math.PI) * amplitude;
        const zB = Math.cos(phase + Math.PI);

        // Perspective scale & opacity
        const scaleA = 0.55 + (zA + 1) * 0.38;
        const alphaA = 0.18 + (zA + 1) * 0.4;

        const scaleB = 0.55 + (zB + 1) * 0.38;
        const alphaB = 0.18 + (zB + 1) * 0.4;

        strandA.push({ x, y: yA, z: zA, size: 4.8 * scaleA, alpha: alphaA });
        strandB.push({ x, y: yB, z: zB, size: 4.8 * scaleB, alpha: alphaB });

        // Draw connecting base pair rung lines
        const rungAlpha = Math.min(alphaA, alphaB) * 0.5;
        if (rungAlpha > 0.07) {
          ctx.beginPath();
          ctx.moveTo(x, yA);
          ctx.lineTo(x, yB);

          const lineGrad = ctx.createLinearGradient(x, yA, x, yB);
          lineGrad.addColorStop(0, `rgba(217, 70, 239, ${rungAlpha})`);
          lineGrad.addColorStop(0.5, `rgba(245, 158, 11, ${rungAlpha * 0.85})`);
          lineGrad.addColorStop(1, `rgba(56, 189, 248, ${rungAlpha})`);

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Small illuminated mid-point connector dot
          const midY = (yA + yB) / 2;
          ctx.beginPath();
          ctx.arc(x, midY, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${rungAlpha * 0.95})`;
          ctx.fill();
        }
      }

      // Draw continuous backbone splines
      const drawSpline = (
        pts: typeof strandA,
        colorStart: string,
        colorMid: string,
        colorEnd: string
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
        ctx.lineWidth = 2.4;
        ctx.stroke();
      };

      // Strand A Spline (Fuchsia / Violet)
      drawSpline(
        strandA,
        "rgba(217, 70, 239, 0.35)",
        "rgba(192, 132, 252, 0.75)",
        "rgba(217, 70, 239, 0.35)"
      );

      // Strand B Spline (Cyan / Emerald)
      drawSpline(
        strandB,
        "rgba(56, 189, 248, 0.35)",
        "rgba(45, 212, 191, 0.75)",
        "rgba(56, 189, 248, 0.35)"
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
          ctx.shadowColor = "rgba(217, 70, 239, 0.85)";
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${node.alpha})`;
          ctx.shadowColor = "rgba(56, 189, 248, 0.85)";
        }
        ctx.shadowBlur = node.size * 2.8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
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
      className={`pointer-events-none absolute inset-0 w-full h-full z-0 ${className}`}
    />
  );
}
