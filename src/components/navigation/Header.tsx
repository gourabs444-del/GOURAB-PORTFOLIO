"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { FullscreenMenu } from "./FullscreenMenu";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Menu } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playClick, playHover } = useAudioFeedback();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-[900] px-6 sm:px-10 md:px-16 py-6 sm:py-8 flex items-center justify-between bg-transparent border-none">
        {/* Left: Brand Monogram / Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection("hero")}
            onMouseEnter={() => playHover()}
            data-cursor="pointer"
            className="flex items-center gap-1 text-left group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
              Gourab<span className="text-amber-400">.</span>
            </span>
          </button>
        </div>

        {/* Center: Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans text-neutral-400 font-medium">
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
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-500 pl-4 border-l border-white/15">
            <span className="hover:text-neutral-300 cursor-pointer">FR</span>
            <span className="text-white font-bold underline underline-offset-4 cursor-pointer">
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
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-black hover:bg-amber-300 text-xs font-sans font-semibold tracking-tight transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
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
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
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
