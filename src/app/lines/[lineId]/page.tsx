"use client";

import lines from '@/data/lines'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import localFont from 'next/font/local';
import { useEffect, useRef, use } from 'react';
import { motion } from 'framer-motion';

const greyMonoTrial = localFont({
  src: "../../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});


export default function LinePage({ params }: { params: Promise<{ lineId: string }> }) {
  const { lineId } = use(params);
  const line = lines[lineId]

  if (!line) return notFound()

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
    transition={{ duration: 0.5, delay: 1.2 }}
    >

    
    <div className="flex flex-col h-screen bg-black text-white font-mono absolute z-10">
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Left panel with aligned info */}
        <div className="w-[30%] px-12 py-16 text-[11px] leading-[1.6] tracking-wider uppercase space-y-4 mt-50">
          <div className="space-y-2">
            <div className="flex gap-6">
              <span className="text-white/60 w-20">ACT {line.act}</span>
              <span className="text-white font-semibold">{line.title}</span>
            </div>
          </div>
          <div className="space-y-[0px]">
          {[
            { label: "Designers", value: line.designers.join(", ") },
            { label: "Sound", value: line.sound },
            { label: "Motion", value: line.motion },
            { label: "Photo", value: line.photo },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <span className="text-white/60 w-20">{item.label}</span>
              <span className="text-white normal-case tracking-tight">{item.value}</span>
            </div>
          ))}
          </div>
          <p className="whitespace-pre-line text-white/80 text-[11px] leading-relaxed normal-case tracking-tight">
            {line.description}
          </p>
        </div>

        {/* Horizontal scrollable image section */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-2 items-start  my-10 mt-15">
            {line.images.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt="line look"
                width={1800}
                height={1800}
                className="object-cover max-h-[70vh]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom act/line bar with tick style */}
      <div className="w-full border-t border-white/20 px-10 py-3 text-xs">
        <div className="flex justify-between">
          {[
            { name: 'EMERGENCE', start: 1 },
            { name: 'BLOSSOM', start: 5 },
            { name: 'ACT III', start: 9 },
            { name: 'ACT IV', start: 13 }
          ].map((act, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className={`mb-1 ${line.act === i + 1 ? 'text-white' : 'text-white/40'}`}>{act.name}</p>
              <div className="relative w-20 h-4">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />
                {[0, 1, 2, 3].map((n) => {
                  const lineNumber = act.start + n
                  const isActive = parseInt(lineId) === lineNumber
                  return (
                    <div
                      key={n}
                      className={`absolute top-0 w-px h-4 ${isActive ? 'bg-white' : 'bg-white/30'}`}
                      style={{ left: `${(n / 3) * 100}%` }}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </motion.div>
    </>
  )
}
