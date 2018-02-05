const sections = 2;
let glass = [];
let rot = 0;

function setup() {
  pixelDensity(1);
  let canvas = createCanvas(windowWidth, windowHeight);
  let incx = windowWidth / sections;
  let incy = windowHeight / sections;
  let points = [];
  rectMode(CENTER)
  canvas.parent('FlowField-holder');
  let range = 100;
  for (let i = 0; i < sections + 1; i++) {
    for (let j = 0; j < sections + 1; j++) {
      let xr = 0;
      let yr = 0;

      if (j != 0 && j + 1 != sections + 1) {
        xr = floor(random(range) - range);
      }
      if (i != 0 && i + 1 != sections + 1) {
        yr = floor(random(range) - range);
      }
      xr=0;yr=0
      points[i * (sections + 1) + j] = createVector(j * incx + xr, i * incy + yr);
    }
  }
  frameRate(30)
  let gsections = sections;
  for (let y = 0; y < gsections; y++) {
    for (let x = 0; x < gsections; x++) {
      glass[y * gsections + x] = new Glass(points[y * (sections + 1) + x], points[y * (sections + 1) + x + 1], points[(y + 1) * (sections + 1) + x]);
      glass[gsections * gsections + y * gsections + x] = new Glass(points[y * (sections + 1) + x + 1], points[(y + 1) * (sections + 1) + x + 1], points[(y + 1) * (sections + 1) + x]);
    }
  }
  // glass[i * gsections + j] = new Glass(points[i * sections + (j+i)],points[i+1][j],points[i][j+1]);
  //   // glass[gsections * gsections + j + i * gsections] = new Glass(points[(i+1) * sections + j + 1],points[(i+1) * sections + j],points[(i) * sections + j + 1]);
  //   console.log("vert1:",i, j)
  //   console.log("vert2:",i+1,j)
  //   console.log("vert3:",i,j+1)

  frameRate(30);

}

function draw() {
  // rot+=.001;
  background(220);
  strokeWeight(10);
  for (let g of glass) {
    g.incRot(.01)
    g.render();
  }
}
