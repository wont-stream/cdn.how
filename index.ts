import { unlink } from "node:fs/promises";
const js = await Bun.build({
    entrypoints: ["./src/index.ts"],
    minify: true,
    sourcemap: "none",
    outdir: "./dist",
})

let html = await Bun.file("./src/index.html").text()

html = html.replace('<script></script>', `<script>${await Bun.file("./dist/index.js").text()}</script>`)

try {
    await unlink("dist/index.html")
} catch (e) {
    console.log("Unable to delete file")
}
Bun.write("dist/index.html", html)

if (process.env.worker !== "true") {
   await Bun.$`bunx --bun http-server dist`
}