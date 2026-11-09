import { useRef } from "react";
import { useElementWidth } from "@/common/hooks/useElementWidth";
import { useHeroPointer } from "@/landing/hooks/useHeroPointer";
import { HeroCopy } from "./HeroCopy";
import { HeroFloatingCards } from "./HeroFloatingCards";
import { HeroNetwork } from "./HeroNetwork";

/** Figma "Hero · animated" (895:2524): 760 px tall at desktop, #F3F5F7 → white. */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const width = useElementWidth(sectionRef);
  const pointer = useHeroPointer(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-subtle to-white"
    >
      <HeroNetwork width={width} />
      <HeroFloatingCards width={width} pointer={pointer} />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-5 pb-[120px] pt-[112px] sm:pb-[140px] sm:pt-[132px] xl:h-[760px] xl:px-0 xl:pb-0 xl:pt-24">
        <HeroCopy />
      </div>
    </section>
  );
}
