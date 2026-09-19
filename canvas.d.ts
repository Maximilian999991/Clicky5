type vec2 = { x: number; y: number } | [number?, number?];

export interface MyCtx {
	fillStyle: string;
	strokeStyle: string;

	width: () => number;
	height: () => number;
	size: () => [number, number];

	stroke: (color: string) => void;
	fill: (color: string) => void;
	render: ((fn?: () => void) => void) | (() => Promise<void>);

	fillRect: (pos: vec2, size: vec2, optinons?: { color?: string }) => void;
	strokeRect: (pos: vec2, size: vec2, optinons?: { width?: number; color?: string }) => void;

	strokeLines: (poss: vec2[], optinons?: { width?: number; color?: string }) => void;
	fillLines: (poss: vec2[], optinons?: { width?: number; color?: string }) => void;

	strokeLine: (start: vec2, ende: vec2, optinons?: { width?: number; color?: string }) => void;
	drawText: (
		pos: vec2,
		text: string,
		optinonsText?: {
			size?: number;
			family?: string;
			align?: CanvasTextAlign;
			baseline?: CanvasTextBaseline;
		},
		optinons?: {
			color?: string;
		},
	) => void;
	measureText: (
		text: string,
		optinons?: {
			size?: number;
			family?: string;
		},
	) => [number,number];
}
