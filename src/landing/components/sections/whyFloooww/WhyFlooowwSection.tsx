import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ScaledFrame } from "@/common/components/layout/ScaledFrame";
import { Container } from "@/common/components/ui/Container";
import { Reveal } from "@/common/components/motion/Reveal";
import { EASE_OUT, scaleIn } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { useAutoCycle } from "@/common/hooks/useAutoCycle";
import { DESKTOP_QUERY, useMediaQuery } from "@/common/hooks/useMediaQuery";
import { useViewportHeight } from "@/common/hooks/useViewportHeight";
import { cn } from "@/common/utils/cn";
import { HEADER_OFFSET } from "@/common/utils/scroll";
import { SectionHeading } from "@/landing/components/shared/SectionHeading";
import { WHY_COPY, WHY_FEATURES, type WhyFeature } from "@/landing/data/whyFloooww";
import { useStickySteps } from "@/landing/hooks/useStickySteps";
import { WHY_CARD_HEIGHT, WHY_CARD_WIDTH, WhyCard } from "./WhyScenes";

const COUNT = WHY_FEATURES.length;
const FEATURE_HEIGHT = 300;
const VIEWPORT_HEIGHT = 420;
const EXPLORE_TO = `${ROUTES.signup}?role=brand`;

function FeatureCopy({
  feature,
  active,
  onSelect,
}: {
  feature: WhyFeature;
  active: boolean;
  onSelect?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-center gap-[18px]",
        onSelect && "h-[300px]",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        tabIndex={onSelect ? 0 : -1}
        className={cn(
          "flex items-center gap-3 text-[13px] leading-normal whitespace-nowrap",
          !onSelect && "pointer-events-none",
        )}
      >
        <span className="font-inter-semibold font-semibold tracking-[0.78px] text-secondary">
          {feature.number}
        </span>
        <span className="h-px w-6 bg-line-strong" />
        <span className="font-inter-medium font-medium text-neutral">{feature.kicker}</span>
      </button>
      <h3 className="font-inter-bold text-[28px] font-bold leading-[34px] tracking-[-0.7px] text-ink sm:text-[36px] sm:leading-[42px] sm:tracking-[-0.9px]">
        {feature.title}
      </h3>
      <p className="text-[16px] leading-[26px] text-neutral sm:text-[17px] sm:leading-[27px]">
        {feature.body}
      </p>
      <div className="flex items-center gap-4 font-inter-semibold text-[15px] font-semibold leading-normal whitespace-nowrap">
        <p className="text-ink">{feature.metric}</p>
        <span className="h-3.5 w-px bg-line-strong" />
        <Link
          to={EXPLORE_TO}
          tabIndex={active ? 0 : -1}
          className="group inline-flex items-center text-primary transition-colors hover:text-primary-hover"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            {feature.cta}
          </span>
        </Link>
      </div>
    </div>
  );
}

