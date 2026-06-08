"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "./Header";
import { HiArrowRight } from "react-icons/hi2";
import Hyperspeed from './Hyperspeed';

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

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const bars = heroRef.current?.querySelectorAll(".bg-bar");
      if (!bars) return;
      
      const bgAnim = gsap.to(bars, {
        y: (index) => (index % 2 === 0 ? 60 : -60),
        duration: 8.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        force3D: true,
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
      className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-slate-50 text-slate-950 flex items-center justify-center pt-24"
    >
      {/* Dynamic WebGL Hyperspeed background container */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Hyperspeed
          effectOptions={{
            colors: {
              roadColor: 0xf8fafc,
              islandColor: 0xf8fafc,
              background: 0xf8fafc,
              shoulderLines: 0xcbced4,
              brokenLines: 0xcbced4,
              leftCars: [0xb10c1e, 0xf43f5e, 0xe11d48],
              rightCars: [0x0ea5e9, 0x2563eb, 0x06b6d4],
              sticks: 0x3b82f6
            }
          }}
        />
      </div>

      {/* Tactile Glowing Vertical Bars Background (As drawn by user) */}
      <div
        className="absolute inset-0 z-[1] overflow-hidden pointer-events-none transition-opacity duration-700 opacity-100"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {BARS_DATA.map((bar, index) => (
          <div
            key={index}
            className={`bg-bar absolute top-[-10%] rounded-full bg-gradient-to-b filter blur-[60px] md:blur-[100px] ${bar.grad}`}
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

      {/* Traveling grid overlay for a high-end architectural tech feel */}
      <div className="absolute inset-0 z-[1] bg-grid-traveling opacity-[0.25] pointer-events-none" aria-hidden />

      {/* Elegant light gradients for depth and soft premium aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white/95 z-[2] pointer-events-none" aria-hidden />
      
      {/* Smoothly floating blurry red circles for a premium ambient glow (z-[3] for visibility above white gradient) */}
      <div className="absolute -top-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#b10c1e]/14 blur-[80px] z-[3] pointer-events-none animate-blob-float-1" aria-hidden />
      <div className="absolute top-[25%] -right-20 h-[300px] w-[300px] rounded-full bg-[#de0c27]/12 blur-[70px] z-[3] pointer-events-none animate-blob-float-2" aria-hidden />
      <div className="absolute bottom-10 left-[10%] h-[400px] w-[400px] rounded-full bg-[#f43f5e]/13 blur-[90px] z-[3] pointer-events-none animate-blob-float-3" aria-hidden />

      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-10 flex flex-col items-center justify-center animate-hero-reveal">
        <div className="w-full text-center">

          {/* Stunning badge with pulse dot and shine animation */}
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 backdrop-blur-md px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b10c1e] shadow-[0_8px_30px_rgb(0,0,0,0.04)] touch-manipulation">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#de0c27] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b10c1e] shadow-[0_0_12px_rgba(177,12,30,0.55)]"></span>
            </span>
            <span className="bg-gradient-to-r from-[#b10c1e] to-[#de0c27] bg-clip-text text-transparent animate-shine-premium bg-[length:200%_auto]">
              12+ Years of Engineering Excellence
            </span>
          </div>

          {/* Premium layout with high-impact typography & smooth gradient text */}
          <h1 className="mx-auto mt-8 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
            Building modern{" "}
            <span className="bg-gradient-to-r from-[#b10c1e] via-[#de0c27] to-[#e11d48] bg-clip-text text-transparent">
              software
            </span>{" "}
            that shines in a lighter, faster world.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg md:text-xl">
            We engineer high-performance web, mobile, and AI solutions. Crafted with pristine light-theme aesthetics, micro-interactions, and premium code architecture.
          </p>

          {/* Buttons redesigned with custom premium animations and high-end light shadows */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact-us"
              className="group inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#b10c1e] via-[#de0c27] to-[#b10c1e] bg-[length:200%_auto] px-8 text-base font-semibold text-white shadow-[0_12px_24px_rgba(222,12,39,0.22)] transition-all duration-300 hover:bg-[100%_center] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(222,12,39,0.32)] focus:outline-none focus:ring-4 focus:ring-[#b10c1e]/25"
            >
              Speak with Our Experts
              <HiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/case-studies"
              className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-md px-8 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:text-slate-950 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
