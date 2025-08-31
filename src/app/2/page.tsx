
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function EnhancedAnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const tubeseekLogoRef = useRef<HTMLDivElement>(null);
  const appScreenRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const resultsListRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const playerTitleRef = useRef<HTMLHeadingElement>(null);
  const adOverlayRef = useRef<HTMLDivElement>(null);
  const shortsViewRef = useRef<HTMLDivElement>(null);
  const shortsReelRef = useRef<HTMLDivElement>(null);

  const videoTitles = [
    "React Hooks Explained",
    "Beginner's Guide to React",
    "State Management in React",
    "Coding a React App"
  ];

  const shortsContent = [
    { title: "Funny Cat Fails", gif: "https://i.pinimg.com/originals/67/f1/2e/67f12e0d73e01e1c52eda42916e9769a.gif" },
    { title: "Cooking with a Toddler", gif: "https://media.tenor.com/N9KXo0VYOq0AAAAM/sunnyfication.gif" },
    { title: "Epic Gaming Moments", gif: "https://cdn.mos.cms.futurecdn.net/c7430b83771cb95dd5a6c49d593b4ec5.gif" },
    { title: "Unbelievable Magic", gif: "https://i.makeagif.com/media/8-25-2015/oVBRNE.gif" },
    { title: "My Dog's Life as a King", gif: "https://i.pinimg.com/originals/67/f1/2e/67f12e0d73e01e1c52eda42916e9769a.gif" }
  ];

  const createVideoItem = (title: string) => {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.innerHTML = `
        <div class="video-thumbnail"></div>
        <div class="video-info">
            <span class="text-sm text-gray-300 font-medium">${title}</span>
            <div class="channel-name"></div>
        </div>
    `;
    return item;
  };

  const createShortItem = (title: string, gifUrl: string, index: number) => {
    const item = document.createElement('div');
    item.className = 'short-item';
    item.innerHTML = `
        <img src="${gifUrl}" alt="${title}" class="short-gif" />
        <div class="short-item-info">
            <h4>${title}</h4>
            <p class="text-sm mt-2 opacity-80">@User${index + 1}</p>
        </div>
    `;
    return item;
  };
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial setup
    gsap.set(phoneContainerRef.current, { opacity: 0, scale: 0.8, y: 100, rotationY: -45 });
    gsap.set(textContentRef.current, { opacity: 0, x: 100 });
    gsap.set(screenRef.current, { backgroundColor: 'var(--screen-off)' });
    gsap.set(tubeseekLogoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(appScreenRef.current, { opacity: 0 });
    gsap.set(searchBarRef.current, { opacity: 0, y: 20 });
    gsap.set(resultsListRef.current, { opacity: 0 });
    gsap.set(videoPlayerRef.current, { opacity: 0, scaleY: 0 });
    gsap.set(shortsViewRef.current, { opacity: 0, y: '100%' });
    gsap.set(adOverlayRef.current, { opacity: 0 });

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
    .to(screenRef.current, { backgroundColor: 'var(--screen-on)', duration: 0.5 }, ">-0.5")
    .to(tubeseekLogoRef.current, { opacity: 1, scale: 1, duration: 0.5 }, ">")
    .to(tubeseekLogoRef.current, { opacity: 0, scale: 0.8, duration: 0.3 }, ">1")
    
    // App screen appears
    .to(appScreenRef.current, { opacity: 1, duration: 0.4 }, "<")
    .to(searchBarRef.current, { opacity: 1, y: 0, duration: 0.4 }, "<0.2")

    // Typing animation
    .to(cursorRef.current, { opacity: 1, duration: 0.1 }, ">")
    .to(searchTextRef.current, { duration: 1.5, text: "react js tutorial", ease: "none" })
    .to(cursorRef.current, { opacity: 0, duration: 0.2 }, ">0.3")

    // Show results
    .to(searchBarRef.current, { y: -10, opacity: 0.7, duration: 0.3 }, ">")
    .to(resultsListRef.current, { opacity: 1 }, "<")
    
    // Populate results
    .call(() => {
        if (!resultsListRef.current) return;
        resultsListRef.current.innerHTML = ''; // Clear previous results
        videoTitles.forEach((title) => {
            const item = createVideoItem(title);
            resultsListRef.current?.appendChild(item);
            gsap.from(item, { opacity: 0, y: 20, duration: 0.3, stagger: 0.1 });
        });
    })

    // Select a video
    .to(resultsListRef.current?.children[3] || {}, { scale: 1.05, duration: 0.3, ease: "power2.out" }, ">1")

    // Hide results, show video player
    .to(resultsListRef.current, { opacity: 0, y: -20, duration: 0.4 }, ">0.5")
    .to(videoPlayerRef.current, {
      scaleY: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
      onStart: () => {
        if (playerTitleRef.current) playerTitleRef.current.textContent = videoTitles[3];
      }
    }, "<")

    // Ad overlay
    .to(adOverlayRef.current, { opacity: 1, duration: 0.2 }, ">0.5")
    .fromTo(adOverlayRef.current?.querySelector('.ad-progress-bar-fill'), { width: '0%' }, { width: '100%', duration: 2, ease: 'linear' })
    .to(adOverlayRef.current, { opacity: 0, duration: 0.2 }, ">")

    // Hide video, show shorts
    .to(videoPlayerRef.current, { scaleY: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, ">2")
    .to(shortsViewRef.current, { opacity: 1, y: '0%', duration: 0.4 }, "<")
    
    // Populate and scroll shorts
     .call(() => {
        if (!shortsReelRef.current) return;
        shortsReelRef.current.innerHTML = '';
        shortsContent.forEach((short, index) => {
             const item = createShortItem(short.title, short.gif, index);
             shortsReelRef.current?.appendChild(item);
        });
    })
    .to(shortsReelRef.current, { y: `-${4 * 100}%`, duration: 10, ease: "power1.inOut" })

    // Reset for next loop
    .to(containerRef.current, {
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
            --app-bg: #0f172a;
            --app-text: #e2e8f0;
            --ad-yellow: #fbbd23;
        }
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, var(--bg-color) 0%, #0f172a 50%, var(--bg-color) 100%);
        }
        .phone-container { perspective: 1000px; }
        .phone {
            width: 300px;
            height: 600px;
            background: linear-gradient(145deg, #1a1a1a, var(--phone-color));
            border-radius: 40px;
            border: 3px solid #333;
            box-shadow: 0 30px 60px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
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
            box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
        }
        .app-icon {
            width: 90px;
            height: 90px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
            background: linear-gradient(135deg, var(--logo-primary), var(--logo-secondary));
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(138, 43, 226, 0.3);
        }
        .app-icon::after {
            content: '▶';
            color: white;
            font-size: 36px;
        }
        .app-screen {
            background: var(--app-bg);
            opacity: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        .search-bar {
            width: calc(100% - 30px);
            margin: 20px auto 10px;
            padding: 10px 14px;
            background: #1e293b;
            border-radius: 20px;
            color: var(--app-text);
            display: flex;
            align-items: center;
            font-size: 14px;
            border: 1px solid #374151;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            flex-shrink: 0;
        }
        .search-bar::before {
            content: '🔍';
            margin-right: 8px;
            font-size: 16px;
        }
        .results-list {
          padding: 0 10px;
          overflow-y: auto;
        }
        .video-item {
            width: 100%;
            background: #1e293b;
            border-radius: 12px;
            margin: 8px 0;
            display: flex;
            align-items: center;
            padding: 10px;
            border: 1px solid #475569;
        }
        .video-thumbnail {
            width: 100px;
            height: 56px;
            background: linear-gradient(135deg, var(--logo-primary), var(--logo-secondary));
            border-radius: 8px;
            flex-shrink: 0;
        }
        .video-info {
            flex-grow: 1;
            margin-left: 12px;
        }
        .channel-name {
            height: 10px;
            background: #475569;
            border-radius: 5px;
            width: 60%;
            margin-top: 6px;
        }
        .video-player {
            width: 100%;
            height: 100%;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: top;
            display: flex;
            flex-direction: column;
            color: #fff;
        }
        .video-player-content {
          width: 100%;
          height: 180px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .video-player-title {
            font-size: 16px;
            font-weight: 600;
            padding: 10px;
            background: rgba(0,0,0,0.5);
        }
        .ad-overlay {
            position: absolute;
            bottom: 10px;
            left: 10px;
            width: calc(100% - 20px);
        }
        .ad-text {
            background: var(--ad-yellow);
            color: #000;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 4px;
        }
        .ad-progress-bar {
            width: 100%;
            height: 3px;
            background-color: rgba(255,255,255,0.3);
            border-radius: 2px;
        }
        .ad-progress-bar-fill {
            width: 0%;
            height: 100%;
            background-color: var(--ad-yellow);
        }
        .shorts-container {
            width: 100%;
            height: 100%;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
        }
        .shorts-reel {
            width: 100%;
            height: 500%; /* 5 shorts */
            position: absolute;
            top: 0;
            left: 0;
        }
        .short-item {
            width: 100%;
            height: 20%; /* 1/5 of the reel height */
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            padding: 20px;
            box-sizing: border-box;
            color: white;
        }
        .short-gif {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }
        .short-item-info {
            z-index: 1;
            background: rgba(0, 0, 0, 0.5);
            padding: 10px;
            border-radius: 10px;
            backdrop-filter: blur(5px);
        }
        .typing-cursor {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            50% { opacity: 0; }
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
      <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-6xl">
          <div className="flex items-center justify-center">
            <div ref={phoneContainerRef} className="phone-container">
              <div className="phone">
                <div ref={screenRef} className="screen">
                  <div ref={tubeseekLogoRef} className="app-icon"></div>
                  <div ref={appScreenRef} className="app-screen">
                    <div ref={searchBarRef} className="search-bar">
                      <span ref={searchTextRef} className="search-text"></span>
                      <span ref={cursorRef} className="typing-cursor">|</span>
                    </div>
                    <div ref={resultsListRef} className="results-list"></div>
                    <div ref={videoPlayerRef} className="video-player">
                       <div className="video-player-content">
                         <img src="https://d585tldpucybw.cloudfront.net/sfimages/default-source/default-album/renderstart.gif?sfvrsn=3d8cfee1_1" alt="Coding GIF" className="w-full h-full object-cover"/>
                         <h3 ref={playerTitleRef} className="video-player-title"></h3>
                         <div ref={adOverlayRef} className="ad-overlay">
                            <div className="ad-text">Ad</div>
                            <div className="ad-progress-bar"><div className="ad-progress-bar-fill"></div></div>
                         </div>
                       </div>
                    </div>
                    <div ref={shortsViewRef} className="shorts-container">
                      <div ref={shortsReelRef} className="shorts-reel"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={textContentRef} className="text-white">
            <h2 className="text-4xl font-bold mb-4 text-primary uppercase">ENDLESS SCROLLING AND SHORT-FORM CONTENT</h2>
          </div>
        </div>
      </div>
    </>
  );
}
