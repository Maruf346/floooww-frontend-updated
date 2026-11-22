import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ASSETS } from "@/common/constants/assets";
import { EASE_OUT } from "@/common/constants/motion";
import { cn } from "@/common/utils/cn";
import { WHY_SCENES } from "@/landing/data/whyFloooww";

export const WHY_CARD_WIDTH = 600;
export const WHY_CARD_HEIGHT = 480;

/* Shared panel (Figma "Panel"): 482.383 × 350 at (59, 80) inside the 600 × 480 card. */
function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-[59px] top-[80px] flex h-[350px] w-[482.383px] flex-col items-start gap-[17.772px] rounded-[20px] bg-white p-[25.389px] leading-normal",
        "drop-shadow-[0px_24px_30px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function LivePill({ text, dot }: { text: string; dot: string }) {
  return (
    <motion.div
      className="absolute right-[34px] top-5 flex items-center gap-2 rounded-full border border-primary-muted bg-white py-2.5 pl-3 pr-4 leading-normal shadow-[0_6px_16px_0_rgba(8,13,38,0.08)]"
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
    >
      <span className="relative size-2.5 shrink-0">
        <motion.span
          className="absolute inset-[-40%]"
          animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={dot} alt="" className="block size-full max-w-none" />
        </motion.span>
      </span>
      <p className="font-inter-semibold text-[13px] font-semibold text-ink whitespace-nowrap">
        {text}
      </p>
    </motion.div>
  );
}

