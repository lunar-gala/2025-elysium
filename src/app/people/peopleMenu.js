"use client"

import React, {useRef, useEffect} from "react";
import p5 from "p5";
import { useRouter } from 'next/navigation';


const PeopleMenu = () => {
    const canvasRef = useRef();
    const router = useRouter(); 

    useEffect(() => {
        const sketch = (p) => {
            let randomNum = 0;
            let lights = [];

            for (let i = 0; i < 8; i++) {
                // [currSize, targetSize, growRate]
                lights.push([100, 100, 2]);
            }

            function isHovering(x, y, radius) {
                let d = p.dist(p.mouseX, p.mouseY, x, y);
                return d < radius; 
            }
            p.setup = () =>{
                p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
                setInterval(() => {
                    randomNum = Math.floor(p.random(8));
                  }, 900);
            }

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
              
            p.draw = () => {
                p.background(0);
                p.cursor(p.ARROW);
                
                ring(p.windowWidth*1.2, ['PRODUCERS', 'DESIGN', 'MODEL', 'PRODUCTION','CREATIVE', 'PR', 'HAIR & MAKEUP', 'DANCE'], false, false, 255, lights);
                ring(p.windowWidth*0.7, ['', '', '', ''], true, true, 180);
                ring(p.windowWidth*0.4, ['', '', '', '', '', '', ''], true, false, 180);
            }
              
            function ring(radius, points = [], shouldRotate=false, rotateLeft=false,strokeColor=255, lights=[]){
                let centerX = p.windowWidth;
                let centerY = p.windowHeight;
                p.noFill();
                p.stroke(strokeColor);
                p.strokeWeight(2);
                let arcWidth = radius * 1.3;
                let arcHeight = radius * 0.8;
                p.strokeWeight(2);
                
                p.arc(centerX, centerY, arcWidth, arcHeight, p.PI, 3*p.HALF_PI);
                
                let numPoints = points.length; 
                
              
                for (let i = 0; i < numPoints; i++) {
                  let t = 0
                  if(shouldRotate){
                    if (rotateLeft){
                      t = ((i / (numPoints-1)) + (p.frameCount * 0.001) % 1) % 1;   
                    }else{
                      t = ((i / (numPoints-1)) + (p.frameCount * -0.002) % 1) % 1; 
                      if (t < 0) t += 1; 
                    }
                  } else{
                    t = i / (numPoints - 1);
                  }
                  let currentAngle =  p.lerp(p.PI + p.QUARTER_PI/8, 3*p.HALF_PI - p.QUARTER_PI/8, t); 
                  if(shouldRotate){
                    currentAngle = p.lerp(p.PI, 3*p.HALF_PI, t);
                  }
                  let px = centerX + (arcWidth / 2) * p.cos(currentAngle); 
                  let py = centerY + (arcHeight / 2) * p.sin(currentAngle);
                  
                  if (lights.length > 0) {
                    p.noStroke();
                    p.fill(255,255,255,1);

                    if (lights[i][0] >= lights[i][1]) {
                        lights[i][2] = -2;
                    }
                    if (lights[i][0] < 100) {
                        lights[i][2] = 2
                    }

                    if (isHovering(px, py, 10)){
                        lights[i][1] = 250;
                        if (lights[i][0] >= lights[i][1]){
                            lights[i][2] = 0;
                        } else if (lights[i][0] > lights[i][1]){
                            lights[i][0] = lights[i][1];
                        } else{
                            lights[i][2] = 6;
                        }
                        p.cursor(p.HAND);
                        if (p.mouseIsPressed) {
                            router.push(`/people/${points[i].toLowerCase()}`); // Navigate to a page based on the item's name
                        }
                    } else if (i != randomNum){
                        lights[i][1] = 100;
                    }

                    if (i == randomNum){
                        lights[i][1] = 220;
                    }

                    
                    lights[i][0] += lights[i][2]
  
                    for(let j = 0; j < lights[i][0]; j++){
                        p.ellipse(px,py, j*0.3);
                    }
                  }
              
                  // TEXT
                  p.stroke(strokeColor);
                  p.fill(strokeColor);
                  p.circle(px, py, 10);
              
                  p.fill(strokeColor);
                  p.textSize(20);
                  p.noStroke();
              
                  if(i % 2 == 0){
                    p.textAlign(p.LEFT, p.TOP);
                    p.text(points[i], px + 10, py + 10); 
                    p.noStroke();
                  }else{
                    p.textAlign(p.RIGHT, p.BOTTOM);
                    p.text(points[i], px - 10, py - 10); 
                  }
                }
              }
            }
        const peopleMenu = new p5(sketch, canvasRef.current);
        return () => { 
            peopleMenu.remove()
        };
    }, [])
    return <div ref={canvasRef}></div>;
}

export default PeopleMenu