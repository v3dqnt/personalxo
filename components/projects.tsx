"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".project-card"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#776b5d] flex flex-col items-center justify-center px-8 py-20"
    >
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[4rem] md:text-[6rem] font-bold text-[#b9b0a5] text-center"
      >
        PROJECTS
      </motion.h1>

      <p className="text-lg text-[#b9b0a5] mt-6 mb-16 max-w-2xl text-center">
        A collection of my finest creative work, crafted with passion and precision.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="project-card h-[22rem] w-[22rem] bg-[#b9b0a5] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-[#776b5d] text-2xl font-semibold">Project {item}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
