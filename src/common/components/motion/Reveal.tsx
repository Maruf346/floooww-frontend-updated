import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { REVEAL_VIEWPORT, fadeUp, staggerContainer } from "@/common/constants/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
}

/** Plays its entrance once, when scrolled into view (never all at once on load). */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount = REVEAL_VIEWPORT.amount,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...REVEAL_VIEWPORT, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "dl";
}

/** Staggers its `RevealItem` children when the group enters the viewport. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = REVEAL_VIEWPORT.amount,
  as = "div",
}: RevealGroupProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...REVEAL_VIEWPORT, amount }}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "p" | "span";
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: RevealItemProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
