"use client";

import React from "react";

const FOOTER_DATA = [
  {
    title: "Industries",
    links: [
      "Astrology",
      "Healthcare",
      "Real estate",
      "On-demand",
      "Travel",
      "Education",
      "Fitness",
      "Pet Care",
    ],
  },
  {
    title: "Services",
    links: [
      "iOS App Development",
      "Android App Development",
      "Software Development",
      "Flutter App Development",
      "Mobile App Development",
      "Ionic development",
      "Maintenance & Support",
    ],
  },
  {
    title: "Portfolio",
    links: [
      "Bridl",
      "Obdoor",
      "Laiqa",
      "Rocca Box",
      "Plantify",
      "City of Cars",
      "No-limit-Qr",
      "Sync Remote",
    ],
  },
  {
    title: "Platform",
    links: [
      "Artificial Intelligence",
      "Blockchain",
      "IOT",
      "MVP",
      "Angular",
      "PWA",
      "Devops",
      "Drupal",
    ],
  },
  {
    title: "About",
    links: [
      "Our company",
      "Blog",
      "Portfolio",
      "Case Studies",
      "Let's connect",
      "Career",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#161616] pt-16 pb-12 font-sans relative z-10 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {FOOTER_DATA.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-white font-bold text-[15px] tracking-wide mb-3">
                {col.title}
              </h3>
              {/* Red Underline */}
              <div className="w-6 h-[3px] bg-[#DE0A26] mb-6 rounded-full"></div>
              
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-[#A1A1AA] hover:text-white transition-colors duration-200 text-[13px] font-medium tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Optional: Bottom copyright row */}
        <div className="mt-20 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-[12px] tracking-wider">
            © {new Date().getFullYear()} APPIC SOFTWARES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
