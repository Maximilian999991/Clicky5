export class vec2 {
	constructor(x, y) {
		if (typeof x === "object") {
			y = x.y;
			x = x.x;
		}
		this.x = x ?? 0;
		this.y = y ?? 0;
	}

	add(v) {
		return new vec2(this.x + v.x, this.y + v.y);
	}
	sub(v) {
		return new vec2(this.x - v.x, this.y - v.y);
	}
	mul(x, y) {
		if (typeof x === "object") {
			y = x.y;
			x = x.x;
		}
		if (typeof y === "undefined") {
			y = x;
		}
		return new vec2(this.x * x, this.y * y);
	}
	div(v) {
		if (typeof v === "number") v = new vec2(v, v);
		return new vec2(this.x / v.x, this.y / v.y);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize() {
		const len = this.length();
		if (len === 0) {
			return new vec2(0, 0);
		}
		return new vec2(this.x / len, this.y / len);
	}

	get right() {
		const angle = Math.atan2(this.y, this.x) - Math.PI / 2;
		return new vec2(Math.cos(angle), Math.sin(angle));
	}
	get left() {
		const angle = Math.atan2(this.y, this.x) + Math.PI / 2;
		return new vec2(Math.cos(angle), Math.sin(angle));
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	isNaN() {
		return Number.isNaN(this.x) || Number.isNaN(this.y);
	}
	set(vx, y) {
		if (typeof vx === "number") {
			this.x = vx;
			this.y = y;
		} else {
			this.x = vx.x;
			this.y = vx.y;
		}
	}
}

export class vec3 {
	constructor(x, z, y) {
		this.x = x ?? 0;
		this.z = z ?? 0;
		this.y = y ?? 0;
	}

	add(v) {
		return new vec3(this.x + v.x, this.z + v.z, this.y + v.y);
	}
	sub(v) {
		return new vec3(this.x - v.x, this.z - v.z, this.y - v.y);
	}
	mul(v) {
		if (typeof v === "number") v = new vec3(v, v, v);
		return new vec3(this.x * v.x, this.z * v.z, this.y * v.y);
	}
	div(v) {
		if (typeof v === "number") v = new vec3(v, v, v);
		return new vec3(this.x / v.x, this.z / v.z, this.y / v.y);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	normalize() {
		const len = this.length();
		if (len === 0) {
			return new vec3(0, 0, 0);
		}
		return new vec3(this.x / len, this.z / len, this.y / len);
	}
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	isNaN() {
		return Number.isNaN(this.x) || Number.isNaN(this.z) || Number.isNaN(this.y);
	}
}

export const degToReg = Math.PI / 180;
export const regToDeg = 180 / Math.PI;

export function sin(deg) {
	return Math.sin(deg * degToReg);
}
export function cos(deg) {
	return Math.cos(deg * degToReg);
}
export function atan2(x, y) {
	return Math.atan2(x, y) * regToDeg;
}
export function clamp(v, min, max) {
	return Math.max(min, Math.min(max, v));
}
