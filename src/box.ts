export function getColor(t: number, gamma: number = 2.2): string {
	t = Math.round(Math.pow(clamp(t, 0, 1), gamma) * 255);
	return "rgb(" + t + "," + t + "," + t + ")";
}
export const transparent = "transparent"

const smooth = 0.2;
export class SimpleBox {
	pos: vec2 = new vec2(0, 0);
	size: vec2 = new vec2(0, 0);

	color?: string;

	smoothPos: vec2 = new vec2(myctx.width() * 0.5, myctx.height() * 0.5);
	velocityPos: vec2 = new vec2(0, 0);
	smoothSize: vec2 = new vec2(0, 0);
	velocitySize: vec2 = new vec2(0, 0);

	constructor(color?: string) {
		this.color = color;
	}

	render(dt: number) {
		myctx.fillRect(this.smoothPos, this.smoothSize, { color: this.color });

		this.smoothPos = this.smoothPos.add(this.velocityPos.mul(dt * 100));
		this.velocityPos = this.velocityPos.add(this.pos.sub(this.smoothPos).sub(this.velocityPos.mul(10)).mul(dt));

		this.smoothSize = this.smoothSize.add(this.velocitySize.mul(dt * 100));
		this.velocitySize = this.velocitySize.add(
			this.size.sub(this.smoothSize).sub(this.velocitySize.mul(10)).mul(dt),
		);
	}
}
