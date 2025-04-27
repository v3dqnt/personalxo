'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';

const Example = () => {
  return (
    <div className="bg-[#6d6052]">
      <ScrollCarousel />
    </div>
  );
};

const ScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: isMobile ? undefined : undefined,
  });

  const { scrollXProgress } = useScroll({
    target: containerRef,
    container: isMobile ? containerRef : undefined,
    layoutEffect: false,
  });

  const x = useTransform(
    isMobile ? scrollXProgress : scrollYProgress,
    [0, 1],
    ['1%', '-95%']
  );

  // --- GSAP Animation on First Scroll ---
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (targetRef.current) {
      const ctx = gsap.context(() => {
        gsap.set(cardsRef.current, { x: '-100%', opacity: 0 });

        gsap.to(cardsRef.current, {
          x: '0%',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }, targetRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={targetRef}
      className={`relative ${isMobile ? 'h-screen' : 'h-[300vh]'} bg-[#6d6052]`}
    >
      <div
        ref={containerRef}
        className={`${isMobile ? 'overflow-x-auto' : 'sticky top-0'} flex h-screen items-center ${!isMobile && 'overflow-hidden'}`}
      >
        {/* Static Background Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-16 text-[#d2c7b8] opacity-10 font-['Anton',sans-serif]">
          <span className={`${isMobile ? 'text-8xl' : 'text-[30rem]'} leading-[0.8] font-bold uppercase`}>PHOTOGRAPHY</span>
          <span className={`${isMobile ? 'text-8xl' : 'text-[30rem]'} leading-[0.8] font-bold uppercase`}>PHOTOGRAPHY</span>
        </div>

        {/* Moving Content */}
        <motion.div
          style={isMobile ? {} : { x }}
          className={`flex gap-4 relative ${isMobile ? 'w-[calc(450px*8)]' : ''}`}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="flex-shrink-0"
            >
              <Card card={card} priority={index === 0} isMobile={isMobile} />
            </div>
          ))}

          {/* Thank you section */}
          <motion.div className={`flex flex-col md:flex-row items-center justify-center ${isMobile ? 'min-w-[300px]' : 'min-w-[450px]'} ml-8 md:ml-24`}>
            <p className="text-[#f5ecdd] text-xl md:text-4xl font-semibold">© Vedant 2025</p>
            <p className="text-[#f5ecdd] text-xl md:text-4xl font-semibold mt-2 md:mt-0 md:ml-12">Thank you for your patience</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({
  card,
  priority = false,
  isMobile = false,
}: {
  card: CardType;
  priority?: boolean;
  isMobile?: boolean;
}) => {
  return (
    <div className={`group relative ${isMobile ? 'h-[300px] w-[300px]' : 'h-[450px] w-[450px]'} overflow-hidden bg-[#908272] rounded-lg`}>
      <Image
        src={card.url}
        alt={card.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 450px"
        quality={100}
        placeholder="blur"
        blurDataURL="/placeholder.png"
        priority={priority}
      />
    </div>
  );
};

export default Example;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  { url: '/lamppost.jpg', title: 'Title 1', id: 1 },
  { url: '/miami.jpg', title: 'Title 2', id: 2 },
  { url: '/flower.jpg', title: 'Title 3', id: 3 },
  { url: '/grass.jpg', title: 'Title 4', id: 4 },
  { url: '/sunset.jpg', title: 'Title 5', id: 5 },
  { url: '/selfie.jpg', title: 'Title 6', id: 6 },
  { url: '/shootingstar.jpg', title: 'Title 7', id: 7 },
];
