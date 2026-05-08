"use client";
import * as React from "react";
import { X, Info, AlertTriangle, AlertOctagon, Check } from "lucide-react";
import { cn } from "../utils/cn";

export type ToastTone = "default" | "success" | "warning" | "danger";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 자동 닫힘 (ms). 0 또는 음수 = 영구 */
  duration?: number;
  tone?: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 위치 — fixed positioning */
  position?: ToastPosition;
  /** 닫기 버튼 표시 (default true) */
  showClose?: boolean;
}

const TONE_ICONS: Record<ToastTone, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: Check,
  warning: AlertTriangle,
  danger: AlertOctagon,
};

/**
 * Toast — 일시적 알림.
 *
 * 안티 카드 톤: shadow X, 헤어라인 1px (tone별 색), 12.5~13.5px 본문.
 * 자동 닫힘 (default 4초). aria-live="polite"로 스크린리더 자동 알림.
 *
 * 단일 Toast 컴포넌트 — queue 시스템은 별도 wrapper 권장 (1.0.0 이전엔 단일 사용).
 *
 * @example
 *   const [open, setOpen] = useState(false);
 *   <Toast
 *     open={open}
 *     onOpenChange={setOpen}
 *     tone="success"
 *     title="저장됨"
 *     description="변경사항이 저장되었습니다."
 *   />
 */
export function Toast({
  open,
  onOpenChange,
  duration = 4000,
  tone = "default",
  title,
  description,
  position = "bottom-right",
  showClose = true,
}: ToastProps) {
  React.useEffect(() => {
    if (!open || duration <= 0) return;
    const id = setTimeout(() => onOpenChange(false), duration);
    return () => clearTimeout(id);
  }, [open, duration, onOpenChange]);

  if (!open) return null;

  const Icon = TONE_ICONS[tone];

  return (
    <div
      data-anti-card="toast"
      data-tone={tone}
      data-position={position}
      role="status"
      aria-live="polite"
      className={cn(
        "fixed z-50 flex w-[min(92vw,360px)] items-start gap-3 rounded-md border bg-white p-4 dark:bg-zinc-900",
        // tone별 border
        tone === "default" && "border-zinc-200 dark:border-white/[0.08]",
        tone === "success" && "border-emerald-500/40 dark:border-emerald-400/40",
        tone === "warning" && "border-amber-500/40 dark:border-amber-400/40",
        tone === "danger" && "border-red-500/40 dark:border-red-400/40",
        // position
        position === "top-right" && "top-4 right-4",
        position === "top-left" && "top-4 left-4",
        position === "bottom-right" && "bottom-4 right-4",
        position === "bottom-left" && "bottom-4 left-4",
        position === "top-center" && "top-4 left-1/2 -translate-x-1/2",
        position === "bottom-center" && "bottom-4 left-1/2 -translate-x-1/2"
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "default" && "text-zinc-500 dark:text-zinc-400",
          tone === "success" && "text-emerald-600 dark:text-emerald-400",
          tone === "warning" && "text-amber-600 dark:text-amber-400",
          tone === "danger" && "text-red-600 dark:text-red-400"
        )}
      />
      <div className="min-w-0 flex-1">
        {title && (
          <p className="text-[13.5px] font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </p>
        )}
        {description && (
          <p
            className={cn(
              "text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400",
              title && "mt-1"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {showClose && (
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="닫기"
          className="shrink-0 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
