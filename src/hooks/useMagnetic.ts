"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticOptions {
  strength?: number;
  ease?: string;
  duration?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>({
  strength = 0.35,
  ease = "power3.out",
  duration = 0.8,
}: MagneticOptions = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: duration,
        ease: ease,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: duration * 1.2,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, ease, duration]);

  return elementRef;
}
