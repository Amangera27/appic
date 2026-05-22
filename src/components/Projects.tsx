"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ──────────────────────────── Data ────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    name: "Bridl",
    tagline: "Simplifying The Equine Trade Process",
    description:
      "A complete horse trading solution with buy, sell & auction features built for the UK market.",
    category: "E-Commerce",
    tech: ["React Native", "Node.js", "MongoDB"],
    accent: "#e91e63",
    bg: "linear-gradient(160deg, #0f0a1a 0%, #1e1232 40%, #2d1b4e 70%, #4a2264 100%)",
    mockupAccent: "#e91e63",
    mockupScreen: ["#fce4ec", "#f48fb1", "#e91e63"],
  },
  {
    id: 2,
    name: "Aavas",
    tagline: "Simplifying The Home Loan Process",
    description:
      "Dynamic database and web server infrastructure making home loan data management seamless.",
    category: "FinTech",
    tech: ["React", "Express", "MySQL"],
    accent: "#ef5350",
    bg: "linear-gradient(160deg, #0e0505 0%, #2d0a0a 40%, #4a1010 70%, #6b1a1a 100%)",
    mockupAccent: "#f44336",
    mockupScreen: ["#ffebee", "#ef9a9a", "#f44336"],
  },
  {
    id: 3,
    name: "MedFiles",
    tagline: "Digitizing Healthcare Records",
    description:
      "Secure patient data storage with streamlined scheduling and real-time provider access.",
    category: "Healthcare",
    tech: ["Next.js", "PostgreSQL", "AWS"],
    accent: "#42a5f5",
    bg: "linear-gradient(160deg, #050a14 0%, #0c1a38 40%, #132e5c 70%, #1a4280 100%)",
    mockupAccent: "#2196f3",
    mockupScreen: ["#e3f2fd", "#90caf9", "#2196f3"],
  },
  {
    id: 4,
    name: "Harmoni",
    tagline: "Redefining Music Streaming",
    description:
      "AI-powered recommendations and social collaboration connecting artists with listeners.",
    category: "Entertainment",
    tech: ["Flutter", "Firebase", "Python"],
    accent: "#ab47bc",
    bg: "linear-gradient(160deg, #0a0510 0%, #1a0e30 40%, #2e184f 70%, #42226e 100%)",
    mockupAccent: "#9c27b0",
    mockupScreen: ["#f3e5f5", "#ce93d8", "#9c27b0"],
  },
  {
    id: 5,
    name: "AstroBalaji",
    tagline: "Ancient Wisdom Meets Modern Tech",
    description:
      "Live astrologer consultations, personalized horoscopes, and AI-driven compatibility.",
    category: "Lifestyle",
    tech: ["React Native", "Django", "Redis"],
    accent: "#ffa726",
    bg: "linear-gradient(160deg, #0e0c02 0%, #2a2208 40%, #443a10 70%, #5e5218 100%)",
    mockupAccent: "#ff9800",
    mockupScreen: ["#fff8e1", "#ffe082", "#ff9800"],
  },
  {
    id: 6,
    name: "QuickBite",
    tagline: "Food Delivery Reimagined",
    description: "Real-time tracking, AI-optimized routing, and full vendor management ecosystem.",
    category: "Food & Beverage",
    tech: ["React Native", "Go", "MongoDB"],
    accent: "#66bb6a",
    bg: "linear-gradient(160deg, #040e04 0%, #0c220c 40%, #163a16 70%, #205220 100%)",
    mockupAccent: "#4caf50",
    mockupScreen: ["#e8f5e9", "#a5d6a7", "#4caf50"],
  },
  {
    id: 7,
    name: "FitTrack",
    tagline: "Your Personal Fitness Companion",
    description:
      "AI-driven workout plans and real-time biometric tracking across multiple devices.",
    category: "Health & Fitness",
    tech: ["Swift", "GraphQL", "AWS"],
    accent: "#00bcd4",
    bg: "linear-gradient(160deg, #051014 0%, #0a2028 40%, #0f303c 70%, #144050 100%)",
    mockupAccent: "#00bcd4",
    mockupScreen: ["#e0f7fa", "#80deea", "#00bcd4"],
  },
];

