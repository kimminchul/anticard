import * as React from "react";
import { cn } from "../utils/cn";

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 톤. info=zinc / accent=emerald / warning=yellow / danger=rose */
  tone?: "info" | "accent" | "warning" | "danger";
  /** 제목 (선택) */
  title?: React.ReactNode;
  /** 좌측 아이콘. 텍스트(예: ℹ︎)도 OK */
  icon?: React.ReactNode;
}

/**
 * Callout — 본문 안의 강조 영역.
 *
 * Banner와 다름 — Banner는 페이지 풀폭 띠, Callout은 본문 흐름 안의 인라인 강조.
 * 둥근 큰 박스 거부 — 좌측 헤어라인 4px + 살짝 톤 배경.
 *
 * @example
 *   <Callout tone="info" title="참고">
 *     이 글의 모든 코드 예시는 Tailwind 3.4 기준입니다.
 *   </Callout>
 *
 *   <Callout tone="warning" icon="⚠">
 *     env not set — 환경 변수 확인 필요.
 *   </Callout>
 */
export function Callout({
  tone = "info",
  title,
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      data-anti-card="callout"
      data-tone={tone}
      className={cn(
        "my-6 flex gap-4 border-l-2 px-5 py-4",
        tone === "info" &&
          "border-zinc-300 bg-zinc-50 dark:border-white/[0.15] dark:bg-white/[0.02]",
        tone === "accent" &&
          "border-emerald-500/50 bg-emerald-500/[0.06] dark:border-emerald-400/40",
        tone === "warning" &&
          "border-yellow-500/50 bg-yellow-500/[0.06] dark:border-yellow-400/40",
        tone === "danger" &&
          "border-rose-500/50 bg-rose-500/[0.06] dark:border-rose-400/40",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "shrink-0 text-[18px] leading-none",
            tone === "info" && "text-zinc-500 dark:text-zinc-400",
            tone === "accent" && "text-emerald-600 dark:text-emerald-400",
            tone === "warning" && "text-yellow-700 dark:text-yellow-400",
            tone === "danger" && "text-rose-600 dark:text-rose-400"
          )}
          aria-hidden
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <p
            className={cn(
              "text-[14px] font-medium leading-tight",
              tone === "info" && "text-zinc-900 dark:text-zinc-100",
              tone === "accent" && "text-emerald-700 dark:text-emerald-300",
              tone === "warning" && "text-yellow-800 dark:text-yellow-300",
              tone === "danger" && "text-rose-700 dark:text-rose-300"
            )}
          >
            {title}
          </p>
        )}
        <div
          className={cn(
            "text-[14.5px] leading-relaxed",
            title && "mt-1.5",
            "text-zinc-700 dark:text-zinc-300"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
