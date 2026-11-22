import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ASSETS } from "@/common/constants/assets";
import { EASE_OUT } from "@/common/constants/motion";
import { useElementWidth } from "@/common/hooks/useElementWidth";
import { RUNWAY, type RunwayItem } from "@/landing/data/creators";
import { RunwayCard } from "./CreatorCard";

const CARD_SIZE = {
  creator: { width: 860, height: 420 },
  campaign: { width: 645, height: 315 },
} as const;

/**
 * Slot of a card relative to the spotlight. The next cards wait lower-left (negative
 * slots) and the previous one exits upper-right (+1), exactly as in Figma.
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
    scale: offset === 0 ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.12),
    opacity: visible ? 1 : 0,
  };
}

interface CreatorRunwayProps {
  items: RunwayItem[];
  active: number;
  onSelect: (index: number) => void;
}

/**
 * Figma "Stage": cards ride a diagonal runway alternating creators and brand campaigns.
 * The centre card is full size and level; ones before and after sit tilted and smaller.
 */
export function CreatorRunway({ items, active, onSelect }: CreatorRunwayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  const scale = width > 0 ? Math.min(1, width / RUNWAY.width) : 1;
  const previousOffsets = useRef(new Map<string, number>());
  const offsets = items.map((item, index) => slotOffset(index, active, items.length));

  useEffect(() => {
    items.forEach((item, index) =>
      previousOffsets.current.set(item.id, offsets[index] ?? 0),
    );
  });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none"
      style={{ height: RUNWAY.height * scale }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Creators and campaigns runway"
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
            if (info.offset.x < -50 || info.velocity.x < -400) {
              onSelect(Math.min(items.length - 1, active + 1));
            } else if (info.offset.x > 50 || info.velocity.x > 400) {
              onSelect(Math.max(0, active - 1));
            }
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

          {items.map((item, index) => {
            const offset = offsets[index] ?? 0;
            const size = CARD_SIZE[item.kind];
            // Only previous item sits upper-right; items wrapping round stay hidden
            const visible = (offset >= -2 && offset <= 0) || (offset === 1 && index < active);
            const previous = previousOffsets.current.get(item.id) ?? offset;
            const jump = Math.abs(offset - previous) > 2;

            return (
              <motion.div
                key={item.id}
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
                transition={jump ? { duration: 0 } : { duration: 0.85, ease: EASE_OUT }}
                aria-hidden={offset !== 0}
                onClick={() => offset !== 0 && onSelect(index)}
              >
                <div className={offset === 0 ? undefined : "pointer-events-none"}>
                  <RunwayCard item={item} interactive={offset === 0} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
