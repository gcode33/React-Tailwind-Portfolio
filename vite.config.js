import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { readBuildInfo } from "./scripts/build-info.mjs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD_INFO__: JSON.stringify(readBuildInfo()),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
  },
});
