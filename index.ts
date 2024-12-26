import { unlink } from "node:fs/promises";
await Bun.build({
    entrypoints: ["./src/index.ts"],
    minify: true,
    sourcemap: "none",
    outdir: "./dist",
})

const js = await Bun.file("./dist/index.js").text()

let html = await Bun.file("./src/index.html").text()

html = html.replace("<!-- SCRIPT HERE -->", `<script>${js}</script>`)

try {
    await unlink("dist/index.html")
} catch (e) {
    console.log("Unable to delete file")
}
Bun.write("dist/index.html", html)

if (process.env.worker !== "true") {
   await Bun.$`bunx --bun http-server dist`
}