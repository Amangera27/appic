"use client";

import React, { useState, useEffect, useRef } from "react";
import SplashLoader from "@/components/SplashLoader";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";

const SectionThree = dynamic(() => import("@/components/SectionThree"), { ssr: false });
const EyeSection = dynamic(() => import("@/components/EyeSection"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
const NextSection = dynamic(() => import("@/components/NextSection"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { ssr: false });
const CricketAnimationSection = dynamic(() => import("@/components/CricketAnimationSection"), { ssr: false });
import Footer from "@/components/Footer";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function LazySection({ children, height = "400px" }: { children: React.ReactNode; height?: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Preload components 400px before scrolling into view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      // Refresh ScrollTrigger positions after component renders to ensure layout stability
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [inView]);

  return (
    <div ref={ref} style={{ minHeight: inView ? "auto" : height }}>
      {inView ? children : <div style={{ height }} />}
    </div>
  );
}

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

        <LazySection height="500px">
          <SectionThree />
        </LazySection>

        <LazySection height="600px">
          <EyeSection />
        </LazySection>

        <LazySection height="700px">
          <Projects />
        </LazySection>

        <LazySection height="600px">
          <Testimonials setCursorColor={setCursorColor} setPageBg={setPageBg} />
        </LazySection>

        <LazySection height="300px">
          <NextSection />
        </LazySection>
        
        {/* Enforce strict stacking context to prevent GSAP pinning overlaps */}
        <div className="relative z-[30] bg-[#Fdfdfd]">
          <LazySection height="400px">
            <TechStack />
          </LazySection>
        </div>
        
        <div className="relative z-[40] bg-[#faf9f8]">
          <LazySection height="800px">
            <ContactSection />
          </LazySection>
        </div>
        
        <div className="relative z-[50] bg-[#E40D28]">
          <LazySection height="600px">
            <FaqSection />
          </LazySection>
        </div>
        
        <LazySection height="300px">
          <CricketAnimationSection />
        </LazySection>

        <LazySection height="200px">
          <Footer />
        </LazySection>
      </div>
    </main>
  );
}
