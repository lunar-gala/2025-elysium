function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	angleMode(DEGREES);
}
var direction = 1;

const trans = 2000;
const colors = [[146, 153, 166], [42, 66, 46], [28, 45, 128], [138, 85, 39]];
const acts = ['Emergence', 'Blossom', 'Hubris', 'Embrace'];

let oldMillis = 0;
let count = 0;

let stage = 0;
let oldStage = 0;

let d = 500;

function h1() {
	textSize(100);
	textStyle(BOLD);
}

function h2(){
	textSize(14);
	textStyle(NORMAL);
}

function draw() {
	background(255);
	
	millisecond = millis() - oldMillis;
	
	drawBackground();
	
	textOpacity = 255;
	if (millisecond < 2 * trans) {
		textOpacity = map(millisecond, trans, 2 * trans, 0, 255);
	} 
	
	fill(255, 255, 255, textOpacity);
	h1();
	text(acts[stage], windowWidth/2, windowHeight/3);
	textAlign(CENTER, CENTER);
	
	drawCircle();
	drawNavBar();
	
	if (millis() < 2* trans) {
		opacity = map(millis(), 2* trans, trans, 0, 255);
		length = map(millis(), 2 * trans, trans, 0, windowHeight/2);
		fill(0);
		fill(0);
		rect(0, 0, windowWidth, length);
		rect(0, windowHeight-length, windowWidth, length);		
		fill(255, 255, 255, opacity);
		text('Use Arrow Keys to Navigate', windowWidth/2, windowHeight/2);
	} 
}

function drawBackground() {
	if (millisecond < trans) {
		curColor = interpColor(map(millisecond, 0, trans/2, 0, 1), colors[oldStage], colors[stage]);
		opacity = map(millisecond, 0, trans/2, 0, 255);
		fill(curColor[0],curColor[1],curColor[2]);
	} else {
		fill(colors[stage][0],colors[stage][1],colors[stage][2]);
	}
	rect(0, 0, windowWidth, windowHeight);
}

function drawCircle() {
	noFill();
	stroke(255)
	circle(windowWidth/2, windowHeight, d);
	var x0;
	var y0;
	
	var x1;
	var y1;
	
	var x2;
	var y2;
	
	var x3;
	var y3;
	
	if (millisecond < trans) {
		interp = map(millisecond, 0, trans, 0, 90);
		x0 = -cos(interp) * (direction) * d/2 + windowWidth/2;
		y0 = -sin(interp) * d/2 + windowHeight;
		
		x1 = - cos(interp + 90) * (direction) * d/2 + windowWidth/2;
		y1 = - sin(interp + 90) * d/2 + windowHeight;
		
		x2 = - cos(interp + 180) * (direction) * d/2 + windowWidth/2;
		y2 = - sin(interp + 180) * d/2 + windowHeight;
		
		x3 = - cos(interp + 270) * (direction) * d/2 + windowWidth/2;
		y3 = - sin(interp + 270) * d/2 + windowHeight;
	} else {
		x0 = windowWidth/2 - d/2;
		y0 = windowHeight;
		
		x1 = windowWidth/2;
		y1 = windowHeight - d/2;
		
		x2 = windowWidth/2 + d/2;
		y2 = windowHeight;
		
		x3 = windowWidth/2;
		y3 = windowHeight + d/2;
	} 
	noStroke();
	fill(255);
	circle(x0, y0, 30);
	circle(x1, y1, 30);
	circle(x2, y2, 30);
	circle(x3, y3, 30);
}

function drawNavBar() {
	cY = windowHeight/32;
	noFill();
	stroke(255);
	h2();
	rect(windowWidth * 1/2 - windowWidth/8 - windowWidth/32, cY, windowWidth * 1/16, windowHeight/32);
	noStroke();
	fill(255);
	text('ABOUT', windowWidth * (1/2 - 1/8), cY + windowHeight/64);
	noFill();
	stroke(255);
	rect(windowWidth * 1/2 - windowWidth/32 , cY, windowWidth * 1/16, windowHeight/32);
	noStroke();
	fill(255);
	text('PEOPLE', windowWidth * (1/2), cY + windowHeight/64);
	noFill();
	stroke(255);
	rect(windowWidth * (1/2 + 1/8 - 1/32), cY, windowWidth * 1/16, windowHeight/32);
	noStroke();
	fill(255);
	text('TICKETS', windowWidth * (1/2 + 1/8), cY + windowHeight/64);
	noFill();
	noStroke();
}


function keyPressed() {
	if( key == 'ArrowLeft') {
		oldStage = stage;
		stage = (stage - 1)%4;
		oldMillis = millis()*1.0;
		direction = -1;
		if (stage < 0) stage += 4;
	} else if (key == 'ArrowRight') {
		oldStage = stage;
		stage = (stage + 1)%4;
		oldMillis = millis()*1.0;
		direction = 1;
	}
}

function interpColor(n, color1, color2) {
	newColor = [];
	if (n > 1) return color2;
	for (var i = 0; i < 3; i ++) {
		newColor[i] = color1[i] + (color2[i] - color1[i])*n;
	}
	return newColor;
}