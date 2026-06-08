"use client";

import React, { useEffect, useState } from "react";

interface SplashLoaderProps {
  onComplete: () => void;
}

export default function SplashLoader({ onComplete }: SplashLoaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out almost immediately
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for the fade transition to finish before calling onComplete
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(fadeTimer);
    }, 100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F1EEF0] transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) ${
        isFadingOut ? "opacity-0 scale-102 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 
        High-Performance SVG Chroma-Key Filter
        Filtes out neutral off-white, light grey, and gradient studio backgrounds
        while keeping highly saturated color channels (like the red symbol) perfectly solid.
      */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
        <defs>
          <filter id="blend-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                -2.8 -2.8 -2.8 8.4 -2.2
              "
            />
          </filter>
        </defs>
      </svg>

      {/* Centered GIF Animation */}
      <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] transition-all duration-500">
        <img
          src="/appic-gif.gif"
          alt="Appic Loading..."
          className="w-full h-full object-contain"
          style={{
            filter: "url(#blend-filter)",
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%)",
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>
    </div>
  );
}
