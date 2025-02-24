"use client"
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Sketch from './glslActOne/Sketch'

const ThreeCanvas = () => {
  const [Three, setThree] = useState(null);
  const containerRef= useRef(null);

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
    let sketch = new Sketch({ dom: containerRef.current })

    return () => {
      if (sketch) {
        sketch.isPlaying = false
        containerRef.current?.removeChild(sketch.renderer.domElement) // Remove the canvas element
      }
      if (containerRef) {
        containerRef.removeChild(renderer.domElement);
      }
    }
  }, [Three])

  return <div ref={containerRef} className="w-full h-screen" />;
}

export default ThreeCanvas;