import { motion, useReducedMotion, useTransform } from "motion/react";
import { EASE_OUT } from "@/common/constants/motion";
import { HERO_COMPACT_PLATFORMS, HERO_FLOATS, type HeroFloat } from "@/landing/data/hero";
import type { PointerSprings } from "@/landing/hooks/useHeroPointer";
import { cn } from "@/common/utils/cn";
import { HeroFloatCard } from "./HeroFloatCard";
import { HeroStage, STAGE_WIDTH } from "./HeroStage";

interface FloaterProps {
  item: HeroFloat;
  index: number;
  pointer: PointerSprings;
  className?: string;
  style?: React.CSSProperties;
}

/** Entrance → pointer parallax → slow idle drift, layered so each motion stays independent. */
function Floater({ item, index, pointer, className, style }: FloaterProps) {
  const reduceMotion = useReducedMotion();
  const x = useTransform(pointer.x, (value) => value * item.depth);
  const y = useTransform(pointer.y, (value) => value * item.depth * 0.7);
  const drift = 6 + (index % 3) * 2;

  return (
    <motion.div
      className={cn("absolute", className)}
      style={style}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.55 + index * 0.1, ease: EASE_OUT }}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -drift, 0, drift * 0.5, 0],
                  x: [0, drift * 0.35, 0, -drift * 0.35, 0],
                  rotate: [0, 0.6, 0, -0.6, 0],
                }
          }
          transition={{
            duration: item.period,
            delay: 1.4 + index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className={cn("pointer-events-auto", item.box && "flex items-center justify-center")}
            style={item.box ? { width: item.box.width, height: item.box.height } : undefined}
          >
            <motion.div
              style={{ rotate: item.rotate }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="flex-none"
            >
              <HeroFloatCard item={item} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Full scene (xl+) uses exact Figma positions on the scaled 1440 stage.
 * Smaller screens keep the four platform chips, tucked into the corners.
 */
export function HeroFloatingCards({ width, pointer }: { width: number; pointer: PointerSprings }) {
  const scale = width > 0 && width < STAGE_WIDTH ? width / STAGE_WIDTH : 1;
  const platforms = HERO_COMPACT_PLATFORMS.map((slot) => ({
    slot,
    item: HERO_FLOATS.find((float) => float.id === slot.id),
  }));

  return (
    <>
      <HeroStage scale={scale} className="z-20 hidden xl:block">
        {HERO_FLOATS.map((item, index) => (
          <Floater
            key={item.id}
            item={item}
            index={index}
            pointer={pointer}
            style={{ left: item.left, top: item.top }}
          />
        ))}
      </HeroStage>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 xl:hidden">
        {platforms.map(({ slot, item }, index) =>
          item ? (
            <Floater
              key={item.id}
              item={item}
              index={index}
              pointer={pointer}
              className={cn("origin-center scale-[0.82] sm:scale-100", slot.className)}
            />
          ) : null,
        )}
      </div>
    </>
  );
}
