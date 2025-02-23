"use client";

import { useState, useEffect } from "react";
import ThreeCanvas from "@/components/ThreeCanvas";
import VideoPreloader from "@/components/VideoPreloader";

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
      {isPreloaderComplete && <ThreeCanvas />}
    </div>
  );
}
