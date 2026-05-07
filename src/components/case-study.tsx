import * as React from "react";
import { cn } from "../utils/cn";
import { typography } from "../tokens/typography";

export interface CaseStudyMeta {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface CaseStudyOutcome {
  value: React.ReactNode;
  label: React.ReactNode;
}

export interface CaseStudyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** smallcaps */
  eyebrow?: React.ReactNode;
  /** 사례 제목 */
  title: React.ReactNode;
  /** 메타 정보 (year/client/role 등) — DefList 패턴 */
  meta?: CaseStudyMeta[];
  /** Problem — 무슨 문제였나 */
  problem: React.ReactNode;
  /** Solution — 어떻게 풀었나 */
  solution: React.ReactNode;
  /** Outcome — 결과 (StatList 패턴, 0~3개) */
  outcomes?: CaseStudyOutcome[];
  /** 상세 링크 */
  href?: string;
  /** href에 hover 효과 + 링크 라벨 */
  hrefLabel?: React.ReactNode;
}

/**
 * CaseStudy — 단일 프로젝트 사례 정리.
 *
 * Problem → Solution → Outcome 3단 구조 + 메타 정보.
 * 카드 박스 거부, 헤어라인 + 좌우 분할 그리드.
 *
 * Heritage의 단일 프로젝트 페이지에 사용.
 *
 * @example
 *   <CaseStudy
 *     eyebrow="Heritage · 2021"
 *     title="EBS 온라인 클래스 재구조화"
 *     meta={[
 *       { label: "Year", value: "2021" },
 *       { label: "Client", value: "EBS" },
 *       { label: "Role", value: "PM + 개발 리드" },
 *     ]}
 *     problem="기존 학습 흐름이 모바일에서 단절됨..."
 *     solution="단일 SPA + 학습 진척도 동기화..."
 *     outcomes={[
 *       { value: "+38%", label: "완강율" },
 *       { value: "-22%", label: "이탈률" },
 *     ]}
 *   />
 */
export function CaseStudy({
  eyebrow,
  title,
  meta = [],
  problem,
  solution,
  outcomes = [],
  href,
  hrefLabel = "자세히 보기 →",
  className,
  ...props
}: CaseStudyProps) {
  return (
    <article
      data-anti-card="case-study"
      className={cn(
        "border-y border-zinc-200 py-12 md:py-16 dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      )}
      <h3
        className={cn(
          "mt-3 max-w-[28ch]",
          typography.h2
        )}
      >
        {title}
      </h3>

      {meta.length > 0 && (
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {meta.map((m, i) => (
            <div key={i} className="flex flex-col">
              <dt className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                {m.label}
              </dt>
              <dd className="mt-1 text-[14px] text-zinc-700 dark:text-zinc-300">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <section>
          <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Problem
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {problem}
          </p>
        </section>
        <section>
          <p className="text-[12px] uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
            Solution
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {solution}
          </p>
        </section>
      </div>

      {outcomes.length > 0 && (
        <div className="mt-12 border-t border-zinc-200/60 pt-10 dark:border-white/[0.06]">
          <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Outcome
          </p>
          <dl
            className={cn(
              "mt-6 grid gap-x-10 gap-y-8",
              outcomes.length === 1 && "grid-cols-1",
              outcomes.length === 2 && "grid-cols-2",
              outcomes.length >= 3 && "grid-cols-2 md:grid-cols-3"
            )}
          >
            {outcomes.map((o, i) => (
              <div key={i}>
                <dt className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
                  {o.value}
                </dt>
                <dd className="mt-3 text-[12.5px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                  {o.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {href && (
        <div className="mt-10">
          <a
            href={href}
            className="group inline-flex items-baseline gap-2 text-[15.5px] text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400"
          >
            <span className="border-b border-current/30 group-hover:border-current">
              {hrefLabel}
            </span>
          </a>
        </div>
      )}
    </article>
  );
}
