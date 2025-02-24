"use client"
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Sketch from './glslActThree/Sketch'

const Act3 = () => {
  const [Three, setThree] = useState(null);
  const containerRef = useRef(null);
  const sketchRef = useRef(null); // Add this to store the sketch instance

  useEffect(() => {
    // Dynamically import Three.js and OrbitControls
    const loadThree = async () => {
      const ThreeModule = await import('three');
      setThree(ThreeModule);
    };

    loadThree();
  }, []);

  useEffect(() => {
    if (!Three || !containerRef.current) return;
    
    // Store the sketch instance in the ref
    sketchRef.current = new Sketch({ dom: containerRef.current });

    return () => {
      if (sketchRef.current) {
        sketchRef.current.isPlaying = false;
        // Check if the renderer and its DOM element exist before removing
        if (sketchRef.current.renderer && sketchRef.current.renderer.domElement) {
          containerRef.current?.removeChild(sketchRef.current.renderer.domElement);
        }
        // Clean up the sketch instance
        sketchRef.current = null;
      }
    }
  }, [Three]);

  return <div ref={containerRef} className="w-full h-screen" />;
}

export default Act3;