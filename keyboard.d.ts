type InputType = "KeyDown" | "KeyPressed" | "KeyUp";
type EventFunction = (event: { key: string; code: string }, keyboard: Keyboard) => void | boolean;

export class Keyboard {
	keys: string[];
	events: Map<
		number,
		{
			type: "all" | "once";
			inputType: InputType;
			fn: EventFunction;
		}
	>;

	constructor();

	check(code: string): boolean;
	addEvent(type: "all" | "once", inputType: InputType, fn: EventFunction): number;
	deleteEvent(id: number): void;

	set onKeyDown(callback: EventFunction);
	set onKeyPressed(callback: EventFunction);
	set onKeyUp(callback: EventFunction);

	set onceKeyDown(callback: EventFunction);
	set onceKeyPressed(callback: EventFunction);
	set onceKeyUp(callback: EventFunction);
}