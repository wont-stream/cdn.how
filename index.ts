import { watch } from "node:fs";

const build = async () => {
	const build = await import("./build");

	await build.default(false);
}

watch(import.meta.dir, { recursive: true }, async (_, file) => {
	if (file?.startsWith("dist")) return;
	return await build();
});

Bun.serve({
	async fetch(request, server) {
		const { pathname } = new URL(request.url);

		const file = pathname === "/" ? "/index.html" : pathname;

		return new Response(Bun.file(`dist${file}`));
	},
});

await build();