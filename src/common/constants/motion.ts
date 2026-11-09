import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language: calm, deliberate easing so nothing feels fast or jumpy.
 * Every section should compose these instead of inventing new curves.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
  slower: 1.2,
} as const;

export const transitionBase: Transition = { duration: DURATION.base, ease: EASE_OUT };
export const transitionSlow: Transition = { duration: DURATION.slow, ease: EASE_OUT };

/** Viewport config for scroll-triggered reveals: play once, slightly before fully visible. */
export const REVEAL_VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -60px 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitionSlow },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionSlow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: transitionSlow },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}
