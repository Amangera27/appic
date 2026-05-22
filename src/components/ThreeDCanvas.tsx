"use client";

import React, { useEffect, useState, useRef } from "react";

export default function ThreeDCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -0.5 and 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setTargetPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth interpolation (lerp) for premium cinematic response
  useEffect(() => {
    const updatePosition = () => {
      setMousePos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.08, // Lerp speed
          y: prev.y + dy * 0.08,
        };
      });
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    requestRef.current = requestAnimationFrame(updatePosition);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#020205] overflow-hidden -z-20">
      
      {/* 1. Deep Space Dynamic Radial Glow (Follows mouse slightly) */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-25 transition-transform duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${mousePos.x * 120}px, ${mousePos.y * 120}px)`,
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 transition-transform duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(217, 70, 239, 0.03) 60%, transparent 100%)",
          left: "40%",
          top: "30%",
          transform: `translate(-50%, -50%) translate(${mousePos.x * -160}px, ${mousePos.y * -160}px)`,
        }}
      />

      {/* 2. Three-Dimensional Perspective Grid Layer */}
      <div
        className="absolute inset-0 opacity-[0.25] transition-transform duration-300 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `perspective(1000px) rotateX(65deg) translateY(-80px) translateZ(-50px) rotateY(${mousePos.x * 4}deg) rotateZ(${mousePos.y * -4}deg)`,
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
          className="absolute w-96 h-96 border border-white/5 rounded-full flex items-center justify-center transition-transform duration-500"
          style={{
            top: "20%",
            left: "15%",
            transform: `perspective(800px) rotateX(45deg) rotateY(${mousePos.x * 20}deg) rotateZ(${mousePos.y * 30}deg)`,
          }}
        >
          <div className="w-80 h-80 border border-dashed border-indigo-500/10 rounded-full animate-spin duration-[40000ms]" />
          <div className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)] -top-1 animate-pulse" />
        </div>

        {/* Floating Ring 2 */}
        <div
          className="absolute w-[500px] h-[500px] border border-white/5 rounded-full flex items-center justify-center transition-transform duration-700"
          style={{
            bottom: "10%",
            right: "10%",
            transform: `perspective(800px) rotateX(55deg) rotateY(${mousePos.x * -25}deg) rotateZ(${mousePos.y * -25}deg)`,
          }}
        >
          <div className="w-[450px] h-[450px] border border-dotted border-purple-500/10 rounded-full animate-spin duration-[60000ms] reverse" />
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)] -bottom-1.5" />
        </div>

        {/* Futuristic Tech Reticle Overlay */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full opacity-40 transition-transform duration-300"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) scale(0.95)`,
          }}
        >
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin duration-[20s]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full" />
        </div>

      </div>

      {/* 4. Fine Starfield / Cosmic Dust (floating particles) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const delay = (i * 0.7).toFixed(1);
          const top = (Math.random() * 100).toFixed(0);
          const left = (Math.random() * 100).toFixed(0);
          const size = Math.random() * 2 + 1;
          const factor = Math.random() * 30 + 10;
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-30 animate-pulse"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                transform: `translate(${mousePos.x * factor}px, ${mousePos.y * factor}px)`,
              }}
            />
          );
        })}
      </div>

    </div>
  );
}
