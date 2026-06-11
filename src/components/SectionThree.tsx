"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ──────────────────────────── SVG Icons ─────────────────────────────────────── */
const MobileIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><rect x="12" y="4" width="24" height="40" rx="6" stroke="#E40D28" strokeWidth="2.5" /><rect x="16" y="10" width="16" height="20" rx="3" fill="#E40D28" fillOpacity="0.08" stroke="#E40D28" strokeWidth="1" strokeOpacity="0.3" /><circle cx="24" cy="37" r="2.5" stroke="#E40D28" strokeWidth="2" /><path d="M20 7h8" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" /></svg>
);
const WebIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><rect x="3" y="6" width="42" height="30" rx="5" stroke="#E40D28" strokeWidth="2.5" /><path d="M3 14h42" stroke="#E40D28" strokeWidth="2" /><circle cx="9" cy="10" r="1.5" fill="#E40D28" fillOpacity="0.6" /><circle cx="14" cy="10" r="1.5" fill="#E40D28" fillOpacity="0.4" /><circle cx="19" cy="10" r="1.5" fill="#E40D28" fillOpacity="0.2" /><path d="M12 20l6 6-6 6" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 28h10" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" /><path d="M16 42h16M24 36v6" stroke="#E40D28" strokeWidth="2.5" strokeLinecap="round" /></svg>
);
const DesignIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><circle cx="24" cy="24" r="20" stroke="#E40D28" strokeWidth="2.5" /><circle cx="15" cy="18" r="3.5" fill="#E40D28" fillOpacity="0.7" /><circle cx="22" cy="12" r="3" fill="#E40D28" fillOpacity="0.5" /><circle cx="31" cy="14" r="2.5" fill="#E40D28" fillOpacity="0.3" /><circle cx="34" cy="22" r="3" fill="#E40D28" fillOpacity="0.15" /><path d="M38 30l-4 10c-.5 1.5-2 2-3 1l-1-1" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" /></svg>
);
const CloudIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><path d="M13 36a9 9 0 0 1-.84-17.96A14 14 0 0 1 39 24h1a7 7 0 0 1 0 14H13z" stroke="#E40D28" strokeWidth="2.5" fill="#E40D28" fillOpacity="0.06" /><path d="M20 30l4-4 4 4" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 26v8" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" /></svg>
);
const AiIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><rect x="10" y="8" width="28" height="28" rx="8" stroke="#E40D28" strokeWidth="2.5" fill="#E40D28" fillOpacity="0.06" /><circle cx="19" cy="20" r="2.5" fill="#E40D28" /><circle cx="29" cy="20" r="2.5" fill="#E40D28" /><path d="M19 28c0 0 2.5 3 5 3s5-3 5-3" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" /><path d="M24 4v4M44 22h-4M8 22H4" stroke="#E40D28" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" /></svg>
);
const EcommerceIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><path d="M6 6h6l1.5 6" stroke="#E40D28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.5 12h28l-4 16H16" stroke="#E40D28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 28l-2.5 10h26" stroke="#E40D28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="42" r="3" stroke="#E40D28" strokeWidth="2.5" /><circle cx="34" cy="42" r="3" stroke="#E40D28" strokeWidth="2.5" /></svg>
);
const RocketIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10"><path d="M24 4c0 0-12 10-12 24a12 12 0 0 0 24 0c0-14-12-24-12-24z" stroke="#E40D28" strokeWidth="2.5" fill="#E40D28" fillOpacity="0.06" /><circle cx="24" cy="24" r="4" stroke="#E40D28" strokeWidth="2" fill="#E40D28" fillOpacity="0.15" /><circle cx="24" cy="24" r="1.5" fill="#E40D28" /><path d="M20 40l4-4 4 4" stroke="#E40D28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

