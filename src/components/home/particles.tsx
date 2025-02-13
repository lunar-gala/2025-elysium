"use client"
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Particles = () => {
  const [Three, setThree] = useState<typeof import('three') | null>(null);
  const [OrbitControls, setOrbitControls] = useState<any>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import Three.js and OrbitControls
    const loadThree = async () => {
      const ThreeModule = await import('three');
      const OrbitControlsModule = await import('three/examples/jsm/controls/OrbitControls');
      
      setThree(ThreeModule);
      setOrbitControls(() => OrbitControlsModule.OrbitControls);
    };

    loadThree();
  }, []);

  useEffect(() => {
    // Only run this effect when Three.js and OrbitControls are loaded
    if (!Three || !OrbitControls || !mountRef.current) return;

    // Scene setup
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particles geometry
    const particlesGeometry = new Three.BufferGeometry();
    const particlesCount = 5000;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Generate random positions and colors for particles
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
      colorArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new Three.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new Three.BufferAttribute(colorArray, 3));

    // Particles material
    const particlesMaterial = new Three.PointsMaterial({
      size: 0.005,
      vertexColors: true,
      blending: Three.AdditiveBlending,
      transparent: true
    });

    // Create particles
    const particlesMesh = new Three.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Camera position
    camera.position.z = 50;

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Raycaster for interaction
    const raycaster = new Three.Raycaster();
    const mouse = new Three.Vector2();

    // Mouse move event
    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.y += 0.001;

      // Interact with particles
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([particlesMesh]);

      if (intersects.length > 0) {
        // Modify particles when mouse is over them
        const { array } = particlesGeometry.attributes.color;
        for (let i = 0; i < intersects.length; i++) {
          array[intersects[i].index * 3] = 1;     // Red
          array[intersects[i].index * 3 + 1] = 0; // Green
          array[intersects[i].index * 3 + 2] = 0; // Blue
        }
        particlesGeometry.attributes.color.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [Three, OrbitControls]);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default Particles;