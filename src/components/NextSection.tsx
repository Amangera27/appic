"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── EXACT wave paths from larevoltosa.es SVG source ───────────────────────
// ViewBox: 0 0 4970.24 380.13
// Three identical segments tiled horizontally → seamless infinite scroll loop.
// GSAP animates translateX: 0 → -33.333% (= one segment width), repeat: -1
const WAVE_PATHS = [
  // Segment 1  x: 0 → 1656.41
  "M1656.91.5c-114.82,0-144,33.89-281.25,33.89S1199.96.5,1101.7.5s-161.28,42.03-280.37,42.03S612.53.5,512.13.5s-148.46,33.89-258.47,33.89S116.92.5.5.5v379.13h1656.41V.5Z",
  // Segment 2  x: 1656.41 → 3312.82
  "M3313.33.5c-114.82,0-144,33.89-281.25,33.89S2856.38.5,2758.12.5s-161.28,42.03-280.37,42.03S2268.94.5,2168.54.5s-148.46,33.89-258.47,33.89S1773.34.5,1656.91.5v379.13h1656.41V.5Z",
  // Segment 3  x: 3312.82 → 4969.24
  "M4969.74.5c-114.82,0-144,33.89-281.25,33.89S4512.79.5,4414.53.5s-161.28,42.03-280.37,42.03S3925.36.5,3824.96.5s-148.46,33.89-258.47,33.89S3429.75.5,3313.33.5v379.13h1656.41V.5Z",
];

export default function NextSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const svgRef      = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const svg     = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    // ── 1. Continuous horizontal drift (seamless tile loop) ─────────────────
    // One segment = 1 / 3 of the SVG total width = 33.333%
    // Animating the SVG element by -33.333% of its own width moves exactly
    // one tile, then resets — creating a perfectly seamless infinite loop.
    const drift = gsap.to(svg, {
      x: "-33.3333%",
      ease: "none",
      duration: 10,          // speed of the rolling wave
      repeat: -1,            // loop forever — never stops, even at rest
    });

    // ── 2. ScaleY rises from 0 → 1 as section scrolls into view ────────────
    // transform-origin: 50% 100% → scales from BOTTOM edge so the bottom
    // stays pinned to the section boundary while the wave grows UPWARD.
    gsap.set(svg, { scaleY: 0.05, transformOrigin: "50% 100%" });

    const rise = gsap.to(svg, {
      scaleY: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",   // section's top hits viewport bottom
        end:   "top 35%",      // section's top is 35% from viewport top
        scrub: 1.8,
        // Do NOT kill on leave so the wave stays full when scrolled past
      },
    });

    return () => {
      drift.kill();
      rise.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen"
      style={{ backgroundColor: "#F5EFE6" }}
    >

      {/* ─── WAVE DIVIDER ──────────────────────────────────────────────────────
          Container sits 260px ABOVE section top (negative offset).
          overflow:hidden clips the SVG so it doesn't bleed sideways.
          The SVG is 300% wide to contain all 3 tile segments.
          transform-origin 50% 100% means scaleY=0 collapses upward (bottom fixed).
          ───────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top:      "-259px",          // bleeds into Testimonials section above
          left:     0,
          width:    "100%",
          height:   "260px",           // visible wave height
          overflow: "hidden",
          zIndex:   20,
        }}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 4970.24 380.13"
          preserveAspectRatio="none"
          style={{
            // 3× viewport width so 3 tiles fit; translateX loop moves by 1/3
            width:           "300%",
            height:          "100%",
            display:         "block",
            fill:            "#F5EFE6",
            transformOrigin: "50% 100%",
          }}
        >
          <g>
            {WAVE_PATHS.map((d, i) => <path key={i} d={d} />)}
          </g>
        </svg>
      </div>

      {/* ─── SECTION CONTENT ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-40">
        {/* user will add content here */}
      </div>
    </section>
  );
}