/* ──────────────────────────── Component ─────────────────────────────────────── */
export default function SectionThree() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // ── 1. Heading slide-in ─────────────────────────────────────────────────
    const timer = setTimeout(() => {
      if (headingRef.current) headingRef.current.classList.add("s3-animate");
      if (paragraphRef.current) paragraphRef.current.classList.add("s3-animate");
    }, 150);

    // ── 2. GSAP oryzo-style card showcase ───────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !cards.length) return;

    // Small delay to ensure inline styles are fully applied before GSAP calculates offsetWidth
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const n = cards.length;

        // Layout calculations
        const frameEl = section.querySelector('.s3-frame') as HTMLElement;
        const frameW = frameEl ? frameEl.offsetWidth : Math.min(window.innerWidth * 0.46, 600);
        const thumbScale = 0.38;
        const thumbVisualW = frameW * thumbScale;
        const sideGap = 28;
        const sideStart = frameW / 2 + sideGap + thumbVisualW / 2;
        const thumbStep = thumbVisualW + 16;

        function easeInOutCubic(t: number): number {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function positionCards(activeFloat: number) {
          cards.forEach((card, i) => {
            const offset = i - activeFloat;
            const absOff = Math.abs(offset);
            const sign = offset >= 0 ? 1 : -1;

            let x: number, s: number, o: number, z: number;

            if (absOff < 0.005) {
              x = 0; s = 1; o = 1; z = 20;
            } else if (absOff <= 1) {
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

            gsap.to(card, {
              x, scale: s, opacity: o, zIndex: z,
              duration: 0.15,
              ease: "power1.out",
              overwrite: "auto",
            });
          });
        }

        function updateUI(activeFloat: number) {
          positionCards(activeFloat);
          const activeIdx = Math.min(Math.round(activeFloat), n - 1);
          if (counterRef.current) {
            counterRef.current.textContent = `${activeIdx + 1} / ${n}`;
          }
          if (!section) return;
          const dots = section.querySelectorAll(".s3-dot");
          dots.forEach((dot, di) => {
            const el = dot as HTMLElement;
            el.style.opacity = di === activeIdx ? "1" : "0.2";
            el.style.transform = di === activeIdx ? "scale(1.5)" : "scale(1)";
          });
        }

        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, { x: 0, scale: 1, opacity: 1, zIndex: 20 });
          } else {
            const x = sideStart + (i - 1) * thumbStep;
            gsap.set(card, { x, scale: thumbScale, opacity: Math.max(0, 0.8 - (i - 1) * 0.2), zIndex: 10 - i });
          }
        });

        const mm = gsap.matchMedia();

        // DESKTOP: ScrollTrigger logic
        mm.add("(min-width: 1024px)", () => {
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
              updateUI(activeFloat);
            },
          });
        });

        // MOBILE: Touch swipe logic (No vertical scroll pinning)
        mm.add("(max-width: 1023px)", () => {
          let activeFloat = 0;
          let targetFloat = 0;
          let touchStartX = 0;
          let isDragging = false;
          let autoPlayInterval: NodeJS.Timeout | null = null;

          const startAutoPlay = () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
              if (isDragging) return;
              targetFloat = targetFloat + 1;
              if (targetFloat >= n) targetFloat = 0; // loop back to first card

              gsap.to({ val: activeFloat }, {
                val: targetFloat,
                duration: 0.5,
                ease: "power3.out",
                onUpdate: function () {
                  activeFloat = this.targets()[0].val;
                  updateUI(activeFloat);
                }
              });
            }, 3000); // 3 seconds interval
          };

          const stopAutoPlay = () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
          };

          const onTouchStart = (e: TouchEvent) => {
            stopAutoPlay();
            touchStartX = e.touches[0].clientX;
            isDragging = true;
          };

          const onTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - touchStartX;
            const dragFloat = targetFloat - dx / 200; // 200px drag = 1 card
            activeFloat = Math.max(0, Math.min(n - 1, dragFloat));
            updateUI(activeFloat);
          };

          const onTouchEnd = (e: TouchEvent) => {
            isDragging = false;
            const dx = e.changedTouches[0].clientX - touchStartX;

            if (dx < -40) {
              targetFloat = Math.min(n - 1, Math.round(targetFloat + 1));
            } else if (dx > 40) {
              targetFloat = Math.max(0, Math.round(targetFloat - 1));
            } else {
              targetFloat = Math.round(activeFloat);
            }

            gsap.to({ val: activeFloat }, {
              val: targetFloat,
              duration: 0.5,
              ease: "power3.out",
              onUpdate: function () {
                activeFloat = this.targets()[0].val;
                updateUI(activeFloat);
              },
              onComplete: startAutoPlay
            });
          };

          startAutoPlay();

          section.addEventListener('touchstart', onTouchStart, { passive: true });
          section.addEventListener('touchmove', onTouchMove, { passive: true });
          section.addEventListener('touchend', onTouchEnd, { passive: true });

          return () => {
            stopAutoPlay();
            section.removeEventListener('touchstart', onTouchStart);
            section.removeEventListener('touchmove', onTouchMove);
            section.removeEventListener('touchend', onTouchEnd);
          };
        });

        // Refresh ScrollTrigger to recalculate layout for sections below us (like EyeSection)
        // since we just added a pin spacer asynchronously.
        requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });

      }, wrapperRef);

      return () => {
        ctx.revert();
      };
    }, 50);

    return () => {
      clearTimeout(timer);
      clearTimeout(initTimer);
    };
  }, []);

  const cardStyle = {
    width: isMobile ? "85vw" : "min(48vw, 620px)",
    height: isMobile ? "55vh" : "min(72vh, 580px)",
  };

  return (
    <div ref={wrapperRef}>
      <div
        ref={sectionRef}
        className="w-full h-[75vh] lg:h-screen relative select-none"
        style={{ overflow: "clip" }}
      >
        {/* ── Background ──────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 transition-colors duration-700 bg-[#fffafa]`} />

          {/* Grid Pattern */}
          <div className={`absolute inset-0 transition-opacity duration-700 opacity-[0.04]`}
            style={{
              backgroundImage: `linear-gradient(to right, #E40D28 1px, transparent 1px), linear-gradient(to bottom, #E40D28 1px, transparent 1px)`,
              backgroundSize: `40px 40px`
            }}
          />

          <div className={`absolute top-0 left-0 w-[60vw] h-[60vh] rounded-full transition-opacity duration-700 opacity-[0.1]`}
            style={{ background: "radial-gradient(circle, #E40D28, transparent 70%)", transform: "translate(-20%, -20%)" }} />

          <div className={`absolute bottom-0 right-0 w-[50vw] h-[50vh] rounded-full transition-opacity duration-700 opacity-[0.08]`}
            style={{ background: "radial-gradient(circle, #E40D28, transparent 70%)", transform: "translate(20%, 20%)" }} />

          {/* Sparkles scattered in background */}
          <div className="absolute top-[20%] right-[15%] w-1.5 h-1.5 bg-[#E40D28] rounded-full rotate-45" style={{ boxShadow: "0 0 10px 2px rgba(228,13,40,0.5)" }} />
          <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-[#E40D28] rounded-full rotate-45" style={{ boxShadow: "0 0 6px 1px rgba(228,13,40,0.5)" }} />
          <div className="absolute bottom-[25%] right-[30%] w-2 h-2 bg-[#E40D28] rounded-full rotate-45" style={{ boxShadow: "0 0 12px 2px rgba(228,13,40,0.5)" }} />
        </div>

        {/* ── Sentinel ────────────────────────────────────────────────────── */}
        <div ref={sentinelRef} className="absolute top-[300px] left-0 w-full h-px pointer-events-none" />

        {/* ── Heading (top-left) ───────────────────────────────────────────── */}
        <div className="absolute top-6 left-6 lg:top-14 lg:left-14 z-20 max-w-md">
          <h2 ref={headingRef} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 s3-hidden s3-heading leading-tight transition-colors duration-700 flex items-center gap-2 text-[#1a1a2e]`}>
            What <span style={{ color: "#E40D28" }}>We Build</span>
          </h2>
          <p ref={paragraphRef} className={`text-[16px] leading-relaxed s3-hidden s3-paragraph transition-colors duration-700 text-gray-500`}>
            Scroll to explore our services
          </p>
        </div>

        {/* ── Center frame (dashed border for visual reference) ────────────── */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[6vw] xl:pr-[12vw] 2xl:justify-center 2xl:pr-0 pointer-events-none z-[2] pt-16 lg:pt-0">
          <div
            className="s3-frame rounded-[32px] transition-all duration-700"
            style={cardStyle}
          />
        </div>

        {/* ── Cards ───────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[6vw] xl:pr-[12vw] 2xl:justify-center 2xl:pr-0 z-10 pointer-events-none pt-16 lg:pt-0">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute rounded-[24px] lg:rounded-[32px] flex flex-col pointer-events-auto"
              style={{
                ...cardStyle,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 0 80px rgba(228,13,40,0.15), 0 20px 40px rgba(0,0,0,0.04), inset 0 0 0 2px rgba(255,255,255,0.6)",
                overflow: "hidden",
                willChange: "transform, opacity",
                transition: "background-color 0.7s, border-color 0.7s, box-shadow 0.7s",
              }}
            >
              {/* Card Dotted Wave Background */}
              <div className="absolute top-0 right-0 w-[250px] h-[250px] pointer-events-none overflow-hidden rounded-tr-[32px] transition-opacity duration-700"
                style={{ opacity: 0.4 }}>
                <svg width="100%" height="100%" viewBox="0 0 250 250" preserveAspectRatio="none">
                  <defs>
                    <pattern id={`dots-${card.id}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle fill="#E40D28" cx="2" cy="2" r="1.5" />
                    </pattern>
                    <mask id={`waveMask-${card.id}`}>
                      <path d="M 0,0 L 250,0 L 250,250 C 150,250 50,150 0,0 Z" fill="white" />
                    </mask>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill={`url(#dots-${card.id})`} mask={`url(#waveMask-${card.id})`} />
                </svg>
              </div>

              {/* Glowing Inner Border Top */}
              <div className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: "linear-gradient(90deg, transparent, rgba(228,13,40,0.6), transparent)", filter: "blur(2px)" }} />

              <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col min-h-0 relative z-10">
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6 lg:mb-8 w-fit transition-colors duration-700"
                  style={{ background: "rgba(228,13,40,0.08)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E40D28]" />
                  <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase"
                    style={{ color: "#E40D28" }}>
                    {card.category}
                  </span>
                </div>

                {/* Icon with 3D and Orbit */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-[120px] lg:h-[120px] flex items-center justify-center mb-4 sm:mb-6 lg:mb-6 mx-auto sm:mx-0">
                  <div className="absolute inset-0 rounded-[35%] border border-[#E40D28]/20 transform rotate-12 scale-[1.15] transition-colors duration-700" />
                  <div className="absolute inset-0 rounded-[35%] border border-[#E40D28]/10 transform -rotate-6 scale-[1.25] transition-colors duration-700" />

                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[84px] lg:h-[84px] rounded-[14px] lg:rounded-[20px] flex items-center justify-center relative z-10 transition-all duration-700"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #ffecec)",
                      boxShadow: "inset 2px 2px 8px rgba(255,255,255,1), inset -2px -2px 8px rgba(228,13,40,0.1), 0 15px 30px rgba(228,13,40,0.15)",
                      border: "1px solid rgba(255,255,255,0.8)"
                    }}>
                    <div className="scale-[0.6] sm:scale-[0.7] lg:scale-[0.85] flex items-center justify-center">
                      <card.Icon />
                    </div>
                  </div>

                  {/* Decorative small stars around icon */}
                  <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-[#E40D28] rounded-full blur-[1px]" />
                  <div className="absolute bottom-4 left-2 w-1 h-1 bg-[#E40D28] rounded-full blur-[0.5px]" />
                </div>

                {/* Title */}
                <h3 className={`text-[20px] lg:text-[22px] font-medium mb-2 sm:mb-4 leading-tight tracking-tight text-center sm:text-left transition-colors duration-700 ${"text-[#1a1a2e]"}`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className={`text-sm sm:text-base lg:text-lg leading-relaxed flex-1 min-h-0 text-center sm:text-left transition-colors duration-700 ${"text-gray-500"}`}>
                  {card.desc}
                </p>

                {/* Divider */}
                <div className="shrink-0 w-full h-px my-6 lg:my-8 transition-colors duration-700"
                  style={{ background: "linear-gradient(90deg, rgba(228,13,40,0.1), transparent)" }} />

                {/* Footer */}
                <div className="shrink-0 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-700"
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #fff0f0)",
                        boxShadow: "inset 2px 2px 4px rgba(255,255,255,1), 0 4px 10px rgba(228,13,40,0.08)",
                      }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E40D28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-black leading-none tracking-tight" style={{ color: "#E40D28" }}>
                        {card.metric}
                      </div>
                      <div className={`text-[10px] mt-1.5 font-bold tracking-widest uppercase transition-colors duration-700 ${"text-gray-400"}`}>
                        {card.metricLabel}
                      </div>
                    </div>
                  </div>

                  <button className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center group transition-transform hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #ff4b5c, #E40D28)",
                      boxShadow: "0 8px 25px rgba(228,13,40,0.4), inset 2px 2px 4px rgba(255,255,255,0.3)"
                    }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom: dots + counter ───────────────────────────────────────── */}
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 items-center gap-6">
          <div className="flex items-center gap-3">
            {CARDS.map((_, i) => (
              <div key={i} className="s3-dot w-2.5 h-2.5 rounded-full bg-[#E40D28] transition-all duration-300"
                style={{ opacity: i === 0 ? 1 : 0.2, transform: i === 0 ? "scale(1.5)" : "scale(1)" }} />
            ))}
          </div>
          <span ref={counterRef} className={`text-sm font-bold tracking-widest tabular-nums transition-colors duration-700 ${"text-red-800/40"}`}>
            1 / {CARDS.length}
          </span>
        </div>

        {/* ── Scroll hint ─────────────────────────────────────────────────── */}
        <div className={`hidden lg:flex absolute bottom-10 right-10 z-20 items-center gap-2 text-sm font-bold select-none transition-colors duration-700 ${"text-red-400/40"}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
