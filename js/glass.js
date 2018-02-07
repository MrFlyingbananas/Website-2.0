class Glass {
	constructor(v1, v2, v3) {
		this.center = createVector(
			(v1.x + v2.x + v3.x) / 3,
			(v1.y + v2.y + v3.y) / 3
		);
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		this.rotMult = random(-2, 2);
		this.rot = 0;
		this.vel = createVector(0, 0, 0);
		this.pos = createVector(0, 0, 0);
	}
	addRot(amount) {
		this.rot += amount;
	}
	render() {
		push();
		this.pos.add(this.vel);
		translate(
			this.center.x + this.pos.x,
			this.center.y + this.pos.x,
			this.pos.z
		);
		if (this.rot != 0) {
			rotate(this.rot * this.rotMult);
		}

		beginShape();
		vertex(this.v1.x - this.center.x, this.v1.y - this.center.y, this.v1.z);
		vertex(this.v2.x - this.center.x, this.v2.y - this.center.y, this.v2.z);
		vertex(this.v3.x - this.center.x, this.v3.y - this.center.y, this.v3.z);
		endShape();

		pop();
	}
	explode() {
		var flip1 = random(0, 1);
		if (flip1 > 0.5) {
			flip1 = 1;
		} else {
			flip1 = -1;
		}
		var flip2 = random(0, 1);
		if (flip2 > 0.5) {
			flip2 = 1;
		} else {
			flip2 = -1;
		}
		this.vel.x = flip1 * random(10, 50);
		this.vel.y = flip2 * random(10, 50);
		this.vel.z = random(5, 50);
		this.v1 = this.v1.copy();
		this.v2 = this.v2.copy();
		this.v3 = this.v3.copy();
	}
	recalculateCenter() {
		this.center = createVector(
			(this.v1.x + this.v2.x + this.v3.x) / 3,
			(this.v1.y + this.v2.y + this.v3.y) / 3
		);
	}
}
