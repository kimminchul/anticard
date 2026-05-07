import * as React from "react";
import { cn } from "../utils/cn";
import { typography } from "../tokens/typography";

export interface TestimonialAuthor {
  name: string;
  /** 직책 (예: "PM", "디자이너") */
  title?: string;
  /** 회사·소속 */
  company?: string;
  /** 프로필 이미지 src (선택, 없으면 이니셜) */
  avatar?: string;
}

export interface TestimonialProps
  extends React.HTMLAttributes<HTMLQuoteElement> {
  /** 인용자 정보 */
  author: TestimonialAuthor;
  /** 사이즈. default(15px lead 톤) / large(섹션 강조 — 22~32px) */
  size?: "default" | "large";
}

/**
 * Testimonial — 사용자 후기.
 *
 * 박스 거부, 좌측 헤어라인 + 인용 + 작성자 묶음.
 * Quote 컴포넌트의 확장 — author 정보가 figcaption보다 더 풍부.
 *
 * @example
 *   <Testimonial author={{ name: "김OO", title: "PM", company: "EBS" }}>
 *     1인 랩이 대형 에이전시 PM보다 빠르게 결정해서 놀랐습니다.
 *   </Testimonial>
 */
export function Testimonial({
  author,
  size = "default",
  className,
  children,
  ...props
}: TestimonialProps) {
  const initials = author.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure
      data-anti-card="testimonial"
      data-size={size}
      className={cn("my-10", className)}
    >
      <blockquote
        className={cn(
          "border-l-2 border-zinc-300 pl-6 dark:border-white/[0.12]",
          size === "default" && typography.lead,
          size === "large" &&
            "text-[clamp(1.375rem,2.5vw,2rem)] font-medium leading-snug tracking-[-0.01em] text-zinc-700 dark:text-zinc-200"
        )}
        {...props}
      >
        {children}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 pl-6">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-[12px] font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-300">
            {initials}
          </div>
        )}
        <div className="text-[13.5px] leading-tight">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            {author.name}
          </p>
          {(author.title || author.company) && (
            <p className="mt-0.5 text-[12.5px] text-zinc-500 dark:text-zinc-400">
              {[author.title, author.company].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
