"use client";

import { useState, useEffect } from "react";
import ThreeCanvas from "@/components/ThreeCanvas";
import { motion } from "framer-motion"; // Import Framer Motion
import VideoPreloader from "@/components/VideoPreloader";
import localFont from "next/font/local";

// Load Custom Fonts
const greyMonoTrial = localFont({
  src: "/fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const moonCrowd = localFont({
  src: "/fonts/MOONCROWD.otf",
  variable: "--font-moon-crowd",
});

const acts = ["Home", "Emergence", "Blossom", "Hubris", "Embrace", ""];

export default function Home() {
  const [actIndex, setActIndex] = useState(0);
  const [isLeftHovered, setLeftIsHovered] = useState(false); 
  const [isRightHovered, setRightIsHovered] = useState(false); 
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeenPreloader) {
      setIsPreloaderComplete(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActIndex(prev => (prev + 1) % 5);
      }
      if (event.key === "ArrowLeft") {
        setActIndex(prev => (prev - 1 + 5) % 5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("hasSeenPreloader", "true");
    setIsPreloaderComplete(true);
  };

  return (
    <div>
      {!isPreloaderComplete && (
        <VideoPreloader onComplete={handlePreloaderComplete} />
      )}
      {isPreloaderComplete && <ThreeCanvas />}

      {/* Act Title (Fixed at Bottom but Centered Horizontally) */}
      {actIndex >= 0 && actIndex <= 5 && (
        <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 text-center z-10">
          <h1 className={`text-3xl font-bold ${moonCrowd?.className || ""}`}>
            Act {actIndex}: {acts[actIndex]}
          </h1>
        </div>
      )}

      {/* Bottom Navigation UI */}
      <div className="absolute bottom-10 w-full flex justify-between px-10 text-sm font-light">
        {/* Left Label → Home */}

        <button
          onMouseEnter={() => setLeftIsHovered(true)}  // Set to true when mouse enters
          onMouseLeave={() => setLeftIsHovered(false)} // Set to false when mouse leaves
          onClick={() => setActIndex(prev => (prev - 1 + 5) % 5)}
          className="flex items-center hover:text-gray-300 transition-all"
        > 
          <div className="relative flex items-center">
            <span className="absolute left-0 transform translate-y-[-20px]">{acts[(actIndex - 1 + 5) % 5]}</span>
            <div className="h-[0.5px] w-[268px] bg-gray-600"></div>
          </div>
          <div
            className={`h-[1px] bg-white absolute transition-all duration-300`}
            style={{
              transform: isLeftHovered ? "translateX(0%)" : "translateX(346%)", // Move from right to left
              width: "60px", // Fixed width of 10px
            }}
          />
        </button>

        {/* Right Label → Act II */}

        <button
          onMouseEnter={() => setRightIsHovered(true)}  // Set to true when mouse enters
          onMouseLeave={() => setRightIsHovered(false)} // Set to false when mouse leaves
          onClick={() => setActIndex(prev => (prev + 1) % 5)}
          className="flex items-center hover:text-gray-300 transition-all"
        >
          <div className="relative flex items-center">
            <span className="absolute right-0 transform translate-y-[-20px]">{acts[(actIndex + 1) % 5]}</span>
            <div className="h-[0.5px] w-[268px] bg-gray-600"></div>
          </div>
          <div
            className={`h-[1px] bg-white absolute transition-all duration-300`}
            style={{
              transform: isRightHovered ? "translateX(346%)" : "translateX(0%)", // Move from right to left
              width: "60px", 
            }}
          />
        </button>
      </div>
    </div>
  );
}