import * as React from "react";
import { cn } from "../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Width variants. narrow=640px(긴글), default=1200px(사이트), wide=1440px, full=제한없음. */
  size?: "narrow" | "default" | "wide" | "full";
  /** 시맨틱 태그 변경. 기본 div. */
  as?: "div" | "main" | "article" | "section";
}

/**
 * Container — 페이지 본문 너비 통일.
 *
 * 안티 카드 5원칙 중 "공간(여백)" — 본문을 화면 끝까지 늘리지 않고
 * 적절한 너비로 잡아 가독성을 유지한다. 카드로 영역을 가두지 않는 대신
 * 너비로 영역을 정의한다.
 *
 * 배경색·border 없음. 라이트/다크 모드 모두 투명.
 *
 * @example
 *   <Container>
 *     <SectionFrame title="..." />
 *   </Container>
 *
 * @example
 *   <Container size="narrow" as="article">
 *     긴 글 본문
 *   </Container>
 */
export function Container({
  size = "default",
  as = "div",
  className,
  ...props
}: ContainerProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-anti-card="container"
      data-size={size}
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        size === "narrow" && "max-w-[640px]",
        size === "default" && "max-w-[1200px]",
        size === "wide" && "max-w-[1440px]",
        size === "full" && "max-w-none",
        className
      )}
      {...props}
    />
  );
}
