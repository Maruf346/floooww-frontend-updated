import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { DESKTOP_QUERY, useMediaQuery } from "@/common/hooks/useMediaQuery";
import { cn } from "@/common/utils/cn";
import { useStickySteps } from "@/landing/hooks/useStickySteps";
import {
  CREATORS_COPY,
  NICHE_FILTERS,
  RUNWAY_ITEMS,
  type NicheFilter,
  type RunwayItem,
} from "@/landing/data/creators";
import { CompactCard } from "./CreatorCard";
import { CreatorRunway } from "./CreatorRunway";

const HEADER_OFFSET = 72;

type View = (typeof CREATORS_COPY.views)[number];

function ViewToggle({ value, onChange }: { value: View; onChange: (view: View) => void }) {
  return (
    <LayoutGroup id="creators-view">
      <div
        role="tablist"
        aria-label="View"
        className="flex items-center gap-1 rounded-full bg-subtle p-1"
      >
        {CREATORS_COPY.views.map((view) => {
          const active = view === value;
          return (
            <button
              key={view}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(view)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[14px] leading-normal whitespace-nowrap transition-colors duration-300",
                active
                  ? "font-inter-semibold font-semibold text-white"
                  : "font-inter-medium font-medium text-neutral hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="creators-view-pill"
                  className="absolute inset-0 rounded-full bg-[#0d0d10]"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              )}
              <span className="relative">{view}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function NicheChips({
  value,
  onChange,
}: {
  value: NicheFilter;
  onChange: (niche: NicheFilter) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Niche"
      className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {NICHE_FILTERS.map((niche) => {
        const active = niche === value;
        return (
          <button
            key={niche}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(niche)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[14px] leading-normal whitespace-nowrap transition-[background-color,border-color,color] duration-300",
              active
                ? "border-[#0d0d10] bg-[#0d0d10] font-inter-semibold font-semibold text-white"
                : "border-line-subtle bg-white font-inter-medium font-medium text-ink hover:border-line-strong hover:bg-subtle",
            )}
          >
            {niche}
          </button>
        );
      })}
    </div>
  );
}

interface StickyRunwayProps {
  items: RunwayItem[];
  niche: NicheFilter;
  setNiche: (n: NicheFilter) => void;
  view: View;
  setView: (v: View) => void;
  desktop: boolean;
}

/** Pinned Runway driven by scroll both ways with snap */
function StickyRunway({
  items,
  niche,
  setNiche,
  view,
  setView,
  desktop,
}: StickyRunwayProps) {
  const count = items.length;
  const { ref, index, goTo } = useStickySteps<HTMLDivElement>(count);

  // Debounced scroll snap listener so the runway never rests between two cards
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

        if (currentProgress > 0.05 && currentProgress < 0.95) {
          const nearestIndex = Math.min(
            count - 1,
            Math.max(0, Math.floor(currentProgress * count)),
          );
          const targetCenter = (nearestIndex + 0.5) / count;
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
  }, [count, goTo, ref]);

  return (
    <section
      ref={ref}
      aria-labelledby="creators-title"
      className="relative bg-white"
      style={{ height: `calc(${count} * 70vh + 100dvh - ${HEADER_OFFSET}px)` }}
    >
      <div
        className="sticky flex flex-col justify-center overflow-hidden"
        style={{ top: HEADER_OFFSET, height: `calc(100dvh - ${HEADER_OFFSET}px)` }}
      >
        <Container className="flex flex-col gap-5 xl:px-[120px]">
          <div className="flex flex-col items-start">
            <p className="font-inter-semibold text-[13px] font-semibold leading-normal tracking-[1.82px] text-secondary uppercase">
              {CREATORS_COPY.eyebrow}
            </p>
            <h2
              id="creators-title"
              className="mt-2 font-inter-bold text-[34px] font-bold leading-[40px] tracking-[-0.85px] text-ink sm:text-[44px] sm:leading-[52px] lg:text-[48px] lg:leading-[56px] lg:tracking-[-1.2px]"
            >
              {CREATORS_COPY.title.before}
            </h2>
            <div className="mt-2 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-[560px] text-[16px] leading-[26px] text-neutral sm:text-[17px] sm:leading-7">
                {CREATORS_COPY.description}
              </p>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {desktop && <ViewToggle value={view} onChange={setView} />}
                <Link
                  to={`${ROUTES.signup}?role=brand`}
                  className="rounded-full bg-ink px-5 py-3 font-inter-semibold text-[15px] font-semibold leading-normal text-white whitespace-nowrap transition-[background-color,box-shadow] duration-300 hover:bg-[#27272a] hover:shadow-[0_8px_20px_-8px_rgba(13,13,16,0.35)]"
                >
                  {CREATORS_COPY.browse}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-1">
            <NicheChips value={niche} onChange={setNiche} />
          </div>
        </Container>

        <div className="mt-2 w-full">
          {items.length === 0 ? (
            <p className="mx-auto max-w-[420px] px-5 py-24 text-center text-[16px] leading-[26px] text-secondary">
              {CREATORS_COPY.empty}
            </p>
          ) : (
            <CreatorRunway items={items} active={index} onSelect={goTo} />
          )}
        </div>
      </div>
    </section>
  );
}

/** Unpinned Grid View / Reduced Motion / Mobile View */
function UnpinnedView({
  items,
  niche,
  setNiche,
  view,
  setView,
  desktop,
}: StickyRunwayProps) {
  return (
    <section
      aria-labelledby="creators-title"
      className="overflow-hidden bg-white pb-16 pt-20 lg:pb-20 lg:pt-24"
    >
      <Container className="xl:px-[120px]">
        <RevealGroup stagger={0.1} className="flex flex-col items-start">
          <RevealItem
            as="p"
            className="font-inter-semibold text-[13px] font-semibold leading-normal tracking-[1.82px] text-secondary uppercase"
          >
            {CREATORS_COPY.eyebrow}
          </RevealItem>
          <RevealItem>
            <h2
              id="creators-title"
              className="mt-3.5 font-inter-bold text-[34px] font-bold leading-[40px] tracking-[-0.85px] text-ink sm:text-[44px] sm:leading-[52px] lg:text-[48px] lg:leading-[56px] lg:tracking-[-1.2px]"
            >
              {CREATORS_COPY.title.before}
            </h2>
          </RevealItem>
          <RevealItem className="mt-3.5 flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[560px] text-[16px] leading-[26px] text-neutral sm:text-[18px] sm:leading-7">
              {CREATORS_COPY.description}
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {desktop && <ViewToggle value={view} onChange={setView} />}
              <Link
                to={`${ROUTES.signup}?role=brand`}
                className="rounded-full bg-ink px-5 py-3 font-inter-semibold text-[15px] font-semibold leading-normal text-white whitespace-nowrap transition-[background-color,box-shadow] duration-300 hover:bg-[#27272a] hover:shadow-[0_8px_20px_-8px_rgba(13,13,16,0.35)]"
              >
                {CREATORS_COPY.browse}
              </Link>
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.2} className="mt-8 lg:mt-[26px]">
          <NicheChips value={niche} onChange={setNiche} />
        </Reveal>
      </Container>

      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          {items.length === 0 ? (
            <motion.p
              key="empty"
              className="mx-auto max-w-[420px] px-5 py-24 text-center text-[16px] leading-[26px] text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {CREATORS_COPY.empty}
            </motion.p>
          ) : desktop ? (
            <motion.div
              key={`grid-${niche}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Container className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-3 xl:px-[120px]">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: EASE_OUT }}
                  >
                    <CompactCard item={item} />
                  </motion.div>
                ))}
              </Container>
            </motion.div>
          ) : (
            <motion.div
              key={`rail-${niche}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-2 sm:px-8">
                {items.map((item) => (
                  <div key={item.id} className="w-[82vw] max-w-[360px] shrink-0 snap-center">
                    <CompactCard item={item} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Figma "Creators runway · scroll" (1805:102187). Alternates creators and campaigns on one runway. */
export function CreatorsSection() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const wide = useMediaQuery(DESKTOP_QUERY);
  const prefersReducedMotion = useReducedMotion();
  const [view, setView] = useState<View>("Runway");
  const [niche, setNiche] = useState<NicheFilter>("All niches");

  const items = useMemo(
    () =>
      niche === "All niches"
        ? RUNWAY_ITEMS
        : RUNWAY_ITEMS.filter((item) => item.niche === niche),
    [niche],
  );

  const showSticky = view === "Runway" && wide && !prefersReducedMotion;

  if (showSticky) {
    return (
      <StickyRunway
        items={items}
        niche={niche}
        setNiche={setNiche}
        view={view}
        setView={setView}
        desktop={desktop}
      />
    );
  }

  return (
    <UnpinnedView
      items={items}
      niche={niche}
      setNiche={setNiche}
      view={view}
      setView={setView}
      desktop={desktop}
    />
  );
}
