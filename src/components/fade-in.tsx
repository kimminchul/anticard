"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 등장 방향. up=아래에서 위로 (기본) / none=opacity만 */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** 시작 transform 거리 px. 기본 16 */
  distance?: number;
  /** 등장 지연 ms */
  delay?: number;
  /** 트랜지션 길이 ms. 기본 700 */
  duration?: number;
  /** 한 번만 등장 (기본 true). false면 매번 in/out */
  once?: boolean;
  /** Intersection threshold (0~1). 기본 0.15 */
  threshold?: number;
}

/**
 * FadeIn — 스크롤 시 부드러운 등장.
 *
 * Intersection Observer로 in-view 감지 → opacity + translate transition.
 * 기본 한 번만 (once=true). prefers-reduced-motion 자동 반응.
 *
 * @example
 *   <FadeIn>
 *     <SectionHeading>늦게 등장하는 섹션</SectionHeading>
 *   </FadeIn>
 */
export function FadeIn({
  direction = "up",
  distance = 16,
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.15,
  className,
  style,
  children,
  ...props
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const initialTransform = (() => {
    if (direction === "none") return "none";
    if (direction === "up") return `translate3d(0, ${distance}px, 0)`;
    if (direction === "down") return `translate3d(0, -${distance}px, 0)`;
    if (direction === "left") return `translate3d(${distance}px, 0, 0)`;
    if (direction === "right") return `translate3d(-${distance}px, 0, 0)`;
    return "none";
  })();

  return (
    <div
      ref={ref}
      data-anti-card="fade-in"
      data-visible={visible || undefined}
      className={cn("motion-reduce:opacity-100 motion-reduce:transform-none", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : initialTransform,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
