import * as React from "react";
import { cn } from "../utils/cn";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  /** 툴팁 본문 */
  content: React.ReactNode;
  /** 위치 */
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

/**
 * Tooltip — 호버 시 작은 정보 띠.
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px + 작은 padding.
 * CSS group-hover 사용 — JS 불필요. focus 시에도 노출 (접근성).
 *
 * 주의: trigger는 inline 요소 권장 (button / a / span 안 텍스트).
 *
 * @example
 *   <Tooltip content="저장됩니다" side="top">
 *     <button>저장</button>
 *   </Tooltip>
 */
export function Tooltip({
  content,
  side = "top",
  children,
  className,
  ...props
}: TooltipProps) {
  return (
    <span
      data-anti-card="tooltip"
      data-side={side}
      className={cn("group/tt relative inline-flex", className)}
      {...props}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11.5px] text-zinc-900 opacity-0 transition-opacity duration-150 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100 dark:border-white/[0.12] dark:bg-zinc-900 dark:text-zinc-100",
          side === "top" && "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
          side === "bottom" && "top-full left-1/2 mt-1.5 -translate-x-1/2",
          side === "left" && "right-full top-1/2 mr-1.5 -translate-y-1/2",
          side === "right" && "left-full top-1/2 ml-1.5 -translate-y-1/2"
        )}
      >
        {content}
      </span>
    </span>
  );
}
