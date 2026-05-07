import * as React from "react";
import { cn } from "../utils/cn";

export interface HairlineProps extends React.HTMLAttributes<HTMLHRElement> {
  /** 위아래 여백. default = 충분한 영역 분리 여백. tight = 가까운 단락 분리. loose = 큰 영역 분리. none = 여백 없음 */
  spacing?: "none" | "tight" | "default" | "loose";
  /** 선 톤. default = 표준, subtle = 더 흐릿함 */
  tone?: "default" | "subtle";
}

/**
 * Hairline — 박스 거부 영역 분리.
 *
 * 안티 카드 5원칙 중 "헤어라인" — border 1px 한 줄로 영역을 나눈다.
 * 카드 박스로 둘러싸지 않고, 한 줄의 헤어라인이 영역의 시작/끝을 표시.
 *
 * @example
 *   <SectionFrame title="A" />
 *   <Hairline />
 *   <SectionFrame title="B" />
 */
export function Hairline({
  spacing = "default",
  tone = "default",
  className,
  ...props
}: HairlineProps) {
  return (
    <hr
      data-anti-card="hairline"
      data-spacing={spacing}
      data-tone={tone}
      className={cn(
        "border-0 border-t",
        tone === "default" && "border-zinc-200/60 dark:border-white/[0.06]",
        tone === "subtle" && "border-zinc-200/40 dark:border-white/[0.04]",
        spacing === "none" && "my-0",
        spacing === "tight" && "my-6",
        spacing === "default" && "my-12 md:my-16",
        spacing === "loose" && "my-20 md:my-28",
        className
      )}
      {...props}
    />
  );
}
