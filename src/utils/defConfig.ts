import type Config from "@/Config";
import type { DeepPartial } from "@/types/DeepPartial";

export function defConfig(config: DeepPartial<typeof Config>) {
	return config;
}
