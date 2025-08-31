"use client";

import React, { FC, useEffect, useState } from "react";
import { Play } from "lucide-react";

const thumbnails = [
  { width: 320, height: 180, hint: "nature" },
  { width: 240, height: 135, hint: "city" },
  { width: 400, height: 225, hint: "space" },
  { width: 280, height: 158, hint: "food" },
  { width: 360, height: 203, hint: "animals" },
  { width: 300, height: 169, hint: "sports" },
  { width: 340, height: 191, hint: "music" },
  { width: 260, height: 146, hint: "gaming" },
  { width: 380, height: 214, hint: "fashion" },
  { width: 220, height: 124, hint: "travel" },
  { width: 320, height: 180, hint: "tech" },
  { width: 240, height: 135, hint: "science" },
  { width: 400, height: 225, hint: "history" },
  { width: 280, height: 158, hint: "art" },
  { width: 360, height: 203, hint: "comedy" },
];

const VideoThumbnail: FC<{
  width: number;
  height: number;
  hint: string;
  className?: string;
}> = ({ width, height, hint, className }) => {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-md bg-card shadow-lg ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <img
        src={`https://picsum.photos/${width}/${height}`}
        data-ai-hint={hint}
        alt="Video thumbnail"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Play className="h-12 w-12 text-white/80" fill="white" />
      </div>
    </div>
  );
};

const FloatingElement: FC<{ children: React.ReactNode; index: number }> = ({
  children,
  index,
}) => {
  const [position, setPosition] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });

  const animationDuration = 20 + Math.random() * 20; // 20s to 40s
  const animationDelay = Math.random() * -40; // Start at different times

  useEffect(() => {
    // This is to avoid hydration errors since initial random values on server and client can differ.
    setPosition({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    });
  }, []);

  return (
    <div
      className="absolute"
      style={{
        ...position,
        animation: `float ${animationDuration}s ${animationDelay}s infinite alternate ease-in-out`,
        transform: `scale(${0.8 + Math.random() * 0.4})`, // 0.8 to 1.2 scale
      }}
    >
      {children}
    </div>
  );
};

export default function Scene() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        {thumbnails.map((thumb, i) => (
          <FloatingElement key={`bg-${i}`} index={i}>
            <VideoThumbnail {...thumb} />
          </FloatingElement>
        ))}
      </div>
      <div className="absolute inset-0 z-10">
        {thumbnails.map((thumb, i) => (
          <FloatingElement key={`fg-${i}`} index={i + thumbnails.length}>
            <VideoThumbnail {...thumb} />
          </FloatingElement>
        ))}
      </div>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(var(--scale-start, 1));
          }
          100% {
            transform: translate(
                calc(${Math.random() * 200 - 100}vw),
                calc(${Math.random() * 200 - 100}vh)
              )
              rotate(${Math.random() * 720 - 360}deg)
              scale(var(--scale-end, 1.2));
          }
        }
      `}</style>
    </div>
  );
}
