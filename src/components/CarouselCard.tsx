"use client";

import React from "react";
import Link from "next/link";

interface CarouselCardProps {
  brandLogo: string;
  title: string;
  description: string;
  image: string;
  bgGradient: string;
  themeColor: string;
  btnHover: string;
}

export default function CarouselCard({
  brandLogo,
  title,
  description,
  image,
  bgGradient,
  themeColor,
  btnHover,
}: CarouselCardProps) {
  return (
    <div 
      className="carousel-card-wrapper absolute left-1/2 top-1/2 w-[260px] sm:w-[420px] md:w-[540px] lg:w-[640px] h-[160px] sm:h-[240px] md:h-[300px] lg:h-[360px] -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div 
        className={`carousel-card-inner w-full h-full rounded-[2.5rem] p-6 sm:p-9 md:p-11 flex flex-row items-center justify-between gap-4 sm:gap-8 ${bgGradient} border border-white/65 shadow-[0_8px_30px_rgba(0,0,0,0.012)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:brightness-[1.01] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] cursor-pointer group`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left Side: Content (Constrained to 55-60% width) */}
        <div 
          className="w-[58%] sm:w-[55%] flex flex-col items-start justify-between h-full"
          style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}
        >
          {/* Logo container */}
          <div className="relative h-6 sm:h-9 w-24 sm:w-36 mb-2 sm:mb-4 flex items-center">
            <img 
              src={brandLogo}
              alt="Brand Logo"
              className="max-h-full max-w-full object-contain object-left filter brightness-0 opacity-70 pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Texts */}
          <div className="flex-grow flex flex-col justify-center mb-3 sm:mb-5">
            <h4 className="text-xs sm:text-lg md:text-xl lg:text-[21px] font-semibold leading-snug text-slate-800 tracking-tight mb-2 group-hover:text-black transition-colors duration-300">
              {title}
            </h4>
            <p className="text-[10px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-500 font-medium leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Button Link */}
          <Link 
            href="#" 
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2.5 bg-white ${themeColor} text-[9px] sm:text-xs font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${btnHover}`}
          >
            View Project
          </Link>
        </div>

        {/* Right Side: Constrained Mockup Image (Uses standard img tag with max constraints to prevent overflow) */}
        <div 
          className="w-[38%] sm:w-[40%] h-[90%] flex justify-center items-center relative"
          style={{ 
            transform: "translateZ(20px) scale(1.02)", 
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.05))"
          }}
        >
          <div className="relative w-full h-full flex justify-center items-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-102 group-hover:rotate-1">
            <img 
              src={image} 
              alt={title} 
              className="max-w-full max-h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
