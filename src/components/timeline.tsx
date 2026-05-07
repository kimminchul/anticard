import * as React from "react";
import { cn } from "../utils/cn";

export interface TimelineItem {
  /** 연도·시점 라벨 (smallcaps 자동 적용) */
  when: React.ReactNode;
  /** 항목 제목 */
  title: React.ReactNode;
  /** 보조 설명 (선택) */
  description?: React.ReactNode;
  /** 클릭 가능하면 href */
  href?: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

/**
 * Timeline — 시간 순 행.
 *
 * Heritage 연도별 프로젝트, 변경 이력, 학습 일지 등.
 * ListRow와 비슷하지만 시간 축에 특화 — 좌측 when, 우측 본문.
 *
 * @example
 *   <Timeline items={[
 *     { when: "2026", title: "안티 카드 0.1.0 출시", description: "P0 8 컴포넌트" },
 *     { when: "2024", title: "EBS 온라인 클래스", description: "재구조화 프로젝트" },
 *   ]} />
 */
export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <ol
      data-anti-card="timeline"
      className={cn(
        "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {items.map((item, i) => {
        const inner = (
          <div className="grid grid-cols-1 gap-1 py-6 md:grid-cols-[120px_1fr] md:gap-8">
            <div className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              {item.when}
            </div>
            <div>
              <div className="text-[15.5px] font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                {item.title}
              </div>
              {item.description && (
                <div className="mt-1.5 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
        return (
          <li
            key={i}
            className={cn(
              item.href &&
                "group transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.02]"
            )}
          >
            {item.href ? (
              <a
                href={item.href}
                className="block px-1 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
              >
                {inner}
              </a>
            ) : (
              <div className="px-1">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
