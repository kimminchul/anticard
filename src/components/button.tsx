import * as React from "react";
import { cn } from "../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 박스 강도 순 (5원칙 박스 거부 정신) — primary > secondary > ghost > plain */
  variant?: "primary" | "secondary" | "ghost" | "plain";
  /** 사이즈 */
  size?: "default" | "small" | "large";
  /** 톤. default=neutral / accent=emerald */
  tone?: "default" | "accent";
  /** 좌측 아이콘 (선택) */
  leadingIcon?: React.ReactNode;
  /** 우측 아이콘 — 기본 화살표 안 들어감 (LinkRow와 차별) */
  trailingIcon?: React.ReactNode;
  /** 아이콘만 (텍스트 없음). 정사각형 패딩 + aria-label 권장 */
  iconOnly?: boolean;
}

/**
 * Button — 진짜 button 액션.
 *
 * 폼 제출, 모달 confirm 등 진짜 button이 필요한 곳.
 * 일반 페이지 CTA는 박스 거부형 LinkRow 권장 — Button은 form/dialog 전용.
 *
 * 4 variants (박스 강도 순):
 * - primary  : 채워진 박스 (form submit / 가장 강한 액션)
 * - secondary: 헤어라인 only (border, 취소·대안 액션)
 * - ghost    : 박스 X, hover 시 배경 (인라인 액션)
 * - plain    : 텍스트만 (가장 박스 거부, edit·toggle 등 인라인)
 *
 * @example
 *   <Button type="submit" variant="primary" tone="accent">전송</Button>
 *   <Button variant="secondary" onClick={onCancel}>취소</Button>
 *   <Button variant="ghost" leadingIcon={<Plus className="h-4 w-4" />}>새로 만들기</Button>
 *   <Button variant="plain" tone="accent">자세히 보기 →</Button>
 *   <Button variant="ghost" iconOnly aria-label="더 보기"><MoreHorizontal className="h-4 w-4" /></Button>
 */
export function Button({
  variant = "primary",
  size = "default",
  tone = "default",
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-anti-card="button"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",

        // 사이즈 — iconOnly는 정사각형 패딩
        !iconOnly && size === "small" && "px-3 py-1.5 text-[13px]",
        !iconOnly && size === "default" && "px-4 py-2 text-[14px]",
        !iconOnly && size === "large" && "px-5 py-2.5 text-[15px]",
        iconOnly && size === "small" && "p-1.5 text-[13px]",
        iconOnly && size === "default" && "p-2 text-[14px]",
        iconOnly && size === "large" && "p-2.5 text-[15px]",

        // plain은 padding 더 작게 (텍스트 inline 느낌)
        variant === "plain" && !iconOnly && "px-1 py-0.5",

        // PRIMARY — 채움
        variant === "primary" && tone === "default" &&
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
        variant === "primary" && tone === "accent" &&
          "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950",

        // SECONDARY — 헤어라인 only
        variant === "secondary" && tone === "default" &&
          "border border-zinc-300 bg-transparent text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 dark:border-white/[0.15] dark:text-zinc-100 dark:hover:border-white/[0.25] dark:hover:bg-white/[0.03]",
        variant === "secondary" && tone === "accent" &&
          "border border-emerald-500/40 bg-transparent text-emerald-700 hover:border-emerald-500/70 hover:bg-emerald-500/[0.06] dark:border-emerald-400/40 dark:text-emerald-400 dark:hover:border-emerald-400/70 dark:hover:bg-emerald-400/[0.06]",

        // GHOST — 박스 X, hover 시 배경
        variant === "ghost" && tone === "default" &&
          "bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50",
        variant === "ghost" && tone === "accent" &&
          "bg-transparent text-emerald-700 hover:bg-emerald-500/[0.08] dark:text-emerald-400 dark:hover:bg-emerald-400/[0.08]",

        // PLAIN — 텍스트만 (rounded 무시 가능, hover underline)
        variant === "plain" && tone === "default" &&
          "bg-transparent text-zinc-700 hover:text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50",
        variant === "plain" && tone === "accent" &&
          "bg-transparent text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300",

        className
      )}
      {...props}
    >
      {leadingIcon && <span aria-hidden className={cn(!iconOnly && "-ml-0.5")}>{leadingIcon}</span>}
      {children}
      {trailingIcon && <span aria-hidden className={cn(!iconOnly && "-mr-0.5")}>{trailingIcon}</span>}
    </button>
  );
}
