import GLib from "gi://GLib";
import { monitorFile } from "ags/file";
import app from "ags/gtk4/app";
import { exec } from "ags/process";
import Config, { getConfigDir } from "@/Config";

const files = (() => {
	const baseDir = getConfigDir();
	const dir = GLib.Dir.open(baseDir, 0);
	const files: Array<string> = [];

	let name = dir.read_name();
	while (name) {
		const path = GLib.build_filenamev([baseDir, name]);
		if (GLib.file_test(path, GLib.FileTest.IS_REGULAR)) {
			files.push(name);
		}
		name = dir.read_name();
	}

	return files;
})();

function update_css() {
	const buildTarget = exec(["mktemp", "--suffix", ".css"]);
	exec(["sass", Config.Files.styles, buildTarget]);
	app.reset_css();
	app.apply_css(buildTarget);
}

export function monitorStyleChanges() {
	update_css();

	files
		.filter((file) => file.endsWith(".scss"))
		.forEach((file) => {
			monitorFile(file, update_css);
		});
}

export function monitorConfigChanges() {
	const configDir = getConfigDir();
	const target = GLib.build_filenamev([configDir, "kitsune"]);
	monitorFile(target, () => {
		app.quit();
	});
}
