import GLib from "gi://GLib";
import app from "ags/gtk4/app";
import Bar from "@/Bar";
import Config from "@/Config";
import { Frame } from "@/Frame";

export const KitsuneOptions: Parameters<typeof app.start>[0] = {
	instanceName: Config.App.name,
	main: () => {
		GLib.set_prgname(Config.App.id);
		const monitors = app.get_monitors();

		const primary =
			monitors.find((m) => {
				const geo = m.get_geometry();
				return geo.x === 0 && geo.y === 0;
			}) ?? monitors[0]!;

		Bar(primary);

		if (Config.Frame.enabled) {
			monitors.forEach(Frame);
		}
	},
};
