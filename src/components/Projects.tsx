"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const LaptopMockup = ({ src }: { src: string }) => (
  <div className="relative w-[280px] sm:w-[360px] lg:w-[420px]">
    {/* Screen Frame */}
    <div className="relative bg-[#1a1a1a] rounded-t-xl sm:rounded-t-[1.25rem] p-2 border-2 sm:border-[3px] border-gray-800 shadow-2xl">
      <div className="relative rounded-md overflow-hidden bg-white aspect-[16/10]">
        <img 
          src={src} 
          alt="App UI" 
          className="object-cover w-full h-full" 
          onError={(e) => { e.currentTarget.style.display = 'none' }} 
        />
      </div>
    </div>
    {/* Keyboard Base */}
    <div className="h-3 sm:h-4 bg-[#e5e5e5] rounded-b-xl shadow-xl w-[110%] -ml-[5%] relative border-t border-gray-300 flex justify-center">
      <div className="w-1/4 h-1 sm:h-1.5 bg-gray-400 rounded-b-md"></div>
    </div>
  </div>
);

const TabletMockup = ({ src }: { src: string }) => (
  <div className="relative w-[200px] sm:w-[240px] lg:w-[280px]">
    <div className="relative bg-[#1a1a1a] rounded-[1.5rem] sm:rounded-[2rem] p-3 border-2 sm:border-[3px] border-gray-800 shadow-2xl">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-600"></div>
      <div className="relative rounded-xl overflow-hidden bg-white aspect-[3/4]">
        <img 
          src={src} 
          alt="App UI" 
          className="object-cover w-full h-full" 
          onError={(e) => { e.currentTarget.style.display = 'none' }} 
        />
      </div>
      <div className="absolute right-[-4px] top-16 w-[3px] h-8 bg-gray-800 rounded-r-md"></div>
      <div className="absolute right-[-4px] top-28 w-[3px] h-12 bg-gray-800 rounded-r-md"></div>
    </div>
  </div>
);

