import { getColor } from "./box.js";
import { Home } from "./Scene.js";
import { TabBar } from "./TabBar.js";
import { Title } from "./Title.js";
async function main() {
    const tabbar = new TabBar();
    const title = new Title();
    const sHome = new Home();
    while (true) {
        myctx.fillRect([0, 0], myctx.size(), { color: getColor(0.25) });
        sHome.update(tabbar, title);
        sHome.render(1 / 60);
        tabbar.render(1 / 60);
        title.render(1 / 60);
        await myctx.render();
    }
}
main();
//# sourceMappingURL=main.js.map