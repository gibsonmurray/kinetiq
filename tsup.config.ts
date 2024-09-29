import { defineConfig } from "tsup"

export default defineConfig({
    entry: {
        index: "index.ts",
    },
    format: ["esm"],
    dts: true,
    clean: true,
    skipNodeModulesBundle: true,
    target: "esnext",
    minify: true,
})