"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";

export function SelectedWork() {
  const containerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const { playHover, playClick } = useAudioFeedback();

  const categories = ["ALL", "AI Systems", "Creative Dev", "Full-Stack", "Motion & Film"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playClick();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Project Cards Staggered Entrance
      const cards = listRef.current?.querySelectorAll(".showcase-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
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
      className="relative w-full overflow-visible bg-transparent select-none py-16 sm:py-24"
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-10 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[.28em] text-neutral-400 block mb-1.5 font-mono">
              The Collection
            </span>
            <h2 className="font-bodoni text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md self-start sm:self-end">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

          {/* Cards Grid */}
          <div
            ref={listRef}
            id="grid-all-projects"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
          >
            {filteredProjects.map((project) => {
              const isFav = !!favorites[project.id];

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    playClick();
                    setActiveProject(project);
                  }}
                  onMouseEnter={() => playHover()}
                  className="showcase-card group bg-[#0c0d11] rounded-[22px] p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.35)]"
                >
                  {/* Image Container with Apple-style Clean Bevel */}
                  <div className="relative aspect-[16/10.5] w-full rounded-[16px] overflow-hidden bg-[#08090b]">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Details */}
                  <div className="pt-3 px-1 pb-0.5 w-full">
                    <div className="flex items-center justify-between gap-3 w-full min-w-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] sm:text-[15px] font-bold text-white group-hover:text-purple-300 transition-colors truncate block leading-snug font-sans">
                          {project.title}
                        </h3>
                        <span className="text-[11px] sm:text-[12px] font-medium text-white/50 tracking-wide truncate block mt-0.5 font-sans">
                          {project.category} &bull; {project.client.split("//")[0]?.trim()}
                        </span>
                      </div>

                      {/* Right Action Icons: Letterboxd Stars, Fav Heart, Arrow */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Rating Stars */}
                        <div
                          className="flex items-center text-[#00e054] text-[12px] font-bold select-none tracking-tight"
                          title="Rating: 4.9 ★"
                        >
                          <span className="text-[#00e054] font-mono tracking-tighter text-[13px]">
                            ★★★★★
                          </span>
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(e, project.id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-red-500 active:scale-90 transition-all cursor-pointer flex items-center justify-center border border-white/10"
                          aria-label="Toggle Favorite"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-colors ${
                              isFav ? "fill-red-500 text-red-500" : "text-white/60"
                            }`}
                          />
                        </button>

                        {/* Direct Visit / Case Study Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.liveUrl) {
                              window.open(project.liveUrl, "_blank");
                            } else {
                              setActiveProject(project);
                            }
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all flex items-center justify-center border border-white/10"
                          title="Visit project"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
