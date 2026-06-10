"use client";

import React, { useEffect, useRef } from "react";

export default function ThreeDCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -0.5 and 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetPos.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth interpolation (lerp) for premium cinematic response via CSS variables
  useEffect(() => {
    const updatePosition = () => {
      const dx = targetPos.current.x - mousePos.current.x;
      const dy = targetPos.current.y - mousePos.current.y;
      
      mousePos.current.x += dx * 0.08; // Lerp speed
      mousePos.current.y += dy * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", mousePos.current.x.toFixed(4));
        containerRef.current.style.setProperty("--mouse-y", mousePos.current.y.toFixed(4));
      }
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    requestRef.current = requestAnimationFrame(updatePosition);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Generate initial static offsets for particles
  const particles = useRef(
    [...Array(20)].map((_, i) => ({
      delay: (i * 0.7).toFixed(1),
      top: (Math.random() * 100).toFixed(0),
      left: (Math.random() * 100).toFixed(0),
      size: Math.random() * 2 + 1,
      factor: Math.random() * 30 + 10,
    }))
  );

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-[#020205] overflow-hidden -z-20 will-change-transform"
      style={{
        // Define default/initial values
        "--mouse-x": "0",
        "--mouse-y": "0",
      } as React.CSSProperties}
    >
      
      {/* 1. Deep Space Dynamic Radial Glow (Follows mouse slightly) - Optimized blur values for performance */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[90px] opacity-25 transition-transform duration-500 pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(calc(var(--mouse-x) * 120px), calc(var(--mouse-y) * 120px))`,
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[70px] opacity-15 transition-transform duration-700 pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(217, 70, 239, 0.03) 60%, transparent 100%)",
          left: "40%",
          top: "30%",
          transform: `translate(-50%, -50%) translate(calc(var(--mouse-x) * -160px), calc(var(--mouse-y) * -160px))`,
        }}
      />

      {/* 2. Three-Dimensional Perspective Grid Layer */}
      <div
        className="absolute inset-0 opacity-[0.25] transition-transform duration-300 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `perspective(1000px) rotateX(65deg) translateY(-80px) translateZ(-50px) rotateY(calc(var(--mouse-x) * 4deg)) rotateZ(calc(var(--mouse-y) * -4deg))`,
          transformOrigin: "center center",
        }}
      />

      {/* Grid Floor Reflection Accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#020205] via-[#020205]/80 to-transparent pointer-events-none"
      />

      {/* 3. Floating 3D Geometric Outlines */}
      <div className="absolute inset-0 pointer-events-none select-none">
        
        {/* Floating Ring 1 */}
        <div
          className="absolute w-96 h-96 border border-white/5 rounded-full flex items-center justify-center transition-transform duration-500 will-change-transform"
          style={{
            top: "20%",
            left: "15%",
            transform: `perspective(800px) rotateX(45deg) rotateY(calc(var(--mouse-x) * 20deg)) rotateZ(calc(var(--mouse-y) * 30deg))`,
          }}
        >
          <div className="w-80 h-80 border border-dashed border-indigo-500/10 rounded-full animate-spin duration-[40000ms]" />
          <div className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)] -top-1 animate-pulse" />
        </div>

        {/* Floating Ring 2 */}
        <div
          className="absolute w-[500px] h-[500px] border border-white/5 rounded-full flex items-center justify-center transition-transform duration-700 will-change-transform"
          style={{
            bottom: "10%",
            right: "10%",
            transform: `perspective(800px) rotateX(55deg) rotateY(calc(var(--mouse-x) * -25deg)) rotateZ(calc(var(--mouse-y) * -25deg))`,
          }}
        >
          <div className="w-[450px] h-[450px] border border-dotted border-purple-500/10 rounded-full animate-spin duration-[60000ms] reverse" />
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)] -bottom-1.5" />
        </div>

        {/* Futuristic Tech Reticle Overlay */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full opacity-40 transition-transform duration-300 will-change-transform"
          style={{
            transform: `translate(-50%, -50%) translate(calc(var(--mouse-x) * 40px), calc(var(--mouse-y) * 40px)) scale(0.95)`,
          }}
        >
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin duration-[20s]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full" />
        </div>

      </div>

      {/* 4. Fine Starfield / Cosmic Dust (floating particles) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.current.map((p, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-pulse will-change-transform"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              transform: `translate(calc(var(--mouse-x) * ${p.factor}px), calc(var(--mouse-y) * ${p.factor}px))`,
            }}
          />
        ))}
      </div>

    </div>
  );
}

