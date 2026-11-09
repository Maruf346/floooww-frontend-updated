import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, Mail, Plus } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { cn } from "@/common/utils/cn";
import { LANDING_SECTIONS } from "@/landing/constants/sections";
import {
  FAQ_CATEGORIES,
  FAQ_COPY,
  FAQ_ITEMS,
  type FaqCategory,
  type FaqItem,
} from "@/landing/data/faq";

function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <div className="border-b border-line-subtle">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-5 text-left sm:py-6"
        >
          <span
            className={cn(
              "flex-1 font-inter-semibold text-[16px] font-semibold leading-6 transition-colors duration-300 sm:text-[17px]",
              open ? "text-ink" : "text-heading-2 group-hover:text-primary",
            )}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-300",
              open
                ? "border-primary bg-primary text-white"
                : "border-line bg-white text-icon group-hover:border-line-strong",
            )}
          >
            <Plus
              size={16}
              strokeWidth={2}
              className={cn(
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open && "rotate-45",
              )}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: EASE_OUT },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <p className="max-w-[640px] pb-6 pr-12 text-[15px] leading-6 text-body">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** FAQ: left column stays pinned while the questions scroll past. */
export function FaqSection() {
  const [category, setCategory] = useState<FaqCategory>("All");
  const items = useMemo(
    () => (category === "All" ? FAQ_ITEMS : FAQ_ITEMS.filter((item) => item.category === category)),
    [category],
  );
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const selectCategory = (next: FaqCategory) => {
    setCategory(next);
    const first = next === "All" ? FAQ_ITEMS[0] : FAQ_ITEMS.find((item) => item.category === next);
    setOpenId(first?.id ?? null);
  };

  return (
    <section
      id={LANDING_SECTIONS.faq.id}
      aria-labelledby="faq-title"
      className="bg-white py-20 sm:py-24 lg:py-[120px]"
    >
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-20 xl:gap-28">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <RevealGroup stagger={0.1}>
            <RevealItem
              as="p"
              className="font-inter-semibold text-[12px] font-semibold uppercase leading-4 tracking-[1.68px] text-primary"
            >
              {FAQ_COPY.eyebrow}
            </RevealItem>
            <RevealItem>
              <h2
                id="faq-title"
                className="mt-4 font-inter-bold text-[32px] font-bold leading-10 tracking-[-0.64px] text-ink sm:text-[40px] sm:leading-[48px] sm:tracking-[-0.8px]"
              >
                {FAQ_COPY.title}
              </h2>
            </RevealItem>
            <RevealItem as="p" className="mt-4 text-[16px] leading-[26px] text-body">
              {FAQ_COPY.description}
            </RevealItem>
            <RevealItem className="mt-8 rounded-lg border border-line bg-subtle p-5">
              <p className="font-inter-semibold text-[16px] font-semibold leading-6 text-ink">
                {FAQ_COPY.contactTitle}
              </p>
              <p className="mt-1 text-[14px] leading-[22px] text-body">{FAQ_COPY.contactBody}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  href={`mailto:${FAQ_COPY.contactEmail}`}
                  kind="secondary"
                  leadingIcon={<Mail size={16} strokeWidth={2} />}
                >
                  {FAQ_COPY.contactCta}
                </Button>
                <Button
                  to={ROUTES.signup}
                  kind="primary"
                  trailingIcon={<ArrowRight size={16} strokeWidth={2} />}
                >
                  Sign up free
                </Button>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>

        <div className="min-w-0">
          <Reveal>
            <LayoutGroup id="faq-tabs">
              <div
                role="tablist"
                aria-label="FAQ topics"
                className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
              >
                {FAQ_CATEGORIES.map((option) => {
                  const active = option === category;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectCategory(option)}
                      className={cn(
                        "relative shrink-0 rounded-full px-4 py-2 font-inter-medium text-[14px] font-medium leading-5 transition-colors duration-300",
                        active ? "text-white" : "text-body hover:text-ink",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="faq-tab-pill"
                          className="absolute inset-0 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        />
                      )}
                      <span className="relative">{option}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>

          <RevealGroup
            key={category}
            stagger={0.06}
            amount={0.1}
            className="mt-4 border-t border-line-subtle"
          >
            {items.map((item) => (
              <RevealItem key={item.id}>
                <FaqRow
                  item={item}
                  open={openId === item.id}
                  onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
