"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function P5sketch() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("p5").then((p5) => {
      const sketch = (p: any) => {
        let numMoons = 9;
        let displacement: number;

        p.setup = () => {
          if (!canvasRef.current) return;
          p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
          p.noFill();
          p.stroke(255, 255, 255, 122);
          p.strokeWeight(0.4);
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        p.draw = () => {
          displacement = p.map(p.tan(p.millis() / 3000), 0, 1, 1, 1.05);
          p.background(0);
          p.circle(p.mouseX, p.mouseY, 20);
          moons();
        };

        function moons() {
          for (let i = 0; i < numMoons; i++) {
            p.circle((i + 5) * (displacement * p.windowWidth / 18), p.windowHeight / 2, 20);
            p.circle((i + 5) * (displacement * p.windowWidth / 18), p.windowHeight / 2, i * 100);
            p.circle((i + 5) * (displacement * p.windowWidth / 18), p.windowHeight / 2, (numMoons - i) * 150);
          }
        }
      };

      if (canvasRef.current) {
        const peopleMenu = new p5.default(sketch, canvasRef.current);
        return () => {
          peopleMenu.remove();
        };
      }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0"></div>
    </motion.div>
  );
}
