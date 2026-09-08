import { Astal, type Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { createPoll } from "ags/time";
import { Config, prefixName } from "@/Config";

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

export default function Bar(monitor: Gdk.Monitor) {
	const time = createPoll("", 1000, "date");

	return (
		<window
			visible
			class="Bar"
			name={prefixName("bar")}
			namespace={Config.App.namespace}
			gdkmonitor={monitor}
			layer={Astal.Layer.TOP}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
			application={app}
		>
			<centerbox>
				<box $type="center">
					<label label={time} />
				</box>
			</centerbox>
		</window>
	);
}
