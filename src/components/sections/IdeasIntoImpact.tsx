"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { VerticalCardsGridBackground } from "@/components/ambient/VerticalCardsGridBackground";
import { GourabSignatureSvg } from "@/components/ui/GourabSignatureSvg";

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
          scrub: 0.3,
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
      if (slide3LayerRef.current) gsap.set(slide3LayerRef.current, { opacity: 0, pointerEvents: "none" });
      if (slide3BgRef.current) gsap.set(slide3BgRef.current, { opacity: 0, scale: 1.08, filter: "blur(12px)" });

      // -----------------------------------------------------------------------
      // -----------------------------------------------------------------------
      // Dynamic Center Spotlight: Middle card is 100% normal & vivid;
      // all side cards are completely desaturated (100% grayscale) and faded (0.22 opacity)
      // -----------------------------------------------------------------------
      // -----------------------------------------------------------------------
      // Continuous Ultra-Fluid Center Spotlight:
      // Cards smoothly brighten, scale up & colorize as they approach center,
      // reach 100% normal at screen center, and smoothly fade/desaturate as they slide past.
      // -----------------------------------------------------------------------
      const updateCardSpotlight = () => {
        if (!cardsRef.current || !cardsTrackRef.current) return;
        const containerRect = cardsRef.current.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        const cardElements = cardsTrackRef.current.children;
        const count = cardElements.length;
        if (count === 0) return;

        // Dynamic spacing between cards (~320px)
        let cardSpacing = 320;
        if (count > 1) {
          const r0 = cardElements[0].getBoundingClientRect();
          const r1 = cardElements[1].getBoundingClientRect();
          cardSpacing = Math.abs(r1.left - r0.left) || 320;
        }

        // Focus radius across card spacing for ultra-smooth center card spotlight
        const focusRadius = cardSpacing * 1.3;

        // 1. Find closest card index to center for zIndex & shadow prioritization
        let minDist = Infinity;
        let closestIdx = 0;

        for (let i = 0; i < count; i++) {
          const cardEl = cardElements[i] as HTMLElement;
          const cardRect = cardEl.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(centerX - cardCenterX);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        }

        // 2. Apply continuous fluid spotlight to every card
        for (let i = 0; i < count; i++) {
          const cardEl = cardElements[i] as HTMLElement;
          const inner = cardEl.querySelector<HTMLElement>(".card-inner-spotlight");
          if (!inner) continue;

          const cardRect = cardEl.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(centerX - cardCenterX);

          // Normalized distance from center (0 at center -> 1 at focusRadius)
          const normDist = Math.min(dist / focusRadius, 1);
          
          // Smooth Cosine curve (1.0 at center -> 0.0 at focusRadius)
          const rawFocus = Math.cos((normDist * Math.PI) / 2);
          const tightFocus = Math.pow(rawFocus, 1.35);

          // Scale: 1.08 at center (middle card stays 100% same), 0.52 at sides (much smaller for dramatic motion)
          const scale = 0.52 + tightFocus * 0.56;

          // Grayscale: 0% (vivid full color) at center, 90% (desaturated) at sides
          const grayscale = (1 - tightFocus) * 90;

          // Opacity: 1.0 at center, 0.20 at sides
          const opacity = 0.20 + tightFocus * 0.80;

          // Brightness: 1.08 at center, 0.40 at sides
          const brightness = 0.40 + tightFocus * 0.68;

          inner.style.transform = `scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`;
          inner.style.filter = `grayscale(${grayscale.toFixed(1)}%) brightness(${brightness.toFixed(2)})`;
          inner.style.opacity = `${opacity.toFixed(3)}`;
          inner.style.zIndex = i === closestIdx ? "40" : `${Math.max(1, Math.round(tightFocus * 25))}`;

          if (tightFocus > 0.5) {
            const shadowAlpha = ((tightFocus - 0.5) / 0.5) * 0.85;
            inner.style.boxShadow = `0 28px 60px -10px rgba(0,0,0,${shadowAlpha.toFixed(2)}), 0 0 35px rgba(236,72,153,${(shadowAlpha * 0.35).toFixed(2)}), 0 0 15px rgba(255,255,255,${(shadowAlpha * 0.2).toFixed(2)})`;
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
            y: isMobile ? 15 : 25,
            filter: "blur(8px)",
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            scale: 1,
            y: isMobile ? -45 : -85,
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
      // 12-CARD CONTINUOUS ROLLING SHOWCASE REEL (Time: 0.0 -> 9.2)
      // Starts rolling immediately from the very beginning (0.0) simultaneously
      // as the hero elements assemble, continuing seamlessly without pausing
      // straight into the converging deassembly!
      // -----------------------------------------------------------------------
      if (cardsTrackRef.current) {
        tl.fromTo(
          cardsTrackRef.current,
          {
            xPercent: 20,
          },
          {
            xPercent: -86,
            duration: 9.2,
            ease: "none",
          },
          0
        );
      }

      // -----------------------------------------------------------------------
      // 3. SIMULTANEOUS CONVERGING DEASSEMBLE (Time: 7.8 -> 9.1)
      // Smooth continuous flow: hero elements & cards deassemble simultaneously
      // without any hesitation or dead pause
      // -----------------------------------------------------------------------

      if (cardItems.length > 0) {
        tl.to(
          cardItems,
          {
            scale: 0.12,
            opacity: 0,
            filter: "blur(10px)",
            stagger: {
              each: 0.015,
              from: "center",
            },
            duration: 1.3,
            ease: "power2.inOut",
          },
          7.8
        );
      }

      if (cardsTrackRef.current) {
        tl.to(
          cardsTrackRef.current,
          {
            scale: 0.25,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.3,
            ease: "power2.inOut",
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
              each: 0.03,
              from: "end",
            },
            duration: 1.3,
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
            duration: 1.3,
            ease: "power2.in",
          },
          7.8
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
              each: 0.025,
              from: "end",
            },
            duration: 1.3,
            ease: "power2.in",
          },
          7.8
        );
      }

      tl.to(
        auraRef.current,
        {
          opacity: 0,
          scale: 0.2,
          duration: 1.3,
          ease: "power2.in",
        },
        7.8
      );

      tl.to(
        portraitRef.current,
        {
          opacity: 0,
          x: isMobile ? 100 : 240,
          y: isMobile ? 140 : 280,
          scale: 0.55,
          filter: "grayscale(100%) blur(8px)",
          duration: 1.3,
          ease: "power2.in",
        },
        7.8
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
            duration: 1.3,
            ease: "power2.in",
          },
          7.8
        );
      }

      tl.to(
        ascensionRef.current,
        {
          opacity: 0,
          scale: isMobile ? 1.4 : 1.8,
          y: isMobile ? 70 : 160,
          filter: "blur(10px)",
          duration: 1.3,
          ease: "power2.in",
        },
        7.8
      );

      tl.to(
        heroLayerRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.6,
          ease: "none",
        },
        8.8
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
            pointerEvents: "none",
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
            duration: 0.8,
            ease: "power2.out",
          },
          11.8
        );
      }

      if (slide2AuraRef.current) {
        tl.fromTo(
          slide2AuraRef.current,
          {
            opacity: 0,
            scale: 0.7,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          11.8
        );
      }

      // Assemble & Scroll-driven parallax for 6-Column Vertical Cards Grid
      if (slide2WatermarkRef.current) {
        const cols = slide2WatermarkRef.current.querySelectorAll(".vertical-card-col");
        if (cols.length > 0) {
          // 1. ASSEMBLE ANIMATION (Time 11.6 -> 12.5) - Columns assemble immediately as Slide 2 appears
          cols.forEach((col, idx) => {
            const isOdd = idx % 2 === 0;
            tl.fromTo(
              col,
              {
                opacity: 0,
                y: isOdd ? (isMobile ? 40 : 70) : (isMobile ? -40 : -70),
                scale: 0.92,
                rotateZ: 0,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateZ: 0,
                duration: 0.9,
                ease: "power2.out",
              },
              11.6 + idx * 0.025
            );

            // 2. SCROLL-DRIVEN PARALLAX MOVEMENT (Time 12.2 -> 15.0) - Smooth movement on scroll
            tl.to(
              col,
              {
                y: isOdd ? (isMobile ? -80 : -180) : (isMobile ? 80 : 180),
                ease: "none",
                duration: 2.8,
              },
              12.2
            );
          });
        } else {
          tl.fromTo(
            slide2WatermarkRef.current,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.0, ease: "power2.out" },
            11.6
          );
        }
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

      // DISASSEMBLE ANIMATION (Time 15.0 -> 16.2) - Columns fly out top/bottom
      if (slide2WatermarkRef.current) {
        const cols = slide2WatermarkRef.current.querySelectorAll(".vertical-card-col");
        if (cols.length > 0) {
          cols.forEach((col, idx) => {
            const isOdd = idx % 2 === 0;
            tl.to(
              col,
              {
                opacity: 0,
                y: isOdd ? (isMobile ? -150 : -320) : (isMobile ? 150 : 320),
                scale: 0.75,
                filter: "blur(10px)",
                duration: 1.2,
                ease: "power2.in",
              },
              15.0 + idx * 0.04
            );
          });
        } else {
          tl.to(
            slide2WatermarkRef.current,
            {
              opacity: 0,
              y: -80,
              duration: 1.2,
              ease: "none",
            },
            15.0
          );
        }
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
            pointerEvents: "none",
            duration: 0.6,
            ease: "none",
          },
          15.6
        );
      }

      // -----------------------------------------------------------------------      // -----------------------------------------------------------------------      // -----------------------------------------------------------------------
      // 8. SLIDE 3: 2-PHASE LUXURY THANK YOU DISPLAY (Time: 15.4 -> 19.5)
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
            duration: 0.6,
            ease: "none",
          },
          15.4
        );
      }

      if (slide3BgRef.current) {
        tl.fromTo(
          slide3BgRef.current,
          {
            opacity: 0,
            scale: 1.05,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "none",
          },
          15.4
        );
      }

      if (slide3LayerRef.current) {
        const headerGroup = slide3LayerRef.current.querySelector(".slide3-header-group");
        const heyThere = slide3LayerRef.current.querySelector(".slide3-hey-there");
        const line2 = slide3LayerRef.current.querySelector(".slide3-line-2");
        const subtitle = slide3LayerRef.current.querySelector(".slide3-subtitle");
        const desc = slide3LayerRef.current.querySelector(".slide3-desc");
        const bottomGrid = slide3LayerRef.current.querySelector(".slide3-bottom-grid");

        // Set initial hidden positions for Phase 2 elements
        if (line2) gsap.set(line2, { opacity: 0, y: 12 });
        if (subtitle) gsap.set(subtitle, { opacity: 0, x: isMobile ? -35 : -75 });
        if (desc) gsap.set(desc, { opacity: 0, x: isMobile ? 35 : 75 });
        if (bottomGrid) gsap.set(bottomGrid, { opacity: 0, y: 30, pointerEvents: "none" });

        // Phase 1 (15.2 -> 16.2): Centered THANK YOU Header flies in smoothly from distance & lands dead-centered
        if (headerGroup) {
          tl.fromTo(
            headerGroup,
            {
              opacity: 0,
              scale: 0.6,
              y: isMobile ? 80 : 130,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: "none",
            },
            15.2
          );
        }

        if (heyThere) {
          tl.fromTo(
            heyThere,
            { opacity: 0, scale: 0.5, y: -25 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "none" },
            15.4
          );
        }

        // Phase 2 Scroll Animation (16.8 -> 18.6):
        // On further scroll: Header lifts UP from dead-center and scales down, side texts fly in, and bottom 3-column footer assembles!
        if (headerGroup) {
          tl.to(
            headerGroup,
            {
              y: isMobile ? -130 : -205,
              scale: isMobile ? 0.82 : 0.78,
              duration: 1.6,
              ease: "none",
            },
            16.8
          );
        }

        if (line2) {
          tl.to(
            line2,
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "none",
            },
            17.0
          );
        }

        if (subtitle) {
          tl.to(
            subtitle,
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: "none",
            },
            17.1
          );
        }

        if (desc) {
          tl.to(
            desc,
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: "none",
            },
            17.1
          );
        }

        if (bottomGrid) {
          tl.to(
            bottomGrid,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 1.3,
              ease: "none",
            },
            17.3
          );
        }
      }

      // -----------------------------------------------------------------------
      // 9. HOLD SLIDE 3 (Time: 18.6 -> 20.5)
      // -----------------------------------------------------------------------
      tl.to({}, { duration: 1.9 }, 18.6);

      return () => {
        window.removeEventListener("resize", updateCardSpotlight);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 12 Uniquely Styled AI & Generative Aesthetic Capability Cards (Inspired by Reference Designs)
  const services = [
    {
      num: "01",
      title: "Web Development",
      desc: "Modern, responsive and ultra high-performance web systems.",
      category: "FULLSTACK",
      color: {
        border: "border-sky-400/35 hover:border-sky-400/80",
        bg: "from-[#081b33] via-[#0f2e54] to-[#040c17]",
        badge: "text-sky-200 bg-sky-500/20 border-sky-400/35",
        beam: "from-transparent via-sky-400 to-transparent",
        iconWrap: "text-sky-300 bg-sky-500/20 border border-sky-400/35",
        glowDot: "bg-sky-400 shadow-[0_0_10px_#38bdf8]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Swiss Cyber Alps & 3D Tech Blueprint Grid */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.4)_0%,_rgba(14,165,233,0.15)_40%,_transparent_70%)]" />
            <div className="absolute bottom-0 right-0 w-40 h-32 opacity-35">
              <svg viewBox="0 0 200 120" className="w-full h-full text-sky-200" fill="currentColor">
                <polygon points="20,120 70,35 120,120" opacity="0.5" />
                <polygon points="75,120 130,15 185,120" opacity="0.85" />
                <polygon points="120,120 160,45 200,120" opacity="0.35" />
                <polyline points="130,15 138,40 125,48 142,62" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.9" />
                <circle cx="130" cy="15" r="4" fill="#38bdf8" />
              </svg>
            </div>
            {/* Tech Grid Pattern Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#040c17] via-[#040c17]/80 to-transparent" />
          </>
        ),
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
        border: "border-purple-400/35 hover:border-purple-400/80",
        bg: "from-[#2e094d] via-[#48126b] to-[#120324]",
        badge: "text-purple-200 bg-purple-500/20 border-purple-400/35",
        beam: "from-transparent via-purple-400 to-transparent",
        iconWrap: "text-purple-300 bg-purple-500/20 border border-purple-400/35",
        glowDot: "bg-purple-400 shadow-[0_0_10px_#c084fc]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Holographic Fluid Orb & Chromatic Waves */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-[radial-gradient(circle_at_80%_20%,_rgba(192,132,252,0.45)_0%,_rgba(236,72,153,0.25)_40%,_transparent_70%)]" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="holoFluidGraphic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="38" fill="url(#holoFluidGraphic)" opacity="0.65" filter="blur(3px)" />
                <path d="M15,50 C35,20 65,80 85,50" stroke="url(#holoFluidGraphic)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
                <circle cx="35" cy="35" r="6" fill="#ffffff" opacity="0.7" />
                <circle cx="65" cy="65" r="4" fill="#38bdf8" opacity="0.9" />
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-03-automation.png",
      title: "Intelligent Automation",
      desc: "Smart workflow engines to save time and scale fast.",
      category: "SYSTEMS",
      color: {
        border: "border-amber-400/35 hover:border-amber-400/80",
        bg: "from-[#380e2b] via-[#52153f] to-[#14040e]",
        badge: "text-amber-200 bg-amber-500/20 border-amber-400/35",
        beam: "from-transparent via-amber-400 to-transparent",
        iconWrap: "text-amber-300 bg-amber-500/20 border border-amber-400/35",
        glowDot: "bg-amber-400 shadow-[0_0_10px_#f59e0b]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Magenta & Sunset Orbs with Energy Lightning Arc */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_20%_20%,_rgba(244,63,94,0.4)_0%,_rgba(251,146,60,0.3)_45%,_transparent_70%)]" />
            <div className="absolute bottom-1 right-1 w-36 h-36 opacity-45">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="sunsetOrbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                <circle cx="65" cy="65" r="28" fill="url(#sunsetOrbGrad)" opacity="0.75" />
                <circle cx="35" cy="40" r="16" fill="#fb923c" opacity="0.6" />
                <path d="M20,80 Q50,40 85,25" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" fill="none" opacity="0.85" />
              </svg>
            </div>
          </>
        ),
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      num: "04",
      cardImg: "/assets/cards/card-04-creative-direction.jpg",
      title: "Creative Direction",
      desc: "Tailored concepts that give digital brands an edge.",
      category: "BRANDING",
      color: {
        border: "border-emerald-400/35 hover:border-emerald-400/80",
        bg: "from-[#063321] via-[#0d4f34] to-[#02140c]",
        badge: "text-emerald-200 bg-emerald-500/20 border-emerald-400/35",
        beam: "from-transparent via-emerald-400 to-transparent",
        iconWrap: "text-emerald-300 bg-emerald-500/20 border border-emerald-400/35",
        glowDot: "bg-emerald-400 shadow-[0_0_10px_#10b981]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Emerald Aurora & 3D Glass Prism Structure */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_80%_30%,_rgba(16,185,129,0.4)_0%,_rgba(52,211,153,0.18)_45%,_transparent_70%)]" />
            <div className="absolute -bottom-3 -right-3 w-36 h-36 opacity-35">
              <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300" fill="none" stroke="currentColor">
                <polygon points="50,10 90,80 10,80" strokeWidth="2" fill="rgba(16,185,129,0.15)" />
                <polygon points="50,28 78,74 22,74" strokeWidth="1.5" fill="rgba(52,211,153,0.25)" />
                <line x1="50" y1="10" x2="50" y2="80" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="50" cy="10" r="3" fill="#ffffff" />
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-05-3d-webgl.png",
      color: {
        border: "border-rose-400/35 hover:border-rose-400/80",
        bg: "from-[#3d0a21] via-[#5c0f32] to-[#14020a]",
        badge: "text-rose-200 bg-rose-500/20 border-rose-400/35",
        beam: "from-transparent via-rose-400 to-transparent",
        iconWrap: "text-rose-300 bg-rose-500/20 border border-rose-400/35",
        glowDot: "bg-rose-400 shadow-[0_0_10px_#f43f5e]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Crimson Laser Core & 3D Wireframe Cube Mesh */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_80%_20%,_rgba(244,63,94,0.42)_0%,_rgba(225,29,72,0.2)_45%,_transparent_70%)]" />
            <div className="absolute bottom-1 right-2 w-32 h-32 opacity-35">
              <svg viewBox="0 0 100 100" className="w-full h-full text-rose-300" fill="none" stroke="currentColor" strokeWidth="1.4">
                <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="rgba(244,63,94,0.12)" />
                <line x1="50" y1="15" x2="50" y2="95" strokeWidth="1.8" />
                <line x1="15" y1="35" x2="85" y2="75" />
                <line x1="15" y1="75" x2="85" y2="35" />
                <circle cx="50" cy="55" r="6" fill="#f43f5e" />
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-06-fullstack.png",
      color: {
        border: "border-slate-200/90 hover:border-indigo-500/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(79,70,229,0.18)]",
        bg: "from-[#ffffff] via-[#f8fafc] to-[#f1f5f9]",
        badge: "text-indigo-700 bg-indigo-50/90 border-indigo-200/80 font-bold shadow-2xs",
        beam: "from-transparent via-indigo-500 to-transparent",
        iconWrap: "text-indigo-600 bg-indigo-50 border border-indigo-200/80 shadow-xs",
        glowDot: "bg-indigo-600 shadow-[0_0_10px_#4f46e5]",
        textTitle: "text-slate-900 drop-shadow-none font-black",
        textDesc: "text-slate-600 font-medium",
        textBottom: "border-slate-200/90 text-slate-500 font-semibold",
        bgLayer: (
          <>
            {/* White Card Luxury Ambient Glow & Blueprint Grid */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.14)_0%,_rgba(59,130,246,0.08)_45%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />

            {/* Official Tech Stack Architecture SVG Diagram */}
            <div className="absolute -bottom-1 -right-1 w-44 h-44 pointer-events-none select-none">
              <svg viewBox="0 0 160 160" className="w-full h-full">
                <defs>
                  <filter id="whiteCardLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* Microservice Architecture Interconnect Circuit Lines */}
                <path d="M 30,120 L 70,120 L 95,85 L 130,85" fill="none" stroke="#6366f1" strokeWidth="1.8" opacity="0.3" />
                <path d="M 70,120 L 70,50 L 120,50" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 95,85 L 95,130 L 135,130" fill="none" stroke="#e535ab" strokeWidth="1.5" opacity="0.3" />

                {/* 1. Official Node.js Hexagon Logo */}
                <g transform="translate(15, 95)" filter="url(#whiteCardLogoGlow)">
                  <path fill="#339933" d="M20 3L3 12.8v19.4L20 42l17-9.8V12.8L20 3z" />
                  <path fill="#FFFFFF" d="M20 11c-4.2 0-6.8 2.3-6.8 5.6 0 2.8 1.8 4.4 4.9 5.1l1.5.4c1.6.3 2.3 1 2.3 1.8 0 1-.9 1.7-2.6 1.7-1.8 0-3.5-.7-4.7-1.9l-1.5 2c1.6 1.6 4.1 2.5 6.3 2.5 4.4 0 7.2-2.3 7.2-5.7 0-3.1-2.1-4.6-5.1-5.3l-1.5-.4c-1.6-.3-2.2-.8-2.2-1.7 0-.9.9-1.5 2.3-1.5 1.5 0 3 .5 4.1 1.6l1.4-1.9c-1.4-1.4-3.5-2-5.6-2z" />
                </g>

                {/* 2. Official React Orbital Atom Logo */}
                <g transform="translate(100, 25)" filter="url(#whiteCardLogoGlow)">
                  <circle cx="16" cy="16" r="3.2" fill="#0284c7" />
                  <g stroke="#0284c7" strokeWidth="1.8" fill="none">
                    <ellipse cx="16" cy="16" rx="14" ry="5.5" />
                    <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)" />
                    <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)" />
                  </g>
                </g>

                {/* 3. Official PostgreSQL Database Engine Logo */}
                <g transform="translate(90, 65)" filter="url(#whiteCardLogoGlow)">
                  <rect x="2" y="2" width="36" height="36" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                  <ellipse cx="20" cy="13" rx="11" ry="4" fill="#336791" opacity="0.85" />
                  <path d="M31 13v7c0 2.2-4.9 4-11 4s-11-1.8-11-4v-7" fill="none" stroke="#336791" strokeWidth="2" />
                  <path d="M31 20v7c0 2.2-4.9 4-11 4s-11-1.8-11-4v-7" fill="none" stroke="#336791" strokeWidth="2" />
                </g>

                {/* 4. Official TypeScript Badge Logo */}
                <g transform="translate(50, 35)" filter="url(#whiteCardLogoGlow)">
                  <rect x="0" y="0" width="28" height="28" rx="6" fill="#3178C6" />
                  <path fill="#ffffff" d="M11 12H7.5v2.5H11V22h3v-7.5h3.5V12H11zm12.5 3c-1-.6-2.2-1-3.3-1-1.4 0-2.2.6-2.2 1.5 0 .9.8 1.4 2.4 1.9 2.8 1 4.4 2.1 4.4 4.5 0 2.7-2.2 4.3-5.5 4.3-1.8 0-3.5-.5-4.9-1.4l1-2.4c1.1.7 2.6 1.2 3.9 1.2 1.5 0 2.4-.6 2.4-1.6 0-.9-.7-1.4-2.4-2-2.7-1-4.1-2.1-4.1-4.3 0-2.6 2.1-4.3 5.3-4.3 1.6 0 3.1.4 4.2 1l-1 2.6z" transform="scale(0.85) translate(0, 1)" />
                </g>

                {/* 5. Official GraphQL Hex Logo */}
                <g transform="translate(105, 110)" filter="url(#whiteCardLogoGlow)">
                  <polygon points="15,2 26,8 26,20 15,26 4,20 4,8" fill="none" stroke="#e535ab" strokeWidth="2" />
                  <polygon points="15,5 23,19 7,19" fill="none" stroke="#e535ab" strokeWidth="1.8" />
                  <circle cx="15" cy="5" r="2.5" fill="#e535ab" />
                  <circle cx="23" cy="19" r="2.5" fill="#e535ab" />
                  <circle cx="7" cy="19" r="2.5" fill="#e535ab" />
                </g>

                {/* Live Node Pulse Indicators */}
                <circle cx="95" cy="85" r="3.5" fill="#6366f1" className="animate-ping" opacity="0.7" />
                <circle cx="95" cy="85" r="3" fill="#6366f1" />
              </svg>
            </div>
          </>
        ),
      },
      icon: (
        /* Official Node.js Hexagon SVG Brand Logo */
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
          <path fill="#339933" d="M16 2L3 9.5v15L16 32l13-7.5v-15L16 2z" />
          <path fill="#FFFFFF" d="M16 8.5c-3.6 0-5.8 2-5.8 4.8 0 2.4 1.5 3.8 4.2 4.4l1.3.3c1.4.3 1.9.8 1.9 1.5 0 .8-.8 1.4-2.2 1.4-1.5 0-3-.6-4-1.6l-1.3 1.7c1.4 1.4 3.5 2.1 5.4 2.1 3.8 0 6.2-2 6.2-4.9 0-2.6-1.8-3.9-4.4-4.5l-1.3-.3c-1.3-.3-1.9-.7-1.9-1.4 0-.8.8-1.3 2-1.3 1.3 0 2.6.4 3.5 1.4l1.2-1.6c-1.2-1.2-3-1.7-4.8-1.7z" />
        </svg>
      ),
    },
    {
      num: "07",
      cardImg: "/assets/cards/card-07-ai-llm.jpg",
      title: "AI & LLM Integration",
      desc: "Autonomous agentic pipelines, RAG systems & model orchestration.",
      category: "INTELLIGENCE",
      color: {
        border: "border-teal-400/35 hover:border-teal-400/80",
        bg: "from-[#052b2e] via-[#0a4247] to-[#021213]",
        badge: "text-teal-200 bg-teal-500/20 border-teal-400/35",
        beam: "from-transparent via-teal-400 to-transparent",
        iconWrap: "text-teal-300 bg-teal-500/20 border border-teal-400/35",
        glowDot: "bg-teal-400 shadow-[0_0_10px_#14b8a6]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Quantum Synaptic Neural Plexus & Holographic Radar */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.4)_0%,_rgba(45,212,191,0.2)_45%,_transparent_70%)]" />
            <div className="absolute bottom-1 right-1 w-36 h-36 opacity-35">
              <svg viewBox="0 0 100 100" className="w-full h-full text-teal-300">
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" fill="none" />
                <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1.8" fill="rgba(20,184,166,0.1)" />
                <circle cx="50" cy="50" r="7" fill="#2dd4bf" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-08-motion.png",
      title: "Motion & Interactions",
      desc: "Kinetic typography, GSAP physics and 60fps micro-interactions.",
      category: "EXPERIENCE",
      color: {
        border: "border-orange-400/35 hover:border-orange-400/80",
        bg: "from-[#3b1704] via-[#572306] to-[#140701]",
        badge: "text-orange-200 bg-orange-500/20 border-orange-400/35",
        beam: "from-transparent via-orange-400 to-transparent",
        iconWrap: "text-orange-300 bg-orange-500/20 border border-orange-400/35",
        glowDot: "bg-orange-400 shadow-[0_0_10px_#f97316]",
        bgLayer: (
          <>
            {/* Graphic Artwork: Solar Orange Corona & Kinetic Swoop Curves */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_80%_30%,_rgba(249,115,22,0.42)_0%,_rgba(251,146,60,0.2)_45%,_transparent_70%)]" />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 opacity-35">
              <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300" fill="none" stroke="currentColor">
                <path d="M-10,90 Q50,10 110,60" strokeWidth="2.5" />
                <path d="M0,105 Q60,25 110,75" strokeWidth="1.8" strokeDasharray="4 3" />
                <path d="M10,120 Q70,40 110,90" strokeWidth="1.2" />
                <circle cx="70" cy="35" r="4" fill="#fb923c" />
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-09-security-engineering.png",
      title: "Security Engineering",
      desc: "Designing, building and protecting systems for a safer digital world.",
      category: "CYBERSECURITY",
      color: {
        border: "border-sky-400/40 hover:border-sky-400/90 shadow-[0_16px_36px_rgba(0,0,0,0.55)]",
        bg: "from-[#04132e] via-[#092659] to-[#020a1a]",
        badge: "text-sky-200 bg-sky-500/20 border-sky-400/40 font-bold uppercase backdrop-blur-md",
        beam: "from-transparent via-sky-400 to-transparent",
        iconWrap: "text-sky-300 bg-sky-500/20 border border-sky-400/40 shadow-xs backdrop-blur-md",
        glowDot: "bg-sky-400 shadow-[0_0_10px_#38bdf8]",
        textTitle: "text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]",
        textDesc: "text-slate-300/90 font-medium",
        textBottom: "border-white/10 text-white/70",
        bgLayer: (
          <>
            {/* Ambient Sapphire Glow & Blueprint Grid */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_80%_20%,_rgba(56,189,248,0.35)_0%,_rgba(37,99,235,0.15)_45%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

            {/* Top Micro Sub-Header */}
            <div className="absolute top-3 left-16 text-[8px] font-mono tracking-widest text-sky-300/60 uppercase select-none pointer-events-none">
              GUIDE IDEAS • SHAPE MARKETS
            </div>

            {/* Right Side Watermark Column */}
            <div className="absolute top-12 right-3 text-[7.5px] font-mono tracking-widest text-sky-200/15 flex flex-col gap-1 items-end uppercase select-none pointer-events-none">
              <span>IDEAS</span>
              <span>BRANDS</span>
              <span>MARKETS</span>
              <span>IMPACT</span>
            </div>

            {/* 3D Geometric "A" Strategy Blueprint Artwork */}
            <div className="absolute -bottom-1 -right-1 w-44 h-44 pointer-events-none select-none">
              <svg viewBox="0 0 160 160" className="w-full h-full">
                <defs>
                  <linearGradient id="brandA3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="60%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <filter id="brandAGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* Radar Crosshair Target Circles */}
                <circle cx="80" cy="80" r="55" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" fill="none" />
                <line x1="80" y1="15" x2="80" y2="145" stroke="#38bdf8" strokeWidth="0.8" opacity="0.25" />
                <line x1="15" y1="80" x2="145" y2="80" stroke="#38bdf8" strokeWidth="0.8" opacity="0.25" />

                {/* 3D "A" Logo Emblem */}
                <g filter="url(#brandAGlow)">
                  <polygon points="80,25 125,120 102,120 80,72 58,120 35,120" fill="url(#brandA3dGrad)" />
                  <polygon points="80,25 102,120 80,72" fill="#60a5fa" opacity="0.45" />
                  <line x1="52" y1="95" x2="108" y2="95" stroke="#ffffff" strokeWidth="2.5" opacity="0.95" />
                </g>

                {/* Glowing Target Node */}
                <circle cx="132" cy="120" r="4.5" fill="#38bdf8" className="animate-pulse" />
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-10-cloud.png",
      title: "Cloud Architecture",
      desc: "Serverless deployments, edge computing and high-availability stacks.",
      category: "INFRA",
      color: {
        border: "border-blue-400/40 hover:border-blue-400/90 shadow-[0_16px_36px_rgba(0,0,0,0.55)]",
        bg: "from-[#061838] via-[#0b295c] to-[#030e24]",
        badge: "text-blue-200 bg-blue-500/20 border-blue-400/40 font-bold uppercase backdrop-blur-md",
        beam: "from-transparent via-blue-400 to-transparent",
        iconWrap: "text-blue-300 bg-blue-500/20 border border-blue-400/40 shadow-xs backdrop-blur-md",
        glowDot: "bg-blue-400 shadow-[0_0_10px_#3b82f6]",
        textTitle: "text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]",
        textDesc: "text-slate-300/90 font-medium",
        textBottom: "border-white/10 text-white/70",
        bgLayer: (
          <>
            {/* Arctic Blue Ambient Glow & Isometric Grid */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.38)_0%,_rgba(96,165,250,0.15)_45%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

            {/* Top Micro Sub-Header */}
            <div className="absolute top-3 left-16 text-[8px] font-mono tracking-widest text-blue-300/60 uppercase select-none pointer-events-none">
              DEPLOY • SCALE • MONITOR
            </div>

            {/* 3D Glass Cloud & Dual Server Racks Artwork */}
            <div className="absolute -bottom-2 -right-2 w-48 h-48 pointer-events-none select-none">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <defs>
                  <linearGradient id="cloud3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <filter id="cloud3dGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Isometric Server Racks */}
                <g transform="translate(65, 80)">
                  {/* Top Server Slab */}
                  <polygon points="40,10 80,30 40,50 0,30" fill="#1e40af" stroke="#60a5fa" strokeWidth="1.2" opacity="0.9" />
                  <polygon points="0,30 40,50 40,62 0,42" fill="#1d4ed8" />
                  <polygon points="40,50 80,30 80,42 40,62" fill="#1e3a8a" />
                  <circle cx="20" cy="38" r="1.5" fill="#60a5fa" />
                  <circle cx="26" cy="41" r="1.5" fill="#60a5fa" />

                  {/* Bottom Server Slab */}
                  <g transform="translate(0, 22)">
                    <polygon points="40,10 80,30 40,50 0,30" fill="#1e40af" stroke="#60a5fa" strokeWidth="1.2" opacity="0.9" />
                    <polygon points="0,30 40,50 40,62 0,42" fill="#1d4ed8" />
                    <polygon points="40,50 80,30 80,42 40,62" fill="#1e3a8a" />
                    <circle cx="20" cy="38" r="1.5" fill="#38bdf8" />
                    <circle cx="26" cy="41" r="1.5" fill="#38bdf8" />
                  </g>
                </g>

                {/* Floating 3D Cloud Emblem */}
                <g transform="translate(45, 20)" filter="url(#cloud3dGlow)">
                  <path fill="url(#cloud3dGrad)" d="M52 35c0-11-9-20-20-20-8.5 0-16 5.3-18.7 13.1C10.5 29 8 32.5 8 37c0 6.6 5.4 12 12 12h32c7.7 0 14-6.3 14-14 0-7.2-5.5-13.2-12.6-13.9-.9-.1-1.4-.1-1.4-.1z" />
                  <path fill="#93c5fd" opacity="0.4" d="M32 17c9.5 0 17.5 6.7 19.3 16.1C49.9 33 48.5 33 47 33c-1.2 0-2.3.1-3.4.4-1.8-6.6-7.8-11.4-14.9-11.4-6.3 0-11.8 3.8-14 9.5C12.4 28 9.5 29 8.2 31c2-8 9.1-14 17.8-14z" />
                </g>

                {/* Floating Status Badges SVG Elements */}
                <g transform="translate(15, 30)">
                  <rect x="0" y="0" width="42" height="18" rx="5" fill="#0f172a" opacity="0.75" stroke="#3b82f6" strokeWidth="0.8" />
                  <text x="21" y="12" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif" textAnchor="middle">🌐 Edge</text>
                </g>

                <g transform="translate(100, 35)">
                  <rect x="0" y="0" width="70" height="18" rx="5" fill="#0f172a" opacity="0.75" stroke="#3b82f6" strokeWidth="0.8" />
                  <text x="35" y="12" fill="#bfdbfe" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">🛡️ High Avail.</text>
                </g>

                <g transform="translate(10, 85)">
                  <rect x="0" y="0" width="56" height="18" rx="5" fill="#0f172a" opacity="0.75" stroke="#3b82f6" strokeWidth="0.8" />
                  <text x="28" y="12" fill="#bfdbfe" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">📦 Serverless</text>
                </g>

                <g transform="translate(105, 115)">
                  <rect x="0" y="0" width="50" height="18" rx="5" fill="#0f172a" opacity="0.75" stroke="#3b82f6" strokeWidth="0.8" />
                  <text x="25" y="12" fill="#bfdbfe" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">📊 Scalable</text>
                </g>

                {/* Interconnecting Circuit Lines */}
                <path d="M 36,48 L 50,48 L 65,35" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M 100,44 L 85,44 L 75,35" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="65" cy="35" r="2.5" fill="#60a5fa" />
                <circle cx="75" cy="35" r="2.5" fill="#60a5fa" />
              </svg>
            </div>
          </>
        ),
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
    },
    {
      num: "11",
      cardImg: "/assets/cards/card-11-mobile.png",
      title: "Cross-Platform Mobile",
      desc: "Silky smooth React Native & Flutter apps that feel truly native.",
      category: "MOBILE",
      color: {
        border: "border-violet-200/90 hover:border-violet-400/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(124,58,237,0.18)]",
        bg: "from-[#ffffff] via-[#f5f3ff] to-[#eef2ff]",
        badge: "text-violet-700 bg-violet-50/90 border-violet-200/80 font-bold shadow-2xs",
        beam: "from-transparent via-violet-500 to-transparent",
        iconWrap: "text-violet-600 bg-violet-50 border border-violet-200/80 shadow-xs",
        glowDot: "bg-violet-600 shadow-[0_0_10px_#7c3aed]",
        textTitle: "text-slate-900 drop-shadow-none font-black",
        textDesc: "text-slate-600 font-medium",
        textBottom: "border-violet-200/90 text-slate-500 font-semibold",
        bgLayer: (
          <>
            {/* Ethereal Lilac Ambient Glow & Blueprint Grid */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_80%_20%,_rgba(124,58,237,0.14)_0%,_rgba(99,102,241,0.08)_45%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />

            {/* Top Micro Sub-Header */}
            <div className="absolute top-3 left-16 text-[8px] font-mono tracking-widest text-violet-600/70 uppercase select-none pointer-events-none">
              BUILD ONCE • RUN EVERYWHERE
            </div>

            {/* Feature Badges Grid SVG Elements */}
            <div className="absolute bottom-10 left-4 flex flex-wrap gap-1.5 max-w-[140px] pointer-events-none select-none z-10">
              <span className="text-[7.5px] font-sans font-semibold text-slate-700 bg-white/90 border border-violet-200 px-2 py-0.5 rounded-md shadow-2xs">⚡ Native Performance</span>
              <span className="text-[7.5px] font-sans font-semibold text-slate-700 bg-white/90 border border-violet-200 px-2 py-0.5 rounded-md shadow-2xs">&lt;/&gt; Single Codebase</span>
              <span className="text-[7.5px] font-sans font-semibold text-slate-700 bg-white/90 border border-violet-200 px-2 py-0.5 rounded-md shadow-2xs">📱 iOS &amp; Android</span>
            </div>

            {/* Dual 3D iPhone Devices Graphic Artwork */}
            <div className="absolute -bottom-1 -right-1 w-48 h-48 pointer-events-none select-none">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <defs>
                  <filter id="phoneShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="4" dy="10" stdDeviation="6" floodColor="#4c1d95" floodOpacity="0.2" />
                  </filter>
                  <linearGradient id="phoneScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#090d16" />
                    <stop offset="50%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#31103f" />
                  </linearGradient>
                </defs>

                {/* Back 3D iPhone (White Glass) */}
                <g transform="translate(100, 30) rotate(4)" filter="url(#phoneShadow)">
                  <rect x="0" y="0" width="56" height="110" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="3" y="3" width="50" height="104" rx="12" fill="#f8fafc" />
                  {/* Dynamic Island Notch */}
                  <rect x="19" y="7" width="18" height="4" rx="2" fill="#0f172a" />
                  {/* UI Preview Card */}
                  <rect x="8" y="20" width="40" height="24" rx="6" fill="#ede9fe" />
                  <text x="28" y="34" fill="#6d28d9" fontSize="6" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">One App</text>
                  <rect x="8" y="48" width="40" height="12" rx="4" fill="#e2e8f0" />
                  <rect x="8" y="64" width="40" height="12" rx="4" fill="#e2e8f0" />
                </g>

                {/* Front 3D iPhone (Dark Sapphire Glass) */}
                <g transform="translate(48, 15)" filter="url(#phoneShadow)">
                  <rect x="0" y="0" width="62" height="122" rx="16" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                  <rect x="3.5" y="3.5" width="55" height="115" rx="13" fill="url(#phoneScreenGrad)" />
                  {/* Dynamic Island Notch */}
                  <rect x="21" y="8" width="20" height="5" rx="2.5" fill="#000000" />
                  {/* UI Screen Content */}
                  <text x="31" y="30" fill="#a5b4fc" fontSize="6" fontFamily="monospace" textAnchor="middle">SAME IDEA EVERY SCREEN</text>
                  <text x="31" y="44" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Build Without</text>
                  <text x="31" y="54" fill="#818cf8" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Limits</text>
                  {/* React Native / Flutter Sub-badge */}
                  <rect x="10" y="64" width="42" height="16" rx="8" fill="#4338ca" opacity="0.8" />
                  <text x="31" y="74" fill="#ffffff" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Get Started →</text>
                </g>
              </svg>
            </div>
          </>
        ),
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
      cardImg: "/assets/cards/card-12-nextgen.png",
      title: "Next-Gen Products",
      desc: "Turnkey software prototypes shipped with speed and polish.",
      category: "INNOVATION",
      color: {
        border: "border-amber-500/40 hover:border-amber-400/90 shadow-[0_16px_36px_rgba(0,0,0,0.55)]",
        bg: "from-[#141210] via-[#241f18] to-[#0a0a08]",
        badge: "text-amber-300 bg-amber-500/20 border-amber-400/40 font-bold uppercase backdrop-blur-md",
        beam: "from-transparent via-amber-400 to-transparent",
        iconWrap: "text-amber-300 bg-amber-500/20 border border-amber-400/40 shadow-xs backdrop-blur-md",
        glowDot: "bg-amber-400 shadow-[0_0_10px_#f59e0b]",
        textTitle: "text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]",
        textDesc: "text-amber-100/80 font-medium",
        textBottom: "border-white/10 text-white/70",
        bgLayer: (
          <>
            {/* Dark Obsidian Gold Ambient Glow & Grid */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_80%_20%,_rgba(245,158,11,0.35)_0%,_rgba(217,119,6,0.15)_45%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

            {/* Top Micro Sub-Header */}
            <div className="absolute top-3 left-16 text-[8px] font-mono tracking-widest text-amber-300/60 uppercase select-none pointer-events-none">
              IDEATE • BUILD • LAUNCH
            </div>

            {/* 3D Gold Star & Layered Glass Platform Artwork */}
            <div className="absolute -bottom-1 -right-1 w-48 h-48 pointer-events-none select-none">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <defs>
                  <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <filter id="goldStarGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Concentric Gold Orbit Rings */}
                <circle cx="95" cy="85" r="60" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" fill="none" />
                <circle cx="95" cy="85" r="42" stroke="#f59e0b" strokeWidth="0.8" opacity="0.2" fill="none" />

                {/* Layered Isometric Glass Platforms Stack */}
                <g transform="translate(60, 65)">
                  {/* Bottom Platform */}
                  <polygon points="35,30 70,45 35,60 0,45" fill="#26221b" stroke="#d97706" strokeWidth="1" opacity="0.8" />
                  <polygon points="0,45 35,60 35,68 0,53" fill="#1c1914" />
                  <polygon points="35,60 70,45 70,53 35,68" fill="#14120e" />

                  {/* Middle Platform */}
                  <g transform="translate(0, -12)">
                    <polygon points="35,30 70,45 35,60 0,45" fill="#383023" stroke="#f59e0b" strokeWidth="1.2" opacity="0.9" />
                    <polygon points="0,45 35,60 35,68 0,53" fill="#241e15" />
                    <polygon points="35,60 70,45 70,53 35,68" fill="#1a150e" />
                  </g>

                  {/* Top Platform */}
                  <g transform="translate(0, -24)">
                    <polygon points="35,30 70,45 35,60 0,45" fill="#453a29" stroke="#fbbf24" strokeWidth="1.5" />
                    <polygon points="0,45 35,60 35,68 0,53" fill="#2e261a" />
                    <polygon points="35,60 70,45 70,53 35,68" fill="#211b11" />
                  </g>
                </g>

                {/* Floating 3D 4-Point Gold Starburst Emblem */}
                <g transform="translate(70, 20)" filter="url(#goldStarGlow)">
                  <path fill="url(#goldStarGrad)" d="M25 0 L29 18 L47 22 L29 26 L25 44 L21 26 L3 22 L21 18 Z" />
                  <circle cx="25" cy="22" r="4" fill="#ffffff" />
                </g>

                {/* Floating Status Badges SVG Elements */}
                <g transform="translate(10, 40)">
                  <rect x="0" y="0" width="58" height="18" rx="5" fill="#1c1914" opacity="0.85" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="29" y="12" fill="#fef08a" fontSize="7" fontFamily="sans-serif" textAnchor="middle">⚡ Prototype</text>
                </g>

                <g transform="translate(110, 45)">
                  <rect x="0" y="0" width="54" height="18" rx="5" fill="#1c1914" opacity="0.85" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="27" y="12" fill="#fef08a" fontSize="7" fontFamily="sans-serif" textAnchor="middle">📈 Polish</text>
                </g>

                <g transform="translate(15, 105)">
                  <rect x="0" y="0" width="62" height="18" rx="5" fill="#1c1914" opacity="0.85" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="31" y="12" fill="#fef08a" fontSize="7" fontFamily="sans-serif" textAnchor="middle">📦 Real Impact</text>
                </g>

                {/* Connecting Starlight Sparks */}
                <circle cx="39" cy="58" r="2.5" fill="#fbbf24" className="animate-ping" opacity="0.8" />
                <circle cx="39" cy="58" r="2" fill="#fbbf24" />
                <circle cx="120" cy="72" r="2.5" fill="#fbbf24" className="animate-ping" opacity="0.8" />
                <circle cx="120" cy="72" r="2" fill="#fbbf24" />
              </svg>
            </div>
          </>
        ),
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
      data-pinned-container="true"
      id="impact-scroll-stage"
      className="relative w-full h-[600vh] bg-[#020204] text-white select-none border-t border-white/[0.08]"
    >
      {/* Sticky Fullscreen Pinned Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pt-0 pb-2 sm:pt-1 sm:pb-3 transform-gpu"
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
          className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full relative z-20 pointer-events-auto py-0 -translate-y-4 sm:-translate-y-7 lg:-translate-y-9 will-change-transform transform-gpu"
        >
          {/* ========================================================= */}
          {/* 1. HERO SECTION: ASSEMBLED CONTENT & PORTRAIT            */}
          {/* ========================================================= */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-6 flex-1 min-h-0">
            {/* Left Column: Assembling Headline & Interactive Actions */}
            <div
              ref={leftContentRef}
              className="w-full lg:w-[42%] flex flex-col justify-center relative z-30 pointer-events-auto"
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
              <div className="flex flex-col gap-3 mt-1 relative z-50 pointer-events-auto">
                <div className="social-label-anim flex items-center gap-2.5 text-[11px] font-mono font-semibold tracking-[0.18em] text-[#94a3b8] uppercase will-change-transform">
                  <span className="social-line-anim w-5 h-[1.5px] bg-gradient-to-r from-purple-400 to-indigo-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                  <span className="text-neutral-400">CONNECT WITH ME</span>
                </div>

                <div className="flex items-center gap-3 relative z-50 pointer-events-auto">
                  {/* LinkedIn */}
                  <div className="social-icon-item will-change-transform relative z-50 pointer-events-auto">
                    <a
                      href="https://www.linkedin.com/in/gourab-maji-4964a4397/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="pointer"
                      data-cursor-text="LINKEDIN"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://www.linkedin.com/in/gourab-maji-4964a4397/", "_blank", "noopener,noreferrer");
                      }}
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-[#0a66c2]/70 hover:bg-[#0a66c2]/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(10,102,194,0.45)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible relative z-50 pointer-events-auto"
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
                  <div className="social-icon-item will-change-transform relative z-50 pointer-events-auto">
                    <a
                      href="https://github.com/gourabs444-del"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="pointer"
                      data-cursor-text="GITHUB"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://github.com/gourabs444-del", "_blank", "noopener,noreferrer");
                      }}
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-white/60 hover:bg-white/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible relative z-50 pointer-events-auto"
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
                  <div className="social-icon-item will-change-transform relative z-50 pointer-events-auto">
                    <a
                      href="https://www.instagram.com/01env/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="pointer"
                      data-cursor-text="INSTAGRAM"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://www.instagram.com/01env/", "_blank", "noopener,noreferrer");
                      }}
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-[#e1306c]/70 hover:bg-[#e1306c]/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(225,48,108,0.45)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible relative z-50 pointer-events-auto"
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
                  <div className="social-icon-item will-change-transform relative z-50 pointer-events-auto">
                    <a
                      href="mailto:gourabs444@gmail.com"
                      data-cursor="pointer"
                      data-cursor-text="EMAIL"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = "mailto:gourabs444@gmail.com";
                      }}
                      onMouseEnter={() => playHover()}
                      className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0e1018]/90 backdrop-blur-md border border-white/10 hover:border-[#ea4335]/70 hover:bg-[#ea4335]/15 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_25px_rgba(234,67,53,0.45)] hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer overflow-visible relative z-50 pointer-events-auto"
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
                className="absolute top-[6%] sm:top-[5%] lg:top-[4%] left-[52.8%] -translate-x-1/2 select-none z-10 opacity-90 will-change-transform pointer-events-none"
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
                  className="w-auto h-full max-h-[540px] object-contain object-bottom scale-[1.08] sm:scale-[1.12] lg:scale-[1.15] origin-bottom translate-y-[20px] sm:translate-y-[35px] lg:translate-y-[45px] translate-x-4 sm:translate-x-8 lg:translate-x-12 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] filter contrast-[1.05] brightness-[1.02]"
                />
              </div>

              {/* Right Shoulder Floating Editorial Paragraph (Beside shoulder, ultra-tiny white text) */}
              <div
                ref={shoulderBadgeRef}
                className="hidden sm:flex absolute right-[-35px] sm:right-[-50px] lg:right-[-65px] xl:right-[-80px] top-[64%] sm:top-[62%] lg:top-[59%] -translate-y-1/2 z-25 flex-col gap-1 max-w-[130px] sm:max-w-[145px] lg:max-w-[160px] will-change-transform pointer-events-none select-none text-left"
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
            className="relative w-full overflow-hidden pb-2 sm:pb-3 mt-auto z-30 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]"
          >
            <div
              ref={cardsTrackRef}
              className="flex gap-4 sm:gap-5 w-max will-change-transform py-2 items-center"
            >
              {carouselCards.map((s, idx) => (
                <div
                  key={`${s.num}-${idx}`}
                  className="service-card-anim flex-shrink-0 w-[285px] sm:w-[320px] lg:w-[345px] will-change-transform py-2"
                >
                  {(s as any).cardImg ? (
                    <div
                      onMouseEnter={() => playHover()}
                      className="card-inner-spotlight group relative w-full rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.5)] cursor-default will-change-transform transform-gpu origin-center border border-white/20 hover:border-white/50 hover:shadow-[0_20px_45px_rgba(236,72,153,0.3)]"
                      style={{
                        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    >
                      <img
                        src={(s as any).cardImg}
                        alt={s.title}
                        className="w-full h-auto object-cover rounded-2xl block select-none pointer-events-none"
                      />
                      {/* Top Laser Accent Hover Beam */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${s.color.beam} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
                      />
                    </div>
                  ) : (
                    <div
                      onMouseEnter={() => playHover()}
                      className={`card-inner-spotlight group relative flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${s.color.bg} border ${s.color.border} shadow-[0_16px_36px_rgba(0,0,0,0.55)] cursor-default overflow-hidden will-change-transform transform-gpu origin-center backdrop-blur-xl`}
                      style={{
                        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    >
                      {/* Unique Ambient Visual Layer (Swiss Alps, Neon Chrome, Studio UI Orbs, etc.) */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                        {s.color.bgLayer}
                        {/* Top Glass Frost Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                      </div>

                      {/* Top Laser Accent Hover Beam */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${s.color.beam} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
                      />

                      <div className="relative z-10 flex flex-col gap-2.5">
                        {/* Header: Icon & Category Badge */}
                        <div className="flex items-center justify-between">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color.iconWrap} transition-transform duration-300 group-hover:scale-110 shadow-xs backdrop-blur-md`}>
                            {s.icon}
                          </div>

                          <span className={`text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${s.color.badge} uppercase backdrop-blur-md`}>
                            {s.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-sans font-bold text-base sm:text-lg tracking-tight ${(s.color as any).textTitle || "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"}`}>
                          {s.title}
                        </h3>

                        {/* Description */}
                        <p className={`font-sans text-xs sm:text-[13px] leading-relaxed line-clamp-2 ${(s.color as any).textDesc || "text-white/80"}`}>
                          {s.desc}
                        </p>
                      </div>

                      {/* Bottom Status Tag */}
                      <div className={`relative z-10 pt-2 border-t flex items-center justify-between text-[10px] font-mono uppercase tracking-widest font-medium ${(s.color as any).textBottom || "border-white/10 text-white/60"}`}>
                        <span>{s.num} // CAPABILITY</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.color.glowDot} opacity-75 group-hover:opacity-100 transition-opacity`} />
                      </div>
                    </div>
                  )}
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
          <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto overflow-visible py-4 my-auto">
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
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER B2: SLIDE 2 - LUXURY EDITORIAL & ETHEREAL GRADIENT  */}
        {/* ========================================================= */}
        <div
          ref={slide2LayerRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center overflow-hidden z-20 px-6 sm:px-12 md:px-16 lg:px-24 select-none pointer-events-none"
        >
          {/* Ambient Ethereal Orchid & Mint Radial Glow */}
          <div
            ref={slide2AuraRef}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,_rgba(217,70,239,0.12)_0%,_rgba(45,212,191,0.07)_40%,_transparent_70%)]"
            aria-hidden="true"
          />

          {/* Background 6-Column Vertical Cards Grid */}
          <div
            ref={slide2WatermarkRef}
            className="pointer-events-none absolute inset-0 w-full h-full flex items-center justify-center select-none z-0 overflow-hidden"
            aria-hidden="true"
          >
            <VerticalCardsGridBackground />
          </div>

          {/* Foreground Luxury Client Testimonial Typography Content */}
          <div
            ref={slide2ContentRef}
            className="relative z-10 flex flex-col items-center max-w-6xl mx-auto overflow-visible py-4"
          >
            {/* Foreground Big Headline: Client Feedback & Experiences */}
            <h2 className="slide2-assemble-item font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.4rem] text-white tracking-tight leading-[1.2] text-center px-4 overflow-visible will-change-transform mb-4">
              <span className="block whitespace-nowrap overflow-visible">
                Client Feedback
              </span>
              <span className="block whitespace-nowrap overflow-visible py-1">
                &amp;{" "}
                <span className="font-bodoni italic font-normal bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent inline-block pr-3 pl-0.5 pt-1 pb-2 leading-[1.2] overflow-visible drop-shadow-[0_0_35px_rgba(232,121,249,0.4)]">
                  Experiences.
                </span>
              </span>
            </h2>

            {/* Super Micro Testimonial Quote */}
            <p className="slide2-assemble-item font-sans text-[11px] sm:text-xs text-neutral-300/80 max-w-xl mx-auto leading-relaxed mb-4 font-normal tracking-wide text-center italic">
              &ldquo;Delivered a product that didn&apos;t just launch &mdash; it redefined our entire market.&rdquo;
            </p>

            {/* Super Micro Endorsement & Action (No box, pure clean typography) */}
            <div className="slide2-assemble-item flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-2 text-center">
                <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase font-medium">
                  VENTURETECH LEADERSHIP &bull; <span className="text-amber-400 tracking-tighter">★★★★★</span> &bull; GLOBAL SAAS &amp; AI ENDORSEMENT
                </span>
              </div>

              <a
                href="#contact"
                onMouseEnter={() => playHover()}
                className="pointer-events-auto inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-white hover:text-fuchsia-300 transition-colors uppercase pt-1"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER C: SLIDE 3 - LUXURY THANK YOU CANVAS & EDITORIAL    */}
        {/* ========================================================= */}
        <div
          ref={slide3LayerRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-between text-center overflow-hidden z-30 select-none pointer-events-none py-8 sm:py-12 px-6 sm:px-12"
        >
          {/* Ambient Luxury Premium Cream Background Canvas */}
          <div
            ref={slide3BgRef}
            className="absolute inset-0 w-full h-full will-change-transform z-0 overflow-hidden bg-[#FAF6F0] bg-gradient-to-br from-[#FDFBF7] via-[#FAF6F0] to-[#F3EDE2] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center"
          >
            {/* Soft atmospheric ambient glow on pristine cream */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(253,251,247,0.95)_0%,_rgba(250,246,240,1)_75%)] pointer-events-none" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(245,238,225,0.6)_0%,_rgba(235,222,205,0.3)_45%,_transparent_75%)] rounded-full blur-[100px]" />
          </div>

          {/* Foreground Editorial Content Container */}
          <div
            ref={slide3ContentRef}
            className="relative z-10 w-full max-w-5xl mx-auto h-full pointer-events-none flex flex-col items-center justify-center"
          >
            {/* 1. Header Group (Starts Dead-Center in Phase 1 via flexbox, moves UP & scales down in Phase 2) */}
            <div className="slide3-header-group flex flex-col items-center justify-center text-center w-full will-change-transform transform-gpu">
              {/* Floating "hey there!" header flanked by leaf branch SVGs */}
              <div className="slide3-hey-there flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                {/* Left Leaf Accent */}
                <svg className="w-7 h-11 sm:w-8 sm:h-12 text-[#090714]/35 transform -rotate-12" viewBox="0 0 40 80" fill="currentColor">
                  <path d="M20 0 C20 40, 20 60, 20 80 M20 15 C10 10, 2 15, 5 25 C10 25, 18 20, 20 15 M20 30 C30 25, 38 30, 35 40 C30 40, 22 35, 20 30 M20 45 C10 40, 2 45, 5 55 C10 55, 18 50, 20 45" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>

                <span className="font-bodoni italic text-2xl sm:text-3xl md:text-4xl text-[#090714]/90 tracking-wide">
                  hey there!
                </span>

                {/* Right Leaf Accent */}
                <svg className="w-7 h-11 sm:w-8 sm:h-12 text-[#090714]/35 transform rotate-12" viewBox="0 0 40 80" fill="currentColor">
                  <path d="M20 0 C20 40, 20 60, 20 80 M20 15 C30 10, 38 15, 35 25 C30 25, 22 20, 20 15 M20 30 C10 25, 2 30, 5 40 C10 40, 18 35, 20 30 M20 45 C30 40, 38 45, 35 55 C30 55, 22 50, 20 45" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>
              </div>

              {/* Headline: "THANK YOU" */}
              <h2 className="text-center max-w-5xl overflow-visible flex flex-col items-center justify-center">
                <span className="slide3-line-1 block font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] text-[#090714] tracking-tight uppercase leading-none drop-shadow-xs">
                  THANK YOU
                </span>
              </h2>

              {/* Cursive Subline (Reveals in Phase 2 under THANK YOU) */}
              <div className="slide3-line-2 opacity-0 mt-2 sm:mt-3">
                <span className="font-bodoni italic text-2xl sm:text-3xl md:text-4xl text-[#090714]/80 tracking-wide">
                  for your time &amp; vision
                </span>
              </div>
            </div>

            {/* 2. Middle Text Group (Flies in from sides in Phase 2) */}
            <div className="slide3-middle-group absolute top-[53%] sm:top-[51%] left-0 right-0 mx-auto flex flex-col items-center justify-center text-center w-full max-w-3xl px-4 gap-2.5 sm:gap-3 pointer-events-none">
              {/* Subtitle (Flies in from Left) */}
              <h3 className="slide3-subtitle opacity-0 font-mono text-[9px] sm:text-[10px] font-extrabold tracking-[0.25em] text-[#090714]/80 uppercase">
                AND FOR SUPPORTING OUR CREATIVE JOURNEY
              </h3>

              {/* Description Paragraph (Flies in from Right) */}
              <p className="slide3-desc opacity-0 font-sans text-[11px] sm:text-xs text-[#090714]/65 leading-relaxed font-normal max-w-xl">
                We craft digital products and visual stories driven by passion, elegance, and unyielding attention to detail. Thank you for being a part of this story.
              </p>
            </div>

            {/* 3. Bottom Assembled Footer Layout (Assembles from bottom in Phase 2) */}
            <div className="slide3-bottom-grid opacity-0 absolute bottom-3 sm:bottom-6 left-0 right-0 mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#090714]/15 pt-3.5 pb-1 px-6 sm:px-12 pointer-events-none">
              {/* Item 1: Left Group — Signature & Real Algora Brand Logo */}
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Handwritten Signature */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="h-7 sm:h-9 flex items-center">
                    <GourabSignatureSvg className="h-full w-auto text-[#090714]" />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.12em] text-[#090714]/75 uppercase">
                    Gourab Maji &mdash; Lead Engineer &amp; Designer
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="h-7 w-[1px] bg-[#090714]/15 hidden sm:block" />

                {/* Real Algora Logo */}
                <a
                  href="https://algora.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  className="pointer-events-auto flex items-center gap-2 group cursor-pointer shrink-0"
                  title="Algora Official"
                >
                  <svg
                    viewBox="315 85 394 394"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#090714] shrink-0 group-hover:scale-110 transition-transform duration-300"
                  >
                    <circle cx="512" cy="284.5" r="175" fill="none" stroke="currentColor" strokeWidth="24" />
                    <polygon points="512,197 483,243.5 550,368 604,368" fill="currentColor" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
                    <path d="M 408.00 368.00 C 411.41 362.36, 433.32 326.42, 437.03 320.96 C 443.94 310.78, 453.24 304.05, 464.86 300.83 C 469.89 299.43, 474.99 299.00, 486.33 299.00 L 500.00 299.00 C 484.32 328.00, 470.51 351.92, 455.50 363.06 C 452.20 364.68, 446.35 366.68, 442.50 367.49 L 408.00 368.00 Z" fill="currentColor" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
                  </svg>
                  <span className="font-sans font-black text-[11px] sm:text-xs tracking-[0.18em] text-[#090714] uppercase group-hover:text-black transition-colors whitespace-nowrap">
                    ALGORA
                  </span>
                </a>
              </div>

              {/* Item 2: Center Group — Micro Social App Icons */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <a
                  href="https://github.com/gourabs444-del"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#090714]/[0.06] hover:bg-[#090714] text-[#090714] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#090714]/10 hover:scale-110"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gourab-maji-4964a4397/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#090714]/[0.06] hover:bg-[#090714] text-[#090714] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#090714]/10 hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/01env/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHover()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#090714]/[0.06] hover:bg-[#090714] text-[#090714] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#090714]/10 hover:scale-110"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:gourabs444@gmail.com"
                  onMouseEnter={() => playHover()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#090714]/[0.06] hover:bg-[#090714] text-[#090714] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#090714]/10 hover:scale-110"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Item 3: Right Group — Get In Touch CTA & Scroll-to-Top Button */}
              <div className="flex items-center gap-2.5 pointer-events-auto">
                <a
                  href="mailto:gourabs444@gmail.com"
                  onMouseEnter={() => playHover()}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#090714] text-white hover:bg-black font-sans font-bold text-[10px] sm:text-[11px] tracking-tight transition-all duration-300 shadow-[0_4px_15px_rgba(9,7,20,0.18)] hover:shadow-[0_8px_25px_rgba(9,7,20,0.3)] hover:scale-105 active:scale-95 cursor-pointer border border-[#090714]/20"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-3 h-3 text-white" />
                </a>

                {/* Sabse Upr Jane Ka Button (Scroll to Top) */}
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onMouseEnter={() => playHover()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#090714]/[0.08] hover:bg-[#090714] text-[#090714] hover:text-white font-mono font-bold text-[9px] sm:text-[10px] tracking-wider uppercase transition-all duration-300 border border-[#090714]/15 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Scroll to Top"
                >
                  <span>TOP</span>
                  <ArrowUp className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
