import * as React from "react";
import { cn } from "../utils/cn";
import { Eyebrow } from "./eyebrow";
import { LinkRow } from "./link-row";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 큰 코드/숫자 (예: 404). 시각 임팩트 */
  code?: React.ReactNode;
  /** smallcaps 라벨 (예: "Not found") */
  eyebrow?: React.ReactNode;
  /** 큰 제목 */
  title: React.ReactNode;
  /** 보조 설명 */
  description?: React.ReactNode;
  /** 행동 유도 링크들 */
  actions?: Array<{
    label: React.ReactNode;
    href: string;
    tone?: "default" | "accent";
  }>;
  /** 정렬. 기본 좌측 (404는 center 권장) */
  align?: "left" | "center";
}

/**
 * EmptyState — 빈 상태·404·error 페이지 패턴.
 *
 * 카드 박스 거부. 큰 code(숫자) + 짧은 메시지 + LinkRow 액션.
 *
 * @example
 *   // 404
 *   <EmptyState
 *     code="404"
 *     eyebrow="Not found"
 *     title="찾으시는 페이지가 없습니다."
 *     description="이미 옮겨졌거나 잘못된 경로일 수 있어요."
 *     actions={[{ label: "홈으로 돌아가기", href: "/" }]}
 *     align="center"
 *   />
 *
 *   // 빈 리스트
 *   <EmptyState
 *     eyebrow="Blog"
 *     title="아직 글이 없습니다."
 *     description="곧 학습 일지부터 채워나갑니다."
 *   />
 */
export function EmptyState({
  code,
  eyebrow,
  title,
  description,
  actions = [],
  align = "left",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <section
      data-anti-card="empty-state"
      className={cn(
        "py-20 md:py-28",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      {code && (
        <p
          className={cn(
            "font-mono text-[clamp(3rem,8vw,5rem)] font-medium leading-none tracking-tight text-zinc-300 dark:text-zinc-700",
            align === "center" && "mx-auto"
          )}
        >
          {code}
        </p>
      )}
      {eyebrow && (
        <div className={cn(code && "mt-8")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={cn(
          "max-w-[28ch] font-semibold tracking-[-0.015em] text-zinc-900 dark:text-zinc-50",
          "text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.2]",
          eyebrow || code ? "mt-4" : "",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-[52ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
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
            >
              {a.label}
            </LinkRow>
          ))}
        </div>
      )}
    </section>
  );
}
