import * as React from "react";
import { cn } from "../utils/cn";

export interface FeatureRowItem {
  /** 좌측 라벨 (예: "01", "Speed", icon) */
  label?: React.ReactNode;
  /** 제목 */
  title: React.ReactNode;
  /** 본문 설명 */
  description?: React.ReactNode;
}

export interface FeatureRowProps extends React.HTMLAttributes<HTMLOListElement> {
  items: FeatureRowItem[];
  /** layout. row=그리드 [120px label / 1fr text] / numbered=01/02/03 자동 번호 */
  layout?: "row" | "numbered";
}

/**
 * FeatureRow — 특징 나열 행.
 *
 * 카드 그리드 거부, 헤어라인 + 행 레이아웃 + 좌측 라벨/번호.
 *
 * @example
 *   <FeatureRow items={[
 *     { label: "01", title: "1인 랩", description: "외주 에이전시 X" },
 *     { label: "02", title: "안티 카드", description: "AI 동질화 거부" },
 *   ]} />
 */
export function FeatureRow({
  items,
  layout = "row",
  className,
  ...props
}: FeatureRowProps) {
  return (
    <ol
      data-anti-card="feature-row"
      data-layout={layout}
      className={cn(
        "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-1 gap-2 py-8 md:grid-cols-[120px_1fr] md:gap-8 md:py-10"
        >
          <div>
            {layout === "numbered" ? (
              <span className="font-mono text-[12px] tabular-nums text-zinc-400 dark:text-zinc-500">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              item.label && (
                <span className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </span>
              )
            )}
          </div>
          <div>
            <h3 className="text-[18px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
