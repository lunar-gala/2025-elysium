"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import p5 with no SSR
const p5 = dynamic(() => import('p5'), { ssr: false });

const HomePage = ({ introTextDuration = 4000 }) => {
  const canvasRef = useRef();
  const sketchInstance = useRef(null);

  useEffect(() => {
    if (!p5 || !canvasRef.current) return;

    const sketch = (p) => {
      const trans = 3 * 1000;
      const colors = [[146, 153, 166], [42, 66, 46], [28, 45, 128], [138, 85, 39]];
      const acts = ['emergence', 'blossom', 'hubris', 'embrace'];

      const act1pos = [90, 67.5, 45, 22.5];
      const act2pos = [112.5, 90, 67.5, 45];
      const act3pos = [135, 112.5, 90, 67.5];
      const act4pos = [157.5, 135, 112.5, 90];

      const positions = [act1pos, act2pos, act3pos, act4pos];

      let oldMillis = 0;
      let stage = 0;
      let oldStage = 0;
      let archive = false;
      let d = 1000;
      let direction = 1;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
        p.angleMode(p.DEGREES);
      };

      function drawBackground() {
        if (archive == false && direction < 99) {
          if (p.millis() - oldMillis < trans) {
            const curColor = interpColor(p.map(p.millis() - oldMillis, 0, trans/2, 0, 1), colors[oldStage], colors[stage]);
            const opacity = p.map(p.millis() - oldMillis, 0, trans/2, 0, 255);
            p.fill(curColor[0],curColor[1],curColor[2]);
          } else {
            p.fill(colors[stage][0],colors[stage][1],colors[stage][2]);
          }
        } else if (archive == true) {
          if (p.millis() - oldMillis < trans) {
            const curColor = interpColor(p.map(p.millis() - oldMillis, 0, trans/2, 0, 1), colors[stage], [0, 0, 0]);
            const opacity = p.map(p.millis() - oldMillis, 0, trans/2, 0, 255);
            p.fill(curColor[0],curColor[1],curColor[2]);
          } else {
            p.fill(0);
          }
        } else {
          if (p.millis() - oldMillis < trans) {
            const curColor = interpColor(p.map(p.millis() - oldMillis, 0, trans/2, 0, 1), [0, 0, 0], colors[stage]);
            const opacity = p.map(p.millis() - oldMillis, 0, trans/2, 0, 255);
            p.fill(curColor[0],curColor[1],curColor[2]);
          } else {
            p.fill(colors[stage][0],colors[stage][1],colors[stage][2]);
          }
        }
        p.rect(0, 0, p.windowWidth, p.windowHeight);
      }

      function drawCircle() {
        let cX, cY, x0, y0, x1, y1, x2, y2, x3, y3;
        
        if (archive == false && direction < 99) {
          cX = p.windowWidth/2;
          cY = 4 * p.windowHeight/3;
          
          if (p.millis() - oldMillis < trans) {
            const interp = p.map(p.millis() - oldMillis, 0, trans, 0, 22.5);
            x0 = p.cos(interp * direction + positions[oldStage][0]) * d/2 + p.windowWidth/2;
            y0 = -p.sin(interp * direction + positions[oldStage][0]) * d/2 + cY;

            x1 = p.cos(interp * direction + positions[oldStage][1]) * d/2 + p.windowWidth/2;
            y1 = -p.sin(interp * direction + positions[oldStage][1]) * d/2 + cY;

            x2 = p.cos(interp * direction + positions[oldStage][2]) * d/2 + p.windowWidth/2;
            y2 = -p.sin(interp * direction + positions[oldStage][2]) * d/2 + cY;

            x3 = p.cos(interp * direction + positions[oldStage][3]) * d/2 + p.windowWidth/2;
            y3 = -p.sin(interp * direction + positions[oldStage][3]) * d/2 + cY;
          } else {
            x0 = p.cos(positions[stage][0]) * d/2 + p.windowWidth/2;
            y0 = -p.sin(positions[stage][0]) * d/2 + cY;

            x1 = p.cos(positions[stage][1]) * d/2 + p.windowWidth/2;
            y1 = -p.sin(positions[stage][1]) * d/2 + cY;

            x2 = p.cos(positions[stage][2]) * d/2 + p.windowWidth/2;
            y2 = -p.sin(positions[stage][2]) * d/2 + cY;

            x3 = p.cos(positions[stage][3]) * d/2 + p.windowWidth/2;
            y3 = -p.sin(positions[stage][3]) * d/2 + cY;
          }
        } else if (archive == false && direction == 99999) {
          if (p.millis() - oldMillis < trans) {
            cY = p.map(p.millis() - oldMillis, 0, trans, -p.windowHeight/2, 4 * p.windowHeight/3);
          } else {
            cY = 4 * p.windowHeight/3;
          }
          x0 = p.cos(positions[stage][0]) * d/2 + p.windowWidth/2;
          y0 = -p.sin(positions[stage][0]) * d/2 + cY;

          x1 = p.cos(positions[stage][1]) * d/2 + p.windowWidth/2;
          y1 = -p.sin(positions[stage][1]) * d/2 + cY;

          x2 = p.cos(positions[stage][2]) * d/2 + p.windowWidth/2;
          y2 = -p.sin(positions[stage][2]) * d/2 + cY;

          x3 = p.cos(positions[stage][3]) * d/2 + p.windowWidth/2;
          y3 = -p.sin(positions[stage][3]) * d/2 + cY;
          
          cX = p.windowWidth/2;
        } else {
          if (p.millis() - oldMillis < trans) {
            cY = p.map(p.millis() - oldMillis, 0, trans, 4 * p.windowHeight/3, -p.windowHeight/2);
          } else {
            cY = -p.windowHeight/2;
          }
          x0 = p.cos(positions[stage][0]) * d/2 + p.windowWidth/2;
          y0 = -p.sin(positions[stage][0]) * d/2 + cY;

          x1 = p.cos(positions[stage][1]) * d/2 + p.windowWidth/2;
          y1 = -p.sin(positions[stage][1]) * d/2 + cY;

          x2 = p.cos(positions[stage][2]) * d/2 + p.windowWidth/2;
          y2 = -p.sin(positions[stage][2]) * d/2 + cY;

          x3 = p.cos(positions[stage][3]) * d/2 + p.windowWidth/2;
          y3 = -p.sin(positions[stage][3]) * d/2 + cY;
          
          cX = p.windowWidth/2;
        }

        p.noFill();
        p.stroke(255);
        p.circle(cX, cY, d);
        p.noStroke();
        p.fill(255);
        p.circle(x0, y0, 30);
        p.circle(x1, y1, 30);
        p.circle(x2, y2, 30);
        p.circle(x3, y3, 30);
      }

      function interpColor(n, color1, color2) {
        const newColor = [];
        if (n > 1) return color2;
        for (let i = 0; i < 3; i++) {
          newColor[i] = color1[i] + (color2[i] - color1[i])*n;
        }
        return newColor;
      }

      p.draw = () => {
        p.background(255);
        
        const millisecond = p.millis() - oldMillis;
        
        drawBackground();
        
        let textOpacity = 255;
        if (millisecond < trans) {
          textOpacity = p.map(millisecond, 0, trans, 0, 255);
        }
        
        p.fill(255, 255, 255, textOpacity);
        p.textSize(50);
        p.textAlign(p.LEFT, p.CENTER);
        if (archive == false) {
          p.text(acts[stage], p.windowWidth/32, p.windowHeight/2);
        } else {
          p.text("archive", p.windowWidth/32, p.windowHeight/2);
        }
        p.textAlign(p.CENTER, p.CENTER);
        
        drawCircle();
        
        if (p.millis() < introTextDuration) {
          const opacity = p.map(p.millis(), introTextDuration, introTextDuration - trans, 0, 255);
          const length = p.map(p.millis(), introTextDuration, introTextDuration - trans, 0, p.windowHeight/2);
          p.fill(0);
          p.rect(0, 0, p.windowWidth, length);
          p.rect(0, p.windowHeight-length, p.windowWidth, length);		
          p.fill(255, 255, 255, opacity);
          p.textSize(12);
          p.text('Use Arrow Keys to Navigate', p.windowWidth/2, p.windowHeight/2);
        }
      };

      p.keyPressed = () => {
        if (archive == false) {
          if (p.key === 'ArrowLeft') {
            oldStage = stage;
            stage = (stage - 1) % 4;
            oldMillis = p.millis();
            direction = -1;
            if (stage < 0) stage += 4;
          } else if (p.key === 'ArrowRight') {
            oldStage = stage;
            stage = (stage + 1) % 4;
            oldMillis = p.millis();
            direction = 1;
          }
        }
        if (p.key === 'ArrowUp') {
          if (archive == false) {
            archive = true;
            oldMillis = p.millis();
            direction = 99999;
          }
        } else if (p.key === 'ArrowDown') {
          if (archive == true) {
            archive = false;
            oldMillis = p.millis();
            direction = 99999;
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    // Create new p5 instance
    import('p5').then((p5Module) => {
      sketchInstance.current = new p5Module.default(sketch, canvasRef.current);
    });

    // Cleanup function
    return () => {
      if (sketchInstance.current) {
        sketchInstance.current.remove();
      }
    };
  }, [introTextDuration]);

  return <div ref={canvasRef}></div>;
};

// Export with no SSR
export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false
});