
var canvas;
var inc = 0.1;
var scl = 50;
var cols, rows;
var zoff = 0;
var particles = [];
var flowField = [];
var particleNum = 30;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  if(windowWidth < 768){
    particleNum = 15;
  }
  canvas.parent('FlowField-holder');
  cols = floor(width/scl);
  rows = floor(height/scl);
  for(var i = 0; i < particleNum; i++){
    particles[i] = new Particle();
  }
  background(52, 152, 219);
  frameRate(18);
}

function draw() {
  background(52, 152, 219, 13);
  var yoff = 0;
  for(var y = 0; y < rows; y++){
    var xoff = 0;
    for(var x = 0; x < cols; x++){
      var index = (x + y * cols);
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(4);
      flowField[index] = v;
      xoff += inc;
      //push();
      //translate(x * scl, y * scl);
      //rotate(v.heading());
      //line(0, 0, scl, 0);
      //pop();
    }
    yoff+=inc;
  }
    zoff +=.005;
    stroke(169, 232, 250, 200);
    strokeWeight(1);
    for(var i = 0; i < particles.length; i++){
      particles[i].follow(flowField);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
}

window.onresize = windowResized;

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
  for(var i = 0; i < particleNum; i++){
    particles[i] = new Particle();
  }
  background(51);
}

var Particle = function() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.accel = createVector(0, 0);
  this.prevPos = this.pos.copy();
}

Particle.prototype.update = function(){
  this.vel.add(this.accel);
  this.vel.limit(4);
  this.pos.add(this.vel);
  this.accel.mult(0);
}

Particle.prototype.applyForce = function(force){
  this.accel.add(force);
}

Particle.prototype.show = function(){
  //point(this.pos.x, this.pos.y);
  line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  this.updatePrev();
}
Particle.prototype.updatePrev = function(){
  this.prevPos.x = this.pos.x;
  this.prevPos.y = this.pos.y;
}
Particle.prototype.edges = function () {
  if(this.pos.x > width) {
     this.pos.x = 0;
     this.updatePrev();
  }
  else if(this.pos.x < 0) {
     this.pos.x = width;
     this.updatePrev();
  }
  if(this.pos.y > height) {
    this.pos.y = 0;
    this.updatePrev();
  }
  else if(this.pos.y < 0) {
    this.pos.y = height;
    this.updatePrev();
  }

}

Particle.prototype.follow = function(field) {
  var x = floor(this.pos.x / scl);
  var y = floor(this.pos.y / scl);
  var index = x + y * cols;
  var force = field[index];

  this.applyForce(force);
}
