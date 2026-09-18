"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

const POSTERS = [
  {
    id: 1,
    src: "/assets/creative-minds-poster-1.jpg",
    alt: "The Power of Creative Minds",
  },
  {
    id: 2,
    src: "/assets/creative-minds-poster-2.jpg",
    alt: "More Than Just A Vision 2026 - Cyberpunk AR Visor",
  },
  {
    id: 3,
    src: "/assets/creative-minds-poster-3.jpg",
    alt: "The Art of Think Different - Algora Creative Studio",
  },
  {
    id: 4,
    src: "/assets/creative-minds-poster-4.jpg",
    alt: "Think Deeper - Algora Creative Studio Iceberg",
  },
  {
    id: 5,
    src: "/assets/creative-minds-poster-5.jpg",
    alt: "Powers Shape A Brighter Tomorrow",
  },
  {
    id: 6,
    src: "/assets/creative-minds-poster-6.jpg",
    alt: "Graphic Design Is My Passion - World Graphic Day",
  },
  {
    id: 7,
    src: "/assets/creative-minds-poster-7.jpg",
    alt: "Bloom Deeper - Soft Pink Cherry Blossom",
  },
  {
    id: 8,
    src: "/assets/creative-minds-poster-8.jpg",
    alt: "Ideas Are Shaped Through Strategy, Design, and Execution",
  },
];

export function CreativeMindsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 2) return;

      // Master ScrollTrigger timeline for buttery smooth presentation sequence
      const totalSteps = cards.length - 1;
      const scrollDistance = totalSteps * 950; // Fluid scroll distance per card

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1.2, // Buttery smooth dampening
        },
      });

      // Animate consecutive poster transitions
      for (let i = 0; i < totalSteps; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const startTime = i * 1.2;

        const isLastPosterTransition = i === totalSteps - 1;

        if (isLastPosterTransition) {
          // Special 3D Depth Zoom & Vertical Reveal for Poster 8 ("Ideas Are Shaped...")
          tl.to(
            currentCard,
            {
              scale: 1.25,
              yPercent: -30,
              opacity: 0,
              filter: "blur(16px)",
              ease: "power2.inOut",
              duration: 1,
            },
            startTime
          );

          tl.fromTo(
            nextCard,
            {
              xPercent: 0,
              yPercent: 60,
              scale: 0.5,
              opacity: 0,
              filter: "blur(14px)",
            },
            {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power3.out",
              duration: 1,
            },
            startTime
          );
        } else {
          // Standard buttery smooth horizontal slide for posters 1-7
          tl.to(
            currentCard,
            {
              xPercent: -120,
              scale: 0.88,
              opacity: 0,
              filter: "blur(10px)",
              ease: "power2.inOut",
              duration: 1,
            },
            startTime
          );

          tl.fromTo(
            nextCard,
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
            startTime
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="creative-minds"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#FFFFFF] text-black overflow-hidden select-none pointer-events-none"
    >
      {/* 100% Pure White (#FFFFFF) Canvas Stage - Borderless & Boxless */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-[#FFFFFF]">
        {POSTERS.map((poster, index) => (
          <div
            key={poster.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`absolute inset-0 m-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 will-change-transform z-10 ${
              index > 0 ? "opacity-0" : ""
            }`}
          >
            <div className="relative w-full flex items-center justify-center bg-[#FFFFFF]">
              <img
                src={poster.src}
                alt={poster.alt}
                className="w-auto h-auto max-h-[72vh] sm:max-h-[78vh] md:max-h-[82vh] max-w-full object-contain block mx-auto mix-blend-multiply"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
