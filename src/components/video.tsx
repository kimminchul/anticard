import * as React from "react";
import { cn } from "../utils/cn";

export interface VideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** 캡션. figure + figcaption으로 자동 감쌈 */
  caption?: React.ReactNode;
  /** 종횡비. 기본 16/9 */
  ratio?: "16/9" | "4/3" | "1/1" | "21/9";
  /** figure 외곽 className */
  figureClassName?: string;
}

/**
 * Video — 본문 비디오 + caption.
 *
 * 기본 controls=true. ratio로 종횡비 강제 (모바일 대응).
 *
 * @example
 *   <Video src="/demo.mp4" poster="/demo.jpg" caption="손가락 그림 그리기 데모" />
 */
export function Video({
  caption,
  ratio = "16/9",
  figureClassName,
  className,
  controls = true,
  ...props
}: VideoProps) {
  const ratioClass: Record<NonNullable<VideoProps["ratio"]>, string> = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
  };
  return (
    <figure
      data-anti-card="video"
      className={cn("my-8", figureClassName)}
    >
      <div
        className={cn(
          "overflow-hidden rounded-md bg-zinc-900 dark:bg-black",
          ratioClass[ratio]
        )}
      >
        <video
          controls={controls}
          className={cn("block h-full w-full object-cover", className)}
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
