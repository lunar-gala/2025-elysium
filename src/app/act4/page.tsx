"use client";

import Image from "next/image";
import ThreeCanvas from '@/components/ThreeCanvas';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";

// Load Custom Fonts
const greyMonoTrial = localFont({
  src: "../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const moonCrowd = localFont({
  src: "../fonts/MOONCROWD.otf",
  variable: "--font-moon-crowd",
});

// Act details (including Home as Act 0)
const acts = ["Home", "Emergence", "Blossom", "Hubris", "Embrace", ""];
const actRoutes = ["/", "/act1", "/act2", "/act3", "/act4", "/"];
const acts_text = [
  "HOME PAGE",
  "The dawn of your journey, brimming with hope, passion, and light. Untouched by the world's challenges, yet poised to embrace it all.",
  "In the early steps of your journey, you flourish and grow. You conquer new horizons, and you see yourself blooming into the person you have always wanted to be.",
  "With all your success, you grew confident and strong, but with that came arrogance—your fatal flaw.",
  "You have walked far, encountering all the pitfalls and flaws of the world, exposing the flaws within you. You realize there is no true end, only acceptance."
];

function Act3Page() {
  const router = useRouter();
  const [actIndex, setActIndex] = useState(4);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    // 🔥 Completely disable scrolling on mount
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // 🔥 Re-enable scrolling when unmounting
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const navigate = (path: string) => {
    setFade(false);
    setTimeout(() => router.push(path), 500);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && actIndex < acts.length - 2) {
        setActIndex(prev => prev + 1);
        navigate(actRoutes[actIndex + 1]);
      }
      if (event.key === "ArrowLeft" && actIndex > 1) {
        setActIndex(prev => prev - 1);
        navigate(actRoutes[actIndex - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actIndex]);

  return (
    <div className={`fixed inset-0 bg-black text-white flex flex-col justify-between text-center overflow-hidden transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
      
      {/* ThreeCanvas (Ensures Fullscreen WebGL) */}
      <div className="absolute inset-0 w-full h-full">
        <ThreeCanvas />
      </div>

      {/* Act Title (Fixed at Bottom but Centered Horizontally) */}
      {actIndex >= 0 && actIndex <= 5 && (
        <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 text-center z-10">
          <h1 className={`text-3xl font-bold ${moonCrowd?.className || ""}`}>
            Act {actIndex}: {acts[actIndex]}
          </h1>
          <p className={`text-lg mt-2 ${greyMonoTrial?.className || ""}`}>
            {acts_text[actIndex]}
          </p>
        </div>
      )}

      {/* Bottom Navigation UI */}
      <div className="absolute bottom-10 w-full flex justify-between px-10 text-sm font-light">
        {/* Left Label → Home */}
        <button
          onClick={() => navigate("/act3")}
          className="flex items-center hover:text-gray-300 transition-all"
        >
          <span className="mr-2">{acts[3]}</span>
          <div className="h-[1px] w-40 bg-gray-600"></div>
        </button>

        {/* Right Label → Act II */}
        <button
          onClick={() => navigate("/act1")}
          className="flex items-center hover:text-gray-300 transition-all"
        >
          <div className="h-[1px] w-40 bg-gray-600"></div>
          <span className="ml-2">{acts[1]}</span>
        </button>
      </div>
    </div>
  );
}

export default Act3Page;