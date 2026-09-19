interface GameData {
	coin: number;

	upgrades: {
		multi: number;
	};

	stats: {
		clicked: number;
	};
}

export class Game {
	coin: number = 0;
	
	upgrades: {
		multi: number;
	} = { multi: 1 };

	stats: {
		clicked: number;
	} = {
		clicked: 0,
	};

	constructor() {}

	toJSON(): string {
		return JSON.stringify(this);
	}

	fromJSON(string: string): void {
		const data: Partial<GameData> = JSON.parse(string);
		Object.assign(this, data);
	}
}
