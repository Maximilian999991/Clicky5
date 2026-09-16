import type { MyCtx, Keyboard, Mouse } from "../lib/index.d.ts";
import type * as std from "../lib/std.d.ts";

declare global {
	const myctx: MyCtx;
	const keyboard: Keyboard;
	const mouse: Mouse;

	type vec2 = std.vec2;
	type vec3 = std.vec3;
	const vec2: typeof std.vec2;
	const vec3: typeof std.vec3;
	
	const degToReg: typeof std.degToReg;
	const regToDeg: typeof std.regToDeg;
	const sin: typeof std.sin;
	const cos: typeof std.cos;
	const clamp: typeof std.clamp;
	const atan2: typeof std.atan2;
}

export { };