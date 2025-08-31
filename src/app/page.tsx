"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Scene from "@/components/scene";
import AmbientSound from "@/components/ambient-sound";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    // Set initial theme based on state
    if (isNight) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isNight]);

  const toggleTheme = (checked: boolean) => {
    setIsNight(checked);
  };

  const timeOfDay = isNight ? "night" : "day";

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-1000 ease-in-out">
      <header className="absolute top-4 right-4 z-50 flex items-center space-x-2 rounded-full border bg-card/50 p-2 backdrop-blur-sm">
        <Label htmlFor="theme-toggle" className="cursor-pointer">
          <Sun className="h-5 w-5 text-yellow-500" />
        </Label>
        <Switch
          id="theme-toggle"
          checked={isNight}
          onCheckedChange={toggleTheme}
          aria-label="Toggle between day and night mode"
        />
        <Label htmlFor="theme-toggle" className="cursor-pointer">
          <Moon className="h-5 w-5 text-slate-400" />
        </Label>
      </header>
      
      <main className="h-full w-full">
        <Scene timeOfDay={timeOfDay} />
      </main>

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
        <AmbientSound timeOfDay={timeOfDay} />
      </footer>
    </div>
  );
}
