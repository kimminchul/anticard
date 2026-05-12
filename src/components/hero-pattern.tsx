import * as React from "react";
import { cn } from "../utils/cn";
import { Eyebrow } from "./eyebrow";
import { HeroHeading } from "./hero-heading";
import { Lead } from "./lead";
import { LinkRow } from "./link-row";

export interface HeroPatternCTA {
  label: React.ReactNode;
  href: string;
  /** 첫 CTA는 accent, 두 번째는 default 권장 */
  tone?: "default" | "accent";
  external?: boolean;
}

export interface HeroPatternProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** smallcaps 라벨 */
  eyebrow?: React.ReactNode;
  /** 큰 제목 */
  title: React.ReactNode;
  /** 인트로 본문 */
  lead?: React.ReactNode;
  /** 0~3개 권장 — 첫 번째만 accent. */
  ctas?: HeroPatternCTA[];
  /** size="hero" → displayLg(40~64px) / "page"(default) → display(30~48px) */
  size?: "page" | "hero";
  /** 정렬 */
  align?: "left" | "center";
  /** 상하 패딩 */
  padding?: "default" | "tight" | "loose";
  /**
   * 제목 너비 제한 (HeroHeading의 width prop으로 전달).
   * - `default`: 20ch — 짧은 카피
   * - `wide`: 32ch — 긴 문장 (일본어/영어 줄바꿈 회피)
   * - `full`: 제한 없음
   */
  width?: "default" | "wide" | "full";
}

/**
 * HeroPattern — 페이지 첫 화면 hero 영역 통째로.
 *
 * Eyebrow + HeroHeading + Lead + LinkRow×N 조합 패턴.
 * "안티 카드 톤 hero를 한 번에" 만드는 가장 빠른 방법.
 *
 * @example
 *   // 메인 페이지
 *   <HeroPattern
 *     size="hero"
 *     eyebrow="Freeive — Solo lab, est. 2016"
 *     title={<>1인 운영자의<br />무기를 만드는<br />1인 랩.</>}
 *     lead="외주 에이전시가 아닙니다."
 *     ctas={[
 *       { label: "안티 카드 살펴보기", href: "/anti-card", tone: "accent" },
 *       { label: "Talk · 이기는 싸움만", href: "/talk" },
 *     ]}
 *   />
 *
 *   // 일반 페이지
 *   <HeroPattern
 *     eyebrow="Heritage · 2016 — Now"
 *     title="큰 프로젝트들의 깊이를 1인 랩으로 옮긴다."
 *     lead="텔레콤·금융·교육·기업시스템·미디어의 큰 싸움."
 *   />
 */
export function HeroPattern({
  eyebrow,
  title,
  lead,
  ctas = [],
  size = "page",
  align = "left",
  padding = "default",
  width = "default",
  className,
  ...props
}: HeroPatternProps) {
  return (
    <section
      data-anti-card="hero-pattern"
      data-size={size}
      data-align={align}
      className={cn(
        padding === "tight" && "pt-16 pb-12 md:pt-20 md:pb-16",
        padding === "default" && "pt-20 pb-20 md:pt-28 md:pb-28",
        padding === "loose" && "pt-24 pb-32 md:pt-36 md:pb-40",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <HeroHeading
        size={size}
        align={align}
        width={width}
        className={eyebrow ? "mt-5" : undefined}
      >
        {title}
      </HeroHeading>
      {lead && (
        <Lead
          size={size === "hero" ? "large" : "default"}
          className={cn("mt-6", align === "center" && "mx-auto")}
        >
          {lead}
        </Lead>
      )}
      {ctas.length > 0 && (
        <div
          className={cn(
            "mt-10 flex flex-wrap items-center gap-x-8 gap-y-4",
            align === "center" && "justify-center"
          )}
        >
          {ctas.map((c, i) => (
            <LinkRow
              key={i}
              href={c.href}
              tone={c.tone ?? (i === 0 ? "accent" : "default")}
              external={c.external}
            >
              {c.label}
            </LinkRow>
          ))}
        </div>
      )}
    </section>
  );
}
