import { useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "motion/react";
import { ScaledFrame } from "@/common/components/layout/ScaledFrame";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { scaleIn } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { LANDING_SECTIONS } from "@/landing/constants/sections";
import { SectionHeading } from "@/landing/components/shared/SectionHeading";
import { MCP_COPY } from "@/landing/data/mcp";
import { AssistantChatMock, MCP_CARD_HEIGHT, MCP_CARD_WIDTH } from "./AssistantChatMock";

/** Figma "MCP · works with your AI assistant" (2047:2991). */
export function McpSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const play = useInView(cardRef, { once: true, amount: 0.45 });

  return (
    <section
      id={LANDING_SECTIONS.mcp.id}
      aria-labelledby="mcp-title"
      className="bg-white pb-24 pt-20 lg:pb-[100px] lg:pt-[88px]"
    >
      <Container className="flex flex-col items-center">
        <SectionHeading
          id="mcp-title"
          title={MCP_COPY.title}
          description={MCP_COPY.description}
          className="max-w-[1022px]"
        />

        <div className="mt-12 grid w-full grid-cols-1 items-center gap-12 lg:mt-[56px] lg:grid-cols-[minmax(0,720px)_minmax(0,460px)] lg:justify-center xl:gap-[80px]">
          <Reveal variants={scaleIn} className="relative mx-auto w-full max-w-[720px]">
            <div ref={cardRef}>
              <ScaledFrame width={MCP_CARD_WIDTH} height={MCP_CARD_HEIGHT}>
                <AssistantChatMock play={play} />
              </ScaledFrame>
            </div>
          </Reveal>

          <RevealGroup
            stagger={0.09}
            className="mx-auto flex w-full max-w-[600px] flex-col items-start lg:max-w-[460px]"
          >
            <RevealItem
              as="p"
              className="font-inter-medium text-[13px] font-medium leading-normal text-secondary"
            >
              {MCP_COPY.assistants}
            </RevealItem>
            <RevealItem>
              <h3 className="mt-[18px] font-inter-bold text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-ink sm:text-[36px] sm:leading-[42px] sm:tracking-[-0.72px]">
                {MCP_COPY.featureTitle}
              </h3>
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-[18px] text-[16px] leading-[26px] text-neutral sm:text-[17px] sm:leading-[27px]"
            >
              {MCP_COPY.featureBody}
            </RevealItem>
            <RevealItem className="mt-6 flex w-full flex-col items-start gap-3">
              {MCP_COPY.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 leading-normal">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-subtle font-inter-bold text-[12px] font-bold text-ink">
                    {index + 1}
                  </span>
                  <p className="font-inter-medium text-[15px] font-medium text-ink">{step}</p>
                </div>
              ))}
            </RevealItem>
            <RevealItem className="mt-6">
              <Link
                to={`${ROUTES.signup}?role=brand`}
                className="group inline-flex items-center font-inter-semibold text-[14px] font-semibold leading-normal text-[#3B5BFF] transition-colors hover:text-[#2949e9]"
              >
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  {MCP_COPY.docs}
                </span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
