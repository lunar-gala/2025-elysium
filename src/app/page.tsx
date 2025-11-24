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

const ultraLight = localFont({
  src: "/fonts/PPEditorialNew-Ultralight.otf",
  // variable: "--font-ultra-light-italic",
});

// Define acts and Roman numerals (1-based index)
const romanNumerals = ["I", "II", "III", "IV"];
const acts = ["Emergence", "Blossom", "Hubris", "Embrace"];
const lines = [["Immensity", "Ka", "East Meets West"], 
["Pado", "Eve", "Recupera Se", "Follow Me Through it All", "Unearthed"], 
["Avarice", "Eaclipse", "Reverie", "Balance"], ["Self Love", "Celestial Vanity", "Shattered Silk", "Closing (Aporia)"]]

// Function to get the correct ActParticles component
const getActParticles = (index: number) => {
  const Component = (() => {
    switch (index) {
      case 1: return Act1;
      case 2: return Act2;
      case 3: return Act3;
      case 4: return Act4;
      default: return Act2;
    }
  })();

  

  return (
    <div className="transform -translate-y-10">
      <Component />
    </div>
  );
};



export default function Home() {
  const [actIndex, setActIndex] = useState(1);
  const [isLeftHovered, setLeftIsHovered] = useState(false); 
  const [isRightHovered, setRightIsHovered] = useState(false); 
  const [isModelLineHovered1, setModelLineHovered1] = useState(false); 
  const [isModelLineHovered2, setModelLineHovered2] = useState(false); 
  const [isModelLineHovered3, setModelLineHovered3] = useState(false); 
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [hoveredTick, setHoveredTick] = useState<number | null>(null);

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
    <div className="h-screen w-full overflow-hidden relative">
      
      {!isPreloaderComplete && <VideoPreloader onComplete={handlePreloaderComplete} />}
      <AnimatePresence mode="wait">
        {isPreloaderComplete && getActParticles(actIndex)}
      </AnimatePresence>
      
      

      {/* Act Title */}
      <div className="absolute bottom-45 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className={`text-3xl ${ultraLight?.className || ""}`}>
          Act {romanNumerals[actIndex - 1]}: {acts[actIndex - 1]}
        </h1>
      </div>

      {/* Bottom Navigation UI */}
      <div className="absolute bottom-20 w-full flex justify-between px-4 md:px-[3vw] text-sm font-light">
        {/* Left Navigation */}
        <button
          onMouseEnter={() => setLeftIsHovered(true)}
          onMouseLeave={() => setLeftIsHovered(false)}
          onClick={() => setActIndex((prev) => (prev === 1 ? 4 : prev - 1))}
          className="flex items-center hover:text-gray-300 transition-all"
        > 
          <div className="relative flex items-center">
            <span className={`absolute left-0 transform translate-y-[-20px] uppercase ${greyMonoTrial.className}`}>
              {acts[prevIndex(actIndex)]}
            </span>
            <div className="h-[0.5px] w-[15vw] md:w-[20vw] bg-gray-600"></div>
          </div>
          <div
            className={`h-[1px] w-[4vw] md:w-[5vw] bg-white absolute transition-all duration-300`}
            style={{
              transform: isLeftHovered ? "translateX(0%)" : "translateX(300%)",
            }}
          />
          {/* MIDDLE LINE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          <div className="h-[0.5px] w-[62vw] md:w-[55vw] bg-gray-600"></div>
        </div>
        </button>

        
        

        {/* MIDDLE UI */}

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 flex justify-center w-full">
<div
  className={`flex items-center justify-around px-2 md:px-4`}
  style={{
    width: `${Math.min(80, lines[actIndex - 1].length * 10)}vw`, // Dynamically adjust width based on the number of items
  }}
>
  {lines[actIndex - 1].map((item, index) => (
    <div
      key={index}
      className="group w-[2vw] h-[2vw] flex items-center justify-around"
      onMouseEnter={() => setHoveredTick(index)} // Set the hovered tick index
      onMouseLeave={() => setHoveredTick(null)} // Reset the hovered tick index
    >
      <div
        className={`h-[12px] w-[1px] text-center z-10 transition-all duration-200 ${
          hoveredTick === index ? "bg-white" : "bg-gray-600"
        }`}
        style={{
          transform: hoveredTick === index ? "rotate(90deg)" : "rotate(0deg)",
          transition: "all 0.2s cubic-bezier(.55,-0.03,.03,1.04)",
        }}
      ></div>

      <div
        className=" flex justify-center w-fit text-center text-sm mt-2 font-MonoTrial whitespace-nowrap "
        style={{
          transform: "translateY(15px)", // Translate the entire UI down by 10px
          maxWidth: "4vw", // Ensure the text does not exceed the width of the tick container
          
        }}
      >
        {item}
      </div>
    </div>
  ))}
</div>
</div>


{/* MIDDLE UI */}
{/*
<div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 flex justify-center w-full">
  <div
    className="flex items-center justify-around px-2 md:px-4"
    style={{
      width: `${Math.min(80, lines[actIndex - 1].length * 10)}vw`, // Dynamically adjust width based on the number of items
    }}
  >
    {lines[actIndex - 1].map((_, index) => (
      <div
        key={index}
        className="group w-[2vw] h-[2vw] flex items-center justify-around"
        onMouseEnter={() => setHoveredTick(index)} // Set the hovered tick index
        onMouseLeave={() => setHoveredTick(null)} // Reset the hovered tick index
      >
        <div
          className={`h-[12px] w-[1px] text-center z-10 transition-all duration-200 ${
            hoveredTick === index ? "bg-white" : "bg-gray-600"
          }`}
          style={{
            transform: hoveredTick === index ? "rotate(90deg)" : "rotate(0deg)",
            transition: "all 0.2s cubic-bezier(.55,-0.03,.03,1.04)",
          }}
        ></div>
      </div>
    ))}
  </div>
</div>
*/}

        {/* Right Navigation */}
        <button
          onMouseEnter={() => setRightIsHovered(true)}
          onMouseLeave={() => setRightIsHovered(false)}
          onClick={() => setActIndex((prev) => (prev === 4 ? 1 : prev + 1))}
          className="flex items-center hover:text-gray-300 transition-all"
        >
          <div className="relative flex items-center">
            <span className={`absolute right-0 transform translate-y-[-20px] uppercase ${greyMonoTrial.className}`}>
              {acts[nextIndex(actIndex)]}
            </span>
            <div className="h-[0.5px] w-[15vw] md:w-[20vw] bg-gray-600"></div>
          </div>
          <div
            className={`h-[1px] w-[4vw] md:w-[5vw] bg-white absolute transition-all duration-300`}
            style={{
              transform: isRightHovered ? "translateX(300%)" : "translateX(0%)",
            }}
          />
        </button>
        
      </div>

      {/* Bottom Items (Dynamic based on Act Index) */}
      {/*
<div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center w-full px-4 md:px-[3vw] text-sm font-light ${greyMonoTrial.className}`}>
  <div
    className="flex items-center justify-around font-MonoTrial"
    style={{
      width: `${Math.min(80, lines[actIndex - 1].length * 9)}vw`, // Dynamically adjust width based on the number of items
    }}
  >
    {lines[actIndex - 1].map((item, index) => (
      <p key={index} className="text-center">
        {item}
      </p>
    ))}
  </div>
</div>
*/}
    </div>
    
  );
}

// Helper functions for cycling indices
const nextIndex = (current: number) => (current === 4 ? 0 : current);
const prevIndex = (current: number) => (current === 1 ? 3 : current - 2);