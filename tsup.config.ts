import { defineConfig } from "tsup";

/**
 * Next.js Server Component 호환:
 * src/index.ts 최상단의 "use client" directive를 esbuild가 dist 출력에 보존합니다.
 * 라이브러리 전체를 client boundary로 마킹 — children은 사용자가 server component 유지 가능.
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  treeshake: true,
  clean: true,
  external: ["react", "react-dom"],
  target: "es2022",
});
