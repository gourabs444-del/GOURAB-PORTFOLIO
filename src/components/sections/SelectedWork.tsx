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
      className="relative py-28 md:py-40 px-4 sm:px-8 md:px-14 border-t border-white/[0.08] overflow-hidden bg-[#09090C] text-foreground"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[300px] bg-sky-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.08] pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-2 font-mono text-xs text-accent font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                02 // SELECTED ARCHIVE
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                CASE STUDIES & SYSTEMS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              FEATURED WORK
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-xl">
              A curated selection of high-throughput web applications, custom WebGL shaders, and bespoke interactive platforms built for ambitious teams worldwide.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mr-2 hidden sm:inline-flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-accent" /> CATEGORY:
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
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                      : "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedCategory === cat
                        ? "bg-black/15 text-black"
                        : "bg-white/[0.06] text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Case Studies List */}
        <div ref={listRef} className="flex flex-col gap-16 md:gap-24">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-scene group relative rounded-3xl border border-white/[0.08] bg-[#0E0E13]/70 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              style={
                {
                  "--project-accent": project.accentColor,
                } as React.CSSProperties
              }
            >
              {/* Subtle hover glow accent */}
              <div
                className="absolute top-0 right-0 w-[400px] h-[400px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-[100px] pointer-events-none rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Top Scene HUD Header */}
              <div className="px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between border-b border-white/[0.06] text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className="text-lg font-bold font-display"
                    style={{ color: project.accentColor }}
                  >
                    // {project.number}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {project.client}
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] uppercase tracking-widest text-[10px] text-neutral-300">
                    {project.category}
                  </span>
                  <span className="hidden sm:inline-block text-neutral-400 font-mono">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Main Media & Split Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 items-center">
                {/* Visual Media Showcase Frame */}
                <div
                  onClick={() => {
                    playClick();
                    setActiveProject(project);
                  }}
                  data-cursor="view"
                  data-cursor-text="EXPLORE"
                  className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-pointer group/media border border-white/10 shadow-inner bg-neutral-900"
                >
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover/media:opacity-30 transition-opacity duration-500" />
                  <div className="project-parallax-image relative w-full h-full">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover/media:scale-105"
                    />
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-white/90">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span>FEATURED CASE</span>
                  </div>

                  {/* Hover Floating Action Badge */}
                  <div
                    className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full text-black font-mono text-xs font-bold uppercase tracking-wider opacity-0 group-hover/media:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/media:translate-y-0 shadow-lg"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    <span>VIEW DEEP DIVE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Narrative & Technology Column */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-white transition-colors duration-300 leading-snug">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-300 mt-3.5 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Metric highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/[0.06]">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                          {m.label}
                        </span>
                        <span
                          className="font-mono font-bold text-sm sm:text-base text-white"
                          style={{ color: idx === 0 ? project.accentColor : "#ffffff" }}
                        >
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        playClick();
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-sans font-semibold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono tracking-wider text-neutral-400 hover:text-white uppercase flex items-center gap-1.5 transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.05]"
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

        {/* Bottom Callout Ribbon */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
              Have an ambitious product in mind?
            </h4>
            <p className="font-sans text-sm text-neutral-400">
              Let&apos;s build bespoke interactive experiences, high-throughput architectures, and next-gen web systems together.
            </p>
          </div>
          <a
            href="#contact"
            onClick={() => {
              playClick();
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full bg-accent text-black hover:bg-amber-300 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap shadow-[0_0_20px_rgba(229,169,60,0.3)] cursor-pointer"
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

