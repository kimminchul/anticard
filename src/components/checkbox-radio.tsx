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
 * native input + accent-color로 색만 emerald. native ✓ 표시 그대로 사용.
 * 커스텀 시각 거부 — 접근성·모바일 OS·브라우저 기본 모두 안정.
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
            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-emerald-500 dark:accent-emerald-400",
            "focus-visible:outline-2 focus-visible:outline-emerald-500/40 focus-visible:outline-offset-2",
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
 * native input + accent-color. checkbox와 동일 정신.
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
            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-emerald-500 dark:accent-emerald-400",
            "focus-visible:outline-2 focus-visible:outline-emerald-500/40 focus-visible:outline-offset-2",
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
