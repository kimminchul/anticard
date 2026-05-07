import * as React from "react";
import { cn } from "../utils/cn";
import { typography } from "../tokens/typography";

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** 크기. default=15px(lead 토큰), large=18~20px(leadLarge 토큰, 히어로 직후) */
  size?: "default" | "large";
  /** 너비 제한. */
  width?: "narrow" | "default" | "wide" | "full";
}

/**
 * Lead — 인트로 큰 회색 본문.
 *
 * 토큰 `typography.lead / leadLarge` 사용. 본문(body)보다 색이 한 단계 흐려 위계가 자연스럽게 만들어진다.
 *
 * @example
 *   <HeroHeading>제목</HeroHeading>
 *   <Lead>한두 문단의 인트로 카피.</Lead>
 */
export function Lead({
  size = "default",
  width = "default",
  className,
  ...props
}: LeadProps) {
  return (
    <p
      data-anti-card="lead"
      className={cn(
        size === "default" && typography.lead,
        size === "large" && typography.leadLarge,
        width === "narrow" && "max-w-[44ch]",
        width === "default" && "max-w-[58ch]",
        width === "wide" && "max-w-[72ch]",
        width === "full" && "max-w-none",
        className
      )}
      {...props}
    />
  );
}
