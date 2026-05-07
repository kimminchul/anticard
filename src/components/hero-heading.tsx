import * as React from "react";
import { cn } from "../utils/cn";
import { typography } from "../tokens/typography";

export interface HeroHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 헤딩 태그. SEO상 페이지당 h1은 1개. 다른 곳에 큰 텍스트 톤만 쓸 땐 div */
  as?: "h1" | "div";
  /**
   * 사이즈 변형.
   * - `page` (default): 일반 페이지 타이틀 30~48px (Lab/Heritage/Blog 등 모든 첫 화면)
   * - `hero`: 사이트 메인 페이지 최상위 hero 40~64px. 사이트당 1번만.
   */
  size?: "page" | "hero";
  /** 정렬. 기본 좌측. */
  align?: "left" | "center";
  /** 너비 제한. 기본 20ch. 짧은 카피는 그대로 두고, 긴 문장은 wide로 */
  width?: "default" | "wide" | "full";
}

/**
 * HeroHeading — 페이지 첫 화면의 큰 제목.
 *
 * 두 단계 위계:
 * - size="page" (default) → typography.display (30~48px) — 일반 페이지 hero
 * - size="hero" → typography.displayLg (40~64px) — 사이트 메인 hero (1회 사용)
 *
 * 1인 랩 차분 톤. shadcn식 거대 hero(64~80px+) 거부.
 *
 * @example
 *   // 메인 페이지
 *   <HeroHeading size="hero">1인 랩, 카드 안에 카드를 쌓지 않는다.</HeroHeading>
 *
 *   // 다른 페이지 (Lab, Heritage, Blog 등)
 *   <HeroHeading>큰 프로젝트들의 깊이를 1인 랩으로 옮긴다.</HeroHeading>
 */
export function HeroHeading({
  as = "h1",
  size = "page",
  align = "left",
  width = "default",
  className,
  ...props
}: HeroHeadingProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-anti-card="hero-heading"
      data-size={size}
      className={cn(
        size === "hero" ? typography.displayLg : typography.display,
        align === "center" && "mx-auto text-center",
        width === "default" && "max-w-[20ch]",
        width === "wide" && "max-w-[32ch]",
        width === "full" && "max-w-none",
        className
      )}
      {...props}
    />
  );
}
