import app from "ags/gtk4/app";
import { MiriOptions } from "@/Miri";
import style from "./style.scss";

app.start({
	css: style,
	...MiriOptions,
});
