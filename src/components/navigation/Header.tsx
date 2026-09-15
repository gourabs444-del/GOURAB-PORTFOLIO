"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { FullscreenMenu } from "./FullscreenMenu";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { Menu, ArrowUpRight } from "lucide-react";
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
          "fixed top-0 left-0 right-0 z-[900] px-4 sm:px-8 md:px-16 transition-all duration-300 flex items-center justify-between bg-[#050507]/75 backdrop-blur-xl border-b border-white/[0.06]",
          isScrolled ? "py-3 sm:py-4 shadow-lg shadow-black/40" : "py-3.5 sm:py-5 md:py-6"
        )}
      >
        {/* Left: Brand Monogram / Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-1.5 text-left group cursor-pointer"
          >
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Gourab<span className="text-purple-400">.</span>
            </span>
          </button>
        </div>

        {/* Center: Navigation Links matching Reference */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans text-neutral-300 font-medium">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-white flex flex-col items-center gap-1 cursor-pointer"
          >
            <span>Home</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,1)]" />
          </button>

          {[
            { label: "About", id: "about" },
            { label: "Work", id: "work" },
            { label: "Services", id: "what-i-do" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Let's Talk Pill Button & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full border border-purple-400/40 hover:border-purple-400 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-sans font-medium tracking-wide transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors"
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
