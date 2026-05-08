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
    // Motion 애니메이션 레시피 — 동적/조건부 사용 안전망
    "animate-anti-fade-in",
    "animate-anti-fade-in-fast",
    "animate-anti-fade-out",
    "animate-anti-slide-up",
    "animate-anti-slide-down",
    "animate-anti-slide-in-right",
    "animate-anti-slide-in-left",
    "animate-anti-scale-in",
    "backdrop:animate-anti-fade-in",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Pretendard 디폴트 — index.html이 CDN에서 로드, 모든 font-sans 클래스가 이를 우선
        sans: [
          '"Pretendard Variable"',
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          "sans-serif",
        ],
      },
      // Motion — anti-card 모션 토큰 (src/tokens/motion.ts와 동기화)
      // Tailwind 기본 ease-in-out / ease-out / ease-in이 이미 standard/decelerate/accelerate와
      // 동일한 cubic-bezier라서 별도 easing 클래스는 추가 안 함.
      transitionDuration: {
        instant: "75ms",
        fast: "150ms",
        slow: "300ms",
        slower: "500ms",
      },
      // 애니메이션 레시피 — 토큰(duration + easing)을 합친 자주 쓰는 모션 패턴.
      // 사용: animate-anti-fade-in / animate-anti-slide-up 등.
      keyframes: {
        "anti-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "anti-fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "anti-slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "anti-slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "anti-slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "anti-slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "anti-scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        // duration + easing 토큰 매핑된 사용 가능 클래스
        "anti-fade-in": "anti-fade-in 300ms cubic-bezier(0, 0, 0.2, 1)",
        "anti-fade-in-fast": "anti-fade-in 150ms cubic-bezier(0, 0, 0.2, 1)",
        "anti-fade-out": "anti-fade-out 150ms cubic-bezier(0.4, 0, 1, 1)",
        "anti-slide-up": "anti-slide-up 300ms cubic-bezier(0, 0, 0.2, 1)",
        "anti-slide-down": "anti-slide-down 300ms cubic-bezier(0, 0, 0.2, 1)",
        "anti-slide-in-right": "anti-slide-in-right 300ms cubic-bezier(0, 0, 0.2, 1)",
        "anti-slide-in-left": "anti-slide-in-left 300ms cubic-bezier(0, 0, 0.2, 1)",
        "anti-scale-in": "anti-scale-in 200ms cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
