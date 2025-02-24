"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import VideoPreloader from "@/components/VideoPreloader";
import Act1 from '@/components/ActOneParticles';
import Act2 from '@/components/ActTwoParticles';
import Act3 from '@/components/ActThreeParticles';
import Act4 from '@/components/ActFourParticles';
import { AnimatePresence } from "framer-motion";

// Load Custom Fonts
const greyMonoTrial = localFont({
  src: "/fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const moonCrowd = localFont({
  src: "/fonts/MOONCROWD.otf",
  variable: "--font-moon-crowd",
});

// Define acts (1-based index)
const acts = ["Emergence", "Blossom", "Hubris", "Embrace"];

// Function to get the correct ActParticles component
const getActParticles = (index: number) => {
  switch (index) {
    case 1: return <Act1 />;
    case 2: return <Act2 />;
    case 3: return <Act3 />;
    case 4: return <Act4 />;
    default: return <Act2 />; 
  }
};

export default function Home() {
  const [actIndex, setActIndex] = useState(1);
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
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "ArrowRight") {
        setActIndex((prev) => (prev === 4 ? 1 : prev + 1)); // Cycle forward 1 → 2 → 3 → 4 → 1
      }
      if (event.key === "ArrowLeft") {
        setActIndex((prev) => (prev === 1 ? 4 : prev - 1)); // Cycle backward 1 ← 2 ← 3 ← 4 ← 1
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
      {!isPreloaderComplete && <VideoPreloader onComplete={handlePreloaderComplete} />}
      <AnimatePresence mode="wait">
        {isPreloaderComplete && getActParticles(actIndex)}
      </AnimatePresence>

      {/* Act Title */}
      <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className={`text-3xl font-bold ${moonCrowd?.className || ""}`}>
          Act {actIndex}: {acts[actIndex - 1]}
        </h1>
      </div>

      {/* Bottom Navigation UI */}
      <div className="absolute bottom-10 w-full flex justify-between px-10 text-sm font-light">
        {/* Left Navigation */}
        <button
          onMouseEnter={() => setLeftIsHovered(true)}
          onMouseLeave={() => setLeftIsHovered(false)}
          onClick={() => setActIndex((prev) => (prev === 1 ? 4 : prev - 1))}
          className="flex items-center hover:text-gray-300 transition-all"
        > 
          <div className="relative flex items-center">
            <span className="absolute left-0 transform translate-y-[-20px]">
              {acts[prevIndex(actIndex)]}
            </span>
            <div className="h-[0.5px] w-[268px] bg-gray-600"></div>
          </div>
          <div
            className={`h-[1px] bg-white absolute transition-all duration-300`}
            style={{
              transform: isLeftHovered ? "translateX(0%)" : "translateX(346%)",
              width: "60px",
            }}
          />
        </button>

        {/* Right Navigation */}
        <button
          onMouseEnter={() => setRightIsHovered(true)}
          onMouseLeave={() => setRightIsHovered(false)}
          onClick={() => setActIndex((prev) => (prev === 4 ? 1 : prev + 1))}
          className="flex items-center hover:text-gray-300 transition-all"
        >
          <div className="relative flex items-center">
            <span className="absolute right-0 transform translate-y-[-20px]">
              {acts[nextIndex(actIndex)]}
            </span>
            <div className="h-[0.5px] w-[268px] bg-gray-600"></div>
          </div>
          <div
            className={`h-[1px] bg-white absolute transition-all duration-300`}
            style={{
              transform: isRightHovered ? "translateX(346%)" : "translateX(0%)",
              width: "60px", 
            }}
          />
        </button>
      </div>
    </div>
  );
}

// Helper functions for cycling indices
const nextIndex = (current: number) => (current === 4 ? 0 : current);
const prevIndex = (current: number) => (current === 1 ? 3 : current - 2);
