import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

/**
 * Playground vite config — 패키지 격리 dev 환경.
 *
 * src/를 직접 alias로 묶어, tsup 빌드 사이클 없이 hot reload.
 *
 * 실행:  npm run dev:play   →   http://localhost:5174
 */
export default defineConfig({
  root: "playground",
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
});
