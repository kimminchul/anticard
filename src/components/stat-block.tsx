import * as React from "react";
import { cn } from "../utils/cn";

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 큰 숫자 (필수) */
  value: React.ReactNode;
  /** smallcaps 라벨 (필수) */
  label: React.ReactNode;
  /** 보조 본문 — Lead 톤 (선택) */
  description?: React.ReactNode;
  /**
   * 추세. 위/아래 화살표 + 값.
   * 예: { direction: "up", value: "+12%" }
   */
  trend?: {
    direction: "up" | "down" | "flat";
    value: React.ReactNode;
  };
  /** 정렬 */
  align?: "left" | "center";
  /** 크기. xl=가장 큰 강조 (페이지 hero 영역) */
  size?: "default" | "xl";
}

/**
 * StatBlock — 단일 강조 통계 블록.
 *
 * StatList(여러 개 행)와 다름 — 단일 큰 숫자 + 라벨 + 설명을 한 영역으로.
 * "이 페이지의 핵심 숫자가 이것"이라는 시그널.
 *
 * @example
 *   <StatBlock
 *     value="150+"
 *     label="Projects"
 *     description="2016~2022, Preive 시절 누적 프로젝트 수."
 *     trend={{ direction: "up", value: "+12 in 2022" }}
 *   />
 */
export function StatBlock({
  value,
  label,
  description,
  trend,
  align = "left",
  size = "default",
  className,
  ...props
}: StatBlockProps) {
  return (
    <div
      data-anti-card="stat-block"
      data-size={size}
      className={cn(
        "py-12 md:py-16",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      <p
        className={cn(
          "font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50",
          size === "default" && "text-[clamp(2.5rem,6vw,4.5rem)]",
          size === "xl" && "text-[clamp(3rem,9vw,7rem)]"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-4 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400"
        )}
      >
        {label}
      </p>
      {trend && (
        <p
          className={cn(
            "mt-3 inline-flex items-baseline gap-1.5 text-[13px]",
            trend.direction === "up" && "text-emerald-600 dark:text-emerald-400",
            trend.direction === "down" && "text-rose-600 dark:text-rose-400",
            trend.direction === "flat" && "text-zinc-500 dark:text-zinc-400"
          )}
        >
          <span aria-hidden>
            {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}
          </span>
          <span>{trend.value}</span>
        </p>
      )}
      {description && (
        <p
          className={cn(
            "mt-6 max-w-[52ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
