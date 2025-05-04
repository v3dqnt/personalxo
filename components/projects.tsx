"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Scroll indicator hide/show
    const handleUserScroll = () => {
      if (window.scrollY > 10) {
        gsap.to("#scroll-indicator", {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to("#scroll-indicator", {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleUserScroll, { passive: true });

    gsap.fromTo(
      ".project-card",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.4)",
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to(
      headerRef.current,
      { opacity: 0, y: -100, duration: 1 },
      0
    );

    tl.fromTo(
      cardsContainerRef.current,
      {
        y: "100vh",
        opacity: 0.6,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    const cards = gsap.utils.toArray(".project-card");
    const totalWidth = cards.length * (352 + 48) - 48;
    const moveDistance = Math.max(0, totalWidth - window.innerWidth + 100);

    tl.to(cardsContainerRef.current, {
      x: -moveDistance,
      duration: 2,
      ease: "power1.inOut",
    }, 1);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("scroll", handleUserScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#776b5d] overflow-hidden relative"
    >
      <div
        ref={headerRef}
        className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center px-4"
      >
        <h1
          style={{ fontFamily: 'pilow, display' }}
          className="text-[4rem] md:text-[6rem] font-bold text-[#b9b0a5]"
        >
          PROJECTS
        </h1>
        <p
          style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}
          className="text-lg text-[#b9b0a5] mt-6 max-w-2xl mx-auto"
        >
          A showcase of things I have worked on.
        </p>
      </div>

      <div
        ref={cardsContainerRef}
        className="absolute top-1/2 left-0 right-0 mx-auto flex space-x-12 px-8"
        style={{
          width: "fit-content",
          transform: "translateY(-50%)",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="project-card h-[22rem] w-[22rem] flex-shrink-0 bg-[#b9b0a5] rounded-2xl shadow-lg flex items-center justify-center"
          >
            <p className="text-[#776b5d] text-2xl font-semibold">
              Project {item}
            </p>
          </div>
        ))}
      </div>

      <div
        id="scroll-indicator"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#b9b0a5] flex flex-col items-center opacity-100"
      >
        <span
          style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}
          className="text-sm mb-1"
        >
          Scroll
        </span>
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
