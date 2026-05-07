import * as React from "react";
import { cn } from "../utils/cn";

export interface HoverAccentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** hover 시 변환 방식 */
  effect?: "color" | "underline" | "translate" | "all";
  /** 색 톤. accent=emerald (기본) / mute=흐림에서 진하게 */
  tone?: "accent" | "mute";
  /** as prop으로 시맨틱 변경 */
  as?: "div" | "span" | "li";
}

/**
 * HoverAccent — 호버 강조 wrapper.
 *
 * 자식에 hover 시 색·밑줄·이동 효과를 한 번에. Tailwind group 패턴 wrapper.
 *
 * effect 종류:
 * - color: 텍스트만 emerald로
 * - underline: 좌→우로 차오르는 밑줄 (border-b transition)
 * - translate: 살짝 우측 이동 (links)
 * - all: 모든 효과 (color + translate)
 *
 * @example
 *   <HoverAccent>
 *     <a href="/heritage">전체 Heritage 보기</a>
 *   </HoverAccent>
 *
 *   <HoverAccent effect="underline">
 *     <span>밑줄이 자라는 텍스트</span>
 *   </HoverAccent>
 */
export function HoverAccent({
  effect = "color",
  tone = "accent",
  as = "div",
  className,
  children,
  ...props
}: HoverAccentProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-anti-card="hover-accent"
      data-effect={effect}
      className={cn(
        "group inline-block transition-colors",
        // color
        (effect === "color" || effect === "all") && tone === "accent" &&
          "hover:text-emerald-600 dark:hover:text-emerald-400",
        (effect === "color" || effect === "all") && tone === "mute" &&
          "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
        // translate
        (effect === "translate" || effect === "all") &&
          "[&>*]:transition-transform [&>*]:duration-300 hover:[&>*]:translate-x-0.5",
        // underline (group hover triggers child border)
        effect === "underline" &&
          "[&>*]:relative [&>*]:after:absolute [&>*]:after:bottom-0 [&>*]:after:left-0 [&>*]:after:h-px [&>*]:after:w-0 [&>*]:after:bg-current [&>*]:after:transition-all [&>*]:after:duration-300 hover:[&>*]:after:w-full",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
