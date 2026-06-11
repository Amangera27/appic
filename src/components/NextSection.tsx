"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WAVE_PATHS = [
  "M1656.91.5c-114.82,0-144,33.89-281.25,33.89S1199.96.5,1101.7.5s-161.28,42.03-280.37,42.03S612.53.5,512.13.5s-148.46,33.89-258.47,33.89S116.92.5.5.5v379.13h1656.41V.5Z",
  "M3313.33.5c-114.82,0-144,33.89-281.25,33.89S2856.38.5,2758.12.5s-161.28,42.03-280.37,42.03S2268.94.5,2168.54.5s-148.46,33.89-258.47,33.89S1773.34.5,1656.91.5v379.13h1656.41V.5Z",
  "M4969.74.5c-114.82,0-144,33.89-281.25,33.89S4512.79.5,4414.53.5s-161.28,42.03-280.37,42.03S3925.36.5,3824.96.5s-148.46,33.89-258.47,33.89S3429.75.5,3313.33.5v379.13h1656.41V.5Z",
];

const CARDS = [
  {
    title: "AI Development",
    desc: "We specialize in <span class='text-[#DE0C27] font-bold'>AI development services</span> that drive innovation and transform businesses. Our team creates customized AI solutions, including machine learning, data analytics, and NLP.",
    theme: {
      glow: "shadow-[0_20px_50px_-15px_rgba(222,12,39,0.3)] group-hover:shadow-[0_40px_80px_-15px_rgba(222,12,39,0.6)]",
      iconBg: "bg-gradient-to-br from-[#f87171] to-[#b91c1c]",
      iconShadow: "shadow-[0_10px_30px_rgba(222,12,39,0.5)]",
      arrowText: "text-[#dc2626]",
      titleHover: "group-hover:text-[#dc2626]",
      arrowBg: "group-hover:bg-gradient-to-r group-hover:from-[#f87171] group-hover:to-[#b91c1c] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(222,12,39,0.6)]",
      orbColor: "from-[#DE0C27]/40 to-[#f87171]/10",
      borderHover: "group-hover:border-[#DE0C27]/50"
    },
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    )
  },
  {
    title: "Gen AI Development",
    desc: "Our AI engineers develop <span class='text-[#DE0C27] font-bold'>GenAI models</span> for personalized content generation such as text, images, audio, video, and more. We harness generative models to help you innovate and stay competitive.",
    theme: {
      glow: "shadow-[0_20px_50px_-15px_rgba(222,12,39,0.3)] group-hover:shadow-[0_40px_80px_-15px_rgba(222,12,39,0.6)]",
      iconBg: "bg-gradient-to-br from-[#f87171] to-[#b91c1c]",
      iconShadow: "shadow-[0_10px_30px_rgba(222,12,39,0.5)]",
      arrowText: "text-[#dc2626]",
      titleHover: "group-hover:text-[#dc2626]",
      arrowBg: "group-hover:bg-gradient-to-r group-hover:from-[#f87171] group-hover:to-[#b91c1c] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(222,12,39,0.6)]",
      orbColor: "from-[#DE0C27]/40 to-[#f87171]/10",
      borderHover: "group-hover:border-[#DE0C27]/50"
    },
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    )
  },
  {
    title: "ML Development",
    desc: "Through our <span class='text-[#DE0C27] font-bold'>ML development services</span>, you get solutions like predictive analysis, customer personalization models, fraud detection, and more. We build intelligent systems that analyze data patterns.",
    theme: {
      glow: "shadow-[0_20px_50px_-15px_rgba(222,12,39,0.3)] group-hover:shadow-[0_40px_80px_-15px_rgba(222,12,39,0.6)]",
      iconBg: "bg-gradient-to-br from-[#f87171] to-[#b91c1c]",
      iconShadow: "shadow-[0_10px_30px_rgba(222,12,39,0.5)]",
      arrowText: "text-[#dc2626]",
      titleHover: "group-hover:text-[#dc2626]",
      arrowBg: "group-hover:bg-gradient-to-r group-hover:from-[#f87171] group-hover:to-[#b91c1c] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(222,12,39,0.6)]",
      orbColor: "from-[#DE0C27]/40 to-[#f87171]/10",
      borderHover: "group-hover:border-[#DE0C27]/50"
    },
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    )
  },
  {
    title: "Blockchain",
    desc: "Unlock the future of secure and transparent business operations with our <span class='text-[#DE0C27] font-bold'>Blockchain development services</span>. Bring your ideas to life with our expert Blockchain developers.",
    theme: {
      glow: "shadow-[0_20px_50px_-15px_rgba(222,12,39,0.3)] group-hover:shadow-[0_40px_80px_-15px_rgba(222,12,39,0.6)]",
      iconBg: "bg-gradient-to-br from-[#f87171] to-[#b91c1c]",
      iconShadow: "shadow-[0_10px_30px_rgba(222,12,39,0.5)]",
      arrowText: "text-[#dc2626]",
      titleHover: "group-hover:text-[#dc2626]",
      arrowBg: "group-hover:bg-gradient-to-r group-hover:from-[#f87171] group-hover:to-[#b91c1c] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(222,12,39,0.6)]",
      orbColor: "from-[#DE0C27]/40 to-[#f87171]/10",
      borderHover: "group-hover:border-[#DE0C27]/50"
    },
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    )
  }
];

