import * as React from "react";
import { cn } from "../utils/cn";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 데스크톱 컬럼 수 (1~6). 모바일은 자동 1열 → md에서 columns로 전환 */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** 모바일(sm 이하) 컬럼 수. 기본 1 */
  mobileColumns?: 1 | 2;
  /** 항목 사이 간격 */
  gap?: "tight" | "default" | "loose";
  /** as prop으로 시맨틱 (ul, section, div) */
  as?: "div" | "ul" | "section";
}

/**
 * Grid — 단순 그리드 레이아웃 wrapper.
 *
 * Tailwind grid-cols-* 직접 쓸 수도 있지만, 일관성 + 모바일 자동 처리를 위해 wrapper 제공.
 * "카드 그리드"가 아닌 단순 정렬용 — gap만 있고 박스 X.
 *
 * @example
 *   <Grid columns={3} gap="loose">
 *     <Image src="/1.jpg" />
 *     <Image src="/2.jpg" />
 *     <Image src="/3.jpg" />
 *   </Grid>
 */
export function Grid({
  columns = 3,
  mobileColumns = 1,
  gap = "default",
  as = "div",
  className,
  ...props
}: GridProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-anti-card="grid"
      data-columns={columns}
      className={cn(
        "grid",
        // mobile
        mobileColumns === 1 && "grid-cols-1",
        mobileColumns === 2 && "grid-cols-2",
        // desktop (md:)
        columns === 1 && "md:grid-cols-1",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "md:grid-cols-4",
        columns === 5 && "md:grid-cols-5",
        columns === 6 && "md:grid-cols-6",
        // gap
        gap === "tight" && "gap-3",
        gap === "default" && "gap-6 md:gap-8",
        gap === "loose" && "gap-10 md:gap-14",
        className
      )}
      {...props}
    />
  );
}