/** Desktop: section pins with heading, dark card panel and rolling feature text. */
function StickyWhy() {
  const { ref, index, goTo } = useStickySteps<HTMLDivElement>(COUNT);
  const viewportHeight = useViewportHeight();

  // (5) When scrolling stops, snap to the nearest feature so it never rests halfway
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const handleScroll = () => {
      if (isSnapping) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY - HEADER_OFFSET;
        const totalDistance = el.offsetHeight - (window.innerHeight - HEADER_OFFSET);
        if (totalDistance <= 0) return;
        const currentProgress = (window.scrollY - sectionTop) / totalDistance;

        // Snap only when resting in the active scroll range
        if (currentProgress > 0.05 && currentProgress < 0.95) {
          const nearestIndex = Math.min(
            COUNT - 1,
            Math.max(0, Math.floor(currentProgress * COUNT)),
          );
          const targetCenter = (nearestIndex + 0.5) / COUNT;
          if (Math.abs(currentProgress - targetCenter) > 0.04) {
            isSnapping = true;
            goTo(nearestIndex);
            setTimeout(() => {
              isSnapping = false;
            }, 600);
          }
        }
      }, 160);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [goTo, ref]);

  return (
    <section
      ref={ref}
      aria-labelledby="why-title"
      className="relative bg-white"
      style={{ height: `calc(${COUNT} * 70vh + 100dvh - ${HEADER_OFFSET}px)` }}
    >
      <div
        className="sticky flex flex-col justify-center overflow-hidden"
        style={{ top: HEADER_OFFSET, height: `calc(100dvh - ${HEADER_OFFSET}px)` }}
      >
        <Container className="flex flex-col items-center gap-6 xl:gap-8">
          {/* (4) Heading 'Everything you need to run better projects' is all near-black */}
          <SectionHeading
            id="why-title"
            eyebrow={WHY_COPY.eyebrow}
            title={WHY_COPY.title}
            description={WHY_COPY.description}
            titleClassName="text-ink text-[#070b13]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,600px)_minmax(0,460px)] items-center justify-center gap-10 xl:gap-[100px] w-full">
            {/* (1) Near-black panel with rounded corners, (2) One card at a time, (3) Progress bar */}
            <Reveal variants={scaleIn} className="relative w-full flex justify-center lg:justify-end">
              <ScaledFrame
                width={WHY_CARD_WIDTH}
                height={WHY_CARD_HEIGHT}
                maxHeight={Math.max(340, viewportHeight - HEADER_OFFSET - 220)}
              >
                <WhyCard index={index} />
              </ScaledFrame>
            </Reveal>

            {/* Feature copy roll */}
            <Reveal
              delay={0.1}
              className="relative h-[420px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]"
            >
              <motion.div
                className="absolute left-0 top-0 flex w-full flex-col"
                animate={{ y: (VIEWPORT_HEIGHT - FEATURE_HEIGHT) / 2 - FEATURE_HEIGHT * index }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
              >
                {WHY_FEATURES.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.id}
                    animate={{ opacity: featureIndex === index ? 1 : 0.22 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <FeatureCopy
                      feature={feature}
                      active={featureIndex === index}
                      onSelect={() => goTo(featureIndex)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

/** Tablet & mobile: auto-advancing features with tappable indicators and swipe on the card. */
function StackedWhy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [index, setIndex] = useAutoCycle(COUNT, 6000, inView);
  const feature = WHY_FEATURES[index] ?? WHY_FEATURES[0]!;

  return (
    <section ref={ref} aria-labelledby="why-title" className="bg-white py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="why-title"
          eyebrow={WHY_COPY.eyebrow}
          title={WHY_COPY.title}
          description={WHY_COPY.description}
          titleClassName="text-ink text-[#070b13]"
        />
        <Reveal variants={scaleIn} className="relative mx-auto w-full max-w-[600px]">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) setIndex(index + 1);
              else if (info.offset.x > 60) setIndex(index - 1);
            }}
            className="cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <ScaledFrame width={WHY_CARD_WIDTH} height={WHY_CARD_HEIGHT}>
              <WhyCard index={index} />
            </ScaledFrame>
          </motion.div>
        </Reveal>
        <div className="mx-auto w-full max-w-[600px]">
          <div role="tablist" aria-label="Features" className="mb-6 grid grid-cols-4 gap-2">
            {WHY_FEATURES.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                aria-label={item.title}
                onClick={() => setIndex(itemIndex)}
                className="py-2"
              >
                <span className="relative block h-1 overflow-hidden rounded-[2px] bg-line">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-[2px] bg-primary"
                    initial={false}
                    animate={{ scaleX: itemIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  />
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <FeatureCopy feature={feature} active />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/** Figma "Why Floooww · scroll (sticky)" (869:1702). (6) Reduced motion: no pinning. */
export function WhyFlooowwSection() {
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const shouldReduceMotion = useReducedMotion();
  return desktop && !shouldReduceMotion ? <StickyWhy /> : <StackedWhy />;
}
