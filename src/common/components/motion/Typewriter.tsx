import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TypewriterProps {
  words: readonly string[];
  /** ms per character while typing. */
  typeSpeed?: number;
  /** ms per character while deleting. */
  deleteSpeed?: number;
  /** ms a finished word stays on screen. */
  holdTime?: number;
  /** ms pause on empty before the next word. */
  gapTime?: number;
  startDelay?: number;
  className?: string;
}

type Phase = "typing" | "holding" | "deleting";

/** Types each word letter by letter, deletes it, then moves on. No cursor, loops forever. */
export function Typewriter({
  words,
  typeSpeed = 95,
  deleteSpeed = 45,
  holdTime = 2000,
  gapTime = 350,
  startDelay = 700,
  className,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [started, setStarted] = useState(false);

  const word = words[wordIndex % words.length] ?? "";

  useEffect(() => {
    const timer = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (reduceMotion) {
      setLength(word.length);
      const timer = window.setTimeout(
        () => setWordIndex((index) => (index + 1) % words.length),
        holdTime + 1000,
      );
      return () => window.clearTimeout(timer);
    }

    let timer: number;
    if (phase === "typing") {
      if (length < word.length) timer = window.setTimeout(() => setLength(length + 1), typeSpeed);
      else timer = window.setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), holdTime);
    } else if (length > 0) {
      timer = window.setTimeout(() => setLength(length - 1), deleteSpeed);
    } else {
      timer = window.setTimeout(() => {
        setWordIndex((index) => (index + 1) % words.length);
        setPhase("typing");
      }, gapTime);
    }
    return () => window.clearTimeout(timer);
  }, [
    started,
    phase,
    length,
    word,
    words.length,
    typeSpeed,
    deleteSpeed,
    holdTime,
    gapTime,
    reduceMotion,
  ]);

  return (
    <span className={className} aria-hidden="true">
      {word.slice(0, length)}
      {/* Zero-width space keeps the line box (and gradient) stable while empty. */}
      {"\u200b"}
    </span>
  );
}
