import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface HeroWordRollerProps {
  words: readonly string[];
  className?: string;
}

/**
 * Dev spec · Hero headline: words roll, never type.
 * The second headline line is a roller: whole words slide up/down, driven by scroll.
 * The rotating word is near-black, not a blue gradient.
 */
export function HeroWordRoller({ words, className = "" }: HeroWordRollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isScrollingRef = useRef(false);

  // Scroll-driven roller: whole words slide up/down as the user scrolls
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      isScrollingRef.current = true;

      // Range for hero scroll transitions: 0px to 320px
      // 0 - 80px: word 0 ("your budget.")
      // 80 - 160px: word 1 ("your audience.")
      // 160 - 240px: word 2 ("your goal.")
      // 240px+: word 3 ("your next launch.")
      const step = 80;
      const targetIndex = Math.max(0, Math.min(words.length - 1, Math.floor(scrollY / step)));
      setActiveIndex(targetIndex);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [words.length]);

  // Idle roll: gently rolls through whole words when at the top of the page
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      if (window.scrollY < 20 && !isScrollingRef.current) {
        setActiveIndex((prev) => (prev + 1) % words.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length, reduceMotion]);

  return (
    <span
      className={`relative inline-block h-[1.18em] w-full max-w-[860px] overflow-hidden leading-[1.18em] align-top text-ink select-none ${className}`}
      aria-label={words[activeIndex]}
    >
      <motion.span
        className="flex flex-col items-center w-full"
        animate={{ y: `-${activeIndex * 100}%` }}
        transition={
          reduceMotion
            ? { duration: 0.1 }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {words.map((word) => (
          <span
            key={word}
            className="flex h-[1.18em] w-full items-center justify-center text-center text-ink leading-[1.18em] whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
