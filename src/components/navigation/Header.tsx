"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { FullscreenMenu } from "./FullscreenMenu";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playClick, playHover } = useAudioFeedback();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[900] px-6 md:px-16 py-6 transition-all duration-300 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-black/[0.04]",
          isScrolled ? "py-4 shadow-sm" : "py-6"
        )}
      >
        {/* Left: Brand Monogram / Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection("hero")}
            onMouseEnter={() => playHover()}
            data-cursor="pointer"
            className="flex items-center gap-1 text-left group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span className="font-display font-extrabold text-2xl tracking-tighter text-[#111111]">
              Gourab<span className="text-rose-500">.</span>
            </span>
          </button>
        </div>

        {/* Center: Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans text-neutral-600 font-medium">
          {[
            { label: "Design", id: "work" },
            { label: "Experience", id: "experience" },
            { label: "About", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                scrollToSection(item.id);
              }}
              onMouseEnter={() => playHover()}
              className="hover:text-[#111111] transition-colors"
            >
              {item.label}
            </button>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-400 pl-4 border-l border-neutral-200">
            <span className="hover:text-neutral-700 cursor-pointer">FR</span>
            <span className="text-[#111111] font-bold underline underline-offset-4 cursor-pointer">
              EN
            </span>
          </div>
        </nav>

        {/* Right: Black Pill Email Button & Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#111111] text-white hover:bg-black text-xs font-sans font-medium tracking-tight transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>{siteConfig.contact.email}</span>
          </a>

          <button
            onClick={() => {
              playClick();
              setIsMenuOpen(true);
            }}
            onMouseEnter={() => playHover()}
            data-cursor="pointer"
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-neutral-200 text-[#111111] hover:bg-neutral-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu for Mobile / Extended Nav */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
