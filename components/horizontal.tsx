'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <ScrollCarousel />
    </div>
  );
};

const ScrollCarousel = () => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vertical scroll for desktop
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: isMobile ? undefined : undefined,
  });

  // Horizontal scroll for mobile
  const { scrollXProgress } = useScroll({
    target: containerRef,
    container: isMobile ? containerRef : undefined,
    layoutEffect: false,
  });

  // Transform based on device type
  const x = useTransform(
    isMobile ? scrollXProgress : scrollYProgress, 
    [0, 1], 
    ['1%', '-95%']
  );

  return (
    <section 
      ref={targetRef} 
      className={`relative ${isMobile ? 'h-screen' : 'h-[300vh]'} bg-[#153439]`}
    >
      <div 
        ref={containerRef}
        className={`${isMobile ? 'overflow-x-auto' : 'sticky top-0'} flex h-screen items-center ${!isMobile && 'overflow-hidden'}`}
      >
        {/* Static Photography Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-16 text-[#0c2122] opacity-10 font-['Anton',sans-serif]">
          <span className={`${isMobile ? 'text-8xl' : 'text-[30rem]'} leading-[0.8] font-bold uppercase`}>PHOTOGRAPHY</span>
          <span className={`${isMobile ? 'text-8xl' : 'text-[30rem]'} leading-[0.8] font-bold uppercase`}>PHOTOGRAPHY</span>
        </div>

        {/* Moving Content */}
        <motion.div 
          style={isMobile ? {} : { x }} 
          className={`flex gap-4 relative ${isMobile ? 'w-[calc(450px*8)]' : ''}`}
        >
          {cards.map((card, index) => (
            <Card card={card} key={card.id} priority={index === 0} isMobile={isMobile} />
          ))}

          <motion.div className={`flex flex-col md:flex-row items-center justify-center ${isMobile ? 'min-w-[300px]' : 'min-w-[450px]'} ml-8 md:ml-24`}>
            <p className="text-[#b1b5a4] text-xl md:text-4xl font-semibold">© Vedant 2025</p>
            <p className="text-[#b1b5a4] text-xl md:text-4xl font-semibold mt-2 md:mt-0 md:ml-12">Thank you for your patience</p>
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
    <div className={`group relative ${isMobile ? 'h-[300px] w-[300px]' : 'h-[450px] w-[450px]'} overflow-hidden bg-neutral-200 rounded-lg`}>
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