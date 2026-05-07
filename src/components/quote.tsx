import * as React from "react";
import { cn } from "../utils/cn";
import { typography } from "../tokens/typography";

export interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  /** 출처. 인용 아래에 smallcaps로 표시 */
  cite?: React.ReactNode;
  /** 크기. default(15px) / large(18~20px, 강조 인용) */
  size?: "default" | "large";
}

/**
 * Quote — 본문 안의 인용.
 *
 * 박스 거부. 좌측 헤어라인 1px + 본문보다 한 단계 흐린 회색.
 * blockquote 시멘틱 + 구조적 의미 유지하면서 시각은 가벼움.
 *
 * @example
 *   <Quote cite="— Bringhurst, The Elements of Typographic Style">
 *     한 줄에 65~75자가 가장 읽기 좋다.
 *   </Quote>
 */
export function Quote({
  cite,
  size = "default",
  className,
  children,
  ...props
}: QuoteProps) {
  return (
    <figure
      data-anti-card="quote"
      data-size={size}
      className={cn("my-8", className)}
    >
      <blockquote
        className={cn(
          "border-l-2 border-zinc-300 pl-5 dark:border-white/[0.12]",
          size === "default" && typography.lead,
          size === "large" && typography.leadLarge
        )}
        {...props}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 pl-5 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}
