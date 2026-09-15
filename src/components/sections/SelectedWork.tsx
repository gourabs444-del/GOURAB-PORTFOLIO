"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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

  // Smooth Elegant Scroll Reveal (Zero 3D Distortion)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll(".project-editorial-card");

      items?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-48 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#05060A] text-[#F4F4F6] overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Background Soft Ambient Light */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.06)_0%,_rgba(56,189,248,0.03)_40%,_transparent_75%)] blur-[150px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* ========================================================= */}
        {/* 1. EDITORIAL SECTION HEADER                               */}
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
              High-end digital platforms, spatial WebGL graphics, and autonomous generative AI architectures.
            </p>
          </div>

          {/* Minimal Filter Tabs (Clean text & active line) */}
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
        {/* 2. PINTEREST-STYLE 2-COLUMN LUXURY EDITORIAL GRID         */}
        {/* ========================================================= */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20"
        >
          {filteredProjects.map((project, index) => {
            const isOffset = index % 2 === 1;

            return (
              <article
                key={project.id}
                onClick={() => {
                  playClick();
                  setActiveProject(project);
                }}
                onMouseEnter={() => playHover()}
                className={`project-editorial-card group relative flex flex-col gap-6 cursor-pointer ${
                  isOffset ? "md:mt-16" : ""
                }`}
              >
                {/* Large Pinterest Visual Frame with Silky Smooth Zoom */}
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#090A0F] border border-white/[0.08] group-hover:border-white/25 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.04] brightness-95 group-hover:brightness-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top-Right Floating Metric Badge */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300">
                    {project.metrics[0]?.value}
                  </div>

                  {/* Bottom-Right Magnetic Hover Arrow */}
                  <div className="absolute bottom-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shadow-xl">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Minimal Editorial Caption (Less Text, High Impact) */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {/* Category & Year Line */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">
                        // {project.number}
                      </span>
                      <span className="text-neutral-700">/</span>
                      <span className="uppercase tracking-wider text-neutral-300">
                        {project.category}
                      </span>
                    </div>

                    <span className="text-neutral-500">{project.year}</span>
                  </div>

                  {/* Clean Bold Title */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-amber-300 transition-colors duration-300">
                      {project.title.split("//")[0]?.trim() || project.title}
                    </h3>
                  </div>

                  {/* Punchy 1-line Tagline */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-2">
                    {project.tagline || project.description}
                  </p>

                  {/* Minimal Tech Stack Divider */}
                  <div className="pt-2 text-[11px] font-mono text-neutral-500 flex flex-wrap items-center gap-x-2">
                    {project.technologies.slice(0, 4).map((tech, tIdx, arr) => (
                      <React.Fragment key={tIdx}>
                        <span className="hover:text-neutral-300 transition-colors">
                          {tech}
                        </span>
                        {tIdx < arr.length - 1 && <span>/</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. EDITORIAL FOOTER LINK                                  */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500 border-t border-white/[0.08]">
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




