
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SolutionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const chaoticScreenRef = useRef<HTMLDivElement>(null);
  const cleanScreenRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const chaoticWords = [
    "Trending Now", "Viral Video", "Must Watch", "Clickbait", "Sponsored", "You Won't Believe This",
    "Top 10", "Shocking", "Reacts To", "Algorithm", "Ad", "Subscribe", "Like", "Comment", "Endless Scroll"
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });

    // Initial setup
    gsap.set(phoneContainerRef.current, { opacity: 0, scale: 0.9, y: 100 });
    gsap.set(textContentRef.current, { opacity: 0, y: 50 });
    gsap.set(chaoticScreenRef.current, { opacity: 1, scale: 1 });
    gsap.set(cleanScreenRef.current, { opacity: 0, scale: 1.1 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.5 });
    
    // Add chaotic text elements
    if (chaoticScreenRef.current) {
        chaoticScreenRef.current.innerHTML = ''; // Clear previous elements
        for (let i = 0; i < 20; i++) {
            const word = document.createElement('div');
            word.className = 'chaotic-word';
            word.textContent = chaoticWords[Math.floor(Math.random() * chaoticWords.length)];
            chaoticScreenRef.current.appendChild(word);

            gsap.set(word, {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 16 + 8}px`,
                color: `hsla(0, 0%, 100%, ${Math.random() * 0.5 + 0.2})`,
            });
            
            gsap.to(word, {
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    // Animation sequence
    tl.to(textContentRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 1.2, 
      ease: 'power3.out' 
    })
    .to(phoneContainerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
    }, "-=0.8")

    // Show chaos
    .from(chaoticScreenRef.current?.children || [], {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power2.out'
    }, "-=0.5")

    // Transition from chaos to clean
    .to(chaoticScreenRef.current?.children || [], {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.in',
    }, ">2")
    .to(screenRef.current, {
        backgroundColor: 'var(--clean-bg)',
        duration: 0.8,
        ease: 'power3.inOut'
    }, "<")
    .to(cleanScreenRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
    }, ">-0.3")
    .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
    }, ">-0.2")

    // Outro
    .to([phoneContainerRef.current, textContentRef.current], {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.in'
    }, ">3")


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
            --chaotic-bg: #1a1a1a;
            --clean-bg: #60a5fa; /* A calm blue */
            --search-bar-bg: #ffffff;
            --search-bar-text: #334155;
            --logo-color: #ffffff;
        }
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, var(--bg-color) 0%, #0f172a 50%, var(--bg-color) 100%);
            overflow: hidden;
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
        .screen {
            width: calc(100% - 16px);
            height: calc(100% - 22px);
            background-color: var(--chaotic-bg);
            border-radius: 35px;
            position: absolute;
            top: 11px;
            left: 8px;
            overflow: hidden;
            box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chaotic-screen, .clean-screen {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .chaotic-word {
            font-family: monospace;
            will-change: transform;
        }
        .clean-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .logo {
            width: 100px;
            height: 100px;
            background: var(--logo-color);
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            font-weight: bold;
            color: var(--clean-bg);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
            margin-bottom: 2rem;
        }
        .search-bar-final {
            width: 90%;
            padding: 12px 18px;
            background: var(--search-bar-bg);
            border-radius: 50px;
            color: var(--search-bar-text);
            font-size: 14px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
        }
        .search-bar-final::before {
            content: '🔍';
            margin-right: 10px;
            font-size: 16px;
        }
      `}</style>
      <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center p-8 text-center text-white">
          <div ref={textContentRef} className="mb-8">
            <h1 className="text-5xl font-bold mb-3 text-primary uppercase">We saw the problem.</h1>
            <p className="text-xl text-foreground/80">So, we decided to change it.</p>
          </div>
          <div className="flex items-center justify-center">
            <div ref={phoneContainerRef} className="phone-container">
              <div className="phone">
                <div ref={screenRef} className="screen">
                  <div ref={chaoticScreenRef} className="chaotic-screen"></div>
                  <div ref={cleanScreenRef} className="clean-screen">
                    <div ref={logoRef} className="logo">F</div>
                    <div className="search-bar-final">
                        <span>Search for something specific...</span>
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
