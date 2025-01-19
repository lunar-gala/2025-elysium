'use client';  // Add this line at the top
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Define the parameters of the ellipse
  const cx = 50; // Center x-coordinate as a percentage of container width
  const cy = 25; // Center y-coordinate as a percentage of container height
  const rx = 50; // Horizontal radius as percentage of container width
  const ry = 10; // Vertical radius as percentage of container height

  // Define angles for the diagonal from bottom-middle to bottom-left
  const angles = [Math.PI * 1.2, Math.PI * 1.3, Math.PI * 1.4]; // Spread diagonally

  // Calculate circle positions using the ellipse equation
  const circles = angles.map((theta) => {
    const x = cx + rx * Math.cos(theta); // x-coordinate as percentage of container width
    const y = cy + ry * Math.sin(theta); // y-coordinate as percentage of container height
    const flippedY = 2 * cy - y; // Flip y-coordinate across the center (X-axis) of the oval
    return { x, y: flippedY }; // Return flipped positions
  });

  // Define bottom ellipse position and its radius
  const bottomEllipse = { x: 50, y: 80+20*screenWidth/screenHeight*0.5, rx: 20, ry: 20*screenWidth/screenHeight }; // Horizontal, vertical radii for the bottom ellipse

  // Calculate the positions for the 3 circles spread evenly from top middle to right of the bottom ellipse
  const numCircles = 3;
  const rotationCircles = Array.from({ length: numCircles }).map((_, index) => {
    const angle = Math.PI / 2 - (index / (numCircles - 1)) * (Math.PI / 2); // Evenly spread between top middle and right of the ellipse
    const x = bottomEllipse.x + bottomEllipse.rx * Math.cos(angle); // x-position around the ellipse
    const y = bottomEllipse.y + bottomEllipse.ry * Math.sin(angle); // y-position around the ellipse
    return { x, y };
  });

  // Flip the circles across the X-axis of the bottom ellipse
  const flippedCircles = rotationCircles.map(circle => ({
    x: circle.x, // x-coordinate stays the same
    y: 2 * bottomEllipse.y - circle.y, // Mirror the y-coordinate across the X-axis
  }));

  return (
    <div className="hero-section">
      <main className="main-content">
        {/* Background Video */}
        <video
          autoPlay
          loop
          playsInline
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1, // Ensure the video stays in the background
          }}
        >
          <source src="./dune.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h1 className="title">Act I: Emergence</h1>
        <p className="subtitle">
          The dawn of your journey, brimming with hope, passion, and light.
          Untouched by the world's challenges, yet poised to embrace it all.
        </p>
      </main>

      {/* Updated SVG Oval */}
      <div className="oval-container">
        <svg
          className="oval"
          viewBox="0 0 100 50" // Viewbox to fit the circle into the container
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <ellipse
            className = "bottom-half"
            cx={`${cx}%`}
            cy={`${cy}%`}
            rx={`${rx}%`}
            ry={`${ry}%`}
            stroke="white"
            fill="none"
            opacity="0.25"
            strokeWidth="0.1"
            strokeDasharray="100 80"  /* Adjust values to control solid vs dashed parts */
            strokeDashoffset="100"
          />
          <ellipse
            className = "bottom-half"
            cx={`${cx}%`}
            cy={`${cy}%`}
            rx={`${rx}%`}
            ry={`${ry}%`}
            stroke="white"
            fill="none"
            opacity="0.25"
            strokeWidth="0.1"
            strokeDasharray="0.1 0.3"  /* Small dot followed by a gap */
            strokeLinecap="round"  /* Makes dots rounded */

          />
          {circles.map((circle, index) => (
            <circle
              key={index}
              cx={`${circle.x}%`} // Circle position as percentage of container width
              cy={`${circle.y}%`} // Circle position as percentage of container height
              r="0.01vw"
              fill="white"
              className="glow-circle"
            />
          ))}

          {/* Bottom Ellipse */}
          <ellipse
            cx={`${bottomEllipse.x}%`}
            cy={`${bottomEllipse.y}%`}
            rx={`${bottomEllipse.rx}%`}
            ry={`${bottomEllipse.ry}%`}
            stroke="white"
            fill="none"
            opacity="0.25"
            strokeWidth="0.1"
          />

          {/* Rotating Circles (3 evenly spaced from top middle to right) */}
          

          {/* Flipped Circles (3 evenly spaced from top middle to left, mirrored across X-axis) */}
          {flippedCircles.map((circle, index) => (
            <circle
              key={index}
              cx={`${circle.x}%`} // Circle position on the ellipse path
              cy={`${circle.y}%`} // Circle position on the ellipse path (mirrored)
              r="0.01vw" // Size of the flipped circles
              fill="white"
              className="glow-circle"
            />
          ))}
        </svg>

        {/* Labels */}
        {circles.map((circle, index) => (
          <span
            key={index}
            className="label"
            style={{
              position: "absolute",
              top: `${circle.y + 3}%`, // Adjusted further below the circle
              left: `${circle.x}%`, // Horizontally aligned with the circle
              transform: "translateX(-50%)", // Horizontally center the label
              color: "white",
              fontSize: "1vw", // Use viewport width for dynamic font sizing
              whiteSpace: "nowrap",
            }}
          >
            Model Line {String.fromCharCode(65 + index)} {/* A, B, C */}
          </span>
        ))}
        {flippedCircles.map((circle, index) => (
          <span
            key={index}
            className="label"
            style={{
              position: "absolute",
              top: `${circle.y + 3}%`, // Adjusted further below the circle
              left: `${circle.x}%`, // Horizontally aligned with the circle
              transform: "translateX(-50%)", // Horizontally center the label
              color: "white",
              fontSize: "1vw", // Use viewport width for dynamic font sizing
              whiteSpace: "nowrap",
            }}
          >
            Act {index+1} {/* A, B, C */}
          </span>
        ))}

        {/* Label for the bottom ellipse */}
        <span
          className="label"
          style={{
            position: "absolute",
            top: `${bottomEllipse.y + 2}%`,
            left: `${bottomEllipse.x}%`,
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "1vw",
            whiteSpace: "nowrap",
          }}
        >
        </span>
      </div>
    </div>
  );
};

export default HeroSection;

