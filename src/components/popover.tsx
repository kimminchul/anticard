"use client";
import * as React from "react";
import { cn } from "../utils/cn";

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  /** Trigger 요소 (button 권장) */
  trigger: React.ReactNode;
  /** Popover 본문 */
  content: React.ReactNode;
  /** 위치 */
  side?: "top" | "bottom" | "left" | "right";
  /** top/bottom 일 때 가로 정렬 */
  align?: "start" | "center" | "end";
  /** 외부 클릭 시 닫기. default true */
  closeOnOutside?: boolean;
}

/**
 * Popover — 트리거 옆에 떠있는 작은 패널.
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px, 큰 padding.
 * Tooltip과 차이: 클릭으로 열고 닫음 (호버 X), 인터랙티브 콘텐츠 가능.
 *
 * @example
 *   <Popover
 *     trigger={<Button variant="ghost">설정</Button>}
 *     content={<div>설정 폼...</div>}
 *     side="bottom"
 *   />
 */
export function Popover({
  trigger,
  content,
  side = "bottom",
  align = "start",
  closeOnOutside = true,
  className,
  ...props
}: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open || !closeOnOutside) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open, closeOnOutside]);

  return (
    <div
      ref={ref}
      data-anti-card="popover"
      data-state={open ? "open" : "closed"}
      className={cn("relative inline-flex", className)}
      {...props}
    >
      <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      {open && (
        <div
          role="dialog"
          className={cn(
            "absolute z-50 min-w-[220px] rounded-md border border-zinc-200 bg-white p-4 dark:border-white/[0.12] dark:bg-zinc-900",
            side === "bottom" && "top-full mt-1.5",
            side === "top" && "bottom-full mb-1.5",
            side === "left" && "right-full top-0 mr-1.5",
            side === "right" && "left-full top-0 ml-1.5",
            (side === "bottom" || side === "top") && align === "start" && "left-0",
            (side === "bottom" || side === "top") && align === "center" && "left-1/2 -translate-x-1/2",
            (side === "bottom" || side === "top") && align === "end" && "right-0"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
