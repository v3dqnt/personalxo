'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';

export default function Splash() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  // Smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Splash screen timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
      router.push('/');
    }, 4000); // Show splash for 4s
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#153439] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Faster fade-out
        >
          {/* This outer div ensures the SVG is properly centered in the viewport */}
          <div className="w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 1200 300"
              preserveAspectRatio="xMidYMid meet"
              className="w-[95%] max-w-[800px]"
            >
              <text
                x="600"
                y="150"
                textAnchor="middle"
                dominantBaseline="central"
                className="handwriting-text"
              >
                VEDANT
              </text>
            </svg>
          </div>

          <style jsx>{`
            .handwriting-text {
              font-family: 'Pilow', display;
              font-size: 160px;
              fill: none;
              stroke: white;
              stroke-width: 2;
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: draw 4s ease forwards;
            }

            @media (max-width: 768px) {
              .handwriting-text {
                font-size: 100px;
              }
            }

            @media (max-width: 480px) {
              .handwriting-text {
                font-size: 70px;
              }
            }

            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}