import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Container } from "@/common/components/ui/Container";
import { ScaledFrame } from "@/common/components/layout/ScaledFrame";
import { Reveal } from "@/common/components/motion/Reveal";
import { useAutoCycle } from "@/common/hooks/useAutoCycle";
import { DESKTOP_QUERY, useMediaQuery } from "@/common/hooks/useMediaQuery";
import { useViewportHeight } from "@/common/hooks/useViewportHeight";
import { HEADER_OFFSET } from "@/common/utils/scroll";
import { scaleIn } from "@/common/constants/motion";
import { LANDING_SECTIONS } from "@/landing/constants/sections";
import {
  HOW_IT_WORKS_COPY,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_STEP_COUNT,
  type Audience,
} from "@/landing/data/howItWorks";
import { useStickySteps } from "@/landing/hooks/useStickySteps";
import { AudienceToggle, StepDetail, StepList } from "./HowItWorksControls";
import { HowItWorksMedia, MEDIA_HEIGHT, MEDIA_WIDTH } from "./HowItWorksMedia";

const COUNT = HOW_IT_WORKS_STEP_COUNT;

function Eyebrow() {
  return (
    <p className="font-inter-semibold text-[12px] font-semibold leading-normal tracking-[1.44px] text-primary whitespace-nowrap">
      {HOW_IT_WORKS_COPY.eyebrow}
    </p>
  );
}

/** Desktop: the stage pins under the header while scrolling walks through the five steps. */
function StickyHowItWorks({
  audience,
  setAudience,
}: {
  audience: Audience;
  setAudience: (value: Audience) => void;
}) {
  const { ref, index, goTo } = useStickySteps(COUNT);
  const viewportHeight = useViewportHeight();
  const steps = HOW_IT_WORKS_STEPS[audience];
  const step = steps[index] ?? steps[0]!;

  return (
    <section
      ref={ref}
      id={LANDING_SECTIONS.howItWorks.id}
      aria-label="How it works"
      className="relative bg-white"
      style={{ height: `calc(${COUNT} * 70vh + 100dvh - ${HEADER_OFFSET}px)` }}
    >
      <div
        className="sticky flex items-center overflow-hidden"
        style={{ top: HEADER_OFFSET, height: `calc(100dvh - ${HEADER_OFFSET}px)` }}
      >
        <Container className="grid grid-cols-[240px_minmax(0,1fr)_280px] items-start gap-10 xl:grid-cols-[320px_544px_380px] xl:justify-center xl:gap-12 xl:px-0">
          <Reveal className="flex w-full flex-col items-start gap-6">
            <Eyebrow />
            <AudienceToggle value={audience} onChange={setAudience} />
            <StepList steps={steps} index={index} onSelect={goTo} />
          </Reveal>

          <Reveal variants={scaleIn} delay={0.1} className="w-full">
            <ScaledFrame
              width={MEDIA_WIDTH}
              height={MEDIA_HEIGHT}
              maxHeight={viewportHeight - HEADER_OFFSET - 48}
              className="mx-auto"
            >
              <HowItWorksMedia steps={steps} index={index} deckKey={audience} />
            </ScaledFrame>
          </Reveal>

          <div className="self-center">
            <AnimatePresence mode="wait">
              <StepDetail key={`${audience}-${step.id}`} step={step} index={index} count={COUNT} />
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}

/** Tablet & mobile: no scroll-jacking. Steps auto-advance while visible; tap or swipe to choose. */
function StackedHowItWorks({
  audience,
  setAudience,
}: {
  audience: Audience;
  setAudience: (value: Audience) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [index, setIndex] = useAutoCycle(COUNT, 5500, inView);
  const steps = HOW_IT_WORKS_STEPS[audience];
  const step = steps[index] ?? steps[0]!;

  return (
    <section
      ref={ref}
      id={LANDING_SECTIONS.howItWorks.id}
      aria-label="How it works"
      className="bg-white py-20 sm:py-24"
    >
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-col items-start gap-5">
          <Eyebrow />
          <AudienceToggle value={audience} onChange={setAudience} />
        </Reveal>
        <StepList steps={steps} index={index} onSelect={setIndex} orientation="horizontal" />
        <Reveal variants={scaleIn}>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) setIndex(index + 1);
              else if (info.offset.x > 60) setIndex(index - 1);
            }}
            className="mx-auto max-w-[544px] cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <ScaledFrame width={MEDIA_WIDTH} height={MEDIA_HEIGHT}>
              <HowItWorksMedia steps={steps} index={index} deckKey={audience} />
            </ScaledFrame>
          </motion.div>
        </Reveal>
        <div className="mx-auto w-full max-w-[544px]">
          <AnimatePresence mode="wait">
            <StepDetail key={`${audience}-${step.id}`} step={step} index={index} count={COUNT} />
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/** Figma "How it works · scroll (sticky)" (844:1457), brands and creators flows. */
export function HowItWorksSection() {
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const [audience, setAudience] = useState<Audience>("brands");
  return desktop ? (
    <StickyHowItWorks audience={audience} setAudience={setAudience} />
  ) : (
    <StackedHowItWorks audience={audience} setAudience={setAudience} />
  );
}
