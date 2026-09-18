"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

// Slide Item Interfaces
interface ImageSlide {
  id: number;
  type: "image";
  src: string;
  alt: string;
}

interface ArchCarouselSlideItem {
  id: number;
  type: "arch-carousel";
  alt: string;
}

type SlideItem = ImageSlide | ArchCarouselSlideItem;

const SLIDES: SlideItem[] = [
  {
    id: 1,
    type: "image",
    src: "/assets/creative-minds-poster-1.jpg",
    alt: "The Power of Creative Minds",
  },
  {
    id: 2,
    type: "image",
    src: "/assets/creative-minds-poster-2.jpg",
    alt: "More Than Just A Vision 2026 - Cyberpunk AR Visor",
  },
  {
    id: 3,
    type: "image",
    src: "/assets/creative-minds-poster-3.jpg",
    alt: "The Art of Think Different - Algora Creative Studio",
  },
  {
    id: 4,
    type: "image",
    src: "/assets/creative-minds-poster-4.jpg",
    alt: "Think Deeper - Algora Creative Studio Iceberg",
  },
  {
    id: 5,
    type: "image",
    src: "/assets/creative-minds-poster-5.jpg",
    alt: "Powers Shape A Brighter Tomorrow",
  },
  {
    id: 6,
    type: "image",
    src: "/assets/creative-minds-poster-6.jpg",
    alt: "Graphic Design Is My Passion - World Graphic Day",
  },
  {
    id: 7,
    type: "image",
    src: "/assets/creative-minds-poster-7.jpg",
    alt: "Bloom Deeper - Soft Pink Cherry Blossom",
  },
  {
    id: 8,
    type: "arch-carousel",
    alt: "3D Arch Carousel - Create Stunning AI Generated Visuals Instantly",
  },
  {
    id: 9,
    type: "image",
    src: "/assets/creative-minds-poster-8.jpg",
    alt: "Ideas Are Shaped Through Strategy, Design, and Execution",
  },
];

// Interactive 3D Arch Circular Ring Carousel Component
function ArchCarouselComponent({ scrollRotation = 0 }: { scrollRotation?: number }) {
  const [idleAngle, setIdleAngle] = useState(0);

  // Automatic smooth slow rotation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setIdleAngle((prev) => (prev + delta * 7) % 360); // 7 degrees per sec smooth rotation
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const cards = [
    { id: "c1", src: "/assets/cards/card-05-3d-webgl.png", title: "Fluid Holograms" },
    { id: "c2", src: "/assets/cards/card-03-automation.png", title: "Surreal Deserts" },
    { id: "c3", src: "/assets/cards/card-04-creative-direction.jpg", title: "Cyber Architecture" },
    { id: "c4", src: "/assets/cards/card-07-ai-llm.jpg", title: "Quantum Optics" },
    { id: "c5", src: "/assets/cards/card-08-motion.png", title: "Liquid Sculptures" },
    { id: "c6", src: "/assets/cards/card-09-brand-strategy.png", title: "Bio Intelligence" },
    { id: "c7", src: "/assets/cards/card-10-cloud.png", title: "Golden Horizons" },
    { id: "c8", src: "/assets/cards/card-11-mobile.png", title: "Neon Grids" },
    { id: "c9", src: "/assets/cards/card-12-nextgen.png", title: "Spatial Visors" },
    { id: "c10", src: "/assets/cards/card-06-fullstack.png", title: "Fullstack Architecture" },
  ];

  const count = cards.length;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#FFFFFF] select-none pointer-events-auto overflow-hidden px-4">
      {/* 3D Semi-Circular Arc Carousel of Orbiting Cards */}
      <div className="absolute top-[5%] sm:top-[3%] md:top-[2%] w-full max-w-5xl h-[320px] sm:h-[380px] flex items-center justify-center pointer-events-none">
        {cards.map((card, idx) => {
          const stepAngle = 360 / count;
          const totalAngle = idx * stepAngle + idleAngle + scrollRotation;

          // Normalize angle to [-180, 180]
          let norm = ((totalAngle + 180) % 360) - 180;

          const isVisible = Math.abs(norm) < 100;
          const rad = (norm * Math.PI) / 180;

          // Circular Arch Position Math
          const radius = 330;
          const x = Math.sin(rad) * radius;
          const y = -Math.cos(rad) * radius * 0.48 + radius * 0.22;

          const opacity = isVisible ? Math.max(0, 1 - Math.abs(norm) / 100) : 0;
          const scale = isVisible ? 0.72 + (1 - Math.abs(norm) / 100) * 0.35 : 0.5;

          return (
            <div
              key={card.id}
              className="absolute w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.12)] border border-black/10 bg-white will-change-transform transition-opacity duration-300"
              style={{
                transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotate(${norm.toFixed(1)}deg) scale(${scale.toFixed(2)})`,
                opacity: opacity.toFixed(2),
                zIndex: Math.round(100 - Math.abs(norm)),
              }}
            >
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl block select-none pointer-events-none"
              />
            </div>
          );
        })}
      </div>

      {/* Center Editorial Typography & Callouts (Reference Image 3) */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto mt-36 sm:mt-40 md:mt-44">
        <h2 className="font-bodoni font-normal text-3xl sm:text-5xl md:text-6xl text-[#090714] tracking-tight leading-[1.12]">
          Create Stunning AI Generated <br />
          <span className="font-bodoni italic font-normal text-neutral-800">
            Photos Instantly
          </span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-md mx-auto font-normal mt-3 leading-relaxed">
          Transform your ideas into breathtaking visuals with cutting-edge AI technology.
        </p>

        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#18181b] text-white hover:bg-black font-sans font-bold text-xs tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Generating Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* 3 Bottom Feature Points */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-center max-w-2xl w-full border-t border-black/10 pt-5">
          <div className="flex flex-col items-center">
            <h4 className="font-bodoni font-bold text-xs sm:text-sm text-[#090714]">
              Realistic Results
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">
              Photos that look professionally crafted
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bodoni font-bold text-xs sm:text-sm text-[#090714]">
              Fast Generation
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">
              Turn ideas into images in seconds
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bodoni font-bold text-xs sm:text-sm text-[#090714]">
              Diverse Styles
            </h4>
            <p className="font-sans text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">
              Choose from a wide range of artistic options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreativeMindsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 2) return;

      // Master ScrollTrigger timeline
      const totalSteps = cards.length - 1;
      const scrollDistance = totalSteps * 420; // 420px per slide transition

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.5,
        },
      });

      // Animate consecutive slide transitions
      for (let i = 0; i < totalSteps; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const startTime = i * 1.2;

        const isTransitionToLast = i === totalSteps - 1;

        if (isTransitionToLast) {
          // Slide 8 (3D Arch Carousel) -> Slide 9 ("Ideas Are Shaped Through...")
          // Arch Carousel zooms out & scale-fades, Slide 9 enters with 3D scale-up
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
          // Standard buttery smooth slide for slides 1-8
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
      {/* 100% Pure White (#FFFFFF) Canvas Stage */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-[#FFFFFF]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`absolute inset-0 m-auto w-full h-full flex items-center justify-center will-change-transform z-10 ${
              index > 0 ? "opacity-0" : ""
            }`}
          >
            {slide.type === "arch-carousel" ? (
              <ArchCarouselComponent />
            ) : (
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl h-full flex items-center justify-center px-4 bg-[#FFFFFF]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-auto h-auto max-h-[72vh] sm:max-h-[78vh] md:max-h-[82vh] max-w-full object-contain block mx-auto mix-blend-multiply"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
