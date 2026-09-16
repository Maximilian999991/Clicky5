export function getColor(t, gamma = 2.2) {
    t = Math.round(Math.pow(clamp(t, 0, 1), gamma) * 255);
    return "rgb(" + t + "," + t + "," + t + ")";
}
export const transparent = "transparent";
const smooth = 0.2;
export class SimpleBox {
    pos = new vec2(0, 0);
    size = new vec2(0, 0);
    color;
    smoothPos = new vec2(myctx.width() * 0.5, myctx.height() * 0.5);
    velocityPos = new vec2(0, 0);
    smoothSize = new vec2(0, 0);
    velocitySize = new vec2(0, 0);
    constructor(color) {
        this.color = color;
    }
    render(dt) {
        myctx.fillRect(this.smoothPos, this.smoothSize, { color: this.color });
        this.smoothPos = this.smoothPos.add(this.velocityPos.mul(dt * 100));
        this.velocityPos = this.velocityPos.add(this.pos.sub(this.smoothPos).sub(this.velocityPos.mul(10)).mul(dt));
        this.smoothSize = this.smoothSize.add(this.velocitySize.mul(dt * 100));
        this.velocitySize = this.velocitySize.add(this.size.sub(this.smoothSize).sub(this.velocitySize.mul(10)).mul(dt));
    }
}
//# sourceMappingURL=box.js.map