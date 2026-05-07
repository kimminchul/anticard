import * as React from "react";
import { cn } from "../utils/cn";

export interface GridSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 전체 컬럼 수. 기본 12 (Bootstrap·Material 표준) */
  columns?: 6 | 8 | 12 | 16 | 24;
  /** gap. tight(12) / default(24~32) / loose(40~56) */
  gap?: "tight" | "default" | "loose";
  /** 시맨틱 태그 */
  as?: "div" | "section";
}

/**
 * GridSystem — 12 column 그리드 시스템.
 *
 * `<Grid>`(균등 1~6열)와 다름 — 자식이 자유롭게 col-span 지정 가능.
 * Bootstrap·Material grid system의 anti-card 톤 버전.
 *
 * @example
 *   <GridSystem>
 *     <GridCol span={3}>좌측 sidebar</GridCol>
 *     <GridCol span={9}>본문</GridCol>
 *
 *     <GridCol span={4}>1/3</GridCol>
 *     <GridCol span={4}>2/3</GridCol>
 *     <GridCol span={4}>3/3</GridCol>
 *   </GridSystem>
 */
export function GridSystem({
  columns = 12,
  gap = "default",
  as = "div",
  className,
  ...props
}: GridSystemProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-anti-card="grid-system"
      data-columns={columns}
      className={cn(
        "grid grid-cols-1",
        // 데스크톱에서 columns 적용
        columns === 6 && "md:grid-cols-6",
        columns === 8 && "md:grid-cols-8",
        columns === 12 && "md:grid-cols-12",
        columns === 16 && "md:grid-cols-16",
        columns === 24 && "md:grid-cols-24",
        gap === "tight" && "gap-3",
        gap === "default" && "gap-6 md:gap-8",
        gap === "loose" && "gap-10 md:gap-14",
        className
      )}
      {...props}
    />
  );
}

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 데스크톱 col span (1~24) */
  span?: number;
  /** 태블릿(md) span (선택) — 기본 span 그대로 */
  spanMd?: number;
  /** 모바일 span. 기본 부모 columns 전체 (= 1행 전체 차지 = stack) */
  spanSm?: number;
  /** 시작 컬럼 강제 (오프셋) — 데스크톱만 */
  start?: number;
  /** 시맨틱 */
  as?: "div" | "section" | "article" | "aside";
}

const SPAN_CLASSES: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const START_CLASSES: Record<number, string> = {
  1: "md:col-start-1",
  2: "md:col-start-2",
  3: "md:col-start-3",
  4: "md:col-start-4",
  5: "md:col-start-5",
  6: "md:col-start-6",
  7: "md:col-start-7",
  8: "md:col-start-8",
  9: "md:col-start-9",
  10: "md:col-start-10",
  11: "md:col-start-11",
  12: "md:col-start-12",
};

/**
 * GridCol — GridSystem의 자식. col-span으로 너비 지정.
 *
 * @example
 *   <GridSystem>
 *     <GridCol span={3}>3/12</GridCol>
 *     <GridCol span={9}>9/12</GridCol>
 *   </GridSystem>
 */
export function GridCol({
  span = 12,
  start,
  as = "div",
  className,
  ...props
}: GridColProps) {
  const Tag = as as React.ElementType;
  const spanCls = SPAN_CLASSES[span] ?? `md:col-span-${span}`;
  const startCls = start ? START_CLASSES[start] ?? `md:col-start-${start}` : undefined;
  return (
    <Tag
      data-anti-card="grid-col"
      data-span={span}
      className={cn(spanCls, startCls, className)}
      {...props}
    />
  );
}
