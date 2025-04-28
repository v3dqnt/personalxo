'use client'

import dynamic from "next/dynamic";

// Use dynamic imports with ssr: false for components that use browser APIs
const Hero = dynamic(() => import("@/components/hero"), { ssr: false });
const About = dynamic(() => import("@/components/about"), { ssr: false });
const Example = dynamic(() => import("@/components/horizontal"), { ssr: false });
const Splash = dynamic(() => import("@/components/Splash"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] transition-colors duration-700">
      <Splash />
      <Hero />
      <About />
      <Example />
    </main>
  );
}
