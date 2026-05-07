import * as React from "react";
import { cn } from "../utils/cn";

export interface DefListItem {
  term: React.ReactNode;
  definition: React.ReactNode;
}

export interface DefListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DefListItem[];
  /** 레이아웃. row=좌우 grid (140px term / 1fr def), stack=수직 stack */
  layout?: "row" | "stack";
}

/**
 * DefList — 정의 리스트 (term ↔ definition 페어).
 *
 * 시맨틱 dl + dt + dd. 박스 거부, 헤어라인으로 행 구분.
 *
 * row layout: ListRow와 동일한 그리드 패턴 (140px / 1fr).
 *
 * @example
 *   <DefList items={[
 *     { term: "출시", definition: "2026 Q2" },
 *     { term: "기술", definition: "Next.js + PostgreSQL" },
 *   ]} />
 */
export function DefList({
  items,
  layout = "row",
  className,
  ...props
}: DefListProps) {
  return (
    <dl
      data-anti-card="definition-list"
      data-layout={layout}
      className={cn(
        "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "py-4",
            layout === "row" &&
              "grid grid-cols-1 gap-1 md:grid-cols-[140px_1fr] md:gap-8",
            layout === "stack" && "space-y-1.5"
          )}
        >
          <dt className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            {item.term}
          </dt>
          <dd className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {item.definition}
          </dd>
        </div>
      ))}
    </dl>
  );
}
