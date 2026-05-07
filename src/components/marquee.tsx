import * as React from "react";
import { cn } from "../utils/cn";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 흐르는 방향. left(우→좌, 기본) / right(좌→우) */
  direction?: "left" | "right";
  /** 속도 — 한 사이클 시간 (초). 기본 30. 작을수록 빠름 */
  duration?: number;
  /** 일시정지 hover시 (기본 true) */
  pauseOnHover?: boolean;
  /** 항목 사이 간격 (px). 기본 48 */
  gap?: number;
  /** 헤어라인 위/아래 표시 */
  divider?: boolean;
}

/**
 * Marquee — 끊김 없이 흐르는 띠.
 *
 * 클라이언트 로고 띠, 알림 영역, 데모 미리보기 등.
 * children을 2회 복제해 끊김 없는 무한 스크롤.
 * prefers-reduced-motion 자동 멈춤.
 *
 * @example
 *   <Marquee>
 *     <span>EBS</span>
 *     <span>라이나</span>
 *     <span>롯데카드</span>
 *   </Marquee>
 */
export function Marquee({
  direction = "left",
  duration = 30,
  pauseOnHover = true,
  gap = 48,
  divider = false,
  className,
  children,
  style,
  ...props
}: MarqueeProps) {
  const animationName =
    direction === "left" ? "anticard-marquee-left" : "anticard-marquee-right";
  return (
    <div
      data-anti-card="marquee"
      data-direction={direction}
      className={cn(
        "group relative w-full overflow-hidden",
        divider && "border-y border-zinc-200/60 py-4 dark:border-white/[0.06]",
        "motion-reduce:[&>div]:animate-none",
        className
      )}
      style={style}
      {...props}
    >
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          style={{ gap: `${gap}px` }}
          aria-hidden
        >
          {children}
        </div>
      </div>
      <style>{`
        @keyframes anticard-marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - ${gap / 2}px)); }
        }
        @keyframes anticard-marquee-right {
          0% { transform: translateX(calc(-50% - ${gap / 2}px)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
