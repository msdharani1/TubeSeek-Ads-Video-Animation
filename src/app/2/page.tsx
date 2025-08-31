
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function EnhancedAnimationPage() {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const tubeseekLogoRef = useRef<HTMLDivElement>(null);
  const appScreenRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const resultsListRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const playerTitleRef = useRef<HTMLHeadingElement>(null);
  const videoProgressRef = useRef<HTMLDivElement>(null);
  const shortsViewRef = useRef<HTMLDivElement>(null);
  const shortsReelRef = useRef<HTMLDivElement>(null);
  const adOverlayRef = useRef<HTMLDivElement>(null);

  const animationRunning = useRef(false);

  const videoTitles = [
    "React Hooks Explained in 10 Minutes",
    "Beginner's Guide to React Components",
    "State Management with Redux Toolkit",
    "Building a Portfolio Website with React"
  ];

  const shortsTitles = [
    "Funny Cat Fails Compilation",
    "Cooking with a Toddler",
    "Epic Gaming Moments",
    "Unbelievable Magic Tricks",
    "My Dog's Life as a King"
  ];

  const createVideoItem = (title: string, index: number) => {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.setAttribute('data-index', String(index));
    item.innerHTML = `
        <div class="video-thumbnail"></div>
        <div class="video-info">
            <div class="video-title"></div>
            <div class="channel-name"></div>
            <span class="text-sm text-gray-300 mt-2 block font-medium">${title}</span>
        </div>
    `;
    return item;
  };

  const createShortItem = (title: string, index: number) => {
    const item = document.createElement('div');
    item.className = 'short-item';
    item.style.background = `linear-gradient(${135 + index * 30}deg, var(--logo-primary), var(--logo-secondary))`;
    item.innerHTML = `
        <div class="short-item-info">
            <h4>${title}</h4>
            <p class="text-sm mt-2 opacity-80">@FunnyTube</p>
            <p class="text-xs mt-1 opacity-60">${Math.floor(Math.random() * 900 + 100)}K views</p>
        </div>
    `;
    return item;
  };

  const resetAnimation = () => {
    gsap.set([videoPlayerRef.current, shortsViewRef.current, adOverlayRef.current], { opacity: 0, scaleY: 0, y: 0 });
    gsap.set(resultsListRef.current, { opacity: 0 });
    phoneContainerRef.current?.classList.remove('active');
    screenRef.current?.classList.remove('on');
    appScreenRef.current?.classList.remove('active');
    if (shortsReelRef.current) shortsReelRef.current.innerHTML = '';
    if (resultsListRef.current) resultsListRef.current.innerHTML = '';
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

    tl.to(tubeseekLogoRef.current, {
      opacity: 1,
      scale: 1.3,
      rotation: 360,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, ">");

    tl.to(tubeseekLogoRef.current, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    }, ">0.2");

    tl.to(tubeseekLogoRef.current, { opacity: 0, scale: 0.8, duration: 0.3 }, ">");
    tl.to(appScreenRef.current, { opacity: 1, duration: 0.4 }, "<0.1");
    tl.to(searchBarRef.current, { opacity: 1, y: 0, duration: 0.4 }, "<0.2");

    tl.to(cursorRef.current, { opacity: 1, duration: 0.1 }, ">");
    const query = "React js tutorial";
    tl.to(searchTextRef.current, {
      duration: query.length * 0.05,
      text: query,
      ease: "none"
    });
    tl.to(cursorRef.current, { opacity: 0, duration: 0.2 }, ">0.3");

    tl.to(searchBarRef.current, { y: -10, opacity: 0.7, duration: 0.3 }, ">");

    videoTitles.forEach((title, index) => {
      const item = createVideoItem(title, index);
      resultsListRef.current?.appendChild(item);
      tl.fromTo(item,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        },
        ">-0.15"
      );
    });

    const fourthVideo = resultsListRef.current?.children[3];
    if (fourthVideo) {
        tl.to(fourthVideo, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            onStart: () => fourthVideo.classList.add('selected')
        }, ">1");
        tl.to(fourthVideo, {
            scale: 1.02,
            duration: 0.2
        }, ">");
    }

    tl.to(resultsListRef.current, { opacity: 0, y: -20, duration: 0.4 }, ">0.1");
    tl.to(videoPlayerRef.current, {
      scaleY: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
      onStart: () => {
        if (playerTitleRef.current) playerTitleRef.current.textContent = videoTitles[3];
        gsap.set(videoProgressRef.current, { width: '0%' });
      }
    }, "<");

    tl.to(adOverlayRef.current, { opacity: 1, duration: 0.2 }, ">0.1");
    tl.fromTo('.ad-progress-bar-fill', { width: '0%' }, { 
      width: '100%', 
      duration: 2, 
      ease: 'linear'
    });
    tl.to(adOverlayRef.current, { opacity: 0, duration: 0.2 }, ">");

    tl.to(videoProgressRef.current, { width: '80%', duration: 3, ease: "power1.inOut" });


    tl.to(videoPlayerRef.current, { scaleY: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, ">2");
    tl.to(shortsViewRef.current, { opacity: 1, duration: 0.4 }, "<0.1");
    
    const numShorts = 5;
    let currentShortIndex = 0;
    for (let i = 0; i < numShorts; i++) {
        const short = createShortItem(shortsTitles[i % shortsTitles.length], i);
        shortsReelRef.current?.appendChild(short);
        tl.fromTo(short, 
            { y: "100%", opacity: 0 }, 
            { y: "0%", opacity: 1, duration: 0.4, ease: "power2.inOut", onComplete: () => {
                if (currentShortIndex > 0 && shortsReelRef.current) {
                    gsap.to(shortsReelRef.current.children[currentShortIndex - 1], { y: "-100%", opacity: 0, duration: 0.4, ease: "power2.inOut" });
                }
                currentShortIndex++;
            }}, 
        `+=${i === 0 ? 0 : 1}`);
    }
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
            --overwhelmed-color: #c0392b;
            --hand-color: #fbbf24;
            --ad-yellow: #fbbd23;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--bg-color) 0%, #0f172a 50%, var(--bg-color) 100%);
            display: flex;
            justify-content: center;
            align-items: flex-end; 
            min-height: 100vh;
            overflow: hidden;
            transition: all 1.5s ease-in-out;
            position: relative;
            margin: 0;
            padding: 0;
        }

        .phone-container {
            transform: scale(0.7);
            opacity: 0;
            transition: all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 20;
            filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
            margin-bottom: 120px; 
        }
        .phone-container.active {
            transform: scale(1);
            opacity: 1;
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
            transition: all 0.8s ease-in;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
        }

        .screen.on {
            background-color: var(--screen-on);
            box-shadow: 
                inset 0 0 30px rgba(0, 0, 0, 0.1),
                0 0 50px rgba(138, 43, 226, 0.3);
        }

        .app-icon {
            width: 90px;
            height: 90px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            opacity: 0;
            cursor: pointer;
            background: linear-gradient(135deg, var(--logo-primary), var(--logo-secondary));
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(138, 43, 226, 0.3);
        }

        .app-icon.active {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .app-icon::after {
            content: '▶';
            color: white;
            font-size: 36px;
            font-weight: bold;
        }

        .app-screen {
            background: linear-gradient(180deg, var(--app-bg) 0%, #0f172a 100%);
            opacity: 0;
            transition: opacity 0.6s ease;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        .app-screen.active {
            opacity: 1;
        }

        .search-bar {
            width: calc(100% - 40px);
            margin: 25px auto 15px;
            padding: 12px 16px;
            background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
            border-radius: 25px;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            font-size: 15px;
            opacity: 0;
            border: 1px solid #374151;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .search-bar::before {
            content: '🔍';
            margin-right: 10px;
            font-size: 18px;
            filter: grayscale(0.3);
        }
        .search-text {
            white-space: nowrap;
            overflow: hidden;
            width: auto;
            transition: width 0.8s ease;
            font-weight: 400;
        }

        .video-item {
            width: calc(100% - 30px);
            background: linear-gradient(145deg, #1e293b, #334155);
            border-radius: 16px;
            margin: 10px auto;
            display: flex;
            align-items: center;
            padding: 12px;
            position: relative;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border: 1px solid #475569;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .video-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(138, 43, 226, 0.2);
        }

        .video-thumbnail {
            width: 110px;
            height: 65px;
            background: linear-gradient(135deg, var(--logo-primary), var(--logo-secondary));
            border-radius: 12px;
            flex-shrink: 0;
            position: relative;
            box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);
        }
        .video-thumbnail::before {
            content: '▶';
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .video-info {
            flex-grow: 1;
            margin-left: 15px;
        }

        .video-title {
            height: 14px;
            background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
            border-radius: 7px;
            margin-bottom: 8px;
            width: 95%;
        }

        .channel-name {
            height: 10px;
            background: linear-gradient(90deg, #94a3b8, #64748b);
            border-radius: 5px;
            width: 65%;
            margin-bottom: 6px;
        }
        
        .video-player {
            width: 100%;
            height: 60%;
            background: linear-gradient(180deg, #000, #1a1a1a);
            position: absolute;
            top: 0;
            left: 0;
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #fff;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .video-player-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            color: #f0f8ff;
        }

        .shorts-container {
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: #fff;
            transition: opacity 0.6s ease-in;
            overflow: hidden;
        }
        .shorts-container.active {
            opacity: 1;
        }
        .short-item {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: linear-gradient(135deg, var(--logo-primary), var(--logo-secondary));
            opacity: 0;
            transform: translateY(100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            padding: 25px;
            box-sizing: border-box;
        }
        .short-item-info {
            z-index: 1;
            background: rgba(0, 0, 0, 0.4);
            padding: 15px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .short-item-info h4 {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 5px;
        }

        .progress-bar {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--logo-primary), var(--logo-secondary));
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 2px;
        }
        
        .ad-overlay {
            position: absolute;
            bottom: 45px;
            left: 10%;
            width: 80%;
            opacity: 0;
            z-index: 20;
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

        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(220, 20, 60, 0.3); }
            50% { box-shadow: 0 0 40px rgba(220, 20, 60, 0.6); }
        }

        .selected {
            animation: pulseGlow 1s ease-in-out;
            border: 2px solid var(--logo-primary) !important;
        }

        .typing-cursor {
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
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
      <div className="person-body" style={{display: 'none'}}>
        <div className="person-head"></div>
        <div className="person-torso"></div>
      </div>
      <div id="overwhelmed-text" className="overwhelmed-text" style={{display: 'none'}}></div>
      <div ref={phoneContainerRef} className="phone-container">
        <div id="phone" className="phone">
          <div ref={screenRef} id="screen" className="screen">
            <div ref={tubeseekLogoRef} id="tubeseek-logo" className="app-icon"></div>
            <div ref={appScreenRef} id="app-screen" className="app-screen">
              <div ref={searchBarRef} id="search-bar" className="search-bar">
                <span ref={searchTextRef} id="search-text" className="search-text"></span>
                <span ref={cursorRef} id="cursor" className="typing-cursor">|</span>
              </div>
              <div ref={resultsListRef} id="results-list" className="flex flex-col w-full h-full mt-2 px-2">
              </div>
              <div ref={videoPlayerRef} id="video-player" className="video-player">
                <h3 ref={playerTitleRef} id="player-title" className="video-player-title"></h3>
                <div ref={adOverlayRef} className="ad-overlay">
                  <div className="ad-text">Skip Ad</div>
                  <div className="ad-progress-bar">
                      <div className="ad-progress-bar-fill"></div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div ref={videoProgressRef} id="video-progress" className="progress-fill"></div>
                </div>
              </div>
              <div ref={shortsViewRef} id="shorts-view" className="shorts-container">
                <div ref={shortsReelRef} id="shorts-reel" className="relative w-full h-full">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

    

    