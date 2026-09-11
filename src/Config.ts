import GLib from "gi://GLib";
import { mergeConfig } from "./utils/mergeConfig";

export const Config = {
	App: {
		name: "kitsune",
		id: "dev.felix.kitsune",
		namespace: "kitsune-shell",
	},
	Frame: {
		enabled: true,
		margin: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		radius: 16,
	},
	Files: {
		styles: "styles.scss",
		colors: "colors.scss",
		override: "config.override.ts",
		icons: "icons",
	},
	modules: {
		datetime: {
			format: "%a %b %d  %I:%M %p",
		},
	},
	restartDelay: 1000,
	shrug: "¯\\_(ツ)_/¯",
};

// process file paths
for (const key in Config.Files) {
	const relativePath = key as keyof typeof Config.Files;
	Config.Files[relativePath] = prependConfigDir(Config.Files[relativePath]);
}

// override default config
if (GLib.file_test(Config.Files.override, GLib.FileTest.IS_REGULAR)) {
	const override = await import("./../config.override.ts");
	mergeConfig(Config, override.default);
}

export const prefixName = (name: string) => `${Config.App.namespace}-${name}`;

export function getConfigDir(): string {
	const configDir = GLib.get_user_config_dir();
	return GLib.build_filenamev([configDir, Config.App.name]);
}

export function prependConfigDir(relativePath: string) {
	return GLib.build_filenamev([getConfigDir(), relativePath]);
}

export default Config;
