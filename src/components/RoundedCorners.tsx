export interface RoundedCornerConfig {
	xc: number;
	yc: number;
	start: number;
	end: number;
	radius: number;
}

export const RoundedCorner = (
	config: RoundedCornerConfig,
	props: object = {},
) => {
	const { radius: r, xc, yc, start, end } = config;
	return (
		<drawingarea
			{...props}
			$={(self) => {
				self.set_size_request(r, r);

				self.set_draw_func((area, cr) => {
					cr.arc(xc, yc, r, start, end);
					cr.lineTo(xc === 0 ? r : 0, yc === 0 ? r : 0);
					cr.closePath();

					const { red, green, blue, alpha } = area.get_color();
					cr.setSourceRGBA(red, green, blue, alpha);
					cr.fill();
				});
			}}
		/>
	);
};
