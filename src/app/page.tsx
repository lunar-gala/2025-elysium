"use client"

import { useState } from "react";
import ThreeCanvas from '@/components/ThreeCanvas'
import VideoPreloader from '@/components/VideoPreloader'

export default function Home() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
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