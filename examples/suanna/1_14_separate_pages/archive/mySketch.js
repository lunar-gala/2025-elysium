function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	angleMode(DEGREES);
}

const trans = 2000;

let oldMillis = 0;
let count = 0;

const teams = ['Web', 'Print', 'Photo', 'Stage', 'Sound'];

let team = 0;
let oldTeam = 0;

let archiveHome = false;

let d = 500;

var direction = 1;

function h1() {
	textSize(100);
	textStyle(BOLD);
}

function h2(){
	textSize(14);
	textStyle(NORMAL);
}

function drawArchiveHome() {
	h2();
	text("tbdd....", windowWidth/2, windowHeight/2);
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
	
	if (millisecond < 3 * trans) {
		archiveHome = false;
		h1();
		text("Archive: " + teams[team], windowWidth/2, windowHeight/3);
		h2();
		text("Documenting our journey for future travelers.\nIntroducing Archive: a collection of all creative work for Elysium. ",windowWidth/2, windowHeight/2 + 60)
	} else if (millisecond < 4 * trans) {
		y = map(millisecond, 3 * trans, 4 * trans, windowHeight/3, windowHeight/8);
		h1();
		text("Archive: " + teams[team], windowWidth/2, y);
		textOpacity = map(millisecond, 3 * trans, 4 * trans, 255, 0);
		h2();
		fill(255, 255, 255, textOpacity);
		text("Documenting our journey for future travelers.\nIntroducing Archive: a collection of all creative work for Elysium. ",windowWidth/2, windowHeight/2 + 60)
	} else {
		archiveHome = true;
		h1();
		text("Archive: " + teams[team], windowWidth/2, windowHeight/8);
		drawArchiveHome();
	}
		
	textAlign(CENTER, CENTER);
	
	drawCircle();
	
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
	fill(0);
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

function keyPressed() {
	if( key == 'ArrowLeft') {
		oldTeam = team;
		team = (team - 1)%4;
		oldMillis = millis()*1.0;
		direction = -1;
		if (team < 0) team += 4;
	} else if (key == 'ArrowRight') {
		oldTeam = team;
		team = (team + 1)%4;
		oldMillis = millis()*1.0;
		direction = 1;
	}
}