import * as React from "react";
import { cn } from "../utils/cn";

export interface FAQItem {
  question: React.ReactNode;
  answer: React.ReactNode;
  /** 기본 열림 여부 */
  defaultOpen?: boolean;
}

export interface FAQProps extends React.HTMLAttributes<HTMLDListElement> {
  items: FAQItem[];
}

/**
 * FAQ — 자주 묻는 질문 아코디언.
 *
 * details/summary 시맨틱 — JS 없이 native browser 동작.
 * 박스 거부, 헤어라인으로 행 구분.
 *
 * @example
 *   <FAQ items={[
 *     { question: "어디에 사용하나요?", answer: "랜딩 페이지 / 콘텐츠 사이트." },
 *     { question: "shadcn과 다른가요?", answer: "정반대 방향입니다." },
 *   ]} />
 */
export function FAQ({ items, className, ...props }: FAQProps) {
  return (
    <dl
      data-anti-card="faq"
      className={cn(
        "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div key={i}>
          <details
            open={item.defaultOpen}
            className="group [&>summary]:list-none [&>summary]:cursor-pointer"
          >
            <summary className="flex items-baseline justify-between gap-4 py-5">
              <dt className="text-[15.5px] font-medium leading-snug text-zinc-900 transition-colors group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                {item.question}
              </dt>
              <span
                aria-hidden
                className="shrink-0 text-[14px] text-zinc-500 transition-transform duration-200 group-open:rotate-45 dark:text-zinc-400"
              >
                +
              </span>
            </summary>
            <dd className="pb-5 pr-10 text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {item.answer}
            </dd>
          </details>
        </div>
      ))}
    </dl>
  );
}
