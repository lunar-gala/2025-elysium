<<<<<<< Updated upstream
"use client"
=======
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
>>>>>>> Stashed changes

import Image from "next/image";
export default function Home() {
<<<<<<< Updated upstream
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */
      /* </footer>
=======
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
>>>>>>> Stashed changes
    </div>
  );
}