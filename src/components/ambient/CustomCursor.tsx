"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [cursorType, setCursorType] = useState<string>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const pos = { x: mouseX, y: mouseY };
    const dotPos = { x: mouseX, y: mouseY };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediate position for inner dot
      gsap.to(dotPos, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
        onUpdate: () => {
          gsap.set(dot, { x: dotPos.x, y: dotPos.y });
        },
      });

      // Smooth lag for outer follower ring
      gsap.to(pos, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,
        ease: "power3.out",
        onUpdate: () => {
          gsap.set(cursor, { x: pos.x, y: pos.y });
        },
      });

      // Detect cursor targets
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;

      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") || "pointer";
        const label = interactiveEl.getAttribute("data-cursor-text") || "";
        setCursorType(type);
        setCursorText(label);
      } else if (target?.closest("a, button, [role='button'], input, textarea, select")) {
        setCursorType("pointer");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  // Adjust cursor size & styling based on type
  let cursorSizeClass = "w-8 h-8 border border-white/30 bg-white/5";
  if (cursorType === "view" || cursorType === "explore") {
    cursorSizeClass = "w-24 h-24 bg-accent text-black font-semibold tracking-wider text-[11px] border-none shadow-[0_0_30px_rgba(229,169,60,0.5)]";
  } else if (cursorType === "play") {
    cursorSizeClass = "w-20 h-20 bg-white text-black font-bold text-[10px] border-none shadow-[0_0_25px_rgba(255,255,255,0.4)]";
  } else if (cursorType === "pointer") {
    cursorSizeClass = "w-12 h-12 border-accent/60 bg-accent/10 scale-110";
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-300 ease-out backdrop-blur-[1px] ${cursorSizeClass}`}
      >
        {cursorText ? (
          <span
            ref={textRef}
            className="font-mono uppercase select-none text-center px-2 animate-in fade-in duration-200"
          >
            {cursorText}
          </span>
        ) : null}
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isVisible && cursorType === "default" ? 1 : 0,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none transition-opacity duration-200"
      />
    </div>
  );
}
