'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import 'boxicons';

export default function HeroSection() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const [heroEnd, setHeroEnd] = useState(1000);

  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      setHeroEnd(el.offsetTop + el.clientHeight);
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
    return () => lenis.destroy();
  }, [scrollY]);

  const textY = useTransform(scrollY, [0, heroEnd - 200], [0, heroEnd / 2]);
  const textOpacity = useTransform(scrollY, [heroEnd - 300, heroEnd], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 10], [1, 0]);

  const wave1Y = useTransform(scrollY, [0, heroEnd], [0, 100]);
  const wave2Y = useTransform(scrollY, [0, heroEnd], [0, 50]);

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center h-screen transition-colors duration-500 overflow-hidden bg-[#EBE3D5]"
    >
      {/* Hamburger Button */}
      <button
        onClick={() => setIsNavOpen(true)}
        className="absolute top-5 left-5 p-2 rounded-md flex items-center justify-center z-50"
      >
        <Menu size={32} color="#776B5D" />
      </button>

      {/* Hero Title */}
      <motion.h1
        style={{
          y: textY,
          opacity: textOpacity,
          fontFamily: 'pilow, display',
          color: '#776B5D',
        }}
        className="font-extrabold tracking-wider drop-shadow-lg transition-colors duration-500 text-[clamp(3rem,10vw,14rem)] text-center px-4 relative z-10"
      >
        VEDANT
      </motion.h1>

      {/* Scroll Indicator */}
      <motion.div
        style={{ fontFamily: 'var(--font-sub)', opacity: scrollIndicatorOpacity, color: '#776B5D' }}
        className="absolute bottom-10 flex flex-col items-center text-base sm:text-lg font-bold z-10"
      >
        scroll
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* Static Waves (visible only when menu is closed) */}
      {!isNavOpen && (
        <>
          <motion.div
            style={{ y: wave2Y }}
            className="absolute bottom-0 left-0 w-full h-[180px] sm:h-[240px] md:h-[300px] z-0 pointer-events-none"
          >
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#B0A695"
                fillOpacity="1"
                d="M0,224L60,192C120,160,240,96,360,101.3C480,107,600,181,720,181.3C840,181,960,107,1080,90.7C1200,75,1320,117,1380,138.7L1440,160V320H0Z"
              />
            </svg>
          </motion.div>

          <motion.div
            style={{ y: wave1Y }}
            className="absolute bottom-0 left-0 w-full h-[200px] sm:h-[280px] md:h-[360px] z-10 pointer-events-none"
          >
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="#776B5D"
                fillOpacity="1"
                d="M0,160L80,144C160,128,320,96,480,106.7C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192V320H0Z"
              />
            </svg>
          </motion.div>
        </>
      )}

      {/* Navigation Menu with covering waves */}
      <AnimatePresence mode="wait">
        {isNavOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
              onClick={() => setIsNavOpen(false)}
            />

            {/* Back Wave (full screen) */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 flex items-end justify-center z-40 pointer-events-none"
            >
              <svg
                className="w-full h-screen absolute bottom-0"
                viewBox="0 0 1440 1000"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ d: 'M0,800L60,750C120,700,240,600,360,550C480,500,600,500,720,550C840,600,960,700,1080,750C1200,800,1320,800,1380,800L1440,800L1440,1000L0,1000Z' }}
                  animate={{ d: 'M0,0L60,0C120,0,240,0,360,0C480,0,600,0,720,0C840,0,960,0,1080,0C1200,0,1320,0,1380,0L1440,0L1440,1000L0,1000Z' }}
                  exit={{ d: 'M0,800L60,750C120,700,240,600,360,550C480,500,600,500,720,550C840,600,960,700,1080,750C1200,800,1320,800,1380,800L1440,800L1440,1000L0,1000Z' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  fill="#B0A695"
                />
              </svg>
            </motion.div>

            {/* Front Wave (full screen) */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="fixed inset-0 flex items-end justify-center z-41 pointer-events-none"
            >
              <svg
                className="w-full h-screen absolute bottom-0"
                viewBox="0 0 1440 1000"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ d: 'M0,700L80,700C160,700,320,700,480,650C640,600,800,500,960,450C1120,400,1280,400,1360,400L1440,400L1440,1000L0,1000Z' }}
                  animate={{ d: 'M0,0L80,0C160,0,320,0,480,0C640,0,800,0,960,0C1120,0,1280,0,1360,0L1440,0L1440,1000L0,1000Z' }}
                  exit={{ d: 'M0,700L80,700C160,700,320,700,480,650C640,600,800,500,960,450C1120,400,1280,400,1360,400L1440,400L1440,1000L0,1000Z' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  fill="#776B5D"
                />
              </svg>
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="fixed inset-0 flex flex-col items-center justify-center z-50 text-white px-4"
            >
              <button
                onClick={() => setIsNavOpen(false)}
                className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center"
              >
                <X size={32} />
              </button>
              <nav
                className="flex flex-col gap-6 items-center text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: 'var(--font-sub)' }}
              >
                <motion.a
                  href="#projects"
                  className="hover:underline text-[#F3EEEA]"
                >
                  Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  className="hover:underline text-[#F3EEEA]"
                >
                  Contact
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
