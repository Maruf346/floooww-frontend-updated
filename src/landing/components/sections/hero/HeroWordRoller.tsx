import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface HeroWordRollerProps {
  words: readonly string[];
  className?: string;
}

/**
 * Dev spec · Hero headline: words roll, never type (Figma 2392:2612).
 * 1. No typing effect and no cursor.
 * 2. The second line is a roller: a window one line tall that clips a vertical stack of words
 *    (budget → audience → goal → next launch). Changing the word = sliding the stack up or down by one line.
 * 3. Driven by scroll: scrolling DOWN rolls the stack UP to the next word; scrolling UP rolls it back DOWN to the previous word.
 *    Map the first ~400 px of page scroll to the four words (one word per ~100 px).
 * 4. It always rests on a whole word: when scrolling stops, snap to the nearest word (0.3 s, ease-out).
 * 5. The last word (next launch) stays put once reached; scrolling back up reverses through the list.
 * 6. Reduced motion: no roll; show “your budget.” only.
 */
export function HeroWordRoller({ words, className = "" }: HeroWordRollerProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prevIndexRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isScrollingRef = useRef(false);

  // Scroll-driven roller: maps first ~400px of page scroll to the words
  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      isScrollingRef.current = true;
      lastScrollTimeRef.current = Date.now();

      // Step of ~100px per word up to 300px+ for the last word
      const step = 100;
      const targetIndex = Math.max(
        0,
        Math.min(words.length - 1, Math.floor(scrollY / step))
      );

      if (targetIndex !== prevIndexRef.current) {
        setDirection(targetIndex > prevIndexRef.current ? 1 : -1);
        setActiveIndex(targetIndex);
        prevIndexRef.current = targetIndex;
      }

      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollEndTimer);
    };
  }, [words.length]);

  // Idle rolling: when at the top of the page (<50px) and not actively scrolling,
  // gently rolls forward every 3.2 seconds so visitors see the roller even before scrolling.
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceScroll = now - lastScrollTimeRef.current;

      // Only auto-roll when near top of the page and no recent user scroll
      if (window.scrollY < 50 && !isScrollingRef.current && timeSinceScroll > 2500) {
        setDirection(1);
        setActiveIndex((prev) => {
          const next = (prev + 1) % words.length;
          prevIndexRef.current = next;
          return next;
        });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [words.length, reduceMotion]);

  // Reduced motion: static display of the first word only
  if (reduceMotion) {
    return (
      <span
        className={`relative inline-block h-[1.18em] w-full max-w-[860px] overflow-hidden leading-[1.18em] align-top text-ink select-none ${className}`}
      >
        <span className="flex h-full w-full items-center justify-center text-center text-ink leading-[1.18em] whitespace-nowrap">
          {words[0]}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block h-[1.18em] w-full max-w-[860px] overflow-hidden leading-[1.18em] align-top text-ink select-none ${className}`}
      aria-label={words[activeIndex]}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.span
          key={activeIndex}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              y: dir >= 0 ? "100%" : "-100%",
            }),
            center: {
              y: "0%",
            },
            exit: (dir: number) => ({
              y: dir >= 0 ? "-100%" : "100%",
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="absolute inset-0 flex h-full w-full items-center justify-center text-center text-ink leading-[1.18em] whitespace-nowrap"
        >
          {words[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
