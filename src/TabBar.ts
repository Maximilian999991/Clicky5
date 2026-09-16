import { SimpleBox, getColor, transparent } from "./box.js";

export class TabBar {
	background: SimpleBox = new SimpleBox(getColor(0.5));
	pointer: SimpleBox = new SimpleBox(getColor(0.75));
	buttons: { name: string; box: SimpleBox }[] = [];
	t: number = 0;

	constructor() {
		const b = this.buttons;
		b.push({ name: "Home", box: new SimpleBox(transparent) });
		b.push({ name: "Upgrades", box: new SimpleBox(transparent) });
		b.push({ name: "Settings", box: new SimpleBox(transparent) });

		let klicked = false;
		mouse.addEvent("all", "LeftDown", () => {
			const bg = this.background;
			if (
				Math.abs(mouse.pos.x + myctx.width() * 0.5 - bg.pos.x) < bg.size.x &&
				Math.abs(mouse.pos.y + myctx.height() * 0.5 - bg.pos.y) < bg.size.y
			) {
				klicked = true;
			}
		});
		mouse.addEvent("all", "LeftUp", () => {
			klicked = false;
			this.t = Math.round(this.t);
		});
		mouse.addEvent("all", "Move", (event) => {
			if (klicked) {
				const low = this.buttons
					.map((v) => event.pos.x + myctx.width() * 0.5 - v.box.pos.x - v.box.size.x * 0.5)
					.reduceRight((p, v, i) => (p.dx > v && v > 0 ? { i, dx: v } : p), { i: 0, dx: Infinity });
				const high = this.buttons
					.map((v) => event.pos.x + myctx.width() * 0.5 - v.box.pos.x - v.box.size.x * 0.5)
					.reduce((p, v, i) => (p.dx < v && v < 0 ? { i, dx: v } : p), {
						i: this.buttons.length - 1,
						dx: -Infinity,
					});
				if (!isFinite(low.dx)) {
					this.t = low.i;
					return;
				}
				if (!isFinite(high.dx)) {
					this.t = high.i;
					return;
				}

				const length = low.dx - high.dx;
				this.t = low.i + low.dx / length;
			}
		});
	}

	render(dt: number) {
		const bg = this.background;
		const p = this.pointer;

		const textSize = myctx.height() * 0.03;
		const padding = myctx.height() * 0.03;
		let width = 0;
		for (let i = 0; i < this.buttons.length; i++) {
			const b = this.buttons[i];
			const bx = b.box;
			const [tw, th] = myctx.measureText(b.name, { size: textSize });

			bx.pos = new vec2(bg.pos.x + width + padding * 0.5, bg.pos.y + myctx.height() * 0.01);

			bx.size.y = th + myctx.height() * 0.02;
			bx.size.x = tw + padding * 2;

			width += tw + padding * 3;
		}

		bg.pos = new vec2(myctx.width() * 0.5 - width * 0.5, myctx.height() - padding - bg.size.y);
		bg.size = new vec2(width, myctx.height() * 0.07);

		const low = this.buttons[Math.max(0, Math.floor(this.t))].box;
		let tt = this.t - Math.floor(this.t);
		if (tt < 0.5) tt = Math.pow(tt, 2);
		if (tt > 0.5) tt = Math.pow(tt, 0.5);
		const high = this.buttons[Math.min(this.buttons.length - 1, Math.ceil(this.t))].box;
		p.pos.x =
			low.pos.x * (1 - tt) +
			high.pos.x * tt +
			(low.size.x * (1 - tt) + high.size.x * tt) * (0.5 - Math.abs(tt - 0.5)) * 0.5;
		p.pos.y =
			low.pos.y * (1 - tt) +
			high.pos.y * tt +
			(low.size.y * (1 - tt) + high.size.y * tt) * (0.25 - Math.abs(tt - 0.5) * 0.5) * 0.5;
		p.size.x = (low.size.x * (1 - tt) + high.size.x * tt) * (0.5 + Math.abs(tt - 0.5));
		p.size.y = (low.size.y * (1 - tt) + high.size.y * tt) * (0.75 + Math.abs(tt - 0.5) * 0.5);
		if (p.smoothPos.x < bg.pos.x) {
			p.smoothSize.x += p.smoothPos.x - bg.pos.x;
			p.smoothPos.x = bg.pos.x;
		}
		if (p.smoothPos.x + p.smoothSize.x > bg.pos.x + bg.size.x) {
			p.smoothSize.x = bg.pos.x + bg.size.x - p.smoothPos.x;
		}

		bg.render(dt);
		p.render(dt);
		for (let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].box.render(dt);
			myctx.drawText(
				this.buttons[i].box.smoothPos.add(this.buttons[i].box.smoothSize.mul(0.5)),
				this.buttons[i].name,
				{ size: textSize, align: "center", baseline: "middle" },
				{ color: getColor(0.25) },
			);
		}
	}
}
