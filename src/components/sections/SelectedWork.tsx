"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { playHover, playClick } = useAudioFeedback();

  const headerRef = useRef<HTMLDivElement | null>(null);

  const categories = ["ALL", "AI Systems", "Creative Dev", "Full-Stack", "Motion & Film"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Sequential Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".header-reveal"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Project Cards symmetrical entrance
      const cards = listRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-36 px-6 sm:px-10 md:px-16 lg:px-20 bg-[#040407] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Background Soft Ambient Light */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.06)_0%,_rgba(56,189,248,0.03)_40%,_transparent_75%)] blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16 relative z-10">
        {/* ========================================================= */}
        {/* 1. EDITORIAL SECTION HEADER                               */}
        {/* ========================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]"
        >
          <div className="flex flex-col gap-3 max-w-2xl">
            {/* Tag */}
            <div className="header-reveal inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              <span className="text-white font-semibold">02 // SELECTED WORK</span>
              <span className="text-white/20">/</span>
              <span className="text-neutral-400">ARCHIVE 2024 &mdash; 2026</span>
            </div>

            <h2 className="header-reveal font-bodoni font-medium text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
              SELECTED <br />
              <span className="font-bodoni italic font-normal bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                WORKS &amp; ARTIFACTS
              </span>
            </h2>

            <p className="header-reveal font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl font-light">
              High-throughput digital platforms, spatial WebGL environments, and autonomous AI architectures engineered with obsessive precision.
            </p>
          </div>

          {/* Clean Category Filter Tabs */}
          <div className="header-reveal flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start lg:self-end">
            {categories.map((cat) => {
              const count =
                cat === "ALL"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] ${isSelected ? "text-black/70" : "text-neutral-600"}`}>
                    [{count}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SYMMETRIC LEVEL-MATCHED 2-COLUMN LUXURY GRID           */}
        {/* ========================================================= */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => {
                playClick();
                setActiveProject(project);
              }}
              onMouseEnter={() => playHover()}
              className="project-card group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.05)] cursor-pointer"
            >
              {/* Image Container with Sleek Hover Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#090A0F] border border-white/[0.06] group-hover:border-white/20 transition-all duration-500">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02] brightness-95 group-hover:brightness-105"
                />

                {/* Subtle Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Corner Hover Action Arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110 shadow-lg">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Minimal Clean Content Area - Mudda Ki Baat */}
              <div className="flex flex-col gap-2.5 pt-4 px-1 pb-1 text-left">
                {/* Meta Header Line */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">
                      // {project.number}
                    </span>
                    <span className="text-neutral-700">/</span>
                    <span className="uppercase tracking-wider text-neutral-300 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <span className="text-neutral-500">
                    {project.year} &bull; {project.client.split("//")[1]?.trim() || "GLOBAL"}
                  </span>
                </div>

                {/* Title & Arrow */}
                <h3 className="font-bodoni font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-300 transition-colors duration-200">
                  {project.title}
                </h3>

                {/* 1-Line Clean Professional Tagline */}
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-2">
                  {project.tagline || project.description}
                </p>

                {/* Tech Highlights */}
                <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-neutral-600 text-[10px]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 3. ARCHITECTURAL FOOTER BANNER                            */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-neutral-400 p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-white font-semibold">LOOKING FOR BESPOKE ARCHITECTURE?</span>
              <span className="text-neutral-500 hidden sm:inline">&bull;</span>
              <span className="text-neutral-400">Accepting select client commissions for 2026</span>
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => {
              playClick();
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs tracking-tight shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer w-fit"
          >
            <span>Initiate Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
