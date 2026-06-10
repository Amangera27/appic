"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FAQS = [
  {
    question: "What services do you provide?",
    answer:
      "We provide a comprehensive suite of digital services including UI/UX design, custom web application development, mobile app development (iOS & Android), and scalable cloud architecture.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A standard web application might take 8-12 weeks, while a complex enterprise solution could take 4-6 months. We always provide a detailed timeline during the discovery phase.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, we offer ongoing maintenance and support packages. We ensure your application remains secure, up-to-date, and fully optimized as your user base grows.",
  },
  {
    question: "What is your development methodology?",
    answer:
      "We follow an agile development methodology. We work in two-week sprints, providing regular updates and deliverables. This ensures transparency and allows us to adapt to changing requirements quickly.",
  },
  {
    question: "Can you work with existing codebases?",
    answer:
      "Absolutely. Our team is experienced in conducting code audits, refactoring legacy systems, and seamlessly integrating new features into existing applications.",
  },
];

export default function FaqSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = animationWrapperRef.current;
    const circle = circleRef.current;

    if (!wrapper || !circle) return;

    // Reset initial states
    gsap.set(circle, { clipPath: "circle(0vw at 50% 50%)" });
    gsap.set(".intro-text", { opacity: 1, scale: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // Use the outer container as the trigger
        start: "top top",
        end: "+=150%", // Pins for 1.5x screen height
        scrub: true,
        pin: wrapper, // Pin the inner wrapper
        pinSpacing: true
      },
    });

    // Animate circle expanding via clip-path
    tl.to(circle, {
      clipPath: "circle(150vw at 50% 50%)",
      ease: "power2.inOut",
      duration: 1,
    })
    // Keep texts visible instead of fading them out

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full">
      {/* ── Pinned Animation Area ── */}
      <div
        ref={animationWrapperRef}
        className="h-screen w-full flex items-center justify-center overflow-hidden relative bg-[#E40D28]"
      >
        {/* Base text layer (White text on Red) */}
        <h2 className="intro-text absolute z-10 text-white text-5xl md:text-7xl lg:text-[100px] font-black tracking-tight pointer-events-none text-center px-4">
          Got Questions?
        </h2>

        {/* Reveal layer (White background with Red text, expanding via clip-path) */}
        <div
          ref={circleRef}
          className="absolute inset-0 z-20 bg-[#faf9f8] flex items-center justify-center pointer-events-none"
          style={{ willChange: "clip-path" }}
        >
          <h2 className="intro-text text-[#E40D28] text-5xl md:text-7xl lg:text-[100px] font-black tracking-tight pointer-events-none text-center px-4">
            Got Questions?
          </h2>
        </div>
      </div>

      {/* ── FAQ Content Area ── */}
      <div className="relative w-full bg-[#faf9f8] z-20 pb-32 pt-20 overflow-hidden">
        
        {/* Soft Ambient Background Blobs matching ContactSection */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.12] bg-gradient-to-r from-[#E40D28] to-transparent blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.1] bg-gradient-to-l from-[#ff6b35] to-transparent blur-[100px] pointer-events-none" />

        <div className="max-w-[1000px] mx-auto px-6 md:px-10 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-zinc-100 mb-6">
              <span className="text-xs text-[#E40D28]">✨</span>
              <span className="text-[10px] font-extrabold tracking-widest text-zinc-800 uppercase">Clarity is key</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black text-zinc-900 tracking-[-0.03em] leading-[1.1] mb-6">
              You Ask, <span className="text-[#E40D28] relative inline-block">
                We Answer.
                <svg className="absolute left-0 bottom-[-4px] w-full h-[8px] text-[#E40D28]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M 0 5 Q 50 10 100 5 Q 50 0 0 5" fill="currentColor"/>
                </svg>
              </span>
            </h2>
            <p className="text-zinc-500 font-medium text-[16px] max-w-2xl leading-relaxed">
              Everything you need to know about partnering with us, our development process, and how we turn your ideas into reality.
            </p>
          </div>

          {/* Interactive Floating Cards */}
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl border transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] overflow-hidden cursor-pointer ${
                    isOpen 
                      ? "border-transparent shadow-[0_20px_40px_rgba(228,13,40,0.08)] md:scale-[1.02] my-2 md:my-4 z-10" 
                      : "border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 z-0"
                  }`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {/* Subtle inner hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E40D28]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 px-6 py-6 md:px-10 md:py-8 flex items-start justify-between gap-4 md:gap-8">
                    
                    <div className="flex items-start gap-4 md:gap-8 w-full">
                      {/* Number Badge */}
                      <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isOpen ? "bg-[#E40D28]/10 text-[#E40D28]" : "bg-zinc-50 text-zinc-400 group-hover:bg-[#E40D28]/5 group-hover:text-[#E40D28]"
                      }`}>
                         <span className="font-bold font-mono text-sm">
                           {(index + 1).toString().padStart(2, '0')}
                         </span>
                      </div>
                      
                      {/* Question & Answer */}
                      <div className="flex flex-col flex-1">
                        <h4 className={`text-[20px] md:text-[22px] font-medium tracking-tight transition-colors duration-500 ${
                          isOpen ? "text-[#E40D28]" : "text-zinc-800 group-hover:text-zinc-950"
                        }`}>
                          {faq.question}
                        </h4>
                        
                        <div 
                           className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
                           style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                        >
                           <p className="pt-4 text-zinc-500 text-[16px] font-medium leading-relaxed max-w-2xl">
                             {faq.answer}
                           </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Toggle Button */}
                    <div className={`mt-1 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] border ${
                      isOpen 
                        ? "bg-[#E40D28] border-[#E40D28] text-white rotate-45 shadow-[0_8px_16px_rgba(228,13,40,0.3)]" 
                        : "bg-white border-zinc-200 text-zinc-400 group-hover:border-[#E40D28] group-hover:text-[#E40D28]"
                    }`}>
                       <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                       </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
