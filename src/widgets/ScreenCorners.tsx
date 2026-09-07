import { Astal, type Gdk, Gtk } from "ags/gtk4";
import {
	RoundedCorner,
	type RoundedCornerConfig,
} from "@/components/RoundedCorners";
import { CornerRadius } from "@/config";

type Config = RoundedCornerConfig & {
	anchor: Astal.WindowAnchor;
	monitor: Gdk.Monitor;
	halign: Gtk.Align;
	valign: Gtk.Align;
};

const ScreenCornerBuilder = (config: Config) => (
	<window
		visible
		gdkmonitor={config.monitor}
		layer={Astal.Layer.TOP}
		exclusivity={Astal.Exclusivity.NORMAL}
		anchor={config.anchor}
		halign={config.halign}
		valign={config.valign}
	>
		<RoundedCorner {...config} />
	</window>
);

const geo: Record<string, Omit<Config, "monitor">> = {
	"top-left": {
		anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT,
		halign: Gtk.Align.START,
		valign: Gtk.Align.START,
		xc: CornerRadius,
		yc: CornerRadius,
		radius: CornerRadius,
		start: Math.PI,
		end: (3 * Math.PI) / 2,
	},
	"top-right": {
		anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT,
		halign: Gtk.Align.END,
		valign: Gtk.Align.START,
		xc: 0,
		yc: CornerRadius,
		radius: CornerRadius,
		start: (3 * Math.PI) / 2,
		end: 0,
	},
	"bottom-left": {
		anchor: Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT,
		halign: Gtk.Align.START,
		valign: Gtk.Align.END,
		xc: CornerRadius,
		yc: 0,
		radius: CornerRadius,
		start: Math.PI / 2,
		end: Math.PI,
	},
	"bottom-right": {
		anchor: Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT,
		halign: Gtk.Align.END,
		valign: Gtk.Align.END,
		xc: 0,
		yc: 0,
		radius: CornerRadius,
		start: 0,
		end: Math.PI / 2,
	},
};

export const ScreenCorners = (monitor: Gdk.Monitor) => {
	Object.values(geo).map((config) =>
		ScreenCornerBuilder({ ...config, monitor }),
	);
};
