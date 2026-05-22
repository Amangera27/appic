"use client";

import React, { useState, useEffect, useRef } from "react";
import SplashLoader from "@/components/SplashLoader";
import HeroSection from "@/components/HeroSection";
import SplashCursor from "@/components/SplashCursor";
import SectionThree from "@/components/SectionThree";
import EyeSection from "@/components/EyeSection";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import NextSection from "@/components/NextSection";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AppClient() {
  const [isSplashLoading, setIsSplashLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorColor, setCursorColor] = useState("#E21628");
  const [pageBg, setPageBg] = useState<string>("transparent");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    lenis.stop();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isSplashLoading) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isSplashLoading]);

  return (
    <main
      className={`relative min-h-screen w-full overflow-x-hidden font-sans transition-colors duration-700 ${
        isDarkMode ? "bg-[#030303]" : "bg-white"
      }`}
    >
      <SplashCursor RAINBOW_MODE={false} COLOR={cursorColor} />

      {isSplashLoading && (
        <SplashLoader onComplete={() => setIsSplashLoading(false)} />
      )}

      <div
        className={`w-full min-h-screen transition-all duration-700 ${
          isSplashLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundColor: pageBg || (isDarkMode ? "#030303" : "#ffffff") }}
      >
        <HeroSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <SectionThree isDarkMode={isDarkMode} />
        <EyeSection isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <Testimonials setCursorColor={setCursorColor} setPageBg={setPageBg} />
        <NextSection />
      </div>
    </main>
  );
}
