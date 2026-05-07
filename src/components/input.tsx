import * as React from "react";
import { cn } from "../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 라벨 (선택, 위에 표시) */
  label?: React.ReactNode;
  /** 에러 메시지 */
  error?: React.ReactNode;
  /** 보조 설명 */
  hint?: React.ReactNode;
  /** 필드 wrapper className (label + input + hint 묶음) */
  wrapperClassName?: string;
}

/**
 * Input — 텍스트 입력.
 *
 * 둥근 모서리 살짝(rounded-md), shadow X. focus 시 emerald 헤어라인.
 * label / hint / error를 props로 받아 form 패턴 자동.
 *
 * @example
 *   <Input
 *     label="이메일"
 *     type="email"
 *     placeholder="ive@freeive.com"
 *     hint="답장이 필요한 주소"
 *   />
 *
 *   <Input label="이름" required error="이름을 입력해주세요." />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, error, hint, wrapperClassName, className, id, ...props },
    ref
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <div
        data-anti-card="input"
        className={cn("flex flex-col gap-1.5", wrapperClassName)}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "rounded-md border bg-transparent px-3 py-2 text-[14px] outline-none transition-colors",
            "border-zinc-300 text-zinc-900 placeholder:text-zinc-400",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-white/[0.12] dark:text-zinc-100 dark:placeholder:text-zinc-500",
            "dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20",
            error &&
              "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400",
            className
          )}
          {...props}
        />
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
