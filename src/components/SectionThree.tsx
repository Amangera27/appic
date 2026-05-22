"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ──────────────────────────── SVG Icons ─────────────────────────────────────── */
const MobileIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><rect x="12" y="4" width="24" height="40" rx="5" stroke="#E40D28" strokeWidth="2" /><rect x="16" y="10" width="16" height="20" rx="2" fill="#E40D28" fillOpacity="0.06" stroke="#E40D28" strokeWidth="1" strokeOpacity="0.2" /><circle cx="24" cy="37" r="2.5" stroke="#E40D28" strokeWidth="1.5" /><path d="M20 7h8" stroke="#E40D28" strokeWidth="1.5" strokeLinecap="round" /></svg>
);
const WebIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><rect x="3" y="6" width="42" height="30" rx="4" stroke="#E40D28" strokeWidth="2" /><path d="M3 14h42" stroke="#E40D28" strokeWidth="1.5" /><circle cx="9" cy="10" r="1.5" fill="#E40D28" fillOpacity="0.5" /><circle cx="14" cy="10" r="1.5" fill="#E40D28" fillOpacity="0.35" /><circle cx="19" cy="10" r="1.5" fill="#E40D28" fillOpacity="0.2" /><path d="M12 20l6 6-6 6" stroke="#E40D28" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 28h10" stroke="#E40D28" strokeWidth="1.8" strokeLinecap="round" /><path d="M16 42h16M24 36v6" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" /></svg>
);
const DesignIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><circle cx="24" cy="24" r="20" stroke="#E40D28" strokeWidth="2" /><circle cx="15" cy="18" r="3.5" fill="#E40D28" fillOpacity="0.6" /><circle cx="22" cy="12" r="3" fill="#E40D28" fillOpacity="0.4" /><circle cx="31" cy="14" r="2.5" fill="#E40D28" fillOpacity="0.25" /><circle cx="34" cy="22" r="3" fill="#E40D28" fillOpacity="0.15" /><path d="M38 30l-4 10c-.5 1.5-2 2-3 1l-1-1" stroke="#E40D28" strokeWidth="1.5" strokeLinecap="round" /></svg>
);
const CloudIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><path d="M13 36a9 9 0 0 1-.84-17.96A14 14 0 0 1 39 24h1a7 7 0 0 1 0 14H13z" stroke="#E40D28" strokeWidth="2" fill="#E40D28" fillOpacity="0.04" /><path d="M20 30l4-4 4 4" stroke="#E40D28" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 26v8" stroke="#E40D28" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const AiIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><rect x="10" y="8" width="28" height="28" rx="8" stroke="#E40D28" strokeWidth="2" fill="#E40D28" fillOpacity="0.04" /><circle cx="19" cy="20" r="2.5" fill="#E40D28" /><circle cx="29" cy="20" r="2.5" fill="#E40D28" /><path d="M19 28c0 0 2.5 3 5 3s5-3 5-3" stroke="#E40D28" strokeWidth="1.8" strokeLinecap="round" /><path d="M24 4v4M44 22h-4M8 22H4" stroke="#E40D28" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" /></svg>
);
const EcommerceIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><path d="M6 6h6l1.5 6" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.5 12h28l-4 16H16" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 28l-2.5 10h26" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="42" r="2.5" stroke="#E40D28" strokeWidth="2" /><circle cx="34" cy="42" r="2.5" stroke="#E40D28" strokeWidth="2" /></svg>
);
const RocketIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9"><path d="M24 4c0 0-12 10-12 24a12 12 0 0 0 24 0c0-14-12-24-12-24z" stroke="#E40D28" strokeWidth="2" fill="#E40D28" fillOpacity="0.04" /><circle cx="24" cy="24" r="4" stroke="#E40D28" strokeWidth="1.5" fill="#E40D28" fillOpacity="0.1" /><circle cx="24" cy="24" r="1.5" fill="#E40D28" /><path d="M20 40l4-4 4 4" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ──────────────────────────── Card Data ─────────────────────────────────────── */
const CARDS = [
  { id: 1, category: "Mobile", title: "Mobile App Development", desc: "Native iOS & Android apps with cutting-edge tech and seamless UX that users love.", Icon: MobileIcon, metric: "500+", metricLabel: "Apps Delivered" },
  { id: 2, category: "Web", title: "Web Development", desc: "Scalable, high-performance web applications built with modern frameworks.", Icon: WebIcon, metric: "300+", metricLabel: "Websites Built" },
  { id: 3, category: "Design", title: "UI/UX Design", desc: "Beautiful, intuitive interfaces that convert visitors into loyal customers.", Icon: DesignIcon, metric: "98%", metricLabel: "Satisfaction Rate" },
  { id: 4, category: "Cloud", title: "Cloud Solutions", desc: "Enterprise-grade cloud infrastructure for reliability, security, and scale.", Icon: CloudIcon, metric: "99.9%", metricLabel: "Uptime SLA" },
  { id: 5, category: "AI & ML", title: "AI Integration", desc: "Intelligent automation and AI-powered features that transform businesses.", Icon: AiIcon, metric: "50+", metricLabel: "AI Projects" },
  { id: 6, category: "E-Commerce", title: "E-Commerce Platforms", desc: "High-converting online stores with seamless checkout and inventory management.", Icon: EcommerceIcon, metric: "₹500Cr+", metricLabel: "Revenue Generated" },
  { id: 7, category: "Strategy", title: "Digital Transformation", desc: "End-to-end digital strategy to modernize and future-proof your operations.", Icon: RocketIcon, metric: "12+", metricLabel: "Years Experience" },
];

