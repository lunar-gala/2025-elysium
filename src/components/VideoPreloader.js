"use client"

import React, { useState } from 'react';

const VideoPreloader = ({ onComplete }) => {
  const [isSkipped, setIsSkipped] = useState(false);

  const handleVideoEnd = () => {
    onComplete();
  };

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  if (isSkipped) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden" onClick={handleSkip}>
      <video
        className="min-w-full h-auto"
        autoPlay
        playsInline
        muted
        onEnded={handleVideoEnd}
        type="video/mp4"
      >
        <source
          src="https://vstaicu-portfolio-assets.s3.us-east-2.amazonaws.com/elysium-headshots/xiao-preloader-4_1_5.mov"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPreloader;