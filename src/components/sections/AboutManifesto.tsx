"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Music, Gamepad2, Film, Clapperboard, Compass } from "lucide-react";

export function AboutManifesto() {
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  // 1. Smooth ambient cursor aura with dampening
  useEffect(() => {
    const container = containerRef.current;
    const aura = auraRef.current;
    if (!container || !aura) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(aura, {
        x: x,
        y: y,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Smooth non-flickering fade-in scroll triggers
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;

      const blocks = contentRef.current.querySelectorAll(".fade-trigger");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const PERSONAL_INTERESTS = [
    { icon: Music, label: "Music" },
    { icon: Gamepad2, label: "Games" },
    { icon: Film, label: "Movies" },
    { icon: Clapperboard, label: "Filmmaking" },
    { icon: Compass, label: "Travelling" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-16 sm:pt-24 md:pt-28 pb-20 sm:pb-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#040407] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Dynamic Cursor Light Aura Follower */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute -top-[250px] -left-[250px] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] blur-[100px] will-change-transform z-0"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto w-full py-6 sm:py-10 flex flex-col gap-12 sm:gap-16 text-left relative z-10"
      >
        {/* SECTION 1: A LITTLE ABOUT ME */}
        <div className="fade-trigger flex flex-col gap-8">
          {/* Clean White Top Header Tag */}
          <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
            <span>A LITTLE ABOUT ME</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="flex flex-col gap-2.5">
            <h2 className="font-sans font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
              Hello, I&apos;m Gourab
            </h2>
            <p className="font-bodoni italic text-lg sm:text-xl md:text-2xl font-medium text-white/80">
              a Full Stack Developer and Creative Technologist.
            </p>
          </div>

          {/* Minimal Subtle Hairline Divider */}
          <div className="w-full h-[1px] bg-white/10" />

          {/* Clean White Paragraphs */}
          <div className="flex flex-col gap-5 text-sm sm:text-base leading-[1.8] text-white/90 font-normal">
            <p>
              I work across the entire product journey — from <strong className="text-white font-semibold">concept and architecture</strong> to interface, development, and deployment. My work spans <span className="text-white font-medium">modern web applications</span>, <span className="text-white font-medium">AI &amp; LLM integration</span>, <span className="text-white font-medium">interactive experiences</span>, and <strong className="text-white font-semibold">product engineering</strong>.
            </p>
            <p>
              I’m particularly interested in understanding how <span className="text-white font-medium">systems work beneath the surface</span> and then turning that complexity into experiences that feel <em className="font-bodoni text-white font-normal">simple, intuitive, and purposeful</em>.
            </p>
            <div className="pt-2 flex flex-col gap-1">
              <p className="text-neutral-400 italic">
                I don't see development as just writing code.
              </p>
              <p className="text-white font-semibold text-base sm:text-lg">
                I see it as solving problems, designing systems, and creating something worth using.
              </p>
            </div>
          </div>
        </div>

        {/* Hairline Divider between sections */}
        <div className="w-full h-[1px] bg-white/10" />

        {/* SECTION 2: WHAT I DO? */}
        <div className="fade-trigger flex flex-col gap-8">
          {/* Clean White Header Tag */}
          <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
            <span>WHAT I DO?</span>
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-5 text-sm sm:text-base leading-[1.8] text-white/90 font-normal">
            <p>
              I design and develop <strong className="text-white font-semibold">scalable digital products</strong>, working across the full development lifecycle—from <span className="text-white font-medium">architecture and engineering</span> to <span className="text-white font-medium">interface development and deployment</span>.
            </p>
            <p>
              My work focuses on building <span className="text-white font-medium">modern web applications</span>, <span className="text-white font-medium">robust backend systems</span>, <span className="text-white font-medium">AI-powered solutions</span>, and <span className="text-white font-medium">interactive digital experiences</span>, with an emphasis on performance, usability, maintainability, and thoughtful system design.
            </p>
            <p>
              I also bring a <em className="font-bodoni text-white font-normal">strong creative perspective to technology</em>, combining development, visual design, motion, and interactive storytelling to create products that are not only <strong className="text-white font-semibold">technically sound</strong>, but <span className="text-white font-medium">purposeful and engaging</span>.
            </p>
          </div>

          {/* Minimal Clean Capabilities List (NO BOXES, NO CAPSULES, ONLY WHITE TEXT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-4">
            {/* 01 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/60 tracking-widest font-semibold">01 —</span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Product Development
                </h4>
              </div>
              <p className="font-mono text-xs sm:text-sm text-neutral-400 pl-9">
                Concept &rarr; Architecture &rarr; Development &rarr; Deployment
              </p>
            </div>

            {/* 02 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/60 tracking-widest font-semibold">02 —</span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Full-Stack Engineering
                </h4>
              </div>
              <p className="font-mono text-xs sm:text-sm text-neutral-400 pl-9">
                Frontend systems &bull; Backend architecture &bull; APIs &bull; Databases
              </p>
            </div>

            {/* 03 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/60 tracking-widest font-semibold">03 —</span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  AI &amp; Emerging Technology
                </h4>
              </div>
              <p className="font-mono text-xs sm:text-sm text-neutral-400 pl-9">
                LLM integration &bull; AI-powered features &bull; Intelligent workflows
              </p>
            </div>

            {/* 04 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/60 tracking-widest font-semibold">04 —</span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Interactive Experiences
                </h4>
              </div>
              <p className="font-mono text-xs sm:text-sm text-neutral-400 pl-9">
                Creative interfaces &bull; Motion &bull; Visual systems &bull; Interactive web experiences
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: PASSIONS & CREATIVE INFLUENCES */}
        <div className="fade-trigger pt-12 sm:pt-16 border-t border-white/10 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-neutral-400 uppercase mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-pulse" />
            <span>PASSIONS &amp; CREATIVE INFLUENCES</span>
          </div>

          <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 flex-wrap">
            {PERSONAL_INTERESTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center text-center gap-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.6]" />
                  </div>

                  <span className="font-sans font-medium text-xs sm:text-sm text-neutral-300 group-hover:text-white tracking-wide transition-colors">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
