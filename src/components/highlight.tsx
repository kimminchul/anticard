import * as React from "react";
import { cn } from "../utils/cn";

export interface HighlightProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** 색 강조. default=본문(굵기만 변경) / accent=emerald */
  tone?: "default" | "accent";
  /** 사이즈. default(본문 톤) / large(섹션 강조 한 줄) */
  size?: "default" | "large";
}

/**
 * Highlight — 본문 안의 한 줄 강조 문장.
 *
 * 형광펜(mark) 거부. 색 또는 굵기 변경만.
 *
 * @example
 *   <Highlight>이 한 줄이 핵심이다.</Highlight>
 *   <Highlight tone="accent" size="large">메인 메시지.</Highlight>
 */
export function Highlight({
  tone = "default",
  size = "default",
  className,
  ...props
}: HighlightProps) {
  return (
    <p
      data-anti-card="highlight"
      data-tone={tone}
      data-size={size}
      className={cn(
        "font-medium",
        size === "default" && "text-[15px] leading-relaxed",
        size === "large" &&
          "text-[clamp(1.125rem,2vw,1.5rem)] leading-snug tracking-[-0.01em]",
        tone === "default" && "text-zinc-900 dark:text-zinc-50",
        tone === "accent" && "text-emerald-600 dark:text-emerald-400",
        className
      )}
      {...props}
    />
  );
}
