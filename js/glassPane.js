const sections = 7;
let glass = [];

let time = 0;
let points = [];
let inc = 2;
let explode = false;
var vs = [

	// Precision
	'precision mediump float;',

	// Lights
	'#define LIGHTS ' + lights,

	// Attributes
	'attribute float aSide;',
	'attribute vec3 aPosition;',
	'attribute vec3 aCentroid;',
	'attribute vec3 aNormal;',
	'attribute vec4 aAmbient;',
	'attribute vec4 aDiffuse;',

	// Uniforms
	'uniform vec3 uResolution;',
	'uniform vec3 uLightPosition[LIGHTS];',
	'uniform vec4 uLightAmbient[LIGHTS];',
	'uniform vec4 uLightDiffuse[LIGHTS];',

	// Varyings
	'varying vec4 vColor;',

	// Main
	'void main() {',

	// Create color
	'vColor = vec4(0.0);',

	// Calculate the vertex position
	'vec3 position = aPosition / uResolution * 2.0;',

	// Iterate through lights
	'for (int i = 0; i < LIGHTS; i++) {',
	'vec3 lightPosition = uLightPosition[i];',
	'vec4 lightAmbient = uLightAmbient[i];',
	'vec4 lightDiffuse = uLightDiffuse[i];',

	// Calculate illuminance
	'vec3 ray = normalize(lightPosition - aCentroid);',
	'float illuminance = dot(aNormal, ray);',
	'if (aSide == 0.0) {',
	'illuminance = max(illuminance, 0.0);',
	'} else if (aSide == 1.0) {',
	'illuminance = abs(min(illuminance, 0.0));',
	'} else if (aSide == 2.0) {',
	'illuminance = max(abs(illuminance), 0.0);',
	'}',

	// Calculate ambient light
	'vColor += aAmbient * lightAmbient;',

	// Calculate diffuse light
	'vColor += aDiffuse * lightDiffuse * illuminance;',
	'}',

	// Clamp color
	'vColor = clamp(vColor, 0.0, 1.0);',

	// Set gl_Position
	'gl_Position = vec4(position, 1.0);',

	'}'

	// Return the shader
].join('\n');
var fs = [

	// Precision
	'precision mediump float;',

	// Varyings
	'varying vec4 vColor;',

	// Main
	'void main() {',

	// Set gl_FragColor
	'gl_FragColor = vColor;',

	'}'

	// Return the shader
].join('\n');
var canvas;


function setup() {
	background(0, 0, 0, 0);
	pixelDensity(1);
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	let incx = windowWidth / sections;
	let incy = windowHeight / sections;
	canvas.parent('FlowField-holder');
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
			points[i * (sections + 1) + j] = createVector(j * incx + xr, i * incy + yr, zr);
		}
	}
	frameRate(30);
	let gsections = sections;
	for (let y = 0; y < gsections; y++) {
		for (let x = 0; x < gsections; x++) {
			glass[y * gsections + x] = new Glass(points[y * (sections + 1) + x], points[y * (sections + 1) + x + 1], points[(y + 1) * (sections + 1) + x]);
			glass[gsections * gsections + y * gsections + x] = new Glass(points[y * (sections + 1) + x + 1], points[(y + 1) * (sections + 1) + x + 1], points[(y + 1) * (sections + 1) + x]);
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
	if (windowWidth != canvas.size().width || windowHeight != canvas.size().height) {

		if (!explode) {
			let incx = windowWidth / sections;
			let prevIncx = canvas.size().width / sections;
			let prevIncy = canvas.size().height / sections;
			let incy = windowHeight / sections;
			for (let i = 0; i < sections + 1; i++) {
				for (let j = 0; j < sections + 1; j++) {
					points[i * (sections + 1) + j].add(createVector(j * (incx - prevIncx), i * (incy - prevIncy), 0));
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
	time += .04;
	let yoff = 0;
	for (let i = 0; i < sections + 1; i++) {

		let xoff = 0;
		for (let j = 0; j < sections + 1; j++) {
			if (i == 0 || j == 0 || i + 1 == sections + 1 || j + 1 == sections + 1) {
				continue;
			}
			xoff += inc;
			points[i * (sections + 1) + j].z = map(noise(xoff, yoff, time), 0, 1, -100, 300);
		}
		yoff += inc;
	}
	translate(-windowWidth / 2, -windowHeight / 2);
	background(220);
	// shader(mandel);
	let r =51, g = 91, b = 107;
	ambientLight(0, 100, 200, 0);
	pointLight(200,200,200, windowWidth/2, windowHeight/2, -1);
	strokeWeight(0);
	pointLight(200,200,200, windowWidth/2, windowHeight, 1);
	// pointLight(200,200,200, windowWidth/2, windowHeight/2, 1);
	// pointLight(r, g, b, 0, 0, -1);
	// pointLight(r, g, b, 0, 0, -1);
	// pointLight(r, g, b, 0, 0, -1);
	// pointLight(r, g, b, 0, 0, -1);
	ambientMaterial(255);
	push();
	translate(windowWidth / 2, windowHeight / 2, -150);
	// pointLight(255, 50, 100, windowWidth / 2, windowHeight / 2, 200);
	// pointLight(255, 50, 100, windowWidth / 2, windowHeight / 2, 200);
	pop();

	// pointLight(255, 50, 100, windowWidth / 2, windowHeight / 2, 100);
	// pointLight(255, 50, 100, windowWidth / 2, windowHeight / 2, 100);
	if (time > 2 && !explode) {
		explode = true;
		for (let g of glass) {
			// g.explode();
		}
	}
	for (let g of glass) {
		if (explode) {
			// g.addRot(.1);
		}
		g.render();
	}
}