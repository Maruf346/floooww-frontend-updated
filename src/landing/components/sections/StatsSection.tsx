import { CountUp } from "@/common/components/motion/CountUp";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { cn } from "@/common/utils/cn";
import { STATS } from "@/landing/data/stats";

/** Figma "Stats · count-up" (895:2667): counts once when scrolled into view, then stops. */
export function StatsSection() {
  return (
    <section aria-label="Floooww in numbers" className="border-y border-line-subtle bg-white">
      <RevealGroup
        as="dl"
        stagger={0.12}
        amount={0.4}
        className="mx-auto grid w-full max-w-[840px] grid-cols-1 sm:grid-cols-3"
      >
        {STATS.map((stat, index) => (
          <RevealItem
            key={stat.label}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-8 text-center leading-normal sm:py-10",
              index > 0 && "border-t border-line-subtle sm:border-l sm:border-t-0",
            )}
          >
            <dt className="order-2 font-inter-semibold text-[16px] font-semibold text-ink">
              {stat.label}
            </dt>
            <dd className="order-1 font-inter-extrabold text-[40px] font-extrabold tracking-[-0.96px] text-ink tabular-nums sm:text-[48px]">
              <CountUp to={stat.value} suffix={stat.suffix} delay={0.15 + index * 0.15} />
            </dd>
            <dd className="order-3 text-[14px] text-secondary">{stat.caption}</dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
