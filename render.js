var cvs;
var ctx;
var centX;
var centY;
var stroke;
var radius;
var targetAngle;
var drawTime;

$(document).ready(function() {
	cvs = document.getElementById("cvs");
	ctx = cvs.getContext("2d");
	centX = $('#cvs').width() / 2;
	centY = $('#cvs').height() / 2;
	stroke = 62.5;
	radius = ((centX + centY) / 2) - (stroke / 2);

	drawBG();
	targetAngle = drawAntiTarget();
});

function normalize(angle) {
	var newAngle = angle % 360;

	if (angle < 0) {
		newAngle += 360;
	}

	return newAngle;
}

function drawBG() {
	ctx.beginPath();
	ctx.arc(centX, centY, radius, 0, 2 * Math.PI);
	ctx.lineWidth = stroke;
	ctx.strokeStyle = 'gray';
	ctx.stroke();

	// console.log("Cirle drawn...");
	// console.log("Center: " + centX + ", " + centY);
	// console.log("Radius: " + radius);
	// console.log("Stroke: " + stroke);
}

function drawAntiTarget() {
	var angle = Math.floor(Math.random() * 360);
	var x = Math.cos(angle * (Math.PI / 180)) * radius;
	var y = Math.sin(angle * (Math.PI / 180)) * radius;

	ctx.beginPath();
	ctx.arc(x + centX, y + centY, stroke / 2, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	
	console.log("Anti-target drawn...");
	console.log("Angle: " + normalize(angle + 90));
	// console.log("Center: " + (x + centX) + ", " + (y + centY));
	// console.log("Radius: " + stroke / 2);
	console.log("Target angle: " + normalize(angle - 90));

	var d = new Date();
	drawTime = d.getTime();
	

	return ((angle - 90) % 360);
}