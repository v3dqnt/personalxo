'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import 'boxicons';

interface HeroSectionProps {
  setBackgroundColor?: (color: string) => void;
}

export default function HeroSection({ setBackgroundColor }: HeroSectionProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [userHasStartedScrolling, setUserHasStartedScrolling] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useMotionValue(0);
  const [heroEnd, setHeroEnd] = useState(1000);

  useEffect(() => {
    if (heroRef.current) {
      setHeroEnd(heroRef.current.offsetTop + heroRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function update(time: number) {
      lenis.raf(time);
      scrollY.set(lenis.scroll);
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    return () => {
      lenis.destroy();
    };
  }, [scrollY]);

  const textY = useTransform(scrollY, [0, heroEnd - 200], [0, heroEnd / 2]);
  const textOpacity = useTransform(scrollY, [heroEnd - 300, heroEnd], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 10], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (!userHasStartedScrolling) {
        setUserHasStartedScrolling(true);
      }

      if (!titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isInView && hasScrolled) {
        setHasScrolled(false);
        setBackgroundColor?.('#B1B5A4');
      } else if (!isInView && !hasScrolled) {
        setHasScrolled(true);
        setBackgroundColor?.('#153439');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, setBackgroundColor, userHasStartedScrolling]);

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center h-screen transition-colors duration-500"
      style={{ backgroundColor: userHasStartedScrolling && hasScrolled ? '#153439' : '#B1B5A4' }}
    >
      {/* Hamburger Button */}
      <button
        onClick={() => setIsNavOpen(true)}
        className="absolute top-5 left-5 p-2 rounded-md flex items-center justify-center z-50"
      >
        <Menu size={32} color="#522417" />
      </button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            {/* Left Curtain */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="fixed top-0 left-0 w-1/2 h-full bg-[#522417] z-40"
            />

            {/* Right Curtain */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="fixed top-0 right-0 w-1/2 h-full bg-[#522417] z-40"
            />

            {/* Nav Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="fixed inset-0 flex flex-col items-center justify-center z-50 text-white px-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsNavOpen(false)}
                className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center"
              >
                <X size={32} />
              </button>

              {/* Nav Links */}
              <nav className="flex flex-col gap-6 items-center text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-sub)' }}>
                <a href="#projects" className="hover:underline text-[#b1b5a4]">Projects</a>
                <a href="#contact" className="hover:underline text-[#b1b5a4]">Contact</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive Title */}
      <motion.h1
        ref={titleRef}
        style={{
          y: textY,
          opacity: textOpacity,
          fontFamily: "var(--font-name)",
          color: userHasStartedScrolling && hasScrolled ? '#B1B5A4' : '#522417',
        }}
        className="font-extrabold tracking-wider drop-shadow-lg transition-colors duration-500 text-[clamp(3rem,10vw,14rem)] text-center px-4"
      >
        VEDANT
      </motion.h1>

      {/* Scroll Indicator */}
      <motion.div
        style={{ fontFamily: "var(--font-sub)", opacity: scrollIndicatorOpacity, color: '#522417' }}
        className="absolute bottom-10 flex flex-col items-center text-base sm:text-lg font-bold"
      >
        scroll
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}
