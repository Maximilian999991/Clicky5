import type { vec2 } from "./std.d.ts";

export interface MouseAction {
	pos: vec2;
	vec: vec2;
	scroll: number;
}

export type InputType = "LeftDown" | "MiddleDown" | "RightDown" | "LeftUp" | "MiddleUp" | "RightUp" | "Scroll" | "Move";
export type EventFunction = (event: MouseAction, mouse: Mouse) => void | boolean;

export class Mouse {
	pos: vec2;
	buttons: ("Left" | "Middle" | "Right")[];

	events: Map<
		number,
		{
			type: "all" | "once";
			inputType: InputType;
			fn: EventFunction;
		}
	>;

	autoLock: boolean;

	constructor();

	addEvent(type: "all" | "once", inputType: InputType, fn: EventFunction): number;
	deleteEvent(id: number): void;

	set onLeftDown(callback: EventFunction);
	set onMiddleDown(callback: EventFunction);
	set onRightDown(callback: EventFunction);
	set onLeftUp(callback: EventFunction);
	set onMiddleUp(callback: EventFunction);
	set onRightUp(callback: EventFunction);
	set onScroll(callback: EventFunction);
	set onMove(callback: EventFunction);

	set onceLeftDown(callback: EventFunction);
	set onceMiddleDown(callback: EventFunction);
	set onceRightDown(callback: EventFunction);
	set onceLeftUp(callback: EventFunction);
	set onceMiddleUp(callback: EventFunction);
	set onceRightUp(callback: EventFunction);
	set onceScroll(callback: EventFunction);
	set onceMove(callback: EventFunction);

	set lock(value: boolean);
}