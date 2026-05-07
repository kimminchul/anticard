import * as React from "react";
import { cn } from "../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  wrapperClassName?: string;
}

/**
 * Textarea — 여러 줄 입력.
 *
 * Input과 동일 톤. resize-y, min-height 8em.
 *
 * @example
 *   <Textarea
 *     label="프로젝트 설명"
 *     placeholder="어떤 프로젝트인가요?"
 *     rows={5}
 *   />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, wrapperClassName, className, id, rows = 4, ...props },
    ref
  ) {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    return (
      <div
        data-anti-card="textarea"
        className={cn("flex flex-col gap-1.5", wrapperClassName)}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "resize-y rounded-md border bg-transparent px-3 py-2 text-[14px] leading-relaxed outline-none transition-colors",
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
