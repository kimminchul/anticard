import * as React from "react";
import { cn } from "../utils/cn";

export interface WaveCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 제목 (필수) */
  title: React.ReactNode;
  /** 클라이언트·소속 */
  client?: React.ReactNode;
  /** 요약 한두 줄 */
  summary?: React.ReactNode;
  /** 진행도 0~90 (90+는 거의 완료라 wave 시각이 어색) */
  progress: number;
  /** wave 색 (hex). 기본 emerald-400 */
  waveColor?: string;
  /** 연도·시점 */
  year?: React.ReactNode;
  /**
   * variant. card=기존 freeive 톤 (rounded + border + bg) / frame=anti-card 톤 (헤어라인 only).
   * 기본 frame.
   */
  variant?: "card" | "frame";
  /** 좌측 라벨 (기본 "In progress") */
  label?: React.ReactNode;
  /**
   * wave 진행 방향.
   * - "horizontal" (default): 물이 차오르듯 위→아래 채움 (게이지의 세로 진행)
   * - "vertical": 좌→우 채움 (게이지의 가로 진행). 가로로 긴 카드에 적합.
   */
  orientation?: "horizontal" | "vertical";
}

function WaveHorizontal({ progress, color }: { progress: number; color: string }) {
  const safe = Math.max(0, Math.min(progress, 90));
  const fillTop = 100 - safe;
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ borderRadius: "inherit" }}
      aria-hidden
    >
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-1000"
        style={{ top: `${fillTop}%` }}
      >
        <svg
          className="absolute w-[200%] [animation:anticard-wave-h-slow_4s_linear_infinite]"
          style={{ top: "-12px" }}
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V40 H0 Z"
            fill={color}
            fillOpacity="0.25"
          />
        </svg>
        <svg
          className="absolute w-[200%] [animation:anticard-wave-h-fast_3s_linear_infinite]"
          style={{ top: "-6px" }}
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20 Q150 40 300 20 T600 20 T900 20 T1200 20 V40 H0 Z"
            fill={color}
            fillOpacity="0.35"
          />
        </svg>
        <div
          className="h-full w-full"
          style={{ backgroundColor: color, opacity: 0.12 }}
        />
      </div>
      <style>{`
        @keyframes anticard-wave-h-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes anticard-wave-h-fast {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function WaveVertical({ progress, color }: { progress: number; color: string }) {
  const safe = Math.max(0, Math.min(progress, 90));
  // 좌→우 진행: 왼쪽이 safe%만큼 채워지고, 나머지(fillRight%)가 비어있음.
  const fillRight = 100 - safe;
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ borderRadius: "inherit" }}
      aria-hidden
    >
      <div
        className="absolute inset-y-0 left-0 transition-all duration-1000"
        style={{ right: `${fillRight}%` }}
      >
        {/* wave path를 시계방향 90° 회전: 출렁임이 우측 가장자리에서 발생, 좌측은 채워짐 */}
        <svg
          className="absolute h-[200%] [animation:anticard-wave-v-slow_4s_linear_infinite]"
          style={{ right: "-12px" }}
          viewBox="0 0 40 1200"
          preserveAspectRatio="none"
        >
          <path
            d="M20 0 Q40 150 20 300 T20 600 T20 900 T20 1200 H0 V0 Z"
            fill={color}
            fillOpacity="0.25"
          />
        </svg>
        <svg
          className="absolute h-[200%] [animation:anticard-wave-v-fast_3s_linear_infinite]"
          style={{ right: "-6px" }}
          viewBox="0 0 40 1200"
          preserveAspectRatio="none"
        >
          <path
            d="M20 0 Q0 150 20 300 T20 600 T20 900 T20 1200 H0 V0 Z"
            fill={color}
            fillOpacity="0.35"
          />
        </svg>
        <div
          className="h-full w-full"
          style={{ backgroundColor: color, opacity: 0.12 }}
        />
      </div>
      <style>{`
        @keyframes anticard-wave-v-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes anticard-wave-v-fast {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/**
 * WaveCard — 물결이 차오르는 진행 표시.
 *
 * 진행 중 프로젝트의 진척도를 wave fill로 표현. variant로 카드/프레임 선택,
 * orientation으로 진행 방향(수직/수평) 선택.
 *
 * - variant="frame" (default, anti-card 톤): 헤어라인 + wave (박스 거부)
 * - variant="card" (freeive 기존 자산): rounded-xl + border + bg
 * - orientation="horizontal" (default): 위→아래 채움 (물 채워지는 게이지)
 * - orientation="vertical": 좌→우 채움 (가로 진행 게이지)
 *
 * @example
 *   // 수직 wave (default)
 *   <WaveCard title="anti-card 0.5.0" progress={60} year="2026" />
 *
 *   // 수평 wave — 가로로 긴 카드에 적합
 *   <WaveCard title="릴리즈 진행" progress={45} orientation="vertical" />
 */
export function WaveCard({
  title,
  client,
  summary,
  progress,
  waveColor = "#34d399",
  year,
  variant = "frame",
  label = "In progress",
  orientation = "horizontal",
  className,
  ...props
}: WaveCardProps) {
  return (
    <article
      data-anti-card="wave-card"
      data-variant={variant}
      data-orientation={orientation}
      className={cn(
        "group relative h-[220px] overflow-hidden md:h-[240px]",
        variant === "card" &&
          "rounded-xl border border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.15]",
        variant === "frame" &&
          "border-y border-zinc-200/60 dark:border-white/[0.06]",
        className
      )}
      {...props}
    >
      {orientation === "horizontal" ? (
        <WaveHorizontal progress={progress} color={waveColor} />
      ) : (
        <WaveVertical progress={progress} color={waveColor} />
      )}

      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            {label}
          </span>
          <span className="rounded-full border border-zinc-200 bg-white/60 px-2 py-0.5 text-[11px] text-zinc-600 backdrop-blur dark:border-white/[0.15] dark:bg-zinc-950/60 dark:text-zinc-300">
            {progress}%
          </span>
        </div>

        <div>
          <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 md:text-[18px]">
            {title}
          </h3>
          {summary && (
            <p className="mt-2 line-clamp-2 max-w-[40ch] text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {summary}
            </p>
          )}
          {(client || year) && (
            <p className="mt-3 flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              {client && <span>{client}</span>}
              {client && year && <span aria-hidden>·</span>}
              {year && <span>{year}</span>}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
