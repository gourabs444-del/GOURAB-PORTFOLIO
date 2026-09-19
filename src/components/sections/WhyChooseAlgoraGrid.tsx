"use client";

import React from "react";

interface WhyChooseAlgoraGridProps {
  onHoverSound?: () => void;
}

export function WhyChooseAlgoraGrid({ onHoverSound }: WhyChooseAlgoraGridProps) {
  const cards = [
    {
      id: 1,
      title: "Premium Quality",
      icon: "/icons/icon-premium-quality.png",
    },
    {
      id: 2,
      title: "Express Delivery",
      icon: "/icons/icon-express-delivery.png",
    },
    {
      id: 3,
      title: "Custom Solutions",
      icon: "/icons/icon-custom-solutions.png",
    },
    {
      id: 4,
      title: "Transparent Process",
      icon: "/icons/icon-transparent-process.png",
    },
    {
      id: 5,
      title: "Dedicated Support",
      icon: "/icons/icon-dedicated-support.png",
    },
  ];

  return (
    <div className="why-choose-content relative w-full max-w-5xl mx-auto px-3 sm:px-6 select-none">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
        {cards.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => onHoverSound?.()}
            className="why-card group relative rounded-2xl bg-white p-5 sm:p-6 lg:p-7 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] cursor-default overflow-hidden min-h-[130px] sm:min-h-[155px] lg:min-h-[170px]"
          >
            {/* PNG Icon */}
            <div className="mb-3 sm:mb-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                draggable={false}
              />
            </div>

            {/* Main Point Title */}
            <h4 className="font-sans font-bold text-[11px] sm:text-sm lg:text-base text-neutral-900 tracking-wide uppercase leading-tight">
              {card.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
