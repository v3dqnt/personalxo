'use client';

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image"; // Import Next.js Image

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const lenis = new Lenis({
      lerp: 0.07,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        ABOUT
      </motion.h1>

      {/* Content Block */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full">
        {/* Left: Optimized Image */}
        <motion.div
          ref={imageContainerRef}
          className="w-full md:w-1/2 overflow-hidden rounded-2xl relative"
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/AMBIENT.jpg"
            alt="Vedant About"
            className="rounded-2xl object-cover w-full h-full"
            fill
            quality={85}
            priority={false}
            placeholder="blur"
            blurDataURL="/placeholder.png"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.h2
            className="text-[#f5eddf] text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-wider mb-12 md:mb-24 leading-tight"
            style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Developer &<br />
            Designer
          </motion.h2>

          <motion.p
            ref={textRef}
            className="text-[#f5eddf] text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed tracking-wide"
            style={{ fontFamily: "'Satoshi', 'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Vedant is a creative developer passionate about blending technology with visual storytelling. With a focus on crafting smooth, immersive web experiences, his work transforms simple interactions into memorable digital journeys. Specializing in frontend development with Next.js and animation libraries, Vedant brings a modern and artistic touch to every project he undertakes.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
