import { Marquee } from "@/common/components/motion/Marquee";
import { Reveal } from "@/common/components/motion/Reveal";
import { fadeIn } from "@/common/constants/motion";
import { BRAND_LOGOS, BRANDS_HEADING, type BrandLogo } from "@/landing/data/brands";

function BrandMark({ logo }: { logo: BrandLogo }) {
  if (logo.kind === "text") {
    return (
      <span
        className={`shrink-0 whitespace-nowrap leading-normal text-neutral opacity-55 transition-opacity duration-500 ease-out hover:opacity-100 ${logo.className}`}
      >
        {logo.text}
      </span>
    );
  }
  return (
    <img
      src={logo.src}
      alt={logo.name}
      width={logo.width}
      height={logo.height}
      draggable={false}
      className="block shrink-0 object-contain opacity-55 grayscale transition-[filter,opacity] duration-500 ease-out hover:opacity-100 hover:grayscale-0"
      style={{ width: logo.width, height: logo.height }}
    />
  );
}

/** Figma "Brands" (843:1170): continuous right-to-left logo loop with edge fades. */
export function TrustedBrandsSection() {
  return (
    <section
      aria-label="Trusted by leading brands"
      className="flex flex-col items-center gap-9 overflow-hidden bg-gradient-to-b from-warm to-white pb-12 pt-14"
    >
      <Reveal>
        <p className="px-5 text-center font-inter-semibold text-[12px] font-semibold leading-normal tracking-[1.68px] text-secondary">
          {BRANDS_HEADING}
        </p>
      </Reveal>

      {/* Edge fade as a mask (Figma "Fade" 200 px each side) so it blends into the warm gradient. */}
      <Reveal
        variants={fadeIn}
        delay={0.15}
        className="relative h-20 w-full overflow-hidden [--fade:64px] [mask-image:linear-gradient(to_right,transparent,#000_var(--fade),#000_calc(100%-var(--fade)),transparent)] sm:[--fade:128px] lg:[--fade:200px]"
      >
        <div className="absolute left-0 top-[13px]">
          <Marquee duration={38} gap={44}>
            {BRAND_LOGOS.map((logo) => (
              <BrandMark key={logo.name} logo={logo} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
