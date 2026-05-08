import * as React from "react";
import { cn } from "../utils/cn";

export interface HeaderLink {
  label: React.ReactNode;
  href: string;
  external?: boolean;
  /** 현재 경로 표시 (선택) */
  active?: boolean;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** 좌측 브랜드 (이름/로고) */
  brand: React.ReactNode;
  /** 브랜드 링크. 기본 "/" */
  brandHref?: string;
  /** 가운데/우측 메뉴 */
  links?: HeaderLink[];
  /** 우측 강조 CTA. 보통 "Talk" 같은 한 개 */
  cta?: { label: React.ReactNode; href: string; external?: boolean };
  /** sticky top-0 적용 여부. 기본 false */
  sticky?: boolean;
}

/**
 * Header — 사이트 상단. 박스 거부, 헤어라인 1px 하단만.
 *
 * 안티 카드의 표준 헤더: 브랜드 + 메뉴 + 단일 CTA.
 * 카드처럼 가두지 않고 헤어라인 한 줄로 영역 끝을 표시.
 *
 * @example
 *   <Header
 *     brand="Freeive"
 *     links={[
 *       { label: "안티 카드", href: "/anti-card" },
 *       { label: "Lab", href: "/lab" },
 *       { label: "Heritage", href: "/heritage" },
 *       { label: "Blog", href: "/blog" },
 *     ]}
 *     cta={{ label: "Talk", href: "/talk" }}
 *   />
 */
export function Header({
  brand,
  brandHref = "/",
  links = [],
  cta,
  sticky = false,
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      data-anti-card="header"
      className={cn(
        "border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-white/[0.06] dark:bg-zinc-950/80",
        sticky && "sticky top-0 z-40",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-8 px-6 py-4 md:px-10">
        <a
          href={brandHref}
          className="text-[15.5px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {brand}
        </a>
        {links.length > 0 && (
          <nav className="hidden flex-1 items-center gap-6 md:flex">
            {links.map((l, i) => {
              const targetProps = l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <a
                  key={i}
                  href={l.href}
                  {...targetProps}
                  className={cn(
                    "text-[14px] transition-colors",
                    l.active
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        )}
        {cta && (
          <a
            href={cta.href}
            {...(cta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="ml-auto inline-flex items-baseline gap-1.5 text-[14px] font-medium text-zinc-900 hover:text-emerald-600 dark:text-zinc-50 dark:hover:text-emerald-400"
          >
            <span className="border-b border-zinc-900/40 dark:border-zinc-50/40">{cta.label}</span>
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </header>
  );
}
