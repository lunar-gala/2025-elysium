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
    warpedCoord.x += factor * sin(vTexCoord.y * 10.0);
    warpedCoord.y += factor * sin(vTexCoord.x * 10.0);

    // Sample the warped texture coordinate
    gl_FragColor = texture2D(tex0, warpedCoord);
  } else {
    // If outside the effect radius, sample the texture normally
    gl_FragColor = texture2D(tex0, vTexCoord);
  }
}