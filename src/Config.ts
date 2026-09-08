import GLib from "gi://GLib";

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
	},
};

// process config

Config.Files.styles = GLib.build_filenamev([
	getConfigDir(),
	Config.Files.styles,
]);
Config.Files.colors = GLib.build_filenamev([
	getConfigDir(),
	Config.Files.colors,
]);

export const prefixName = (name: string) => `${Config.App.namespace}-${name}`;

export function getConfigDir(): string {
	const configDir = GLib.get_user_config_dir();
	return GLib.build_filenamev([configDir, Config.App.name]);
}

export default Config;