/* ──────────────────────────── Phone Mockup ────────────────────────────────── */
const PhoneMockup = ({
  accent,
  screens,
}: {
  accent: string;
  screens: string[];
}) => (
  <div className="relative" style={{ width: "260px", height: "520px" }}>
    <div
      className="absolute inset-0 rounded-[44px] overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #2c2c30 0%, #1a1a1e 40%, #111114 100%)",
        padding: "10px",
        boxShadow: `
          0 60px 120px -20px rgba(0,0,0,0.8),
          0 0 0 1px rgba(255,255,255,0.08),
          inset 0 1px 0 rgba(255,255,255,0.12),
          0 0 80px -30px ${accent}40
        `,
      }}
    >
      {/* Dynamic Island */}
      <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
        <div className="w-[7px] h-[7px] rounded-full bg-zinc-800 ring-1 ring-zinc-700" />
        <div className="w-[5px] h-[5px] rounded-full bg-zinc-800" />
      </div>

      {/* Screen */}
      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[#fafafa]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-7 pt-[38px] pb-1">
          <span className="text-[9px] font-bold text-zinc-900">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-[14px] h-[7px] rounded-[2px] border border-zinc-700 flex items-center p-[1px]">
              <div className="w-[7px] h-full rounded-[1px] bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="px-5 pt-3 pb-2">
          <div className="h-[8px] rounded-full w-20" style={{ background: accent }} />
          <div className="mt-3 h-[6px] rounded-full bg-zinc-200 w-28" />
          <div className="mt-1.5 h-[5px] rounded-full bg-zinc-100 w-20" />
        </div>

        {/* Hero banner */}
        <div
          className="mx-4 mt-3 h-28 rounded-2xl relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${screens[0]}, ${screens[1]})` }}
        >
          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            <div className="h-[6px] rounded-full bg-white/60 w-3/4" />
            <div className="h-[5px] rounded-full bg-white/30 w-1/2" />
          </div>
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-xl"
            style={{ background: accent, opacity: 0.7 }}
          />
        </div>

        {/* Content cards */}
        <div className="px-4 mt-4 grid grid-cols-3 gap-2">
          {screens.map((color, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl"
              style={{
                background: `linear-gradient(145deg, ${color}90, ${color}50)`,
                boxShadow: `0 4px 12px ${color}20`,
              }}
            />
          ))}
        </div>

        {/* List items */}
        <div className="px-4 mt-4 space-y-2.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex-shrink-0"
                style={{ background: `${accent}18` }}
              />
              <div className="flex-1 space-y-1">
                <div className="h-[5px] rounded-full bg-zinc-200" style={{ width: `${90 - n * 15}%` }} />
                <div className="h-[4px] rounded-full bg-zinc-100 w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tab bar */}
        <div className="absolute bottom-0 inset-x-0 h-16 flex items-center justify-around px-5 bg-white/90 backdrop-blur-xl border-t border-zinc-100">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col items-center gap-0.5">
              <div
                className="w-5 h-5 rounded-lg"
                style={{
                  background: n === 1 ? accent : "transparent",
                  border: n !== 1 ? "1.5px solid #d4d4d8" : "none",
                }}
              />
              <div className="w-4 h-[3px] rounded-full" style={{ background: n === 1 ? accent : "#e4e4e7" }} />
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-zinc-900/10 rounded-full" />
      </div>
    </div>
  </div>
);

/* ──────────────────────────── Component ───────────────────────────────────── */
interface ProjectsProps {
  isDarkMode: boolean;
}

