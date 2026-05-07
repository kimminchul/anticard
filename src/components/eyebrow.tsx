import * as React from "react";
import { cn } from "../utils/cn";

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Tone variants. Default = neutral muted. */
  tone?: "neutral" | "accent";
}

/**
 * Eyebrow — 섹션의 카테고리 라벨.
 * 안티 카드 위계 표현 5요소 중 하나(smallcaps 라벨).
 *
 * 박스(카드)에 위계를 의존하는 대신, 본문 위에 작은 영문 라벨로
 * 영역의 정체성을 표시한다. shadow나 border 없이도 정보 위계가 만들어진다.
 *
 * @example
 *   <Eyebrow>Framework · v0</Eyebrow>
 *   <h1>제목</h1>
 */
export function Eyebrow({
  className,
  tone = "neutral",
  ...props
}: EyebrowProps) {
  return (
    <p
      data-anti-card="eyebrow"
      className={cn(
        "uppercase tracking-[0.08em] text-[12px] leading-tight font-medium",
        tone === "neutral" && "text-zinc-500 dark:text-zinc-400",
        tone === "accent" && "text-emerald-500 dark:text-emerald-400",
        className
      )}
      {...props}
    />
  );
}
