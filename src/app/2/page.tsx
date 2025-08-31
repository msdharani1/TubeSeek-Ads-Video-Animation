
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const video1 = "https://img.youtube.com/vi/XqZsoesa55w/maxresdefault.jpg";
const video2 = "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg";
const adImage = "https://picsum.photos/1024/600?random=3";

const scenes = [
  { type: "video", src: video1, duration: 3000, hint: "video content" },
  { type: "ad", src: adImage, duration: 2000, hint: "advertisement product" },
  { type: "video", src: video2, duration: 3000, hint: "nature documentary" },
];

export default function AnimationPage() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSceneIndex((prevIndex) => (prevIndex + 1) % scenes.length);
    }, scenes[currentSceneIndex].duration);

    return () => clearInterval(interval);
  }, [currentSceneIndex]);

  const currentScene = scenes[currentSceneIndex];

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-8">
      <div className="relative w-[80vw] max-w-[1200px] aspect-video">
        <div className="relative w-full h-full rounded-xl border-8 border-gray-800 bg-black overflow-hidden shadow-2xl">
          <div className="relative h-full w-full">
            <Image
              src={currentScene.src}
              alt={currentScene.type}
              layout="fill"
              objectFit="cover"
              data-ai-hint={currentScene.hint}
              className="transition-opacity duration-500 ease-in-out"
              key={currentSceneIndex}
            />
            {currentScene.type === "ad" && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                Ad will end in {scenes[1].duration/1000}s
              </div>
            )}
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center text-white">
                    <Play className="h-8 w-8 text-white/80 mr-4 cursor-pointer" fill="white" />
                    <div className="w-full bg-gray-500/50 rounded-full h-1">
                        <div className="bg-red-600 h-1 rounded-full" style={{width: '30%'}}></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
