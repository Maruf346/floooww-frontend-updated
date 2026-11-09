import { useEffect, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";

export interface PointerSprings {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Pointer position over `ref`, normalised to -1…1 and smoothed with a soft spring.
 * Only active for fine pointers (mouse/trackpad) and when motion is allowed.
 */
export function useHeroPointer(ref: RefObject<HTMLElement | null>): PointerSprings {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 50, damping: 18, mass: 0.8 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, reduceMotion, rawX, rawY]);

  return { x, y };
}
