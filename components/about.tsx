"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Register plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize Lenis with correct options
    const lenis = new Lenis({
      lerp: 0.07, // Smoother scrolling (lower = slower)
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Synchronize Lenis and ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Mark component as loaded
    setIsLoaded(true);

    // Clean up function
    return () => {
      lenis.destroy();
      
      // Kill any lingering ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle image loading
  const handleImageLoad = () => {
    if (imageRef.current) {
      // Ensure image is properly visible after load
      gsap.to(imageRef.current, { autoAlpha: 1, duration: 0.3 });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-start justify-start bg-[#776b5d] px-4 sm:px-8 md:px-20 pt-20 md:pt-32 pb-32 overflow-hidden"
      data-scroll-section
    >
      {/* Big ABOUT Title */}
      <motion.h1
        ref={headingRef}
        className="text-[10vw] leading-none font-bold text-[#f5eddf] mb-16 md:mb-32"
        style={{ fontFamily: "pilow, display" }}
        initial={{ opacity: 0, y: 50 }} // Initial position and opacity
        whileInView={{ opacity: 1, y: 0 }} // When in view, animate to full opacity and reset position
        transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      >
        ABOUT
      </motion.h1>

      {/* Content block */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
          <motion.img
            ref={imageRef}
            src="/AMBIENT.jpg"
            alt="Vedant About"
            className="w-full h-full object-cover rounded-2xl transform-gpu" // Use GPU for better performance
            style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
            initial={{ x: -150, opacity: 0 }} // Initial off-screen position and opacity
            whileInView={{ x: 0, opacity: 1 }} // Slide in to the center and fade in
            transition={{ duration: 1.5, ease: "easeOut" }} // Smooth transition
            onLoad={handleImageLoad}
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Heading */}
          <motion.h2
            className="text-[#f5eddf] text-[32px] sm:text-[40px] md:text-[48px] font-bold uppercase tracking-wider mb-12 md:mb-24 leading-tight"
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
            }}
            initial={{ opacity: 0, y: 50 }} // Initial position and opacity
            whileInView={{ opacity: 1, y: 0 }} // When in view, animate to full opacity and reset position
            transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
          >
            DEVELOPER // DESIGNER
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            ref={textRef}
            className="text-[#f5eddf] text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed tracking-wide"
            style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 70 }} // Initial position and opacity
            whileInView={{ opacity: 1, y: 0 }} // When in view, animate to full opacity and reset position
            transition={{ duration: 1.5, ease: "easeOut" }} // Smooth transition
          >
            Vedant is a creative developer passionate about blending technology with visual storytelling. With a focus on crafting smooth, immersive web experiences, his work transforms simple interactions into memorable digital journeys. Specializing in frontend development with Next.js and animation libraries, Vedant brings a modern and artistic touch to every project he undertakes.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
