import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ASSETS } from "@/common/constants/assets";
import { EASE_OUT } from "@/common/constants/motion";
import { useAutoCycle } from "@/common/hooks/useAutoCycle";
import { useElementWidth } from "@/common/hooks/useElementWidth";
import { RUNWAY, type Creator } from "@/landing/data/creators";
import { RunwayCard } from "./CreatorCard";

const CARD_SIZE = {
  feature: { width: 860, height: 420 },
  quote: { width: 440, height: 400 },
} as const;

/**
 * Slot of a card relative to the spotlight. The next creators wait lower-left (negative
 * slots) and the previous one exits upper-right (+1), exactly as in the Figma states.
 * For 4+ cards slots wrap into [-4, 1] so the loop never rewinds across the stage.
 */
function slotOffset(index: number, active: number, count: number) {
  const raw = active - index;
  if (count < 4) return raw;
  return ((((raw + 4) % count) + count) % count) - 4;
}

function slotTarget(offset: number, visible: boolean) {
  return {
    x: RUNWAY.centerX + RUNWAY.stepX * offset,
    y: RUNWAY.centerY + RUNWAY.stepY * offset,
    rotate: RUNWAY.stepRotate * offset,
    opacity: visible ? 1 : 0,
  };
}

interface CreatorRunwayProps {
  creators: Creator[];
}

/**
 * Figma "Stage": cards ride a diagonal runway. The centre card is the spotlight;
 * it auto-advances while visible (paused on hover) and can be dragged either way.
 */
export function CreatorRunway({ creators }: CreatorRunwayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  const inView = useInView(ref, { amount: 0.35 });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useAutoCycle(creators.length, RUNWAY.interval, inView && !hovered);
  const scale = width > 0 ? Math.min(1, width / RUNWAY.width) : 1;
  const previousOffsets = useRef(new Map<string, number>());
  const offsets = creators.map((creator, index) => slotOffset(index, active, creators.length));

  useEffect(() => {
    creators.forEach((creator, index) =>
      previousOffsets.current.set(creator.id, offsets[index] ?? 0),
    );
  });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: RUNWAY.height * scale }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Top creators"
    >
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{
          width: RUNWAY.width,
          height: RUNWAY.height,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        <motion.div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) setActive(active + 1);
            else if (info.offset.x > 50 || info.velocity.x > 400) setActive(active - 1);
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[220px] top-[210px] h-[420px] w-[1000px]"
          >
            <div className="absolute inset-[-33.33%_-14%]">
              <img src={ASSETS.creators.glow} alt="" className="block size-full max-w-none" />
            </div>
          </div>

          {creators.map((creator, index) => {
            const offset = offsets[index] ?? 0;
            const size = CARD_SIZE[creator.layout];
            // Only the creator just shown may sit upper-right; anything wrapping round stays hidden.
            const visible = (offset >= -2 && offset <= 0) || (offset === 1 && index < active);
            const previous = previousOffsets.current.get(creator.id) ?? offset;
            const jump = Math.abs(offset - previous) > 2;
            return (
              <motion.div
                key={creator.id}
                className="absolute left-0 top-0"
                style={{
                  width: size.width,
                  height: size.height,
                  marginLeft: -size.width / 2,
                  marginTop: -size.height / 2,
                  zIndex: 10 - Math.abs(offset),
                }}
                initial={false}
                animate={slotTarget(offset, visible)}
                transition={jump ? { duration: 0 } : { duration: 1.05, ease: EASE_OUT }}
                aria-hidden={offset !== 0}
                onClick={() => offset !== 0 && setActive(index)}
              >
                <div className={offset === 0 ? undefined : "pointer-events-none"}>
                  <RunwayCard creator={creator} interactive={offset === 0} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
