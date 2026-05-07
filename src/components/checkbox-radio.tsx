import * as React from "react";
import { cn } from "../utils/cn";

interface BaseProps {
  /** 라벨 텍스트 (필수) */
  label: React.ReactNode;
  /** 보조 설명 */
  description?: React.ReactNode;
  /** wrapper className */
  wrapperClassName?: string;
}

export type CheckboxProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export type RadioProps = CheckboxProps;

/**
 * Checkbox — 체크박스 + 라벨 + 설명.
 *
 * native input + custom 시각. 박스 거부 톤은 폼에서 어려우니 살짝 둥근 사각.
 * focus / checked 시 emerald.
 *
 * @example
 *   <Checkbox
 *     name="agree"
 *     label="이용약관에 동의합니다."
 *     description="14세 이상 사용자만 가입 가능."
 *     required
 *   />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, description, wrapperClassName, className, id, ...props },
    ref
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer gap-3",
          props.disabled && "cursor-not-allowed opacity-50",
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          data-anti-card="checkbox"
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border border-zinc-300 bg-transparent appearance-none",
            "transition-colors",
            "checked:border-emerald-500 checked:bg-emerald-500",
            "focus-visible:outline-2 focus-visible:outline-emerald-500/40 focus-visible:outline-offset-2",
            "dark:border-white/[0.15] dark:checked:border-emerald-400 dark:checked:bg-emerald-400",
            // checkmark via background-image
            "checked:bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2012'%20fill='none'%20stroke='white'%20stroke-width='2'%3E%3Cpath%20d='M2.5%206.5L5%209L9.5%204'/%3E%3C/svg%3E\")] checked:bg-no-repeat checked:bg-center checked:bg-[length:80%]",
            "dark:checked:bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2012'%20fill='none'%20stroke='%2309090b'%20stroke-width='2'%3E%3Cpath%20d='M2.5%206.5L5%209L9.5%204'/%3E%3C/svg%3E\")]",
            className
          )}
          {...props}
        />
        <div className="min-w-0 flex-1">
          <span className="text-[14px] leading-tight text-zinc-900 dark:text-zinc-100">
            {label}
          </span>
          {description && (
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
      </label>
    );
  }
);

/**
 * Radio — 라디오 + 라벨 + 설명.
 *
 * Checkbox와 동일 패턴, type="radio" + rounded-full + 내부 dot.
 *
 * @example
 *   <fieldset>
 *     <Radio name="plan" value="free" label="Free" description="개인 프로젝트" />
 *     <Radio name="plan" value="pro" label="Pro" />
 *   </fieldset>
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    { label, description, wrapperClassName, className, id, ...props },
    ref
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer gap-3",
          props.disabled && "cursor-not-allowed opacity-50",
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          data-anti-card="radio"
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-zinc-300 bg-transparent",
            "transition-colors",
            "checked:border-[5px] checked:border-emerald-500 checked:bg-white",
            "focus-visible:outline-2 focus-visible:outline-emerald-500/40 focus-visible:outline-offset-2",
            "dark:border-white/[0.15] dark:checked:border-emerald-400 dark:checked:bg-zinc-950",
            className
          )}
          {...props}
        />
        <div className="min-w-0 flex-1">
          <span className="text-[14px] leading-tight text-zinc-900 dark:text-zinc-100">
            {label}
          </span>
          {description && (
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
      </label>
    );
  }
);
