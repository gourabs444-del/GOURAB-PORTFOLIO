"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

export function IdeasIntoImpact() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Layer A refs (Ideas Into Impact Hero)
  const heroLayerRef = useRef<HTMLDivElement | null>(null);
  const ascensionRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const shoulderBadgeRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const cardsTrackRef = useRef<HTMLDivElement | null>(null);

  // Slide 1 refs (Let's build something extraordinary together CTA)
  const ctaLayerRef = useRef<HTMLDivElement | null>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const ctaWatermarkRef = useRef<HTMLDivElement | null>(null);
  const ctaAuraRef = useRef<HTMLDivElement | null>(null);

  // Slide 2 refs (Crafting Experiences That Transcend Pixels & Code - Modern Display)
  const slide2LayerRef = useRef<HTMLDivElement | null>(null);
  const slide2ContentRef = useRef<HTMLDivElement | null>(null);
  const slide2WatermarkRef = useRef<HTMLDivElement | null>(null);
  const slide2AuraRef = useRef<HTMLDivElement | null>(null);

  // Slide 3 refs (White Background Editorial Manifesto Layer - Swiss/Bodoni on White)
  const slide3LayerRef = useRef<HTMLDivElement | null>(null);
  const slide3BgRef = useRef<HTMLDivElement | null>(null);
  const slide3ContentRef = useRef<HTMLDivElement | null>(null);

  const { playHover } = useAudioFeedback();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !stageRef.current) return;

      const isMobile = window.innerWidth < 768;

      // =========================================================================
      // STRICT 1:1 PROPORTIONAL SCRUB TIMELINE
      // Assemble -> 12-Card Carousel Loop -> Reverse Deassemble -> CTA Morph
      // =========================================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const leftItems = leftContentRef.current
        ? leftContentRef.current.querySelectorAll(".assemble-item")
        : [];
      const socialLabel = leftContentRef.current
        ? leftContentRef.current.querySelector(".social-label-anim")
        : null;
      const socialLine = leftContentRef.current
        ? leftContentRef.current.querySelector(".social-line-anim")
        : null;
      const socialIcons = leftContentRef.current
        ? leftContentRef.current.querySelectorAll(".social-icon-item")
        : [];
      const cardItems = cardsRef.current
        ? cardsRef.current.querySelectorAll(".service-card-anim")
        : [];

      if (ctaLayerRef.current) gsap.set(ctaLayerRef.current, { opacity: 0, pointerEvents: "none" });
      if (slide2LayerRef.current) gsap.set(slide2LayerRef.current, { opacity: 0, pointerEvents: "none" });
      if (slide3LayerRef.current) {
        gsap.set(slide3LayerRef.current, { opacity: 0, pointerEvents: "none" });
        const initialSlide3Items = slide3LayerRef.current.querySelectorAll(".slide3-assemble-item");
        if (initialSlide3Items.length > 0) {
          gsap.set(initialSlide3Items, { opacity: 0, y: isMobile ? 35 : 60, filter: "blur(10px)" });
        }
      }
      if (slide3BgRef.current) gsap.set(slide3BgRef.current, { opacity: 0, scale: 1.08, filter: "blur(12px)" });

      // -----------------------------------------------------------------------
      // Dynamic Center Spotlight: Cards in the middle are larger & fully colored;
      // all side/incoming/outgoing cards are faded and completely desaturated
      // -----------------------------------------------------------------------
      const updateCardSpotlight = () => {
        if (!cardsRef.current || !cardsTrackRef.current) return;
        const containerRect = cardsRef.current.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        // Tight focal radius focused specifically on the center card (~22% width)
        const focusRadius = Math.max(containerRect.width * 0.22, 160);

        const cardElements = cardsTrackRef.current.children;
        for (let i = 0; i < cardElements.length; i++) {
          const cardEl = cardElements[i] as HTMLElement;
          const inner = cardEl.querySelector<HTMLElement>(".card-inner-spotlight");
          if (!inner) continue;

          const cardRect = cardEl.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(centerX - cardCenterX);

          // Normalized distance: 0 at center, 1 at edge of focus radius
          const ratio = Math.min(Math.max(dist / focusRadius, 0), 1);

          // Cosine focus progress: 1.0 at center -> 0.0 at outer edges
          const rawProgress = Math.cos((ratio * Math.PI) / 2);
          // Tight power curve so only the exact middle card has full focus
          const tightFocus = Math.pow(rawProgress, 1.8);

          // Scale: Center is 1.04 (bada), Sides shrink to 0.68 (chota)
          const scale = 0.68 + tightFocus * 0.36;

          // Grayscale: Center is 0% (vivid color), Sides are 100% (completely desaturated!)
          const grayscale = (1 - tightFocus) * 100;

          // Opacity: Center is 1.0, Sides are 0.32 (faded into background)
          const opacity = 0.32 + tightFocus * 0.68;

          // Brightness: Center is 1.0, Sides are 0.55 (dimmed)
          const brightness = 0.55 + tightFocus * 0.45;

          inner.style.transform = `scale(${scale.toFixed(3)})`;
          inner.style.filter = `grayscale(${grayscale.toFixed(1)}%) brightness(${brightness.toFixed(2)})`;
          inner.style.opacity = `${opacity.toFixed(3)}`;
          inner.style.zIndex = tightFocus > 0.4 ? "30" : "1";

          if (tightFocus > 0.4) {
            inner.style.boxShadow = `0 24px 50px -10px rgba(0,0,0,0.7), 0 0 32px rgba(255,255,255,${(tightFocus * 0.35).toFixed(2)})`;
          } else {
            inner.style.boxShadow = "none";
          }
        }
      };

      tl.eventCallback("onUpdate", updateCardSpotlight);

      // Initial spotlight calculation
      requestAnimationFrame(() => {
        updateCardSpotlight();
      });

      window.addEventListener("resize", updateCardSpotlight);

      // -----------------------------------------------------------------------
      // 1. DEEP CINEMATIC ENTRANCE ASSEMBLE (Time: 0.0 -> 3.0)
      // Completes & unblurs 100% sharply as top sheet reveals the section
      // -----------------------------------------------------------------------

      // ASCENSION background typography (deep scale & blur)
      tl.fromTo(
        ascensionRef.current,
        {
          opacity: 0,
          scale: isMobile ? 1.5 : 2.0,
          y: isMobile ? 80 : 160,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 3.0,
          ease: "none",
        },
        0
      );

      // Portrait flying in from deep distance bottom-right (scale 0.55 -> 1, blur -> sharp, grayscale -> color)
      tl.fromTo(
        portraitRef.current,
        {
          opacity: 0,
          x: isMobile ? 100 : 240,
          y: isMobile ? 160 : 300,
          scale: 0.55,
          filter: "grayscale(100%) blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "grayscale(0%) blur(0px)",
          duration: 3.0,
          ease: "none",
        },
        0
      );

      // Floating Spec HUD at right shoulder (synced with portrait)
      if (shoulderBadgeRef.current) {
        tl.fromTo(
          shoulderBadgeRef.current,
          {
            opacity: 0,
            x: isMobile ? 30 : 60,
            y: 20,
            scale: 0.8,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 2.8,
            ease: "none",
          },
          0.1
        );
      }

      // Environmental Backlight Aura (deep expanding glow)
      tl.fromTo(
        auraRef.current,
        {
          opacity: 0,
          scale: 0.2,
        },
        {
          opacity: 0.9,
          scale: 1,
          duration: 3.0,
          ease: "none",
        },
        0
      );

      // Left Content items (headline, paragraph, availability status, CTA buttons from deep left)
      if (leftItems.length > 0) {
        tl.fromTo(
          leftItems,
          {
            opacity: 0,
            x: isMobile ? -70 : -160,
            y: 40,
            scale: 0.85,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.05,
            duration: 2.8,
            ease: "none",
          },
          0
        );
      }

      // "CONNECT WITH ME" label slide-in
      if (socialLabel) {
        tl.fromTo(
          socialLabel,
          {
            opacity: 0,
            x: isMobile ? -40 : -80,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 2.5,
            ease: "none",
          },
          0.1
        );
      }

      // Accent glowing line expands from left
      if (socialLine) {
        tl.fromTo(
          socialLine,
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 2.2,
            ease: "none",
          },
          0.2
        );
      }

      // 4 Social Icon Cards (LinkedIn, GitHub, Instagram, Gmail) - 3D Spring Pop & Stagger
      if (socialIcons.length > 0) {
        tl.fromTo(
          socialIcons,
          {
            opacity: 0,
            scale: 0.15,
            y: isMobile ? 35 : 55,
            rotate: -20,
            filter: "blur(8px)",
            transformOrigin: "center center",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            stagger: 0.09,
            duration: 2.8,
            ease: "none",
          },
          0.05
        );
      }

      // 12 Service Bento Cards Scale Assemble (starts small & blurred, gradually expands to original size synced at 3.0)
      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current,
          {
            opacity: 0,
            scale: 0.55,
            y: isMobile ? 50 : 90,
            filter: "blur(8px)",
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 3.0,
            ease: "none",
          },
          0
        );
      }

      if (cardItems.length > 0) {
        tl.fromTo(
          cardItems,
          {
            opacity: 0,
            scale: 0.85,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.02,
            duration: 2.8,
            ease: "none",
          },
          0
        );
      }

      // -----------------------------------------------------------------------
      // 12-CARD CONTINUOUS ROLLING SHOWCASE REEL (Time: 0.0 -> 7.8)
      // Starts rolling immediately from the very beginning (0.0) simultaneously
      // as the hero elements, boy portrait & typography assemble!
      // -----------------------------------------------------------------------
      if (cardsTrackRef.current) {
        tl.fromTo(
          cardsTrackRef.current,
          {
            xPercent: 20,
          },
          {
            xPercent: -75,
            duration: 7.8,
            ease: "none",
          },
          0
        );
      }

      // -----------------------------------------------------------------------
      // 3. SIMULTANEOUS CONVERGING DEASSEMBLE (Time: 7.8 -> 9.4)
      // As Card 12 finishes, all cards converge into one spot together
      // and deassemble simultaneously with hero elements
      // -----------------------------------------------------------------------

      if (cardItems.length > 0) {
        tl.to(
          cardItems,
          {
            scale: 0.1,
            opacity: 0,
            filter: "blur(10px)",
            stagger: {
              each: 0.02,
              from: "center",
            },
            duration: 1.5,
            ease: "power3.in",
          },
          7.8
        );
      }

      if (cardsTrackRef.current) {
        tl.to(
          cardsTrackRef.current,
          {
            scale: 0.2,
            opacity: 0,
            filter: "blur(12px)",
            duration: 1.5,
            ease: "power3.in",
          },
          7.8
        );
      }

      if (socialIcons.length > 0) {
        tl.to(
          socialIcons,
          {
            opacity: 0,
            scale: 0.15,
            y: 35,
            rotate: 20,
            filter: "blur(8px)",
            stagger: {
              each: 0.04,
              from: "end",
            },
            duration: 1.4,
            ease: "power2.in",
          },
          7.8
        );
      }

      if (socialLabel) {
        tl.to(
          socialLabel,
          {
            opacity: 0,
            x: isMobile ? -40 : -80,
            filter: "blur(6px)",
            duration: 1.4,
            ease: "none",
          },
          7.9
        );
      }

      if (leftItems.length > 0) {
        tl.to(
          leftItems,
          {
            opacity: 0,
            x: isMobile ? -70 : -160,
            y: 40,
            filter: "blur(6px)",
            stagger: {
              each: 0.03,
              from: "end",
            },
            duration: 1.5,
            ease: "none",
          },
          7.9
        );
      }

      tl.to(
        auraRef.current,
        {
          opacity: 0,
          scale: 0.2,
          duration: 1.5,
          ease: "none",
        },
        7.9
      );

      tl.to(
        portraitRef.current,
        {
          opacity: 0,
          x: isMobile ? 100 : 240,
          y: isMobile ? 140 : 280,
          scale: 0.55,
          filter: "grayscale(100%) blur(8px)",
          duration: 1.6,
          ease: "none",
        },
        7.9
      );

      if (shoulderBadgeRef.current) {
        tl.to(
          shoulderBadgeRef.current,
          {
            opacity: 0,
            x: isMobile ? 30 : 60,
            y: 20,
            scale: 0.8,
            filter: "blur(6px)",
            duration: 1.5,
            ease: "none",
          },
          7.9
        );
      }

      tl.to(
        ascensionRef.current,
        {
          opacity: 0,
          scale: isMobile ? 1.4 : 1.8,
          y: isMobile ? 70 : 160,
          filter: "blur(10px)",
          duration: 1.6,
          ease: "none",
        },
        7.9
      );

      tl.to(
        heroLayerRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "none",
        },
        9.1
      );

      // -----------------------------------------------------------------------
      // 4. SLIDE 1 ASSEMBLES: "Let's build something extraordinary together" (Time: 8.9 -> 10.3)
      // -----------------------------------------------------------------------
      if (ctaWatermarkRef.current) {
        tl.fromTo(
          ctaWatermarkRef.current,
          {
            xPercent: 6,
            opacity: 0,
          },
          {
            xPercent: -18,
            opacity: 1,
            duration: 2.2,
            ease: "none",
          },
          8.9
        );
      }

      if (ctaLayerRef.current) {
        tl.fromTo(
          ctaLayerRef.current,
          {
            opacity: 0,
            pointerEvents: "none",
          },
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.4,
            ease: "power2.out",
          },
          8.9
        );
      }

      if (ctaAuraRef.current) {
        tl.fromTo(
          ctaAuraRef.current,
          {
            opacity: 0,
            scale: 0.6,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          9.0
        );
      }

      if (ctaHeadingRef.current) {
        tl.fromTo(
          ctaHeadingRef.current,
          {
            opacity: 0,
            scale: 0.88,
            y: isMobile ? 25 : 45,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          9.1
        );
      }

      // HOLD SLIDE 1 (Time: 10.3 -> 11.4)
      tl.to({}, { duration: 1.1 }, 10.3);

      // -----------------------------------------------------------------------
      // 5. SLIDE 1 REVERSE ANIMATES OUT (Time: 11.4 -> 12.6)
      // -----------------------------------------------------------------------
      if (ctaHeadingRef.current) {
        tl.to(
          ctaHeadingRef.current,
          {
            opacity: 0,
            y: isMobile ? -30 : -55,
            scale: 0.94,
            filter: "blur(8px)",
            duration: 1.2,
            ease: "power2.in",
          },
          11.4
        );
      }

      if (ctaWatermarkRef.current) {
        tl.to(
          ctaWatermarkRef.current,
          {
            opacity: 0,
            xPercent: -30,
            duration: 1.2,
            ease: "none",
          },
          11.4
        );
      }

      if (ctaAuraRef.current) {
        tl.to(
          ctaAuraRef.current,
          {
            opacity: 0,
            scale: 0.3,
            duration: 1.2,
            ease: "none",
          },
          11.4
        );
      }

      if (ctaLayerRef.current) {
        tl.to(
          ctaLayerRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "none",
          },
          12.0
        );
      }

      // -----------------------------------------------------------------------
      // 6. SLIDE 2 ASSEMBLES: NEW FONT & NEW NEON PALETTE (Time: 12.2 -> 13.8)
      // "Crafting experiences that transcend pixels & code."
      // -----------------------------------------------------------------------
      if (slide2LayerRef.current) {
        tl.fromTo(
          slide2LayerRef.current,
          {
            opacity: 0,
            pointerEvents: "none",
          },
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.out",
          },
          12.2
        );
      }

      if (slide2AuraRef.current) {
        tl.fromTo(
          slide2AuraRef.current,
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          12.3
        );
      }

      if (slide2WatermarkRef.current) {
        tl.fromTo(
          slide2WatermarkRef.current,
          {
            xPercent: 8,
            opacity: 0,
          },
          {
            xPercent: -15,
            opacity: 1,
            duration: 2.2,
            ease: "none",
          },
          12.3
        );
      }

      const slide2Items = slide2ContentRef.current
        ? slide2ContentRef.current.querySelectorAll(".slide2-assemble-item")
        : [];

      if (slide2Items.length > 0) {
        tl.fromTo(
          slide2Items,
          {
            opacity: 0,
            y: isMobile ? 35 : 60,
            scale: 0.92,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 1.4,
            ease: "power3.out",
          },
          12.5
        );
      }

      // HOLD SLIDE 2 (Time: 13.8 -> 15.0)
      tl.to({}, { duration: 1.2 }, 13.8);

      // -----------------------------------------------------------------------
      // 7. SLIDE 2 REVERSE ANIMATES OUT (Time: 15.0 -> 16.2)
      // -----------------------------------------------------------------------
      if (slide2Items.length > 0) {
        tl.to(
          slide2Items,
          {
            opacity: 0,
            y: isMobile ? -30 : -55,
            scale: 0.94,
            filter: "blur(8px)",
            stagger: {
              each: 0.04,
              from: "end",
            },
            duration: 1.2,
            ease: "power2.in",
          },
          15.0
        );
      }

      if (slide2WatermarkRef.current) {
        tl.to(
          slide2WatermarkRef.current,
          {
            opacity: 0,
            xPercent: -30,
            duration: 1.2,
            ease: "none",
          },
          15.0
        );
      }

      if (slide2AuraRef.current) {
        tl.to(
          slide2AuraRef.current,
          {
            opacity: 0,
            scale: 0.3,
            duration: 1.2,
            ease: "none",
          },
          15.0
        );
      }

      if (slide2LayerRef.current) {
        tl.to(
          slide2LayerRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "none",
          },
          15.6
        );
      }

      // -----------------------------------------------------------------------
      // 8. SLIDE 3 ASSEMBLES: 3D LAVENDER RIPPLE IMAGE REVEALS FIRST (Time: 15.4 -> 18.6)
      // Background reveals first, and THEN the Thank You text gracefully animates in
      // -----------------------------------------------------------------------
      if (slide3LayerRef.current) {
        tl.fromTo(
          slide3LayerRef.current,
          {
            opacity: 0,
            pointerEvents: "none",
          },
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.8,
            ease: "none",
          },
          15.4
        );
      }

      // Step 1: Background image scales and fades in FIRST
      if (slide3BgRef.current) {
        tl.fromTo(
          slide3BgRef.current,
          {
            opacity: 0,
            scale: 1.08,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power2.out",
          },
          15.5
        );
      }

      // Step 2: Thank You text & CTAs assemble AFTER background image is fully revealed
      const allSlide3Items = slide3LayerRef.current
        ? slide3LayerRef.current.querySelectorAll(".slide3-assemble-item")
        : [];

      if (allSlide3Items.length > 0) {
        tl.fromTo(
          allSlide3Items,
          {
            opacity: 0,
            y: isMobile ? 35 : 60,
            scale: 0.94,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 1.5,
            ease: "power3.out",
          },
          16.9
        );
      }

      // -----------------------------------------------------------------------
      // 9. HOLD SLIDE 3 (Time: 18.6 -> 20.6)
      // -----------------------------------------------------------------------
      tl.to({}, { duration: 2.0 }, 18.6);

      return () => {
        window.removeEventListener("resize", updateCardSpotlight);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 12 Clean & Crisp White Capability Cards
  const services = [
    {
      num: "01",
      title: "Web Development",
      desc: "Modern, responsive and ultra high-performance web systems.",
      category: "FULLSTACK",
      color: {
        border: "border-neutral-200 hover:border-sky-400/80",
        bg: "bg-white",
        badge: "text-sky-700 bg-sky-50 border-sky-200",
        beam: "from-transparent via-sky-500 to-transparent",
        iconWrap: "text-sky-600 bg-sky-50 border border-sky-200",
        glowDot: "bg-sky-500 shadow-[0_0_8px_#0ea5e9]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "UI/UX & Design",
      desc: "Clean, human-centered and converting design systems.",
      category: "DESIGN",
      color: {
        border: "border-neutral-200 hover:border-purple-400/80",
        bg: "bg-white",
        badge: "text-purple-700 bg-purple-50 border-purple-200",
        beam: "from-transparent via-purple-500 to-transparent",
        iconWrap: "text-purple-600 bg-purple-50 border border-purple-200",
        glowDot: "bg-purple-500 shadow-[0_0_8px_#a855f7]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Intelligent Automation",
      desc: "Smart workflow engines to save time and scale fast.",
      category: "SYSTEMS",
      color: {
        border: "border-neutral-200 hover:border-amber-400/80",
        bg: "bg-white",
        badge: "text-amber-800 bg-amber-50 border-amber-200",
        beam: "from-transparent via-amber-500 to-transparent",
        iconWrap: "text-amber-600 bg-amber-50 border border-amber-200",
        glowDot: "bg-amber-500 shadow-[0_0_8px_#f59e0b]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Creative Direction",
      desc: "Tailored concepts that give digital brands an edge.",
      category: "BRANDING",
      color: {
        border: "border-neutral-200 hover:border-emerald-400/80",
        bg: "bg-white",
        badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
        beam: "from-transparent via-emerald-500 to-transparent",
        iconWrap: "text-emerald-600 bg-emerald-50 border border-emerald-200",
        glowDot: "bg-emerald-500 shadow-[0_0_8px_#10b981]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "3D Web & WebGL",
      desc: "Interactive spatial 3D shaders and immersive Three.js worlds.",
      category: "GRAPHICS",
      color: {
        border: "border-neutral-200 hover:border-rose-400/80",
        bg: "bg-white",
        badge: "text-rose-700 bg-rose-50 border-rose-200",
        beam: "from-transparent via-rose-500 to-transparent",
        iconWrap: "text-rose-600 bg-rose-50 border border-rose-200",
        glowDot: "bg-rose-500 shadow-[0_0_8px_#f43f5e]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      num: "06",
      title: "Fullstack Architecture",
      desc: "Robust backend engines, distributed APIs and low-latency data.",
      category: "ENGINEERING",
      color: {
        border: "border-neutral-200 hover:border-indigo-400/80",
        bg: "bg-white",
        badge: "text-indigo-700 bg-indigo-50 border-indigo-200",
        beam: "from-transparent via-indigo-500 to-transparent",
        iconWrap: "text-indigo-600 bg-indigo-50 border border-indigo-200",
        glowDot: "bg-indigo-500 shadow-[0_0_8px_#6366f1]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      num: "07",
      title: "AI & LLM Integration",
      desc: "Autonomous agentic pipelines, RAG systems & model orchestration.",
      category: "INTELLIGENCE",
      color: {
        border: "border-neutral-200 hover:border-teal-400/80",
        bg: "bg-white",
        badge: "text-teal-700 bg-teal-50 border-teal-200",
        beam: "from-transparent via-teal-500 to-transparent",
        iconWrap: "text-teal-600 bg-teal-50 border border-teal-200",
        glowDot: "bg-teal-500 shadow-[0_0_8px_#14b8a6]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 2a8 8 0 0 0-8 8c0 3.36 2.07 6.24 5 7.42V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.58c2.93-1.18 5-4.06 5-7.42a8 8 0 0 0-8-8z" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      ),
    },
    {
      num: "08",
      title: "Motion & Interactions",
      desc: "Kinetic typography, GSAP physics and 60fps micro-interactions.",
      category: "EXPERIENCE",
      color: {
        border: "border-neutral-200 hover:border-orange-400/80",
        bg: "bg-white",
        badge: "text-orange-700 bg-orange-50 border-orange-200",
        beam: "from-transparent via-orange-500 to-transparent",
        iconWrap: "text-orange-600 bg-orange-50 border border-orange-200",
        glowDot: "bg-orange-500 shadow-[0_0_8px_#f97316]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="m19 9-7 7-7-7" />
        </svg>
      ),
    },
    {
      num: "09",
      title: "Brand Strategy",
      desc: "Cohesive visual narratives that position products as market leaders.",
      category: "STRATEGY",
      color: {
        border: "border-neutral-200 hover:border-red-400/80",
        bg: "bg-white",
        badge: "text-red-700 bg-red-50 border-red-200",
        beam: "from-transparent via-red-500 to-transparent",
        iconWrap: "text-red-600 bg-red-50 border border-red-200",
        glowDot: "bg-red-500 shadow-[0_0_8px_#ef4444]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      num: "10",
      title: "Cloud Architecture",
      desc: "Serverless deployments, edge computing and high-availability stacks.",
      category: "INFRA",
      color: {
        border: "border-neutral-200 hover:border-blue-400/80",
        bg: "bg-white",
        badge: "text-blue-700 bg-blue-50 border-blue-200",
        beam: "from-transparent via-blue-500 to-transparent",
        iconWrap: "text-blue-600 bg-blue-50 border border-blue-200",
        glowDot: "bg-blue-500 shadow-[0_0_8px_#3b82f6]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
    },
    {
      num: "11",
      title: "Cross-Platform Mobile",
      desc: "Silky smooth React Native & Flutter apps that feel truly native.",
      category: "MOBILE",
      color: {
        border: "border-neutral-200 hover:border-lime-500/80",
        bg: "bg-white",
        badge: "text-lime-800 bg-lime-50 border-lime-200",
        beam: "from-transparent via-lime-500 to-transparent",
        iconWrap: "text-lime-700 bg-lime-50 border border-lime-200",
        glowDot: "bg-lime-500 shadow-[0_0_8px_#84cc16]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
    {
      num: "12",
      title: "Next-Gen Products",
      desc: "Turnkey software prototypes shipped with speed and polish.",
      category: "INNOVATION",
      color: {
        border: "border-neutral-200 hover:border-fuchsia-400/80",
        bg: "bg-white",
        badge: "text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200",
        beam: "from-transparent via-fuchsia-500 to-transparent",
        iconWrap: "text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-200",
        glowDot: "bg-fuchsia-500 shadow-[0_0_8px_#d946ef]",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  // 12 Single finite showcase cards
  const carouselCards = services;

  return (
    <div
      ref={containerRef}
      id="impact-scroll-stage"
      className="relative w-full h-[600vh] bg-[#020204] text-white select-none border-t border-white/[0.08]"
    >
      {/* Sticky Fullscreen Pinned Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pt-2 pb-2 sm:pt-3 sm:pb-3 transform-gpu"
      >
        {/* Studio Lighting Ambient Glows */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[600px] h-[500px] rounded-full blur-[140px] opacity-70 bg-[radial-gradient(ellipse_at_top,_rgba(147,51,234,0.25)_0%,_rgba(124,58,237,0.1)_40%,_transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[120px] opacity-40 bg-[radial-gradient(circle,_rgba(99,102,241,0.15)_0%,_transparent_70%)]"
          aria-hidden="true"
        />

        {/* Top Laser Accent Line */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c4b5fd]/60 to-transparent shadow-[0_0_16px_rgba(167,139,250,0.5)]" />

        {/* ========================================================= */}
        {/* LAYER A: IDEAS INTO IMPACT HERO & 12 LOOPING CARES        */}
        {/* ========================================================= */}
        <div
          ref={heroLayerRef}
          className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full relative z-10 py-1 will-change-transform transform-gpu"
        >
          {/* ========================================================= */}
          {/* 1. HERO SECTION: ASSEMBLED CONTENT & PORTRAIT            */}
          {/* ========================================================= */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-6 flex-1 min-h-0">
            {/* Left Column: Assembling Headline & Interactive Actions */}
            <div
              ref={leftContentRef}
              className="w-full lg:w-[42%] flex flex-col justify-center z-20"
            >
              {/* Category Tag */}
              <div className="assemble-item flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#94a3b8] uppercase mb-3">
                <span className="w-5 h-[1.5px] bg-[#94a3b8]" />
                <span>CREATIVE DEVELOPER</span>
              </div>

              {/* Headline */}
              <h2 className="assemble-item font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-4">
                Ideas into <br />
                <span className="bg-gradient-to-r from-[#c084fc] via-[#818cf8] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(192,132,252,0.4)]">
                  Impact
                </span>
              </h2>

              {/* Sub-headline / Manifesto snippet */}
              <p className="assemble-item font-sans text-xs sm:text-sm text-[#94a3b8] font-normal leading-relaxed max-w-md mb-6">
                I design and build digital experiences that look good, work flawlessly, and make a difference.
              </p>

              {/* Action Buttons */}
              <div className="assemble-item flex flex-wrap items-center gap-3.5 mb-6">
                <a
                  href="#work"
                  onMouseEnter={() => playHover()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-[#c4b5fd] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onMouseEnter={() => playHover()}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:border-white/30 text-white font-sans font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 hover:bg-white/[0.08] active:scale-95 cursor-pointer"
                >
                  Get In Touch
                </a>
              </div>

              {/* Availability Status */}
              <div className="assemble-item flex items-center gap-2.5 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#22c55e]" />
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.15em] text-[#64748b] uppercase">
                  AVAILABLE FOR FREELANCE
                </span>
              </div>

              {/* Connect With Me Socials */}
              <div className="flex flex-col gap-3 mt-1">
                <div className="social-label-anim flex items-center gap-2.5 text-[11px] font-mono font-semibold tracking-[0.18em] text-[#94a3b8] uppercase will-change-transform">
                  <span className="social-line-anim w-5 h-[1.5px] bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                  <span className="text-neutral-400">CONNECT WITH ME</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* LinkedIn */}
                  <div className="social-icon-item will-change-transform">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-[#0a66c2]/70 hover:bg-[#0a66c2]/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(10,102,194,0.45)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible"
                      aria-label="LinkedIn"
                    >
                      {/* Tooltip Badge */}
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#0a66c2] text-white font-mono text-[9px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 shadow-md whitespace-nowrap z-30">
                        LinkedIn
                      </span>
                      {/* Ambient Glow Aura Behind */}
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(10,102,194,0.35)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <svg viewBox="0 0 24 24" width="20" height="20" className="relative z-10 group-hover:scale-115 group-hover:-rotate-3 transition-transform duration-300">
                        <path
                          fill="#0A66C2"
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74V10.13H5.06v8.37h2.8z"
                        />
                      </svg>
                      {/* Top Specular Sheen */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-2xl" />
                    </a>
                  </div>

                  {/* GitHub */}
                  <div className="social-icon-item will-change-transform">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-white/60 hover:bg-white/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible"
                      aria-label="GitHub"
                    >
                      {/* Tooltip Badge */}
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-800 border border-white/20 text-white font-mono text-[9px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 shadow-md whitespace-nowrap z-30">
                        GitHub
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <svg viewBox="0 0 24 24" width="20" height="20" className="relative z-10 group-hover:scale-115 group-hover:-rotate-3 transition-transform duration-300">
                        <path
                          fill="#FFFFFF"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-2xl" />
                    </a>
                  </div>

                  {/* Instagram */}
                  <div className="social-icon-item will-change-transform">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-[#e1306c]/70 hover:bg-[#e1306c]/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(225,48,108,0.45)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible"
                      aria-label="Instagram"
                    >
                      {/* Tooltip Badge */}
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#fd5949] to-[#d6249f] text-white font-mono text-[9px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 shadow-md whitespace-nowrap z-30">
                        Instagram
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(225,48,108,0.35)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <svg viewBox="0 0 24 24" width="20" height="20" className="relative z-10 group-hover:scale-115 group-hover:-rotate-3 transition-transform duration-300">
                        <defs>
                          <radialGradient id="impactIgGrad2" cx="20%" cy="105%" r="130%">
                            <stop offset="0%" stopColor="#fdf497" />
                            <stop offset="5%" stopColor="#fdf497" />
                            <stop offset="45%" stopColor="#fd5949" />
                            <stop offset="60%" stopColor="#d6249f" />
                            <stop offset="90%" stopColor="#285AEB" />
                          </radialGradient>
                        </defs>
                        <path
                          fill="url(#impactIgGrad2)"
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-2xl" />
                    </a>
                  </div>

                  {/* Gmail */}
                  <div className="social-icon-item will-change-transform">
                    <a
                      href="mailto:gourabs444@gmail.com"
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-[#ea4335]/70 hover:bg-[#ea4335]/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(234,67,53,0.45)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible"
                      aria-label="Email"
                    >
                      {/* Tooltip Badge */}
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#ea4335] text-white font-mono text-[9px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 shadow-md whitespace-nowrap z-30">
                        Email
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(234,67,53,0.35)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <svg viewBox="0 0 24 24" width="20" height="20" className="relative z-10 group-hover:scale-115 group-hover:-rotate-3 transition-transform duration-300">
                        <path fill="#4285F4" d="M20 18h2V7.5L18.5 10v7.5c0 .83.67 1.5 1.5 1.5z" />
                        <path fill="#34A853" d="M4 19h-2V7.5L5.5 10v7.5c0 .83-.67 1.5-1.5 1.5z" />
                        <path fill="#EA4335" d="M18.5 6H5.5L12 11l6.5-5z" />
                        <path
                          fill="#FBBC05"
                          d="M2 7.5V6c0-.83.67-1.5 1.5-1.5h1.5l7 5.5 7-5.5h1.5c.83 0 1.5.67 1.5 1.5v1.5L12 14 2 7.5z"
                        />
                      </svg>
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with ASCENSION & Flying Portrait */}
            <div className="w-full lg:w-[58%] relative flex items-center justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] pointer-events-none">
              {/* Environmental Backlight Glow */}
              <div
                ref={auraRef}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] lg:w-[760px] h-[320px] sm:h-[400px] lg:h-[500px] rounded-full blur-[70px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.42)_0%,_rgba(124,58,237,0.2)_40%,_transparent_70%)]"
                aria-hidden="true"
              />

              {/* Behind-the-Head Tall Condensed Editorial Typography */}
              <div
                ref={ascensionRef}
                className="absolute top-[18%] sm:top-[17%] lg:top-[17%] left-[52.8%] -translate-x-1/2 select-none z-10 opacity-90 will-change-transform pointer-events-none"
                aria-hidden="true"
              >
                <span className="block font-display font-black text-7xl sm:text-8xl md:text-9xl lg:text-[8.8rem] xl:text-[10.2rem] tracking-[0.05em] uppercase whitespace-nowrap bg-gradient-to-b from-white/90 via-white/40 to-transparent bg-clip-text text-transparent scale-y-[1.65] origin-bottom">
                  ASCENSION
                </span>
              </div>

              {/* Flying Portrait Image */}
              <div
                ref={portraitRef}
                className="relative z-20 w-full max-w-[520px] sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[780px] h-[420px] sm:h-[480px] lg:h-[540px] flex items-end justify-center will-change-transform"
              >
                <img
                  src="/assets/hero-hd.png"
                  alt="Gourab Creative Developer"
                  className="w-auto h-full max-h-[540px] object-contain object-bottom scale-[1.08] sm:scale-[1.12] lg:scale-[1.15] origin-bottom translate-y-[65px] sm:translate-y-[85px] lg:translate-y-[100px] translate-x-4 sm:translate-x-8 lg:translate-x-12 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] filter contrast-[1.05] brightness-[1.02]"
                />
              </div>

              {/* Right Shoulder Floating Editorial Paragraph (Beside shoulder, ultra-tiny white text) */}
              <div
                ref={shoulderBadgeRef}
                className="hidden sm:flex absolute right-[-12px] sm:right-[-4px] lg:right-0 xl:right-4 top-[64%] sm:top-[62%] lg:top-[59%] -translate-y-1/2 z-25 flex-col gap-1 max-w-[130px] sm:max-w-[145px] lg:max-w-[160px] will-change-transform pointer-events-none select-none text-left"
              >
                <div className="text-white/50">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                  </svg>
                </div>
                <p className="font-sans text-[7.5px] sm:text-[8px] lg:text-[8.5px] text-white/75 leading-[1.5] tracking-tight font-normal">
                  Architecting scalable digital systems, bespoke WebGL interactions, and high-performance creative interfaces engineered with precision, motion, and distinction.
                </p>
              </div>
            </div>
          </div>

          {/* 2. SERVICES 12-CARD SHOWCASE REEL */}
          <div
            ref={cardsRef}
            className="relative w-full overflow-hidden pb-2 sm:pb-3 mt-auto -translate-y-5 sm:-translate-y-9 lg:-translate-y-12 z-30 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]"
          >
            <div
              ref={cardsTrackRef}
              className="flex gap-4 sm:gap-5 w-max will-change-transform py-2 items-center"
            >
              {carouselCards.map((s, idx) => (
                <div
                  key={`${s.num}-${idx}`}
                  className="service-card-anim flex-shrink-0 w-[265px] sm:w-[295px] lg:w-[315px] will-change-transform py-2"
                >
                  <div
                    onMouseEnter={() => playHover()}
                    className={`card-inner-spotlight group relative flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white border ${s.color.border} shadow-[0_12px_32px_rgba(0,0,0,0.4)] cursor-default overflow-hidden will-change-transform transform-gpu origin-center transition-shadow duration-300 hover:border-neutral-400`}
                    style={{
                      transition: "transform 0.08s ease-out, filter 0.08s ease-out, opacity 0.08s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* Top Laser Accent Hover Beam */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${s.color.beam} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="flex flex-col gap-2.5">
                      {/* Header: Icon & Category Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color.iconWrap} transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                          {s.icon}
                        </div>

                        <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border ${s.color.badge} uppercase`}>
                          {s.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-900 tracking-tight transition-colors">
                        {s.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed line-clamp-2">
                        {s.desc}
                      </p>
                    </div>

                    {/* Bottom Status Tag */}
                    <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-medium">
                      <span>{s.num} // CAPABILITY</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.color.glowDot} opacity-75 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER B: "LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER"   */}
        {/* ASSEMBLES SIMULTANEOUSLY IN THE SAME PINNED VIEWPORT      */}
        {/* ========================================================= */}
        <div
          ref={ctaLayerRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center overflow-hidden z-20 px-6 sm:px-12 md:px-16 lg:px-24 select-none pointer-events-none"
        >
          {/* Ambient Warm Golden / Cyan Radial Lighting */}
          <div
            ref={ctaAuraRef}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.1)_0%,_rgba(56,189,248,0.06)_40%,_transparent_70%)]"
            aria-hidden="true"
          />

          {/* Background Single Sliding Watermark Text */}
          <div
            className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-full flex items-center justify-center select-none -z-0 overflow-visible"
            aria-hidden="true"
          >
            <div
              ref={ctaWatermarkRef}
              className="flex whitespace-nowrap text-white/[0.04] font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight uppercase leading-none will-change-transform"
            >
              <span>ARCHITECTING THE FUTURE &nbsp; CREATIVE ENGINEERING &nbsp; EXPERIENCES BEYOND PIXELS &nbsp; DIGITAL MASTERPIECES &nbsp; </span>
              <span>ARCHITECTING THE FUTURE &nbsp; CREATIVE ENGINEERING &nbsp; EXPERIENCES BEYOND PIXELS &nbsp; DIGITAL MASTERPIECES &nbsp; </span>
            </div>
          </div>

          {/* Foreground 3-Line Bodoni Headline */}
          <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto overflow-visible py-4">
            <h2
              ref={ctaHeadingRef}
              className="font-bodoni font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.4rem] text-white tracking-tight leading-[1.3] sm:leading-[1.34] text-center px-4 overflow-visible will-change-transform"
            >
              <span className="block whitespace-nowrap overflow-visible">Let&apos;s build</span>
              <span className="block whitespace-nowrap overflow-visible py-1">
                something{" "}
                <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent inline-block pr-4 pl-0.5 pt-1 pb-3 leading-[1.3] overflow-visible drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">
                  extraordinary
                </span>
              </span>
              <span className="block font-bodoni italic font-normal bg-gradient-to-r from-sky-200 via-cyan-300 to-teal-300 bg-clip-text text-transparent whitespace-nowrap overflow-visible pr-4 pl-0.5 pt-1 pb-3 leading-[1.3] drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                together.
              </span>
            </h2>

            <div className="mt-8 sm:mt-10 flex items-center gap-4">
              <a
                href="#contact"
                onMouseEnter={() => playHover()}
                className="pointer-events-auto inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.55)] active:scale-95 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER B2: SLIDE 2 - MODERN KINETIC DISPLAY & NEON PALETTE */}
        {/* ========================================================= */}
        <div
          ref={slide2LayerRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center overflow-hidden z-20 px-6 sm:px-12 md:px-16 lg:px-24 select-none pointer-events-none"
        >
          {/* Ambient Neon Violet & Emerald Radial Glow */}
          <div
            ref={slide2AuraRef}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.18)_0%,_rgba(16,185,129,0.1)_40%,_transparent_70%)]"
            aria-hidden="true"
          />

          {/* Background Sliding Watermark Text */}
          <div
            className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-full flex items-center justify-center select-none -z-0 overflow-visible"
            aria-hidden="true"
          >
            <div
              ref={slide2WatermarkRef}
              className="flex whitespace-nowrap text-white/[0.04] font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-tight uppercase leading-none will-change-transform"
            >
              <span>DISRUPT &nbsp; INNOVATE &nbsp; ELEVATE &nbsp; TRANSCEND &nbsp; </span>
              <span>DISRUPT &nbsp; INNOVATE &nbsp; ELEVATE &nbsp; TRANSCEND &nbsp; </span>
            </div>
          </div>

          {/* Foreground Kinetic Typography Content */}
          <div
            ref={slide2ContentRef}
            className="relative z-10 flex flex-col items-center max-w-5xl mx-auto overflow-visible py-4"
          >
            {/* Category Pill */}
            <div className="slide2-assemble-item inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-violet-300 uppercase mb-5 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              <span>INNOVATION &amp; MASTERY</span>
            </div>

            {/* Kinetic Display Headline (New Font: font-display / Sans, New Colors: Violet/Fuchsia & Emerald/Teal) */}
            <h2 className="slide2-assemble-item font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white tracking-tight leading-[1.1] sm:leading-[1.12] text-center uppercase will-change-transform mb-6">
              <span className="block whitespace-nowrap">Crafting experiences</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-[#c084fc] via-[#e879f9] to-[#f472b6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(192,132,252,0.4)]">
                that transcend
              </span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-[#34d399] via-[#2dd4bf] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(52,211,153,0.4)]">
                pixels &amp; code.
              </span>
            </h2>

            {/* Sub-headline */}
            <p className="slide2-assemble-item font-sans text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
              Bridging radical imagination with high-performance engineering to shape tomorrow&apos;s digital benchmarks.
            </p>

            {/* Action CTA */}
            <div className="slide2-assemble-item flex items-center gap-4">
              <a
                href="#contact"
                onMouseEnter={() => playHover()}
                className="pointer-events-auto inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER C: SLIDE 3 - LUXURY THANK YOU CANVAS & EDITORIAL    */}
        {/* ========================================================= */}
        <div
          ref={slide3LayerRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center overflow-hidden z-30 select-none pointer-events-none"
        >
          {/* AI-Generated 3D Lavender Ripple Sphere Background Canvas */}
          <div
            ref={slide3BgRef}
            className="absolute inset-0 w-full h-full will-change-transform z-0 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
              style={{
                backgroundImage: `url('/assets/thank-you-ripple.jpg')`,
              }}
            />

            {/* Subtle atmospheric vignette and light diffusion */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#e5e1fa]/40 via-transparent to-[#ded9f9]/50 pointer-events-none" />
          </div>

          {/* Foreground Editorial Text Content */}
          <div
            ref={slide3ContentRef}
            className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col items-center justify-center pointer-events-auto py-6"
          >
            {/* Ultra-Luxury Editorial Headline */}
            <h2 className="slide3-assemble-item text-center mb-3 sm:mb-4 max-w-4xl overflow-visible">
              <span className="block font-editorial font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-[#0a0717] tracking-[-0.04em] leading-[1.1]">
                Thank you for
              </span>
              <span className="block font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[1.06] bg-gradient-to-r from-[#1e1347] via-[#4338ca] to-[#7c3aed] bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(67,56,202,0.25)] py-0.5">
                your time &amp; vision.
              </span>
            </h2>

            {/* Tiny, Refined Sub-headline with Sophisticated Contrast */}
            <p className="slide3-assemble-item font-sans text-[11.5px] sm:text-[12.5px] text-[#4a426f] font-medium max-w-lg mx-auto leading-relaxed tracking-wider text-center">
              Whether you have a breakthrough project, want to collaborate on ambitious digital experiences, or simply want to connect — let&apos;s create something remarkable together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
