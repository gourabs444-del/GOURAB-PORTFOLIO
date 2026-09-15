"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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
      const projectItems = listRef.current?.querySelectorAll(".project-showcase-row");
      projectItems?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const img = item.querySelector(".project-image-parallax");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1, y: -15 },
            {
              scale: 1.0,
              y: 15,
              ease: "none",
              scrollTrigger: {
                trigger: item,
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

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#050507] text-[#F4F4F6] overflow-hidden select-none"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.015] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-neutral-300 font-semibold">02 // SELECTED WORK</span>
              <span className="text-neutral-600">/</span>
              <span>2024 — 2026</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Clean Typography Filter Tabs (No Clunky Capsules) */}
          <div className="flex items-center flex-wrap gap-6 sm:gap-8 text-xs font-mono tracking-wider">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => playHover()}
                className={`relative py-1 transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "text-white font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Editorial Showcase Rows */}
        <div ref={listRef} className="flex flex-col">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-showcase-row group py-12 sm:py-16 md:py-20 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Left Column: Typography & Architectural Details */}
              <div
                className={`lg:col-span-5 flex flex-col justify-between h-full gap-8 ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div>
                  {/* Index and Client Meta */}
                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 tracking-wider mb-4">
                    <span className="text-sm font-bold text-white font-mono">
                      {project.number}
                    </span>
                    <span className="text-neutral-700">/</span>
                    <span className="text-neutral-400 font-medium uppercase">
                      {project.client}
                    </span>
                    <span className="text-neutral-700">•</span>
                    <span className="text-neutral-500">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => {
                      playClick();
                      setActiveProject(project);
                    }}
                    className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug cursor-pointer group-hover:text-amber-400 transition-colors duration-300"
                  >
                    {project.title}
                  </h3>

                  {/* Tagline & Description */}
                  <p className="font-sans text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Technical Specs & Clean Metric Line */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-6 text-xs font-mono">
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">
                        Primary Metric
                      </span>
                      <span className="text-white font-bold text-sm">
                        {project.metrics[0]?.value}
                      </span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/[0.08]" />
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">
                        Category
                      </span>
                      <span className="text-neutral-300 font-medium text-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Clean Stack (Separated by dots, no pill capsules) */}
                  <div className="text-xs font-mono text-neutral-500 leading-relaxed">
                    {project.technologies.slice(0, 5).join(" • ")}
                  </div>

                  {/* Clean Direct Actions */}
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
                        Explore Case Study
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

              {/* Right Column: Visual Showcase Canvas */}
              <div
                onClick={() => {
                  playClick();
                  setActiveProject(project);
                }}
                className={`lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-pointer bg-[#0A0A0E] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500 shadow-2xl ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="project-image-parallax relative w-full h-full">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.05]"
                  />
                </div>

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Sleek Floating Hover Indicator */}
                <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Editorial Footer Link */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-neutral-400">Available for select client projects & commissions</span>
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
            Initiate Collaboration &rarr;
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


