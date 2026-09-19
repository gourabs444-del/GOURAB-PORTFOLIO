"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, Cpu, Eye, Gauge, Headphones } from "lucide-react";

interface WhyChooseAlgoraGridProps {
  onHoverSound?: () => void;
}

export function WhyChooseAlgoraGrid({ onHoverSound }: WhyChooseAlgoraGridProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardEnter = (id: number) => {
    setActiveCard(id);
    if (onHoverSound) onHoverSound();
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  const cards = [
    {
      id: 1,
      title: "Premium Quality",
      icon: Award,
      bg: "bg-[#181308]",
      border: "border-amber-500/35 hover:border-amber-400",
      glow: "hover:shadow-[0_12px_36px_rgba(245,158,11,0.25)]",
      iconBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
    {
      id: 2,
      title: "Data Security",
      icon: ShieldCheck,
      bg: "bg-[#071912]",
      border: "border-emerald-500/35 hover:border-emerald-400",
      glow: "hover:shadow-[0_12px_36px_rgba(16,185,129,0.25)]",
      iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    {
      id: 3,
      title: "Custom Solutions",
      icon: Cpu,
      bg: "bg-[#061622]",
      border: "border-cyan-500/35 hover:border-cyan-400",
      glow: "hover:shadow-[0_12px_36px_rgba(6,182,212,0.25)]",
      iconBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    {
      id: 4,
      title: "Transparent Process",
      icon: Eye,
      bg: "bg-[#160b22]",
      border: "border-purple-500/35 hover:border-purple-400",
      glow: "hover:shadow-[0_12px_36px_rgba(168,85,247,0.25)]",
      iconBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    },
    {
      id: 5,
      title: "On-Time Delivery",
      icon: Gauge,
      bg: "bg-[#220914]",
      border: "border-rose-500/35 hover:border-rose-400",
      glow: "hover:shadow-[0_12px_36px_rgba(244,63,94,0.25)]",
      iconBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    },
    {
      id: 6,
      title: "Dedicated Support",
      icon: Headphones,
      bg: "bg-[#0a0d24]",
      border: "border-indigo-500/35 hover:border-indigo-400",
      glow: "hover:shadow-[0_12px_36px_rgba(99,102,241,0.25)]",
      iconBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    },
  ];

  return (
    <div className="why-choose-content relative w-full max-w-5xl mx-auto px-3 sm:px-6 select-none">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 relative z-10">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              onMouseEnter={() => handleCardEnter(card.id)}
              onMouseLeave={handleCardLeave}
              className={`why-card group relative rounded-2xl ${card.bg} border ${card.border} p-5 sm:p-7 lg:p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 ${card.glow} cursor-default overflow-hidden min-h-[140px] sm:min-h-[165px] lg:min-h-[185px]`}
            >
              {/* Clean Logo Icon Box */}
              <div className="mb-3 sm:mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl ${card.iconBg} border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </div>
              </div>

              {/* Main Point Title */}
              <h4 className="font-sans font-extrabold text-xs sm:text-base lg:text-lg text-white tracking-wide uppercase leading-tight">
                {card.title}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
