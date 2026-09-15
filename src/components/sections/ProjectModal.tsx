"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Project } from "@/data/projects";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(project);
  const [isVisible, setIsVisible] = useState(false);
  const { playClick } = useAudioFeedback();

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
      setIsVisible(true);
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        if (containerRef.current && contentRef.current) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" }
          );
          gsap.fromTo(
            contentRef.current,
            { y: 50, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
          );
        }
      });
    }
  }, [project]);

  const handleClose = () => {
    playClick();
    if (containerRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.97,
        duration: 0.3,
        ease: "power3.in",
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          document.body.style.overflow = "";
          setIsVisible(false);
          setCurrentProject(null);
          onClose();
        },
      });
    } else {
      document.body.style.overflow = "";
      setIsVisible(false);
      setCurrentProject(null);
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isVisible || !currentProject) return null;

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (e.target === containerRef.current) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto select-none"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0E0E14] shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-8 md:p-12 text-foreground custom-scrollbar my-auto"
        style={
          {
            "--modal-accent": currentProject.accentColor,
          } as React.CSSProperties
        }
      >
        {/* Subtle Ambient Light Blob inside Modal */}
        <div
          className="absolute top-0 right-0 w-[450px] h-[300px] opacity-15 blur-[120px] pointer-events-none rounded-full"
          style={{ backgroundColor: currentProject.accentColor }}
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-xs uppercase tracking-widest font-bold"
                style={{ color: currentProject.accentColor }}
              >
                CASE STUDY // {currentProject.number}
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                {currentProject.category}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              {currentProject.title}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-3 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Visual Showcase */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden my-8 border border-white/10 bg-neutral-900">
          <Image
            src={currentProject.heroImage}
            alt={currentProject.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-transparent to-black/40" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4">
            <div className="bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-widest">
                ROLE
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-white">
                {currentProject.role}
              </span>
            </div>
            <div className="bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
              <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-widest">
                TIMELINE / YEAR
              </span>
              <span
                className="font-mono text-xs sm:text-sm font-bold"
                style={{ color: currentProject.accentColor }}
              >
                {currentProject.year}
              </span>
            </div>
          </div>
        </div>

        {/* Deep Dive Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Main Description */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <h3
                className="font-mono text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2"
                style={{ color: currentProject.accentColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                OVERVIEW & ARCHITECTURE
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {currentProject.fullOverview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>THE CHALLENGE</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {currentProject.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>THE SOLUTION</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {currentProject.solution}
                </p>
              </div>
            </div>

            {/* Secondary Visual Asset */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mt-4 bg-neutral-900">
              <Image
                src={currentProject.secondaryImage}
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
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-6 py-3.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                >
                  <span>LAUNCH LIVE SYSTEM</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-6 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>SOURCE REPOSITORY</span>
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Quantified Metrics Box */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-2 font-bold">
                <Cpu className="w-4 h-4 text-accent" />
                <span>BENCHMARK METRICS</span>
              </h4>
              <div className="space-y-3.5">
                {currentProject.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-baseline border-b border-white/[0.04] pb-2.5 text-xs"
                  >
                    <span className="text-neutral-400 font-sans">{m.label}</span>
                    <span
                      className="font-mono font-bold text-sm"
                      style={{ color: currentProject.accentColor }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-3.5 font-bold">
                TECHNOLOGIES UTILIZED
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300"
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

