"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 어느 쪽에서 슬라이드 */
  side?: "left" | "right";
  /** 헤더 제목 */
  title?: React.ReactNode;
  /** 본문 */
  children?: React.ReactNode;
  /** 푸터 액션 */
  footer?: React.ReactNode;
  /** 너비 — narrow=320 / default=420 / wide=560 */
  size?: "narrow" | "default" | "wide";
  /** 닫기 버튼 표시 */
  showClose?: boolean;
}

/**
 * Drawer — 옆에서 슬라이드되는 패널.
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px, 큰 padding.
 * Dialog와 차이: 옆에서 슬라이드(left/right), 더 긴 콘텐츠·폼 적합.
 *
 * ESC + 백드롭 클릭으로 닫힘. body scroll lock 자동.
 *
 * @example
 *   <Drawer open={open} onOpenChange={setOpen} title="필터" side="right">
 *     <FilterForm />
 *   </Drawer>
 */
export function Drawer({
  open,
  onOpenChange,
  side = "right",
  title,
  children,
  footer,
  size = "default",
  showClose = true,
}: DrawerProps) {
  // body scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC 키로 닫힘
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div data-anti-card="drawer" data-side={side} className="fixed inset-0 z-50">
      <div
        onClick={() => onOpenChange(false)}
        aria-hidden
        className="absolute inset-0 bg-zinc-900/40 animate-anti-fade-in dark:bg-black/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={cn(
          "absolute top-0 bottom-0 flex flex-col border-zinc-200 bg-white text-zinc-900 dark:border-white/[0.08] dark:bg-zinc-900 dark:text-zinc-100",
          size === "narrow" && "w-[min(92vw,320px)]",
          size === "default" && "w-[min(92vw,420px)]",
          size === "wide" && "w-[min(92vw,560px)]",
          side === "left" && "left-0 border-r animate-anti-slide-in-left",
          side === "right" && "right-0 border-l animate-anti-slide-in-right"
        )}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-white/[0.06]">
            {title ? (
              <h2 className="text-[16px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
              </h2>
            ) : (
              <span aria-hidden />
            )}
            {showClose && (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="닫기"
                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        <div className="thin-scroll flex-1 overflow-y-auto p-6">{children}</div>
        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-white/[0.06]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
