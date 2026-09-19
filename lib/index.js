/* eslint-disable no-undef */

import { createCanvas, getMyCtx } from "./canvas.js";
import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse.js";
import * as std from "./std.js";

const debug = false;

async function renderError(ctx, title, text) {
	console.error(text);
	while (true) {
		const [width, height] = ctx.size();
		const size = Math.min(width, height) / 50;

		ctx.fillRect([0, 0], [width, height], { color: "rgb(0, 0, 0)" });
		ctx.drawText([size, size], title, { size, align: "left", baseline: "top" }, { color: "rgb(255, 0, 0)" });
		ctx.drawText([size, size * 2], String(text), {}, { color: "rgb(255, 0, 0)" });

		await ctx.render();
	}
}

async function main() {
	if (debug) console.log("Loader Starting");

	const canvas = createCanvas();
	const ctx = canvas.getContext("2d");
	/** @type {import('./index.d.ts').MyCtx} */
	const myctx = getMyCtx(ctx);

	let doRender = true;
	(async function () {
		while (doRender) {
			const [width, height] = myctx.size();
			myctx.fillRect([0, 0], [width, height], { color: "rgb(0, 0, 0)" });
			await myctx.render();
		}
	})();

	try {
		const keyboard = new Keyboard();
		const mouse = new Mouse();

		const res = await window.fetch("./out/main.js");
		if (!res.ok) {
			doRender = false;
			await renderError(myctx, "Network Error", `\({res.status} :\){res.statusText}`);
			return;
		}

		let content = await res.text();
		doRender = false;

		if (debug) console.log("Content Loading Ended");

		await (async function run() {
			const baseUrl = new URL('./out/', window.location.href).href;
			content = content
				.replace(/(from\s+["'])\.\/([^"']+)["']/g, `$1${baseUrl}$2"`)
				.replace(/(import\s+["'])\.\/([^"']+)["']/g, `$1${baseUrl}$2"`)
				.replace(/(export\s+[\s\S]*?from\s+["'])\.\/([^"']+)["']/g, `$1${baseUrl}$2"`)
				.replace(
					/\/\/# sourceMappingURL=(.+)/g,
					'//# sourceMappingURL=./out/main.js.map'
				);
			content += '\n//# sourceURL=./out/main.js';

			Object.assign(window, {
				myctx, keyboard, mouse,
				...std
			});

			const blob = new Blob([(content)], { type: "application/javascript" });
			const blobUrl = URL.createObjectURL(blob);

			try {
				const userModule = await import(blobUrl);
				if (typeof userModule.default === "function") {
					await userModule.default(window.__APP_ARGS__);
				}
			} finally {
				URL.revokeObjectURL(blobUrl);
				delete window.__APP_ARGS__;
			}
		})();
	} catch (err) {
		doRender = false;
		await renderError(myctx, "Intern Error", err);
	}
}

main();
