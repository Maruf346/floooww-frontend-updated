import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { DESKTOP_QUERY, useMediaQuery } from "@/common/hooks/useMediaQuery";
import { cn } from "@/common/utils/cn";
import { CREATORS, CREATORS_COPY, NICHE_FILTERS, type NicheFilter } from "@/landing/data/creators";
import { CompactCreatorCard } from "./CreatorCard";
import { CreatorRunway } from "./CreatorRunway";

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
                  className="absolute inset-0 rounded-full bg-primary"
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
                ? "border-primary bg-primary font-inter-semibold font-semibold text-white"
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

/** Figma "Creators runway · scroll" (1805:102187). */
export function CreatorsSection() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const wide = useMediaQuery(DESKTOP_QUERY);
  const [view, setView] = useState<View>("Runway");
  const [niche, setNiche] = useState<NicheFilter>("All niches");
  const creators = useMemo(
    () =>
      niche === "All niches" ? CREATORS : CREATORS.filter((creator) => creator.niche === niche),
    [niche],
  );
  const showRunway = view === "Runway" && desktop;

  return (
    <section
      aria-labelledby="creators-title"
      className="overflow-hidden bg-white pb-16 pt-20 lg:pb-20 lg:pt-24"
    >
      <Container className="xl:px-[120px]">
        {/* Figma "Header" + "Controls": title on its own line, controls level with the description. */}
        <RevealGroup stagger={0.1} className="flex flex-col items-start">
          <RevealItem
            as="p"
            className="font-inter-semibold text-[13px] font-semibold leading-normal tracking-[1.82px] text-primary"
          >
            {CREATORS_COPY.eyebrow}
          </RevealItem>
          <RevealItem>
            <h2
              id="creators-title"
              className="mt-3.5 font-inter-bold text-[34px] font-bold leading-[40px] tracking-[-0.85px] text-ink text-balance sm:text-[44px] sm:leading-[52px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-1.3px]"
            >
              {CREATORS_COPY.title.before}
              <span className="text-gradient-brand">{CREATORS_COPY.title.highlight}</span>
              {CREATORS_COPY.title.after}
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
                className="rounded-full bg-primary px-5 py-3 font-inter-semibold text-[15px] font-semibold leading-normal text-white whitespace-nowrap transition-[background-color,box-shadow] duration-300 hover:bg-primary-hover hover:shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)]"
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

      <div className={cn("mt-6", wide && showRunway && "-mt-1")}>
        <AnimatePresence mode="wait" initial={false}>
          {creators.length === 0 ? (
            <motion.p
              key="empty"
              className="mx-auto max-w-[420px] px-5 py-24 text-center text-[16px] leading-[26px] text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {CREATORS_COPY.empty}
            </motion.p>
          ) : showRunway ? (
            <motion.div
              key={`runway-${niche}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <Reveal
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_OUT } },
                }}
                amount={0.15}
              >
                <CreatorRunway creators={creators} />
              </Reveal>
            </motion.div>
          ) : desktop ? (
            <motion.div
              key={`grid-${niche}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Container className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-3 xl:px-[120px]">
                {creators.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT }}
                  >
                    <CompactCreatorCard creator={creator} />
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
                {creators.map((creator) => (
                  <div key={creator.id} className="w-[82vw] max-w-[360px] shrink-0 snap-center">
                    <CompactCreatorCard creator={creator} />
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
