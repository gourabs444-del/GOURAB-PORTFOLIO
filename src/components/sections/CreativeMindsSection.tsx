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
          { opacity: 0, y: 30, scale: 0.96, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
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
      className="relative w-full min-h-[85vh] sm:min-h-screen py-10 sm:py-14 md:py-16 px-4 flex items-center justify-center bg-[#fafafa] text-black overflow-hidden select-none border-t border-b border-black/10"
    >
      {/* Centered Compact Poster Visual (Seamlessly blended with page background, no border/outline/shadow) */}
      <div
        ref={posterRef}
        className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-center my-auto"
      >
        <div className="relative w-full flex items-center justify-center bg-[#fafafa]">
          <img
            src="/assets/creative-minds-poster.jpg"
            alt="The Power of Creative Minds - Editorial Poster"
            className="w-auto h-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] max-w-full object-contain block mx-auto transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}
