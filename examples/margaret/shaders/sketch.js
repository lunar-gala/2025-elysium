let video;
let warp;

let warpSrc = `
precision highp float;

uniform sampler2D tex0;
uniform vec2 uMouse; // Mouse position in normalized coordinates (0-1)
uniform float uRadius; // Radius of the effect (in normalized coordinates)
uniform float uIntensity; // Intensity of the distortion
varying vec2 vTexCoord;

void main() {
  // Calculate the distance from the current pixel to the mouse position
  vec2 delta = vTexCoord - uMouse;
  float distance = length(delta);

  // Check if the pixel is within the radius of the effect
  if (distance < uRadius) {
    // Calculate the warping factor (stronger near the center, weaker near the edge)
    float factor = (uRadius - distance) / uRadius * uIntensity;

    // Apply a radial warp based on the factor
    vec2 warpedCoord = vTexCoord;
    warpedCoord.x += factor * sin(vTexCoord.y * 2.0);
    warpedCoord.y += factor * cos(vTexCoord.x * 2.0);

    // Sample the warped texture coordinate
    gl_FragColor = texture2D(tex0, warpedCoord);
  } else {
    // If outside the effect radius, sample the texture normally
    gl_FragColor = texture2D(tex0, vTexCoord);
  }
}
`;

function setup() {
  createCanvas(400, 400, WEBGL);

  // Load the video
  video = createVideo(
    'https://upload.wikimedia.org/wikipedia/commons/d/d2/DiagonalCrosswalkYongeDundas.webm'
  );
  video.volume(0);
  video.hide();
  video.loop();

  // Create and configure the shader
  warp = createFilterShader(warpSrc);
  warp.setUniform('uRadius', 0.1); // Radius of effect
  warp.setUniform('uIntensity', 0.2); // Intensity of warping
}

function draw() {
  background(255);

  // Update mouse position (normalized)
  let mouseNorm = [mouseX / width, mouseY / height]; // Flip Y-axis for WebGL
  warp.setUniform('uMouse', mouseNorm);

  // Draw the video and apply the shader
  push();
  imageMode(CENTER);
  image(video, 0, 0, width, height);
  pop();

  // Apply the warp effect
  filter(warp);
}