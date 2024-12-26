import { unlink } from "node:fs/promises";
const file = await Bun.build({
    entrypoints: ["./src/index.ts"],
    minify: true,
    sourcemap: "none",
    outdir: "./dist",
    naming: {
        entry: "[name]-[hash].[ext]",
    }
})

let html = await Bun.file("./src/index.html").text()

html = html.replace("<!-- SCRIPT HERE -->", `<script src="index-${file.outputs[0].hash}.js" defer async></script>`)

try {
    await unlink("dist/index.html")
} catch (e) {
    console.log("Unable to delete file")
}
Bun.write("dist/index.html", html)

if (process.env.worker !== "true") {
   await Bun.$`bunx --bun http-server dist`
}