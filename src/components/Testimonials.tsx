"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alessandro Nora",
    role: "CEO - Metrikflow",
    quote:
      "It has been 6 months since we have partnered with Appic Softwares and they have been a great help as an external development team...",
    project: "METRIKFLOW",
    videoId: "fsAA3sRdmmg",
  },
  {
    id: 2,
    name: "Alessandro Fracassi",
    role: "CEO - Surfeye",
    quote:
      "We have been working with Appic Softwares for the last 4 months and experience has been great so far as well as the execution of the project is great too...",
    project: "SURFEYE",
    videoId: "fom5TbDXDDA",
  },
  {
    id: 3,
    name: "Tariq M.",
    role: "CEO - Care home platform",
    quote:
      "From an overall point of view, we are very satisfied with the services that Appic Softwares has provided us....",
    project: "CARE MAGNUS",
    videoId: "uJvctfPcFX4",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Founder - Bridl",
    quote:
      "The dedication and quality of work delivered by the team exceeded our expectations, setting a new standard for our future partnerships...",
    project: "BRIDL",
    videoId: null,
  },
];

interface TestimonialsProps {
  setCursorColor?: (color: string) => void;
  setPageBg?: (color: string) => void;
}

// Geometry constants — must match Tailwind on the card outer wrapper
//   pt-10 = 40px, h-[460px], pb-6 = 24px → wrapper = 524px
//   Cage outset = 10px beyond card edges
const CAGE_TOP = 30;  // 40 - 10
const CAGE_HEIGHT = 480; // 460 + 20
const CAGE_LEFT = 10;
const BRACKET_BTM = 14;  // 524 - (30+480)

function CageBorder({ index }: { index: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const rectEl = svg.querySelector("rect");
    if (!rectEl) return;

    const perimeter = parseFloat(rectEl.getAttribute("data-perimeter") || "1600");
    gsap.set(rectEl, {
      strokeDasharray: `${perimeter * 0.30} ${perimeter * 0.70}`,
      strokeDashoffset: -(index * 60),
    });
    gsap.to(rectEl, { strokeDashoffset: `-=${perimeter}`, duration: 5 + index * 0.7, ease: "none", repeat: -1 });
    gsap.to(svg, { opacity: 0.65, duration: 2.2 + index * 0.35, ease: "sine.inOut", repeat: -1, yoyo: true, delay: index * 0.25 });
  }, [index]);

  const vbW = 300, vbH = CAGE_HEIGHT, rx = 32;
  const perimeter = 2 * ((vbW - 6) + (vbH - 6)) - (8 - 2 * Math.PI) * rx;

  return (
    <svg ref={svgRef} viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="none"
      className="pointer-events-none select-none"
      style={{
        position: "absolute", top: `${CAGE_TOP}px`, left: `-${CAGE_LEFT}px`,
        width: `calc(100% + ${CAGE_LEFT * 2}px)`, height: `${CAGE_HEIGHT}px`,
        zIndex: 40, opacity: 0.40, filter: "drop-shadow(0 0 5px rgba(255,255,255,0.6))"
      }}>
      <rect x="3" y="3" width={vbW - 6} height={vbH - 6} rx={rx} ry={rx}
        fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" data-perimeter={perimeter} />
    </svg>
  );
}

function CornerBrackets() {
  const arm = 18, out = CAGE_LEFT, stroke = 1.5, color = "rgba(255,255,255,0.95)";
  const corners: { style: React.CSSProperties; d: string }[] = [
    { style: { top: `${CAGE_TOP}px`, left: `-${out}px` }, d: `M ${arm} 0 L 0 0 L 0 ${arm}` },
    { style: { top: `${CAGE_TOP}px`, right: `-${out}px` }, d: `M 0 0 L ${arm} 0 L ${arm} ${arm}` },
    { style: { bottom: `${BRACKET_BTM}px`, left: `-${out}px` }, d: `M 0 0 L 0 ${arm} L ${arm} ${arm}` },
    { style: { bottom: `${BRACKET_BTM}px`, right: `-${out}px` }, d: `M 0 ${arm} L ${arm} ${arm} L ${arm} 0` },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <svg key={i} width={arm + 4} height={arm + 4} viewBox={`-2 -2 ${arm + 4} ${arm + 4}`}
          className="absolute pointer-events-none select-none z-50"
          style={{ ...c.style, filter: "drop-shadow(0 0 4px rgba(255,255,255,0.85))" }}>
          <path d={c.d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="square" />
        </svg>
      ))}
    </>
  );
}

