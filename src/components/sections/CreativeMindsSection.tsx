"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export function CreativeMindsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (posterRef.current) {
        gsap.fromTo(
          posterRef.current,
          { opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="creative-minds"
      ref={sectionRef}
      className="relative w-full py-14 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 bg-white text-black overflow-hidden select-none border-t border-b border-black/10"
    >
      {/* Pure White Background Container without Black Side Margins */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(0,0,0,0.015)_0%,_transparent_75%)]" />

      {/* Main 2nd Poster Visual Asset Display */}
      <div
        ref={posterRef}
        className="relative max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-center"
      >
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.12)] border border-neutral-200/90 bg-white group transition-all duration-700">
          <img
            src="/assets/creative-minds-poster.jpg"
            alt="The Power of Creative Minds - Editorial Poster"
            className="w-full h-auto object-contain block mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}