export default function Projects({ isDarkMode }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = cardsContainerRef.current;
    if (!section || !container) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const numCards = cards.length;
    if (numCards === 0) return;

    const ctx = gsap.context(() => {
      // Custom Animation Sequence as requested
      const entryAnimations = [
        // i = 0 (transition to 2nd card): next enters from bottom-left
        { inX: -100, inY: 100, outX: -25, outY: 20, origin: "bottom left", rot: -4 },
        // i = 1 (transition to 3rd card): next enters from bottom-right
        { inX: 100, inY: 100, outX: 25, outY: 20, origin: "bottom right", rot: 4 },
        // i = 2 (transition to 4th card): next enters from top-right
        { inX: 100, inY: -100, outX: 25, outY: -20, origin: "top right", rot: -4 },
        // i = 3 (transition to 5th card): next enters from top-left
        { inX: -100, inY: -100, outX: -25, outY: -20, origin: "top left", rot: 4 },
        // i = 4 (transition to 6th card): next enters from bottom center
        { inX: 0, inY: 100, outX: 0, outY: 20, origin: "bottom center", rot: 0 },
        // i = 5 (transition to 7th card): next enters from top center
        { inX: 0, inY: -100, outX: 0, outY: -20, origin: "top center", rot: 0 },
      ];

      // ── Stack all cards at same position, hide all except first ────
      cards.forEach((card, i) => {
        const anim = i > 0 ? entryAnimations[(i - 1) % entryAnimations.length] : null;
        
        gsap.set(card, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: i,
          xPercent: i === 0 ? 0 : anim?.inX || 0,
          yPercent: i === 0 ? 0 : anim?.inY || 100,
          borderRadius: "0px",
          scale: 1,
        });
      });

      // ── Master timeline for stacking effect ────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${numCards * 150}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update counter
            const idx = Math.min(
              Math.floor(self.progress * numCards),
              numCards - 1
            );
            if (counterRef.current) {
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
            // Update progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // ── Animate each card transition ───────────────────────────────
      for (let i = 0; i < numCards - 1; i++) {
        const anim = entryAnimations[i % entryAnimations.length];

        // Current card: shrink toward corner
        tl.to(
          cards[i],
          {
            scale: 0.65,
            xPercent: anim.outX,
            yPercent: anim.outY,
            borderRadius: "32px",
            rotation: anim.rot,
            transformOrigin: anim.origin,
            duration: 1,
            ease: "power3.inOut",
          },
          i
        );

        // Next card: slide in from the corresponding direction
        tl.to(
          cards[i + 1],
          {
            xPercent: 0,
            yPercent: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          i
        );
      }

      // Hold last card
      tl.to({}, { duration: 0.3 });

      // ── Per-card internal animations (parallax on inner elements) ──
      cards.forEach((card) => {
        const mockup = card.querySelector(".proj-mockup");
        const titleChars = card.querySelectorAll(".proj-char");
        const infoEls = card.querySelectorAll(".proj-fade");

        if (mockup) {
          gsap.fromTo(
            mockup,
            { y: 80, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (titleChars.length > 0) {
          gsap.fromTo(
            titleChars,
            { y: 100, opacity: 0, rotateX: 40 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (infoEls.length > 0) {
          gsap.fromTo(
            infoEls,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-gsap-wrapper relative w-full">
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden bg-[#050505]"
      >
        {/* ── Fixed UI overlay ───────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-[100]">
          {/* Top-left: Section label */}
          <div className="absolute top-8 left-8 md:left-12">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-white/20">
              Selected Works
            </span>
          </div>

          {/* Top-right: Counter */}
          <div className="absolute top-6 right-8 md:right-12 flex items-baseline gap-1">
            <span
              ref={counterRef}
              className="text-4xl md:text-5xl font-black text-white/90 tabular-nums tracking-tight"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              01
            </span>
            <span className="text-sm md:text-base font-light text-white/20">
              / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Bottom: Progress bar */}
          <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-[#E40D28] rounded-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* ── Cards container ────────────────────────────────────────── */}
        <div ref={cardsContainerRef} className="relative w-full h-full">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-full h-full overflow-hidden"
              style={{ background: project.bg, willChange: "transform" }}
            >
              {/* ── Noise texture overlay ───────────────────────── */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* ── Ambient glow ────────────────────────────────── */}
              <div
                className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
                style={{ background: project.accent }}
              />

              {/* ── Card content ────────────────────────────────── */}
              <div className="relative h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 gap-8 md:gap-16 pt-16 pb-20">
                {/* ── Left: Info ────────────────────────────────── */}
                <div className="w-full md:w-[50%] lg:w-[55%] flex flex-col justify-center">
                  {/* Category */}
                  <div className="proj-fade mb-6">
                    <span
                      className="text-[9px] md:text-[10px] font-black tracking-[0.35em] uppercase px-4 py-2 rounded-full border"
                      style={{
                        color: project.accent,
                        borderColor: `${project.accent}30`,
                        background: `${project.accent}08`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Project name - split into chars */}
                  <h2
                    className="text-5xl md:text-7xl lg:text-[96px] xl:text-[110px] font-black text-white leading-[0.9] tracking-[-0.03em] mb-4"
                    style={{ perspective: "500px" }}
                  >
                    {project.name.split("").map((char, ci) => (
                      <span
                        key={ci}
                        className="proj-char inline-block"
                        style={{ transformOrigin: "bottom center" }}
                      >
                        {char}
                      </span>
                    ))}
                    <span className="proj-char inline-block" style={{ color: project.accent }}>
                      .
                    </span>
                  </h2>

                  {/* Tagline */}
                  <p className="proj-fade text-base md:text-lg lg:text-xl text-white/50 font-medium italic mb-6 max-w-lg">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="proj-fade text-xs md:text-sm text-white/25 leading-relaxed mb-8 max-w-md">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="proj-fade flex flex-wrap gap-2 mb-10">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-white/8 text-white/30 bg-white/[0.02]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="proj-fade group/cta inline-flex items-center gap-3 cursor-pointer">
                    <span className="text-sm md:text-base font-bold text-white/70 group-hover/cta:text-white transition-colors duration-300 tracking-wide uppercase">
                      View Project
                    </span>
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover/cta:scale-110 group-hover/cta:shadow-lg"
                      style={{
                        background: project.accent,
                        boxShadow: `0 0 0 rgba(0,0,0,0)`,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ── Right: Phone mockup ───────────────────────── */}
                <div className="proj-mockup w-full md:w-[50%] lg:w-[45%] flex items-center justify-center">
                  <div className="relative">
                    {/* Shadow ring behind phone */}
                    <div
                      className="absolute -inset-8 rounded-full opacity-20 blur-3xl"
                      style={{ background: project.accent }}
                    />
                    <PhoneMockup
                      accent={project.mockupAccent}
                      screens={project.mockupScreen}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
