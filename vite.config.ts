import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

/**
 * Playground vite config — 패키지 격리 dev 환경 + GitHub Pages 배포.
 *
 * src/를 직접 alias로 묶어, tsup 빌드 사이클 없이 hot reload.
 *
 * - 로컬 dev:  npm run dev:play   →   http://localhost:5174
 * - GitHub Pages 빌드:  GH_PAGES=1 npm run build:play
 *   → kimminchul.github.io/anticard/ 배포용 (base: "/anticard/")
 */
export default defineConfig({
  root: "playground",
  base: process.env.GH_PAGES === "1" ? "/anticard/" : "/",
  resolve: {
    alias: {
      "@freeive/anti-card": resolve(__dirname, "src/index.ts"),
    },
  },
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
