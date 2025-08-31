"use client";

import React, { FC, useEffect, useState } from "react";
import { Play } from "lucide-react";

const thumbnails = [
  "https://img.youtube.com/vi/XqZsoesa55w/maxresdefault.jpg", "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg", "https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg", "https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg", "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg", "https://img.youtube.com/vi/ekr2nIex040/maxresdefault.jpg", "https://img.youtube.com/vi/kPa7bsKwL-c/maxresdefault.jpg", "https://img.youtube.com/vi/DyDfgMOUjCI/maxresdefault.jpg", "https://img.youtube.com/vi/4NRXx6U8ABQ/maxresdefault.jpg", "https://img.youtube.com/vi/Pkh8UtuejGw/maxresdefault.jpg", "https://img.youtube.com/vi/H5v3kku4y6Q/maxresdefault.jpg", "https://img.youtube.com/vi/G7KNmW9a75Y/maxresdefault.jpg", "https://img.youtube.com/vi/mVKuCbjFfIY/maxresdefault.jpg", "https://img.youtube.com/vi/KqFNbCcyFkk/maxresdefault.jpg", "https://img.youtube.com/vi/ck4RGeoHFko/maxresdefault.jpg", "https://img.youtube.com/vi/OUS9mM8Xbbw/maxresdefault.jpg", "https://img.youtube.com/vi/xuCn8ux2gbs/maxresdefault.jpg", "https://img.youtube.com/vi/jHbyQ_AQP8c/maxresdefault.jpg", "https://img.youtube.com/vi/M6t47RI4bns/maxresdefault.jpg", "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", "https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg", "https://img.youtube.com/vi/gDjMZvYWUdo/maxresdefault.jpg", "https://img.youtube.com/vi/K0-GxoJ_Pcg/maxresdefault.jpg", "https://img.youtube.com/vi/GoW8Tf7hTGA/maxresdefault.jpg", "https://img.youtube.com/vi/e-P5IFTqB98/maxresdefault.jpg", "https://img.youtube.com/vi/QRt7LjqJ45k/maxresdefault.jpg", "https://img.youtube.com/vi/4lAGzNNELfE/maxresdefault.jpg", "https://img.youtube.com/vi/5xRiJICmF0U/maxresdefault.jpg", "https://img.youtube.com/vi/JfVOs4VSpmA/maxresdefault.jpg", "https://img.youtube.com/vi/TcMBFSGVi1c/maxresdefault.jpg", "https://img.youtube.com/vi/g4U4BQW9OEk/maxresdefault.jpg", "https://img.youtube.com/vi/mqqft2x_Aa4/maxresdefault.jpg", "https://img.youtube.com/vi/lI_o7yhH5-o/maxresdefault.jpg", "https://img.youtube.com/vi/U0SBPdDtqpA/maxresdefault.jpg", "https://img.youtube.com/vi/Eyl4sQFkQiM/maxresdefault.jpg", "https://img.youtube.com/vi/CrhuPQeNp7c/maxresdefault.jpg", "https://img.youtube.com/vi/vW0UWP7C1I8/maxresdefault.jpg", "https://img.youtube.com/vi/Llss1aRo8tw/maxresdefault.jpg", "https://img.youtube.com/vi/o9LMsBAhwkk/maxresdefault.jpg", "https://img.youtube.com/vi/wSCKINuweRM/maxresdefault.jpg", "https://img.youtube.com/vi/nFNUwwdo7vs/maxresdefault.jpg"
].map(url => ({
  url,
  width: 320 + Math.floor(Math.random() * 80) - 40,
  height: 180 + Math.floor(Math.random() * 45) - 22,
}));


const VideoThumbnail: FC<{
  imageUrl: string;
  width: number;
  height: number;
  className?: string;
}> = ({ imageUrl, width, height, className }) => {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-md bg-card shadow-lg ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <img
        src={imageUrl}
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
  });

  const animationDuration = 2 + Math.random() * 2; // 2s to 4s
  const animationDelay = Math.random() * 4; // Start at different times

  useEffect(() => {
    // This is to avoid hydration errors since initial random values on server and client can differ.
    setInitialState({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    });
  }, []);

  return (
    <div
      className="absolute"
      style={{
        top: initialState.top,
        left: initialState.left,
        animation: `pop-in-out ${animationDuration}s ${animationDelay}s infinite ease-in-out`,
        '--z-index-start': Math.floor(Math.random() * 10),
        '--z-index-end': Math.floor(Math.random() * 20) + 10,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default function Scene() {
  const numThumbnails = thumbnails.length * 2;
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {Array.from({ length: numThumbnails }).map((_, i) => (
          <FloatingElement key={`thumb-${i}`} index={i}>
            <VideoThumbnail imageUrl={thumbnails[i % thumbnails.length].url} width={thumbnails[i % thumbnails.length].width} height={thumbnails[i % thumbnails.length].height} />
          </FloatingElement>
        ))}
      </div>
      <style jsx global>{`
        @keyframes pop-in-out {
          0% {
            transform: scale(0);
            opacity: 0;
            z-index: var(--z-index-start);
          }
          25%, 50% {
            transform: scale(1);
            opacity: 1;
            z-index: var(--z-index-end);
          }
          75%, 100% {
            transform: scale(0);
            opacity: 0;
            z-index: var(--z-index-start);
          }
        }
      `}</style>
    </div>
  );
}
