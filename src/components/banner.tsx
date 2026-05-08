import * as React from "react";
import { cn } from "../utils/cn";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 톤. info=default 회색, accent=emerald, warning=yellow, danger=rose */
  tone?: "info" | "accent" | "warning" | "danger";
  /** 좌측 라벨 (예: "공지", "Live"). 12px uppercase smallcaps */
  label?: React.ReactNode;
  /** 우측 액션 (link 또는 닫기 버튼) */
  action?: React.ReactNode;
  /** dismissible — 우측 X 버튼 자동 추가 */
  onDismiss?: () => void;
}

/**
 * Banner — 작은 알림 띠.
 *
 * 페이지 상단 또는 본문 사이. 큰 박스가 아닌 헤어라인 + 살짝 톤 배경.
 *
 * @example
 *   <Banner tone="accent" label="Live">
 *     anti-card 0.2.0 출시 — 19개 컴포넌트.
 *   </Banner>
 */
export function Banner({
  tone = "info",
  label,
  action,
  onDismiss,
  className,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      data-anti-card="banner"
      data-tone={tone}
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex items-center gap-3 border-y px-4 py-2.5 text-[13.5px] animate-anti-slide-down",
        tone === "info" &&
          "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-300",
        tone === "accent" &&
          "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-300",
        tone === "warning" &&
          "border-yellow-500/20 bg-yellow-500/[0.06] text-yellow-800 dark:border-yellow-400/20 dark:text-yellow-300",
        tone === "danger" &&
          "border-rose-500/20 bg-rose-500/[0.06] text-rose-700 dark:border-rose-400/20 dark:text-rose-300",
        className
      )}
      {...props}
    >
      {label && (
        <span className="shrink-0 text-[11px] uppercase tracking-[0.08em] font-medium">
          {label}
        </span>
      )}
      <div className="min-w-0 flex-1 leading-relaxed">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="닫기"
          className="shrink-0 text-current opacity-60 transition-opacity hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
