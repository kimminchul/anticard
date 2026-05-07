import type { Config } from "tailwindcss";

export default {
  content: [
    "./playground/**/*.{ts,tsx,html}",
    "./src/**/*.{ts,tsx}",
  ],
  /**
   * Arbitrary value (md:grid-cols-[...]) 들이 production 빌드에서
   * 일부 누락되는 케이스 방지 — safelist로 강제 보존.
   *
   * playground / src / freeive 모두에서 자주 쓰는 layout grid 패턴.
   */
  safelist: [
    // playground 메인 layout
    "md:grid-cols-[280px_1fr]",
    // ListRow / Timeline / DefList 등 행 layout
    "md:grid-cols-[140px_1fr_auto]",
    "md:grid-cols-[140px_1fr]",
    "md:grid-cols-[120px_1fr]",
    "md:grid-cols-[60px_1fr]",
    "md:grid-cols-[60px_180px_1fr]",
    // Header
    "md:grid-cols-[1.5fr_3fr]",
    // GridSystem 12-col span variants (1~12)
    ...Array.from({ length: 12 }, (_, i) => `md:col-span-${i + 1}`),
    ...Array.from({ length: 12 }, (_, i) => `md:col-start-${i + 1}`),
    // GridSystem columns
    "md:grid-cols-12",
    "md:grid-cols-8",
    "md:grid-cols-6",
    "md:grid-cols-16",
    "md:grid-cols-24",
  ],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
