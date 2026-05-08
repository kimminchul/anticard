"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import { trapFocus, getFocusableElements } from "../utils/focus-trap";

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
 * Dialog와 동일하게 focus trap + initial/return focus + aria-labelledby + ESC + body lock.
 * 안티 카드 톤: shadow X, 헤어라인 1px, 큰 padding.
 *
 * Dialog와 차이: 옆에서 슬라이드(left/right), 더 긴 콘텐츠·폼 적합.
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
  const titleId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  // body scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // initial focus + return focus + ESC + focus trap
  React.useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const focusFirst = () => {
      if (!panelRef.current) return;
      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length > 0) focusable[0].focus();
      else panelRef.current.focus();
    };
    const raf = window.requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "Tab" && panelRef.current) {
        trapFocus(panelRef.current, e);
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      previouslyFocusedRef.current?.focus?.();
    };
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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? (side === "left" ? "좌측 패널" : "우측 패널") : undefined}
        tabIndex={-1}
        className={cn(
          "absolute top-0 bottom-0 flex flex-col border-zinc-200 bg-white text-zinc-900 outline-none dark:border-white/[0.08] dark:bg-zinc-900 dark:text-zinc-100",
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
              <h2
                id={titleId}
                className="text-[16px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
              >
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
