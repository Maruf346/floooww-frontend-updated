import { useLocation } from "react-router-dom";
import { NotFoundPage } from "@/common/pages/NotFoundPage";
import { LANDING_PATHS } from "@/landing/constants/sections";
import { FaqSection } from "@/landing/components/sections/FaqSection";
import { StatsSection } from "@/landing/components/sections/StatsSection";
import { TrustedBrandsSection } from "@/landing/components/sections/TrustedBrandsSection";
import { CreatorsSection } from "@/landing/components/sections/creators/CreatorsSection";
import { HeroSection } from "@/landing/components/sections/hero/HeroSection";
import { HowItWorksSection } from "@/landing/components/sections/howItWorks/HowItWorksSection";
import { McpSection } from "@/landing/components/sections/mcp/McpSection";
import { WhyFlooowwSection } from "@/landing/components/sections/whyFloooww/WhyFlooowwSection";
import { useLandingSectionRouting } from "@/landing/hooks/useLandingSectionRouting";

/** WEB-01 · Homepage. Sections render in Figma order. */
export function LandingPage() {
  const { pathname } = useLocation();
  if (!LANDING_PATHS.includes(pathname)) return <NotFoundPage />;
  return <LandingSections />;
}

function LandingSections() {
  useLandingSectionRouting();

  return (
    <>
      <HeroSection />
      <TrustedBrandsSection />
      <StatsSection />
      <HowItWorksSection />
      <WhyFlooowwSection />
      <CreatorsSection />
      <McpSection />
      <FaqSection />
    </>
  );
}
