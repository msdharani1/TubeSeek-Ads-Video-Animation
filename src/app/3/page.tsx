
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AdPage() {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const adOverlayRef = useRef<HTMLDivElement>(null);
  const adProgressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Initial setup
    gsap.set(phoneContainerRef.current, { opacity: 0, scale: 0.8, y: 100 });
    gsap.set(videoPlayerRef.current, { opacity: 0 });
    gsap.set(adOverlayRef.current, { opacity: 0 });
    gsap.set(adProgressBarRef.current, { width: '0%' });

    // Animation sequence
    tl.to(phoneContainerRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
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
      duration: 4,
      ease: 'linear',
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
        duration: 1,
        ease: 'power3.in'
    }, ">1");

  }, []);

  return (
    <>
    <style jsx global>{`
      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(135deg, #020817 0%, #0f172a 100%);
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
        margin-bottom: 8px;
        display: inline-block;
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
    `}</style>
    <div className="min-h-screen w-full flex items-center justify-center">
      <div ref={phoneContainerRef} className="phone-container">
        <div className="phone">
          <div className="screen">
            <div ref={videoPlayerRef} className="video-player-background">
               <div ref={adOverlayRef} className="ad-overlay-container">
                <div className="ad-button">Skip Ad</div>
                <div className="ad-progress-bar-container">
                  <div ref={adProgressBarRef} className="ad-progress-bar-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
