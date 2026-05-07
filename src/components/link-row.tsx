import * as React from "react";
import { cn } from "../utils/cn";

export interface LinkRowProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  /** 외부 링크면 자동 target="_blank" + rel */
  external?: boolean;
  /** 우측 보조 라벨. (예: "GitHub →" 옆의 "외부 링크") */
  trailing?: React.ReactNode;
  /** 시각 톤. default=본문 톤 hover시 emerald, accent=항상 emerald */
  tone?: "default" | "accent";
  /** size. default=15.5px (본문), large=18px (CTA) */
  size?: "default" | "large";
}

/**
 * LinkRow — 박스 거부형 CTA 링크.
 *
 * "버튼 박스" 대신 한 줄 텍스트 + 화살표 + hover시 emerald.
 * 섹션 끝 CTA, 페이지 하단 더 보기, 푸터 외부 링크 등에 두루 사용.
 *
 * @example
 *   <LinkRow href="/heritage">전체 Heritage 보기</LinkRow>
 *   <LinkRow href="https://github.com/freeive" external>GitHub</LinkRow>
 */
export function LinkRow({
  href,
  external,
  trailing,
  tone = "default",
  size = "default",
  className,
  children,
  ...props
}: LinkRowProps) {
  const targetProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      data-anti-card="link-row"
      data-tone={tone}
      href={href}
      {...targetProps}
      className={cn(
        "group inline-flex items-baseline gap-2 transition-colors",
        size === "default" && "text-[15.5px]",
        size === "large" && "text-[18px] md:text-[20px]",
        tone === "default" &&
          "text-zinc-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400",
        tone === "accent" && "text-emerald-600 dark:text-emerald-400",
        className
      )}
      {...props}
    >
      <span className="border-b border-current/30 group-hover:border-current">
        {children}
      </span>
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
      {trailing && (
        <span className="ml-2 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {trailing}
        </span>
      )}
    </a>
  );
}
