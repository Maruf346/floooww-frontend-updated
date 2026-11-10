import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { ROUTES } from "@/common/constants/routes";
import { LEGAL_DOCUMENTS } from "@/landing/data/legal";

type LegalPageKind = keyof typeof LEGAL_DOCUMENTS;

function LegalTabs({ active }: { active: LegalPageKind }) {
  const tabs: { kind: LegalPageKind; to: string; label: string }[] = [
    { kind: "terms", to: ROUTES.terms, label: "Terms of Service" },
    { kind: "privacy", to: ROUTES.privacy, label: "Privacy Policy" },
    { kind: "refunds", to: ROUTES.refunds, label: "Refund Policy" },
  ];
  return (
    <div
      aria-label="Legal pages"
      className="flex max-w-full gap-1.5 overflow-x-auto rounded-[14px] border border-line-subtle bg-white p-[5px]"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.kind}
          to={tab.to}
          className={`shrink-0 rounded-[10px] px-3.5 py-2.5 font-inter-medium text-[13px] font-medium transition-colors ${active === tab.kind ? "bg-ink text-white" : "text-neutral hover:bg-subtle hover:text-ink"}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

/** Shared legal-document layout for the three Figma legal pages. */
export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const document = LEGAL_DOCUMENTS[kind];
  const [active, setActive] = useState(document.sections[0]?.id ?? "");
  return (
    <>
      <section className="bg-gradient-to-b from-[#eef3ff] to-white">
        <Container className="py-14 sm:py-[72px] lg:pb-[48px]">
          <RevealGroup stagger={0.1} className="flex max-w-[760px] flex-col items-start gap-3">
            <RevealItem
              as="p"
              className="font-inter-semibold text-[12px] font-semibold tracking-[0.72px] text-primary"
            >
              {document.eyebrow}
            </RevealItem>
            <RevealItem>
              <h1 className="font-inter-bold text-[38px] font-bold leading-tight tracking-[-1.5px] text-ink sm:text-[52px] sm:leading-[64px]">
                {document.title}
              </h1>
            </RevealItem>
            <RevealItem as="p" className="text-[14px] leading-[22px] text-secondary">
              {document.description}
            </RevealItem>
            <RevealItem>
              <span className="rounded-full border border-primary-muted bg-white px-3 py-1.5 font-inter-medium text-[13px] font-medium text-primary">
                {document.updated}
              </span>
            </RevealItem>
            <RevealItem>
              <LegalTabs active={kind} />
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>
      <Container className="grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16 xl:gap-20 xl:pb-20">
        <aside className="lg:sticky lg:top-[104px] lg:self-start">
          <nav
            aria-label="On this page"
            className="rounded-2xl border border-line bg-[#f6f8fb] p-4 lg:w-[260px] lg:px-4 lg:py-5"
          >
            <p className="px-2 pb-1 font-inter-semibold text-[12px] font-semibold tracking-[0.72px] text-tertiary">
              ON THIS PAGE
            </p>
            <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1 lg:mx-0 lg:max-h-[calc(100dvh-150px)] lg:flex-col lg:overflow-y-auto lg:px-0">
              {document.sections.map((section) => (
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
        <main className="min-w-0 space-y-7" aria-label={document.title}>
          {document.sections.map((section) => (
            <Reveal key={section.id} amount={0.05}>
              <section id={section.id} className="scroll-mt-28 border-t border-line-subtle pt-7">
                <h2 className="font-inter-bold text-[22px] font-bold leading-[34px] tracking-[-0.11px] text-ink">
                  {section.title}
                </h2>
                <p className="mt-2 text-[14px] leading-[27px] text-body">{section.body}</p>
              </section>
            </Reveal>
          ))}
        </main>
      </Container>
    </>
  );
}
