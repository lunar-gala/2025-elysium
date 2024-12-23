"use client"

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const ExampleHomePage = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      const trans = 3000;
      const colors = [
        [146, 153, 166],
        [42, 66, 46],
        [28, 45, 128],
        [138, 85, 39],
      ];
      const acts = ["emergence", "blossom", "hubris", "embrace"];
      let oldMillis = 0;
      let stage = 0;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
      };

      p.draw = () => {
        p.background(255);

        const millisecond = p.millis() - oldMillis;

        if (millisecond < trans) {
          const opacity = p.map(millisecond, 0, trans, 0, 255);
          p.fill(colors[stage][0], colors[stage][1], colors[stage][2], opacity);
        } else {
          p.fill(colors[stage][0], colors[stage][1], colors[stage][2]);
        }
        p.rect(0, 0, p.windowWidth, p.windowHeight);

        // Display text
        p.fill(255);
        p.textSize(50);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(acts[stage], p.windowWidth / 2, p.windowHeight / 2);

        // Draw circle at mouse position
        p.fill(255);
        p.circle(p.mouseX, p.mouseY, 50);

        // Animated rectangles at edges
        if (millisecond < trans) {
          const length = p.map(millisecond, trans, 0, 0, p.windowHeight / 2);
          p.fill(0);
          p.rect(0, 0, p.windowWidth, length);
          p.rect(0, p.windowHeight - length, p.windowWidth, length);
        }
      };

      p.keyPressed = () => {
        if (p.key === "ArrowLeft") {
          stage = (stage - 1) % 4;
          oldMillis = p.millis();
          if (stage < 0) stage += 4;
        } else if (p.key === "ArrowRight") {
          stage = (stage + 1) % 4;
          oldMillis = p.millis();
        }
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

export default ExampleHomePage;
