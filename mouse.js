import { vec2 } from "./std.js";

export class Mouse {
	constructor() {
		this.pos = new vec2();
		this.buttons = [];
		this.events = new Map();
		this.autoLock = false;

		document.addEventListener("click", () => {
			if (this.autoLock) this.lock = true;
		});

		document.addEventListener("mousemove", (event) => {
			const pos = new vec2(
				event.clientX - window.innerWidth / 2,
				event.clientY - window.innerHeight / 2,
			);
			const config = {
				pos: pos,
				vec: new vec2(this.pos.x, this.pos.y).sub(pos),
				scroll: 0,
			};

			this.pos = pos;

			this.events.forEach((a, key) => {
				if (a.inputType !== "Move") return;
				const res = a.fn(config, this);
				if (a.type === "once" && !res) this.events.delete(key);
			});
		});

		document.addEventListener(
			"wheel",
			(event) => {
				event.preventDefault();
				let deltaPx = event.deltaY;

				if (event.deltaMode === 1) {
					deltaPx *= 33;
				} else if (event.deltaMode === 2) {
					deltaPx *= window.innerHeight;
				}

				const config = { pos: this.pos, vec: new vec2(), scroll: deltaPx };

				this.events.forEach((a, key) => {
					if (a.inputType !== "Scroll") return;
					const res = a.fn(config, this);
					if (a.type === "once" && !res) this.events.delete(key);
				});
			},
			{ passive: false },
		);

		document.addEventListener("mousedown", (event) => {
			const config = { pos: this.pos, vec: new vec2(), scroll: 0 };

			let button;
			switch (event.button) {
				case 0:
					button = "Left";
					break;
				case 1:
					button = "Middle";
					break;
				case 2:
					button = "Right";
					break;
				default:
					return;
			}

			const v = this.buttons.findIndex((v) => v === button);
			if (v === -1) {
				this.buttons.push(button);
			}

			this.events.forEach((a, key) => {
				if (a.inputType !== button + "Down") return;
				const res = a.fn(config, this);
				if (a.type === "once" && !res) this.events.delete(key);
			});
		});

		document.addEventListener("mouseup", (event) => {
			const config = { pos: this.pos, vec: new vec2(), scroll: 0 };

			let button;
			switch (event.button) {
				case 0:
					button = "Left";
					break;
				case 1:
					button = "Middle";
					break;
				case 2:
					button = "Right";
					break;
				default:
					return;
			}

			const index = this.buttons.findIndex((v) => v === button);
			if (index !== -1) {
				this.buttons.splice(index, 1);
			}

			this.events.forEach((a, key) => {
				if (a.inputType !== button + "Up") return;
				const res = a.fn(config, this);
				if (a.type === "once" && !res) this.events.delete(key);
			});
		});
	}

	addEvent(type, inputType, fn) {
		let id = 0;
		while (this.events.has(id)) id++;
		this.events.set(id, { type, inputType, fn });
		return id;
	}

	deleteEvent(id) {
		if (this.events.has(id)) this.events.delete(id);
	}

	set onLeftDown(callback) {
		this.addEvent("all", "LeftDown", callback);
	}
	set onMiddleDown(callback) {
		this.addEvent("all", "MiddleDown", callback);
	}
	set onRightDown(callback) {
		this.addEvent("all", "RightDown", callback);
	}
	set onLeftUp(callback) {
		this.addEvent("all", "LeftUp", callback);
	}
	set onMiddleUp(callback) {
		this.addEvent("all", "MiddleUp", callback);
	}
	set onRightUp(callback) {
		this.addEvent("all", "RightUp", callback);
	}
	set onScroll(callback) {
		this.addEvent("all", "Scroll", callback);
	}
	set onMove(callback) {
		this.addEvent("all", "Move", callback);
	}

	set onceLeftDown(callback) {
		this.addEvent("once", "LeftDown", callback);
	}
	set onceMiddleDown(callback) {
		this.addEvent("once", "MiddleDown", callback);
	}
	set onceRightDown(callback) {
		this.addEvent("once", "RightDown", callback);
	}
	set onceLeftUp(callback) {
		this.addEvent("once", "LeftUp", callback);
	}
	set onceMiddleUp(callback) {
		this.addEvent("once", "MiddleUp", callback);
	}
	set onceRightUp(callback) {
		this.addEvent("once", "RightUp", callback);
	}
	set onceScroll(callback) {
		this.addEvent("once", "Scroll", callback);
	}
	set onceMove(callback) {
		this.addEvent("once", "Move", callback);
	}

	set lock(value) {
		if (value) document.body.requestPointerLock();
		else if (document.pointerLockElement) document.exitPointerLock();
	}
}
