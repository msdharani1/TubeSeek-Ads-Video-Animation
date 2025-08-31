
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);


export default function AutoplayPage() {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const nextVideoOverlayRef = useRef<HTMLDivElement>(null);
  const countdownBarRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Initial setup
    gsap.set(phoneContainerRef.current, { opacity: 0, scale: 0.8, y: 100, rotationY: -45 });
    gsap.set(videoPlayerRef.current, { opacity: 0 });
    gsap.set(recommendationsRef.current, { opacity: 0 });
    gsap.set(nextVideoOverlayRef.current, { opacity: 0, y: 20 });
    gsap.set(countdownBarRef.current, { width: '0%' });
    gsap.set(textContentRef.current, { opacity: 0, x: 100 });

    // Animation sequence
    tl.to(phoneContainerRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationY: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
    })
    .to(textContentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.8")
    .to([videoPlayerRef.current, recommendationsRef.current], {
      opacity: 1,
      duration: 0.5,
    }, "-=0.5")
    .to(nextVideoOverlayRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, ">2")
    .to(countdownBarRef.current, {
        width: '100%',
        duration: 5,
        ease: 'linear'
    }, "<")
    .to(nextVideoOverlayRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3
    }, ">")
    .to(videoPlayerRef.current, {
        scrambleText: {
            text: videoTitles[1],
            chars: "abcdefghijklmnopqrstuvwxyz",
            revealDelay: 0.5,
            speed: 0.3
        }
    })
    .to(phoneContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        rotationY: 45,
        duration: 1,
        ease: 'power3.in'
    }, ">2");
    
    return () => {
      tl.kill();
    }

  }, []);

  const videoTitles = [
    "React State Management in 2024",
    "The Ultimate Guide to Next.js 14",
    "CSS Grid vs Flexbox",
    "Building a REST API with Node.js",
    "AI in Web Development",
    "Cybersecurity Fundamentals",
    "Introduction to Docker"
  ];

  return (
    <>
    <style jsx global>{`
      :root {
          --bg-color: #020817;
          --logo-primary: #e74c3c;
          --logo-secondary: #c0392b;
      }
      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(135deg, var(--bg-color) 0%, #0f172a 50%, var(--bg-color) 100%);
      }
      .phone-container {
        perspective: 1000px;
      }
      .phone {
        width: 300px;
        height: 600px;
        background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
        border-radius: 40px;
        border: 3px solid #333;
        box-shadow: 
          0 30px 60px -12px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
      }
      .phone::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 15px;
        background: #222;
        border-radius: 10px;
        z-index: 10;
      }
      .screen {
        width: calc(100% - 16px);
        height: calc(100% - 22px);
        background-color: #0f172a;
        border-radius: 35px;
        position: absolute;
        top: 11px;
        left: 8px;
        overflow: hidden;
        box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
      }
      .video-player {
        height: 180px;
        background: #000;
        flex-shrink: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
       .video-player-title {
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
        padding: 0 20px;
       }
      .recommendations-list {
          padding: 10px;
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
      }
      .recommendations-list::-webkit-scrollbar { /* WebKit */
          width: 0;
          height: 0;
      }
      .recommendation-item {
          display: flex;
          margin-bottom: 10px;
      }
      .thumbnail {
          width: 120px;
          height: 70px;
          background: #334155;
          border-radius: 8px;
          flex-shrink: 0;
      }
      .video-info {
          margin-left: 10px;
          flex-grow: 1;
      }
      .title-placeholder {
          height: 14px;
          width: 90%;
          background: #475569;
          border-radius: 4px;
          margin-bottom: 8px;
      }
      .channel-placeholder {
          height: 10px;
          width: 60%;
          background: #64748b;
          border-radius: 4px;
      }
      .autoplay-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 20;
      }
      .countdown-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        background: hsl(var(--primary));
      }
      @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
      }

      .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
      }

      .floating-element {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, var(--logo-primary), var(--logo-secondary));
          border-radius: 50%;
          opacity: 0.6;
      }
    `}</style>
     <div className="floating-elements">
        <div className="floating-element" style={{ top: '10%', left: '20%', animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="floating-element" style={{ top: '70%', right: '15%', animation: 'float 12s ease-in-out infinite reverse' }}></div>
        <div className="floating-element" style={{ top: '30%', right: '30%', animation: 'float 10s ease-in-out infinite' }}></div>
      </div>
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-6xl">
        <div className="flex items-center justify-center">
            <div ref={phoneContainerRef} className="phone-container">
                <div className="phone">
                    <div className="screen">
                        <div ref={videoPlayerRef} className="video-player">
                            <img src="https://www.canity.com/wp-content/uploads/2017/01/Micro-learning-for-Millennial-Minds.gif" alt="Autoplaying video" className="w-full h-full object-cover" />
                             <div ref={nextVideoOverlayRef} className="autoplay-overlay">
                                <p className="text-sm">Up next</p>
                                <p className="font-bold text-md">{videoTitles[1]}</p>
                                <div ref={countdownBarRef} className="countdown-bar"></div>
                            </div>
                        </div>
                        <div ref={recommendationsRef} className="recommendations-list">
                            {videoTitles.slice(1, 6).map(title => (
                                <div key={title} className="recommendation-item">
                                    <div className="thumbnail"></div>
                                    <div className="video-info">
                                        <div className="title-placeholder"></div>
                                        <div className="channel-placeholder"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div ref={textContentRef} className="text-white">
            <h2 className="text-4xl font-bold mb-4 text-primary uppercase">AUTO PLAY AND RECOMMENDATIONS</h2>
        </div>
      </div>
    </div>
    </>
  );
}
