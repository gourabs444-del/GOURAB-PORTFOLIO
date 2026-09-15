"use client";

import React, { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/sections/Preloader";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutManifesto } from "@/components/sections/AboutManifesto";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Showreel } from "@/components/sections/Showreel";
import { ProcessPipeline } from "@/components/sections/ProcessPipeline";
import { ExpertiseMatrix } from "@/components/sections/ExpertiseMatrix";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { SectionTransition } from "@/components/ui/SectionTransition";
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

      {/* 00 // HERO */}
      <Hero isLoaded={isLoaded} />

      {/* Transition: Hero -> Manifesto */}
      <SectionTransition
        fromLabel="00 // PROLOGUE"
        toLabel="01 // MANIFESTO"
        accentColor="#38BDF8"
        secondaryColor="#818CF8"
      />

      {/* 01 // MANIFESTO */}
      <AboutManifesto />

      {/* Transition: Manifesto -> Selected Work */}
      <SectionTransition
        fromLabel="01 // PHILOSOPHY"
        toLabel="02 // SELECTED WORKS"
        accentColor="#E5A93C"
        secondaryColor="#F59E0B"
      />

      {/* 02 // SELECTED WORK */}
      <SelectedWork />

      {/* Transition: Selected Work -> Showreel */}
      <SectionTransition
        fromLabel="02 // ARCHIVE"
        toLabel="03 // SHOWREEL & MOTION"
        accentColor="#F43F5E"
        secondaryColor="#FB7185"
      />

      {/* 03 // SHOWREEL */}
      <Showreel />

      {/* Transition: Showreel -> Execution Pipeline */}
      <SectionTransition
        fromLabel="03 // CINEMATIC"
        toLabel="04 // EXECUTION PIPELINE"
        accentColor="#A855F7"
        secondaryColor="#C084FC"
      />

      {/* 04 // PROCESS PIPELINE */}
      <ProcessPipeline />

      {/* Transition: Process Pipeline -> Skills & Expertise */}
      <SectionTransition
        fromLabel="04 // METHODOLOGY"
        toLabel="05 // SKILLS & EXPERTISE"
        accentColor="#38BDF8"
        secondaryColor="#0284C7"
      />

      {/* 05 // EXPERTISE MATRIX */}
      <ExpertiseMatrix />

      {/* Transition: Expertise Matrix -> Experience Timeline */}
      <SectionTransition
        fromLabel="05 // CAPABILITIES"
        toLabel="06 // CAREER CHRONOLOGY"
        accentColor="#F59E0B"
        secondaryColor="#E5A93C"
      />

      {/* 06 // EXPERIENCE & MILESTONES */}
      <ExperienceTimeline />

      {/* Transition: Experience -> Contact */}
      <SectionTransition
        fromLabel="06 // ARCHIVE"
        toLabel="07 // INITIATE TRANSMISSION"
        accentColor="#10B981"
        secondaryColor="#34D399"
      />

      {/* 07 // CONTACT & FOOTER */}
      <ContactFooter />
    </main>
  );
}

