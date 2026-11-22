import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Compass,
  Eye,
  MessageSquare,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectSteps,
  useProjectFlow,
  type ProjectObjective,
} from "@/brand/context/ProjectFlowContext";
import {
  ProjectBreadcrumb,
  ProjectSetupSidebar,
  ProjectStepper,
} from "@/brand/components/ProjectWizardShared";

const objectiveOptions: {
  value: ProjectObjective;
  title: string;
  description: string;
  target: string;
  icon: typeof Eye;
}[] = [
  {
    value: "Awareness",
    title: "Awareness",
    description: "Maximize reach and video views to introduce your brand to new consumers.",
    target: "Target: 12 L reach · Views & impressions",
    icon: Eye,
  },
  {
    value: "Engagement",
    title: "Engagement",
    description: "Drive likes, comments, shares, saves and active conversation around your product.",
    target: "Target: 48,000 engagements · ER & saves",
    icon: MessageSquare,
  },
  {
    value: "Traffic",
    title: "Traffic",
    description: "Send high-intent visitors directly to your website, product page or store.",
    target: "Target: 18,000 sessions · UTM links + GA4",
    icon: Compass,
  },
  {
    value: "Lead generation",
    title: "Lead generation",
    description: "Collect qualified leads, email subscribers, quiz completions or form entries.",
    target: "Target: 1,200 leads · Quiz form + UTM",
    icon: Users,
  },
  {
    value: "Sales",
    title: "Sales",
    description: "Drive orders, attributable revenue and GMV with creator promo codes and tracking links.",
    target: "Target: ₹6,00,000 net sales · Shopify tracking",
    icon: ShoppingBag,
  },
];

export function BrandProjectObjectivePage() {
  const navigate = useNavigate();
  const { objective, setObjective, projectType, partnership, duration } = useProjectFlow();
  const [saved, setSaved] = useState(false);
  const stepsCount = getProjectSteps(partnership).length;

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <ProjectBreadcrumb
              step="objective"
              objective={objective}
              projectType={projectType}
              partnership={partnership}
              duration={duration}
            />
            <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em]">
              Create new project
            </h1>
            <p className="text-[13px] leading-5 text-secondary">
              {saved ? "Draft saved just now" : "Saved as a draft automatically"}
            </p>
          </div>
          <Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>
            Exit
          </Button>
        </header>

        <ProjectStepper partnership={partnership} currentStepIndex={0} />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 1 OF {stepsCount}
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em]">
                Project objective
              </h2>
              <p className="mt-1.5 text-[14px] leading-[22px] text-secondary">
                What is the primary goal for this project? This sets your target metrics and dashboard view.
              </p>
            </div>

            <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {objectiveOptions.map((option) => {
                const selected = option.value === objective;
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setObjective(option.value)}
                    className={
                      selected
                        ? "flex min-h-[140px] flex-col justify-between rounded-xl border-[1.5px] border-primary bg-primary-subtle p-[18px] text-left transition duration-200"
                        : "flex min-h-[140px] flex-col justify-between rounded-xl border border-line bg-white p-[18px] text-left transition duration-200 hover:border-line-strong"
                    }
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            selected
                              ? "flex size-9 items-center justify-center rounded-md bg-primary text-white"
                              : "flex size-9 items-center justify-center rounded-md bg-subtle text-ink"
                          }
                        >
                          <Icon size={18} />
                        </span>
                        <span
                          className={
                            selected
                              ? "flex-1 text-[15px] font-semibold leading-5 text-primary"
                              : "flex-1 text-[15px] font-semibold leading-5"
                          }
                        >
                          {option.title}
                        </span>
                        {selected ? (
                          <CheckCircle2 size={18} className="text-primary" />
                        ) : (
                          <Circle size={18} className="text-tertiary" />
                        )}
                      </div>
                      <p className="mt-2.5 text-[13px] leading-5 text-secondary">
                        {option.description}
                      </p>
                    </div>
                    <div className="mt-3 border-t border-line-subtle pt-2.5">
                      <span className="text-[12px] font-medium text-tertiary">{option.target}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <footer className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                onClick={() => navigate(ROUTES.brand)}
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <div className="flex-1" />
              <Button kind="ghost" onClick={() => setSaved(true)}>
                Save draft
              </Button>
              <Button
                onClick={() => navigate(ROUTES.brandNewProjectType)}
                trailingIcon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </footer>
          </motion.section>
          <ProjectSetupSidebar
            objective={objective}
            projectType={projectType}
            partnership={partnership}
            duration={duration}
            stepIndex={0}
          />
        </div>
      </div>
    </BrandShell>
  );
}
