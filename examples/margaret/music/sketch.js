let music;
let img;
let toggleButton;


function preload() {
  music = loadSound('background.mp3'); 
  img = loadImage('music-435.png');
}

function setup() {
  createCanvas(400, 400);
  music.loop(true);
}

function draw() {
  background(220);

  fill(240);
  noStroke();
  circle(350, 350, 50);
  image(img, 325, 325, 50, 50);
  if (!music.isPlaying()){
    stroke('black');
    line(330, 330, 370, 370);
  }

}

function mousePressed() {
  let d = dist(mouseX, mouseY, 350, 350);
  if (d < 25) { 
    toggleMusic();
  }
}

function toggleMusic() {
  if (music.isPlaying()) {
    music.pause(); 
  } else {
    music.play(); 
  }
}