"use client";

import React from "react";

export function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.038] mix-blend-screen"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="cinematic-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>
    </div>
  );
}
