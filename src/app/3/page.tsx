
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function AdAnimationPage() {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const appScreenRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const adOverlayRef = useRef<HTMLDivElement>(null);

  const animationRunning = useRef(false);

  const resetAnimation = () => {
    gsap.set(videoPlayerRef.current, { opacity: 0, scaleY: 0, y: 0 });
    gsap.set(adOverlayRef.current, { opacity: 0 });
    screenRef.current?.classList.remove('on');
    appScreenRef.current?.classList.remove('active');
    animationRunning.current = false;
  };

  const playAnimation = () => {
    if (animationRunning.current) return;
    animationRunning.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(resetAnimation, 2000);
      }
    });

    tl.set(phoneContainerRef.current, { rotationY: -30, scale: 0.7 });
    tl.to(phoneContainerRef.current, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1,
      ease: "back.out(1.7)"
    }, 0.2);

    tl.to(screenRef.current, {
      backgroundColor: 'var(--screen-on)',
      duration: 0.5,
      ease: "power2.inOut"
    }, ">-0.3");

    tl.to(appScreenRef.current, { opacity: 1, duration: 0.4 }, ">");
    
    tl.to(videoPlayerRef.current, {
      scaleY: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
    }, ">");

    tl.to(adOverlayRef.current, { opacity: 1, duration: 0.2 }, ">0.1");
    tl.fromTo('.ad-progress-bar-fill', { width: '0%' }, { 
      width: '100%', 
      duration: 4, 
      ease: 'linear'
    });
    tl.to(adOverlayRef.current, { opacity: 0, duration: 0.2 }, ">");

    tl.to(videoPlayerRef.current, { scaleY: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, ">1");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      playAnimation();
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
            --bg-color: #020817;
            --phone-color: #0d0d0d;
            --screen-off: #0d0d0d;
            --screen-on: #f0f8ff;
            --logo-primary: #e74c3c;
            --logo-secondary: #c0392b;
            --app-bg: #020817;
            --app-text: #f0f8ff;
            --ad-yellow: #fbbd23;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--bg-color) 0%, #0f172a 50%, var(--bg-color) 100%);
            display: flex;
            justify-content: center;
            align-items: center; 
            min-height: 100vh;
            overflow: hidden;
        }

        .phone-container {
            transform: scale(0.7);
            opacity: 0;
            filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
        }

        .phone {
            width: 300px;
            height: 600px;
            background: linear-gradient(145deg, #1a1a1a, var(--phone-color));
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
            background-color: var(--screen-off);
            border-radius: 35px;
            position: absolute;
            top: 11px;
            left: 8px;
            overflow: hidden;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
        }

        .screen.on {
            background-color: var(--screen-on);
        }

        .app-screen {
            background: linear-gradient(180deg, var(--app-bg) 0%, #0f172a 100%);
            opacity: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        .video-player {
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #000, #1a1a1a);
            position: absolute;
            top: 0;
            left: 0;
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #fff;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .ad-overlay {
            position: absolute;
            bottom: 60px;
            left: 10%;
            width: 80%;
            opacity: 0;
            z-index: 10;
        }
        .ad-text {
            background: var(--ad-yellow);
            color: #000;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 4px;
        }
        .ad-progress-bar {
            width: 100%;
            height: 3px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
            border: 1px solid var(--ad-yellow);
        }
        .ad-progress-bar-fill {
            width: 0%;
            height: 100%;
            background-color: var(--ad-yellow);
        }
      `}</style>
      <div ref={phoneContainerRef} className="phone-container">
        <div className="phone">
          <div ref={screenRef} className="screen">
            <div ref={appScreenRef} className="app-screen">
              <div ref={videoPlayerRef} className="video-player">
                <h3 className="text-xl font-bold mb-4 text-center">Your Video Title</h3>
                 <div ref={adOverlayRef} className="ad-overlay">
                  <div className="ad-text">Skip Ad</div>
                  <div className="ad-progress-bar">
                      <div className="ad-progress-bar-fill"></div>
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
