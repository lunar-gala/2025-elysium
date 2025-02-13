"use client"
import Sidebar from "./components/sidebar"
import PeopleGrid from "./components/grid"
import { useState, useEffect, useRef } from "react";
import {useIsVisible} from './utils/intersecting'
import p5 from "p5";


const categories = [
  "Creative",
  "Design",
  "Dance",
  "Hair & Makeup",
  "Production",
  "Public Relations",
  "Model"
];

export default function People() {
  const [selected, setSelected] = useState("Producers");
  const refs: Record<string, React.RefObject<HTMLElement>> = categories.reduce((acc, category) => {
    acc[category] = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
      return acc;
    }, {}  as Record<string, React.RefObject<HTMLElement>>
  );

  categories.forEach((category) => {
  const isVisible = useIsVisible(refs[category]);

  useEffect(() => {
      if (isVisible) {
      setSelected(category);
      }
  }, [isVisible, category, setSelected]);
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p: { setup: () => void; createCanvas: (arg0: any, arg1: any) => { (): any; new(): any; parent: { (arg0: null): void; new(): any; }; }; windowWidth: number; windowHeight: number; noFill: () => void; stroke: (arg0: number, arg1: number, arg2: number, arg3: number) => void; strokeWeight: (arg0: number) => void; windowResized: () => void; resizeCanvas: (arg0: any, arg1: any) => void; draw: () => void; map: (arg0: any, arg1: number, arg2: number, arg3: number, arg4: number) => number; tan: (arg0: number) => any; millis: () => number; background: (arg0: number) => void; circle: (arg0: number, arg1: number, arg2: number) => void; mouseX: any; mouseY: any; }) => {
      var numMoons: number;
      let displacement: number;

      p.setup = () =>{ 
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.noFill();
        p.stroke(255, 255, 255, 122);
        p.strokeWeight(0.4);
        numMoons = 9;
      }

      p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.draw = () =>{ 
        displacement = p.map(p.tan(p.millis()/3000), 0, 1, 1, 1.05);

        p.background(0);
        p.circle(p.mouseX, p.mouseY, 20);
        moons();
      }

      function moons() {
        for (var i = 0; i < numMoons; i ++) {
          p.circle((i + 5) * (displacement * p.windowWidth/18), p.windowHeight/2, 20);
          p.circle((i + 5) * (displacement * p.windowWidth/18), p.windowHeight/2, i * 100);
          p.circle((i + 5) * (displacement * p.windowWidth/18), p.windowHeight/2, (numMoons - i) * 150);
        }
      }
    }
    if (canvasRef.current){ 
      const peopleMenu = new p5(sketch, canvasRef.current);
      return () => { 
          peopleMenu.remove()
      };
    }
  }, [])
  
    return (
      <div className="relative">
        <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0">
        </div>
        <div className="grid grid-cols-16 gap-[10px] ml-[20px] mt-[250px] mr-[1rem] absolute top-0 left-0 z-10">
          <div className="col-span-3 col-start-2">
            <Sidebar selected={selected} categories={categories} />
          </div>
          <div className="col-span-12 col-start-5">
            <PeopleGrid setSelected={setSelected} refs={refs} categories={categories} />
          </div>
        </div>
      </div>
  );
}