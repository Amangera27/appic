"use client";

import { useEffect, RefObject } from "react";

export default function useScrollAnimation(
  containerRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    let ctx: any;
    let scrollTriggerInstance: any;

    (async () => {
      try {
        const gsapModule = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsapModule.gsap.registerPlugin(ScrollTrigger);

        const gsap = gsapModule.gsap;

        ctx = gsap.context(() => {
          const container = containerRef.current;
          if (!container) return;

          const cards = container.querySelectorAll(".carousel-card-wrapper");
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
              // Tablet
              radius = 1250;
              spacingAngle = 32;
              floatCurve = 20;
              baseYOffset = 20;
            } else {
              // Desktop
              radius = 1750;
              spacingAngle = 28;
              floatCurve = 25;
              baseYOffset = 30;
            }
          };

          updateResponsiveParams();
          window.addEventListener("resize", updateResponsiveParams);

          // Position calculation helper
          const updatePositions = (progress: number) => {
            // Add a 10% resting zone at the start and end so cards sit in center
            let activeIndex = 0;
            if (progress > 0.1 && progress < 0.9) {
              activeIndex = ((progress - 0.1) / 0.8) * (totalCards - 1);
            } else if (progress >= 0.9) {
              activeIndex = totalCards - 1;
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

          // Create custom snap array based on the deadzone logic
          const snapPoints = [0];
          for (let i = 1; i < totalCards - 1; i++) {
            snapPoints.push(0.1 + (i / (totalCards - 1)) * 0.8);
          }
          snapPoints.push(1);

          const stickyElement = container.querySelector(".sticky");

          scrollTriggerInstance = ScrollTrigger.create({
            trigger: container,
            start: "top 100px",
            end: "bottom bottom",
            scrub: 1.1,
            snap: snapPoints,
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
      } catch (err) {
        console.error("GSAP ScrollTrigger curved carousel animation error:", err);
      }
    })();

    return () => {
      ctx?.revert();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [containerRef]);
}
