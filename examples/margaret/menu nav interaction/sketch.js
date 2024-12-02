function setup() {
  createCanvas(400, 400);  
}

let colors = [
  [['#d1f0b1', 0.25], ['#b6cb9e', 0.5], ['#62a87c', 1]], 
  [['#a5c4d4', 0.25], ['#92b9bd', 0.5], ['#276fbf', 1]], 
  [['#e3d87e', 0.25], ['#f4e285', 0.5], ['#f2f79e', 1]]
];
let menu = [['Home', 30, 200, 200], ['Lines', 140, 200, 200], ['People', 250, 200, 200]];
let backgroundColor = 220;

function isMouseInsideText(message, messageX, messageY) {
  const messageWidth = textWidth(message);
  const messageTop = messageY - textAscent();
  const messageBottom = messageY + textDescent();

  return mouseX > messageX && mouseX < messageX + messageWidth &&
    mouseY > messageTop && mouseY < messageBottom;
}

function mouseMoved() {
  let message;
  for (let i = 0; i < menu.length; i++){
    message = menu[i];
    if (isMouseInsideText(message[0], message[1], message[3])) {
      message[2] = 190;
    } else {
      message[2] = 200;
    }  
  }
}

function draw() {
  let hovered = false
  background(backgroundColor);
  textSize(32);
  for (let i = 0; i < menu.length; i++){
    message = menu[i];
    if (message[2] == 190){
      line(message[1], 200, message[1] + textWidth(message[0]), 200)
      fill(paletteLerp(colors[i], millis() / 10000 % 1));  
      stroke(paletteLerp(colors[i], millis() / 10000 % 1))
      backgroundColor = 0xffffffff
      hovered = true;
      
    } else{
      fill(0);
    }
    text(message[0], message[1], message[2]);
  }
  if (!hovered){
          backgroundColor = 220;

  }
}