/** Row items rise in one after another once the scene mounts. */
function Rise({
  children,
  order,
  className,
}: {
  children: ReactNode;
  order: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("w-full", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12 + order * 0.07, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

const DIVIDER = <div className="h-[1.269px] w-full shrink-0 bg-muted" />;

function MatchingScene() {
  const scene = WHY_SCENES.matching;
  return (
    <>
      <Panel>
        <Rise order={0} className="flex items-center gap-[12.694px]">
          <img
            src={ASSETS.why.avatarMeera}
            alt=""
            width={55.855}
            height={55.855}
            className="block size-[55.855px] shrink-0 max-w-none"
          />
          <div className="flex flex-col items-start gap-[2.539px] whitespace-nowrap">
            <p className="font-inter-semibold text-[20.311px] font-semibold text-ink">
              {scene.name}
            </p>
            <p className="text-[16.503px] text-neutral">{scene.handle}</p>
          </div>
          <div className="min-w-px flex-1" />
          <div className="flex flex-col items-end whitespace-nowrap">
            <p className="font-inter-bold text-[27.927px] font-bold tracking-[-0.5585px] text-primary">
              {scene.score}
            </p>
            <p className="font-inter-medium text-[13.964px] font-medium text-tertiary">
              {scene.scoreLabel}
            </p>
          </div>
        </Rise>
        {DIVIDER}
        <Rise order={1}>
          <p className="font-inter-semibold text-[13.964px] font-semibold tracking-[1.3964px] text-tertiary">
            {scene.reasonsTitle}
          </p>
        </Rise>
        {scene.reasons.map((reason, index) => (
          <Rise key={reason} order={2 + index} className="flex items-center gap-[12.694px]">
            <img
              src={ASSETS.why.checks[index]}
              alt=""
              width={22.85}
              height={22.85}
              className="block size-[22.85px] shrink-0 max-w-none"
            />
            <p className="text-[17.772px] text-ink whitespace-nowrap">{reason}</p>
          </Rise>
        ))}
      </Panel>
      <LivePill text={scene.live} dot={ASSETS.why.liveDotGreen} />
    </>
  );
}

function WorkflowScene() {
  const scene = WHY_SCENES.workflow;
  return (
    <>
      <Panel className="!gap-[13.772px] border-[0.903px]">
        <Rise order={0} className="flex items-center gap-[12.694px]">
          <div className="flex flex-col items-start gap-[2.539px] whitespace-nowrap">
            <p className="font-inter-semibold text-[20.311px] font-semibold text-ink">
              {scene.title}
            </p>
            <p className="text-[16.503px] text-neutral">{scene.subtitle}</p>
          </div>
          <div className="min-w-px flex-1" />
          <span className="rounded-[7.617px] bg-warning-bg px-[12.694px] py-[5.078px] font-inter-semibold text-[15.233px] font-semibold text-warning whitespace-nowrap">
            {scene.status}
          </span>
        </Rise>
        {DIVIDER}
        {scene.rows.map((row, index) => (
          <Rise
            key={row.label}
            order={1 + index}
            className="flex items-center gap-[12.694px] whitespace-nowrap"
          >
            <p className="text-[17.772px] text-neutral">{row.label}</p>
            <div className="min-w-px flex-1" />
            <p className="font-inter-medium text-[17.772px] font-medium text-ink">{row.value}</p>
          </Rise>
        ))}
        <Rise order={4} className="flex items-center gap-[12.694px] whitespace-nowrap">
          <p className="text-[17.772px] text-ink">{scene.toggle}</p>
          <div className="min-w-px flex-1" />
          <img
            src={ASSETS.why.toggleOn}
            alt=""
            width={48.238}
            height={27.927}
            className="block h-[27.927px] w-[48.238px] shrink-0 max-w-none"
          />
        </Rise>
        <Rise order={5}>
          <div className="flex w-full items-center justify-center rounded-[12.694px] bg-primary py-[15.233px]">
            <p className="font-inter-semibold text-[17.772px] font-semibold text-white whitespace-nowrap">
              {scene.cta}
            </p>
          </div>
        </Rise>
      </Panel>
      <LivePill text={scene.live} dot={ASSETS.why.liveDotBlue} />
    </>
  );
}

const MONTH_BAR: Record<"done" | "current" | "upcoming", string> = {
  done: "bg-primary",
  current: "bg-primary-soft",
  upcoming: "bg-muted",
};

function EscrowScene() {
  const scene = WHY_SCENES.escrow;
  return (
    <>
      <Panel className="border-[0.804px]">
        <Rise order={0} className="flex items-center">
          <div className="flex flex-col items-start gap-[2.539px] whitespace-nowrap">
            <p className="font-inter-semibold text-[20.311px] font-semibold text-ink">
              {scene.title}
            </p>
            <p className="text-[16.503px] text-neutral">{scene.subtitle}</p>
          </div>
        </Rise>
        <div className="flex w-full items-center gap-[7.617px]">
          {scene.months.map((month, index) => (
            <div
              key={month.label}
              className="flex min-w-px flex-1 flex-col items-start gap-[7.617px]"
            >
              <span className="relative block h-[7.617px] w-full overflow-hidden rounded-[3.808px] bg-muted">
                <motion.span
                  className={cn(
                    "absolute inset-0 origin-left rounded-[3.808px]",
                    MONTH_BAR[month.state],
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.09, ease: EASE_OUT }}
                />
              </span>
              <p
                className={cn(
                  "font-inter-medium text-[13.964px] font-medium whitespace-nowrap",
                  month.state === "upcoming" ? "text-tertiary" : "text-ink",
                )}
              >
                {month.label}
              </p>
            </div>
          ))}
        </div>
        {DIVIDER}
        <Rise order={3} className="flex items-center gap-[12.694px]">
          <span className="flex size-[40.622px] shrink-0 items-center justify-center rounded-[10.155px] bg-success-bg font-inter-bold text-[19.041px] font-bold text-success">
            ₹
          </span>
          <div className="flex flex-col items-start gap-[2.539px] whitespace-nowrap">
            <p className="font-inter-semibold text-[19.041px] font-semibold text-ink">
              {scene.escrowTitle}
            </p>
            <p className="text-[16.503px] text-neutral">{scene.escrowBody}</p>
          </div>
        </Rise>
      </Panel>
      <LivePill text={scene.live} dot={ASSETS.why.liveDotBlue} />
    </>
  );
}

function AnalyticsScene() {
  const scene = WHY_SCENES.analytics;
  const chartHeight = 91.399;
  return (
    <>
      <Panel className="border-[0.741px]">
        <Rise order={0} className="flex items-center gap-[12.694px]">
          <div className="flex flex-col items-start gap-[2.539px] whitespace-nowrap">
            <p className="font-inter-semibold text-[13.964px] font-semibold tracking-[1.1171px] text-tertiary">
              {scene.label}
            </p>
            <p className="font-inter-bold text-[35.544px] font-bold tracking-[-0.7109px] text-ink">
              {scene.value}
            </p>
          </div>
          <div className="min-w-px flex-1" />
          <span className="rounded-[7.617px] bg-success-bg px-[10.155px] py-[5.078px] font-inter-semibold text-[15.233px] font-semibold text-success whitespace-nowrap">
            {scene.delta}
          </span>
        </Rise>
        <div className="relative w-full shrink-0" style={{ height: chartHeight }}>
          {scene.bars.map((height, index) => {
            const last = index === scene.bars.length - 1;
            return (
              <motion.span
                key={index}
                className={cn(
                  "absolute bottom-0 block w-[22.85px] origin-bottom rounded-[3.808px]",
                  last ? "bg-primary" : "bg-primary-muted",
                )}
                style={{ left: index * 33.005, height }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.05, ease: EASE_OUT }}
              />
            );
          })}
        </div>
        {DIVIDER}
        <Rise order={3} className="flex items-center gap-[12.694px] whitespace-nowrap">
          <p className="font-inter-medium text-[17.772px] font-medium text-ink">{scene.orders}</p>
          <div className="min-w-px flex-1" />
          <p className="text-[16.503px] text-neutral">{scene.attribution}</p>
        </Rise>
      </Panel>
      <LivePill text={scene.live} dot={ASSETS.why.liveDotGreen} />
    </>
  );
}

const SCENES = [MatchingScene, WorkflowScene, EscrowScene, AnalyticsScene];

/** The 600 × 480 near-black panel (Figma "Card") with one product card scene and progress bar. */
export function WhyCard({ index }: { index: number }) {
  const Scene = SCENES[index] ?? MatchingScene;
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-[#edeff3] bg-[#0d0d10]"
      style={{
        width: WHY_CARD_WIDTH,
        height: WHY_CARD_HEIGHT,
      }}
    >
      {/* (2) Show only the current feature's card; the four scenes must not be stacked behind each other */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className="absolute left-0 top-0 h-[440px] w-[600px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            y: -16,
            transition: { duration: 0.15, ease: [0.7, 0, 0.84, 0] },
          }}
        >
          <Scene />
        </motion.div>
      </AnimatePresence>

      {/* (3) Progress bar (4 parts) at the bottom of the panel */}
      <div
        className="absolute bottom-[22px] left-[218px] flex items-center gap-2"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={4}
      >
        {Array.from({ length: 4 }, (_, i) => {
          const active = i === index;
          const visited = i < index;
          return (
            <motion.div
              key={i}
              className="h-1 rounded-[2px]"
              animate={{
                width: active ? 56 : 28,
                backgroundColor: active
                  ? "#ffffff"
                  : visited
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(255, 255, 255, 0.18)",
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          );
        })}
      </div>
    </div>
  );
}
