"use client"

import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";

const greyMonoTrial = localFont({
    src: "../fonts/GreyMonoLLTrialWeb-Book.woff2",
    variable: "--font-grey-mono-trial",
});

export default function About() {
    const router = useRouter(); // For Next.js

    const handleClick = () => {
        router.push("/"); // Next.js navigation
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
                    if (canvasRef.current) {
                        peopleMenu.remove();
                    }
                };
            }
        });
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center relative" onClick={handleClick}>
            <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-10 bg-[rgba(47,54,79,0.40)] backdrop-blur-xs z-51"></div>
            <div className={`absolute w-1/2 text-justify text-white text-[16px] font-[450] leading-[120%] tracking-[-0.64px] uppercase ${greyMonoTrial.className} z-52 uppercase`}>
                Lunar Gala 2025 ELYSIUM explores the idea of a neverending story. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    );
}