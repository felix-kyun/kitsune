import GLib from "gi://GLib";
import app from "ags/gtk4/app";
import Bar from "@/Bar";
import Config, { getConfigDir } from "@/Config";
import { Frame } from "@/Frame";
import { ScreenCorners } from "@/ScreenCorners";
import { monitorConfigChanges, monitorStyleChanges } from "@/utils/monitor";
import style from "./styles.scss";

app.start({
	css: style,
	instanceName: Config.App.name,
	icons: Config.Files.icons,
	main: () => {
		GLib.set_prgname(Config.App.id);
		monitorStyleChanges();
		monitorConfigChanges();

		const monitors = app.get_monitors();
		const primary =
			monitors.find((m) => {
				const geo = m.get_geometry();
				return geo.x === 0 && geo.y === 0;
			}) ?? monitors[0]!;

		Bar(primary);

		// if (Config.Frame.enabled) {
		// 	monitors.forEach(Frame);
		// }

		ScreenCorners(primary);
	},
});
