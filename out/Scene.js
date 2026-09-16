import { SimpleBox, getColor } from "./box.js";
export class Home {
    background = new SimpleBox(getColor(0.5));
    constructor() { }
    update(tabbar, title) {
        const bg = this.background;
        const padding = myctx.height() * 0.03;
        const t = Math.round(tabbar.t);
        bg.pos = new vec2(myctx.width() * -t + padding, title.background.size.y + padding * 2);
        bg.size = new vec2(myctx.width() - padding * 2, myctx.height() - title.background.size.y - tabbar.background.size.y - padding * 4);
    }
    render(dt) {
        const bg = this.background;
        bg.render(dt);
    }
}
//# sourceMappingURL=Scene.js.map