import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Index that advances every `interval` ms while `enabled`.
 * Any manual `set` restarts the timer so a user choice is never skipped immediately.
 */
export function useAutoCycle(count: number, interval: number, enabled: boolean) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled || reduceMotion || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [index, tick, enabled, reduceMotion, count, interval]);

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  const set = (next: number) => {
    setIndex(((next % count) + count) % count);
    setTick((value) => value + 1);
  };

  return [Math.min(index, Math.max(0, count - 1)), set] as const;
}
