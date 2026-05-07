import * as React from "react";
import { cn } from "../utils/cn";

export interface FooterColumn {
  /** 컬럼 제목 (smallcaps 자동 적용) */
  heading: React.ReactNode;
  links: Array<{ label: React.ReactNode; href: string; external?: boolean }>;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** 좌측 브랜드 영역 */
  brand?: React.ReactNode;
  /** 브랜드 아래 짧은 카피 */
  description?: React.ReactNode;
  /** 컬럼 단위 링크 그룹 */
  columns?: FooterColumn[];
  /** 하단 카피라이트 */
  copyright?: React.ReactNode;
}

/**
 * Footer — 사이트 하단. 헤어라인 1px 상단 + 충분한 공간.
 *
 * 카드 박스 거부. 컬럼 단위로 정보를 펼치되, 시각 강조는 smallcaps 헤딩 + 본문 톤만.
 *
 * @example
 *   <Footer
 *     brand="Freeive"
 *     description="1인 랩."
 *     columns={[
 *       { heading: "Pillars", links: [{label: "안티 카드", href: "/anti-card"}, ...] },
 *     ]}
 *     copyright="© 2026 Freeive"
 *   />
 */
export function Footer({
  brand,
  description,
  columns = [],
  copyright,
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      data-anti-card="footer"
      className={cn(
        "border-t border-zinc-200/60 dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_3fr] md:gap-20">
          {(brand || description) && (
            <div>
              {brand && (
                <div className="text-[18px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {brand}
                </div>
              )}
              {description && (
                <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>
          )}
          {columns.length > 0 && (
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {columns.map((col, i) => (
                <div key={i}>
                  <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                    {col.heading}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l, j) => {
                      const targetProps = l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};
                      return (
                        <li key={j}>
                          <a
                            href={l.href}
                            {...targetProps}
                            className="text-[13.5px] text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
                          >
                            {l.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {copyright && (
          <div className="mt-16 border-t border-zinc-200/60 pt-6 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400">
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
