import { defineConfig } from "vite";

import path from "path";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@apps": path.resolve(__dirname, "./apps"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
