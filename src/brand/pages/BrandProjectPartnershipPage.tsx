import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  WalletCards,
  X,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectSteps,
  useProjectFlow,
  type ProjectPartnership,
} from "@/brand/context/ProjectFlowContext";
import {
  ProjectBreadcrumb,
  ProjectSetupSidebar,
  ProjectStepper,
} from "@/brand/components/ProjectWizardShared";

const partnershipOptions: {
  value: ProjectPartnership;
  description: string;
  hint?: string;
  icon: typeof WalletCards;
}[] = [
  {
    value: "Paid",
    icon: WalletCards,
    description:
      "You pay creators a fee from escrow. Money is held when you invite them and released after you approve.",
  },
  {
    value: "Gift exchange",
    icon: Gift,
    description: "Creators get your product in return for content. No fee, you ship the product.",
    hint: "Product value per creator · shipping",
  },
];

export function BrandProjectPartnershipPage() {
  const navigate = useNavigate();
  const { objective, projectType, partnership, setPartnership, duration } = useProjectFlow();
  const [saved, setSaved] = useState(false);
  const stepsCount = getProjectSteps(partnership).length;

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <ProjectBreadcrumb
              step="partnership"
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

        <ProjectStepper partnership={partnership} currentStepIndex={2} />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 3 OF {stepsCount}
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em]">
                Partnership
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {partnershipOptions.map((option) => {
                const selected = partnership === option.value;
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPartnership(option.value)}
                    className={
                      selected
                        ? "flex min-h-[171px] flex-col rounded-xl border-[1.5px] border-primary bg-primary-subtle p-[18px] text-left transition duration-200"
                        : "flex min-h-[171px] flex-col rounded-xl border border-line bg-white p-[18px] text-left transition duration-200 hover:border-line-strong"
                    }
                  >
                    <div className="flex w-full items-center gap-3">
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
                            ? "flex-1 text-[14px] font-semibold leading-5 text-primary"
                            : "flex-1 text-[14px] font-semibold leading-5"
                        }
                      >
                        {option.value}
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
                    {option.hint && (
                      <div className="mt-auto pt-3">
                        <span className="text-[12px] font-medium text-tertiary">{option.hint}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                onClick={() => navigate(ROUTES.brandNewProjectType)}
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <div className="flex-1" />
              <Button kind="ghost" onClick={() => setSaved(true)}>
                Save draft
              </Button>
              <Button
                onClick={() => navigate(ROUTES.brandNewProjectDuration)}
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
            stepIndex={2}
          />
        </div>
      </div>
    </BrandShell>
  );
}
