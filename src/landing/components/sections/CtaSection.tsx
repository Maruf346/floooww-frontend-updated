import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { CTA_COPY } from "@/landing/data/blog";

/** Full-width conversion panel placed immediately before the footer. */
export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-[#2563eb] py-16 text-center sm:py-[72px]"
      style={{ backgroundImage: "linear-gradient(166.904deg, #7399f2 14.286%, #2563eb 85.714%)" }}
    >
      <motion.img
        aria-hidden="true"
        src={CTA_COPY.glow}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />
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
          className="max-w-[680px] text-[16px] leading-[27px] text-white/90 sm:text-[17px]"
        >
          {CTA_COPY.body}
        </RevealItem>
        <RevealItem className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.signup}
            className="rounded-[12px] bg-white px-[22px] py-[14px] font-inter-semibold text-[15px] font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            Join Floooww →
          </Link>
          <Link
            to={ROUTES.howItWorks}
            className="rounded-[12px] border border-white/60 px-[22px] py-[14px] font-inter-semibold text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            ▶ Watch demo
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
