"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useScrollAnimation(
  containerRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let scrollTriggerInstance: any;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

          const cards = container.querySelectorAll(".desktop-carousel .carousel-card-wrapper");
          const totalCards = cards.length;
          if (totalCards === 0) return;

          // Define responsive values (Radius and spacing increased to match larger card sizes)
          let radius = 1750;
          let spacingAngle = 28;
          let floatCurve = 25;
          let baseYOffset = 30;

          const updateResponsiveParams = () => {
            const width = window.innerWidth;
            if (width < 640) {
              // Mobile
              radius = 800;
              spacingAngle = 45;
              floatCurve = 12;
              baseYOffset = 10;
            } else if (width < 1024) {
              // Tablet (md)
              radius = 1000;
              spacingAngle = 32;
              floatCurve = 20;
              baseYOffset = 20;
            } else if (width < 1280) {
              // Small Laptop (lg)
              radius = 1200;
              spacingAngle = 28;
              floatCurve = 20;
              baseYOffset = 20;
            } else if (width < 1536) {
              // Laptop (xl)
              radius = 1400;
              spacingAngle = 28;
              floatCurve = 25;
              baseYOffset = 25;
            } else {
              // Desktop (2xl)
              radius = 1600;
              spacingAngle = 28;
              floatCurve = 25;
              baseYOffset = 30;
            }
          };

          updateResponsiveParams();
          window.addEventListener("resize", updateResponsiveParams);

          // Position calculation helper
          const updatePositions = (progress: number) => {
            // Apply a strict locking deadzone so the active card strictly stays in the center for a portion of the scroll
            let activeIndex = progress * (totalCards - 1);
            
            // Snap the index tightly to whole numbers if it's close to one, creating a stable center rest period
            const nearestIndex = Math.round(activeIndex);
            if (Math.abs(activeIndex - nearestIndex) < 0.15) {
              activeIndex = nearestIndex; // Lock completely to center
            }

            cards.forEach((cardNode, index) => {
              const card = cardNode as HTMLElement;
              
              // Angle relative to center: negative = left side, positive = right side
              const angle = spacingAngle * (index - activeIndex);
              const rad = (angle * Math.PI) / 180;

              // Calculate 3D positions (Cylinder path)
              const x = Math.sin(rad) * radius;
              const z = Math.cos(rad) * radius - radius;
              
              // Y position: subtle vertical curve
              const y = Math.sin(rad) * floatCurve + baseYOffset;

              // Rotations
              const rotY = -angle; // Face the camera perfectly along the circular arc
              const rotX = Math.abs(Math.sin(rad)) * 5; // Very subtle tilt
              const rotZ = -Math.sin(rad) * 2; // Subtle float tilt

              // Scale card down as it moves away from center
              const scale = Math.cos(rad) * 0.16 + 0.84;

              // Smooth fade out for side cards (fade out when turning too far)
              const cosRad = Math.cos(rad);
              const opacity = cosRad > 0.32 
                ? Math.min(1, (cosRad - 0.32) / 0.28) 
                : 0;

              // Apply styles
              card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
              card.style.opacity = opacity.toString();
              card.style.pointerEvents = opacity > 0.15 ? "auto" : "none";
            });
          };

          // Initialize card positions
          updatePositions(0);

          const stickyElement = container.querySelector(".desktop-sticky");

          scrollTriggerInstance = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            snap: {
              snapTo: 1 / (totalCards - 1),
              duration: { min: 0.2, max: 0.6 },
              delay: 0.05,
              ease: "power1.inOut"
            },
            pin: stickyElement || true,
            pinSpacing: false,
            onUpdate: (self) => {
              // Update positions dynamically on scroll
              updatePositions(self.progress);
              
              // Update bottom progress bar width
              const progressFill = container.querySelector(".carousel-progress-fill") as HTMLElement;
              if (progressFill) {
                progressFill.style.width = `${self.progress * 100}%`;
              }
            },
          });

          // Add subtle independent organic floating effect on the cards
          cards.forEach((cardNode, index) => {
            const inner = cardNode.querySelector(".carousel-card-inner");
            if (inner) {
              gsap.to(inner, {
                y: "random(-8, 8)",
                x: "random(-4, 4)",
                // No rotation - so center card always stays perfectly straight
                duration: gsap.utils.random(3.2, 5.2),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.3,
              });
            }
          });

          // Clean up resize listener on unmount
          return () => {
            window.removeEventListener("resize", updateResponsiveParams);
          };
        }, containerRef);

    return () => {
      ctx?.revert();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [containerRef]);
}
