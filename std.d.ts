export class vec2 {
	x: number;
	y: number;

	constructor();
	constructor(x: number, y: number);
	constructor(vec: vec2);

	add(v: vec2): vec2;
	sub(v: vec2): vec2;
	mul(n: number): vec2;
	mul(v: vec2): vec2;
	mul(x: number, y: number): vec2;
	div(v: vec2 | number): vec2;

	length(): number;
	normalize(): vec2;

	get right(): vec2;
	get left(): vec2;

	dot(v: vec2): number;

	isNaN(): boolean;
	set(vec: vec2): void;
	set(x: number, y: number): void;
}

export class vec3 {
	x: number;
	z: number;
	y: number;

	constructor();
	constructor(x: number, z: number, y: number);

	add(v: vec3): vec3;
	sub(v: vec3): vec3;
	mul(v: vec3 | number): vec3;
	div(v: vec3 | number): vec3;

	length(): number;
	normalize(): vec3;
	dot(v: vec3): number;

	isNaN(): boolean;
}

export const degToReg: number;
export const regToDeg: number;

export function sin(deg: number): number;
export function cos(deg: number): number;
export function atan2(x: number, y: number): number;
export function clamp(v: number, min: number, max: number): number;
