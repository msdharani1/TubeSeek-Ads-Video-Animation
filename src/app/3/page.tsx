
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AdPage() {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const adOverlayRef = useRef<HTMLDivElement>(null);
  const adProgressBarRef = useRef<HTMLDivElement>(null);
  const adTimerRef = useRef<HTMLSpanElement>(null);
  const skipButtonRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const tl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 2,
      onStart: () => {
        // Reset button state for each loop
        if(skipButtonRef.current) {
          gsap.set(skipButtonRef.current, { opacity: 1, pointerEvents: 'auto' });
        }
      }
    });

    const countdown = { value: 5 };

    // Initial setup
    gsap.set(phoneContainerRef.current, { opacity: 0, scale: 0.8, y: 100, rotationY: -45 });
    gsap.set(videoPlayerRef.current, { opacity: 0 });
    gsap.set(adOverlayRef.current, { opacity: 0 });
    gsap.set(adProgressBarRef.current, { width: '0%' });
    if (adTimerRef.current) {
      adTimerRef.current.innerText = "5";
    }
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
    .to(videoPlayerRef.current, {
      opacity: 1,
      duration: 0.5,
    }, "-=0.5")
    .to(adOverlayRef.current, {
      opacity: 1,
      duration: 0.5,
    }, ">")
    .to(adProgressBarRef.current, {
      width: '100%',
      duration: 5, // Match countdown duration
      ease: 'linear',
    }, "<")
    .to(countdown, {
      value: 0,
      duration: 5,
      ease: 'none',
      onUpdate: () => {
        if (adTimerRef.current) {
          adTimerRef.current.innerText = Math.ceil(countdown.value).toString();
        }
      }
    }, "<")
    .to(adOverlayRef.current, {
      opacity: 0,
      duration: 0.5,
    }, ">")
     .to(videoPlayerRef.current, {
      opacity: 0,
      duration: 0.5,
    }, ">1")
    .to(phoneContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        rotationY: 45,
        duration: 1,
        ease: 'power3.in'
    }, ">1");

    const skipAd = () => {
        gsap.to(skipButtonRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
        tl.seek(tl.duration() - 2.5); // Jump towards the end of the animation
    }

    if (skipButtonRef.current) {
      skipButtonRef.current.addEventListener('click', skipAd);
    }
    
    return () => {
      if (skipButtonRef.current) {
        skipButtonRef.current.removeEventListener('click', skipAd);
      }
      tl.kill();
    }

  }, []);

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
        background-color: #000;
        border-radius: 35px;
        position: absolute;
        top: 11px;
        left: 8px;
        overflow: hidden;
        box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
      }
      .video-player-background {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #4a0e0e, #8B0000);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        font-weight: bold;
      }
      .video-player-background::before {
          content: '▶';
          font-size: 4rem;
          opacity: 0.3;
      }
      .ad-overlay-container {
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        z-index: 100;
      }
      .ad-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .ad-button {
        background-color: #fbbd23;
        color: #1a1a1a;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid #f59e0b;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      }
      .ad-timer {
        color: #fbbd23;
        font-size: 12px;
        font-weight: 600;
        background: rgba(0,0,0,0.5);
        padding: 4px 8px;
        border-radius: 4px;
      }
      .ad-progress-bar-container {
        width: 100%;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #fbbd23;
      }
      .ad-progress-bar-fill {
        height: 100%;
        background-color: #fbbd23;
        box-shadow: 0 0 8px #fbbd23;
        border-radius: 2px;
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
                        <div ref={videoPlayerRef} className="video-player-background">
                        <div ref={adOverlayRef} className="ad-overlay-container">
                            <div className="ad-controls">
                                <div ref={skipButtonRef} className="ad-button">Skip Ad</div>
                                <div className="ad-timer">Ad ends in <span ref={adTimerRef}>5</span>s</div>
                            </div>
                            <div className="ad-progress-bar-container">
                            <div ref={adProgressBarRef} className="ad-progress-bar-fill"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div ref={textContentRef} className="text-white">
                <h2 className="text-4xl font-bold mb-4 text-primary uppercase">ENDLESS ADS</h2>
            </div>
        </div>
    </div>
    </>
  );
}
