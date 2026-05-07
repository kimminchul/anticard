import * as React from "react";
import { cn } from "../utils/cn";

export interface StatItem {
  value: React.ReactNode;
  label: React.ReactNode;
  /** 보조 설명 (선택) — 작은 글씨 */
  hint?: React.ReactNode;
}

export interface StatListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: StatItem[];
  /** 레이아웃. row=가로 정렬, stack=세로 stack (모바일 대응) */
  layout?: "row" | "stack";
}

/**
 * StatList — 통계 숫자 행.
 *
 * Heritage 카운터(10+ Years / 30+ Clients / 150+ Projects) 같은 패턴.
 * 카드 박스 거부 — 헤어라인 + 큰 숫자 + smallcaps 라벨로 위계.
 *
 * @example
 *   <StatList items={[
 *     { value: "10+", label: "Years" },
 *     { value: "30+", label: "Clients" },
 *     { value: "150+", label: "Projects" },
 *   ]} />
 */
export function StatList({
  items,
  layout = "row",
  className,
  ...props
}: StatListProps) {
  return (
    <dl
      data-anti-card="stat-list"
      data-layout={layout}
      className={cn(
        layout === "row" &&
          "grid grid-cols-2 gap-x-8 gap-y-10 border-y border-zinc-200 py-10 md:grid-cols-3 md:py-12 dark:border-white/[0.06]",
        layout === "stack" &&
          "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(layout === "stack" && "py-6")}
        >
          <dt className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
            {item.value}
          </dt>
          <dd className="mt-3 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            {item.label}
          </dd>
          {item.hint && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-500">
              {item.hint}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}
