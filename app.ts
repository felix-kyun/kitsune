import app from "ags/gtk4/app";
import { KitsuneOptions } from "@/Kitsune";
import style from "./styles.scss";

app.start({
	css: style,
	...KitsuneOptions,
});
