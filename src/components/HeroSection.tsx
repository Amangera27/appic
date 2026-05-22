"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

interface HeroSectionProps {
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
}

export default function HeroSection({ isDarkMode, setIsDarkMode }: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const videoCapsuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current || !heroRef.current || !placeholderRef.current || !videoCapsuleRef.current) return;

    // Register GSAP ScrollTrigger plugin on client-side
    gsap.registerPlugin(ScrollTrigger);

    // 1. Slow, staggered wave background breathing animation in Hero Section
    const bars = heroRef.current.querySelectorAll(".bg-bar");
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

    // 2. Responsive Snapping & Parallax Scroll-linked Widescreen Projection
    const updatePosition = () => {
      if (!placeholderRef.current || !videoCapsuleRef.current || !scrollContainerRef.current) return;

      const rect = placeholderRef.current.getBoundingClientRect();
      const parentRect = scrollContainerRef.current.getBoundingClientRect();

      // Calculate top coordinate relative to the scroll container
      const initialTop = rect.top - parentRect.top + rect.height / 2;

      const isMobile = window.innerWidth < 768;
      const initialWidth = isMobile ? "280px" : "330px";
      const initialHeight = isMobile ? "120px" : "142px";

      gsap.set(videoCapsuleRef.current, {
        top: initialTop,
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: initialWidth,
        height: initialHeight,
        borderRadius: "100px",
      });
    };

    // Run snap position setup immediately
    updatePosition();

    // Recalculate on window resize to guarantee responsiveness across devices
    window.addEventListener("resize", updatePosition);

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: () => window.innerHeight, // Always ends after exactly 1 screen of scroll = video fully expands entering Section 2
        scrub: 1.2, // Smooth link with the scrollbar
      }
    });

    // Smoothly grow and slide the video capsule to fit perfectly inside Section 2 (Yellow)
    scrollTl.to(videoCapsuleRef.current, {
      top: "150vh",         // Centers exactly vertically in Section 2 (which spans 100vh to 200vh)
      width: "90vw",        // Exactly 90% width as requested!
      height: "90vh",       // Exactly 90% height as requested!
      borderRadius: "32px", // Widescreen curved cinema border radius
      ease: "power1.inOut",
    });



    return () => {
      bgAnim.kill();
      scrollTl.kill();
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative w-full overflow-hidden">

      {/* 
        Section 1: Hero Section viewport
        Transitioning smoothly between Light/Dark mode.
      */}
      <section
        ref={heroRef}
        className={`w-full h-screen min-h-[600px] flex flex-col justify-between pt-4 pb-12 px-6 md:px-16 relative transition-colors duration-700 select-none ${isDarkMode ? "bg-[#030303]" : "bg-white"
          }`}
      >

        {/* 
          Tactile Glowing Vertical Bars Background (As drawn by user)
          Individually styled linear gradients blurred locally and animated sequentially via GSAP.
          Local blurs prevent full-screen reflow paint performance bottlenecks.
        */}
        <div
          className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700 ${isDarkMode ? "opacity-75" : "opacity-100"
            }`}
          style={{
            transform: "translate3d(0,0,0)",
          }}
        >
          {BARS_DATA.map((bar, index) => (
            <div
              key={index}
              className={`bg-bar absolute top-[-10%] rounded-full bg-gradient-to-b filter blur-[70px] md:blur-[100px] ${bar.grad}`}
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
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />

        {/* 2. Middle Content Section - Integrated Text and Layout from original design */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto py-2 px-2 text-center my-auto">

          {/* Core Headline */}
          <h1 className={`text-3xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] transition-colors duration-700 max-w-4xl uppercase ${isDarkMode ? "text-zinc-50" : "text-zinc-950"
            }`}>
            Building Software That Drives <br className="hidden md:block" />
            <span className="text-[#DE0A26] relative inline-block mt-2 font-black">
              Growth & Innovation
            </span>
          </h1>

          {/* Dynamic Descriptions */}
          <div className="flex flex-col items-center gap-3.5 mt-5 md:mt-7 max-w-3xl">
            <p className={`text-sm md:text-[15px] leading-relaxed tracking-wide font-medium transition-colors duration-700 ${isDarkMode ? "text-zinc-300" : "text-zinc-600"
              }`}>
              As a leading App Development Company and globally trusted Software Developer Company, we build digital solutions that accelerate growth, innovation, and long-term success.
            </p>
            <p className={`text-xs md:text-[13px] leading-relaxed tracking-wide max-w-2xl font-normal transition-colors duration-700 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"
              }`}>
              Appic Softwares is a leading mobile app development company in India with 12+ years of experience building custom apps for startups and enterprises across USA, UAE, UK and Australia.
            </p>
          </div>

        </div>

        {/* 3. Bottom Row Section - Perfectly aligned exactly as you original designed */}
        <div className={`relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t transition-colors duration-700 ${isDarkMode ? "border-zinc-900" : "border-zinc-100"
          }`}>

          {/* Bottom Left: Outline Button "Explore work" with Trionn Liquid Bubble Hover and Magnetic Physics */}
          <div className="w-full md:w-1/4 flex justify-start order-2 md:order-1">
            <MagneticButton
              bubbleColor="bg-[#DE0A26]"
              className={`w-full md:w-auto px-7 py-3 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:border-transparent hover:text-white ${isDarkMode
                ? "border-zinc-800 text-zinc-200"
                : "border-zinc-200 text-zinc-800"
                }`}
            >
              Explore work
            </MagneticButton>
          </div>

          {/* Bottom Center: Native layout placeholder that preserves pixel perfect spacing */}
          <div className="w-full md:w-2/4 flex justify-center order-1 md:order-2">
            <div
              ref={placeholderRef}
              className="w-[280px] md:w-[330px] h-[120px] md:h-[142px] rounded-[100px] border-4 border-transparent ring-1 ring-transparent"
            />
          </div>

          {/* Bottom Right: Red CTA Button "Speak to Our Experts" with Trionn Inverse Liquid Bubble Hover and Magnetic Physics */}
          <div className="w-full md:w-1/4 flex justify-end order-3">
            <MagneticButton
              bubbleColor={isDarkMode ? "bg-white" : "bg-zinc-950"}
              className={`w-full md:w-auto px-7 py-3.5 rounded-full bg-[#DE0A26] text-white text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-red-950/20 hover:border-transparent ${isDarkMode ? "hover:text-zinc-950" : "hover:text-white"
                }`}
            >
              Speak to Our Experts
            </MagneticButton>
          </div>

        </div>

      </section>

      <section
        ref={yellowRef}
        className={`w-full h-screen relative transition-colors duration-700 select-none ${isDarkMode ? "bg-[#030303]" : "bg-white"
          }`}
      />



      {/* 
        The Absolute Single Video Capsule:
        Perfectly aligned exactly over your placeholder in Section 1 on page load,
        preventing any layout cuts or shifts, then expands to 80% width and 90% height in Section 2!
      */}
      <div
        ref={videoCapsuleRef}
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 overflow-hidden shadow-2xl border-4 ring-1 group transition-colors duration-700 ${isDarkMode
          ? "border-zinc-900/95 ring-zinc-800/80 shadow-[0_0_60px_rgba(222,10,38,0.15)]"
          : "border-white ring-zinc-200/50 shadow-2xl"
          }`}
        style={{
          willChange: "width, height, border-radius, top",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/Sv7Yny2yDU0?si=iYFFo5CanBXOWDh3&autoplay=1&loop=1&playlist=Sv7Yny2yDU0&controls=0&showinfo=0&rel=0&playsinline=1&enablejsapi=1${isMuted ? "&mute=1" : ""}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="absolute inset-0 w-full h-full object-cover scale-[1.3] pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-transparent z-10 pointer-events-auto" />


      </div>

    </div>
  );
}
