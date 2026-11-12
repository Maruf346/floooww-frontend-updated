import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/common/components/ui/Button";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";

type WebErrorKind = "not-found" | "server-error" | "maintenance";

interface WebErrorPageProps {
  kind: WebErrorKind;
}

const CONTENT: Record<
  WebErrorKind,
  {
    code?: "404" | "500";
    title: string;
    description: string;
    reference: string;
  }
> = {
  "not-found": {
    code: "404",
    title: "This page has moved on.",
    description:
      "The link may be broken, or the page may have been removed. Let’s get you back on track.",
    reference: "404-7M3P",
  },
  "server-error": {
    code: "500",
    title: "Something went wrong on our side.",
    description:
      "We’re already looking into it. Please try again in a moment. Your projects and payments are safe.",
    reference: "500-8K2D",
  },
  maintenance: {
    title: "We’re making Floooww better.",
    description:
      "Floooww is down for scheduled maintenance. Money held in escrow and scheduled payouts are not affected.",
    reference: "503-2J9M",
  },
};

/** Public WEB-E1 through WEB-E3 states, rendered inside the standard marketing shell. */
export function WebErrorPage({ kind }: WebErrorPageProps) {
  const content = CONTENT[kind];
  const isMaintenance = kind === "maintenance";
  const isNotFound = kind === "not-found";

  return (
    <section className="flex min-h-[calc(100dvh-80px)] items-start justify-center bg-gradient-to-b from-[#eef3ff] to-white px-5 py-20 sm:px-8 sm:py-[120px] lg:px-[120px] lg:pb-[140px]">
      <motion.div
        className="flex w-full max-w-[760px] flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        {isMaintenance ? (
          <p className="rounded-full border border-[#dee8fe] bg-white px-3.5 py-1.5 text-[13px] font-semibold leading-5 text-ink">
            Maintenance in progress · back by 2:00 am IST
          </p>
        ) : (
          <p className="bg-gradient-to-r from-primary to-[#7399f2] bg-clip-text font-inter-bold text-[clamp(112px,18vw,160px)] font-bold leading-none tracking-[-0.05em] text-transparent">
            {content.code}
          </p>
        )}

        <h1 className="max-w-[760px] font-inter-bold text-[clamp(32px,4vw,44px)] font-bold leading-[1.18] tracking-[-0.032em] text-ink">
          {content.title}
        </h1>
        <p className="max-w-[600px] text-[18px] leading-7 text-body">{content.description}</p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {isNotFound ? (
            <Button
              to={ROUTES.home}
              className="h-auto rounded-xl px-6 py-3.5 text-[15px] font-semibold leading-[23px]"
            >
              Go to homepage
            </Button>
          ) : isMaintenance ? (
            <Button
              href="https://status.floooww.com"
              className="h-auto rounded-xl px-6 py-3.5 text-[15px] font-semibold leading-[23px]"
            >
              Check status
            </Button>
          ) : (
            <Button
              onClick={() => window.location.reload()}
              className="h-auto rounded-xl px-6 py-3.5 text-[15px] font-semibold leading-[23px]"
            >
              Try again
            </Button>
          )}
          {isMaintenance ? (
            <Button
              to={ROUTES.enquiry}
              kind="secondary"
              className="h-auto rounded-xl border-[#d4d7df] px-6 py-3.5 text-[15px] font-semibold leading-[23px]"
            >
              Contact us
            </Button>
          ) : isNotFound ? (
            <Button
              to={ROUTES.enquiry}
              kind="secondary"
              className="h-auto rounded-xl border-[#d4d7df] px-6 py-3.5 text-[15px] font-semibold leading-[23px]"
            >
              Contact us
            </Button>
          ) : (
            <Button
              to={ROUTES.home}
              kind="secondary"
              className="h-auto rounded-xl border-[#d4d7df] px-6 py-3.5 text-[15px] font-semibold leading-[23px]"
            >
              Go to homepage
            </Button>
          )}
        </div>

        {isNotFound ? (
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 text-[14px] leading-[21px]">
            <span className="text-secondary">Or try:</span>
            <Link className="font-semibold text-primary hover:text-primary-hover" to={ROUTES.home}>
              Blog →
            </Link>
            <Link className="font-semibold text-primary hover:text-primary-hover" to={ROUTES.faq}>
              FAQ →
            </Link>
            <Link className="font-semibold text-primary hover:text-primary-hover" to={ROUTES.help}>
              Help Centre →
            </Link>
          </div>
        ) : null}

        <p className="text-[13px] leading-5 text-tertiary">
          Error reference: {content.reference} · share this if you contact us
        </p>
      </motion.div>
    </section>
  );
}
