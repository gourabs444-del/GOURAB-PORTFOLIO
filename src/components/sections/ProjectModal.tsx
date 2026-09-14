"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "@/data/projects";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { playClick } = useAudioFeedback();

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    if (project) {
      document.body.style.overflow = "hidden";
      gsap.to(container, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.fromTo(
        content,
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(container, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power3.in",
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 md:p-8 bg-void/90 backdrop-blur-2xl opacity-0 pointer-events-none transition-opacity"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-surface-300 shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 md:p-12 text-foreground custom-scrollbar"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                CASE STUDY // {project.number}
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs text-mist uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            data-cursor="pointer"
            data-cursor-text="CLOSE"
            className="p-2.5 rounded-full border border-white/10 bg-surface-200 hover:bg-surface-100 hover:border-accent text-mist hover:text-white transition-all duration-300"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden my-8 border border-white/10">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-300 via-transparent to-black/30" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
              <span className="font-mono text-[11px] text-mist block uppercase tracking-widest">
                ROLE
              </span>
              <span className="font-sans text-sm font-semibold text-white">
                {project.role}
              </span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
              <span className="font-mono text-[11px] text-mist block uppercase tracking-widest">
                TIMELINE / YEAR
              </span>
              <span className="font-mono text-sm font-bold text-accent">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Deep Dive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Description */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                OVERVIEW & ARCHITECTURE
              </h3>
              <p className="font-editorial text-lg text-foreground/90 leading-relaxed">
                {project.fullOverview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>THE CHALLENGE</span>
                </div>
                <p className="font-sans text-xs text-mist leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>THE SOLUTION</span>
                </div>
                <p className="font-sans text-xs text-mist leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Secondary Visual Asset */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 mt-4">
              <Image
                src={project.secondaryImage}
                alt="System Architecture & Viewport Detail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Sidebar Metadata */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Action Links */}
            <div className="flex flex-col gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <MagneticButton variant="primary" size="md" className="w-full justify-between">
                    <span>LAUNCH LIVE SYSTEM</span>
                    <ExternalLink className="w-4 h-4" />
                  </MagneticButton>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <MagneticButton variant="secondary" size="md" className="w-full justify-between">
                    <span>SOURCE REPOSITORY</span>
                    <Github className="w-4 h-4" />
                  </MagneticButton>
                </a>
              )}
            </div>

            {/* Quantified Metrics Box */}
            <div className="p-5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-accent" />
                <span>BENCHMARK METRICS</span>
              </h4>
              <div className="space-y-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-baseline border-b border-white/[0.04] pb-2 text-xs">
                    <span className="text-mist font-sans">{m.label}</span>
                    <span className="font-mono font-bold text-accent">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="p-5 rounded-xl bg-surface-200/80 border border-white/[0.06]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-3">
                TECHNOLOGIES UTILIZED
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-surface-100 border border-white/[0.08] text-[11px] font-mono text-mist"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
