"use client";

import React, { FC, useEffect, useState } from "react";
import { Play } from "lucide-react";

const thumbnails = [
  "XqZsoesa55w", "kJQP7kiw5Fk", "JGwWNGJdvx8", "RgKAFK5djSk", "OPf0YbXqDm0",
  "9bZkp7q19f0", "ekr2nIex040", "kPa7bsKwL-c", "DyDfgMOUjCI", "4NRXx6U8ABQ",
  "Pkh8UtuejGw", "b1kbLWvqugk", "H5v3kku4y6Q", "UTHLKHL_whs", "G7KNmW9a75Y",
  "mVKuCbjFfIY", "KqFNbCcyFkk", "ck4RGeoHFko", "2W_VnvjeWK4", "OUS9mM8Xbbw",
  "xuCn8ux2gbs", "jHbyQ_AQP8c", "1lm1RzxI7vY", "tR7fDH5hdlY", "3WPsaWAKh8c",
  "QiWMnF3n03Y", "8t4L-vm8cKo", "EB-C9J_DdEA", "M6t47RI4bns", "Sje_626T4bA",
  "dQw4w9WgXcQ", "XHTrLYShBRQ", "LXb3EKWsInQ", "rib47coDWm8", "Ok4BqC5TO_c",
  "Pt-W2JHnqac", "gDjMZvYWUdo", "K0-GxoJ_Pcg", "GoW8Tf7hTGA", "hOfRN0KihOU",
  "e-P5IFTqB98", "QRt7LjqJ45k", "4lAGzNNELfE", "5xRiJICmF0U", "ysw0Slf9nj8",
  "kBu9nAOlRRE", "JfVOs4VSpmA", "TcMBFSGVi1c", "g4U4BQW9OEk", "mqqft2x_Aa4"
].map(id => ({
  id,
  width: 320 + Math.floor(Math.random() * 80) - 40,
  height: 180 + Math.floor(Math.random() * 45) - 22,
}));


const VideoThumbnail: FC<{
  videoId: string;
  width: number;
  height: number;
  className?: string;
}> = ({ videoId, width, height, className }) => {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-md bg-card shadow-lg ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
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
            <VideoThumbnail videoId={thumbnails[i % thumbnails.length].id} width={thumbnails[i % thumbnails.length].width} height={thumbnails[i % thumbnails.length].height} />
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
