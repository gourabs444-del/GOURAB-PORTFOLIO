"use client";

import React, { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/sections/Preloader";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutManifesto } from "@/components/sections/AboutManifesto";
import { CreativeMindsSection } from "@/components/sections/CreativeMindsSection";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Showreel } from "@/components/sections/Showreel";
import { BrandIntegrationSection } from "@/components/sections/BrandIntegrationSection";
import { ProcessPipeline } from "@/components/sections/ProcessPipeline";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { IdeasIntoImpact } from "@/components/sections/IdeasIntoImpact";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { FilmGrain } from "@/components/ambient/FilmGrain";
import { AmbientCanvas } from "@/components/ambient/AmbientCanvas";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis Smooth Scroll with GSAP Ticker sync
  useLenis();

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-x-clip">
      {/* Cinematic Intro Preloader */}
      <Preloader onComplete={handleLoaded} />

      {/* Atmospheric Ambience Layers */}
      <FilmGrain />
      <AmbientCanvas />

      {/* Main Navigation */}
      <Header />

      {/* 1. SCROLLABLE HERO INTRO CONTAINER (200vh) WITH CINEMA PORTAL STAGE */}
      <div
        id="hero-intro-container"
        className="relative w-full h-[200vh] bg-[#050507] overflow-visible"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden z-10 flex items-center justify-center p-0">
          <Hero isLoaded={isLoaded} />
        </div>
      </div>

      {/* 2. OVERLAPPING MAIN DARK DRAWER SHEET (Slides up seamlessly over White Hero) */}
      <div
        id="main-drawer-sheet"
        className="relative z-30 -mt-[100vh] bg-[#050507] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] border-t border-white/10 overflow-clip"
      >
        <AboutManifesto />
        <CreativeMindsSection />
        <SelectedWork />
        <Showreel />
        <BrandIntegrationSection />
        <ExperienceTimeline />
        <ProcessPipeline />
        <IdeasIntoImpact />
        <ContactFooter />
      </div>
    </main>
  );
}
