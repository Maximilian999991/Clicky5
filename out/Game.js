export class Game {
    coin = 0;
    upgrades = { multi: 1 };
    stats = {
        clicked: 0,
    };
    constructor() { }
    toJSON() {
        return JSON.stringify(this);
    }
    fromJSON(string) {
        const data = JSON.parse(string);
        Object.assign(this, data);
    }
}
//# sourceMappingURL=Game.js.map