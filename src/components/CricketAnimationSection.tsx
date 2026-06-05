"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CricketAnimationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bowlerRef = useRef<HTMLImageElement>(null);
  const batterRef = useRef<HTMLImageElement>(null);
  const ballRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const masterTl = useRef<gsap.core.Timeline | null>(null);
  const isHitting = useRef(false);
  const isSwinging = useRef(false);
  const iconIndexRef = useRef(0);

  const techIcons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // PHASE 1: Entry
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          setHasEntered(true);
          
          // Bring characters in
          gsap.to(bowlerRef.current, {
            x: 0,
            duration: 1.5,
            ease: "power2.out",
          });
          gsap.to(batterRef.current, {
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
              setShowPrompt(true);
              startAutoLoop(); // Start continuous looping after entry
            }
          });
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startAutoLoop = () => {
    if (isHitting.current) return;
    
    if (masterTl.current) {
      masterTl.current.kill();
    }

    isSwinging.current = false;

    // Cycle to the next tech icon
    if (ballRef.current) {
      ballRef.current.src = techIcons[iconIndexRef.current];
      iconIndexRef.current = (iconIndexRef.current + 1) % techIcons.length;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (!isHitting.current) {
          startAutoLoop(); // Loop again
        }
      }
    });
    masterTl.current = tl;

    // Reset clean state
    gsap.set(ballRef.current, { opacity: 0, scale: 1, rotation: 0, x: 0, y: 0 });
    gsap.set(bowlerRef.current, { x: 0, y: 0, rotation: 0 });
    gsap.set(batterRef.current, { x: 0, y: 0, rotation: 0 });
    if (particlesRef.current) particlesRef.current.innerHTML = "";

    const isMobile = window.innerWidth < 768;
    const runDistance = isMobile ? 30 : 60;

    // PHASE 2 - RUN UP
    tl.to(bowlerRef.current, { x: runDistance, duration: 1.2, ease: "power1.inOut" }, "runup");
    tl.to(bowlerRef.current, { rotation: 5, yoyo: true, repeat: 3, duration: 0.3 }, "runup");

    // Batter prep
    tl.to(batterRef.current, { y: 4, yoyo: true, repeat: 3, duration: 0.3, ease: "sine.inOut" }, "runup");

    // PHASE 3 - BOWL
    tl.to(bowlerRef.current, { rotation: -15, duration: 0.3, ease: "power2.out" }, "bowl");
    tl.set(ballRef.current, { opacity: 1 }, "bowl+=0.1");
    
    // Ball travels and passes the batter (Miss)
    // Travel starts at timeline time 1.5s
    tl.to(ballRef.current, {
      x: "100vw", // Hardware accelerated translation instead of left/bottom
      y: 50,
      rotation: 720,
      duration: 0.8,
      ease: "none"
    }, "travel");
  };

  const handlePlay = () => {
    if (!hasEntered || isHitting.current || isSwinging.current) return;
    isSwinging.current = true;

    // 1. ALWAYS ANIMATE THE SWING
    gsap.to(batterRef.current, {
      rotation: 15, 
      transformOrigin: "bottom center",
      duration: 0.1,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(batterRef.current, {
          rotation: -30,
          duration: 0.15,
          ease: "power4.out",
          onComplete: () => {
            // Return to stance if it was a miss
            if (!isHitting.current) {
              gsap.to(batterRef.current, {
                rotation: 0,
                duration: 0.4,
                delay: 0.2,
                ease: "power2.inOut",
                onComplete: () => {
                  isSwinging.current = false;
                }
              });
            }
          }
        });
      }
    });

    // 2. CHECK HIT TIMING
    if (masterTl.current) {
      const currentTime = masterTl.current.time();
      const isMobile = window.innerWidth < 768;
      
      // Calculate when the ball reaches the bat
      const targetLeft = isMobile ? 65 : 80;
      const travelRatio = (targetLeft - 20) / 100;
      const hitTime = 1.5 + (travelRatio * 0.8); // 1.5s is when travel phase starts
      
      // Hit window: +/- 0.15 seconds from perfect timing
      if (Math.abs(currentTime - hitTime) < 0.15) {
        // HIT SUCCESS!
        isHitting.current = true;
        masterTl.current.pause();

        const hitTl = gsap.timeline({
          onComplete: () => {
            isHitting.current = false;
            setTimeout(() => startAutoLoop(), 1000); // Resume loop after explosion
          }
        });

        // IMPACT FLASH
        hitTl.add(() => {
          gsap.to(sectionRef.current, { backgroundColor: "#3a3a3a", duration: 0.1, yoyo: true, repeat: 1 });
          createSparkParticles();
        }, 0.1); // slight delay to sync with the bat hitting forward

        // Random hit directions
        const hitDirections = [
          { x: "10vw", y: -500 },  // High center
          { x: "40vw", y: -400 },  // High right
          { x: "-20vw", y: -300 }, // High left
          { x: "50vw", y: 100 },   // Low right
          { x: "-30vw", y: 200 },  // Low left
        ];
        const dir = hitDirections[Math.floor(Math.random() * hitDirections.length)];

        // SIXER (3D Camera Effect)
        hitTl.to(ballRef.current, {
          x: dir.x,
          y: dir.y,
          scale: 25, // Massive scale to simulate coming toward the camera
          rotation: "+=1080",
          duration: 1.5,
          ease: "power2.inOut"
        }, 0.1);

        // Camera follow effect
        hitTl.to(sectionRef.current, {
          scale: 1.02,
          duration: 1.5,
          ease: "power2.out"
        }, 0.1);

        // BALL EXPLOSION
        hitTl.add(() => {
          gsap.set(ballRef.current, { opacity: 0 }); // Explode ball
          createExplosionParticles();
        }, 1.6);

        hitTl.to(sectionRef.current, {
          scale: 1, // restore scale
          duration: 0.5
        }, 1.6);
        
        playCrowdCheer();
      }
    }
  };

  const playCrowdCheer = () => {
    // Hook for audio:
    // const audio = new Audio('/cheer.mp3');
    // audio.play().catch(e => console.log(e));
  };

  const createSparkParticles = () => {
    if (!particlesRef.current) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "absolute w-1.5 h-1.5 rounded-full bg-yellow-400 z-50";
      p.style.right = "15%";
      p.style.bottom = "20%";
      particlesRef.current.appendChild(p);
      
      gsap.to(p, {
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150,
        opacity: 0,
        duration: 0.5 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => p.remove()
      });
    }
  };

  const createExplosionParticles = () => {
    if (!particlesRef.current) return;
    for (let i = 0; i < 80; i++) {
      const p = document.createElement("div");
      const colors = ["#E21628", "#FFA757", "#ffffff", "#4B516B"];
      p.className = `absolute w-2 h-2 md:w-3 md:h-3 rounded-full z-40`;
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = "50%";
      p.style.top = "20%";
      particlesRef.current.appendChild(p);
      
      gsap.to(p, {
        x: (Math.random() - 0.5) * window.innerWidth * 0.8,
        y: (Math.random() - 0.5) * 600,
        scale: Math.random() * 2,
        opacity: 0,
        duration: 1 + Math.random() * 1.5,
        ease: "power3.out",
        onComplete: () => p.remove()
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handlePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasEntered]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[220px] md:h-[300px] bg-[#121212] flex items-center justify-center cursor-pointer select-none border-t border-zinc-800 z-50"
      onClick={handlePlay}
    >
      {/* Pitch Line */}
      <div 
        className="absolute bottom-4 md:bottom-8 left-0 w-full h-[2px] bg-zinc-800"
      />

      {/* Particles Container (High z-index so explosion spills over) */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-[60]" />

      {/* Ball (OUTSIDE overflow-hidden with massive z-index so it flies over everything) */}
      <img 
        ref={ballRef}
        src="/cricket_ball.svg" 
        alt="Ball"
        className="absolute bottom-[40%] left-[20%] h-4 md:h-6 object-contain opacity-0 z-[100] will-change-transform"
      />

      {/* Wrapper for Characters (keeps slide-in animation from causing horizontal scrollbars) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bowler */}
        <img 
          ref={bowlerRef}
          src="/bowler.svg" 
          alt="Bowler"
          className="absolute bottom-4 md:bottom-8 left-4 md:left-16 h-28 md:h-40 object-contain translate-x-[-150vw] will-change-transform"
        />

        {/* Batter */}
        <img 
          ref={batterRef}
          src="/BATTER.svg" 
          alt="Batter"
          className="absolute bottom-4 md:bottom-8 right-4 md:right-16 h-36 md:h-48 object-contain translate-x-[150vw] will-change-transform"
        />
      </div>

      {/* Floating Prompt */}
      {showPrompt && (
        <div className="absolute top-8 pointer-events-none text-white font-semibold tracking-wide text-sm md:text-base animate-bounce z-[110]">
          <span className="hidden md:inline">Press SPACE to Smash the Ball 🏏</span>
          <span className="inline md:hidden">Tap anywhere to Smash the Ball 🏏</span>
        </div>
      )}
    </section>
  );
}
