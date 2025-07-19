import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                index: "index.html",
                "run-script": resolve(__dirname, "src/run-script.ts"),
                content: resolve(__dirname, "src/content.css"),
            },
            output: {
                entryFileNames: "[name].js",
                assetFileNames: "[name][extname]",
            },
        },
        outDir: "dist",

        emptyOutDir: true,
    },
});
