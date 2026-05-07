import * as React from "react";
import { cn } from "../utils/cn";
import { typography } from "../tokens/typography";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 헤딩 레벨. h2 가 표준. 더 깊은 위계는 h3 */
  as?: "h2" | "h3";
  /** 너비 제한. 기본 20ch. */
  width?: "default" | "wide" | "full";
  /** 정렬. 기본 좌측. */
  align?: "left" | "center";
}

/**
 * SectionHeading — 섹션 제목.
 *
 * 토큰 `typography.h2 / typography.h3` 사용. SectionFrame 내부 헤딩과 동일 톤.
 *
 * @example
 *   <SectionHeading>네 개의 축으로 운영합니다.</SectionHeading>
 */
export function SectionHeading({
  as = "h2",
  width = "default",
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-anti-card="section-heading"
      className={cn(
        as === "h2" && typography.h2,
        as === "h3" && typography.h3,
        width === "default" && "max-w-[20ch]",
        width === "wide" && "max-w-[32ch]",
        width === "full" && "max-w-none",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    />
  );
}
