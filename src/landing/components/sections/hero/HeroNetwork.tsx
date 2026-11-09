import { motion, useReducedMotion } from "motion/react";
import { ASSETS } from "@/common/constants/assets";
import { EASE_OUT } from "@/common/constants/motion";
import { HERO_DOTS, HERO_LINES } from "@/landing/data/hero";
import { HeroStage, STAGE_WIDTH } from "./HeroStage";

/** Connection-graph backdrop. Always covers the hero width; lines draw in, nodes breathe. */
export function HeroNetwork({ width }: { width: number }) {
  const reduceMotion = useReducedMotion();
  const scale = width > STAGE_WIDTH ? width / STAGE_WIDTH : 1;

  return (
    <HeroStage scale={scale}>
      {HERO_LINES.map((line, index) => (
        <motion.div
          key={line.src}
          className="absolute flex items-center justify-center"
          style={{ left: line.left, top: line.top, width: line.width, height: line.height }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 + index * 0.05, ease: EASE_OUT }}
        >
          <div className="flex-none" style={{ transform: `rotate(${line.rotate}deg)` }}>
            <div className="relative h-0" style={{ width: line.length }}>
              <div className="absolute inset-[-1px_0_0_0]">
                <img src={line.src} alt="" className="block size-full max-w-none" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {HERO_DOTS.map((dot, index) => (
        <motion.img
          key={`${dot.left}-${dot.top}`}
          src={ASSETS.hero.dot}
          alt=""
          width={6}
          height={6}
          className="absolute block size-1.5 max-w-none"
          style={{ left: dot.left, top: dot.top }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }
          }
          transition={
            reduceMotion
              ? { duration: 0.6 }
              : {
                  duration: 4 + (index % 4) * 0.6,
                  delay: 0.6 + index * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </HeroStage>
  );
}
