"use client"

import React, {useRef, useEffect} from "react";
import p5 from "p5";
import BackButton from "./utils";
import "./utils.css"

const TeamPictures = ({team, department, numDepartmentTeams, people}) => {
    const canvasRef = useRef();
    
    useEffect(() => {
        const sketch = (p) => {
            let teams = [];
            let lights = []; 
            let randomNum = 0;
            let names = [];
            let roles = [];
            for(let i = 0; i < numDepartmentTeams; i++){
                teams.push('')
            }

            for(let i = 0; i < people.length; i++){
                names.push(people[i].name);
            }

            for(let i = 0; i < people.length; i++){
                roles.push(people[i].role);
            }

            function isHovering(x, y, radius) {
                let d = p.dist(p.mouseX, p.mouseY, x, y);
                return d < radius; 
            }

            p.setup = () =>{
                p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
                for (let i = 0; i < names.length; i++) {
                    lights.push([600, 600, 0]); // [current intensity, max intensity, increment]
                }
                setInterval(() => {
                    randomNum = Math.floor(p.random(names.length));
                }, 900);
            }

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
            
              
            p.draw = () => {
                p.background(0);
                p.cursor(p.ARROW);
                pictures();
                ring(p.windowWidth*1.6, teams, true, true, 180);
            }

            function drawLight(x, y, i, circleDiameter) {
                p.noStroke();
                p.fill(255, 255, 255, 2);
            
                // Adjust light intensity
                if (lights[i][0] >= lights[i][1]) {
                  lights[i][2] = -2;
                }
                if (lights[i][0] < 600) {
                  lights[i][2] = 2;
                }
            
                // Check hover state
                if (isHovering(x, y, circleDiameter / 2)) {
                  lights[i][1] = 750;
                  if (lights[i][0] >= lights[i][1]) {
                    lights[i][2] = 0;
                  } else {
                    lights[i][2] = 6;
                  }
                } else if(i != randomNum) {
                  lights[i][1] = 600;
                }
              
                if (i == randomNum){
                  lights[i][1] = 700;
                }
            
                // Update intensity
                lights[i][0] += lights[i][2];
                for(let j = 0; j < lights[i][0]; j++){
                  p.ellipse(x,y, j*0.3);
                }
            }

            function pictures(){
                p.textAlign(p.CENTER, p.CENTER);
                p.textFont('Arial');

                let circleDiameter = 150; // Diameter of the circles
                let spacingX = circleDiameter * 1.5; // Horizontal spacing
                let spacingY = circleDiameter * 1.8; // Vertical spacing

                // Calculate the number of columns based on available width
                let cols = Math.max(1, Math.floor((p.windowWidth - spacingX - 50) / spacingX));

                // Calculate the required number of rows based on total items
                let rows = Math.ceil(names.length / cols);
                p.resizeCanvas(p.windowWidth, (rows+1) * spacingY)

                let startX = (p.windowWidth - (cols - 1) * spacingX) / 2 + 100; // Center horizontally
                let startY = spacingY; // Center vertically

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        let index = row * cols + col;
                        if (index >= names.length) break; // Avoid exceeding the number of items

                        let x = startX + col * spacingX;
                        let y = startY + row * spacingY;
                        if (row % 2 == 1){
                            x += spacingX / 3;
                        }
                        
                        if (col % 2 == 1){
                            y -= spacingY / 4;
                        }
                    
                        p.push();
                        drawLight(x, y, index, circleDiameter);
                        p.pop();

                        p.push();
                        p.fill(100); 
                        p.noStroke();
                        p.ellipse(x, y, circleDiameter);
                        p.pop();
                    


                        // Draw name text
                        p.noStroke();
                        p.fill(255); 
                        p.textSize(16);
                        p.textStyle(p.NORMAL);
                        p.text(names[index], x, y + circleDiameter / 2 + 20);

                        // Draw role text
                        p.textSize(12);
                        p.textStyle(p.ITALIC);
                        p.fill(150); 
                        p.text(roles[index], x, y + circleDiameter / 2 + 40);
                    }
                }
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
                  let currentAngle =  p.lerp(p.PI + p.QUARTER_PI/4, 3*p.HALF_PI - p.QUARTER_PI/4, t); 
                  if(shouldRotate){
                    currentAngle = p.lerp(p.PI, 3*p.HALF_PI, t);
                  }
                  let px = centerX + (arcWidth / 2) * p.cos(currentAngle); 
                  let py = centerY + (arcHeight / 2) * p.sin(currentAngle);

                  p.stroke(strokeColor);
                  p.fill(strokeColor);
                  p.circle(px, py, 10);
                }
              }
            }
        const peopleMenu = new p5(sketch, canvasRef.current);
        return () => { 
            peopleMenu.remove()
        };
    }, [])
    return (
        <div className="relative w-full h-full">
          <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full "></div>
          <div className="absolute top-5 left-5 z-10">
            <h1 className="heading">{team}</h1>
            <BackButton prevText={department} prevURL= {`/people/${department.toLowerCase()}`}/>
          </div>
        </div>
      );
}

export default TeamPictures;