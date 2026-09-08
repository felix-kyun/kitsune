import app from "ags/gtk4/app";
import Bar from "@/Bar";
import { Frame } from "@/Frame";

export const MiriOptions: Parameters<typeof app.start>[0] = {
	main: () => {
		const monitors = app.get_monitors();

		const primary =
			monitors.find((m) => {
				const geo = m.get_geometry();
				return geo.x === 0 && geo.y === 0;
			}) ?? monitors[0]!;

		Bar(primary);
		Frame(primary);
	},
};
