import * as React from "react";
import { cn } from "../utils/cn";
import { ListRow } from "./list-row";

export interface SectorsPatternProject {
  /** 연도·시점 */
  year?: React.ReactNode;
  title: React.ReactNode;
  /** 클라이언트·trailing 정보 */
  client?: React.ReactNode;
  /** 클릭 가능 */
  href?: string;
}

export interface SectorsPatternSector {
  /** 섹터명 (smallcaps) */
  name: React.ReactNode;
  /** 보조 설명 (예: "12 projects") */
  subtitle?: React.ReactNode;
  projects: SectorsPatternProject[];
}

export interface SectorsPatternProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sectors: SectorsPatternSector[];
}

/**
 * SectorsPattern — 섹터별 프로젝트 리스트 페이지 패턴.
 *
 * Heritage 페이지의 표준 — 좌측 섹터 정보 + 우측 ListRow 행들.
 * 카드 그리드 거부, 모든 정보를 행 레이아웃으로.
 *
 * @example
 *   <SectorsPattern sectors={[
 *     { name: "Telecom", subtitle: "8 projects", projects: [
 *       { year: "2022", title: "라이나생명 ...", client: "라이나" },
 *     ]},
 *   ]} />
 */
export function SectorsPattern({
  sectors,
  className,
  ...props
}: SectorsPatternProps) {
  return (
    <div
      data-anti-card="sectors-pattern"
      className={cn(
        "divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {sectors.map((sector, i) => (
        <section
          key={i}
          className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-3">
            <p className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              {sector.name}
            </p>
            {sector.subtitle && (
              <p className="mt-2 text-[12.5px] text-zinc-500 dark:text-zinc-500">
                {sector.subtitle}
              </p>
            )}
          </div>
          <ul className="divide-y divide-zinc-200 border-y border-zinc-200 md:col-span-9 dark:divide-white/[0.06] dark:border-white/[0.06]">
            {sector.projects.map((p, j) => (
              <ListRow
                key={j}
                meta={p.year || "—"}
                trailing={p.client}
                href={p.href}
              >
                {p.title}
              </ListRow>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
