const js = await Bun.build({
    entrypoints: ["./src/index.ts"],
    minify: true,
    sourcemap: "none"
})

const html = await Bun.file("./src/index.html")

Bun.write("dist/index.html", (await html.text()).replace('<script src="./stars.js" defer async type="module" ></script>', `<script>${await js.outputs[0].text()}</script>`))