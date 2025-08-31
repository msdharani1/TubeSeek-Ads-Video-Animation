"use client";

import { useEffect, useState } from "react";
import Scene from "@/components/scene";

export default function Home() {
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    // Set initial theme based on state
    if (isNight) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isNight]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-1000 ease-in-out">
      <main className="h-full w-full">
        <Scene />
      </main>
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-50 overflow-hidden whitespace-nowrap bg-primary/80 py-4">
        <div className="inline-block animate-marquee">
          <p className="text-4xl text-center font-bold text-primary-foreground/90 px-8">
            "These days YouTube can feel overwhelming"
          </p>
        </div>
        <div className="inline-block animate-marquee">
          <p className="text-4xl text-center font-bold text-primary-foreground/90 px-8">
            "These days YouTube can feel overwhelming"
          </p>
        </div>
      </div>
    </div>
  );
}
