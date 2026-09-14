"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  maxOpacity: number;
}

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle drifting motes
    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2 - 0.05,
        opacity: Math.random() * 0.3,
        maxOpacity: Math.random() * 0.25 + 0.08,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.005;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric ambient radial glow following mouse
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.65
      );
      gradient.addColorStop(0, "rgba(229, 169, 60, 0.035)");
      gradient.addColorStop(0.35, "rgba(56, 189, 248, 0.018)");
      gradient.addColorStop(0.75, "rgba(10, 11, 15, 0.0)");
      gradient.addColorStop(1, "rgba(5, 5, 7, 0.0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Secondary static corner ambient glow
      const cornerGrad = ctx.createRadialGradient(
        width * 0.85,
        height * 0.15,
        50,
        width * 0.85,
        height * 0.15,
        width * 0.5
      );
      cornerGrad.addColorStop(0, "rgba(229, 169, 60, 0.02)");
      cornerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = cornerGrad;
      ctx.fillRect(0, 0, width, height);

      // Render subtle drifting particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 245, ${p.maxOpacity * (0.6 + 0.4 * Math.sin(time + i))})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
}
