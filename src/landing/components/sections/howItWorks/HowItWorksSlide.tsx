import { forwardRef } from "react";
import { cn } from "@/common/utils/cn";
import type { SlideBlock } from "@/landing/data/howItWorks";

const BUTTON =
  "flex items-center justify-center rounded-md px-3.5 py-[9px] font-inter-semibold text-[13px] font-semibold whitespace-nowrap";
const PRIMARY_BUTTON = `${BUTTON} bg-primary text-white`;
const SECONDARY_BUTTON = `${BUTTON} bg-subtle text-ink`;
const BADGE =
  "shrink-0 rounded-full bg-success-bg px-2 py-[3px] font-inter-semibold text-[11px] font-semibold text-success whitespace-nowrap";

function Block({ block }: { block: SlideBlock }) {
  switch (block.kind) {
    case "title":
      return (
        <p className="font-inter-semibold text-[15px] font-semibold text-ink whitespace-nowrap">
          {block.text}
        </p>
      );
    case "row":
      return (
        <div className="flex w-full items-start text-[13px]">
          <p className="min-w-px flex-1 text-secondary">{block.label}</p>
          <p
            className={cn(
              "whitespace-nowrap",
              block.strong ? "font-inter-bold font-bold" : "font-inter-semibold font-semibold",
              block.tone === "success" ? "text-success" : "text-ink",
            )}
          >
            {block.value}
          </p>
        </div>
      );
    case "button":
      return <div className={cn(PRIMARY_BUTTON, "w-full")}>{block.label}</div>;
    case "buttons":
      return (
        <div className="flex w-full gap-2">
          <div className={cn(SECONDARY_BUTTON, "min-w-px flex-1")}>{block.secondary}</div>
          <div className={cn(PRIMARY_BUTTON, "min-w-px flex-1")}>{block.primary}</div>
        </div>
      );
    case "people":
      return (
        <>
          {block.people.map((person) => (
            <div key={person.name} className="flex w-full items-center gap-2.5">
              <img
                src={person.avatar}
                alt=""
                width={32}
                height={32}
                className="block size-8 shrink-0 max-w-none"
              />
              <div className="flex min-w-px flex-1 flex-col gap-px whitespace-nowrap">
                <p className="font-inter-semibold text-[13px] font-semibold text-ink">
                  {person.name}
                </p>
                <p className="text-[11px] text-secondary">{person.meta}</p>
              </div>
              <span className={BADGE}>{person.fit}</span>
              <div className={PRIMARY_BUTTON}>Invite</div>
            </div>
          ))}
        </>
      );
    case "entity":
      return (
        <div className="flex w-full items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary font-inter-bold text-[12px] font-bold text-white">
            {block.tile}
          </span>
          <div className="flex min-w-px flex-1 flex-col gap-px whitespace-nowrap">
            <p className="font-inter-semibold text-[14px] font-semibold text-ink">{block.title}</p>
            <p className="text-[11px] text-secondary">{block.meta}</p>
          </div>
          {block.badge && <span className={BADGE}>{block.badge}</span>}
        </div>
      );
    case "avatarEntity":
      return (
        <div className="flex w-full items-center gap-3">
          <img
            src={block.avatar}
            alt=""
            width={44}
            height={44}
            className="block size-11 shrink-0 max-w-none"
          />
          <div className="flex min-w-px flex-1 flex-col gap-0.5 whitespace-nowrap">
            <p className="font-inter-semibold text-[14px] font-semibold text-ink">{block.title}</p>
            <p className="text-[11px] text-secondary">{block.meta}</p>
          </div>
        </div>
      );
    case "stats":
      return (
        <div className="flex w-full items-start gap-2.5 whitespace-nowrap">
          {block.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-px flex-1 flex-col items-start gap-0.5 rounded-md bg-subtle p-2.5"
            >
              <p className="font-inter-bold text-[16px] font-bold text-ink">{stat.value}</p>
              <p className="text-[11px] text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      );
    case "success":
      return (
        <div className="flex w-full items-center gap-2.5 rounded-[10px] bg-success-bg p-3 whitespace-nowrap">
          <p className="font-inter-bold text-[16px] font-bold text-success">✓</p>
          <div className="flex flex-col items-start gap-0.5">
            <p className="font-inter-semibold text-[13px] font-semibold text-ink">{block.title}</p>
            <p className="text-[11px] text-secondary">{block.meta}</p>
          </div>
        </div>
      );
    case "thumb":
      return (
        <div className={cn("flex w-full gap-3", block.compact ? "items-center" : "items-start")}>
          <img
            src={block.image}
            alt=""
            className={cn(
              "block shrink-0 rounded-md object-cover",
              block.compact ? "h-[72px] w-[54px]" : "h-24 w-[72px]",
            )}
          />
          <div className="flex min-w-px flex-1 flex-col items-start gap-1">
            <p className="w-full font-inter-semibold text-[14px] font-semibold text-ink">
              {block.title}
            </p>
            <p className="w-full text-[12px] text-secondary">{block.meta}</p>
            {block.note && (
              <p className="w-full font-inter-medium text-[12px] font-medium text-warning">
                {block.note}
              </p>
            )}
            {block.progress && <span className="block h-1.5 w-[260px] rounded-[3px] bg-primary" />}
          </div>
        </div>
      );
    case "info":
      return (
        <div className="flex w-full items-center gap-2 rounded-[10px] bg-primary-tint px-3 py-2.5 whitespace-nowrap">
          <p className="font-inter-bold text-[14px] font-bold text-primary">✓</p>
          <p className="font-inter-medium text-[12px] font-medium text-ink">{block.text}</p>
        </div>
      );
    case "amount":
      return (
        <p className="font-inter-extrabold text-[34px] font-extrabold text-ink whitespace-nowrap">
          {block.text}
        </p>
      );
  }
}

/** Frosted glass card in the How it works media deck (active size; queued cards are scaled 0.9). */
export const HowItWorksSlide = forwardRef<
  HTMLDivElement,
  { blocks: SlideBlock[]; className?: string }
>(function HowItWorksSlide({ blocks, className }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-[400px] flex-col items-start gap-3 rounded-xl border border-white/70 bg-white/90 p-[18px] leading-normal shadow-[0_24px_48px_0_rgba(5,10,31,0.3)] backdrop-blur-[12px]",
        className,
      )}
    >
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
});
