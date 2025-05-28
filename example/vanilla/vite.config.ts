import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: __dirname, // This makes Vite treat this folder as the root
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      // Make sure your library import works in vanilla example
      "typing-placeholder-input": resolve(__dirname, "../../dist/index.js"),
    },
  },
});
