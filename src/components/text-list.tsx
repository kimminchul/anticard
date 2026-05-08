import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../utils/cn";

export type TextListVariant =
  /** • 점 (회색) — default. 일반 글머리 리스트 */
  | "bullet"
  /** — 대시 (회색). 분류·인용 톤의 가벼운 리스트 */
  | "hyphen"
  /** 1. 2. 3. (zinc) — 순서 있는 ol */
  | "number"
  /** 01 02 03 (mono, padded) — 차분한 절차/원칙 ol */
  | "number-padded"
  /** ✓ emerald (lucide Check) — 긍정 강조 ul */
  | "check"
  /** • emerald — 강조된 글머리 ul */
  | "dot-accent";

export interface TextListProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** 항목 (ReactNode 배열) */
  items: React.ReactNode[];
  /** 마커 종류 — default "bullet" */
  variant?: TextListVariant;
  /** 행 간격 — tight / default / loose */
  density?: "tight" | "default" | "loose";
}

/**
 * TextList — 일반 텍스트 리스트(ul/ol).
 *
 * ListRow(행 + 1px 헤어라인 인터랙티브 행)와 다름 — 본문 안에 들어가는
 * 단순 글머리 텍스트 리스트입니다. 블로그·About·약관·정책 등에서 가장 자주 쓰임.
 *
 * ul/ol은 variant에 따라 자동 결정 (number/number-padded만 ol).
 *
 * 주의: items는 정적 사용 가정. 동적으로 배열을 재정렬·삽입하는 경우
 * 호출자가 wrapper로 stable key를 부여하는 것을 권장합니다 (현재는 index key).
 *
 * @example
 *   <TextList variant="bullet" items={["첫째", "둘째", "셋째"]} />
 *   <TextList variant="number-padded" items={["계획", "디자인", "구현", "검증"]} />
 *   <TextList variant="check" items={["B2B 의뢰", "공동 프로젝트"]} />
 */
export function TextList({
  items,
  variant = "bullet",
  density = "default",
  className,
  ...props
}: TextListProps) {
  const isOrdered = variant === "number" || variant === "number-padded";
  const gapCls =
    density === "tight"
      ? "space-y-1"
      : density === "loose"
      ? "space-y-3"
      : "space-y-1.5";

  const baseCls = cn(
    "text-[14.5px] leading-relaxed text-zinc-700 dark:text-zinc-300",
    gapCls,
    className
  );

  if (isOrdered) {
    return (
      <ol
        data-anti-card="text-list"
        data-variant={variant}
        className={baseCls}
        {...(props as React.HTMLAttributes<HTMLOListElement>)}
      >
        {items.map((item, i) => {
          const n =
            variant === "number-padded"
              ? String(i + 1).padStart(2, "0")
              : `${i + 1}.`;
          return (
            <li key={i} className="flex items-baseline gap-3">
              <span
                aria-hidden
                className={cn(
                  "shrink-0 tabular-nums text-zinc-500 dark:text-zinc-500",
                  variant === "number-padded" && "font-mono text-[12.5px]",
                  variant === "number" && "text-[13.5px]"
                )}
              >
                {n}
              </span>
              <span className="min-w-0">{item}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ul
      data-anti-card="text-list"
      data-variant={variant}
      className={baseCls}
      {...(props as React.HTMLAttributes<HTMLUListElement>)}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-2.5">
          <span
            aria-hidden
            className={cn(
              "shrink-0",
              variant === "bullet" && "text-zinc-400 dark:text-zinc-500",
              variant === "hyphen" &&
                "translate-y-[1px] text-zinc-400 dark:text-zinc-500",
              variant === "check" &&
                "translate-y-[2px] text-emerald-600 dark:text-emerald-400",
              variant === "dot-accent" &&
                "text-emerald-500 dark:text-emerald-400"
            )}
          >
            {(variant === "bullet" || variant === "dot-accent") && "•"}
            {variant === "hyphen" && (
              <Minus className="h-3 w-3" strokeWidth={1.5} />
            )}
            {variant === "check" && (
              <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
