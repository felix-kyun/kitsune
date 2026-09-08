import app from "ags/gtk4/app";
import { KitsuneOptions } from "@/Kitsune";
import style from "./style.scss";

app.start({
	css: style,
	...KitsuneOptions,
});
