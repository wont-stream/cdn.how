import { unlink } from "node:fs/promises";
import { watch } from "node:fs";

const NOWATCH = process.env.NOWATCH === "1";

const build = async () => {
	try { await unlink("dist"); } catch {}
	const start = Date.now();
	const built = await Bun.build({
		entrypoints: ["./src/index.html"],
		outdir: "./dist",
		html: true,
		experimentalCss: true,
		splitting: true,
		sourcemap: "linked",
		...(NOWATCH ? { minify: true } : {}),
	});
	const end = Date.now();
	console.log("Did build", built.success, built.logs);
	console.log("Build time:", end - start, "ms");
};

if (!NOWATCH) {
	watch(import.meta.dir, { recursive: true }, async (_, file) => {
		if (!file?.startsWith("dist")) return await build();
		return;
	});

	Bun.serve({
		async fetch(request, server) {
			const { pathname } = new URL(request.url);

			const file = pathname === "/" ? "/index.html" : pathname;

			return new Response(Bun.file(`dist${file}`));
		},
	});
}

await build();
