import * as React from "react";
import { cn } from "../utils/cn";
import { Eyebrow } from "./eyebrow";

export interface SectionFrameProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 섹션의 카테고리 라벨. 보통 영문 smallcaps 한 줄. */
  eyebrow?: React.ReactNode;
  /** 섹션 큰 제목. 헤딩 태그는 `as`로 변경 가능. */
  title?: React.ReactNode;
  /** 제목 아래 서브 카피. 한 두 문단 권장. */
  description?: React.ReactNode;
  /** 본문 자식 — 리스트, 그리드, ListRow 등. */
  children?: React.ReactNode;
  /** 위쪽 헤어라인 표시 여부. 기본 true. */
  divider?: boolean;
  /** 헤딩 레벨. 기본 h2. */
  as?: "h2" | "h3" | "h1";
}

/**
 * SectionFrame — 카드 박스 없이 섹션을 짠다.
 *
 * 안티 카드 5원칙 중 "공간(여백)" + "헤어라인" + "smallcaps 라벨" 세 가지를
 * 한 컴포넌트로 묶어, AI가 카드 박스를 생성하려는 충동을 줄인다.
 *
 * @example
 *   <SectionFrame
 *     eyebrow="Framework · v0"
 *     title="카드 안에 카드를 쌓지 않는다."
 *     description="AI 도구가 생성하는 동질화 UI에 대한 답변."
 *   >
 *     <ListRow ... />
 *   </SectionFrame>
 */
export function SectionFrame({
  eyebrow,
  title,
  description,
  children,
  divider = true,
  as = "h2",
  className,
  ...props
}: SectionFrameProps) {
  const Heading = as as React.ElementType;
  return (
    <section
      data-anti-card="section-frame"
      className={cn(
        "relative",
        divider && "border-t border-zinc-200/60 dark:border-white/[0.06]",
        "py-16 md:py-20",
        className
      )}
      {...props}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <Heading
          data-anti-card="section-title"
          className={cn(
            "max-w-[20ch] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50",
            as === "h1" && "mt-5 text-[clamp(2rem,5vw,4rem)] leading-[1.05]",
            as === "h2" && "mt-3 text-2xl md:text-3xl",
            as === "h3" && "mt-2 text-xl md:text-2xl"
          )}
        >
          {title}
        </Heading>
      )}
      {description && (
        <p
          data-anti-card="section-description"
          className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300"
        >
          {description}
        </p>
      )}
      {children && <div className="mt-10 md:mt-12">{children}</div>}
    </section>
  );
}
