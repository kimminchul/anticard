import * as React from "react";
import { cn } from "../utils/cn";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  /** 옵션 배열로 받기 (children 대신) */
  options?: SelectOption[];
  /** placeholder (selected가 빈 값일 때 표시) */
  placeholder?: string;
  wrapperClassName?: string;
}

/**
 * Select — native select.
 *
 * 커스텀 dropdown 거부 — 접근성·모바일 OS 통합 유지.
 * Input과 동일 톤. focus시 emerald.
 *
 * @example
 *   <Select
 *     label="카테고리"
 *     placeholder="선택하세요"
 *     options={[
 *       { value: "learning", label: "학습 일지" },
 *       { value: "ai", label: "AI 워크플로우" },
 *     ]}
 *   />
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      error,
      hint,
      options,
      placeholder,
      wrapperClassName,
      className,
      id,
      children,
      ...props
    },
    ref
  ) {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    return (
      <div
        data-anti-card="select"
        className={cn("flex flex-col gap-1.5", wrapperClassName)}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "appearance-none rounded-md border bg-transparent bg-no-repeat px-3 py-2 pr-8 text-[14px] outline-none transition-colors",
            "border-zinc-300 text-zinc-900",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-white/[0.12] dark:text-zinc-100",
            "dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20",
            error &&
              "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400",
            className
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%2371717a' stroke-width='1.5'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5'/%3E%3C/svg%3E\")",
            backgroundPosition: "right 12px center",
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error ? (
          <p className="text-[12.5px] text-rose-600 dark:text-rose-400">
            {error}
          </p>
        ) : hint ? (
          <p className="text-[12.5px] text-zinc-500 dark:text-zinc-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
