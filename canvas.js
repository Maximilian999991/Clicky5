/* eslint-disable no-undef */

export function createCanvas() {
	const canvas = document.createElement("canvas");
	if (!canvas) {
		console.error("no Canvas");
	}

	const resize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	resize();
	window.addEventListener("resize", resize);
	document.body.appendChild(canvas);

	return canvas;
}

/**
 * @returns {Array}
 */
function to2Array(value) {
	if (typeof value == "number") value = [value, value];
	if (!Array.isArray(value)) value = [value.x, value.y];
	if (value.length < 2) value.push(0, 0);
	return value;
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function getMyCtx(ctx) {
	const json = {};

	// 1. Config
	json.fillStyle = ctx.fillStyle;
	json.strokeStyle = ctx.strokeStyle;
	json.strokeWidth = ctx.lineWidth;

	json.width = () => ctx.canvas.width;
	json.height = () => ctx.canvas.height;
	json.size = () => [ctx.canvas.width, ctx.canvas.height];

	// 2. Simple / Build-In Function
	json.stroke = (color) => {
		if (color) ctx.strokeStyle = color;
		ctx.stroke();
	};
	json.fill = (color) => {
		if (color) ctx.fillStyle = color;
		ctx.fill();
	};
	json.render = (fn) => {
		if (fn) {
			requestAnimationFrame(fn);
		} else {
			return new Promise((res) => {
				requestAnimationFrame(res);
			});
		}
	};

	// 3. Complexes Function
	// 3.1
	json.fillRect = (pos, size, { color } = {}) => {
		pos = to2Array(pos);
		size = to2Array(size);
		if (color) ctx.fillStyle = color;

		ctx.fillRect(pos[0], pos[1], size[0], size[1]);
	};
	json.strokeRect = (pos, size, { width, color } = {}) => {
		pos = to2Array(pos);
		size = to2Array(size);
		if (width) ctx.lineWidth = width;
		if (color) ctx.strokeStyle = color;

		ctx.strokeRect(pos[0], pos[1], size[0], size[1]);
	};

	// 3.2
	json.strokeLines = (poss, { width, color } = {}) => {
		for (let i = 0; i < poss.length; i++) {
			const pos = to2Array(poss[i]);

			if (i === 0) ctx.moveTo(pos[0], pos[1]);
			else ctx.lineTo(pos[0], pos[1]);
		}

		if (width) ctx.lineWidth = width;
		if (color) ctx.strokeStyle = color;
		ctx.stroke();
	};
	json.fillLines = (poss, { color } = {}) => {
		for (let i = 0; i < poss.length; i++) {
			const pos = to2Array(poss[i]);

			if (i === 0) ctx.moveTo(pos[0], pos[1]);
			else ctx.lineTo(pos[0], pos[1]);
		}

		if (color) ctx.fillStyle = color;
		ctx.fill();
	};

	// 3.3
	json.strokeLine = (start, ende, { width, color } = {}) => {
		start = to2Array(start);
		ende = to2Array(ende);

		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(ende[0], ende[1]);

		if (width) ctx.lineWidth = width;
		if (color) ctx.strokeStyle = color;
		ctx.stroke();
	};
	json.drawText = (pos, text, { size, family, align, baseline } = {}, { color } = {}) => {
		pos = to2Array(pos);
		text = String(text);

		if (size || family) ctx.font = (size ?? 10) + "px " + (family ?? "monospace");
		if (align) ctx.textAlign = align;
		if (baseline) ctx.textBaseline = baseline;

		if (color) ctx.fillStyle = color;
		ctx.fillText(text, pos[0], pos[1]);
	};
	json.measureText = (text, { size, family } = {}) => {
		text = String(text);
		if (size || family) ctx.font = (size ?? 10) + "px " + (family ?? "monospace");
		return [ctx.measureText(text).width, size ?? 10];
	};

	return json;
}
