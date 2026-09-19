export class Keyboard {
	constructor() {
		this.keys = [];
		this.events = new Map();

		document.addEventListener("keydown", (event) => {
			const index = this.keys.findIndex((k) => k === event.code);
			if (index === -1) {
				this.keys.push(event.code);
			}

			this.events.forEach((a, id) => {
				if (a.inputType !== "KeyDown") return;
				const res = a.fn({ key: event.key, code: event.code }, this);
				if (a.type === "once" && !res) this.events.delete(id);
			});

			if (!event.repeat) {
				this.events.forEach((a, id) => {
					if (a.inputType !== "KeyPressed") return;
					const res = a.fn({ key: event.key, code: event.code }, this);
					if (a.type === "once" && !res) this.events.delete(id);
				});
			}
		});

		document.addEventListener("keyup", (event) => {
			const index = this.keys.findIndex((k) => k === event.code);
			if (index !== -1) {
				this.keys.splice(index, 1);
			}

			this.events.forEach((a, id) => {
				if (a.inputType !== "KeyUp") return;
				const res = a.fn({ key: event.key, code: event.code }, this);
				if (a.type === "once" && !res) this.events.delete(id);
			});
		});
	}

	check(code) {
		return this.keys.includes(code);
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

	set onKeyDown(callback) {
		this.addEvent("all", "KeyDown", callback);
	}
	set onKeyPressed(callback) {
		this.addEvent("all", "KeyPressed", callback);
	}
	set onKeyUp(callback) {
		this.addEvent("all", "KeyUp", callback);
	}

	set onceKeyDown(callback) {
		this.addEvent("once", "KeyDown", callback);
	}
	set onceKeyPressed(callback) {
		this.addEvent("once", "KeyPressed", callback);
	}
	set onceKeyUp(callback) {
		this.addEvent("once", "KeyUp", callback);
	}
}
