import * as React from "react";
import { cn } from "../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary=채움, secondary=헤어라인 only */
  variant?: "primary" | "secondary";
  /** 사이즈 */
  size?: "default" | "small" | "large";
  /** 톤 (variant=primary일 때만 의미). default=neutral 채움 / accent=emerald 채움 */
  tone?: "default" | "accent";
  /** 좌측 아이콘 (선택) */
  leadingIcon?: React.ReactNode;
  /** 우측 아이콘 — 기본 화살표 안 들어감 (LinkRow와 차별) */
  trailingIcon?: React.ReactNode;
}

/**
 * Button — 진짜 button 액션.
 *
 * 폼 제출, 모달 confirm 등 진짜 button이 필요한 곳.
 * 일반 페이지 CTA는 박스 거부형 LinkRow 권장 — Button은 form/dialog 전용.
 *
 * primary: 채워진 박스 (rounded-md, 단순한 톤. 그라데이션·shadow X)
 * secondary: 헤어라인 only (border + 투명 배경)
 *
 * @example
 *   <Button type="submit" variant="primary" tone="accent">전송</Button>
 *   <Button variant="secondary" onClick={onCancel}>취소</Button>
 */
export function Button({
  variant = "primary",
  size = "default",
  tone = "default",
  leadingIcon,
  trailingIcon,
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
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        size === "small" && "px-3 py-1.5 text-[13px]",
        size === "default" && "px-4 py-2 text-[14px]",
        size === "large" && "px-5 py-2.5 text-[15px]",
        // primary
        variant === "primary" && tone === "default" &&
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
        variant === "primary" && tone === "accent" &&
          "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950",
        // secondary
        variant === "secondary" &&
          "border border-zinc-300 bg-transparent text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 dark:border-white/[0.15] dark:text-zinc-100 dark:hover:border-white/[0.25] dark:hover:bg-white/[0.03]",
        className
      )}
      {...props}
    >
      {leadingIcon && <span aria-hidden className="-ml-0.5">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span aria-hidden className="-mr-0.5">{trailingIcon}</span>}
    </button>
  );
}
