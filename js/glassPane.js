const sections = 7;
let glass = [];

let time = 0;
let points = [];
let inc = 2;
let explode = false;
var canvas;
function setup() {
	background(0, 0, 0, 0);
	pixelDensity(1);
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	let incx = windowWidth / sections;
	let incy = windowHeight / sections;
	canvas.parent("FlowField-holder");
	centerCanvas();
	let range = 80;
	let zrange = 100;
	for (let i = 0; i < sections + 1; i++) {
		for (let j = 0; j < sections + 1; j++) {
			let xr = 0;
			let yr = 0;
			let zr = 0;
			if (j != 0 && j + 1 != sections + 1) {
				xr = floor(random(range) - range);
			}
			if (i != 0 && i + 1 != sections + 1) {
				yr = floor(random(range) - range);
			}
			if (xr != 0 && yr != 0) {
				zr = random(-zrange, zrange);
			}
			points[i * (sections + 1) + j] = createVector(
				j * incx + xr,
				i * incy + yr,
				zr
			);
		}
	}
	frameRate(30);
	let gsections = sections;
	for (let y = 0; y < gsections; y++) {
		for (let x = 0; x < gsections; x++) {
			glass[y * gsections + x] = new Glass(
				points[y * (sections + 1) + x],
				points[y * (sections + 1) + x + 1],
				points[(y + 1) * (sections + 1) + x]
			);
			glass[gsections * gsections + y * gsections + x] = new Glass(
				points[y * (sections + 1) + x + 1],
				points[(y + 1) * (sections + 1) + x + 1],
				points[(y + 1) * (sections + 1) + x]
			);
		}
	}

	frameRate(30);

	window.onresize = windowResized;
	centerCanvas();
}

function centerCanvas() {
	canvas.position(0, 0);
}

function windowResized() {
	if (
		windowWidth != canvas.size().width ||
		windowHeight != canvas.size().height
	) {
		if (!explode) {
			let incx = windowWidth / sections;
			let prevIncx = canvas.size().width / sections;
			let prevIncy = canvas.size().height / sections;
			let incy = windowHeight / sections;
			for (let i = 0; i < sections + 1; i++) {
				for (let j = 0; j < sections + 1; j++) {
					points[i * (sections + 1) + j].add(
						createVector(
							j * (incx - prevIncx),
							i * (incy - prevIncy),
							0
						)
					);
				}
			}
			for (let g of glass) {
				g.recalculateCenter();
			}
		}
		resizeCanvas(windowWidth, windowHeight);
		centerCanvas();
	}
}

function draw() {
	time += 0.04;
	let yoff = 0;
	for (let i = 0; i < sections + 1; i++) {
		let xoff = 0;
		for (let j = 0; j < sections + 1; j++) {
			if (
				i == 0 ||
				j == 0 ||
				i + 1 == sections + 1 ||
				j + 1 == sections + 1
			) {
				continue;
			}
			xoff += inc;
			points[i * (sections + 1) + j].z = map(
				noise(xoff, yoff, time),
				0,
				1,
				-100,
				300
			);
		}
		yoff += inc;
	}
	translate(-windowWidth / 2, -windowHeight / 2);
	background(220);
	let r = 51,
		g = 91,
		b = 107;
	ambientMaterial(255);
	strokeWeight(0);
	ambientLight(0, 100, 200, 0);
	pointLight(200, 200, 200, windowWidth / 2, windowHeight / 2, -1);
	pointLight(200, 200, 200, windowWidth / 2, windowHeight, 1);
	push();
	translate(windowWidth / 2, windowHeight / 2, -150);
	pop();
	if (time > 2 && !explode) {
		explode = true;
		for (let g of glass) {
			g.explode();
		}
	}
	for (let g of glass) {
		if (explode) {
			g.addRot(0.1);
		}
		g.render();
	}
}
