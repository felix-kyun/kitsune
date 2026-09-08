import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Bar from "@/Bar";
import { Frame } from "@/Frame";

import style from "./style.scss";

app.start({
	css: style,
	main() {
		const monitors = app.get_monitors();

		const primary =
			monitors.find((m) => {
				const geo = m.get_geometry();
				return geo.x === 0 && geo.y === 0;
			}) ?? (monitors[0] as Gdk.Monitor);

		Bar(primary);
		Frame(primary);
	},
});
