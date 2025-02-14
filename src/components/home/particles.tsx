"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const InteractiveParticles = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup with new background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0a');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mouseSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 5);

    // Track mouse position
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.at(20, intersectPoint);
      mouseSphere.center.copy(intersectPoint);
    };

    // Create two particle systems: one for stars and one for dust
    const createParticleSystem = (count: number, options: any) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const initialPositions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        const radius = Math.pow(Math.random(), options.radiusPower) * options.radius;
        const spinAngle = radius * options.spiralTightness;
        const branchAngle = (Math.PI * 2 * Math.floor(Math.random() * options.arms)) / options.arms;
        
        const randomOffset = Math.random() * options.randomness;
        const randomX = Math.pow(Math.random(), 3) * randomOffset * radius;
        const randomY = Math.pow(Math.random(), 3) * randomOffset * radius * 0.5;
        const randomZ = Math.pow(Math.random(), 3) * randomOffset * radius;

        positions[i3] = Math.cos(spinAngle + branchAngle) * radius + (Math.random() - 0.5) * randomX;
        positions[i3 + 1] = (Math.random() - 0.5) * randomY;
        positions[i3 + 2] = Math.sin(spinAngle + branchAngle) * radius + (Math.random() - 0.5) * randomZ;

        initialPositions[i3] = positions[i3];
        initialPositions[i3 + 1] = positions[i3 + 1];
        initialPositions[i3 + 2] = positions[i3 + 2];

        // Initialize velocities
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        const distanceFromCenter = Math.sqrt(
          Math.pow(positions[i3], 2) + 
          Math.pow(positions[i3 + 1], 2) + 
          Math.pow(positions[i3 + 2], 2)
        );

        let color;
        if (distanceFromCenter < options.radius * 0.15) {
          color = options.coreColor.clone();
          const variation = options.coreVariation;
          color.r += (Math.random() - 0.5) * variation;
          color.g += (Math.random() - 0.5) * variation;
          color.b += (Math.random() - 0.5) * variation;
          sizes[i] = Math.random() * options.coreSizeRange[0] + options.coreSizeRange[1];
        } else {
          color = options.colors[Math.floor(Math.random() * options.colors.length)].clone();
          const variation = options.colorVariation;
          color.r += (Math.random() - 0.5) * variation;
          color.g += (Math.random() - 0.5) * variation;
          color.b += (Math.random() - 0.5) * variation;
          sizes[i] = Math.random() * options.sizeRange[0] + options.sizeRange[1];
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('initialPosition', new THREE.BufferAttribute(initialPositions, 3));

      return {
        geometry,
        initialPositions,
        material: new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            mousePos: { value: new THREE.Vector3() },
            mouseRadius: { value: 5.0 },
            mouseStrength: { value: 0.5 }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 velocity;
            attribute vec3 initialPosition;
            uniform float time;
            uniform vec3 mousePos;
            uniform float mouseRadius;
            uniform float mouseStrength;
            varying vec3 vColor;

            void main() {
              vColor = color;
              
              // Start with initial position
              vec3 pos = initialPosition;
              
              // Calculate distance to mouse
              vec3 toMouse = mousePos - pos;
              float distToMouse = length(toMouse);
              
              // Apply mouse repulsion
              if (distToMouse < mouseRadius) {
                float strength = (1.0 - distToMouse / mouseRadius) * mouseStrength;
                pos -= normalize(toMouse) * strength;
              }
              
              // Apply velocity and orbital motion
              float angle = time * 0.1;
              mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              vec2 rotated = rotation * pos.xz;
              pos.xz = rotated;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (400.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: options.fragmentShader,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        })
      };
    };

    // Star system
    const starSystem = createParticleSystem(20000, {
      radius: 40,
      arms: 4,
      spiralTightness: 2.5,
      randomness: 0.35,
      radiusPower: 2,
      coreColor: new THREE.Color('#0288d1'),
      colors: [
        new THREE.Color('#004d40').multiplyScalar(0.8),
        new THREE.Color('#00695c').multiplyScalar(0.8),
        new THREE.Color('#4a148c').multiplyScalar(0.7),
        new THREE.Color('#26a69a').multiplyScalar(0.6),
        new THREE.Color('#b2dfdb').multiplyScalar(0.5),
        new THREE.Color('#d1c4e9').multiplyScalar(0.5),
        new THREE.Color('#80cbc4').multiplyScalar(0.6),
        new THREE.Color('#9575cd').multiplyScalar(0.5),
      ],
      coreVariation: 0.05,
      colorVariation: 0.2,
      coreSizeRange: [0.3, 0.2],
      sizeRange: [0.3, 0.1],
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float strength = 1.0 - (r * 2.0);
          strength = pow(strength, 1.8);
          vec3 finalColor = vColor + vec3(0.05, 0.05, 0.1) * strength;
          gl_FragColor = vec4(finalColor, strength * 0.8);
        }
      `
    });

    // Dust system
    const dustSystem = createParticleSystem(15000, {
      radius: 45,
      arms: 4,
      spiralTightness: 2.2,
      randomness: 0.5,
      radiusPower: 1.5,
      coreColor: new THREE.Color('#1a237e').multiplyScalar(0.5),
      colors: [
        new THREE.Color('#1a237e').multiplyScalar(0.3),
        new THREE.Color('#0d47a1').multiplyScalar(0.3),
        new THREE.Color('#01579b').multiplyScalar(0.3),
      ],
      coreVariation: 0.1,
      colorVariation: 0.1,
      coreSizeRange: [0.8, 0.4],
      sizeRange: [1.0, 0.3],
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float strength = 1.0 - (r * 2.0);
          strength = pow(strength, 2.0);
          gl_FragColor = vec4(vColor, strength * 0.3);
        }
      `
    });

    const starMesh = new THREE.Points(starSystem.geometry, starSystem.material);
    const dustMesh = new THREE.Points(dustSystem.geometry, dustSystem.material);
    scene.add(starMesh);
    scene.add(dustMesh);

    // Camera setup
    camera.position.set(10, 6, 10);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 20;
    controls.maxDistance = 100;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    // Animation with mouse interaction
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      // Update uniforms for mouse interaction
      starSystem.material.uniforms.time.value = time;
      starSystem.material.uniforms.mousePos.value.copy(mouseSphere.center);
      dustSystem.material.uniforms.time.value = time;
      dustSystem.material.uniforms.mousePos.value.copy(mouseSphere.center);

      starMesh.rotation.y += 0.0003;
      dustMesh.rotation.y += 0.00015;

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

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', () => {});
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      starSystem.geometry.dispose();
      starSystem.material.dispose();
      dustSystem.geometry.dispose();
      dustSystem.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default InteractiveParticles;