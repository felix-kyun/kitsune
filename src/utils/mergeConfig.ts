import type { DeepPartial } from "@/types/DeepPartial";

export function mergeConfig<T extends object>(
	baseConfig: T,
	override: DeepPartial<T>,
): T {
	const base = baseConfig as Record<string, unknown>;
	const ov = override as Record<string, unknown>;

	for (const key of Object.keys(ov)) {
		if (Array.isArray(base[key]) && Array.isArray(ov[key])) {
			base[key] = ov[key];
		} else if (
			base[key] instanceof Object &&
			ov[key] instanceof Object &&
			!Array.isArray(ov[key])
		) {
			mergeConfig(base[key], ov[key]);
		} else {
			base[key] = ov[key];
		}
	}

	return baseConfig;
}
