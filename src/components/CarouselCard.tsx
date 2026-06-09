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
  mobileMode?: boolean;
}

export default function CarouselCard({
  brandLogo,
  title,
  description,
  image,
  bgGradient,
  themeColor,
  btnHover,
  mobileMode = false,
}: CarouselCardProps) {
  return (
    <div 
      className={`carousel-card-wrapper select-none ${
        mobileMode 
          ? "w-full h-full relative" 
          : "absolute left-1/2 top-1/2 w-[280px] sm:w-[420px] md:w-[480px] lg:w-[560px] xl:w-[640px] h-[380px] sm:h-[220px] md:h-[240px] lg:h-[280px] xl:h-[320px] -translate-x-1/2 -translate-y-1/2"
      }`}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div 
        className={`carousel-card-inner w-full h-full rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-7 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 ${bgGradient} border border-white/65 shadow-[0_8px_30px_rgba(0,0,0,0.012)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:brightness-[1.01] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] cursor-pointer group`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left Side: Content (Constrained to 55-60% width) */}
        <div 
          className="w-full sm:w-[55%] flex flex-col items-start justify-between flex-1 sm:h-full order-2 sm:order-1"
          style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}
        >
          {/* Logo container */}
          <div className="relative h-4 sm:h-6 w-16 sm:w-24 mb-2 sm:mb-4 flex items-center">
            <img 
              src={brandLogo}
              alt="Brand Logo"
              className="max-h-full max-w-full object-contain object-left filter brightness-0 opacity-70 pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Texts */}
          <div className="flex-grow flex flex-col justify-center mb-3 sm:mb-5">
            <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] font-semibold leading-snug text-slate-800 tracking-tight mb-2 group-hover:text-black transition-colors duration-300">
              {title}
            </h4>
            <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] text-slate-500 font-medium leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Button Link */}
          <Link 
            href="#" 
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 bg-white ${themeColor} text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${btnHover}`}
          >
            View Project
          </Link>
        </div>

        {/* Right Side: Constrained Mockup Image (Uses standard img tag with max constraints to prevent overflow) */}
        <div 
          className="w-full sm:w-[40%] h-[40%] sm:h-[90%] flex justify-center items-center relative order-1 sm:order-2"
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
