import * as React from "react";
import { cn } from "../utils/cn";
import { HeroPattern } from "./hero-pattern";
import { PricingTable, type PricingPlan } from "./pricing-table";
import { FAQ, type FAQItem } from "./faq";
import { CTASection, type CTASectionAction } from "./cta-section";
import { Eyebrow } from "./eyebrow";

export interface PricingPatternProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Hero 영역 */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Pricing plans */
  plans: PricingPlan[];
  /** FAQ */
  faq?: FAQItem[];
  /** 페이지 하단 CTA */
  cta?: {
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    lead?: React.ReactNode;
    actions?: CTASectionAction[];
  };
}

/**
 * PricingPattern — 가격 페이지 통째로.
 *
 * Hero + PricingTable + FAQ + CTASection 조합.
 *
 * @example
 *   <PricingPattern
 *     title="간단한 가격."
 *     lead="시작은 무료. 필요할 때 업그레이드."
 *     plans={[...]}
 *     faq={[{ question: "...", answer: "..." }]}
 *     cta={{ title: "시작 준비?", actions: [{ label: "Talk", href: "/talk" }] }}
 *   />
 */
export function PricingPattern({
  eyebrow,
  title,
  lead,
  plans,
  faq,
  cta,
  className,
  ...props
}: PricingPatternProps) {
  return (
    <div data-anti-card="pricing-pattern" className={cn(className)} {...props}>
      <HeroPattern
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        align="center"
        padding="tight"
      />

      <section className="mt-4">
        <PricingTable plans={plans} />
      </section>

      {faq && faq.length > 0 && (
        <section className="mt-20 border-t border-zinc-200 pt-16 dark:border-white/[0.06]">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,1.875rem)] font-semibold tracking-[-0.015em] text-zinc-900 dark:text-zinc-50">
            자주 묻는 질문.
          </h2>
          <div className="mt-8">
            <FAQ items={faq} />
          </div>
        </section>
      )}

      {cta && (
        <CTASection
          eyebrow={cta.eyebrow}
          title={cta.title}
          lead={cta.lead}
          actions={cta.actions}
        />
      )}
    </div>
  );
}
