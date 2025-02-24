"use client";

import { useState, useEffect } from "react";
import VideoPreloader from "@/components/VideoPreloader";

import ActOnePrticles from '@/components/ActOneParticles'
import ActTwoPrticles from '@/components/ActTwoParticles'
import ActThreeParticles from '@/components/ActThreeParticles'
import ActFourParticles from '@/components/ActFourParticles'


export default function Home() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeenPreloader) {
      setIsPreloaderComplete(true);
    }
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
      
      {isPreloaderComplete && <ActTwoPrticles />}
    </div>
  );
}
