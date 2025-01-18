const build = async (minify: boolean) => {
    const start = Date.now();
    const built = await Bun.build({
        entrypoints: ["./src/index.html"],
        outdir: "./dist",
        html: true,
        experimentalCss: true,
        splitting: true,
        sourcemap: "linked",
        minify
    });
    const end = Date.now();
    console.log("Did build", built.success, built.logs);
    console.log("Build time:", end - start, "ms");
};

await build(true);

export default build;
