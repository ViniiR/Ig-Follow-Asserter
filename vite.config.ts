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
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
    outDir: "dist",

    emptyOutDir: true,
  },
});
