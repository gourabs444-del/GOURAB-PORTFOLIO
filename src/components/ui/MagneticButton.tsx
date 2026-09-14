"use client";

import React, { useRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  strength?: number;
  cursorText?: string;
  asChild?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  strength = 0.3,
  cursorText,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const magneticRef = useMagnetic<HTMLButtonElement>({ strength, ease: "power3.out" });
  const { playHover, playClick } = useAudioFeedback();

  // Combine refs
  const setRefs = (el: HTMLButtonElement | null) => {
    buttonRef.current = el;
    magneticRef.current = el;
  };

  const variantStyles = {
    primary: "bg-white text-black font-semibold hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] border border-transparent",
    secondary: "bg-surface-100 text-foreground hover:bg-surface-50 border border-white/10 hover:border-accent/40 shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
    outline: "bg-transparent text-foreground border border-white/20 hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-mist hover:text-white hover:bg-white/5",
    glass: "bg-white/[0.04] text-foreground backdrop-blur-md border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08]",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs tracking-wider uppercase",
    md: "px-6 py-3 text-xs tracking-widest uppercase font-mono",
    lg: "px-8 py-4 text-sm tracking-widest uppercase font-mono font-medium",
    icon: "p-3 aspect-square rounded-full",
  };

  return (
    <button
      ref={setRefs}
      onMouseEnter={() => playHover()}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
      data-cursor="pointer"
      data-cursor-text={cursorText}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95 select-none",
        size === "icon" ? "rounded-full" : "rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Subtle hover shimmer */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0" />
    </button>
  );
}
