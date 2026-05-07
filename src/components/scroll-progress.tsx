"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export interface ScrollProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 위치. top(고정 상단) / bottom(고정 하단) */
  position?: "top" | "bottom";
  /** 색 톤. accent=emerald / mute=zinc */
  tone?: "accent" | "mute";
  /** 두께 px. 기본 2 */
  thickness?: number;
  /** 추적할 요소. 기본 document */
  target?: React.RefObject<HTMLElement>;
}

/**
 * ScrollProgress — 페이지 스크롤 진행 막대.
 *
 * sticky / fixed 위치에서 좌→우로 차오르는 1~3px 막대.
 * 본문 흐름 거의 안 막음 (anti-card 정체성).
 *
 * target 지정 안 하면 document 전체 스크롤 추적.
 *
 * @example
 *   // 페이지 상단 고정
 *   <ScrollProgress position="top" />
 *
 *   // 특정 article 스크롤만 추적
 *   const ref = useRef<HTMLElement>(null);
 *   <article ref={ref}>...</article>
 *   <ScrollProgress target={ref} position="top" />
 */
export function ScrollProgress({
  position = "top",
  tone = "accent",
  thickness = 2,
  target,
  className,
  style,
  ...props
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      if (target?.current) {
        const el = target.current;
        const rect = el.getBoundingClientRect();
        const total = el.scrollHeight - window.innerHeight;
        if (total <= 0) {
          setProgress(0);
          return;
        }
        const scrolled = -rect.top;
        const ratio = Math.max(0, Math.min(1, scrolled / total));
        setProgress(ratio);
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total <= 0) {
          setProgress(0);
          return;
        }
        const scrolled = window.scrollY;
        const ratio = Math.max(0, Math.min(1, scrolled / total));
        setProgress(ratio);
      }
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [target]);

  return (
    <div
      data-anti-card="scroll-progress"
      data-tone={tone}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "fixed left-0 right-0 z-50 pointer-events-none",
        position === "top" && "top-0",
        position === "bottom" && "bottom-0",
        className
      )}
      style={{ height: `${thickness}px`, ...style }}
      {...props}
    >
      <div
        className={cn(
          "h-full transition-[width] duration-100 ease-out",
          tone === "accent" && "bg-emerald-500 dark:bg-emerald-400",
          tone === "mute" && "bg-zinc-700 dark:bg-zinc-300"
        )}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
