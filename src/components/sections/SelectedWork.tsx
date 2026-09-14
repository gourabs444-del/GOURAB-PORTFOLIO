"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight, Sparkles, Filter, Layers, ExternalLink } from "lucide-react";
import Image from "next/image";

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
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
      // Parallax and mask reveal on project cards
      const projectItems = containerRef.current?.querySelectorAll(".project-card-scene");
      projectItems?.forEach((item) => {
        // Entrance reveal on scroll
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const image = item.querySelector(".project-parallax-image");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.2, y: -30 },
            {
              scale: 1.0,
              y: 30,
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
      className="relative py-28 md:py-40 px-6 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-accent">02 // PORTFOLIO ARCHIVE</span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-mist">
                FEATURED COMMISSIONS & SYSTEMS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist mr-2 hidden sm:inline-flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-accent" /> FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => playHover()}
                data-cursor="pointer"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-accent text-black font-semibold shadow-[0_0_15px_rgba(229,169,60,0.4)]"
                    : "bg-surface-200/80 border border-white/10 text-mist hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Case Studies List */}
        <div className="flex flex-col gap-20 md:gap-32">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card-scene group relative rounded-3xl border border-white/[0.08] bg-surface-300/40 backdrop-blur-md overflow-hidden transition-colors duration-500 hover:border-white/20 shadow-2xl"
            >
              {/* Top Scene HUD Header */}
              <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/[0.06] text-xs font-mono text-mist">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-accent font-display">
                    // {project.number}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] uppercase tracking-widest text-[10px]">
                    {project.category}
                  </span>
                  <span className="hidden sm:inline-block text-white/40">{project.year}</span>
                </div>
              </div>

              {/* Main Media & Split Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 items-center">
                {/* Visual Media Showcase Frame */}
                <div
                  onClick={() => {
                    playClick();
                    setActiveProject(project);
                  }}
                  data-cursor="view"
                  data-cursor-text="CASE STUDY"
                  className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-pointer group/media border border-white/10 shadow-inner"
                >
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover/media:opacity-30 transition-opacity duration-500" />
                  <div className="project-parallax-image relative w-full h-full">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/media:scale-105"
                    />
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    CLICK TO EXPAND CASE
                  </div>

                  {/* Hover Floating Action */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black font-mono text-xs font-bold uppercase tracking-wider opacity-0 group-hover/media:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/media:translate-y-0">
                    <span>EXPLORE SPECS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Narrative & Technology Column */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-editorial text-base text-foreground/80 mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metric highlights */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/[0.06]">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-mist block">
                          {m.label}
                        </span>
                        <span className="font-mono font-bold text-base text-white">
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
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-mist"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <MagneticButton
                      variant="primary"
                      size="md"
                      cursorText="INSPECT"
                      onClick={() => {
                        setActiveProject(project);
                      }}
                    >
                      <span>VIEW DEEP DIVE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </MagneticButton>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono tracking-wider text-mist hover:text-white uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <span>LIVE URL</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
