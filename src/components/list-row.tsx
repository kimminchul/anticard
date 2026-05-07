import * as React from "react";
import { cn } from "../utils/cn";

export interface ListRowProps extends React.HTMLAttributes<HTMLLIElement> {
  /** 좌측 작은 라벨. smallcaps 톤. 보통 카테고리·날짜·버전. */
  meta?: React.ReactNode;
  /** 우측 라벨. 클라이언트, 보조 정보. */
  trailing?: React.ReactNode;
  /** 본문(제목). 가장 두드러지는 텍스트. */
  children: React.ReactNode;
  /** 클릭 가능 행이면 href 또는 onClick 사용 */
  href?: string;
}

/**
 * ListRow — 카드 그리드 대신 행 레이아웃.
 *
 * 안티 카드 5원칙 중 "리스트의 행" 패턴.
 * 카드 그리드는 정보 밀도를 떨어뜨리고 모든 항목을 균등히 보이게 한다.
 * 행 레이아웃은 한 화면에 더 많은 정보를 자연스럽게 펼치고,
 * 위계는 제목 크기·meta 라벨로 만든다.
 *
 * @example
 *   <ul className="divide-y border-y">
 *     <ListRow meta="2025.04" trailing="EBS" href="/heritage/ebs">
 *       EBS 온라인 클래스 재구조화
 *     </ListRow>
 *   </ul>
 */
export function ListRow({
  meta,
  trailing,
  children,
  href,
  className,
  ...props
}: ListRowProps) {
  const inner = (
    <div
      className={cn(
        "grid grid-cols-1 gap-1 py-6 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-8"
      )}
    >
      {meta && (
        <div className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {meta}
        </div>
      )}
      {!meta && <div />}
      <div className="text-[15.5px] font-medium leading-snug text-zinc-900 dark:text-zinc-100">
        {children}
      </div>
      {trailing && (
        <div className="text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {trailing}
        </div>
      )}
    </div>
  );

  return (
    <li
      data-anti-card="list-row"
      className={cn(
        href &&
          "group transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.02]",
        className
      )}
      {...props}
    >
      {href ? (
        <a
          href={href}
          className="block px-1 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
        >
          {inner}
        </a>
      ) : (
        <div className="px-1">{inner}</div>
      )}
    </li>
  );
}
