import { SimpleBox, TextBox, getColor } from "./box.js";
export class Title {
    background = new SimpleBox(getColor(0.5));
    title = new TextBox();
    counters = [];
    constructor() {
        this.counters.push({ s: true, box: new TextBox(), fn: () => "Test1: 1234" });
        this.counters.push({ s: true, box: new TextBox(), fn: () => "Test2: 1234" });
        this.counters.push({ s: true, box: new TextBox(), fn: () => "Test3: 1234" });
    }
    render(dt) {
        const textSize = myctx.height() * 0.03;
        const textSize2 = myctx.height() * 0.02;
        const padding = myctx.height() * 0.03;
        const bg = this.background;
        const t = this.title;
        let height = padding;
        let width = padding * 2;
        const [tw, th] = myctx.measureText("Clicky5", { size: textSize });
        t.pos = bg.pos.add(new vec2(padding, bg.size.y * 0.5 - th * 0.5));
        t.size = new vec2(tw, th);
        height = th;
        width += tw + padding;
        let height2 = 0;
        let width2 = 0;
        for (let i = 0; i < this.counters.length; i++) {
            const t = this.counters[i];
            t.box.text = t.fn();
            const [tw, th] = myctx.measureText(t.box.text, { size: textSize2 });
            t.box.pos = bg.pos.add(new vec2(width, height2 + padding * 0.5));
            if (t.s) {
                t.box.textSize = textSize2;
                t.box.size = new vec2(tw, th);
                height2 += th;
                width2 = Math.max(tw, width2);
            }
            else {
                t.box.textSize = 0;
                t.box.size = new vec2(0, 0);
            }
        }
        height = Math.max(height, height2) + padding;
        width = width + padding * 2 + width2;
        bg.pos = new vec2(myctx.width() * 0.5 - width * 0.5, padding);
        bg.size = new vec2(width, height);
        bg.render(dt);
        for (let i = 0; i < this.counters.length; i++) {
            const t = this.counters[i];
            t.box.render(dt);
        }
        t.render(dt);
        myctx.drawText(t.smoothPos.add(t.smoothSize.mul(0.5)), "Clicky ", { size: textSize, align: "center", baseline: "middle" }, { color: getColor(0.25) });
        myctx.drawText(t.smoothPos.add(t.smoothSize.mul(0.5)), "      5", {}, {
            color: "hsl(" + ((performance.now() * 0.1) % 360) + ", 100%, 50%)",
        });
    }
}
//# sourceMappingURL=Title.js.map