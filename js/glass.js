class Glass {
  constructor(v1, v2, v3){
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }
  render(){
    strokeWeight(10);
    stroke(random(255), random(255), random(255));
    line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    line(this.v2.x, this.v2.y, this.v3.x, this.v3.y);
    line(this.v3.x, this.v3.y, this.v1.x, this.v1.y);

    point(this.v1.x, this.v1.y);
  }
}