export default function Testimonials({ setCursorColor, setPageBg }: TestimonialsProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgBlobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Which card index is currently flipped (-1 = none)
  const [flippedIndex, setFlippedIndex] = useState<number>(-1);
  // Track hover for tilt-only cards (card 4)
  const tiltTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const marquee = marqueeRef.current;
    if (!section || !header || cards.length === 0) return;

    if (marquee) {
      gsap.to(marquee, { xPercent: -50, ease: "none", duration: 30, repeat: -1 });
    }

    // (DISABLED FOR PERFORMANCE) Endless heavy blob animations
    // bgBlobsRef.current.forEach((blob) => { ... });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section, start: "top 20%", end: "+=100%",
            onEnter: () => {
              setCursorColor && setCursorColor("#ffffff");
              setPageBg && setPageBg("#DE0C27");
            },
            onLeaveBack: () => {
              setCursorColor && setCursorColor("#E21628");
              setPageBg && setPageBg("#ffffff");
            },
            onLeave: () => {
              setCursorColor && setCursorColor("#E21628");
              setPageBg && setPageBg("#Fdfdfd");
            },
            onEnterBack: () => {
              setCursorColor && setCursorColor("#ffffff");
              setPageBg && setPageBg("#DE0C27");
            },
          },
        });

        const headerTitle = header.querySelector("h2");
        const headerDesc = header.querySelector("p");

        gsap.set(cards, { transformPerspective: 2000, transformStyle: "preserve-3d" });
        gsap.set(cards[0], { y: -1000, z: -1000, rotationX: -60, rotationY: -40, opacity: 0, filter: "blur(40px)" });
        gsap.set(cards[1], { y: 1000, z: -1000, rotationX: 60, rotationY: 40, opacity: 0, filter: "blur(40px)" });
        gsap.set(cards[2], { y: -1000, z: -1000, rotationX: -60, rotationY: -40, opacity: 0, filter: "blur(40px)" });
        gsap.set(cards[3], { y: 1000, z: -1000, rotationX: 60, rotationY: 40, opacity: 0, filter: "blur(40px)" });
        gsap.set(headerTitle, { opacity: 0, y: 100, scale: 0.8, filter: "blur(20px)" });
        gsap.set(headerDesc, { opacity: 0, y: 50 });

        tl.to(headerTitle, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 2, ease: "power4.out" }, 0);
        tl.to(headerDesc, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 0.5);

        const animProps = { y: 0, z: 0, rotationX: 0, rotationY: 0, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "expo.out" };
        tl.to(cards, animProps, 1.0);
        tl.to(cards, { y: "-=40", duration: 2, stagger: 0.3, ease: "sine.inOut" }, "-=1");
        tl.to({}, { duration: 1 });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile/Tablet: No pinning, just simple fade in
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            setCursorColor && setCursorColor("#ffffff");
            setPageBg && setPageBg("#DE0C27");
          },
          onLeaveBack: () => {
            setCursorColor && setCursorColor("#E21628");
            setPageBg && setPageBg("#ffffff");
          },
          onLeave: () => {
            setCursorColor && setCursorColor("#E21628");
            setPageBg && setPageBg("#Fdfdfd");
          },
          onEnterBack: () => {
            setCursorColor && setCursorColor("#ffffff");
            setPageBg && setPageBg("#DE0C27");
          },
        });

        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: cardsContainerRef.current, start: "top 80%" }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Tilt for card 4 only (cards 0-2 flip instead)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card || index < 3) return; // only card 4 gets tilt
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    gsap.to(card, { rotateX: ((y - cy) / cy) * -12, rotateY: ((x - cx) / cx) * 12, duration: 0.5, ease: "power3.out", transformPerspective: 2000 });
    const glow = card.querySelector(".card-glow") as HTMLDivElement;
    if (glow) gsap.to(glow, { x: x - cx, y: y - cy, opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    if (index < 3) {
      // unflip after short delay so it feels intentional
      clearTimeout(tiltTimers.current[index]);
      tiltTimers.current[index] = setTimeout(() => setFlippedIndex(-1), 200);
      return;
    }
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
    const glow = card.querySelector(".card-glow") as HTMLDivElement;
    if (glow) gsap.to(glow, { x: 0, y: 0, opacity: 0, duration: 0.8, ease: "power2.out" });
  };

  const handleMouseEnter = (index: number) => {
    if (index < 3) {
      clearTimeout(tiltTimers.current[index]);
      setFlippedIndex(index);
    }
  };  return (
    <section ref={sectionRef} className="relative w-full flex flex-col justify-center bg-[#DE0C27] isolate overflow-hidden py-16 md:py-24">

      {/* ─── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-[0.40] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: `4rem 4rem`, maskImage: `radial-gradient(circle at center, black 40%, transparent 80%)` }} />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] overflow-hidden pointer-events-none z-0 opacity-[0.03] select-none mix-blend-overlay">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          <h1 className="text-[300px] font-black uppercase tracking-tighter leading-none px-8">
            CLIENT REVIEWS — PARTNERSHIPS — CLIENT REVIEWS — PARTNERSHIPS —
          </h1>
        </div>
      </div>
      <div ref={el => { bgBlobsRef.current[0] = el; }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,77,77,0.3)_0%,transparent_70%)] pointer-events-none z-0" />
      <div ref={el => { bgBlobsRef.current[1] = el; }} className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle_at_center,rgba(138,0,15,0.4)_0%,transparent_70%)] pointer-events-none z-0" />
      <div ref={el => { bgBlobsRef.current[2] = el; }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
      {/* Grid overlay for texture (Replaced heavy SVG noise) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]"
        style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: `20px 20px` }} />

      {/* ─── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-start gap-10 lg:gap-16 h-full pt-4 pb-4 lg:pb-12">

        {/* Header */}
        <div ref={headerRef} className="text-center md:text-left shrink-0 relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">Client Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[88px] font-black text-white tracking-tighter leading-[0.95]">
              Partnerships <br className="hidden md:block" /> We Cherish.
            </h2>
          </div>
          <p className="text-white/80 text-lg md:text-xl max-w-lg font-light leading-relaxed md:pb-4 border-l border-white/20 pl-6">
            We believe in collaboration, transparency, and delivering measurable success — values that
            make us a preferred Application Development Company worldwide.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full mt-4"
          style={{ perspective: "2000px" }}>
          {TESTIMONIALS.map((data, index) => {
            const isFlipped = flippedIndex === index;
            const hasVideo = !!data.videoId;

            return (
              <div
                key={data.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="relative w-full pt-10 pb-6 cursor-pointer group"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ── Floating cage (always visible, outside flip) ── */}
                <CageBorder index={index} />
                <CornerBrackets />

                {/* ── Floating avatar (outside flip, always front-facing) ── */}
                <div className="card-avatar absolute top-0 left-8 z-[60] w-[88px] h-[88px] rounded-2xl p-[1px] bg-gradient-to-br from-white/60 to-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] -translate-y-1/2 rotate-[-5deg] group-hover:rotate-[0deg] transition-transform duration-500">
                  <div className="w-full h-full rounded-[15px] bg-[#0A0002] flex items-center justify-center overflow-hidden backdrop-blur-xl border border-white/10 relative">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, #ffffff 4px, #ffffff 5px)` }} />
                    <span className="relative z-10 text-white font-black text-4xl tracking-tighter">{data.name.charAt(0)}</span>
                  </div>
                </div>

                {/* ── Floating play button ── */}
                <div className="absolute -bottom-4 -right-4 z-[60] w-16 h-16 rounded-full bg-[#DE0C27] flex items-center justify-center shadow-[0_10px_30px_rgba(222,12,39,0.5)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/30">
                  {isFlipped
                    ? <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><rect x="4" y="4" width="4" height="12" rx="1" /><rect x="12" y="4" width="4" height="12" rx="1" /></svg>
                    : <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                  }
                  <div className="absolute inset-0 rounded-full border border-white/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                </div>

                {/* Glow behind card */}
                <div className="absolute inset-x-0 top-10 bottom-6 bg-white/5 blur-[30px] rounded-[32px] group-hover:bg-white/10 transition-colors duration-700" />

                {/* ══════════════════════════════════════════════════════
                    FLIP CONTAINER — contains front & back faces
                    ══════════════════════════════════════════════════════ */}
                <div
                  className="relative w-full h-[460px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.75s cubic-bezier(0.4, 0.0, 0.2, 1)",
                    transform: isFlipped && hasVideo ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >

                  {/* ── FRONT FACE ── */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/[0.08] to-black/40 backdrop-blur-[50px] rounded-[32px] overflow-hidden flex flex-col p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/10"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
                    <div className="card-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#DE0C27]/40 rounded-full blur-[80px] pointer-events-none opacity-0 mix-blend-screen" />
                    <div className="absolute -top-6 right-2 text-[200px] leading-none font-serif text-white/[0.04] select-none pointer-events-none font-black tracking-tighter">"</div>

                    <div className="relative z-10 flex flex-col h-full mt-10">
                      <div className="mb-8">
                        <h4 className="font-bold text-white text-2xl tracking-wide leading-tight">{data.name}</h4>
                        <p className="text-[#FF4D4D] text-xs font-black mt-2 uppercase tracking-[0.2em]">{data.role}</p>
                      </div>
                      <div className="flex-grow flex flex-col justify-center relative">
                        <div className="w-8 h-[2px] bg-white/20 mb-6" />
                        <p className="text-white/80 text-[16px] leading-[1.8] font-light tracking-wide">"{data.quote}"</p>
                      </div>

                      {/* Hover hint for video cards */}
                      {hasVideo && (
                        <div className="flex items-center gap-2 mt-4 opacity-60">
                          <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white ml-0.5" fill="currentColor" viewBox="0 0 10 10"><path d="M2 2l6 3-6 3z" /></svg>
                          </div>
                          <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold">Hover to watch</span>
                        </div>
                      )}

                      <div className="relative z-10 pt-4 mt-auto">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Project //</span>
                          <span className="text-sm font-black tracking-widest text-white uppercase">{data.project}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-8 right-8 flex gap-1 opacity-20">
                      <div className="w-1 h-4 bg-white rounded-full" />
                      <div className="w-1 h-3 bg-white rounded-full" />
                      <div className="w-1 h-5 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* ── BACK FACE (video) — only rendered for cards with videoId ── */}
                  {hasVideo && (
                    <div
                      className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_40px_80px_-20px_rgba(0,0,0,0.9)] border border-white/10"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Dark overlay gradient at top for project label */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none flex items-center px-5">
                        <span className="text-[10px] font-black tracking-[0.25em] text-white/60 uppercase">Project // {data.project}</span>
                      </div>

                      {/* YouTube iframe — autoplay only when flipped */}
                      {isFlipped && (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3`}
                          title={`${data.name} testimonial`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ border: "none" }}
                        />
                      )}

                      {/* Bottom label */}
                      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none flex items-center px-5 gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#DE0C27] animate-pulse" />
                        <span className="text-white/70 text-[11px] font-bold tracking-widest uppercase">Client Testimonial</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
