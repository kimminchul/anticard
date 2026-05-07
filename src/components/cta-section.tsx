import * as React from "react";
import { cn } from "../utils/cn";
import { Eyebrow } from "./eyebrow";
import { Lead } from "./lead";
import { LinkRow } from "./link-row";
import { typography } from "../tokens/typography";

export interface CTASectionAction {
  label: React.ReactNode;
  href: string;
  tone?: "default" | "accent";
  external?: boolean;
}

export interface CTASectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** smallcaps */
  eyebrow?: React.ReactNode;
  /** 큰 제목 (h2 톤) */
  title: React.ReactNode;
  /** 보조 카피 */
  lead?: React.ReactNode;
  /** 행동 유도 (1~2개 권장) */
  actions?: CTASectionAction[];
  /** 위쪽 헤어라인 표시 (기본 true) */
  divider?: boolean;
  /** 정렬 */
  align?: "left" | "center";
}

/**
 * CTASection — 페이지 하단 CTA 영역.
 *
 * 헤어라인 위 + h2 제목 + Lead + LinkRow 묶음.
 * 카드 박스 거부 — 페이지 자연스러운 마무리로서 액션 유도.
 *
 * @example
 *   <CTASection
 *     eyebrow="Talk"
 *     title="이기는 싸움이 있다면 알려주세요."
 *     lead="간단한 의뢰 메모로 충분합니다."
 *     actions={[{ label: "Talk 페이지로", href: "/talk", tone: "accent" }]}
 *   />
 */
export function CTASection({
  eyebrow,
  title,
  lead,
  actions = [],
  divider = true,
  align = "left",
  className,
  ...props
}: CTASectionProps) {
  return (
    <section
      data-anti-card="cta-section"
      className={cn(
        divider && "border-t border-zinc-200/60 dark:border-white/[0.06]",
        "py-16 md:py-20",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={cn(
          "max-w-[28ch]",
          eyebrow && "mt-3",
          typography.h2,
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {lead && (
        <Lead className={cn("mt-5", align === "center" && "mx-auto")}>
          {lead}
        </Lead>
      )}
      {actions.length > 0 && (
        <div
          className={cn(
            "mt-8 flex flex-wrap gap-x-8 gap-y-4",
            align === "center" && "justify-center"
          )}
        >
          {actions.map((a, i) => (
            <LinkRow
              key={i}
              href={a.href}
              tone={a.tone ?? (i === 0 ? "accent" : "default")}
              external={a.external}
            >
              {a.label}
            </LinkRow>
          ))}
        </div>
      )}
    </section>
  );
}
