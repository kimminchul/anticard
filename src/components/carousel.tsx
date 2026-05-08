"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

export interface CarouselSlide {
  id: string;
  /** 슬라이드 본문 (이미지·콘텐츠 자유) */
  content: React.ReactNode;
  /** 스크린리더용 라벨 — 미지정 시 "i / total" */
  label?: string;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: CarouselSlide[];
  /** 시작 인덱스 */
  defaultIndex?: number;
  /** 자동재생 */
  autoPlay?: boolean;
  /** 자동재생 간격 (ms) — default 5000 */
  interval?: number;
  /** 좌우 화살표 — default true */
  showArrows?: boolean;
  /** 하단 dots — default true */
  showDots?: boolean;
  /** 마지막 → 처음 순환 — default true */
  loop?: boolean;
  /** 비율 — default "16/9" */
  aspect?: "16/9" | "4/3" | "1/1" | "21/9";
  /** 전환 모션 — fade(default) / slide */
  transition?: "fade" | "slide";
  /** 인덱스 변경 콜백 */
  onIndexChange?: (index: number) => void;
}

/**
 * Carousel — 캐러셀 / 슬라이드.
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px, emerald active dot.
 * 화살표는 가장자리 ghost 버튼 (호버 강조 X — 본 콘텐츠 우선).
 *
 * 접근성: role=region + aria-roledescription="carousel",
 * 각 슬라이드 role=group, ←/→ 키보드, 호버 시 autoPlay 일시정지.
 * 모바일: 좌우 스와이프 (40px threshold, 세로 우세 시 페이지 스크롤 양보).
 *
 * @example
 *   <Carousel
 *     slides={[
 *       { id: "a", content: <img src="..." className="h-full w-full object-cover" /> },
 *       { id: "b", content: <img src="..." className="h-full w-full object-cover" /> },
 *     ]}
 *     autoPlay
 *   />
 */
export function Carousel({
  slides,
  defaultIndex = 0,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  loop = true,
  aspect = "16/9",
  transition = "fade",
  onIndexChange,
  className,
  ...props
}: CarouselProps) {
  const [index, setIndex] = React.useState(defaultIndex);
  const [paused, setPaused] = React.useState(false);
  const total = slides.length;

  const goTo = React.useCallback(
    (i: number) => {
      const next = loop
        ? ((i % total) + total) % total
        : Math.max(0, Math.min(total - 1, i));
      setIndex(next);
      onIndexChange?.(next);
    },
    [loop, total, onIndexChange]
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // autoPlay interval — index 의존성 제외(매 변경마다 timer 재설정 방지),
  // 함수형 업데이트로 항상 최신 index 기반 next 계산.
  React.useEffect(() => {
    if (!autoPlay || paused || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        const nextI = i + 1;
        const next = loop
          ? ((nextI % total) + total) % total
          : Math.max(0, Math.min(total - 1, nextI));
        onIndexChange?.(next);
        return next;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [autoPlay, paused, total, interval, loop, onIndexChange]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  // 터치 스와이프 — 40px 이상 가로 이동 시 prev/next.
  // 세로 이동이 더 크면 무시(페이지 스크롤 방해 X).
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.changedTouches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    const SWIPE = 40;
    if (Math.abs(dx) < SWIPE) return;
    if (Math.abs(dy) > Math.abs(dx)) return; // 세로 우세 — 스크롤로 양보
    if (dx > 0) prev();
    else next();
  };

  if (total === 0) return null;

  const aspectCls =
    aspect === "16/9"
      ? "aspect-[16/9]"
      : aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "1/1"
      ? "aspect-square"
      : "aspect-[21/9]";

  const arrowCls =
    "absolute top-1/2 -translate-y-1/2 rounded-md border border-zinc-200 bg-white/80 p-1.5 text-zinc-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-zinc-900 dark:border-white/[0.12] dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100";

  return (
    <div
      data-anti-card="carousel"
      data-transition={transition}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "relative overflow-hidden rounded-md border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 dark:border-white/[0.08]",
        className
      )}
      {...props}
    >
      <div className={cn("relative", aspectCls)}>
        {transition === "fade" &&
          slides.map((s, i) => (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={s.label ?? `${i + 1} / ${total}`}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-out",
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              {s.content}
            </div>
          ))}
        {transition === "slide" && (
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div
                key={s.id}
                role="group"
                aria-roledescription="slide"
                aria-label={s.label ?? `${i + 1} / ${total}`}
                aria-hidden={i !== index}
                className="h-full w-full shrink-0"
              >
                {s.content}
              </div>
            ))}
          </div>
        )}
      </div>

      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="이전 슬라이드"
            className={cn(arrowCls, "left-3")}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="다음 슬라이드"
            className={cn(arrowCls, "right-3")}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div
          role="tablist"
          aria-label="슬라이드 선택"
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
        >
          {slides.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`슬라이드 ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full border transition-all duration-200",
                  isActive
                    ? "w-5 border-emerald-500 bg-emerald-500 dark:border-emerald-400 dark:bg-emerald-400"
                    : "w-1.5 border-zinc-400 bg-white/50 hover:border-zinc-600 dark:border-white/30 dark:bg-white/[0.04] dark:hover:border-white/50"
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
