"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import { trapFocus, getFocusableElements } from "../utils/focus-trap";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 헤더 제목 */
  title?: React.ReactNode;
  /** 헤더 설명 */
  description?: React.ReactNode;
  /** 본문 */
  children?: React.ReactNode;
  /** 푸터 (예: secondary cancel + primary confirm) */
  footer?: React.ReactNode;
  /** 너비 — narrow=400 / default=520 / wide=720 */
  size?: "narrow" | "default" | "wide";
  /** 닫기 버튼 표시 (default true) */
  showClose?: boolean;
}

/**
 * Dialog — 모달 다이얼로그.
 *
 * 커스텀 React 오버레이 (Drawer와 동일 패턴):
 * - 애니메이션 안정성 (네이티브 <dialog>의 showModal 한계 회피)
 * - focus trap + initial/return focus + aria-labelledby (a11y)
 * - ESC + 백드롭 클릭 + body scroll lock
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px, 큰 padding (24~32px).
 *
 * @example
 *   <Dialog open={open} onOpenChange={setOpen} title="삭제 확인" description="..."
 *           footer={<><Button variant="secondary" onClick={...}>취소</Button>
 *                     <Button tone="accent" onClick={...}>삭제</Button></>} />
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "default",
  showClose = true,
}: DialogProps) {
  const titleId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  // 매 렌더마다 최신 onOpenChange 참조 보관 (effect re-run 없이 핸들러만 갱신)
  const onOpenChangeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

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
    // open 직후 panel 내부 첫 focusable로 이동 (없으면 panel 자체)
    const focusFirst = () => {
      if (!panelRef.current) return;
      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length > 0) focusable[0].focus();
      else panelRef.current.focus();
    };
    // 한 프레임 뒤(애니메이션 시작 직후)에 focus 이동 — opacity 0에서 focus 이동되면 시각 깜빡임
    const raf = window.requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChangeRef.current(false);
      } else if (e.key === "Tab" && panelRef.current) {
        trapFocus(panelRef.current, e);
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      // close 시 트리거 등 이전 focus로 복원
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]); // onOpenChange는 ref로 분리 — 인라인 화살표 함수 전달 시 매 렌더 effect 재실행 방지

  if (!open) return null;

  return (
    <div
      data-anti-card="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
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
        aria-label={!title ? "다이얼로그" : undefined}
        tabIndex={-1}
        className={cn(
          "relative rounded-md border border-zinc-200 bg-white text-zinc-900 outline-none animate-anti-dialog-in dark:border-white/[0.08] dark:bg-zinc-900 dark:text-zinc-100",
          size === "narrow" && "w-[min(92vw,400px)]",
          size === "default" && "w-[min(92vw,520px)]",
          size === "wide" && "w-[min(92vw,720px)]"
        )}
      >
        <div className="relative p-6 md:p-8">
          {(title || showClose) && (
            <div className="flex items-start justify-between gap-4">
              {title ? (
                <h2
                  id={titleId}
                  className="text-[18px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
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
          {description && (
            <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
          {children && (
            <div className={cn(title || description ? "mt-5" : "mt-0")}>
              {children}
            </div>
          )}
          {footer && (
            <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-zinc-200 pt-5 dark:border-white/[0.06]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
