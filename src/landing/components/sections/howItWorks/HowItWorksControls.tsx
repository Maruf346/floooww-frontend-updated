import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/common/utils/cn";
import { HOW_IT_WORKS_COPY, type Audience, type HowItWorksStep } from "@/landing/data/howItWorks";

export function AudienceToggle({
  value,
  onChange,
}: {
  value: Audience;
  onChange: (value: Audience) => void;
}) {
  return (
    <LayoutGroup id="hiw-audience">
      <div
        role="tablist"
        aria-label="Audience"
        className="flex items-start gap-1 rounded-full bg-subtle p-1"
      >
        {HOW_IT_WORKS_COPY.audiences.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 font-inter-semibold text-[12px] font-semibold leading-normal whitespace-nowrap transition-colors duration-300",
                active ? "text-ink" : "text-secondary hover:text-body",
              )}
            >
              {active && (
                <motion.span
                  layoutId="hiw-audience-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(8,10,20,0.06)]"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

interface StepListProps {
  steps: HowItWorksStep[];
  index: number;
  onSelect: (index: number) => void;
  orientation?: "vertical" | "horizontal";
}

/** Numbered step list with the 4 px progress bar (Figma "List"). */
export function StepList({ steps, index, onSelect, orientation = "vertical" }: StepListProps) {
  const horizontal = orientation === "horizontal";
  return (
    <ol
      className={cn(
        horizontal
          ? "scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          : "flex w-full flex-col gap-1 pt-2",
      )}
    >
      {steps.map((step, stepIndex) => {
        const active = stepIndex === index;
        return (
          <li key={step.id} className={cn(horizontal ? "shrink-0" : "w-full")}>
            <button
              type="button"
              aria-current={active ? "step" : undefined}
              onClick={() => onSelect(stepIndex)}
              className={cn(
                "group flex w-full text-left",
                horizontal ? "flex-col gap-3 pr-3" : "items-stretch gap-[18px] py-2.5",
              )}
            >
              <span
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-[2px] bg-line",
                  horizontal ? "h-1 w-full min-w-[120px]" : "w-1 self-stretch",
                )}
              >
                <motion.span
                  className={cn(
                    "absolute inset-0 rounded-[2px] bg-primary",
                    horizontal ? "origin-left" : "origin-top",
                  )}
                  initial={false}
                  animate={horizontal ? { scaleX: active ? 1 : 0 } : { scaleY: active ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className="flex min-w-px flex-1 items-start gap-3">
                <span
                  className={cn(
                    "w-[18px] shrink-0 self-stretch font-inter-semibold text-[13px] font-semibold leading-normal tracking-[0.78px] transition-colors duration-500",
                    active ? "text-primary" : "text-tertiary",
                  )}
                >
                  {String(stepIndex + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "min-w-px flex-1 text-[18px] leading-[26px] tracking-[-0.18px] transition-colors duration-500",
                    horizontal && "whitespace-nowrap text-[15px] leading-[22px]",
                    active
                      ? "font-inter-semibold font-semibold text-ink"
                      : "font-inter-medium font-medium text-tertiary group-hover:text-body",
                  )}
                >
                  {step.label}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** Left-column step copy: step number, headline, description. */
export function StepDetail({
  step,
  index,
  count,
}: {
  step: HowItWorksStep;
  index: number;
  count: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-start gap-2.5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-inter-semibold text-[13px] font-semibold leading-normal tracking-[1.12px] text-primary whitespace-nowrap">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </p>
      <h3 className="font-inter-bold text-[28px] font-bold leading-[34px] tracking-[-0.5px] text-ink xl:text-[34px] xl:leading-[40px]">
        {step.title}
      </h3>
      <p className="text-[15px] leading-[24px] text-neutral xl:text-[16px] xl:leading-[26px]">
        {step.body}
      </p>
    </motion.div>
  );
}
