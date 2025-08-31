
"use client";

import React, { useEffect, useRef } from 'react';

const videoTitles = [
  "How to cook the perfect steak",
  "DIY Home Decor Ideas", 
  "10-Minute Morning Workout",
  "Travel Guide to Japan"
];

interface VideoItemProps {
  title: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ title }) => (
  <div className="video-item flex items-center p-3 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-2 border border-slate-500">
    <div className="video-thumbnail w-24 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-md"></div>
    <div className="video-info ml-3">
      <span className="text-sm text-gray-300 font-medium">{title}</span>
      <div className="channel-name h-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded mt-1 w-1/2"></div>
    </div>
  </div>
);

const AdAnimationPage: React.FC = () => {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const appScreenRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const adOverlayRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const animationRunning = useRef<boolean>(false);

  const resetAnimation = () => {
    if (videoPlayerRef.current) videoPlayerRef.current.style.opacity = '0';
    if (adOverlayRef.current) adOverlayRef.current.style.opacity = '0';
    if (progressBarFillRef.current) progressBarFillRef.current.style.width = '0%';
    screenRef.current?.classList.remove('on');
    appScreenRef.current?.classList.remove('active');
    animationRunning.current = false;
  };

  const animateElement = (element: HTMLElement | null, properties: Record<string, string>, duration: number = 0.5, delay: number = 0) => {
    if (!element) return Promise.resolve();
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        Object.assign(element.style, properties);
        element.style.transition = `all ${duration}s ease`;
        setTimeout(resolve, duration * 1000);
      }, delay * 1000);
    });
  };

  const handleSkipAd = () => {
    if (adOverlayRef.current) {
      adOverlayRef.current.style.opacity = '0';
    }
    animateElement(videoPlayerRef.current, { opacity: '0' }, 0.4, 0).then(() => {
      setTimeout(() => {
        animationRunning.current = false;
        playAnimation();
      }, 1000);
    });
  };

  const playAnimation = async () => {
    if (animationRunning.current) return;
    animationRunning.current = true;

    resetAnimation();

    if (phoneContainerRef.current) {
      phoneContainerRef.current.style.transform = 'rotateY(-30deg) scale(0.7)';
      phoneContainerRef.current.style.opacity = '0';
      await animateElement(phoneContainerRef.current, {
        opacity: '1',
        transform: 'rotateY(0deg) scale(1)'
      }, 1, 0.2);
    }

    if (screenRef.current) {
      screenRef.current.classList.add('on');
    }

    await animateElement(appScreenRef.current, { opacity: '1' }, 0.4, 0.3);
    await animateElement(videoPlayerRef.current, { opacity: '1' }, 0.4, 0);
    
    if (adOverlayRef.current) {
      await animateElement(adOverlayRef.current, { opacity: '1' }, 0.2, 0.5);
    }
    
    if (progressBarFillRef.current) {
      progressBarFillRef.current.style.transition = 'width 4s linear';
      progressBarFillRef.current.style.width = '100%';
    }

    await new Promise(resolve => setTimeout(resolve, 4000));

    if (adOverlayRef.current && adOverlayRef.current.style.opacity === '1') {
      await animateElement(adOverlayRef.current, { opacity: '0' }, 0.2, 0);
    }

    await animateElement(videoPlayerRef.current, { opacity: '0' }, 0.4, 1);

    setTimeout(() => {
      animationRunning.current = false;
      playAnimation();
    }, 2000);
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
          --phone-color: #0d0d0d;
          --screen-off: #0d0d0d;
          --screen-on: #f0f8ff;
          --ad-yellow: #fbbd23;
        }

        body {
          font-family: 'Inter', sans-serif;
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
          transition: background-color 0.5s ease;
        }

        .screen.on {
          background-color: var(--screen-on);
        }

        .app-screen {
          background: linear-gradient(180deg, #020817, #0f172a);
          opacity: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .video-player {
          width: 100%;
          height: 180px;
          background: linear-gradient(180deg, #000, #1a1a1a);
          position: relative;
          top: 0;
          left: 0;
          opacity: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #fff;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          flex-shrink: 0;
          overflow: visible;
        }
        
        .ad-overlay {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          opacity: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 6px;
          padding: 10px;
          pointer-events: auto;
        }
        
        .ad-text {
          background: var(--ad-yellow);
          color: #000;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 8px;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: 1px solid #f59e0b;
        }
        
        .ad-progress-bar {
          width: 100%;
          height: 5px;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid var(--ad-yellow);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .ad-progress-bar-fill {
          width: 0%;
          height: 100%;
          background-color: var(--ad-yellow);
          border-radius: 3px;
          box-shadow: 0 0 8px rgba(251, 189, 35, 0.6);
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
        <div ref={phoneContainerRef} className="phone-container">
          <div className="phone">
            <div ref={screenRef} className="screen">
              <div ref={appScreenRef} className="app-screen">
                <div ref={videoPlayerRef} className="video-player">
                  <h3 className="text-lg font-bold mb-4 text-center">Video Playing...</h3>
                  <div ref={adOverlayRef} className="ad-overlay">
                    <div className="ad-text" onClick={handleSkipAd}>Skip Ad</div>
                    <div className="ad-progress-bar">
                      <div ref={progressBarFillRef} className="ad-progress-bar-fill"></div>
                    </div>
                  </div>
                </div>
                <div className="recommendations p-4 overflow-y-auto flex-grow no-scrollbar">
                  {videoTitles.map(title => <VideoItem key={title} title={title} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdAnimationPage;
