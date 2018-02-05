const sections = 3;
let glass = []
let pick = 0;
function setup(){
  pixelDensity(1);
  let canvas = createCanvas(windowWidth, windowHeight);
  let incx = windowWidth/sections;
  let incy = windowHeight/sections;
  let points = []
  canvas.parent('FlowField-holder');
  let range = 100;
  for(let i = 0; i < sections; i++){
    for(let j = 0; j < sections; j++){
      xr = floor(random(range)-range);
      yr = floor(random(range)-range);
      xr = 0; yr = 0;
      points[i * sections + j] = createVector(incx/2 + i*incx + xr,incy/2 + j*incy + yr);
    }
  }
  let gsections = sections - 1;
  for(let i = 0; i < gsections; i++){
    for(let j = 0; j < gsections; j++){
      glass[i * gsections + j] = new Glass(points[i * sections + j],points[(i) * sections + j + 1],points[(i+1) * sections + j]);
      glass[gsections * gsections + j + i * gsections] = new Glass(points[(i+1) * sections + j + 1],points[(i+1) * sections + j],points[(i) * sections + j + 1]);

      }
  }
  console.log(glass.length)
  frameRate(1);

}

function draw(){
  background(220);
  strokeWeight(10);
  for(g of glass){
    g.render();
  }
}
