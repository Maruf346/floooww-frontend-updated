import { Link } from "react-router-dom";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { ROUTES } from "@/common/constants/routes";
import { CTA_COPY } from "@/landing/data/blog";

/** Full-width conversion panel placed immediately before the footer. */
export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-[#070b13] py-16 text-center sm:py-[72px]"
    >
      <RevealGroup
        stagger={0.12}
        className="relative mx-auto flex max-w-[760px] flex-col items-center gap-[18px] px-5 sm:px-8"
      >
        <RevealItem>
          <h2
            id="cta-title"
            className="font-inter-extrabold text-[32px] font-extrabold tracking-[-0.88px] text-white sm:text-[44px]"
          >
            {CTA_COPY.title}
          </h2>
        </RevealItem>
        <RevealItem
          as="p"
          className="max-w-[680px] text-[16px] leading-[27px] text-white/80 sm:text-[17px]"
        >
          {CTA_COPY.body}
        </RevealItem>
        <RevealItem className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.signup}
            className="rounded-[12px] bg-[#3B5BFF] px-[22px] py-[14px] font-inter-semibold text-[15px] font-semibold text-white transition-all hover:bg-[#2a4be6] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(59,91,255,0.25)]"
          >
            Join Kreyio →
          </Link>
          <Link
            to={ROUTES.howItWorks}
            className="rounded-[12px] border border-white/20 bg-white/5 px-[22px] py-[14px] font-inter-semibold text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            ▶ Watch demo
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
