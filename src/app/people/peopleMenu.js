"use client"

import React, {useRef, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import p5 from "p5";

const PeopleMenu = () => {
    const canvasRef = useRef();
    // const navigate = useNavigate();
    useEffect(() => {
        const sketch = (p) => {
            let randomNum = 0;

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
                ring(p.windowWidth*1.2, ['PRODUCERS', 'DESIGN', 'MODEL', 'PRODUCTION','CREATIVE', 'PR', 'HAIR & MAKEUP', 'DANCE'], false, false, 255, true);
                ring(p.windowWidth*0.9, ['', '', '', ''], true, true, 200, false);
                ring(p.windowWidth*0.6, ['', '', '', '', '', '', ''], true, false, 200, false);
            }
              
            function ring(radius, points = [], shouldRotate=false, rotateLeft=false,strokeColor=255, addLights = false){
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
                      t = ((i / (numPoints-1)) + (p.frameCount * 0.006) % 1) % 1;   
                    }else{
                      t = ((i / (numPoints-1)) + (p.frameCount * -0.005) % 1) % 1; 
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
                  
                  if (addLights) {
                    p.noStroke();
                    p.fill(255,255,255,1);
                    let numCircles = 140;
                    if (i == randomNum){
                        numCircles = 200;
                    }
                    if (isHovering(px, py, 10)){
                      numCircles = 250;
                      p.cursor(p.HAND);
                      // Navigate to new page 
                      if (p.mouseIsPressed) {
                        // navigate(`/${points[i].toLowerCase()}`); 
                        console.log('selected', points[i]);
                      }
                    }
                    for(let j = 0; j < numCircles; j++){
                        p.ellipse(px,py, j*0.3);
                    }
                  }
              
                  p.stroke(strokeColor);
                  p.fill(strokeColor);
                  p.circle(px, py, 10);
              
                  p.fill(strokeColor);
                  p.textSize(20);
                  p.textFont('Courier New');
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
    // }, [navigate])
    return <div ref={canvasRef}></div>;
}

export default PeopleMenu