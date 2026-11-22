import { AnimatePresence, motion } from "motion/react";
import type { HowItWorksStep } from "@/landing/data/howItWorks";
import { HowItWorksCard } from "./HowItWorksCard";

export const MEDIA_WIDTH = 544;
export const MEDIA_HEIGHT = 636;

interface HowItWorksMediaProps {
  steps: HowItWorksStep[];
  index: number;
  deckKey: string;
}

/**
 * Figma "How it works · panel":
 * (1) One near-black panel on the right.
 * (2) ONE card per step, nothing behind it.
 * (3) The brief line sits in a pill at the top of the panel; progress bar at the bottom.
 * (4) Cards have a header (icon tile, title, status badge) and divider rows.
 * (6) Scroll down = next step, scroll up = previous; the old card finishes leaving before the new one arrives.
 */
export function HowItWorksMedia({ steps, index, deckKey }: HowItWorksMediaProps) {
  const step = steps[index] ?? steps[0];

  if (!step) return null;

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#070b13] shadow-[0_24px_50px_rgba(0,0,0,0.3)]"
      style={{ width: MEDIA_WIDTH, height: MEDIA_HEIGHT }}
    >
      {/* (3) Top: The brief line sits in a pill at the top of the panel */}
      <div className="flex w-full justify-center px-6 pt-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${deckKey}-${step.id}-intro`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[12px] sm:text-[13px] leading-snug text-white/90 backdrop-blur-md shadow-sm text-center"
          >
            {step.intro.map((run, i) => (
              <span
                key={i}
                className={
                  run.tone === "sky"
                    ? "font-semibold text-[#38bdf8]"
                    : run.tone === "amber"
                      ? "font-semibold text-[#fbbf24]"
                      : "text-white/85"
                }
              >
                {run.text}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* (2) & (6) Center: ONE card per step, nothing behind it. Old card finishes leaving before new arrives */}
      <div className="flex flex-1 items-center justify-center px-6 py-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${deckKey}-${step.id}-card`}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px]"
          >
            <HowItWorksCard step={step} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* (3) Bottom: Progress bar at the bottom */}
      <div className="w-full px-8 pb-6 pt-2 z-10">
        <div className="flex items-center gap-2">
          {Array.from({ length: steps.length }, (_, dot) => {
            const isDone = dot <= index;
            return (
              <div
                key={dot}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20"
              >
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={false}
                  animate={{ scaleX: isDone ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
