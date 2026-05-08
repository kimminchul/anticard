import * as React from "react";
import { cn } from "../utils/cn";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 라벨 — 11px uppercase smallcaps zinc-500 */
  label?: React.ReactNode;
  /** htmlFor — 자식 control의 id 매핑 */
  htmlFor?: string;
  /** 보조 설명 — input 아래 12.5px zinc-500 */
  hint?: React.ReactNode;
  /** 에러 메시지 — rose, 표시 시 hint 자리 대체 + label 색상도 rose */
  error?: React.ReactNode;
  /** 필수 표시 (label 옆 emerald 점) */
  required?: boolean;
  /** 레이아웃 — label-top(default) / label-left(데스크톱 horizontal) */
  layout?: "label-top" | "label-left";
  /** 자식 control (Input / Textarea / Select / DatePicker / Combobox 등) */
  children: React.ReactNode;
}

/**
 * FormField — label / control / hint / error wrapper.
 *
 * 안티 카드 톤: 박스 X. label은 Eyebrow와 동일한 11px smallcaps,
 * error 표시는 hint 자리에 rose 1줄.
 *
 * data-anti-card="form-field" + data-error="" 속성으로 외부 CSS
 * 룰에서 자식 input border 색을 rose로 바꿀 수도 있음 (선택).
 *
 * @example
 *   <FormField label="이메일" htmlFor="email" required hint="회신 받을 주소"
 *              error={errors.email}>
 *     <Input id="email" type="email" />
 *   </FormField>
 */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  layout = "label-top",
  className,
  children,
  ...props
}: FormFieldProps) {
  const showError = !!error;

  const labelEl = label && (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]",
        showError
          ? "text-rose-600 dark:text-rose-400"
          : "text-zinc-500 dark:text-zinc-400"
      )}
    >
      {label}
      {required && (
        <span
          aria-hidden
          className="text-emerald-600 dark:text-emerald-400"
        >
          •
        </span>
      )}
    </label>
  );

  const helperEl = (showError || hint) && (
    <p
      className={cn(
        "text-[12.5px] leading-relaxed",
        showError
          ? "text-rose-600 dark:text-rose-400"
          : "text-zinc-500 dark:text-zinc-500"
      )}
    >
      {showError ? error : hint}
    </p>
  );

  if (layout === "label-left") {
    return (
      <div
        data-anti-card="form-field"
        data-error={showError ? "" : undefined}
        className={cn(
          "grid gap-2 md:grid-cols-[140px_1fr] md:items-start md:gap-4",
          className
        )}
        {...props}
      >
        <div className="md:pt-2.5">{labelEl}</div>
        <div className="space-y-1.5">
          {children}
          {helperEl}
        </div>
      </div>
    );
  }

  return (
    <div
      data-anti-card="form-field"
      data-error={showError ? "" : undefined}
      className={cn("space-y-1.5", className)}
      {...props}
    >
      {labelEl}
      {children}
      {helperEl}
    </div>
  );
}
