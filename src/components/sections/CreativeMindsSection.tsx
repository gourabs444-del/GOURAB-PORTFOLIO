"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, Observer } from "@/lib/gsap";
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

interface ArchCarouselProps {
  scrollRotationRef?: React.MutableRefObject<number>;
}

// Zero-Re-Render 120FPS GPU Hardware Accelerated Sunrise/Sunset 3D Arch Carousel
function ArchCarouselComponent({ scrollRotationRef }: ArchCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cards = [
    { id: "c1", src: "/assets/cards/arc-card-1.jpg", title: "Ocean Coast" },
    { id: "c2", src: "/assets/cards/arc-card-2.jpg", title: "Vintage Car" },
    { id: "c3", src: "/assets/cards/arc-card-3.jpg", title: "Red Van Cliff" },
    { id: "c4", src: "/assets/cards/arc-card-4.jpg", title: "Pink Fluid Glass" },
    { id: "c5", src: "/assets/cards/arc-card-5.jpg", title: "Desert Tree" },
    { id: "c6", src: "/assets/cards/arc-card-6.jpg", title: "City Skyscraper" },
    { id: "c7", src: "/assets/cards/arc-card-7.jpg", title: "Tropical Leaves" },
    { id: "c8", src: "/assets/cards/arc-card-8.jpg", title: "Pink Swirl" },
    { id: "c9", src: "/assets/cards/arc-card-9.jpg", title: "Sage Leaf" },
    { id: "c10", src: "/assets/cards/arc-card-10.jpg", title: "Sunset Beach" },
  ];

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let currentRotation = 0;
    let velocity = 0;

    // Scroll wheel listener for interactive rotation
    // ALWAYS CLOCKWISE: Math.abs(e.deltaY) guarantees clockwise rotation regardless of scroll direction
    const handleWheel = (e: WheelEvent) => {
      velocity += Math.abs(e.deltaY) * 0.08;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    // Mobile touch swipe listener - ALWAYS CLOCKWISE
    let lastTouchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) lastTouchY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = Math.abs(lastTouchY - e.touches[0].clientY);
        lastTouchY = e.touches[0].clientY;
        velocity += deltaY * 0.14;
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const totalCards = cards.length;
    const angleStep = 360 / totalCards;

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Friction velocity decay (0.91 per frame)
      velocity *= 0.91;

      // Base idle rotation (12 deg/sec) + ALWAYS CLOCKWISE scroll velocity boost
      const rotationStep = delta * 12 + velocity * delta * 15;
      currentRotation = (currentRotation + rotationStep) % 360;

      // Add scrollRotationRef value driven by GSAP timeline scrub
      const scrollRot = scrollRotationRef?.current || 0;
      const totalRotation = currentRotation + scrollRot;

      const container = containerRef.current;
      if (container) {
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const rawAngle = i * angleStep + totalRotation;
          let normAngle = ((rawAngle + 180) % 360) - 180;
          const absAngle = Math.abs(normAngle);

          const rad = (normAngle * Math.PI) / 180;
          const rx = 520; // horizontal arc radius
          const ry = 300; // vertical arc radius
          const x = Math.sin(rad) * rx;
          const y = -Math.cos(rad) * ry - 25; // overhead arc height offset

          // Sunrise / Sunset Horizon Curve Math (Zero abrupt cuts)
          let opacity = 0;
          let scale = 0.35;

          if (absAngle <= 75) {
            // Peak Overhead Zone: Full opacity 1.0, scale 1.0 -> 0.78
            opacity = 1.0;
            scale = 0.78 + 0.22 * Math.cos((absAngle / 75) * (Math.PI / 2));
          } else if (absAngle <= 145) {
            // Horizon Sunrise / Sunset Zone (75deg to 145deg)
            const progress = (absAngle - 75) / 70; // 0.0 at horizon -> 1.0 below horizon
            // Smooth Cosine S-curve fade into twilight
            opacity = 0.5 * (1 + Math.cos(progress * Math.PI));
            // Sunrise / Sunset scaling curve
            scale = 0.78 * (1 - progress * 0.55);
          } else {
            opacity = 0;
            scale = 0.35;
          }

          el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0px) rotate(${normAngle.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          el.style.opacity = opacity.toFixed(3);
          el.style.zIndex = `${Math.round(100 - absAngle)}`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [cards.length, scrollRotationRef]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#FFFFFF] select-none pointer-events-auto overflow-hidden px-4">
      {/* Semicircular Arc of Orbiting Photo Cards */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div ref={containerRef} className="relative w-full max-w-6xl h-full flex items-center justify-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className="absolute w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-2xl xs:rounded-[22px] sm:rounded-3xl md:rounded-[28px] overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.12)] border border-black/5 bg-white will-change-transform transform-gpu"
              style={{
                left: "50%",
                top: "44%",
              }}
            >
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover rounded-2xl xs:rounded-[22px] sm:rounded-3xl md:rounded-[28px] block select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Center Editorial Typography & Callouts */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl lg:max-w-3xl mx-auto pt-6 sm:pt-8 md:pt-10">
        <h2 className="font-bodoni font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#090714] tracking-tight leading-[1.14]">
          Create Stunning AI Generated <br />
          <span className="font-bodoni italic font-normal text-[#111111]">
            Photos Instantly
          </span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-md mx-auto font-normal mt-3.5 sm:mt-4 leading-relaxed">
          Transform your ideas into breathtaking visuals with cutting-edge AI technology.
        </p>

        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#18181b] text-white hover:bg-black font-sans font-bold text-xs sm:text-sm tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Generating Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>

        {/* 3 Bottom Feature Points */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 text-center max-w-2xl w-full border-t border-black/10 pt-4 sm:pt-5">
          <div className="flex flex-col items-center">
            <h4 className="font-bodoni font-bold text-xs sm:text-sm md:text-base text-[#090714]">
              Realistic Results
            </h4>
            <p className="font-sans text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 leading-snug">
              Photos that look professionally crafted
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bodoni font-bold text-xs sm:text-sm md:text-base text-[#090714]">
              Fast Generation
            </h4>
            <p className="font-sans text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 leading-snug">
              Turn ideas into images in seconds
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bodoni font-bold text-xs sm:text-sm md:text-base text-[#090714]">
              Diverse Styles
            </h4>
            <p className="font-sans text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 leading-snug">
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
  const archRotationRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 2) return;

      // 8 total cards, with 2 extra scroll steps allocated for arch-carousel spinning
      // Total units = 9 (0 to 9)
      const totalUnits = 9;
      const scrollDistance = totalUnits * 650; // 5850px scroll height

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.2, // Zero-lag fluid scrub
          snap: {
            snapTo: (progress) => {
              const roundedStep = Math.round(progress * totalUnits);
              return roundedStep / totalUnits;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0.01,
            ease: "power1.out",
          },
        },
      });

      const animDuration = 0.8;

      // 1. Slides 0 to 5 (poster-1 through poster-7 -> arch-carousel)
      for (let i = 0; i < 6; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const startTime = i * 1.0;

        tl.to(
          currentCard,
          {
            xPercent: -100,
            scale: 0.94,
            opacity: 0,
            ease: "power1.inOut",
            duration: animDuration,
          },
          startTime
        );

        tl.fromTo(
          nextCard,
          {
            xPercent: 100,
            scale: 0.94,
            opacity: 0,
          },
          {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            duration: animDuration,
          },
          startTime
        );
      }

      // 2. Fast AI Cards Spinning Phase during 2 scroll steps (t = 6.0 to t = 8.0)
      const rotationProxy = { angle: 0 };
      tl.to(
        rotationProxy,
        {
          angle: 720, // 2 full 360-degree fast rotations as user scrolls
          ease: "none",
          duration: 2.0,
          onUpdate: () => {
            archRotationRef.current = rotationProxy.angle;
          },
        },
        6.0
      );

      // 3. Slide 6 (arch-carousel) -> Slide 7 (poster-8: Ideas Are Shaped...)
      const archCard = cards[6];
      const poster8Card = cards[7];

      tl.to(
        archCard,
        {
          xPercent: -100,
          scale: 0.94,
          opacity: 0,
          ease: "power1.inOut",
          duration: animDuration,
        },
        8.0
      );

      tl.fromTo(
        poster8Card,
        {
          xPercent: 100,
          scale: 0.94,
          opacity: 0,
        },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          duration: animDuration,
        },
        8.0
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
      {/* 100% Pure White (#FFFFFF) Canvas Stage */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-[#FFFFFF]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`absolute inset-0 m-auto w-full h-full flex items-center justify-center will-change-transform transform-gpu z-10 ${
              index > 0 ? "opacity-0" : ""
            }`}
          >
            {slide.type === "arch-carousel" ? (
              <ArchCarouselComponent scrollRotationRef={archRotationRef} />
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

