import GLib from "gi://GLib";

export function ensureFileExists(path: string, msg: string) {
	if (!GLib.file_test(path, GLib.FileTest.IS_REGULAR)) {
		throw new Error(msg);
	}
}

export function ensureDirExists(path: string, msg: string) {
	if (!GLib.file_test(path, GLib.FileTest.IS_DIR)) {
		throw new Error(msg);
	}
}
