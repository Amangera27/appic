"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOGOS = [
  { name: "Aavas", src: "/aavas-logo.svg" },
  { name: "AstroBalaji", src: "/astroBalaji-logo.svg" },
  { name: "Harmoni", src: "/harmoni-logo.svg" },
  { name: "MedFiles", src: "/medFiles-logo.svg" },
  { name: "Bridl", src: "/bridl-logo.svg" },
];

interface EyeSectionProps {
  isDarkMode: boolean;
}

export default function EyeSection({ isDarkMode }: EyeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Refs for pupils
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  // Scroll animation refs
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const logosContainerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    logosRef.current = logosRef.current.slice(0, LOGOS.length);

    const ctx = gsap.context(() => {
      // 1. Ambient Breathing Glow
      gsap.to(glowRef.current, {
        opacity: 0.15,
        scale: 1.25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Responsive Scroll-Linked Animations via matchMedia
      const mm = gsap.matchMedia();

      // Desktop layout: Eye shifts left & scales UP. Text (larger) top-right. Logos bottom-right.
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          }
        });

        // Target text lines
        const line1 = textContainerRef.current?.querySelector(".line-1") || null;
        const line2 = textContainerRef.current?.querySelector(".line-2") || null;
        const line3 = textContainerRef.current?.querySelector(".line-3") || null;

        // Set initial positions
        gsap.set(eyeContainerRef.current, { x: 0, y: 0, scale: 1 });
        gsap.set(textContainerRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          left: "48vw",
          top: "28vh",
          width: "48vw",
        });
        gsap.set([line1, line2, line3], { opacity: 0, y: 15 });

        gsap.set(logosContainerRef.current, {
          x: 0,
          y: 0,
          left: 0,
          top: "74vh",
          width: "100%",
          opacity: 1,
        });
        logosRef.current.forEach((logo) => {
          if (logo) gsap.set(logo, { x: "65vw", opacity: 0 });
        });

        // Phase 1: Eye shifts left, shifts UP slightly & scales UP (completes at 1.2s)
        tl.to(eyeContainerRef.current, {
          x: "-30vw",
          y: "-10vh",
          scale: 1.15,
          ease: "power2.inOut",
          duration: 1.2,
        }, 0);

        // Phase 2: Text lines animate in one by one after eye has fully shifted
        tl.to(line1, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 1.2)
        .to(line2, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 1.5)
        .to(line3, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 1.8);

        // Phase 3: Brand logos slide one by one from right side and settle in a visible row
        const targetXDesktop = ["-34vw", "-17vw", "0vw", "17vw", "34vw"];
        const startTimesDesktop = [1.82, 2.16, 2.50, 2.84, 3.18];
        const durationsDesktop = [1.98, 1.64, 1.30, 0.96, 0.62];

        logosRef.current.forEach((logo, idx) => {
          if (!logo) return;
          // All logos slide in at constant speed (50vw/s) and settle in their positions without fading out
          const fadeTime = Math.min(0.25, durationsDesktop[idx] * 0.4);
          const slideTime = durationsDesktop[idx] - fadeTime;
          const fadeInX = 65 - (fadeTime * 50);

          tl.to(logo, {
            keyframes: [
              { x: "65vw", opacity: 0, duration: 0 },
              { x: `${fadeInX}vw`, opacity: 1, duration: fadeTime },
              { x: targetXDesktop[idx], opacity: 1, duration: slideTime }
            ],
            ease: "none",
          }, startTimesDesktop[idx]);
        });

        return () => {
          tl.kill();
        };
      });

      // Mobile layout: Stacked vertically
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          }
        });

        // Target text lines
        const line1 = textContainerRef.current?.querySelector(".line-1") || null;
        const line2 = textContainerRef.current?.querySelector(".line-2") || null;
        const line3 = textContainerRef.current?.querySelector(".line-3") || null;

        // Set initial positions
        gsap.set(eyeContainerRef.current, { x: 0, y: 0, scale: 1 });
        gsap.set(textContainerRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          left: "auto",
          top: "48vh",
          width: "90vw",
        });
        gsap.set([line1, line2, line3], { opacity: 0, y: 15 });

        gsap.set(logosContainerRef.current, {
          x: 0,
          y: 0,
          left: 0,
          top: "76vh",
          width: "100%",
          opacity: 1,
        });
        logosRef.current.forEach((logo) => {
          if (logo) gsap.set(logo, { x: "65vw", opacity: 0 });
        });

        // Phase 1: Eye shifts up, scaling down to fit mobile
        tl.to(eyeContainerRef.current, {
          y: "-20vh",
          scale: 0.85,
          ease: "power2.inOut",
          duration: 1.2,
        }, 0);

        // Phase 2: Text lines animate in one by one after eye has fully shifted
        tl.to(line1, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 1.2)
        .to(line2, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 1.5)
        .to(line3, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 1.8);

        // Phase 3: Brand logos slide one by one from off-screen right and settle in a horizontal row at constant speed (50vw/s)
        const targetXMobile = ["-36vw", "-18vw", "0vw", "18vw", "36vw"];
        const startTimesMobile = [2.1, 2.46, 2.82, 3.18, 3.54];
        const durationsMobile = [2.02, 1.66, 1.30, 0.94, 0.58];

        logosRef.current.forEach((logo, idx) => {
          if (!logo) return;
          const fadeTime = Math.min(0.25, durationsMobile[idx] * 0.4);
          const slideTime = durationsMobile[idx] - fadeTime;
          const fadeInX = 65 - (fadeTime * 50);

          tl.to(logo, {
            keyframes: [
              { x: "65vw", opacity: 0, duration: 0 },
              { x: `${fadeInX}vw`, opacity: 1, duration: fadeTime },
              { x: targetXMobile[idx], opacity: 1, duration: slideTime }
            ],
            ease: "none",
          }, startTimesMobile[idx]);
        });

        return () => {
          tl.kill();
        };
      });

    }, sectionRef);

    // Mouse move logic for pupils tracking the cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current || !leftPupilRef.current || !rightPupilRef.current || !imgRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const eyeRect = imgRef.current.getBoundingClientRect();

      // Center of the eye image dynamically calculated based on its screen position
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      // Calculate vector from center of the eye to the mouse cursor
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Max travel distance for pupils to stay beautifully inside the grey eye ellipse
      const maxMove = Math.min(window.innerWidth * 0.005, 6);

      // Normalize vector and scale by a factor, capped at maxMove
      const angle = Math.atan2(dy, dx);
      const moveDist = Math.min(dist * 0.015, maxMove);

      const moveX = Math.cos(angle) * moveDist;
      const moveY = Math.sin(angle) * moveDist;

      // Animate pupils smoothly using GSAP
      gsap.to([leftPupilRef.current, rightPupilRef.current], {
        x: moveX,
        y: moveY,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center select-none z-10 transition-colors duration-700 ${isDarkMode ? "bg-[#030303]" : "bg-white"}`}
      style={{ contentVisibility: "auto" }}
    >
      {/* Premium Tech Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(228, 13, 40, 0.1) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Red glowing radial gradient ambient light on white bg */}
        <div
          ref={glowRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full filter blur-[100px] pointer-events-none transition-opacity duration-700 ${isDarkMode ? "opacity-[0.16]" : "opacity-10"}`}
          style={{
            background: "radial-gradient(circle, #E40D28 0%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
        
        {/* Corner tech accents */}
        <div className={`absolute top-10 left-10 text-[10px] font-mono tracking-widest uppercase transition-colors duration-700 ${isDarkMode ? "text-red-500/40" : "text-red-600/30"}`}>
          [ SYSTEM.MONITOR.ACTIVE ]
        </div>
        <div className={`absolute bottom-10 right-10 text-[10px] font-mono tracking-widest uppercase transition-colors duration-700 ${isDarkMode ? "text-red-500/40" : "text-red-600/30"}`}>
          [ APPIC.SEC_04.100VH ]
        </div>
      </div>

      {/* Responsive Wrapper containing elements */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-10">
        
        {/* Eye Container */}
        <div
          ref={eyeContainerRef}
          className="relative flex items-center justify-center z-10"
          style={{ willChange: "transform" }}
        >
          <div
            className="relative max-w-[80vw]"
            style={{
              height: "40vh",
              aspectRatio: "240 / 203",
            }}
          >
            <img
              ref={imgRef}
              src="/eye-appic.svg"
              alt="Eye Appic"
              className="w-full h-full object-contain select-none pointer-events-none"
              style={{
                willChange: "transform",
              }}
            />

            {/* Left Pupil (Centered precisely inside the grey ellipse: cx="84.5" cy="28.5" on 240x203 viewBox) */}
            <div
              ref={leftPupilRef}
              className="absolute rounded-full bg-black shadow-inner shadow-black/20"
              style={{
                left: "35.21%",
                top: "14.04%",
                width: "8.54%",
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
                willChange: "transform",
              }}
            />

            {/* Right Pupil (Centered precisely inside the grey ellipse: cx="153.5" cy="28.5" on 240x203 viewBox) */}
            <div
              ref={rightPupilRef}
              className="absolute rounded-full bg-black shadow-inner shadow-black/20"
              style={{
                left: "63.96%",
                top: "14.04%",
                width: "8.54%",
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
                willChange: "transform",
              }}
            />
          </div>
        </div>

        {/* Text Container (Fades/Slides in at top-right side) */}
        <div
          ref={textContainerRef}
          className="absolute flex flex-col items-center md:items-start justify-center z-20 pointer-events-none select-none text-center md:text-left"
          style={{
            willChange: "transform",
          }}
        >
          <span className="line-1 block text-[11px] md:text-[13px] font-bold tracking-[0.25em] text-[#E40D28] uppercase mb-4 opacity-0" style={{ willChange: "transform, opacity" }}>
            Still not convinced to work with us?
          </span>
          <h2 className={`text-2xl md:text-[40px] lg:text-[46px] xl:text-[50px] font-black leading-[1.12] uppercase tracking-tight transition-colors duration-700 ${isDarkMode ? "text-zinc-50" : "text-zinc-950"}`}>
            <span className="line-2 block opacity-0" style={{ willChange: "transform, opacity" }}>
              Look at the partners
            </span>
            <span className="line-3 block opacity-0" style={{ willChange: "transform, opacity" }}>
              who collaborate with us.
            </span>
          </h2>
        </div>

        {/* Brand Logos Track (Horizontal lane in bottom-right side) */}
        <div
          ref={logosContainerRef}
          className="absolute w-full h-32 md:h-44 flex items-center justify-center pointer-events-none"
          style={{
            willChange: "transform, opacity",
          }}
        >
          {LOGOS.map((logo, idx) => (
            <div
              key={idx}
              ref={(el) => { logosRef.current[idx] = el; }}
              className="absolute flex items-center justify-center pointer-events-auto"
              style={{
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 md:h-16 max-w-[11vw] md:max-w-[10vw] lg:max-w-[120px] xl:max-w-[150px] 2xl:max-w-[180px] object-contain opacity-85 hover:opacity-100 transition-all duration-300 cursor-pointer"
                style={{
                  filter: isDarkMode ? "brightness(0) invert(1)" : "none",
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
