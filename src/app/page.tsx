"use client";

import { useState, useEffect } from "react";
import Act1 from '@/components/ActOneParticles';
import Act2 from '@/components/ActTwoParticles';
import Act3 from '@/components/ActThreeParticles';
import Act4 from '@/components/ActFourParticles';

const getActParticles = (index: number) => {
  switch (index) {
    case 1: return <Act1 />;
    case 2: return <Act2 />;
    case 3: return <Act3 />;
    case 4: return <Act4 />;
    default: return <Act1 />;
  }
};

export default function Home() {
  const [actIndex, setActIndex] = useState(1);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "ArrowRight") {
        setActIndex((prev) => (prev === 4 ? 1 : prev + 1));
      }
      if (event.key === "ArrowLeft") {
        setActIndex((prev) => (prev === 1 ? 4 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      {getActParticles(actIndex)}
      <div className="absolute top-4 left-4 text-white">
        Act {actIndex}
      </div>
    </div>
  );
}