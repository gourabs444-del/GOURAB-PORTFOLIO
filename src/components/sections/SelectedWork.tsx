"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import {
  ArrowUpRight,
  Filter,
  ExternalLink,
  Github,
  Zap,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax and smooth reveal on project cards
      const projectItems = listRef.current?.querySelectorAll(".project-card-scene");
      projectItems?.forEach((item) => {
        // Entrance reveal on scroll
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const image = item.querySelector(".project-parallax-image");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.15, y: -20 },
            {
              scale: 1.0,
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 md:py-40 px-4 sm:px-8 md:px-14 border-t border-white/10 overflow-hidden bg-[#070709] text-foreground"
    >
      {/* Precision Technical Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Atmospheric Ambient Spotlights */}
      <div className="absolute top-1/4 left-10 w-[650px] h-[400px] bg-amber-500/[0.05] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[400px] bg-sky-500/[0.05] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 font-mono text-xs text-amber-400 font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                02 // FEATURED WORK
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                CURATED CASE STUDIES
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none drop-shadow-sm">
              SELECTED ARCHIVE
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed max-w-xl font-normal">
              High-throughput architectures, WebGL spatial canvases, and bespoke digital platforms crafted with obsessive attention to craft and performance.
            </p>
          </div>

          {/* Filter Navigation Pills */}
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mr-1 hidden sm:inline-flex items-center gap-1.5 font-medium">
              <Filter className="w-3.5 h-3.5 text-amber-400" /> FILTER:
            </span>
            {categories.map((cat) => {
              const count =
                cat === "ALL"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => playHover()}
                  data-cursor="pointer"
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105"
                      : "bg-[#14141C] border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 hover:bg-[#1C1C28]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      selectedCategory === cat
                        ? "bg-black/15 text-black"
                        : "bg-white/10 text-neutral-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Case Studies List (Crisp, High-Contrast Elevated Cards) */}
        <div ref={listRef} className="flex flex-col gap-16 md:gap-24">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-scene group relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#14141E] via-[#0F0F16] to-[#0A0A0F] overflow-hidden transition-all duration-500 hover:border-white/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              style={
                {
                  "--project-accent": project.accentColor,
                } as React.CSSProperties
              }
            >
              {/* Vibrant Accent Corner Glow */}
              <div
                className="absolute top-0 right-0 w-[450px] h-[450px] opacity-10 group-hover:opacity-25 transition-opacity duration-700 blur-[120px] pointer-events-none rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Giant Watermark Background Number for Depth */}
              <div className="absolute right-6 -bottom-10 font-display font-black text-8xl sm:text-9xl text-white/[0.03] group-hover:text-white/[0.06] select-none pointer-events-none transition-colors duration-500">
                {project.number}
              </div>

              {/* Top Scene HUD Header */}
              <div className="px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between border-b border-white/10 text-xs font-mono bg-white/[0.02]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className="text-lg sm:text-xl font-black font-display tracking-tight"
                    style={{ color: project.accentColor }}
                  >
                    // {project.number}
                  </span>
                  <span className="text-white/25">|</span>
                  <span className="text-white font-bold text-sm sm:text-base tracking-tight">
                    {project.client}
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className="px-3 py-1 rounded-lg border uppercase tracking-widest text-[10px] font-bold"
                    style={{
                      borderColor: `${project.accentColor}40`,
                      backgroundColor: `${project.accentColor}15`,
                      color: project.accentColor,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="hidden sm:inline-block text-neutral-400 font-mono font-medium">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Main Media & Split Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 p-6 sm:p-8 md:p-10 items-center relative z-10">
                {/* Visual Media Showcase Frame (Crisp, High Contrast, Vibrant) */}
                <div
                  onClick={() => {
                    playClick();
                    setActiveProject(project);
                  }}
                  data-cursor="view"
                  data-cursor-text="EXPLORE"
                  className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-pointer group/media border border-white/20 shadow-2xl bg-[#1A1A26] ring-1 ring-white/10"
                >
                  {/* Crystal Clear Parallax Image Frame */}
                  <div className="project-parallax-image relative w-full h-full">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover/media:scale-108 filter brightness-[1.03] contrast-[1.08]"
                    />
                  </div>

                  {/* Subtle Top & Bottom Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover/media:opacity-20 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Left Feature Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase text-white font-bold shadow-lg">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: project.accentColor, color: project.accentColor }}
                    />
                    <span>FEATURED SYSTEM</span>
                  </div>

                  {/* Hover Floating Action Badge */}
                  <div
                    className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-5 py-3 rounded-full text-black font-mono text-xs font-black uppercase tracking-wider opacity-0 group-hover/media:opacity-100 transition-all duration-300 transform translate-y-3 group-hover/media:translate-y-0 shadow-2xl"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Narrative & Technology Column (High Contrast) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-neutral-300 mt-3.5 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* High-Contrast Benchmark Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3.5 py-4 border-y border-white/10">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-1 font-medium">
                          {m.label}
                        </span>
                        <span
                          className="font-mono font-black text-base sm:text-lg text-white"
                          style={{ color: idx === 0 ? project.accentColor : "#FFFFFF" }}
                        >
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#181824] border border-white/10 text-xs font-mono text-neutral-200 font-medium hover:border-white/25 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* High Contrast Action Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        playClick();
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-sans font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-semibold tracking-wider text-neutral-300 hover:text-white uppercase flex items-center gap-1.5 transition-colors py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08]"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-r from-[#151520] via-[#101018] to-[#151520] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Have an ambitious vision or project?
            </h4>
            <p className="font-sans text-sm text-neutral-300">
              Let&apos;s architect bespoke WebGL canvases, full-stack systems, and cinematic digital products.
            </p>
          </div>
          <a
            href="#contact"
            onClick={() => {
              playClick();
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 rounded-full bg-amber-400 text-black hover:bg-amber-300 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap shadow-[0_0_25px_rgba(251,191,36,0.4)] cursor-pointer"
          >
            Start a Conversation
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

