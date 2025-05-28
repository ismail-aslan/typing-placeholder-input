import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      outDir: "dist",
      entryRoot: "src",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        react: path.resolve(__dirname, "src/react/TypingInput.tsx"),
      },
      formats: ["es"],
      fileName: (format, entryName) =>
        entryName === "index" ? "index.js" : "react.js",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        exports: "auto",
        entryFileNames: "[name].js",
      },
    },
  },
});
