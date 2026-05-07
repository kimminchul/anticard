import * as React from "react";
import { cn } from "../utils/cn";

export interface StepItem {
  /** 단계 제목 */
  title: React.ReactNode;
  /** 단계 설명 */
  description?: React.ReactNode;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  items: StepItem[];
  /** vertical=수직 stack (기본) / horizontal=가로 grid (3·4단계) */
  layout?: "vertical" | "horizontal";
}

/**
 * Steps — 절차 단계 표시.
 *
 * 자동 번호(01/02/03) + 제목 + 설명. FeatureRow와 비슷하지만 "프로세스" 강조.
 * vertical: 좌측 번호 + 우측 본문 (FeatureRow와 동일 톤)
 * horizontal: 가로 grid + 번호 위 / 본문 아래 (3·4단계 시각화)
 *
 * @example
 *   <Steps items={[
 *     { title: "프로젝트 정리", description: "Plan + 우선순위" },
 *     { title: "구현", description: "Do (P0~P5)" },
 *     { title: "검증", description: "Check + 사용자 피드백" },
 *   ]} />
 */
export function Steps({
  items,
  layout = "vertical",
  className,
  ...props
}: StepsProps) {
  if (layout === "horizontal") {
    return (
      <ol
        data-anti-card="steps"
        data-layout="horizontal"
        className={cn(
          "grid gap-6",
          items.length === 2 && "grid-cols-1 md:grid-cols-2",
          items.length === 3 && "grid-cols-1 md:grid-cols-3",
          items.length >= 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
          className
        )}
        {...props}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="border-t-2 border-zinc-300 pt-5 dark:border-white/[0.12]"
          >
            <span className="font-mono text-[12px] tabular-nums text-zinc-400 dark:text-zinc-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol
      data-anti-card="steps"
      data-layout="vertical"
      className={cn(
        "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-1 gap-2 py-7 md:grid-cols-[60px_1fr] md:gap-8 md:py-9"
        >
          <span className="font-mono text-[12px] tabular-nums text-zinc-400 dark:text-zinc-500">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
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
