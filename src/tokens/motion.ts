/**
 * anti-card motion 토큰
 *
 * 5 duration + 3 easing. Tailwind 기본 easing이 이미 동일 베지어를 갖고 있으므로
 * 별도 클래스 추가 없이 standard / decelerate / accelerate 의미만 매핑.
 *
 * 안티 카드 motion 5원칙:
 * 1. 절제      — bounce / rotate / shake / dramatic zoom 거부
 * 2. 빠름      — 150ms hover · 200ms 상태 변경 기본
 * 3. 단방향    — opacity + 작은 transform (1~4px). scale > 1.05 거부
 * 4. 존중      — prefers-reduced-motion: reduce 자동 인식
 * 5. CSS first — JS transition은 필요할 때만 (in-view / focus trap 등)
 */

export const motion = {
  duration: {
    /** 75ms — 거의 즉각 (focus ring 같은 micro 반응) */
    instant: "75ms",
    /** 150ms — 호버, color 전환 (가장 자주 사용) */
    fast: "150ms",
    /** 200ms — 일반 상태 변경, 작은 transform */
    DEFAULT: "200ms",
    /** 300ms — 모달 fade, sliding panel, 큰 영역 변화 */
    slow: "300ms",
    /** 500ms — 페이지 in-view 등장, 누적 stagger 마지막 */
    slower: "500ms",
  } as const,

  easing: {
    /** 일반 상태 전환 (양방향). Tailwind ease-in-out과 동일. */
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    /** 진입(in) — UI가 화면에 들어옴. Tailwind ease-out과 동일. */
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    /** 퇴장(out) — UI가 화면에서 사라짐. Tailwind ease-in과 동일. */
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
  } as const,
} as const;

export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

/**
 * Tailwind 클래스 매핑 (참조용).
 *
 * Duration:
 *   - instant  → duration-instant  (75ms)
 *   - fast     → duration-fast     (150ms)
 *   - DEFAULT  → duration-200      (200ms — Tailwind 표준)
 *   - slow     → duration-slow     (300ms)
 *   - slower   → duration-slower   (500ms)
 *
 * Easing (Tailwind 기본 이미 동일):
 *   - standard   → ease-in-out
 *   - decelerate → ease-out  (UI in)
 *   - accelerate → ease-in   (UI out)
 *
 * 권장 매트릭스:
 *   Hover (color/border)    : duration-fast    + ease-in-out
 *   Button press / state    : duration-200     + ease-in-out
 *   Modal/Drawer enter      : duration-slow    + ease-out
 *   Modal/Drawer exit       : duration-fast    + ease-in
 *   페이지 in-view fade     : duration-slower  + ease-out
 *   Tooltip 등장            : duration-fast    + ease-out
 *
 * 접근성: prefers-reduced-motion: reduce 사용자에게는 transition: 0 권장
 *   (전역 CSS 1줄로 처리 — docs/motion.mdx 참고)
 */
