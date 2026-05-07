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
}

function Wave({ progress, color }: { progress: number; color: string }) {
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
          className="absolute w-[200%] [animation:anticard-wave-slow_4s_linear_infinite]"
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
          className="absolute w-[200%] [animation:anticard-wave-fast_3s_linear_infinite]"
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
        @keyframes anticard-wave-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes anticard-wave-fast {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/**
 * WaveCard — 물결이 차오르는 진행 표시.
 *
 * 진행 중 프로젝트의 진척도를 wave fill로 표현. variant로 카드/프레임 선택.
 * - frame (default, anti-card 톤): 헤어라인 + wave (박스 거부)
 * - card (freeive 기존 자산): rounded-xl + border + bg
 *
 * @example
 *   <WaveCard
 *     title="anti-card 0.5.0"
 *     client="Freeive"
 *     summary="P4 인터랙션 5개 작업 중."
 *     progress={60}
 *     waveColor="#7cf2c4"
 *     year="2026"
 *   />
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
  className,
  ...props
}: WaveCardProps) {
  return (
    <article
      data-anti-card="wave-card"
      data-variant={variant}
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
      <Wave progress={progress} color={waveColor} />

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
