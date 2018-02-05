class Glass {
  constructor(v1, v2, v3) {

    this.center = createVector((v1.x + v2.x + v3.x) / 3, (v1.y + v2.y + v3.y) / 3);


    this.v1 = p5.Vector.sub(v1,this.center)
    this.v2 = p5.Vector.sub(v2,this.center)
    this.v3 = p5.Vector.sub(v3,this.center)
    // this.v2.sub(this.center)
    // this.v3.sub(this.center)
    console.log(this.v1,this.v2,this.v3,this.center)
    // this.v1 = createVector(this.v1.x-this.center.x, this.v1.y-this.center.y)

    this.rotMult = random(-2, 2);
    this.rot = 0
  }
  incRot(amount) {
    this.rot += amount;
  }
  render() {
    strokeWeight(10);
    stroke(214, 234, 248);
    fill(52, 152, 219, 20);
    // line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    // line(this.v2.x, this.v2.y, this.v3.x, this.v3.y);
    // line(this.v3.x, this.v3.y, this.v1.x, this.v1.y);
    push();

    translate(this.center.x,this.center.y)
    if (this.rot != 0) {
      rotate(this.rot * this.rotMult);
    }
    triangle(
      this.v1.x, this.v1.y,
      this.v2.x, this.v2.y,
      this.v3.x, this.v3.y);

    stroke(255, 0, 0);
    point(this.v1.x, this.v1.y);
    stroke(0, 255, 0);
    point(this.v2.x, this.v2.y);
    stroke(0, 0, 255);
    point(this.v3.x, this.v3.y);
    pop();
  }
}
