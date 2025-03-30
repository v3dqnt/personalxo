'use client'

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Use dynamic imports with ssr: false for components that use browser APIs
const Hero = dynamic(() => import("@/components/hero"), { ssr: false });
const About = dynamic(() => import("@/components/about"), { ssr: false });
const Example = dynamic(() => import("@/components/horizontal"), { ssr: false });

export default function Home() {
  // Use a ref to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#f3f4f6");

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Early return during SSR to prevent hydration issues
  if (!mounted) {
    return (
      <main 
        style={{ backgroundColor: "#f3f4f6" }}
        className="w-full min-h-screen"
      />
    );
  }

  return (
    <main
      style={{ backgroundColor, transition: "background-color 0.8s ease-in-out" }}
      className="w-full min-h-screen"
    >
      <Hero setBackgroundColor={setBackgroundColor} />
      <About setBackgroundColor={setBackgroundColor} />
      <Example />
    </main>
  );
}