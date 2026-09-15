"use client";

import React, { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/sections/Preloader";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutManifesto } from "@/components/sections/AboutManifesto";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Showreel } from "@/components/sections/Showreel";
import { ProcessPipeline } from "@/components/sections/ProcessPipeline";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { MovingTestimonials } from "@/components/sections/MovingTestimonials";
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
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Cinematic Intro Preloader */}
      <Preloader onComplete={handleLoaded} />

      {/* Atmospheric Ambience Layers */}
      <FilmGrain />
      <AmbientCanvas />

      {/* Main Navigation */}
      <Header />

      {/* Editorial Content Sections */}
      <Hero isLoaded={isLoaded} />
      <AboutManifesto />
      <WhatIDo />
      <SelectedWork />
      <Showreel />
      <ProcessPipeline />
      <ExperienceTimeline />
      <MovingTestimonials />
      <ContactFooter />
    </main>
  );
}
