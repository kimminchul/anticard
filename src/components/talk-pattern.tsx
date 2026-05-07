import * as React from "react";
import { cn } from "../utils/cn";
import { HeroPattern } from "./hero-pattern";
import { Eyebrow } from "./eyebrow";
import { LinkRow } from "./link-row";

export interface TalkPatternProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Hero 영역 */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** "이기는 싸움만 받습니다" 같은 의뢰 가능성 체크리스트 */
  acceptList?: React.ReactNode[];
  /** 거절 항목 (받지 않는 일) */
  declineList?: React.ReactNode[];
  /** 연락 채널 (이메일, GitHub, Talk 페이지 등) */
  channels?: Array<{
    label: React.ReactNode;
    value: React.ReactNode;
    href?: string;
    external?: boolean;
  }>;
}

/**
 * TalkPattern — Talk·Contact 페이지 패턴.
 *
 * Hero + 의뢰 가능성 체크리스트(받음/안받음) + 연락 채널 묶음.
 * 1인 랩의 "이기는 싸움만" 정체성 표현.
 *
 * @example
 *   <TalkPattern
 *     title="이기는 싸움만 받습니다."
 *     acceptList={["B2B 의뢰", "1인 랩 협업"]}
 *     declineList={["가격 경쟁", "양산형 사이트"]}
 *     channels={[{ label: "Email", value: "ive@freeive.com", href: "mailto:..." }]}
 *   />
 */
export function TalkPattern({
  eyebrow,
  title,
  lead,
  acceptList = [],
  declineList = [],
  channels = [],
  className,
  ...props
}: TalkPatternProps) {
  return (
    <div data-anti-card="talk-pattern" className={cn(className)} {...props}>
      <HeroPattern
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        padding="tight"
      />

      {(acceptList.length > 0 || declineList.length > 0) && (
        <div className="mt-12 grid grid-cols-1 gap-12 border-t border-zinc-200 pt-12 md:grid-cols-2 md:gap-16 md:pt-16 dark:border-white/[0.06]">
          {acceptList.length > 0 && (
            <div>
              <Eyebrow tone="accent">받음</Eyebrow>
              <ul className="mt-5 space-y-3">
                {acceptList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <span aria-hidden className="text-emerald-600 dark:text-emerald-400">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {declineList.length > 0 && (
            <div>
              <Eyebrow>안 받음</Eyebrow>
              <ul className="mt-5 space-y-3">
                {declineList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400"
                  >
                    <span aria-hidden className="text-zinc-400 dark:text-zinc-500">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {channels.length > 0 && (
        <div className="mt-16 border-t border-zinc-200 pt-12 dark:border-white/[0.06]">
          <Eyebrow>Channels</Eyebrow>
          <dl className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/[0.06] dark:border-white/[0.06]">
            {channels.map((ch, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-1 py-4 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <dt className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                  {ch.label}
                </dt>
                <dd className="text-[15px] text-zinc-700 dark:text-zinc-300">
                  {ch.href ? (
                    <LinkRow href={ch.href} external={ch.external}>
                      {ch.value}
                    </LinkRow>
                  ) : (
                    ch.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
