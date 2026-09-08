import { Astal, Gtk, type Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Config } from "@/Config";
import Cairo from "cairo";

const {
	Exclusivity,
	Layer,
	WindowAnchor: { TOP, RIGHT, BOTTOM, LEFT },
} = Astal;

function drawRoundedRect(
	cr: Cairo.Context,
	opts: {
		width: number;
		height: number;
		margin: typeof Config.Frame.margin;
		radius: number;
	},
) {
	const { width, height, margin, radius } = opts;

	cr.newSubPath();

	// top-left
	cr.arc(
		margin.left + radius,
		margin.top + radius,
		radius,
		Math.PI,
		(3 * Math.PI) / 2,
	);

	cr.lineTo(width - margin.right - radius, margin.top);

	// top-right
	cr.arc(
		width - margin.right - radius,
		margin.top + radius,
		radius,
		(3 * Math.PI) / 2,
		0,
	);

	cr.lineTo(width - margin.right, height - margin.bottom - radius);

	// bottom-right
	cr.arc(
		width - margin.right - radius,
		height - margin.bottom - radius,
		radius,
		0,
		Math.PI / 2,
	);

	cr.lineTo(margin.left + radius, height - margin.bottom);

	// bottom-left
	cr.arc(
		margin.left + radius,
		height - margin.bottom - radius,
		radius,
		Math.PI / 2,
		Math.PI,
	);

	cr.lineTo(margin.left, margin.top + radius);

	cr.closePath();
}

export const Frame = (monitor: Gdk.Monitor) => {
	return (
		<window
			visible
			name="miri-shell-frame"
			class="Frame"
			gdkmonitor={monitor}
			layer={Layer.TOP}
			exclusivity={Exclusivity.NORMAL}
			anchor={TOP | RIGHT | BOTTOM | LEFT}
			application={app}
			canTarget={false}
			canFocus={false}
			$={(window) => {
				const region = new Cairo.Region();
				window.get_surface()?.set_input_region(region);
			}}
		>
			<drawingarea
				class="canvas"
				$={(self) => {
					self.set_draw_func((area, cr, width, height) => {
						const { red, green, blue, alpha } = area.get_color();
						cr.setSourceRGBA(red, green, blue, alpha);

						drawRoundedRect(cr, {
							height,
							width,
							radius: 0,
							margin: {
								top: 0,
								bottom: 0,
								right: 0,
								left: 0,
							},
						});

						drawRoundedRect(cr, {
							height,
							width,
							radius: Config.Frame.radius,
							margin: Config.Frame.margin,
						});

						cr.setFillRule(Cairo.FillRule.EVEN_ODD);
						cr.fill();
					});
				}}
			/>
		</window>
	);
};