export default function NextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const planetRef = useRef<HTMLDivElement>(null);

  // Global style for gradient animation text
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradientText {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient-text {
        background-size: 200% auto;
        animation: gradientText 4s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    // ── Wave Drift ───────────────────────────────────────────────────────
    const svg = svgRef.current;
    let drift: gsap.core.Tween | null = null;
    let rise: gsap.core.Tween | null = null;

    if (svg) {
      drift = gsap.to(svg, {
        x: "-33.3333%",
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      gsap.set(svg, { scaleY: 0.05, transformOrigin: "50% 100%" });
      rise = gsap.to(svg, {
        scaleY: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 30%",
          scrub: 1.5,
        },
      });
    }

    // ── Planet Float & Rotate (DISABLED FOR PERFORMANCE) ────────────────
    // if (planetRef.current) {
    //   gsap.to(planetRef.current, { ... });
    // }

    // ── Grand Entrance Animation ────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.set(badgeRef.current, { y: 30, opacity: 0, scale: 0.8 });
    gsap.set(headingRef.current, { y: 30, opacity: 0 });
    gsap.set(paragraphRef.current, { y: 20, opacity: 0 });
    gsap.set(cardsRef.current, {
      y: 150,
      opacity: 0,
      scale: 0.8,
      rotationX: -45,
      rotationY: 15,
      z: -100
    });
 
    tl.to(badgeRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" })
      .to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(paragraphRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(cardsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "back.out(1.5)"
      }, "-=0.6");

    const circuitLines = section.querySelectorAll('.circuit-line');
    const circuitDots = section.querySelectorAll('.circuit-dot');

    // (DISABLED FOR PERFORMANCE) Lines and dots infinite GSAP loop
    // gsap.to(circuitLines, { ... });
    // gsap.to(circuitDots, { ... });

    return () => {
      drift?.kill();
      rise?.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[40px] md:py-[60px]"
      style={{ backgroundColor: "#faf9f8" }}
    >
      {/* ─── GLORIOUS PLANET & VIBRANT BACKGROUND ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Deep, beautiful ambient lights (Replaced heavy SVG blur with CSS Radial Gradient) */}
        <div className="absolute inset-0 opacity-[0.25]"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(228,13,40,0.3) 0%, rgba(222,12,39,0.1) 40%, transparent 80%)' }} />


      </div>

      {/* ─── SECTION CONTENT ─────────────────────────────────────────────────── */}
      <div className="relative z-30 w-full max-w-[1600px] mx-auto px-6 md:px-10 mt-0 flex flex-col justify-center">

        {/* Header Area */}
        <div className="max-w-[1200px] mb-8 md:mb-12 flex flex-col items-start relative z-30 perspective-[1000px]">


          <h2 ref={headingRef} className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#111111] tracking-[-0.03em] leading-[1.1] mb-4">
            Leading The Way In <span className="text-[#DE0C27]">AI Innovation</span> To Create Solutions That Matter
          </h2>
          <p ref={paragraphRef} className="text-zinc-500 font-medium text-[16px] max-w-2xl leading-relaxed">
            AI, GenAI, Machine Learning &amp; Blockchain Development.
          </p>
        </div>

        {/* Breathtaking Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 relative z-20">
          {CARDS.map((card, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className={`
                relative flex flex-col rounded-[32px] p-6 md:p-8 h-full
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                bg-white/90 backdrop-blur-[12px]
                border-[2px] border-white/60 ${card.theme.borderHover}
                ${card.theme.glow}
                hover:-translate-y-4 hover:scale-[1.02]
                group overflow-hidden
              `}
            >
              {/* Massive Soft Internal Glow Orb */}
              <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-bl ${card.theme.orbColor} blur-[50px] transition-transform duration-700 group-hover:scale-150 z-0`} />

              {/* Internal Glass Reflection Overlay */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />



              <div className="relative z-10 flex flex-col h-full">
                {/* 3D Floating Icon Container */}
                <div className={`w-14 h-14 rounded-[16px] ${card.theme.iconBg} ${card.theme.iconShadow} flex items-center justify-center mb-4 transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className={`text-[22px] font-medium text-zinc-950 mb-2 tracking-tight leading-tight transition-colors duration-300 ${card.theme.titleHover}`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="text-zinc-500 text-[14px] leading-[1.6] font-medium flex-grow mb-6 group-hover:text-zinc-700 transition-colors duration-300"
                  dangerouslySetInnerHTML={{ __html: card.desc }}
                />

                {/* Animated Bottom Right Arrow Button */}
                <div className="flex justify-end mt-auto">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg border border-gray-100 transition-all duration-500 ease-out group-hover:scale-110 ${card.theme.arrowText} ${card.theme.arrowBg}`}>
                    <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
