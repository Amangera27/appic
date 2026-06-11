"use client";

import React from "react";

const FRONTEND_TECH = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
];

const BACKEND_TECH = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
];

const DEV_TOOLS = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Swift / iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" },
  { name: "Kotlin / Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Git / Github", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "Amazon Web Services", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
];

export default function TechStack() {
  // Triple clone lists to ensure infinite wrap doesn't cause whitespace on ultra-wide monitors
  const list1 = [...FRONTEND_TECH, ...FRONTEND_TECH, ...FRONTEND_TECH];
  const list2 = [...BACKEND_TECH, ...BACKEND_TECH, ...BACKEND_TECH];
  const list3 = [...DEV_TOOLS, ...DEV_TOOLS, ...DEV_TOOLS];

  return (
    <div className="relative w-full py-[40px] md:py-[60px] bg-[#Fdfdfd] overflow-hidden flex flex-col justify-center select-none border-t border-b border-zinc-100">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vh] rounded-full bg-red-400/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vh] rounded-full bg-[#a855f7]/5 blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8 md:mb-10 z-10 px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#111111] tracking-[-0.03em] leading-[1.1] mb-4">
          Our Tech <span className="text-[#E40D28]">Stack</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          We leverage cutting-edge frameworks, databases, and DevOps utilities to build secure, highly scalable modern platforms.
        </p>
      </div>

      {/* Sliders Container */}
      <div className="flex flex-col gap-6 w-full relative z-10">
        
        {/* Row 1: Left to Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mask-fade-edges py-1.5">
          <div className="flex gap-6 animate-marquee-ltr min-w-full shrink-0">
            {list1.map((tech, idx) => (
              <div
                key={`r1-${idx}`}
                className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:scale-[1.04] hover:border-[#E40D28]/30 hover:shadow-[0_8px_30px_rgba(228,13,40,0.04)] cursor-pointer group"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain pointer-events-none group-hover:rotate-[6deg] transition-transform duration-300"
                  loading="lazy"
                />
                <span className="text-[13px] sm:text-sm font-bold text-zinc-700 group-hover:text-zinc-950 transition-colors duration-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mask-fade-edges py-1.5">
          <div className="flex gap-6 animate-marquee-rtl min-w-full shrink-0">
            {list2.map((tech, idx) => (
              <div
                key={`r2-${idx}`}
                className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:scale-[1.04] hover:border-[#a855f7]/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.04)] cursor-pointer group"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain pointer-events-none group-hover:rotate-[-6deg] transition-transform duration-300"
                  loading="lazy"
                />
                <span className="text-[13px] sm:text-sm font-bold text-zinc-700 group-hover:text-zinc-950 transition-colors duration-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Left to Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mask-fade-edges py-1.5">
          <div className="flex gap-6 animate-marquee-ltr min-w-full shrink-0">
            {list3.map((tech, idx) => (
              <div
                key={`r3-${idx}`}
                className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:scale-[1.04] hover:border-[#E40D28]/30 hover:shadow-[0_8px_30px_rgba(228,13,40,0.04)] cursor-pointer group"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain pointer-events-none group-hover:rotate-[6deg] transition-transform duration-300"
                  loading="lazy"
                />
                <span className="text-[13px] sm:text-sm font-bold text-zinc-700 group-hover:text-zinc-950 transition-colors duration-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded CSS for smooth infinite GPU scroll & edges fade mask */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 28s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 28s linear infinite;
        }
        .animate-marquee-ltr:hover, .animate-marquee-rtl:hover {
          animation-play-state: paused;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
        }
      `}</style>
    </div>
  );
}
