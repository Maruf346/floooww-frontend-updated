import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { HEADER_OFFSET } from "@/common/utils/scroll";

/**
 * Scroll-driven step index for a tall section with a sticky stage inside.
 * The section's scroll distance is split evenly between `count` steps.
 */
export function useStickySteps<T extends HTMLElement = HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${HEADER_OFFSET}px`, "end end"],
  });
  const stepProgress = useTransform(scrollYProgress, (value) => {
    const scaled = Math.min(0.9999, Math.max(0, value)) * count;
    return scaled - Math.floor(scaled);
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setIndex((current) => (current === next ? current : next));
  });

  /** Glide to the start of step `target` (slightly inside it so it reads as active). */
  const goTo = (target: number) => {
    const element = ref.current;
    if (!element) return;
    const sectionTop = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    const distance = element.offsetHeight - (window.innerHeight - HEADER_OFFSET);
    const top = sectionTop + distance * ((target + 0.08) / count);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return { ref, index, goTo, stepProgress };
}
