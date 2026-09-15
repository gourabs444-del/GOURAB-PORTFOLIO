"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { playHover, playClick } = useAudioFeedback();

  const categories = ["ALL", "AI Systems", "Creative Dev", "Full-Stack", "Motion & Film"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // GSAP 3D Scroll Perspective Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const showcaseRows = listRef.current?.querySelectorAll(".project-3d-row");

      showcaseRows?.forEach((row) => {
        const visualCard = row.querySelector(".project-3d-visual");
        const textContent = row.querySelector(".project-3d-text");
        const parallaxImg = row.querySelector(".project-image-3d");

        // 3D Spatial Scroll Entrance
        gsap.fromTo(
          row,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3D Tilt & Perspective Elevation on Scroll
        if (visualCard) {
          gsap.fromTo(
            visualCard,
            {
              rotateX: 18,
              rotateY: -8,
              transformPerspective: 1200,
              scale: 0.94,
            },
            {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 95%",
                end: "center 50%",
                scrub: 1.2,
              },
            }
          );
        }

        // Inner Image Parallax Travel
        if (parallaxImg) {
          gsap.fromTo(
            parallaxImg,
            { scale: 1.15, y: -25 },
            {
              scale: 1.0,
              y: 25,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  // 3D Interactive Mouse Tilt Effect on Hover
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-44 px-5 sm:px-10 md:px-16 lg:px-24 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Dynamic 3D Spatial Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08)_0%,_rgba(59,130,246,0.04)_40%,_transparent_70%)] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* ========================================================= */}
        {/* 1. CENTERED EDITORIAL SECTION HEADER                      */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center justify-center text-center pb-12 border-b border-white/[0.08]">
          {/* Section Indicator Tag */}
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-neutral-200 font-semibold">02 // SELECTED WORK</span>
            <span className="text-neutral-600">/</span>
            <span>2024 — 2026 ARCHIVE</span>
          </div>

          {/* Large Text Hover Effect Title */}
          <div className="w-full max-w-4xl h-24 sm:h-32 md:h-36 flex items-center justify-center my-2">
            <TextHoverEffect
              text="FEATURED PROJECTS"
              colors={{
                stop0: "#F59E0B",
                stop25: "#FBBF24",
                stop50: "#FDE68A",
                stop75: "#38BDF8",
                stop100: "#FFFFFF",
              }}
            />
          </div>

          {/* Centered Filter Tabs (Clean Underline - Zero Pills) */}
          <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-10 text-xs font-mono tracking-wider mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => playHover()}
                className={`relative py-1.5 transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "text-white font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. 3D SPATIAL PERSPECTIVE SHOWCASE (Zero Boxes / Zero Pills) */}
        {/* ========================================================= */}
        <div ref={listRef} className="flex flex-col gap-16 sm:gap-24 md:gap-32">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="project-3d-row group relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-16 border-b border-white/[0.08]"
                style={{ perspective: "1200px" }}
              >
                {/* Column A: Editorial Typography & Systems Breakdown */}
                <div
                  className={`project-3d-text lg:col-span-5 flex flex-col justify-between h-full gap-8 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div>
                    {/* Index, Client & Year */}
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 tracking-wider mb-4">
                      <span className="text-amber-400 font-bold font-mono text-sm">
                        {project.number}
                      </span>
                      <span className="text-neutral-700">/</span>
                      <span className="text-neutral-300 font-medium uppercase">
                        {project.client}
                      </span>
                      <span className="text-neutral-700">•</span>
                      <span className="text-neutral-500">{project.year}</span>
                    </div>

                    {/* High-Impact Project Title */}
                    <h3
                      onClick={() => {
                        playClick();
                        setActiveProject(project);
                      }}
                      className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight cursor-pointer group-hover:text-amber-400 transition-colors duration-300"
                    >
                      {project.title}
                    </h3>

                    {/* Concise Narrative */}
                    <p className="font-sans text-sm sm:text-base text-neutral-300 mt-5 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean Technical Metrics & Stack (No Pill Capsules) */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-8 text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">
                          Key Benchmark
                        </span>
                        <span className="text-white font-bold text-sm sm:text-base">
                          {project.metrics[0]?.value}
                        </span>
                      </div>
                      <div className="w-[1px] h-8 bg-white/[0.1]" />
                      <div>
                        <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">
                          Discipline
                        </span>
                        <span className="text-neutral-300 font-medium text-xs sm:text-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Typographic Stack (Separated by middle dots) */}
                    <div className="text-xs font-mono text-neutral-400 leading-relaxed pt-1">
                      <span className="text-neutral-500 mr-2 uppercase font-semibold text-[10px]">Stack:</span>
                      {project.technologies.slice(0, 6).join("  •  ")}
                    </div>

                    {/* Clean Action Trigger */}
                    <div className="flex items-center gap-6 pt-4">
                      <button
                        onClick={() => {
                          playClick();
                          setActiveProject(project);
                        }}
                        onMouseEnter={() => playHover()}
                        className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer group/btn"
                      >
                        <span className="underline underline-offset-4 decoration-white/30 group-hover/btn:decoration-amber-400">
                          Inspect Architecture
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => playHover()}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors py-1"
                        >
                          <span>Live System</span>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column B: Interactive 3D Spatial Canvas Viewport */}
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => {
                    playClick();
                    setActiveProject(project);
                  }}
                  className={`project-3d-visual lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-[#0A0A0E] border border-white/[0.1] group-hover:border-amber-400/40 transition-shadow duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group-hover:shadow-[0_25px_80px_rgba(245,158,11,0.15)] will-change-transform ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="project-image-3d relative w-full h-full will-change-transform">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.05]"
                    />
                  </div>

                  {/* 3D Atmospheric Sheen on Hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-500/[0.08] via-transparent to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle Vignette Gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Floating Action Badge */}
                  <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl">
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. EDITORIAL FOOTER LINK                                  */}
        {/* ========================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-neutral-400">Available for bespoke client commissions worldwide</span>
          </div>
          <a
            href="#contact"
            onClick={() => {
              playClick();
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-white hover:text-amber-400 transition-colors underline underline-offset-4 decoration-white/30"
          >
            Initiate Project Brief &rarr;
          </a>
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}



