import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/test-cache/",
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
});
