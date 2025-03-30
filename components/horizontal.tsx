'use client'
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]); // Horizontal movement for images & text

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#153439]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Static Photography Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-16 text-[#0c2122] opacity-10 font-['Anton', sans-serif]">
          <span className="text-[30rem] leading-[0.8] font-bold uppercase">PHOTOGRAPHY</span>
          <span className="text-[30rem] leading-[0.8] font-bold uppercase">PHOTOGRAPHY</span>
        </div>

        {/* Moving Content (Images + Copyright Text) */}
        <motion.div style={{ x }} className="flex gap-4 relative">
          {/* Image Cards */}
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}

          {/* Copyright & Thank You Text (Moves Horizontally) */}
          <motion.div className="flex items-center justify-center min-w-[450px] ml-24">
            <p className="text-[#b1b5a4] text-4xl font-semibold">© Vedant 2025</p>
            <p className="text-[#b1b5a4] text-4xl font-semibold ml-12">Thank you for your patience</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-lg"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
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
  { url: "/lamppost.jpg", title: "Title 1", id: 1 },
  { url: "/miami.jpg", title: "Title 2", id: 2 },
  { url: "/flower.jpg", title: "Title 3", id: 3 },
  { url: "/grass.jpg", title: "Title 4", id: 4 },
  { url: "/sunset.jpg", title: "Title 5", id: 5 },
  { url: "/selfie.jpg", title: "Title 6", id: 6 },
  { url: "/shootingstar.jpg", title: "Title 7", id: 7 },
];
