"use client";

import Sidebar from "./components/sidebar";
import PeopleGrid from "./components/grid";
import { useState, useEffect, useRef } from "react";
import { useIsVisible } from "./utils/intersecting";
import { motion } from "framer-motion";

const categories = [
  "Creative",
  "Design",
  "Dance",
  "Hair & Makeup",
  "Production",
  "Public Relations",
  "Model",
];

export default function Talent() {
  const [selected, setSelected] = useState("Producers");
  const refs: Record<string, React.RefObject<HTMLElement | null>> = categories.reduce(
    (acc, category) => {
      acc[category] = useRef<HTMLElement | null>(null);
      return acc;
    },
    {} as Record<string, React.RefObject<HTMLElement | null>>
  );

  categories.forEach((category) => {
    const isVisible = useIsVisible(refs[category]);

    useEffect(() => {
      if (isVisible) {
        setSelected(category);
      }
    }, [isVisible, category]);
  });

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
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0"></div>
    </motion.div>
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: 1.3 }}
    >
      <div className="grid grid-cols-6 lg:grid-cols-16 gap-[10px] ml-[20px] mt-[250px] mr-[1rem] absolute top-0 left-0 z-10">
        <div className="col-span-1 lg:col-span-2 lg:col-start-2">
          <Sidebar selected={selected} categories={categories} />
        </div>
        <div className="col-span-4 lg:col-span-12 col-start-3 lg:col-start-5">
          <PeopleGrid refs={refs} categories={categories} />
        </div>
      </div>
    </motion.div>
      </>
  );
}