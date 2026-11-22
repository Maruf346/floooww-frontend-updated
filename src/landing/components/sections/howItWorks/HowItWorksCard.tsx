import {
  Check,
  ClipboardList,
  Star,
  TrendingUp,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import { cn } from "@/common/utils/cn";
import type { HowItWorksStep, SlideBlock } from "@/landing/data/howItWorks";

const BUTTON =
  "flex items-center justify-center rounded-lg px-4 py-2.5 font-inter-semibold text-[13px] font-semibold whitespace-nowrap cursor-pointer transition-colors";
const PRIMARY_BUTTON = `${BUTTON} bg-[#0d0d10] text-white hover:bg-[#1f1f26] active:bg-[#000000]`;
const SECONDARY_BUTTON = `${BUTTON} bg-subtle text-ink hover:bg-line`;
const BADGE =
  "shrink-0 rounded-full bg-success-bg px-2 py-0.5 font-inter-semibold text-[11px] font-semibold text-success whitespace-nowrap";

function BlockRow({ block }: { block: SlideBlock }) {
  switch (block.kind) {
    case "title":
      return (
        <p className="font-inter-semibold text-[14px] font-semibold text-ink whitespace-nowrap">
          {block.text}
        </p>
      );
    case "row":
      return (
        <div className="flex w-full items-center justify-between text-[13px] py-0.5">
          <p className="text-secondary">{block.label}</p>
          <p
            className={cn(
              "whitespace-nowrap",
              block.strong ? "font-inter-bold font-bold" : "font-inter-medium font-medium",
              block.tone === "success" ? "text-success font-semibold" : "text-ink",
            )}
          >
            {block.value}
          </p>
        </div>
      );
    case "button":
      return <div className={cn(PRIMARY_BUTTON, "w-full mt-1")}>{block.label}</div>;
    case "buttons":
      return (
        <div className="flex w-full gap-2 mt-1">
          <div className={cn(SECONDARY_BUTTON, "flex-1")}>{block.secondary}</div>
          <div className={cn(PRIMARY_BUTTON, "flex-1")}>{block.primary}</div>
        </div>
      );
    case "people":
      return (
        <div className="flex flex-col gap-2.5">
          {block.people.map((person) => (
            <div key={person.name} className="flex w-full items-center gap-2.5">
              <img
                src={person.avatar}
                alt=""
                width={32}
                height={32}
                className="block size-8 shrink-0 rounded-full object-cover"
              />
              <div className="flex min-w-px flex-1 flex-col gap-px whitespace-nowrap">
                <p className="font-inter-semibold text-[13px] font-semibold text-ink">
                  {person.name}
                </p>
                <p className="text-[11px] text-secondary">{person.meta}</p>
              </div>
              <span className={BADGE}>{person.fit}</span>
              <div className="rounded-md bg-[#0d0d10] px-3 py-1 font-inter-semibold text-[12px] font-semibold text-white hover:bg-[#1f1f26] active:bg-[#000000] cursor-pointer transition-colors">
                Invite
              </div>
            </div>
          ))}
        </div>
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
            width={40}
            height={40}
            className="block size-10 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-px flex-1 flex-col gap-0.5 whitespace-nowrap">
            <p className="font-inter-semibold text-[14px] font-semibold text-ink">{block.title}</p>
            <p className="text-[11px] text-secondary">{block.meta}</p>
          </div>
        </div>
      );
    case "stats":
      return (
        <div className="flex w-full items-start gap-2 whitespace-nowrap">
          {block.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-px flex-1 flex-col items-start gap-0.5 rounded-lg bg-subtle p-2.5"
            >
              <p className="font-inter-bold text-[15px] font-bold text-ink">{stat.value}</p>
              <p className="text-[11px] text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      );
    case "success":
      return (
        <div className="flex w-full items-center gap-2.5 rounded-xl bg-success-bg p-3 whitespace-nowrap">
          <p className="font-inter-bold text-[16px] font-bold text-success">✓</p>
          <div className="flex flex-col items-start gap-0.5">
            <p className="font-inter-semibold text-[13px] font-semibold text-ink">{block.title}</p>
            <p className="text-[11px] text-secondary">{block.meta}</p>
          </div>
        </div>
      );
    case "thumb":
      return (
        <div className="flex w-full gap-3 items-center">
          <img
            src={block.image}
            alt=""
            className="block h-[72px] w-[54px] shrink-0 rounded-lg object-cover border border-line"
          />
          <div className="flex min-w-px flex-1 flex-col items-start gap-1">
            <p className="w-full font-inter-semibold text-[13px] font-semibold text-ink truncate">
              {block.title}
            </p>
            <p className="w-full text-[12px] text-secondary">{block.meta}</p>
            {block.note && (
              <p className="w-full font-inter-medium text-[12px] font-medium text-warning">
                {block.note}
              </p>
            )}
            {block.progress && <span className="block h-1.5 w-full rounded-full bg-primary" />}
          </div>
        </div>
      );
    case "info":
      return (
        <div className="flex w-full items-center gap-2 rounded-xl bg-primary-tint px-3 py-2.5 whitespace-nowrap">
          <p className="font-inter-bold text-[14px] font-bold text-primary">✓</p>
          <p className="font-inter-medium text-[12px] font-medium text-ink">{block.text}</p>
        </div>
      );
    case "amount":
      return (
        <p className="font-inter-extrabold text-[32px] font-extrabold text-ink whitespace-nowrap py-1">
          {block.text}
        </p>
      );
  }
}

function getCardHeaderData(step: HowItWorksStep) {
  const firstBlock = step.slide[0];
  let title = step.title;
  let tileContent: React.ReactNode = null;
  let remainingBlocks = step.slide;

  if (firstBlock?.kind === "title") {
    title = firstBlock.text;
    remainingBlocks = step.slide.slice(1);
  } else if (firstBlock?.kind === "entity") {
    title = firstBlock.title;
    tileContent = firstBlock.tile;
    remainingBlocks = step.slide.slice(1);
  } else if (firstBlock?.kind === "avatarEntity") {
    title = firstBlock.title;
    tileContent = (
      <img src={firstBlock.avatar} alt="" className="size-full rounded-md object-cover" />
    );
    remainingBlocks = step.slide.slice(1);
  } else if (firstBlock?.kind === "thumb") {
    title = firstBlock.title;
    // Keep thumb in remaining blocks so thumbnail is shown below header
    remainingBlocks = step.slide;
  }

  if (!tileContent) {
    if (step.id === "brief") tileContent = <ClipboardList size={18} />;
    else if (step.id === "find") tileContent = <Users size={18} />;
    else if (step.id === "approve" || step.id === "drafts") tileContent = <Video size={18} />;
    else if (step.id === "pay" || step.id === "paid") tileContent = <Wallet size={18} />;
    else if (step.id === "results") tileContent = <TrendingUp size={18} />;
    else if (step.id === "pitch") tileContent = <Star size={18} />;
    else tileContent = <Check size={18} />;
  }

  return { title, tileContent, remainingBlocks };
}

/**
 * Dev spec · How it works card:
 * Header: icon tile, title, status badge
 * Body: divider rows
 */
export function HowItWorksCard({ step }: { step: HowItWorksStep }) {
  const { title, tileContent, remainingBlocks } = getCardHeaderData(step);

  return (
    <div className="w-full rounded-[20px] border border-[#e5e7eb] bg-white p-5 shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
      {/* Header: Icon tile, Title, Status badge */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#f0f2f5]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary font-bold text-[13px] overflow-hidden">
            {tileContent}
          </div>
          <p className="truncate font-inter-semibold text-[15px] font-semibold text-ink">
            {title}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-success-bg px-2.5 py-1 text-[11px] font-semibold text-success whitespace-nowrap">
          {step.status}
        </span>
      </div>

      {/* Divider Rows */}
      <div className="flex flex-col divide-y divide-[#f0f2f5]">
        {remainingBlocks.map((block, idx) => (
          <div key={idx} className={idx === 0 ? "pt-3" : "py-2.5"}>
            <BlockRow block={block} />
          </div>
        ))}
      </div>
    </div>
  );
}
