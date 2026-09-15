"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from "lucide-react";

export function ExperienceTimeline() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const { playHover, playClick } = useAudioFeedback();

  const totalSlides = experiences.length;
  const currentExp = experiences[currentSlide];

  // Slide navigation with GSAP kinetic motion transition
  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || index < 0 || index >= totalSlides) return;
      playClick();

      // Animate out current slide
      if (slideContainerRef.current) {
        gsap.to(slideContainerRef.current.querySelectorAll(".slide-anim"), {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.in",
          onComplete: () => {
            setCurrentSlide(index);
          },
        });
      } else {
        setCurrentSlide(index);
      }
    },
    [currentSlide, totalSlides, playClick]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  // Animate in new slide elements
  useEffect(() => {
    if (!slideContainerRef.current) return;

    // Reset and animate in new content
    gsap.fromTo(
      slideContainerRef.current.querySelectorAll(".slide-anim"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      }
    );

    // Parallax watermark animation
    if (watermarkRef.current) {
      gsap.fromTo(
        watermarkRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [currentSlide]);

  // Auto-play interval handling
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Section Entrance ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.8 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Extract pure year for watermark (e.g. "2024 — PRESENT" -> "2024")
  const watermarkYear = currentExp.year.split(" ")[0];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-[92vh] py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#040406] text-[#F4F4F6] border-t border-white/[0.08] select-none flex flex-col justify-between overflow-hidden"
    >
      {/* Massive Kinetic Background Year Watermark */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 font-display font-black text-[13rem] sm:text-[20rem] md:text-[26rem] lg:text-[32rem] text-white/[0.025] leading-none select-none z-0 tracking-tighter"
        aria-hidden="true"
      >
        {watermarkYear}
      </div>

      {/* Subtle Ambient Radial Lighting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.06)_0%,_transparent_70%)] blur-[150px] z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Presentation Header: Mode, Title & Slide Scrubber */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/[0.1]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
              <span className="text-white font-medium">05 // CAREER PRESENTATION</span>
              <span className="text-white/20">/</span>
              <span className="text-neutral-400">CHRONOLOGY STAGE</span>
            </div>

            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              EXPERIENCE &amp; <span className="font-serif italic font-normal text-sky-300">IMPACT</span>
            </h2>
          </div>

          {/* Interactive Presentation Era Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {experiences.map((exp, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={exp.id}
                  onClick={() => goToSlide(idx)}
                  onMouseEnter={() => playHover()}
                  className={`relative px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white bg-white/[0.08] border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      : "text-neutral-400 hover:text-neutral-200 border border-transparent hover:border-white/10"
                  }`}
                >
                  <span className="font-bold">0{idx + 1}</span>
                  <span className="mx-1.5 text-white/20">/</span>
                  <span>{exp.year.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Cinema Presentation Slide Stage */}
        <div
          ref={slideContainerRef}
          className="min-h-[380px] sm:min-h-[420px] flex flex-col justify-between py-6"
        >
          <div className="flex flex-col gap-8">
            {/* Slide Metadata & Status */}
            <div className="slide-anim flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-sky-400">
                  // CHAPTER 0{currentSlide + 1} OF 0{totalSlides}
                </span>
                <span className="text-white/20">•</span>
                <span className="font-mono text-xs sm:text-sm text-neutral-300 font-semibold tracking-wider">
                  {currentExp.year}
                </span>
              </div>

              <span className="font-mono text-xs text-neutral-400">
                {currentExp.location} &bull; {currentExp.period}
              </span>
            </div>

            {/* Grand Role Headline & Studio */}
            <div className="slide-anim flex flex-col gap-2 max-w-4xl">
              <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08]">
                {currentExp.role}
              </h3>
              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-sky-300/95 font-normal">
                {currentExp.company}
              </p>
            </div>

            {/* Expansive Narrative */}
            <p className="slide-anim font-sans text-base sm:text-lg md:text-xl text-neutral-200 font-light leading-relaxed max-w-3xl">
              {currentExp.summary}
            </p>

            {/* Architectural Highlights */}
            <div className="slide-anim grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl pt-2">
              {currentExp.highlights.map((highlight, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed"
                >
                  <span className="text-sky-400 font-mono font-bold select-none">&mdash;</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Typographic Ribbon */}
          <div className="slide-anim pt-8 mt-6 border-t border-white/[0.08] flex items-baseline gap-3 flex-wrap font-mono text-xs text-neutral-400">
            <span className="text-neutral-500 uppercase tracking-widest text-[11px] font-semibold">
              TECHNOLOGIES &mdash;
            </span>
            <span className="text-neutral-300 tracking-wide">
              {currentExp.techStack.join("   /   ")}
            </span>
          </div>
        </div>

        {/* Presentation Controls Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/[0.1]">
          {/* Slide Progress Dots */}
          <div className="flex items-center gap-2">
            {experiences.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? "w-8 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              onMouseEnter={() => playHover()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>AUTO-PLAY</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                onMouseEnter={() => playHover()}
                className="w-10 h-10 rounded-lg border border-white/10 hover:border-sky-400/50 hover:bg-white/[0.05] flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                onMouseEnter={() => playHover()}
                className="w-10 h-10 rounded-lg border border-white/10 hover:border-sky-400/50 hover:bg-white/[0.05] flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






