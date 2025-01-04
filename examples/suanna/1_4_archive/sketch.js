function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	angleMode(DEGREES);
}

const trans = 2000;
const colors = [[146, 153, 166], [42, 66, 46], [28, 45, 128], [138, 85, 39]];
const acts = ['Emergence', 'Blossom', 'Hubris', 'Embrace'];

let oldMillis = 0;
let count = 0;

let stage = 0;
let oldStage = 0;

let archive = false;
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
	rectMode(CENTER);
	var row1 = ["PRINT", "MOTION", "PHOTO"];
	var row2 = ["STAGE", "SOUND"];
	for (var i = 0; i < 3; i ++) {
		rect(windowWidth/4 + windowWidth/4 * i, windowHeight/2, 150, 150);
		text(row1[i], windowWidth/4 + windowWidth/4 * i, windowHeight/2 - 100);
	} for (i = 0; i < 2; i ++) {
		rect(windowWidth/3 + windowWidth/3 * i, 4 * windowHeight/5, 150, 150);
		text(row2[i], windowWidth/3 + windowWidth/3 * i, 4 * windowHeight/5 - 100);
	}
	rectMode(CORNER);
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
	if (archive == false) {
		h1();
		text(acts[stage], windowWidth/2, windowHeight/3);
	} else {
		if (millisecond < 3 * trans) {
			archiveHome = false;
			h1();
			text("Archive", windowWidth/2, windowHeight/3);
			h2();
			text("Documenting our journey for future travelers.\nIntroducing Archive: a collection of all creative work for Elysium. ",windowWidth/2, 2 * windowHeight/3)
		} else if (millisecond < 4 * trans) {
			y = map(millisecond, 3 * trans, 4 * trans, windowHeight/3, windowHeight/8);
			h1();
			text("Archive", windowWidth/2, y);
			textOpacity = map(millisecond, 3 * trans, 4 * trans, 255, 0);
			h2();
			fill(255, 255, 255, textOpacity);
			text("Documenting our journey for future travelers.\nIntroducing Archive: a collection of all creative work for Elysium. ",windowWidth/2, 2 * windowHeight/3)
		} else {
			archiveHome = true;
			h1();
			text("Archive", windowWidth/2, windowHeight/8);
			drawArchiveHome();
		}
		
	}
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
	if (archive == false && direction < 99) {
		if (millisecond < trans) {
			curColor = interpColor(map(millisecond, 0, trans/2, 0, 1), colors[oldStage], colors[stage]);
			opacity = map(millisecond, 0, trans/2, 0, 255);
			fill(curColor[0],curColor[1],curColor[2]);
		} else {
			fill(colors[stage][0],colors[stage][1],colors[stage][2]);
		}
	} else if (archive == true) {
		if (millisecond < trans) {
			curColor = interpColor(map(millisecond, 0, trans/2, 0, 1), colors[oldStage], [0, 0, 0]);
			opacity = map(millisecond, 0, trans/2, 0, 255);
			fill(curColor[0],curColor[1],curColor[2]);
		} else {
			fill(0);
		}
	} else {
		if (millisecond < trans) {
			curColor = interpColor(map(millisecond, 0, trans/2, 0, 1), [0, 0, 0], colors[stage]);
			opacity = map(millisecond, 0, trans/2, 0, 255);
			fill(curColor[0],curColor[1],curColor[2]);
		} else {
			fill(colors[stage][0],colors[stage][1],colors[stage][2]);
		}
		
	}

	
	rect(0, 0, windowWidth, windowHeight);
}

function drawCircle() {
	var opacity = 255;
	var x0;
	var y0;
	
	var x1;
	var y1;
	
	var x2;
	var y2;
	
	var x3;
	var y3;
	
	if (archive == false && direction < 99) {
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
		
		cX = windowWidth/2;
		cY = windowHeight;
		
	} else if (archive == false && direction == 99999) {
		if (millisecond < trans) {
			cY= map(millisecond, 0, trans, -200, windowHeight);
		} else {
			cY = windowHeight;
		}
		x0 = windowWidth/2 - d/2;
		y0 = cY;

		x1 = windowWidth/2;
		y1 = cY - d/2;

		x2 = windowWidth/2 + d/2;
		y2 = cY;

		x3 = windowWidth/2;
		y3 = cY + d/2;
		
		cX = windowWidth/2;
	} else {
		if (millisecond < 4 * trans) {
			opacity = map(millisecond, 3 * trans, 4 * trans, 255, 0);
		} else if (archiveHome == true) {
			opacity = 0;
		}
		if (millisecond < trans) {
			cY= map(millisecond, 0, trans, windowHeight, -200);
		} else {
			cY = -200;
		}
		x0 = windowWidth/2 - d/2;
		y0 = cY;

		x1 = windowWidth/2;
		y1 = cY - d/2;

		x2 = windowWidth/2 + d/2;
		y2 = cY;

		x3 = windowWidth/2;
		y3 = cY + d/2;
		
		cX = windowWidth/2;
	}
	
	noFill();
	stroke(opacity)
	circle(cX, cY, d);
	noStroke();
	fill(opacity);
	circle(cX, cY, d/3);
	circle(x0, y0, 30);
	circle(x1, y1, 30);
	circle(x2, y2, 30);
	circle(x3, y3, 30);
}

function drawNavBar() {
	if (archive == false && direction < 99) {
		cY = windowHeight/32;
	} else if (archive == true) {
		if (millisecond < trans) cY = map(millisecond, 0, trans, windowHeight/32, - windowHeight); 
		else {cY = -100};
	} else if (archive == false){
		if (millisecond < trans) cY = map(millisecond, 0, trans, - windowHeight, windowHeight/32);
		else cY = cY = windowHeight/32;
	}
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
	if (archive == false) {
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
	if (key == 'ArrowUp') {
		if (archive == false) {
			archive = true;
			oldMillis = millis()*1.0;
			direction = 99999;
		}
	} else if (key == 'ArrowDown') {
		if (archive == true) {
			archive = false;
			archiveHome = false;
			oldMillis = millis()*1.0;
			direction = 99999;
		}
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