const PROJECTS = [
  {
    id: 1,
    company: "Bridl.",
    logo: "/bridl-logo.svg",
    title: "Simplifying The Equine Trade Process",
    description: "A complete horse trading solution with buy, sell & auction features built for the UK market. The solution had all the buy and sell features with also an option to...",
    bgClass: "from-pink-50 to-white",
    textClass: "text-pink-600",
    mockupType: "laptop",
    image: "/images/Maxlife.png",
  },
  {
    id: 2,
    company: "CreditEnable",
    logo: "/aavas-logo.svg", 
    title: "Delivering loans to businesses and helping achieve dreams.",
    description: "An all-inclusive loan lending website that allows users to check their credit score and apply for loans. From personal to business, anyone can avail loan through...",
    bgClass: "from-purple-50 to-white",
    textClass: "text-purple-600",
    mockupType: "tablet",
    image: "/images/Solidx.png",
  },
  {
    id: 3,
    company: "MedFiles",
    logo: "/medFiles-logo.svg",
    title: "Digitizing Healthcare Records",
    description: "Secure patient data storage with streamlined scheduling and real-time provider access. We built a system to ensure ease of access for both patients and doctors.",
    bgClass: "from-blue-50 to-white",
    textClass: "text-blue-600",
    mockupType: "laptop",
    image: "/images/sapphire.png",
  },
  {
    id: 4,
    company: "Harmoni",
    logo: "/harmoni-logo.svg",
    title: "Redefining Music Streaming",
    description: "AI-powered recommendations and social collaboration connecting artists with listeners. A highly interactive and seamless experience across all platforms.",
    bgClass: "from-fuchsia-50 to-white",
    textClass: "text-fuchsia-600",
    mockupType: "tablet",
    image: "/images/bond.png",
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const total = PROJECTS.length;
      const padding = 0.5; // Padding at start and end

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const getState = (rel: number) => {
          if (rel <= -1) {
            return {
              xPercent: isDesktop ? -80 : -100, // Move further left
              yPercent: 0,
              rotateY: isDesktop ? -15 : -10, // Tilt away slightly
              rotateZ: isDesktop ? 2 : -5,
              scale: 0.85,
              opacity: 0,
            };
          }
          if (rel === 0) {
            return {
              xPercent: isDesktop ? -35 : 0, // Active card is pushed further left on desktop
              yPercent: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 1,
              opacity: 1,
            };
          }
          // rel >= 1 (Stacked on the right)
          return {
            xPercent: isDesktop ? 45 + (rel * 15) : rel * 8, // Shifted much further right on desktop, subtle shift on mobile
            yPercent: isDesktop ? rel * 5 : rel * 8, // Shifted down slightly
            rotateY: isDesktop ? 45 : 0, // Tilted right edge back
            rotateZ: isDesktop ? -4 : 0,   // Tilted to balance the right tilt
            scale: 1 - (rel * 0.05), // Get smaller as it goes back
            opacity: 1 - (rel * 0.15), // Fade slightly as it goes back
          };
        };

        // Ensure all cards are correctly positioned initially
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        cards.forEach((card, i) => {
          gsap.set(card, {
            ...getState(i),
            zIndex: 50 - i, // Card 0 is top, Card 1 is under it, etc.
            transformOrigin: "center center",
            transformStyle: "preserve-3d"
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.2, // Smooth scrub
            start: "top top",
            end: `+=${total * 150}%`,
          }
        });

        // Add a pause at the start
        tl.to({}, { duration: padding });

        // Animate the stack
        for (let t = 0; t < total - 1; t++) {
          cards.forEach((card, i) => {
            const endRel = i - (t + 1);
            
            tl.to(card, {
              ...getState(endRel),
              ease: "power1.inOut",
              duration: 1
            }, padding + t);
          });
        }

        // Add an empty tween at the end to create the trailing pause
        tl.to({}, { duration: padding }, padding + total - 1);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white w-full font-sans h-screen overflow-hidden">
      <div className="h-full flex flex-col items-center justify-center pt-20 pb-10">
        
        {/* Header */}
        <div className="container mx-auto px-6 lg:px-12 mb-4 flex flex-col items-center text-center shrink-0 z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Our Case Studies
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            Discover how we've helped businesses across various industries transform their ideas into powerful digital solutions.
          </p>
        </div>

        {/* Card Stack Container */}
        <div className="w-full relative flex-1 max-h-[80vh] flex justify-center items-center" style={{ perspective: "2000px" }}>
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card absolute inset-0 m-auto w-[90vw] md:w-[80vw] lg:w-[50vw] max-w-4xl h-fit max-h-[90%] overflow-y-auto hide-scrollbar rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${project.bgClass} p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 shadow-2xl`}
            >
              
              {/* Left Content */}
              <div className="w-full lg:w-[55%] flex flex-col items-start relative z-20 pr-4">
                {project.logo ? (
                  <img src={project.logo} alt={project.company} className="h-6 md:h-8 mb-6 object-contain" />
                ) : (
                  <h3 className="text-xl font-black text-slate-800 mb-6">{project.company}</h3>
                )}
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                  {project.description}
                </p>
                
                <button className={`bg-white px-6 py-2.5 rounded-full text-sm font-bold shadow-sm ${project.textClass} hover:scale-105 hover:shadow-md transition-all duration-300 ring-1 ring-black/5`}>
                  View Project
                </button>
              </div>

              {/* Right Content (Mockup) */}
              <div className="w-full lg:w-[45%] flex items-center justify-center mt-8 lg:mt-0 relative z-30">
                <div className="flex items-center justify-center drop-shadow-2xl animate-float">
                  {project.mockupType === "laptop" ? (
                    <LaptopMockup src={project.image} />
                  ) : (
                    <TabletMockup src={project.image} />
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float-mockup {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float-mockup 6s ease-in-out infinite;
          }
        `}} />
      </div>
    </section>
  );
}
