import * as React from "react";
import { cn } from "../utils/cn";
import { LinkRow } from "./link-row";
import { Button } from "./button";

export interface PricingPlan {
  /** 플랜 이름 (Free, Pro, Team 등) */
  name: React.ReactNode;
  /** 가격 (예: "₩0", "$29 / mo", "Custom") */
  price: React.ReactNode;
  /** 가격 보조 (예: "월간 청구", "VAT 별도") */
  priceHint?: React.ReactNode;
  /** 한 줄 설명 */
  tagline?: React.ReactNode;
  /** feature list */
  features: React.ReactNode[];
  /** CTA */
  cta?: {
    label: React.ReactNode;
    href?: string;
    /** href 없으면 button 액션 (variant=primary) — onClick 사용자가 attach */
    onClick?: () => void;
    tone?: "default" | "accent";
  };
  /** 추천 플랜 표시 — 살짝 강조 */
  highlighted?: boolean;
}

export interface PricingTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[];
}

/**
 * PricingTable — 가격 plan 비교.
 *
 * 일반적으로 카드 그리드인 영역. anti-card에서는 카드 박스 최소화 — 헤어라인 grid + highlighted plan만 살짝 강조.
 *
 * @example
 *   <PricingTable plans={[
 *     { name: "Free", price: "₩0", features: ["기본 기능"] },
 *     { name: "Pro", price: "₩9,900", features: ["...", "..."], highlighted: true,
 *       cta: { label: "시작하기", href: "/signup", tone: "accent" } },
 *   ]} />
 */
export function PricingTable({ plans, className, ...props }: PricingTableProps) {
  return (
    <div
      data-anti-card="pricing-table"
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-white/[0.06] dark:bg-white/[0.06]",
        className
      )}
      {...props}
    >
      {plans.map((plan, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col gap-6 bg-white p-7 dark:bg-zinc-950 md:p-8",
            plan.highlighted && "bg-emerald-50/50 dark:bg-emerald-500/[0.04]"
          )}
        >
          <div>
            <p
              className={cn(
                "text-[12px] uppercase tracking-[0.08em]",
                plan.highlighted
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              {plan.name}
            </p>
            <p className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-50">
              {plan.price}
            </p>
            {plan.priceHint && (
              <p className="mt-2 text-[12.5px] text-zinc-500 dark:text-zinc-400">
                {plan.priceHint}
              </p>
            )}
            {plan.tagline && (
              <p className="mt-4 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                {plan.tagline}
              </p>
            )}
          </div>

          <ul className="flex-1 space-y-3 border-t border-zinc-200 pt-6 dark:border-white/[0.06]">
            {plan.features.map((feature, j) => (
              <li
                key={j}
                className="flex gap-3 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                <span
                  aria-hidden
                  className="shrink-0 text-emerald-600 dark:text-emerald-400"
                >
                  ✓
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {plan.cta && (
            <div className="pt-2">
              {plan.cta.href ? (
                <LinkRow
                  href={plan.cta.href}
                  tone={plan.cta.tone ?? (plan.highlighted ? "accent" : "default")}
                >
                  {plan.cta.label}
                </LinkRow>
              ) : (
                <Button
                  variant="primary"
                  tone={plan.cta.tone ?? (plan.highlighted ? "accent" : "default")}
                  onClick={plan.cta.onClick}
                >
                  {plan.cta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
