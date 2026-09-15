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
        {/* 1. EDITORIAL SECTION HEADER (Clean Typography)            */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#F59E0B]" />
              <span className="text-white font-medium">02 // SELECTED WORK</span>
              <span className="text-white/20">/</span>
              <span className="text-neutral-400">2024 &mdash; 2026 ARCHIVE</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
              SELECTED <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-amber-400 via-amber-200 to-sky-400 bg-clip-text text-transparent">
                WORKS &amp; ARTIFACTS
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
              Bespoke digital experiences, high-throughput distributed systems, WebGL viewports, and award-winning cinematic storytelling.
            </p>
          </div>

          {/* Minimal Filter Tabs (Zero Bulky Boxes, Minimal Text Links) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-neutral-400">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => playHover()}
                className={`transition-all duration-300 relative py-1 cursor-pointer ${
                  selectedCategory === cat
                    ? "text-white font-semibold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CINEMATIC WORK SHOWCASE (Zero Boxes / Zero Capsules)   */}
        {/* ========================================================= */}
        <div ref={listRef} className="flex flex-col gap-20 sm:gap-28 md:gap-36">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="project-3d-row group relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-20 border-b border-white/[0.08]"
                style={{ perspective: "1200px" }}
              >
                {/* Column A: Editorial Narrative & Metrics */}
                <div
                  className={`project-3d-text lg:col-span-5 flex flex-col justify-between h-full gap-8 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    {/* Index, Client & Year */}
                    <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400">
                      <span className="text-amber-400 font-bold font-mono text-sm">
                        // {project.number}
                      </span>
                      <span className="text-neutral-600">/</span>
                      <span className="text-white font-medium uppercase">
                        {project.client}
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-400">{project.year}</span>
                    </div>

                    {/* High-Impact Project Title */}
                    <h3
                      onClick={() => {
                        playClick();
                        setActiveProject(project);
                      }}
                      className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.08] cursor-pointer group-hover:text-amber-300 transition-colors duration-300"
                    >
                      {project.title}
                    </h3>

                    {/* Concise Narrative */}
                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-light mt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean Technical Metrics & Stack (Zero Boxes / Zero Pills) */}
                  <div className="flex flex-col gap-5 pt-2">
                    {/* Free-Floating Metrics */}
                    <div className="grid grid-cols-2 gap-6 py-3 border-y border-white/[0.06]">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                          KEY BENCHMARK
                        </span>
                        <span className="font-display font-bold text-xl sm:text-2xl text-amber-300 tracking-tight">
                          {project.metrics[0]?.value}
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                          DISCIPLINE
                        </span>
                        <span className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Slash-Separated Stack */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-neutral-300">
                      <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-semibold mr-1">
                        STACK:
                      </span>
                      {project.technologies.slice(0, 6).map((tech, tIdx, arr) => (
                        <React.Fragment key={tIdx}>
                          <span className="hover:text-white transition-colors cursor-default">
                            {tech}
                          </span>
                          {tIdx < arr.length - 1 && (
                            <span className="text-neutral-500 select-none">/</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Clean Action Links */}
                    <div className="flex items-center gap-6 pt-2">
                      <button
                        onClick={() => {
                          playClick();
                          setActiveProject(project);
                        }}
                        onMouseEnter={() => playHover()}
                        className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer group/btn"
                      >
                        <span className="underline underline-offset-4 decoration-white/30 group-hover/btn:decoration-amber-400">
                          Inspect Case Study
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
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column B: Cinematic Visual Viewport (Seamless Depth) */}
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => {
                    playClick();
                    setActiveProject(project);
                  }}
                  className={`project-3d-visual lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-[#07070A] border border-white/[0.08] group-hover:border-amber-400/40 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group-hover:shadow-[0_25px_80px_rgba(245,158,11,0.12)] will-change-transform ${
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

                  {/* Ambient Lighting Sheen on Hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-500/[0.08] via-transparent to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle Vignette Gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Free-Floating Editorial Micro Label */}
                  <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <span className="underline underline-offset-4 decoration-amber-400">View Project</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
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



