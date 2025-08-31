"use client";

import React, { useState, useRef, useEffect, type FC } from "react";

const InteractiveElement: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 820);
  };

  return (
    <div
      onClick={handleClick}
      className={`${className} cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-100 ${
        isClicked ? "animate-shake" : ""
      }`}
    >
      {children}
    </div>
  );
};

const Sky: FC<{ timeOfDay: "day" | "night" }> = ({ timeOfDay }) => (
  <div className="absolute inset-0">
    <div
      className={`absolute transition-all duration-1000 ease-in-out ${
        timeOfDay === "day"
          ? "bg-yellow-200/50 shadow-[0_0_150px_70px_rgba(253,249,156,0.9)]"
          : "bg-indigo-900/20 shadow-[0_0_150px_70px_rgba(239,246,255,0.7)]"
      } top-[15%] left-1/4 h-24 w-24 rounded-full`}
    />
    {timeOfDay === "night" && (
      <>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-slate-200"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 4}s infinite alternate`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </>
    )}
  </div>
);

const Hills: FC<{ className: string, fill: string }> = ({ className, fill }) => (
    <svg className={`absolute bottom-0 w-full ${className}`} viewBox="0 0 1440 320">
      <path fill={fill} fillOpacity="1" d="M0,224L80,208C160,192,320,160,480,170.7C640,181,800,235,960,240C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
    </svg>
)

export default function Scene({ timeOfDay }: { timeOfDay: "day" | "night" }) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden relative"
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{ transform: `translateY(${scrollTop * 0.1}px)` }}
      >
        <Sky timeOfDay={timeOfDay} />
      </div>

      <div
        className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
        style={{ transform: `translateY(${scrollTop * 0.25}px)` }}
      >
        <Hills className="h-2/3" fill={timeOfDay === 'day' ? '#809A6F' : '#2C3E50'} />
      </div>

      <div
        className="absolute inset-0 z-20 transition-opacity duration-1000 ease-in-out"
        style={{ transform: `translateY(${scrollTop * 0.4}px)` }}
      >
         <Hills className="h-3/4" fill={timeOfDay === 'day' ? '#556B2F' : '#1D2A35'} />

         <InteractiveElement className="absolute bottom-[28%] left-[60%] w-24">
            <svg viewBox="0 0 100 150">
                <rect x="45" y="70" width="10" height="80" fill={timeOfDay === 'day' ? '#5C4033' : '#3D2B1F'} />
                <circle cx="50" cy="50" r="40" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
            </svg>
         </InteractiveElement>

         <InteractiveElement className="absolute bottom-[25%] left-[15%] w-32">
            <svg viewBox="0 0 100 150">
                <rect x="42" y="60" width="16" height="90" fill={timeOfDay === 'day' ? '#5C4033' : '#3D2B1F'} />
                <circle cx="50" cy="40" r="40" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
            </svg>
         </InteractiveElement>

      </div>
      
      <div
        className="absolute inset-0 z-30"
        style={{ transform: `translateY(${scrollTop * 0.7}px)` }}
      >
         <InteractiveElement className="absolute bottom-[5%] -left-[5%] w-64">
            <svg viewBox="0 0 100 150">
                <rect x="40" y="50" width="20" height="100" fill={timeOfDay === 'day' ? '#5C4033' : '#3D2B1F'}/>
                <circle cx="50" cy="30" r="30" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
                <circle cx="30" cy="50" r="25" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
                <circle cx="70" cy="50" r="25" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
            </svg>
         </InteractiveElement>

         <InteractiveElement className="absolute bottom-[8%] right-[20%] w-40">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill={timeOfDay === 'day' ? '#6B8E23' : '#4A5D23'} />
                <circle cx="30" cy="60" r="30" fill={timeOfDay === 'day' ? '#6B8E23' : '#4A5D23'} />
                <circle cx="70" cy="60" r="30" fill={timeOfDay === 'day' ? '#6B8E23' : '#4A5D23'} />
            </svg>
         </InteractiveElement>
      </div>

      <div
        className="absolute inset-0 z-40"
        style={{ transform: `translateY(${scrollTop * 1}px)` }}
      >
        <div className={`absolute bottom-0 w-full h-1/4 bg-gradient-to-t ${timeOfDay === 'day' ? 'from-[#6B8E23]' : 'from-[#1A250F]' } to-transparent`} />
         <InteractiveElement className="absolute bottom-0 -right-[5%] w-72">
            <svg viewBox="0 0 100 150">
                <rect x="40" y="50" width="20" height="100" fill={timeOfDay === 'day' ? '#5C4033' : '#3D2B1F'}/>
                <circle cx="50" cy="30" r="30" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
                <circle cx="30" cy="50" r="25" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
                <circle cx="70" cy="50" r="25" fill={timeOfDay === 'day' ? 'hsl(var(--primary))' : '#2E4D39'} />
            </svg>
         </InteractiveElement>
         <InteractiveElement className="absolute bottom-0 left-[25%] w-48">
             <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill={timeOfDay === 'day' ? '#6B8E23' : '#4A5D23'} />
                <circle cx="25" cy="55" r="25" fill={timeOfDay === 'day' ? '#6B8E23' : '#4A5D23'} />
                <circle cx="75" cy="55" r="25" fill={timeOfDay === 'day' ? '#6B8E23' : '#4A5D23'} />
             </svg>
         </InteractiveElement>
      </div>

      <div className="h-[200vh] invisible" />
    </div>
  );
}
