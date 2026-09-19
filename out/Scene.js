import { SimpleBox, TextBox, getColor } from "./box.js";
export class Home {
    background = new SimpleBox(getColor(0.5));
    text1 = new TextBox();
    text2 = new TextBox();
    constructor() {
        this.text1.text = "Click Me";
    }
    update(tabbar, title) {
        const bg = this.background;
        const textSize = myctx.height() * 0.03;
        const padding = myctx.height() * 0.03;
        const t = Math.round(tabbar.t);
        bg.pos = new vec2(myctx.width() * -t + padding, title.background.size.y + padding * 2);
        bg.size = new vec2(myctx.width() - padding * 2, myctx.height() - title.background.size.y - tabbar.background.size.y - padding * 4);
        this.text2.pos = new vec2(padding, title.background.size.y + padding * 2).add(bg.size.mul(0.5, 0.25));
        if (t == 0) {
            title.counters[0].s = false;
            this.text2.textSize = textSize;
        }
        else {
            title.counters[0].s = true;
            this.text2.textSize = 0;
        }
    }
    render(dt) {
        const textSize = myctx.height() * 0.03;
        const bg = this.background;
        const t2 = this.text2;
        t2.text = "Test1: 1234";
        const t1 = this.text1;
        t1.textSize = textSize;
        t1.pos = bg.pos.add(bg.size.mul(0.5));
        if (t1.smoothTextSize > textSize * bg.smoothSize.div(bg.size).length()) {
            t1.smoothTextSize = textSize * bg.smoothSize.div(bg.size).length();
            t1.velocityTextSize = 0;
        }
        bg.render(dt);
        t2.render(dt);
        t1.render(dt);
    }
}
//# sourceMappingURL=Scene.js.map