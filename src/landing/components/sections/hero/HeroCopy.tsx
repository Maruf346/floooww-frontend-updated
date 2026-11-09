import { motion } from "motion/react";
import { Typewriter } from "@/common/components/motion/Typewriter";
import { fadeUp, staggerContainer } from "@/common/constants/motion";
import { HERO_COPY } from "@/landing/data/hero";
import { HeroSearch, useHeroSearch } from "./HeroSearch";

export function HeroCopy() {
  const search = useHeroSearch();

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-[22px]"
      variants={staggerContainer(0.09, 0.1)}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-[7px] text-[12px] leading-normal whitespace-nowrap shadow-float"
      >
        <span className="font-inter-bold font-bold text-warning" aria-hidden="true">
          {HERO_COPY.rating.stars}
        </span>
        <span className="font-inter-semibold font-semibold text-ink">{HERO_COPY.rating.score}</span>
        <span className="text-secondary">{HERO_COPY.rating.trust}</span>
      </motion.p>

      <motion.h1
        id="hero-title"
        variants={fadeUp}
        className="flex w-full flex-col items-center text-center font-inter-extrabold font-extrabold tracking-[-0.035em] text-ink text-[clamp(2rem,6.6vw,4.5rem)]"
      >
        <span className="leading-[1.1111] text-balance">{HERO_COPY.headline}</span>
        <span className="sr-only">{HERO_COPY.rotatingWords.join(", ")}</span>
        <span className="block h-[1.1667em] w-full max-w-[860px] overflow-hidden leading-[1.1667em] whitespace-nowrap text-gradient-primary">
          <Typewriter words={HERO_COPY.rotatingWords} startDelay={900} />
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-[620px] text-center font-inter-regular text-[16px] leading-[26px] text-neutral sm:text-[18px] sm:leading-7 lg:max-w-none lg:whitespace-nowrap"
      >
        {HERO_COPY.subheadline}
      </motion.p>

      <motion.div variants={fadeUp} className="flex w-full justify-center">
        <HeroSearch />
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-[13px] leading-normal text-secondary">{HERO_COPY.popularLabel}</span>
        {HERO_COPY.popular.map((niche) => (
          <button
            key={niche}
            type="button"
            onClick={() => search(niche)}
            className="rounded-full border border-line bg-white px-3 py-1.5 font-inter-medium text-[13px] font-medium leading-normal text-ink transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-px hover:border-line-strong hover:bg-subtle active:translate-y-0"
          >
            {niche}
          </button>
        ))}
      </motion.div>

      <motion.ul
        variants={fadeUp}
        className="flex flex-wrap items-start justify-center gap-x-7 gap-y-2 text-[13px] leading-normal"
      >
        {HERO_COPY.checks.map((check) => (
          <li key={check} className="flex items-start gap-1.5 whitespace-nowrap">
            <span aria-hidden="true" className="font-inter-bold font-bold text-success">
              ✓
            </span>
            <span className="text-neutral">{check}</span>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
