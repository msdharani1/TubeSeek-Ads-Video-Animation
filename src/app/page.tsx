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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-8 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.3)_70%,_rgba(0,0,0,0)_100%)] rounded-lg animate-pulse-glow">
        <p className="text-3xl text-white text-center font-headline">
          "These days YouTube can feel overwhelming"
        </p>
      </div>
    </div>
  );
}
