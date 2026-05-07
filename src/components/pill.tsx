import * as React from "react";
import { cn } from "../utils/cn";

export interface PillProps extends React.HTMLAttributes<HTMLElement> {
  /** 시맨틱 태그. 기본 span. 링크면 a로 (이때 href 사용) */
  as?: "span" | "a";
  /** as="a"일 때 링크 */
  href?: string;
  /** 외부 링크 (a + external) */
  external?: boolean;
  /** 색 톤. default=중성 / accent=emerald / muted=더 흐림 */
  tone?: "default" | "accent" | "muted";
  /** 활성화 상태 (필터 선택 등) */
  active?: boolean;
}

/**
 * Pill — 태그·필터 칩.
 *
 * 블로그 태그, 카테고리 필터, 작은 라벨 등.
 * 둥근 사각 (rounded-md), 살짝 border + bg, 12.5px.
 *
 * "필" 또는 "태그" 두 어휘 모두 같은 컴포넌트로 처리.
 *
 * @example
 *   <Pill>NPM</Pill>
 *   <Pill tone="accent" active>전체</Pill>
 *   <Pill as="a" href="/blog?tag=AI">AI 워크플로우</Pill>
 */
export function Pill({
  as = "span",
  href,
  external,
  tone = "default",
  active = false,
  className,
  children,
  ...props
}: PillProps) {
  const baseCls = cn(
    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12.5px] leading-tight transition-colors",
    !active && tone === "default" &&
      "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-white/[0.15]",
    !active && tone === "muted" &&
      "border-zinc-200/60 bg-transparent text-zinc-500 hover:text-zinc-700 dark:border-white/[0.06] dark:text-zinc-400 dark:hover:text-zinc-200",
    !active && tone === "accent" &&
      "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400",
    active &&
      "border-emerald-500/50 bg-emerald-500/[0.12] text-emerald-700 dark:border-emerald-400/50 dark:text-emerald-400",
    className
  );

  if (as === "a") {
    const targetProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a
        data-anti-card="pill"
        data-tone={tone}
        data-active={active || undefined}
        href={href}
        {...targetProps}
        className={baseCls}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      data-anti-card="pill"
      data-tone={tone}
      data-active={active || undefined}
      className={baseCls}
      {...props}
    >
      {children}
    </span>
  );
}
