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
    <div
      className="fixed inset-0 w-full h-full z-50 bg-black"
      onClick={handleSkip}
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        onEnded={handleVideoEnd}
      >
        <source
          src="https://res.cloudinary.com/ddjxpkewq/video/upload/f_auto:video,q_auto/v1/lg/uelohmn4ldqfkuldngoo"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPreloader;