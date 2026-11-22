import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface HeroWordRollerProps {
  words: readonly string[];
  className?: string;
}

/**
 * Dev spec · Hero headline: words roll, never type (Figma 2392:2612 & 895:2524).
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
  const [isTransitioning, setIsTransitioning] = useState(true);

  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  // Reel items: 0: budget, 1: audience, 2: goal, 3: next launch, 4: budget (for seamless infinite loop)
  const reelWords = [...words, words[0]!];
  const totalItems = reelWords.length;

  // Scroll-driven roller: maps first ~400px of page scroll to the 4 words
  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      isScrollingRef.current = true;
      lastScrollTimeRef.current = Date.now();
      setIsTransitioning(true);

      // Step of 100px per word up to 300px+ for the last word
      const step = 100;
      const targetIndex = Math.max(
        0,
        Math.min(words.length - 1, Math.floor(scrollY / step))
      );

      setActiveIndex(targetIndex);

      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
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
        setIsTransitioning(true);
        setActiveIndex((prev) => prev + 1);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  // When auto-roll reaches the clone at the end (index = words.length),
  // wait for the transition animation to complete (400ms), then instantly snap to index 0.
  useEffect(() => {
    if (activeIndex >= words.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(0);
      }, 420);

      return () => clearTimeout(timer);
    }
  }, [activeIndex, words.length]);

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

  // Active word index for accessibility
  const currentAccessibleWord = words[activeIndex % words.length] ?? words[0];

  return (
    <span
      className={`relative inline-block h-[1.18em] w-full max-w-[860px] overflow-hidden leading-[1.18em] align-top text-ink select-none ${className}`}
      aria-label={currentAccessibleWord}
    >
      <div
        className="flex flex-col items-center w-full will-change-transform"
        style={{
          transform: `translate3d(0, -${(activeIndex * 100) / totalItems}%, 0)`,
          transition: isTransitioning
            ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      >
        {reelWords.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="flex h-[1.18em] w-full shrink-0 items-center justify-center text-center text-ink leading-[1.18em] whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </div>
    </span>
  );
}
