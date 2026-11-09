import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/common/constants/motion";
import { cn } from "@/common/utils/cn";
import type { HowItWorksStep } from "@/landing/data/howItWorks";
import { HowItWorksSlide } from "./HowItWorksSlide";

export const MEDIA_WIDTH = 544;
export const MEDIA_HEIGHT = 636;

/* Deck geometry from Figma "Slider": the active card is centred on y = 308 and
 * queued cards peek 16 px above it at 90 %, fading out; done cards drop away bottom-left. */
const DECK_CENTER = 308;
const QUEUE_OPACITY = [1, 0.45, 0.2, 0, 0];

function cardTarget(offset: number) {
  if (offset < 0) return { x: -81, y: 560, scale: 0.9, rotate: 10, opacity: 0 };
  return {
    x: 0,
    y: -16 * offset,
    scale: offset === 0 ? 1 : 0.9,
    rotate: 0,
    opacity: QUEUE_OPACITY[offset] ?? 0,
  };
}

function StatusPill({
  step,
  index,
  count,
}: {
  step: HowItWorksStep;
  index: number;
  count: number;
}) {
  return (
    <div className="absolute left-1/2 top-[567px] flex -translate-x-1/2 items-center gap-2.5 rounded-full border-[1.5px] border-white/60 bg-[rgba(7,11,19,0.88)] px-2.5 py-2 leading-normal">
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[11px] bg-primary font-inter-bold text-[11px] font-bold text-white">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {index + 1}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="flex items-center gap-[3px]">
        {Array.from({ length: count }, (_, dot) => (
          <motion.span
            key={dot}
            className="block h-[5px] rounded-[3px]"
            animate={{
              width: dot === index ? 16 : 5,
              backgroundColor: dot === index ? "#ffffff" : "rgba(255,255,255,0.35)",
            }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          />
        ))}
      </span>
      <motion.span
        layout
        className="relative overflow-hidden font-inter-semibold text-[12px] font-semibold text-white whitespace-nowrap"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={step.status}
            className="block"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {step.status}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[11px] bg-success font-inter-bold text-[11px] font-bold text-white">
        ✓
      </span>
    </div>
  );
}

interface HowItWorksMediaProps {
  steps: HowItWorksStep[];
  index: number;
  /** Changes when the audience switches so the deck re-deals instead of morphing. */
  deckKey: string;
}

/** The 544 × 636 photo card with the glass deck, intro line and status pill (Figma "Media"). */
export function HowItWorksMedia({ steps, index, deckKey }: HowItWorksMediaProps) {
  const step = steps[index] ?? steps[0];
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeHeight, setActiveHeight] = useState(242);

  useLayoutEffect(() => {
    const element = cardRefs.current[index];
    if (!element) return;
    const update = () => setActiveHeight(element.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [index, deckKey]);

  if (!step) return null;

  return (
    <div
      className="relative overflow-hidden rounded-[28px]"
      style={{ width: MEDIA_WIDTH, height: MEDIA_HEIGHT }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={step.media}
          src={step.media}
          alt=""
          className="absolute inset-0 size-full max-w-none rounded-[28px] object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.9, ease: "easeOut" },
            scale: { duration: 1.6, ease: EASE_OUT },
          }}
        />
      </AnimatePresence>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5, 8, 15, 0.62) 0%, rgba(5, 8, 15, 0.18) 35%, rgba(5, 8, 15, 0.12) 70%, rgba(5, 8, 15, 0.55) 100%)",
        }}
      />

      <motion.div
        key={deckKey}
        className="absolute left-[72px] top-0 w-[400px]"
        initial={{ opacity: 0, y: DECK_CENTER - activeHeight / 2 + 24 }}
        animate={{ opacity: 1, y: DECK_CENTER - activeHeight / 2 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        {steps.map((card, cardIndex) => {
          const offset = cardIndex - index;
          return (
            <motion.div
              key={card.id}
              className="absolute left-0 top-0"
              style={{
                transformOrigin: "50% 0%",
                zIndex: 20 - Math.abs(offset) * 2 + (offset < 0 ? -10 : 0),
              }}
              initial={false}
              animate={cardTarget(offset)}
              transition={{ duration: 0.85, ease: EASE_OUT }}
              aria-hidden={offset !== 0}
            >
              <HowItWorksSlide
                ref={(element) => {
                  cardRefs.current[cardIndex] = element;
                }}
                blocks={card.slide}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute left-[72px] top-14 w-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${deckKey}-${step.id}`}
            className={cn(
              "font-inter-semibold text-[17px] font-semibold leading-[26px] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {step.intro.map((run, runIndex) => (
              <span
                key={runIndex}
                className={
                  run.tone === "sky"
                    ? "text-highlight-sky"
                    : run.tone === "amber"
                      ? "text-highlight-amber"
                      : undefined
                }
              >
                {run.text}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>
      </div>

      <StatusPill step={step} index={index} count={steps.length} />
    </div>
  );
}
