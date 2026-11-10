import { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/common/components/ui/Button";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { EASE_OUT } from "@/common/constants/motion";
import { MCP_DOC_SECTIONS } from "@/landing/data/mcpDocs";

function Contents() {
  const [active, setActive] = useState(MCP_DOC_SECTIONS[0]?.id ?? "");

  return (
    <aside className="lg:sticky lg:top-[104px] lg:self-start">
      <nav
        aria-label="On this page"
        className="rounded-2xl border border-line bg-[#f6f8fb] p-4 lg:w-[260px] lg:px-4 lg:py-5"
      >
        <p className="px-2 pb-1 font-inter-semibold text-[12px] font-semibold tracking-[0.72px] text-tertiary">
          ON THIS PAGE
        </p>
        <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1 lg:mx-0 lg:max-h-[calc(100dvh-150px)] lg:flex-col lg:overflow-y-auto lg:px-0">
          {MCP_DOC_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActive(section.id)}
              className={`shrink-0 rounded-lg px-2.5 py-2 font-inter-regular text-[13px] leading-5 transition-colors ${active === section.id ? "bg-white text-primary" : "text-neutral hover:bg-white/70 hover:text-ink"}`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function DocSection({ index }: { index: number }) {
  const section = MCP_DOC_SECTIONS[index]!;
  return (
    <Reveal amount={0.05}>
      <section id={section.id} className="scroll-mt-28 border-t border-line-subtle pt-7">
        <h2 className="font-inter-bold text-[22px] font-bold leading-[34px] tracking-[-0.11px] text-ink">
          {section.title}
        </h2>
        <div className="mt-2 space-y-0 text-[14px] leading-[27px] text-body">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {section.code && (
          <motion.pre
            className="mt-3 overflow-x-auto rounded-[10px] bg-[#0d1320] px-[18px] py-4 font-mono text-[13px] leading-[21px] text-primary-muted"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <code>{section.code}</code>
          </motion.pre>
        )}
      </section>
    </Reveal>
  );
}

/** Standalone MCP & API documentation page based on Figma WEB-02. Header and footer come from LandingLayout. */
export function McpDocsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#eef3ff] to-white">
        <Container className="py-14 sm:py-[72px] lg:pb-[48px]">
          <RevealGroup stagger={0.1} className="flex max-w-[760px] flex-col items-start gap-3">
            <RevealItem
              as="p"
              className="font-inter-semibold text-[12px] font-semibold tracking-[0.72px] text-primary"
            >
              DEVELOPERS
            </RevealItem>
            <RevealItem>
              <h1 className="font-inter-bold text-[38px] font-bold leading-tight tracking-[-1.5px] text-ink sm:text-[52px] sm:leading-[64px]">
                MCP &amp; API docs
              </h1>
            </RevealItem>
            <RevealItem as="p" className="text-[14px] leading-[22px] text-secondary">
              Connect Floooww to Claude, ChatGPT and other AI assistants with the MCP server, or to
              your own systems with the REST API and webhooks.
            </RevealItem>
            <RevealItem className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary-muted bg-white px-3 py-1.5 font-inter-medium text-[13px] font-medium text-primary">
                Version 1 · 8 November 2026
              </span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5 font-inter-medium text-[13px] font-medium text-neutral">
                15 min read
              </span>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16 lg:py-12 xl:gap-20 xl:pb-20">
        <Contents />
        <main className="min-w-0 space-y-7" aria-label="MCP and API documentation">
          {MCP_DOC_SECTIONS.map((_, index) => (
            <DocSection key={MCP_DOC_SECTIONS[index]!.id} index={index} />
          ))}
          <Reveal>
            <section className="flex flex-col gap-5 rounded-lg bg-subtle p-5 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h2 className="font-inter-semibold text-[14px] font-semibold leading-5 text-ink">
                  Questions about this page?
                </h2>
                <p className="text-[13px] leading-5 text-secondary">
                  Raise an enquiry and our team will reach out within two working days.
                </p>
              </div>
              <Button
                href="mailto:hello@floooww.com"
                kind="secondary"
                leadingIcon={<Mail size={16} strokeWidth={2} />}
              >
                Contact us
              </Button>
            </section>
          </Reveal>
        </main>
      </Container>
    </>
  );
}
