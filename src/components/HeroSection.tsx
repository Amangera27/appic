"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "./Header";


const BARS_DATA = [
  { left: "-2%", width: "8vw", height: "80vh", grad: "from-[#DE0A26]/52 via-[#DE0A26]/20 to-transparent" },
  { left: "7%", width: "6vw", height: "95vh", grad: "from-[#DE0A26]/38 via-[#DE0A26]/14 to-transparent" },
  { left: "14%", width: "9vw", height: "85vh", grad: "from-[#DE0A26]/58 via-[#DE0A26]/24 to-transparent" },
  { left: "25%", width: "12vw", height: "105vh", grad: "from-[#DE0A26]/45 via-[#DE0A26]/18 to-transparent" },
  { left: "38%", width: "7vw", height: "75vh", grad: "from-[#DE0A26]/55 via-[#DE0A26]/22 to-transparent" },
  { left: "46%", width: "11vw", height: "100vh", grad: "from-[#DE0A26]/40 via-[#DE0A26]/16 to-transparent" },
  { left: "58%", width: "9vw", height: "90vh", grad: "from-[#DE0A26]/60 via-[#DE0A26]/25 to-transparent" },
  { left: "68%", width: "8vw", height: "95vh", grad: "from-[#DE0A26]/48 via-[#DE0A26]/18 to-transparent" },
  { left: "77%", width: "13vw", height: "110vh", grad: "from-[#DE0A26]/38 via-[#DE0A26]/12 to-transparent" },
  { left: "91%", width: "6vw", height: "80vh", grad: "from-[#DE0A26]/55 via-[#DE0A26]/22 to-transparent" },
  { left: "96%", width: "8vw", height: "100vh", grad: "from-[#DE0A26]/42 via-[#DE0A26]/16 to-transparent" },
];

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  bubbleColor?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick, bubbleColor = "bg-[#DE0A26]" }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !bubbleRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Snaps bubble center position directly to the cursor entry point!
    gsap.set(bubbleRef.current, {
      left: x,
      top: y,
    });

    // Expand bubble from entry point
    gsap.to(bubbleRef.current, {
      scale: 3.5,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Magnetic pull towards the cursor (max 15-20px offset for natural physically tactile feel)
    gsap.to(buttonRef.current, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !bubbleRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Shrink bubble towards exit coordinates!
    gsap.to(bubbleRef.current, {
      scale: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Spring back smoothly on mouse leave with natural elastic spring!
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      scale: 1.0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto"
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      style={{
        willChange: "transform",
      }}
    >
      {/* 
        1. Dynamic Liquid Bubble Fill Backdrop
        Scales up from cursor pointer entry coordinates.
      */}
      <div
        ref={bubbleRef}
        className={`absolute pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 ${bubbleColor}`}
        style={{
          width: "120px",
          height: "120px",
          transform: "translate(-50%, -50%) scale(0)",
          willChange: "transform",
          zIndex: 0,
        }}
      />

      {/* 2. Interactive Button Label */}
      <span className="relative z-10 block w-full h-full pointer-events-none transition-colors duration-300">
        {children}
      </span>
    </button>
  );
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Slow, staggered wave background breathing animation in Hero Section
    // Only animate on desktop to save mobile GPU/battery
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const bars = heroRef.current?.querySelectorAll(".bg-bar");
      if (!bars) return;
      
      const bgAnim = gsap.to(bars, {
        y: (index) => (index % 2 === 0 ? 55 : -55),
        duration: 8.5, // Extremely slow, luxurious breathing
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        force3D: true, // Guarantees complete hardware GPU compositor layers acceleration
        stagger: {
          each: 0.4,
          from: "start",
        }
      });

      return () => {
        bgAnim.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full lg:h-screen lg:min-h-[600px] flex flex-col justify-start lg:justify-between pt-4 pb-16 lg:pb-12 px-6 md:px-16 relative transition-colors duration-700 select-none bg-white"
    >

      {/* 
        Tactile Glowing Vertical Bars Background (As drawn by user)
        Individually styled linear gradients blurred locally and animated sequentially via GSAP.
        Local blurs prevent full-screen reflow paint performance bottlenecks.
      */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700 opacity-100"
        style={{
          transform: "translate3d(0,0,0)",
        }}
      >
        {BARS_DATA.map((bar, index) => (
          <div
            key={index}
            className={`bg-bar absolute top-[-10%] rounded-full bg-gradient-to-b filter blur-[30px] md:blur-[100px] ${bar.grad}`}
            style={{
              left: bar.left,
              width: bar.width,
              height: bar.height,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
            }}
          />
        ))}
      </div>

      {/* 1. Header Navigation - Beautiful corporate layout with premium dropdown interactive menus */}
      <Header />

      {/* 2. Middle Content Section - Integrated Text and Layout from original design */}
      <div className="relative z-10 flex-none lg:flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto py-2 px-2 text-center mt-12 lg:my-auto">

        {/* Core Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] transition-colors duration-700 max-w-4xl uppercase text-zinc-950">
          Building Software That Drives <br className="hidden md:block" />
          <span className="text-[#DE0A26] relative inline-block mt-2 font-black">
            Growth &amp; Innovation
          </span>
        </h1>

        {/* Dynamic Descriptions */}
        <div className="flex flex-col items-center gap-3.5 mt-5 md:mt-7 max-w-3xl">
          <p className="text-sm md:text-[15px] leading-relaxed tracking-wide font-medium transition-colors duration-700 text-zinc-600">
            As a leading App Development Company and globally trusted Software Developer Company, we build digital solutions that accelerate growth, innovation, and long-term success.
          </p>
          <p className="text-xs md:text-[13px] leading-relaxed tracking-wide max-w-2xl font-normal transition-colors duration-700 text-zinc-500">
            Appic Softwares is a leading mobile app development company in India with 12+ years of experience building custom apps for startups and enterprises across USA, UAE, UK and Australia.
          </p>
        </div>

      </div>

      {/* 3. Bottom Row Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 pt-6 lg:pt-4 border-t-0 lg:border-t transition-colors duration-700 border-zinc-100 mb-auto lg:mb-0 mt-8 lg:mt-0">

        {/* Bottom Left: Outline Button "Explore work" with Trionn Liquid Bubble Hover and Magnetic Physics */}
        <div className="w-full md:w-1/2 flex justify-start order-2 md:order-1">
          <MagneticButton
            bubbleColor="bg-[#DE0A26]"
            className="w-full md:w-auto px-7 py-3 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:border-transparent hover:text-white border-zinc-200 text-zinc-800"
          >
            Explore work
          </MagneticButton>
        </div>

        {/* Bottom Right: Red CTA Button "Speak to Our Experts" with Trionn Inverse Liquid Bubble Hover and Magnetic Physics */}
        <div className="w-full md:w-1/2 flex justify-end order-3">
          <MagneticButton
            bubbleColor="bg-zinc-950"
            className="w-full md:w-auto px-7 py-3.5 rounded-full bg-[#DE0A26] text-white text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-red-950/20 hover:border-transparent hover:text-white"
          >
            Speak to Our Experts
          </MagneticButton>
        </div>

      </div>

    </section>
  );
}
