import { unlink } from "node:fs/promises";
import { watch } from "node:fs";
import { Glob } from "bun";
import type { BuildArtifact } from "bun";
import { join } from "node:path";

const glob = new Glob("**/*");

const NOWATCH = process.env.NOWATCH === "1";

const build = async () => {
	const start = Date.now();
	const built = await Bun.build({
		entrypoints: ["./src/index.html"],
		outdir: "./dist",
		html: true,
		experimentalCss: true,
		splitting: true,
		sourcemap: "linked",
		...(NOWATCH ? {minify: true} : {})
	});
	const end = Date.now();
	if (NOWATCH) await cleanOldFiles(built.outputs);
	console.log("Did build", built.success, built.logs);
	console.log("Build time:", end - start, "ms");
};

const cleanOldFiles = async (outputs: BuildArtifact[]) => {
	let distFiles: string[] = [];
	for await (const file of glob.scan("./dist")) {
		distFiles.push(file);
	}

	for await (const output of outputs) {
		const arr = output.path.split("\\");
		const file = arr[arr.length - 1];

		distFiles = distFiles.filter((item) => item !== file);
	}

	return await Promise.all(
		Array.from(distFiles).map((file) => unlink(join("dist", file))),
	);
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