interface SectionThreeProps {
  isDarkMode: boolean;
}

/* ──────────────────────────── Component ─────────────────────────────────────── */
export default function SectionThree({ isDarkMode }: SectionThreeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // ── 1. Heading slide-in ─────────────────────────────────────────────────
    const sentinel = sentinelRef.current;
    let obs: IntersectionObserver | null = null;
    if (sentinel) {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            headingRef.current?.classList.add("s3-animate");
            paragraphRef.current?.classList.add("s3-animate");
            obs?.disconnect();
          }
        },
        { threshold: 0 }
      );
      obs.observe(sentinel);
    }

    // ── 2. GSAP oryzo-style card showcase ───────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const n = cards.length;

      // Layout calculations — read from actual DOM for pixel-perfect alignment
      const frameEl = section.querySelector('.s3-frame') as HTMLElement;
      const frameW = frameEl ? frameEl.offsetWidth : Math.min(window.innerWidth * 0.46, 600);
      const thumbScale = 0.38;
      const thumbVisualW = frameW * thumbScale;
      const sideGap = 28;
      const sideStart = frameW / 2 + sideGap + thumbVisualW / 2;
      const thumbStep = thumbVisualW + 16;

      // Easing function for buttery smooth interpolation
      function easeInOutCubic(t: number): number {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      /**
       * Position ALL cards based on `activeFloat` (0 → n-1).
       * Uses eased interpolation for smooth acceleration/deceleration.
       */
      function positionCards(activeFloat: number) {
        cards.forEach((card, i) => {
          const offset = i - activeFloat;
          const absOff = Math.abs(offset);
          const sign = offset >= 0 ? 1 : -1;

          let x: number, s: number, o: number, z: number;

          if (absOff < 0.005) {
            x = 0; s = 1; o = 1; z = 20;
          } else if (absOff <= 1) {
            // Ease the transition — slow start/end, fast middle
            const t = easeInOutCubic(absOff);
            x = sign * sideStart * t;
            s = 1 - (1 - thumbScale) * t;
            o = 1 - 0.2 * t;
            z = Math.round(20 - 10 * absOff);
          } else {
            const extra = absOff - 1;
            x = sign * (sideStart + extra * thumbStep);
            s = thumbScale;
            o = Math.max(0, 0.8 - extra * 0.2);
            z = Math.round(10 - extra * 2);
          }

          if (absOff > 4.5) o = 0;

          // Use gsap.to with short duration for micro-smoothing each frame
          gsap.to(card, {
            x, scale: s, opacity: o, zIndex: z,
            duration: 0.15,
            ease: "power1.out",
            overwrite: "auto",
          });
        });
      }

      // Set initial state (instant)
      cards.forEach((card, i) => {
        const sign = 1;
        if (i === 0) {
          gsap.set(card, { x: 0, scale: 1, opacity: 1, zIndex: 20 });
        } else {
          const x = sideStart + (i - 1) * thumbStep;
          gsap.set(card, { x, scale: thumbScale, opacity: Math.max(0, 0.8 - (i - 1) * 0.2), zIndex: 10 - i });
        }
      });

      // ScrollTrigger drives everything via onUpdate
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${(n - 1) * 90}vh`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.4, max: 0.8 },
          delay: 0.05,
          ease: "power3.inOut",
        },
        anticipatePin: 1,
        onUpdate: (self) => {
          const activeFloat = self.progress * (n - 1);
          positionCards(activeFloat);

          // Update dots + counter
          const activeIdx = Math.min(Math.round(activeFloat), n - 1);
          if (counterRef.current) {
            counterRef.current.textContent = `${activeIdx + 1} / ${n}`;
          }
          const dots = section.querySelectorAll(".s3-dot");
          dots.forEach((dot, di) => {
            const el = dot as HTMLElement;
            el.style.opacity = di === activeIdx ? "1" : "0.2";
            el.style.transform = di === activeIdx ? "scale(1.5)" : "scale(1)";
          });
        },
      });
    }, wrapperRef);

    return () => {
      obs?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div
        ref={sectionRef}
        className="w-full h-screen relative select-none"
        style={{ overflow: "clip" }}
      >
        {/* ── Background ──────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? "bg-[#030303]" : "bg-gradient-to-br from-[#FFF5F5] via-white to-[#FFF0F0]"}`} />
          <div className={`absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full transition-opacity duration-700 ${isDarkMode ? "opacity-[0.08]" : "opacity-[0.04]"}`}
            style={{ background: "radial-gradient(circle, #E40D28, transparent 70%)" }} />
          <div className={`absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full transition-opacity duration-700 ${isDarkMode ? "opacity-[0.06]" : "opacity-[0.03]"}`}
            style={{ background: "radial-gradient(circle, #E40D28, transparent 70%)" }} />
        </div>

        {/* ── Sentinel ────────────────────────────────────────────────────── */}
        <div ref={sentinelRef} className="absolute top-[300px] left-0 w-full h-px pointer-events-none" />

        {/* ── Heading (top-left) ───────────────────────────────────────────── */}
        <div className="absolute top-14 left-14 z-20 max-w-xs">
          <h2 ref={headingRef} className={`text-3xl md:text-4xl font-bold mb-3 s3-hidden s3-heading leading-tight transition-colors duration-700 ${isDarkMode ? "text-zinc-100" : "text-red-900"}`}>
            What We Build
          </h2>
          <p ref={paragraphRef} className={`text-sm leading-relaxed s3-hidden s3-paragraph transition-colors duration-700 ${isDarkMode ? "text-zinc-400" : "text-red-800/40"}`}>
            Scroll to explore our services
          </p>
        </div>

        {/* ── Center frame (dashed border for visual reference) ────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
          <div
            className="s3-frame rounded-[28px] transition-all duration-700"
            style={{
              width: "min(46vw, 600px)",
              height: "min(70vh, 560px)",
              border: isDarkMode ? "2px dashed rgba(228,13,40,0.25)" : "2px dashed rgba(228,13,40,0.12)",
              background: isDarkMode ? "rgba(228,13,40,0.03)" : "rgba(228,13,40,0.015)",
            }}
          />
        </div>

        {/* ── Cards ───────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute rounded-[24px] flex flex-col pointer-events-auto"
              style={{
                width: "min(46vw, 600px)",
                height: "min(70vh, 560px)",
                background: isDarkMode ? "rgba(15,15,20,0.85)" : "rgba(255,255,255,0.95)",
                backdropFilter: "blur(16px)",
                border: isDarkMode ? "1px solid rgba(228,13,40,0.2)" : "1px solid rgba(228,13,40,0.08)",
                boxShadow: isDarkMode
                  ? "0 8px 48px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 8px 48px rgba(228,13,40,0.06), 0 2px 6px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
                overflow: "hidden",
                willChange: "transform, opacity",
                transition: "background-color 0.7s, border-color 0.7s, box-shadow 0.7s",
              }}
            >
              {/* Red accent bar */}
              <div className="h-[3px] w-full flex-shrink-0" style={{
                background: "linear-gradient(90deg, transparent, #E40D28, #ff4757, #E40D28, transparent)",
              }} />

              <div className="flex-1 p-7 md:p-9 flex flex-col min-h-0">
                {/* Category badge */}
                <span className="text-[9px] font-extrabold tracking-[0.25em] uppercase mb-4 inline-block px-3 py-1.5 rounded-full w-fit"
                  style={{ color: "#E40D28", background: "rgba(228,13,40,0.06)", border: "1px solid rgba(228,13,40,0.1)" }}>
                  {card.category}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-700"
                  style={{
                    background: isDarkMode ? "rgba(228,13,40,0.12)" : "rgba(228,13,40,0.05)",
                    border: isDarkMode ? "1px solid rgba(228,13,40,0.2)" : "1px solid rgba(228,13,40,0.08)"
                  }}>
                  <card.Icon />
                </div>

                {/* Title */}
                <h3 className={`text-lg md:text-2xl font-bold mb-3 leading-snug tracking-tight transition-colors duration-700 ${isDarkMode ? "text-zinc-100" : "text-gray-900"}`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed flex-1 min-h-0 transition-colors duration-700 ${isDarkMode ? "text-zinc-400" : "text-gray-500"}`}>
                  {card.desc}
                </p>

                {/* Footer */}
                <div className="mt-4 pt-4 flex items-center justify-between transition-colors duration-700"
                  style={{ borderTop: isDarkMode ? "1px solid rgba(228,13,40,0.15)" : "1px solid rgba(228,13,40,0.07)" }}>
                  <div>
                    <div className="text-2xl md:text-3xl font-black leading-none tracking-tight" style={{ color: "#E40D28" }}>
                      {card.metric}
                    </div>
                    <div className={`text-[10px] mt-1.5 font-medium tracking-wider uppercase transition-colors duration-700 ${isDarkMode ? "text-zinc-500" : "text-gray-400"}`}>
                      {card.metricLabel}
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #E40D28, #ff4757)", boxShadow: "0 4px 14px rgba(228,13,40,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom: dots + counter ───────────────────────────────────────── */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5">
          <div className="flex items-center gap-2">
            {CARDS.map((_, i) => (
              <div key={i} className="s3-dot w-2 h-2 rounded-full bg-[#E40D28] transition-all duration-300"
                style={{ opacity: i === 0 ? 1 : 0.2, transform: i === 0 ? "scale(1.5)" : "scale(1)" }} />
            ))}
          </div>
          <span ref={counterRef} className={`text-xs font-bold tracking-widest tabular-nums transition-colors duration-700 ${isDarkMode ? "text-zinc-500" : "text-red-800/40"}`}>
            1 / {CARDS.length}
          </span>
        </div>

        {/* ── Scroll hint ─────────────────────────────────────────────────── */}
        <div className={`absolute bottom-7 right-8 z-20 flex items-center gap-2 text-xs font-medium select-none transition-colors duration-700 ${isDarkMode ? "text-zinc-500" : "text-red-400/35"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Scroll</span>
        </div>

        {/* ── Styles ──────────────────────────────────────────────────────── */}
        <style>{`
          .s3-hidden { opacity: 0; transform: translateX(-60px); }
          .s3-heading.s3-animate { animation: s3SlideIn 0.7s cubic-bezier(0.22,1,0.36,1) 0ms forwards; }
          .s3-paragraph.s3-animate { animation: s3SlideIn 0.7s cubic-bezier(0.22,1,0.36,1) 160ms forwards; }
          @keyframes s3SlideIn {
            from { opacity: 0; transform: translateX(-60px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
