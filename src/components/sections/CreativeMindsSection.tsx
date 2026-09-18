"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export function CreativeMindsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;
      if (!card1 || !card2 || !card3 || !sectionRef.current) return;

      // Master ScrollTrigger timeline for buttery smooth 3-poster presentation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2600", // Generous scroll distance for fluid motion
          pin: true,
          scrub: 1.2, // Buttery smooth dampening
        },
      });

      // TRANSITION 1: Card 1 -> Card 2 (Time: 0 -> 1)
      tl.to(
        card1,
        {
          xPercent: -120,
          scale: 0.88,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      tl.fromTo(
        card2,
        {
          xPercent: 120,
          scale: 0.88,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // TRANSITION 2: Card 2 -> Card 3 (Time: 1.2 -> 2.2)
      tl.to(
        card2,
        {
          xPercent: -120,
          scale: 0.88,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.inOut",
          duration: 1,
        },
        1.2
      );

      tl.fromTo(
        card3,
        {
          xPercent: 120,
          scale: 0.88,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut",
          duration: 1,
        },
        1.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="creative-minds"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FFFFFF] text-black overflow-hidden select-none pointer-events-none"
    >
      {/* 100% Uniform Pure White (#FFFFFF) Canvas Stage - Zero Borders, Zero Outlines, Zero Secondary Whites */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-[#FFFFFF]">
        {/* CARD 1: Creative Minds AI Master Poster */}
        <div
          ref={card1Ref}
          className="absolute inset-0 m-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 will-change-transform z-10"
        >
          <div className="relative w-full flex items-center justify-center bg-[#FFFFFF]">
            <img
              src="/assets/creative-minds-poster.jpg"
              alt="The Power of Creative Minds - Poster 1"
              className="w-auto h-auto max-h-[72vh] sm:max-h-[78vh] md:max-h-[82vh] max-w-full object-contain block mx-auto mix-blend-multiply"
            />
          </div>
        </div>

        {/* CARD 2: Cyber/Tech Vision 2026 AI Master Poster */}
        <div
          ref={card2Ref}
          className="absolute inset-0 m-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 will-change-transform z-10 opacity-0"
        >
          <div className="relative w-full flex items-center justify-center bg-[#FFFFFF]">
            <img
              src="/assets/creative-minds-poster-2.jpg"
              alt="More Than Just A Vision 2026 - Poster 2"
              className="w-auto h-auto max-h-[72vh] sm:max-h-[78vh] md:max-h-[82vh] max-w-full object-contain block mx-auto mix-blend-multiply"
            />
          </div>
        </div>

        {/* CARD 3: Graphic Design Is My Passion AI Master Poster */}
        <div
          ref={card3Ref}
          className="absolute inset-0 m-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 will-change-transform z-10 opacity-0"
        >
          <div className="relative w-full flex items-center justify-center bg-[#FFFFFF]">
            <img
              src="/assets/creative-minds-poster-3.jpg"
              alt="Graphic Design Is My Passion - Poster 3"
              className="w-auto h-auto max-h-[72vh] sm:max-h-[78vh] md:max-h-[82vh] max-w-full object-contain block mx-auto mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
