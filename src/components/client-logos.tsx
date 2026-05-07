import * as React from "react";
import { cn } from "../utils/cn";

export interface ClientLogoItem {
  /** 클라이언트 이름 (필수, alt 텍스트로도 사용) */
  name: string;
  /** 로고 이미지 src. 없으면 텍스트로만 표시 */
  logo?: string;
  /** 클릭 가능 */
  href?: string;
  /** 외부 링크 */
  external?: boolean;
}

export interface ClientLogosProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ClientLogoItem[];
  /**
   * grid: 균등 그리드 (모바일 2 / 데스크톱 4~5)
   * row: 가로 한 줄 (자동 줄바꿈)
   */
  layout?: "grid" | "row";
  /** 좌측 라벨 (예: "Clients", "Trusted by") */
  eyebrow?: React.ReactNode;
}

/**
 * ClientLogos — 클라이언트 로고 띠.
 *
 * shadcn식 큰 박스 그리드 거부. 헤어라인 위/아래 + grayscale 로고만.
 * hover 시 회색 → 컬러 (살아있는 로고로 변화).
 *
 * 로고 이미지가 없으면 텍스트로 대체 — smallcaps 톤.
 *
 * @example
 *   <ClientLogos
 *     eyebrow="Clients"
 *     items={[
 *       { name: "EBS", logo: "/logos/ebs.svg", href: "https://..." },
 *       { name: "라이나", logo: "/logos/lina.svg" },
 *       { name: "롯데카드" },  // 로고 없음 — 텍스트만
 *     ]}
 *   />
 */
export function ClientLogos({
  items,
  layout = "grid",
  eyebrow,
  className,
  ...props
}: ClientLogosProps) {
  return (
    <div
      data-anti-card="client-logos"
      data-layout={layout}
      className={cn(
        "border-y border-zinc-200 py-10 md:py-12 dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="mb-8 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      )}
      <ul
        className={cn(
          layout === "grid" &&
            "grid grid-cols-2 items-center gap-x-8 gap-y-10 md:grid-cols-4 lg:grid-cols-5",
          layout === "row" &&
            "flex flex-wrap items-center gap-x-10 gap-y-8 md:gap-x-14"
        )}
      >
        {items.map((item, i) => {
          const inner = item.logo ? (
            <img
              src={item.logo}
              alt={item.name}
              className="h-7 w-auto opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-8"
            />
          ) : (
            <span className="text-[13.5px] font-medium uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              {item.name}
            </span>
          );
          return (
            <li key={i} className={cn(layout === "grid" && "flex items-center justify-center")}>
              {item.href ? (
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={item.name}
                  className="inline-flex items-center"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
