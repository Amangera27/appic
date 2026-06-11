"use client";

import React, { useRef } from "react";
import CarouselCard from "./CarouselCard";
import useScrollAnimation from "./useScrollAnimation";

const caseStudies = [
  {
    brandLogo: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/bridle-logo.svg",
    title: "Simplifying The Equine Trade Process",
    description: "We develop a complete horse trading solution for a client based in the United Kingdom. The solution had all the buy and sell features with also an option to auction the horses by leveraging the latest techstack.",
    image: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/bridl-image.webp",
    bgGradient: "bg-gradient-to-br from-rose-50 to-rose-100/70",
    themeColor: "text-rose-600",
    btnHover: "hover:bg-rose-600 hover:text-white"
  },
  {
    brandLogo: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/credit-enable.svg",
    title: "Delivering loans to businesses and helping achieve dreams.",
    description: "An all-inclusive loan lending website that allows users to check their credit score and apply for loans. From personal to business, anyone can avail loan through Credit Enable.",
    image: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/creditenable-images.webp",
    bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100/70",
    themeColor: "text-purple-600",
    btnHover: "hover:bg-purple-600 hover:text-white"
  },
  {
    brandLogo: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/metrikflow-logo.svg",
    title: "Help enterprises to calculate emission level and reduce pollution.",
    description: "MetrikFlow is an EcoEmission Analyzer that enables businesses and enterprises to leverage technology to support them in achieving climate goals and lead the sustainability transition.",
    image: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/image-4.png",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/70",
    themeColor: "text-emerald-600",
    btnHover: "hover:bg-emerald-600 hover:text-white"
  },
  {
    brandLogo: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/laiqa-logo.svg",
    title: "Ecommerce Store To Revolutionizing Women’s Healthcare",
    description: "Built to empower girls, Laiqa provides affordable, sustainable, and eco-friendly products. They offer a wide range of products that range from period care products to intimate hygiene.",
    image: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/laiqa-laptop.webp",
    bgGradient: "bg-gradient-to-br from-pink-50 to-pink-100/70",
    themeColor: "text-pink-600",
    btnHover: "hover:bg-pink-600 hover:text-white"
  },
  {
    brandLogo: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/logo-1.webp",
    title: "Simplifying The Home Loan Process",
    description: "With a motive to provide home loans, we helped them develop a database that makes it easier for them to store data. We assisted them by maintaining web server and developing a dynamic database.",
    image: "https://appicsoftwares-image.s3.ap-south-1.amazonaws.com/php/images/aavas_fin_home.webp",
    bgGradient: "bg-gradient-to-br from-red-50 to-red-100/70",
    themeColor: "text-red-600",
    btnHover: "hover:bg-red-600 hover:text-white"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook handles the pinning, 3D path rotation, and floating updates
  useScrollAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="relative w-full sm:h-[300vh] bg-white select-none border-t border-slate-100/80"
    >
      {/* Desktop Sticky Viewport & Mobile Static Viewport */}
      <div className="desktop-sticky sm:sticky sm:top-0 w-full sm:h-screen flex flex-col items-center sm:overflow-hidden pt-8 pb-2 sm:pt-10 sm:pb-4">

        {/* Stage Header */}
        <div className="text-center z-20 px-6 max-w-4xl shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0f172a] tracking-tight mb-3">
            Our Case Studies
          </h2>
          <p className="text-[16px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Discover how we've helped businesses across various industries transform their ideas into powerful digital solutions.
          </p>
        </div>

        {/* Desktop 3D Carousel Stage */}
        <div
          className="hidden sm:flex relative flex-1 w-full items-center justify-center pointer-events-none mt-8 sm:mt-12 lg:mt-16 desktop-carousel"
          style={{
            perspective: "1600px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Inner Stage (enables card overlays/depth) */}
          <div
            className="relative w-full h-full flex items-center justify-center translate-y-4 sm:translate-y-8 lg:translate-y-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            {caseStudies.map((study, index) => (
              <CarouselCard
                key={index}
                brandLogo={study.brandLogo}
                title={study.title}
                description={study.description}
                image={study.image}
                bgGradient={study.bgGradient}
                themeColor={study.themeColor}
                btnHover={study.btnHover}
              />
            ))}
          </div>
        </div>

        {/* Mobile Swipe Slider */}
        <div className="flex sm:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 pt-6 hide-scrollbar">
          {caseStudies.map((study, index) => (
            <div key={index} className="shrink-0 w-[85%] h-[380px] snap-center relative">
              <CarouselCard
                brandLogo={study.brandLogo}
                title={study.title}
                description={study.description}
                image={study.image}
                bgGradient={study.bgGradient}
                themeColor={study.themeColor}
                btnHover={study.btnHover}
                mobileMode={true}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
