"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";
import { motion } from "framer-motion";


const greyMonoTrial = localFont({
    src: "../fonts/GreyMonoLLTrialWeb-Book.woff2",
    variable: "--font-grey-mono-trial",
});

export default function About() {
    const router = useRouter(); // For Next.js

    const handleClick = () => {
        router.back(); // Navigate back to the previously visited page
    };

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
            p.background(10);
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
        <div className="h-full w-full flex items-center justify-center relative" onClick={handleClick}>
            <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-10 bg-[rgba(47,54,79,0.40)] backdrop-blur-xs z-51"></div>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }} className={`absolute w-1/2 text-justify text-white text-[16px] font-[450] leading-[120%] tracking-[-0.64px] uppercase ${greyMonoTrial.className} z-52 uppercase`}>
                We all take our own path in life in order to find our final destination, our happiness. That path looks different for everybody, as there are ups and downs, lessons to learn, and the different treasures we pick up on the way. Elysium, draws from the idea of a journey—personal, unpredictable, and transformative. Like the winding, serpentine paths we navigate in life, this journey is filled with moments of reflection, trials, and triumphs. Each individual’s path to their own ultimate bliss is unique, shaped by both the highs and the lows, the challenges and the discoveries along the way.
            </motion.div>
        </div>
      );
}