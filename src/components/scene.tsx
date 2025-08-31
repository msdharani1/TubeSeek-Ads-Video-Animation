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
  { width: 320, height: 180, hint: "vlog" },
  { width: 240, height: 135, hint: "diy" },
  { width: 400, height: 225, hint: "education" },
  { width: 280, height: 158, hint: "documentary" },
  { width: 360, height: 203, hint: "unbox" },
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
  const [initialState, setInitialState] = useState({
    top: '50%',
    left: '50%',
    scale: 1,
  });

  const animationDuration = 5 + Math.random() * 5; // 5s to 10s
  const animationDelay = Math.random() * -10; // Start at different times

  useEffect(() => {
    // This is to avoid hydration errors since initial random values on server and client can differ.
    setInitialState({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      scale: 0.5 + Math.random() * 1, // 0.5 to 1.5 scale
    });
  }, []);

  return (
    <div
      className="absolute"
      style={{
        top: initialState.top,
        left: initialState.left,
        '--scale-start': initialState.scale,
        '--scale-end': initialState.scale * (Math.random() > 0.5 ? 1.5 : 0.5),
        animation: `float-${index % 4} ${animationDuration}s ${animationDelay}s infinite linear`,
      }}
    >
      {children}
    </div>
  );
};

export default function Scene() {
  const numThumbnails = thumbnails.length * 2;
  
  const generateKeyframes = (name: string) => {
    const keyframes: string[] = ['0% { transform: translate(0, 0) rotate(0deg) scale(var(--scale-start)); }'];
    for (let i = 1; i <= 4; i++) {
      const x = (Math.random() - 0.5) * 200; // -100 to 100
      const y = (Math.random() - 0.5) * 200; // -100 to 100
      const rot = (Math.random() - 0.5) * 720; // -360 to 360
      const scale = `var(--scale-${i % 2 === 0 ? 'start' : 'end'})`;
      keyframes.push(`${i * 20}% { transform: translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale}); }`);
    }
    keyframes.push('100% { transform: translate(0, 0) rotate(0deg) scale(var(--scale-start)); }');
    return `@keyframes ${name} { ${keyframes.join(' ')} }`;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {Array.from({ length: numThumbnails }).map((_, i) => (
          <FloatingElement key={`thumb-${i}`} index={i}>
            <VideoThumbnail {...thumbnails[i % thumbnails.length]} />
          </FloatingElement>
        ))}
      </div>
      <style jsx global>{`
        ${generateKeyframes('float-0')}
        ${generateKeyframes('float-1')}
        ${generateKeyframes('float-2')}
        ${generateKeyframes('float-3')}
      `}</style>
    </div>
  );
}
