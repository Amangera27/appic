"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { MascotSVG } from "./MascotSVG";

const CONTACT_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: "sales@appicsoftwares.com",
    href: "mailto:sales@appicsoftwares.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: "+91 8233801424  Â·  +91 9887354080",
    href: "tel:+918233801424",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Visit Us",
    value: "41/11 Varun Path, New Sanganer Road, Jaipur, Rajasthan",
    href: "#",
  },
];

const SOCIAL = [
  { label: "Facebook", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> },
  { label: "Twitter", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> },
  { label: "LinkedIn", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
  { label: "Instagram", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg> },
  { label: "YouTube", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
];

export default function ContactSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);   // outer scroll-space div
  const stickyRef = useRef<HTMLDivElement>(null);   // sticky viewport
  const planeRef = useRef<HTMLDivElement>(null);   // paper plane
  const trailRef = useRef<HTMLDivElement>(null);   // dotted trail
  const formWrapRef = useRef<HTMLDivElement>(null);   // entire form+info block
  const headlineRef = useRef<HTMLDivElement>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", project: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathRef = useRef<SVGPathElement>(null);

  const mascotRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formElementRef = useRef<HTMLFormElement>(null);
  const formCardInnerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const wrapper = wrapperRef.current;
    const plane = planeRef.current;
    const formWrap = formWrapRef.current;
    const headline = headlineRef.current;
    const pathEl = pathRef.current;
    if (!wrapper || !plane || !formWrap || !pathEl) return;

    // Force GPU layer so transforms composite off the main thread
    gsap.set(plane, {
      opacity: 0,
      scale: 0.18,
      force3D: true,
      transformOrigin: "50% 50%",
    });
    gsap.set(formWrap, { opacity: 0, y: 60, force3D: true });
    gsap.set(headline, { opacity: 0, y: 35, force3D: true });

    let mm = gsap.matchMedia();

    // Desktop: Run the full animation with the paper plane
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      });

      tl.to(headline, { opacity: 1, y: 0, ease: "power2.out", duration: 1 }, 0);

      tl.to(plane, {
        motionPath: {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        ease: "power1.inOut",
        duration: 4,
      }, 1);

      tl.to(plane, { opacity: 1, scale: 1, ease: "sine.out", duration: 1 }, 1);
      tl.to(plane, { scale: 0.12, opacity: 0, ease: "sine.in", duration: 1 }, 4);
      tl.to(formWrap, { opacity: 1, y: 0, ease: "power2.out", duration: 1 }, 4.5);
    });

    // Mobile & Tablet: Skip the paper plane entirely to avoid huge delays and layout issues
    mm.add("(max-width: 1023px)", () => {
      gsap.set(plane, { display: "none" }); // Hide plane

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(headline, { opacity: 1, y: 0, ease: "power2.out", duration: 1 }, 0);
      tl.to(formWrap, { opacity: 1, y: 0, ease: "power2.out", duration: 1 }, 0.5); // Bring in form immediately after
    });

    return () => {
      mm.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formElementRef.current?.checkValidity()) {
      formElementRef.current?.reportValidity();
      return;
    }

    setIsSubmitting(true);

    const mascot = mascotRef.current;
    const formCard = formWrapRef.current;
    const formInner = formCardInnerRef.current;
    const trash = trashRef.current;
    const success = successRef.current;
    const particles = particlesRef.current;

    if (!mascot || !formCard || !trash || !success) {
      setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 2000);
      return;
    }

    // Prepare elements
    gsap.set(mascot, { x: "-50vw", y: 0, scale: 1, rotationZ: 0, scaleX: 1, opacity: 1, display: "block" });
    gsap.set(trash, { opacity: 0, scale: 0, x: 0, y: 0, rotation: 0, display: "block" });
    gsap.set(success, { opacity: 0, y: 50, display: "none", scale: 0.8 });

    // --- MOBILE & TABLET BEHAVIOR ---
    // Skip the complex mascot/trash morph animation on screens < 1024px
    if (window.innerWidth < 1024) {
      gsap.to(formInner, { opacity: 0, duration: 0.3 });
      gsap.to(formCard, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          setIsSubmitting(false);
          setSubmitted(true);

          gsap.set(success, { display: "flex" });
          gsap.to(success, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              // Automatically bring back the new form after 3 seconds
              setTimeout(() => { resetForm(); }, 3000);
            }
          });
        }
      });
      return;
    }

    // --- DESKTOP BEHAVIOR ---
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSubmitting(false);
        setSubmitted(true);

        // Play success animation
        gsap.set(success, { display: "flex" });
        gsap.to(success, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          onComplete: () => {
            // Automatically bring back the new form after 3 seconds
            setTimeout(() => {
              resetForm();
            }, 3000);
          }
        });

        // Force GSAP to recalculate pin heights to fix the white space glitch below
        setTimeout(() => ScrollTrigger.refresh(), 100);

        // Particles burst
        if (particles) {
          const children = particles.children;
          gsap.fromTo(children,
            { x: 0, y: 0, scale: 0, opacity: 1 },
            {
              x: () => (Math.random() - 0.5) * 500,
              y: () => (Math.random() - 0.5) * 500,
              scale: () => Math.random() * 1.5 + 0.5,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
              stagger: 0.015
            }
          );
        }
      }
    });

    // 1. Mascot enters (walks to center-ish left of form)
    tl.to(mascot, { x: "20vw", duration: 1.5, ease: "power1.inOut" })
      .to(mascot, { y: -40, yoyo: true, repeat: 9, duration: 0.15, ease: "sine.inOut" }, "<");

    // 2. Pause & Inspect
    tl.to(mascot, { rotationZ: 5, scale: 1.05, duration: 0.4, ease: "power2.out" }, "+=0.2");

    // 3. Form Card shakes
    tl.to(formCard, { x: -10, duration: 0.05, yoyo: true, repeat: 7, ease: "none" }, "+=0.2");

    // 4. Form Morphs into Trash
    tl.to(formInner, { opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(formCard, { scale: 0.2, opacity: 0, duration: 0.5, ease: "back.in(1.2)" }, "+=0.1")
      .to(trash, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, "-=0.3");

    // 5. Trash attaches to hand (approximate based on viewport and mascot size)
    tl.to(trash, { x: "-18vw", y: "15vh", duration: 0.4, ease: "power2.inOut" });

    // 6. Mascot turns and walks away
    tl.to(mascot, { scaleX: -1, duration: 0.2 })
      .to(mascot, { x: "120vw", duration: 2, ease: "power1.in" })
      .to(mascot, { y: -40, yoyo: true, repeat: 12, duration: 0.15, ease: "sine.inOut" }, "<")
      .to(trash, { x: "82vw", y: "15vh", duration: 2, ease: "power1.in" }, "<")
      .to(trash, { rotation: -15, yoyo: true, repeat: 6, duration: 0.3, ease: "sine.inOut" }, "<");
  };

  const resetForm = () => {
    const success = successRef.current;
    const formCard = formWrapRef.current;
    const formInner = formCardInnerRef.current;

    if (!success || !formCard || !formInner) return;

    // Fade out success message
    gsap.to(success, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.set(success, { display: "none" });
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", project: "" });

        // Animate the entire form card back in
        gsap.set(formCard, { scale: 0.8, opacity: 0, x: 0, y: 0 }); // Reset any translation left over
        gsap.set(formInner, { opacity: 0 });

        const tl = gsap.timeline();
        tl.to(formCard, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" })
          .to(formInner, { opacity: 1, duration: 0.4 }, "-=0.2");
      }
    });
  };

  const inputBase =
    "w-full bg-white/40 hover:bg-white/60 border border-zinc-200/70 rounded-2xl px-5 py-4 text-zinc-800 placeholder-zinc-400/80 text-sm font-medium outline-none backdrop-blur-md transition-all duration-400";
  const inputClass = (f: string) =>
    `${inputBase} ${focusedField === f
      ? "bg-white/95 border-[#E40D28] shadow-[0_12px_30px_rgba(228,13,40,0.08),0_0_0_4px_rgba(228,13,40,0.12)]"
      : "hover:border-zinc-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.015)]"}`;

  return (
    <>
      <style>{`
        .btn-shimmer {
          background: linear-gradient(135deg, #E40D28 0%, #ff6b35 100%);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .btn-shimmer:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 15px 45px rgba(228, 13, 40, 0.45) !important;
        }
        @keyframes success-pop {
          0%   { transform: scale(0.5) rotate(-10deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .success-pop { animation: success-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        @keyframes float-blob {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(40px, -60px) scale(1.12); }
          66%  { transform: translate(-30px, 30px) scale(0.92); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-blob-reverse {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(-50px, 50px) scale(0.88); }
          66%  { transform: translate(30px, -40px) scale(1.15); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-1 {
          animation: float-blob 22s infinite ease-in-out;
        }
        .animate-blob-2 {
          animation: float-blob-reverse 26s infinite ease-in-out;
        }
        
        .glass-premium-interactive {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 248, 248, 0.58) 100%);
          backdrop-filter: blur(28px) saturate(120%);
          border: 1px solid rgba(228, 13, 40, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.015), inset 0 0 0 1px rgba(255, 255, 255, 0.7);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .glass-premium-interactive:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 248, 0.75) 100%);
          box-shadow: 0 20px 45px rgba(228, 13, 40, 0.08), 
                      0 1px 8px rgba(228, 13, 40, 0.04);
          border-color: rgba(228, 13, 40, 0.3);
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>

      {/* ── Outer wrapper for the section ── */}
      <div ref={wrapperRef} className="relative w-full min-h-screen overflow-hidden py-[40px] md:py-[60px] flex flex-col justify-center" style={{ backgroundColor: "#faf9f8" }}>
        {/* Subtle soft background dots */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle, #E40D28 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />

        {/* Soft radial vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at center, transparent 30%, rgba(250,249,248,0.98) 100%)" }} />

        {/* â”€â”€ Hidden SVG path the plane follows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
              Path in viewport % (SVG viewBox matches 100Ã—56 aspect ratio of screen)
              Journey: bottom-left â†’ sweeps right toward top-right â†’ 
                       curves down making a big clockwise oval loop â†’
                       exits back to top-right
          â”€â”€ */}
        {/*
            â”€â”€ Hidden SVG path. Kept invisible (opacity:0).
               The plane's MotionPath reads this element's geometry.
               Path shape: enter bottom-left â†’ arc up-right â†’ clockwise
               oval loop â†’ exit top-right. All C (cubic bezier) segments
               so the path itself is mathematically smooth with zero kinks.
          â”€â”€ */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0 }}
        >
          <path
            ref={pathRef}
            d={[
              "M 30,550",
              "C 100,470 200,370 340,310",
              "C 480,250 630,210 740,178",
              "C 850,148 960,118 975,155",
              "C 990,195 975,270 945,335",
              "C 910,400 855,455 775,480",
              "C 690,506 595,512 508,496",
              "C 415,478 348,444 318,398",
              "C 290,352 295,302 330,272",
              "C 368,240 430,226 510,218",
              "C 620,208 740,182 870,128",
              "C 930,105 975,75 990,40",
            ].join(" ")}
            fill="none"
          />
        </svg>

        {/* ── Paper Plane ── */}
        <div
          ref={planeRef}
          className="absolute top-0 left-0 z-20 pointer-events-none"
          style={{
            width: 220,
            height: 220,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/images/images/paper-plane.png"
            alt="Paper plane"
            fill
            style={{ objectFit: "contain", imageRendering: "crisp-edges" }}
            priority
          />
        </div>

        {/* ── Mascot & Trash Layers ── */}
        <div ref={mascotRef} className="absolute left-0 bottom-[10%] w-[40vw] md:w-[30vw] max-w-[400px] z-[50] pointer-events-none" style={{ display: 'none' }}>
          <MascotSVG className="w-full h-auto drop-shadow-2xl" />
        </div>

        <div ref={trashRef} className="absolute left-[50%] top-[50%] w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 z-[51] pointer-events-none" style={{ display: 'none' }}>
          {/* Crumbled paper / Trash bag SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl text-zinc-400">
            <path fill="currentColor" d="M30 20 L70 20 L85 45 L75 90 L25 90 L15 45 Z" />
            <path fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" d="M30 20 Q50 30 70 20 M15 45 Q50 60 85 45 M25 90 Q50 80 75 90" />
          </svg>
        </div>

        {/* ── Particles Layer ── */}
        <div ref={particlesRef} className="absolute inset-0 z-[49] pointer-events-none flex items-center justify-center">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute w-3 h-3 rounded-full opacity-0"
              style={{ backgroundColor: i % 2 === 0 ? '#E40D28' : '#ff6b35' }} />
          ))}
        </div>

        {/* ── Success Message Layer ── */}
        <div ref={successRef} className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none" style={{ display: 'none' }}>
          <div className="bg-white/90 backdrop-blur-xl border border-zinc-200/60 p-10 rounded-[36px] shadow-2xl flex flex-col items-center gap-5 success-pop max-w-md w-full mx-4 pointer-events-auto">
            <div className="w-24 h-24 relative">
              <Image src="/images/images/paper-plane.png" alt="" fill className="object-contain" />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-zinc-900 mb-2">Message Sent! 🎉</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Our team will reach out within <span className="text-[#E40D28] font-bold">2 hours</span>.<br />
                Get ready for something amazing.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Team notified · Response guaranteed
            </div>
          </div>
        </div>

        {/* ── Drifting ambient glowing background blobs ── */}
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.14] animate-blob-1"
          style={{ background: "radial-gradient(circle, #E40D28 0%, transparent 70%)", filter: "blur(90px)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.12] animate-blob-2"
          style={{ background: "radial-gradient(circle, #ff6b35 0%, transparent 70%)", filter: "blur(90px)" }} />

        {/* ── Unified Layout Container ── */}
        <div className="relative w-full flex flex-col justify-between  px-4 md:px-10 z-10 pointer-events-none">

          {/* ── Headline ── */}
          <div ref={headlineRef} className="text-center mb-8 md:mb-12 flex flex-col items-center">

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#111111] tracking-[-0.03em] leading-[1.1] mb-4">
              Let's Build Something <span className="relative inline-block text-[#E40D28]">
                Amazing!

              </span>
            </h2>
            <p className="text-zinc-500 font-medium text-[16px] max-w-2xl leading-relaxed">
              Share your ideas, and let's turn them into reality.
            </p>
          </div>

          {/* ── Form + Info ── */}
          <div ref={formWrapRef} className="w-full max-w-[1260px] mx-auto pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">

              {/* ────────────────────────────────────────────────────────
                    LEFT: Form Card — glassmorphism + red glow border
                ──────────────────────────────────────────────────────── */}
              <div className="relative rounded-[36px] overflow-hidden p-1"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,248,248,0.6) 100%)",
                  border: "1px solid rgba(228, 13, 40, 0.12)",
                  boxShadow: "0 30px 80px rgba(228,13,40,0.06), inset 0 0 0 1px rgba(255,255,255,0.8)",
                  backdropFilter: "blur(28px)",
                }}>

                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg, #E40D28, #ff6b35, #E40D28)", backgroundSize: "200% auto", animation: "shimmer-btn 3s linear infinite" }} />

                <div className="p-5 sm:p-7 md:p-8">
                  {/* Form header */}
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FFE8EB] flex-shrink-0"
                        style={{ boxShadow: "0 6px 20px rgba(228,13,40,0.1)" }}>
                        <svg className="w-5 h-5 text-[#E40D28] transform rotate-45 -translate-x-0.5 translate-y-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-zinc-950 leading-tight">Send us a message</h3>
                        <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">
                          Fill the form below and we'll get back to you <br className="hidden sm:block" />
                          within <span className="text-[#E40D28] font-bold">2 hours</span>.
                        </p>
                      </div>
                    </div>

                    {/* Active Team Avatars with Dotted Line */}
                    <div className="flex items-center gap-2 bg-zinc-50/90 px-3 py-1.5 rounded-full border border-zinc-200/50 self-start sm:self-center">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Team 1" />
                        <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Team 2" />
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-[#FFE8EB] flex items-center justify-center text-[9px] font-black text-[#E40D28] relative">
                          2h
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div ref={formCardInnerRef} className="min-h-[480px]">
                    {!submitted ? (
                      <form ref={formElementRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <label className="block text-[10px] font-medium text-zinc-600 uppercase tracking-[0.15em] mb-1.5">Full Name</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </span>
                              <input type="text" placeholder="Your name"
                                value={formData.name}
                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                                className={`${inputClass("name")} pl-12`} required disabled={isSubmitting} />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-[10px] font-medium text-zinc-600 uppercase tracking-[0.15em] mb-1.5">Email Address</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </span>
                              <input type="email" placeholder="Your email"
                                value={formData.email}
                                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                                className={`${inputClass("email")} pl-12`} required disabled={isSubmitting} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium text-zinc-600 uppercase tracking-[0.15em] mb-1.5">Phone Number</label>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 bg-white/40 border border-zinc-200/70 rounded-2xl px-3.5 py-3 text-zinc-700 text-xs font-semibold select-none flex-shrink-0">
                              <span>🇮🇳</span>
                              <span className="text-zinc-500 font-medium">+91</span>
                              <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <input type="tel" placeholder="Your phone number"
                              value={formData.phone}
                              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                              onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                              className={inputClass("phone")} disabled={isSubmitting} />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="block text-[10px] font-medium text-zinc-600 uppercase tracking-[0.15em] mb-1.5">Project Details</label>
                          <textarea placeholder="Tell us about your project, goals, timeline..."
                            value={formData.project}
                            onChange={e => setFormData(p => ({ ...p, project: e.target.value.slice(0, 500) }))}
                            onFocus={() => setFocusedField("project")} onBlur={() => setFocusedField(null)}
                            rows={3} className={`${inputClass("project")} resize-none pb-8`} required disabled={isSubmitting} />
                          <div className="absolute right-4 bottom-3 text-[9px] font-black text-zinc-400 pointer-events-none">
                            {formData.project.length}/500
                          </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={isSubmitting}
                          className="relative w-full py-4 rounded-2xl font-black text-white text-base overflow-hidden group disabled:opacity-80 btn-shimmer"
                          style={{ boxShadow: "0 12px 40px rgba(228,13,40,0.4), 0 4px 12px rgba(228,13,40,0.25)" }}>
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span>Launching your project...</span>
                              </>
                            ) : (
                              <>
                                <Image src="/images/images/paper-plane.png" alt="" width={22} height={22}
                                  className="object-contain group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                <span>Submit Form</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>

                        <p className="text-center text-zinc-400 text-[10px] font-medium flex items-center justify-center gap-1.5">
                          <svg className="w-3 h-3 text-zinc-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                          Your data is 100% secure and never shared
                        </p>
                      </form>
                    ) : (
                      <div className="text-center py-10 flex flex-col items-center gap-5 opacity-0 pointer-events-none">
                        {/* Placeholder to keep form card height stable after submit if needed */}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────
                    RIGHT: Contact Info — premium 2x2 grid + follow-us panel
                ──────────────────────────────────────────────────────── */}
              <div className="flex flex-col gap-4 justify-between relative">

                {/* Decorative Floating Mockup Elements */}
                <div className="absolute top-[-20px] right-[-20px] w-24 h-24 opacity-[0.15] pointer-events-none transform rotate-12">
                  <Image src="/images/images/paper-plane.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute bottom-10 left-[-30px] w-28 h-28 opacity-[0.2] pointer-events-none transform -rotate-12">
                  <Image src="/images/images/paper-plane.png" alt="" fill className="object-contain animate-bounce" style={{ animationDuration: '4s' }} />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    ...CONTACT_ITEMS,
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.032 10.426v7.352a1.8 1.8 0 01-1.8 1.8h-7.251v-9.152h9.051zm-9.97 0v9.152H2.998a1.8 1.8 0 01-1.8-1.8v-7.352h10.864zm5.452-1.213a3.616 3.616 0 110-7.232 3.616 3.616 0 010 7.232zm-9.969 0A3.616 3.616 0 117.544 1.98a3.616 3.616 0 010 7.232z"/>
                        </svg>
                      ),
                      label: "Teams",
                      value: "Connect on Teams",
                      href: "#",
                    }
                  ].map((item, i) => (
                    <a key={i} href={item.href}
                      className="group relative flex flex-col justify-between rounded-[28px] p-5 overflow-hidden glass-premium-interactive">
                      {/* Hover fill effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[28px]"
                        style={{ background: "linear-gradient(135deg, rgba(228,13,40,0.04), rgba(255,107,53,0.02))" }} />
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(180deg, #E40D28, #ff6b35)" }} />

                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: "linear-gradient(135deg, rgba(228,13,40,0.08), rgba(228,13,40,0.04))",
                            boxShadow: "0 0 0 1px rgba(228,13,40,0.1)",
                          }}>
                          <div className="text-[#E40D28] group-hover:text-[#c00018] transition-colors duration-300">{item.icon}</div>
                        </div>
                        {/* Mockup Link Arrow */}
                        <svg className="w-4 h-4 text-zinc-400 group-hover:text-[#E40D28] group-hover:translate-x-1 transition-all duration-300"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>

                      <div className="relative min-w-0">
                        <div className="text-[10px] font-bold !text-[#b5b4bb] uppercase tracking-[0.2em] mb-1">{item.label}</div>
                        <div className="text-zinc-700 text-xs sm:text-[13px] font-semibold break-all leading-tight group-hover:text-zinc-900 transition-colors duration-200">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Connect with Us row */}
                <div className="rounded-[28px] p-5 glass-premium-interactive">
                  <div className="text-[10px] font-bold !text-[#b5b4bb] uppercase tracking-[0.2em] mb-3">Connect With Us</div>
                  <div className="flex items-center gap-3">
                    {SOCIAL.map((s, i) => (
                      <a key={i} href={s.href} aria-label={s.label}
                        className="group/s w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                        style={{ background: "rgba(228,13,40,0.04)", border: "1px solid rgba(228,13,40,0.08)" }}>
                        <span className="group-hover/s:text-[#E40D28] transition-colors duration-200">{s.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Trust Features Row ── */}
            <div className="w-full max-w-[1260px] mx-auto mt-6 bg-white/70 border border-zinc-200/50 rounded-[28px] p-5 backdrop-blur-md pointer-events-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                {/* 100% Secure */}
                <div className="flex items-center gap-3 px-2 md:px-4 border-b md:border-b-0 md:border-r border-zinc-200/30 pb-4 md:pb-0 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-[#FFF0F2] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E40D28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-950 leading-tight">100% Secure</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 leading-tight">Your data is protected with top-level security.</p>
                  </div>
                </div>
                {/* Quick Response */}
                <div className="flex items-center gap-3 px-2 md:px-4 border-b md:border-b-0 md:border-r border-zinc-200/30 pb-4 md:pb-0 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-[#FFF7E8] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#ff6b35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-950 leading-tight">Quick Response</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 leading-tight">We typically reply within 2 hours.</p>
                  </div>
                </div>
                {/* Expert Team */}
                <div className="flex items-center gap-3 px-2 md:px-4 border-b sm:border-b-0 md:border-r border-zinc-200/30 pb-4 sm:pb-0 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-950 leading-tight">Expert Team</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 leading-tight">Get assistance from our experienced pros.</p>
                  </div>
                </div>
                {/* Client First */}
                <div className="flex items-center gap-3 px-2 md:px-4 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 00.906 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-950 leading-tight">Client First</h4>
                    <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 leading-tight">Your success is our top priority.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
