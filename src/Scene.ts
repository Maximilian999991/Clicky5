import { SimpleBox, getColor } from "./box.js";
import { TabBar } from "./TabBar.js";
import { Title } from "./Title.js";

export class Home {
	background: SimpleBox = new SimpleBox(getColor(0.5));

	constructor() {}

	update(tabbar: TabBar, title: Title) {
		const bg = this.background;
		const padding = myctx.height() * 0.03;
		const t = Math.round(tabbar.t);

		bg.pos = new vec2(myctx.width() * -t + padding, title.background.size.y + padding * 2);
		bg.size = new vec2(
			myctx.width() - padding * 2,
			myctx.height() - title.background.size.y - tabbar.background.size.y - padding * 4,
		);
	}
	render(dt: number) {
		const bg = this.background;

		bg.render(dt);
	}
}
