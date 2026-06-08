"use client";

import React, { useState, useEffect, useRef } from "react";
import SplashLoader from "@/components/SplashLoader";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";

import SectionThree from "@/components/SectionThree";
import EyeSection from "@/components/EyeSection";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import NextSection from "@/components/NextSection";
import TechStack from "@/components/TechStack";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import CricketAnimationSection from "@/components/CricketAnimationSection";
import Footer from "@/components/Footer";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AppClient() {
  const [isSplashLoading, setIsSplashLoading] = useState(false);
  const [cursorColor, setCursorColor] = useState("#E21628");
  const [pageBg, setPageBg] = useState<string>("transparent");
  const [isDesktop, setIsDesktop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setIsDesktop(!window.matchMedia("(max-width: 768px)").matches);
    
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
      // Recalculate all ScrollTrigger positions after Lenis starts and DOM settles.
      // This ensures pin spacers and trigger start/end points are accurate
      // after the page layout is finalized (splash removed, all sections rendered).
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    }
  }, [isSplashLoading]);

  return (
    <main
      className="relative min-h-screen w-full font-sans transition-colors duration-700 bg-white"
    >



      <div
        className="w-full min-h-screen transition-all duration-700 opacity-100"
        style={{ backgroundColor: pageBg || "#ffffff" }}
      >
        <HeroSection />
        <SectionThree />
        <EyeSection />
        <Projects />
        <Testimonials setCursorColor={setCursorColor} setPageBg={setPageBg} />
        <NextSection />
        <TechStack />
        <ContactSection />
        <FaqSection />
        <CricketAnimationSection />
        <Footer />
      </div>
    </main>
  );
}
