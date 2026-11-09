import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/common/constants/motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it scrolls into view, then stops. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2.2,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;
    const render = (value: number) => {
      element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    };
    if (reduceMotion) {
      render(to);
      return;
    }
    const controls = animate(0, to, { duration, delay, ease: EASE_OUT, onUpdate: render });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, decimals, duration, delay, reduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to.toFixed(decimals)}${suffix}`}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
