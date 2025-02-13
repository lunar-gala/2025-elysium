"use client"
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Particles = () => {
  const [Three, setThree] = useState<typeof import('three') | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadThree = async () => {
      const ThreeModule = await import('three');
      setThree(ThreeModule);
    };
    loadThree();
  }, []);

  useEffect(() => {
    if (!Three || !mountRef.current) return;

    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new Three.BufferGeometry();
    const particlesCount = 5000;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 100;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 100;

      colorArray[i * 3] = Math.random() * 0.7 + 0.3;
      colorArray[i * 3 + 1] = Math.random() * 0.7 + 0.3;
      colorArray[i * 3 + 2] = Math.random() * 0.7 + 0.3;

      sizeArray[i] = Math.random() * 2.5 + 0.5;
    }

    particlesGeometry.setAttribute('position', new Three.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new Three.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new Three.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: Three.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    const particlesMesh = new Three.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [Three]);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default Particles;
