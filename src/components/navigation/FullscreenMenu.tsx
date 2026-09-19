"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { X, ArrowUpRight, Globe, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

export function FullscreenMenu({ isOpen, onClose, onNavigate }: FullscreenMenuProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { playHover, playClick } = useAudioFeedback();

  const navLinks = [
    { number: "01", label: "SELECTED WORK", target: "work", previewImage: projects[0]?.heroImage },
    { number: "02", label: "MANIFESTO", target: "about", previewImage: projects[1]?.heroImage },
    { number: "03", label: "EXPERTISE", target: "expertise", previewImage: projects[2]?.heroImage },
    { number: "04", label: "THE PIPELINE", target: "process", previewImage: projects[3]?.heroImage },
    { number: "05", label: "JOURNEY", target: "experience", previewImage: projects[0]?.secondaryImage },
    { number: "06", label: "INITIATE CONTACT", target: "contact", previewImage: projects[1]?.secondaryImage },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(container, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });

      const links = container.querySelectorAll(".menu-item");
      gsap.fromTo(
        links,
        { y: 60, opacity: 0, skewY: 4 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.15,
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(container, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (targetId: string) => {
    playClick();
    onClose();
    setTimeout(() => {
      onNavigate(targetId);
    }, 400);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] flex flex-col justify-between bg-void/98 p-6 md:p-12 backdrop-blur-2xl opacity-0 pointer-events-none transition-opacity"
      aria-hidden={!isOpen}
    >
      {/* Top Bar inside menu */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl tracking-tighter text-white">
            {siteConfig.moniker}
          </span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-mist flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            NAVIGATION TERMINAL
          </span>
        </div>

        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          data-cursor="pointer"
          data-cursor-text="CLOSE"
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-accent bg-white/[0.04] text-foreground hover:text-accent transition-all duration-300"
          aria-label="Close navigation"
        >
          <span className="font-mono text-xs uppercase tracking-widest">CLOSE</span>
          <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      {/* Main Links + Visual Vignette Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8 items-center">
        {/* Navigation Items */}
        <div ref={linksRef} className="lg:col-span-7 flex flex-col gap-3">
          {navLinks.map((item, index) => (
            <div
              key={item.target}
              className="menu-item overflow-hidden"
              onMouseEnter={() => {
                playHover();
                setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                onClick={() => handleLinkClick(item.target)}
                data-cursor="pointer"
                data-cursor-text="VISIT"
                className="group flex items-baseline gap-4 md:gap-8 text-left transition-all duration-300 w-full"
              >
                <span className="font-mono text-xs md:text-sm text-mist/60 group-hover:text-accent transition-colors">
                  {item.number}
                </span>
                <span className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/70 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                  {item.label}
                </span>
                <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-white/20 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          ))}
        </div>

        {/* Live Vignette Hover Display (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-surface-200/80 shadow-2xl">
            {navLinks.map((item, idx) => (
              <div
                key={item.target}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  hoveredIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                {item.previewImage && (
                  <Image
                    src={item.previewImage}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    {item.number} // SECTION PREVIEW
                  </span>
                  <p className="font-display text-xl font-bold text-white mt-1">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

            {hoveredIndex === null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-surface-300/60">
                <Sparkles className="w-8 h-8 text-accent/50 mb-3 animate-pulse" />
                <p className="font-mono text-xs uppercase tracking-widest text-mist">
                  HOVER OVER A SECTION TO INSPECT
                </p>
                <p className="font-display text-sm text-foreground/60 mt-1 max-w-xs">
                  {siteConfig.tagline}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Info inside Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] text-xs font-mono text-mist">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-accent" />
          <span>{siteConfig.location.coordinates}</span>
        </div>
        <div className="flex items-center gap-2 md:justify-center">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>STATUS: {siteConfig.availability.label}</span>
        </div>
        <div className="flex items-center gap-4 md:justify-end flex-wrap">
          {siteConfig.socials.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {soc.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
