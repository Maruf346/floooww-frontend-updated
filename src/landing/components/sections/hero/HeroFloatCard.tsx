import { cn } from "@/common/utils/cn";
import type { HeroFloat } from "@/landing/data/hero";
import { ASSETS } from "@/common/constants/assets";

const CARD = "bg-white rounded-float shadow-float leading-normal whitespace-nowrap";

/** Visual content of a single floating hero card (Figma 895:2524 children). */
export function HeroFloatCard({ item, className }: { item: HeroFloat; className?: string }) {
  switch (item.kind) {
    case "match":
      return (
        <div className={cn(CARD, "flex items-center gap-2.5 px-3 py-2.5", className)}>
          <img
            src={ASSETS.hero.liveDot}
            alt=""
            width={8}
            height={8}
            className="block size-2 max-w-none"
          />
          <p className="font-inter-semibold text-[12px] font-semibold text-ink">{item.label}</p>
          <span className="rounded-full bg-primary-tint px-2 py-0.5 font-inter-semibold text-[12px] font-semibold text-primary">
            {item.score}
          </span>
        </div>
      );
    case "creator":
      return (
        <div className={cn(CARD, "flex items-center gap-2.5 px-3 py-2.5", className)}>
          <img
            src={item.avatar}
            alt=""
            width={36}
            height={36}
            className="block size-9 max-w-none"
          />
          <div className="flex flex-col gap-0.5">
            <p className="font-inter-semibold text-[13px] font-semibold text-ink">{item.name}</p>
            <p className="text-[11px] text-secondary">{item.meta}</p>
          </div>
          <p className="font-inter-semibold text-[12px] font-semibold text-ink">{item.score}</p>
        </div>
      );
    case "growth":
      return (
        <div className={cn(CARD, "flex flex-col items-start gap-1 px-4 py-3.5", className)}>
          <p className="font-inter-semibold text-[10px] font-semibold tracking-[0.6px] text-secondary">
            {item.label}
          </p>
          <p className="font-inter-bold text-[28px] font-bold text-ink">{item.value}</p>
          <p className="font-inter-semibold text-[12px] font-semibold text-success">{item.delta}</p>
        </div>
      );
    case "platform":
      return (
        <div className={cn(CARD, "flex flex-col items-center gap-1.5 px-3.5 py-3", className)}>
          <img
            src={item.icon}
            alt=""
            width={26}
            height={26}
            className="block size-[26px] max-w-none"
          />
          <p className="font-inter-medium text-[11px] font-medium text-caption">{item.name}</p>
        </div>
      );
  }
}
