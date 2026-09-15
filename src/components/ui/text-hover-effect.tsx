"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
  className,
  colors,
}: {
  text: string;
  duration?: number;
  className?: string;
  colors?: {
    stop0?: string;
    stop25?: string;
    stop50?: string;
    stop75?: string;
    stop100?: string;
  };
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Luxury Amber-Gold-Sky Color Palette
  const c = {
    stop0: colors?.stop0 || "#F59E0B",     // Amber
    stop25: colors?.stop25 || "#FBBF24",   // Warm Gold
    stop50: colors?.stop50 || "#FDE68A",   // Cream Glow
    stop75: colors?.stop75 || "#38BDF8",   // Sky Light
    stop100: colors?.stop100 || "#FFFFFF", // Diamond White
  };

  useEffect(() => {
    if (svgRef.current && cursor.x !== 0 && cursor.y !== 0) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1000 130"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none w-full h-full overflow-visible ${className || ""}`}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={c.stop0} />
              <stop offset="25%" stopColor={c.stop25} />
              <stop offset="50%" stopColor={c.stop50} />
              <stop offset="75%" stopColor={c.stop75} />
              <stop offset="100%" stopColor={c.stop100} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* 1. Muted Background Stroked Outline */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.2"
        className="font-display font-black stroke-neutral-700/60 fill-transparent uppercase tracking-tight"
        style={{
          fontSize: "62px",
          opacity: hovered ? 0.7 : 0.35,
          transition: "opacity 0.3s ease",
        }}
      >
        {text}
      </text>

      {/* 2. Motion Stroke Drawing Animation */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.2"
        className="font-display font-black fill-transparent stroke-neutral-400/80 uppercase tracking-tight"
        style={{ fontSize: "62px" }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 3.2,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* 3. Glowing Cursor Spotlight Gradient Layer */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="1.8"
        fill="url(#textGradient)"
        mask="url(#textMask)"
        className="font-display font-black uppercase tracking-tight drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]"
        style={{ fontSize: "62px" }}
      >
        {text}
      </text>
    </svg>
  );
};
