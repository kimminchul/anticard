/**
 * anti-card 타이포그래피 토큰 (단일 진실 원천)
 *
 * 원칙:
 * - 차분 톤: shadcn식 거대 hero(64~80px) 거부, display 30~48px
 * - 굵기 3단계만: 400(regular) / 500(medium) / 600(semibold)
 *   bold(700)·black(900) 사용 X
 * - 색 7단계만: zinc-900 / 700 / 600 / 500 / 400 / 300 / 50
 * - 자간: 큰 타입 negative, smallcaps만 +0.08em, 본문은 0
 * - 줄간격은 크기 반비례: display 1.1, body 1.65
 *
 * 호스트가 폰트를 override 하려면 :root에서 CSS 변수:
 *   --anti-card-font-sans: "Pretendard Variable", system-ui, sans-serif;
 *   --anti-card-font-mono: ui-monospace, ...;
 */
export const typography = {
  /** HeroHeading size="hero" — 메인 페이지 최상위 hero (40~64px). 사이트당 1번만. */
  displayLg:
    "text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-zinc-900 dark:text-zinc-50",

  /** HeroHeading default — 일반 페이지 첫 화면 타이틀 (30~48px). Lab/Heritage/Blog 등. */
  display:
    "text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-zinc-900 dark:text-zinc-50",

  /** SectionHeading h2 — 섹션 제목 */
  h2: "text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-zinc-900 dark:text-zinc-50",

  /** SectionHeading h3 — 서브섹션 */
  h3: "text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-zinc-900 dark:text-zinc-50",

  /** h4 — 블로그 글 단락 제목 */
  h4: "text-[1.125rem] font-medium leading-[1.4] text-zinc-900 dark:text-zinc-50",

  /** 본문 기본 — 15px / 1.65 */
  body: "text-[0.9375rem] leading-[1.65] text-zinc-700 dark:text-zinc-300",

  /** Lead 인트로 본문 (15px, body보다 한 단계 흐림) */
  lead: "text-[0.9375rem] leading-relaxed text-zinc-600 dark:text-zinc-300",

  /** Lead Large — 히어로 직후 큰 인트로 (18~20px) */
  leadLarge:
    "text-[1.125rem] md:text-[1.25rem] leading-relaxed text-zinc-600 dark:text-zinc-300",

  /** 보조 본문·meta — 13.5px */
  small: "text-[0.84rem] leading-[1.5] text-zinc-600 dark:text-zinc-400",

  /** smallcaps 라벨 — Eyebrow의 본체 톤 */
  eyebrow:
    "text-[0.75rem] uppercase tracking-[0.08em] font-medium leading-tight text-zinc-500 dark:text-zinc-400",

  /** Eyebrow accent (emerald) */
  eyebrowAccent:
    "text-[0.75rem] uppercase tracking-[0.08em] font-medium leading-tight text-emerald-600 dark:text-emerald-400",

  /** 인라인 코드 — 0.92em 상대 크기로 본문에 자연스럽게 */
  code: "font-mono text-[0.92em] text-zinc-800 dark:text-zinc-200",
} as const;

export type TypographyToken = keyof typeof typography;
