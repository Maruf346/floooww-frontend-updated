import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Repeat2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectSteps,
  useProjectFlow,
  type ProjectDuration,
} from "@/brand/context/ProjectFlowContext";
import {
  ProjectBreadcrumb,
  ProjectSetupSidebar,
  ProjectStepper,
} from "@/brand/components/ProjectWizardShared";

const durationOptions: {
  value: ProjectDuration;
  description: string;
  hint: string;
  icon: typeof CalendarDays;
}[] = [
  {
    value: "One-time",
    icon: CalendarDays,
    description: "A single round of content between two dates.",
    hint: "Progress to end date · projection",
  },
  {
    value: "Long-term",
    icon: Repeat2,
    description: "Monthly cycles with the same creators, content and payment repeat each month.",
    hint: "Contract length · cycle · renewal",
  },
];
const contractLengths = [
  "1 month · 1 monthly cycle",
  "3 months · 3 monthly cycles",
  "6 months · 6 monthly cycles",
  "12 months · 12 monthly cycles",
];

export function BrandProjectDurationPage() {
  const navigate = useNavigate();
  const { objective, projectType, partnership, duration, setDuration } = useProjectFlow();
  const [contractLength, setContractLength] = useState("3 months · 3 monthly cycles");
  const [saved, setSaved] = useState(false);
  const stepsCount = getProjectSteps(partnership).length;

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <ProjectBreadcrumb
              step="duration"
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

        <ProjectStepper partnership={partnership} currentStepIndex={3} />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 4 OF {stepsCount}
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em]">
                Duration
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {durationOptions.map((option) => {
                const selected = option.value === duration;
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDuration(option.value)}
                    className={
                      selected
                        ? "flex min-h-[130px] flex-col rounded-xl border-[1.5px] border-primary bg-primary-subtle p-[18px] text-left transition duration-200"
                        : "flex min-h-[130px] flex-col rounded-xl border border-line bg-white p-[18px] text-left transition duration-200 hover:border-line-strong"
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
                    <div className="mt-auto pt-3">
                      <span className="text-[12px] font-medium text-tertiary">{option.hint}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {duration === "Long-term" && (
              <div className="mt-5 rounded-lg border border-line bg-subtle p-4">
                <label className="text-[13px] font-medium leading-5">Contract length</label>
                <div className="mt-2">
                  <Dropdown
                    value={contractLength}
                    values={contractLengths}
                    onChange={setContractLength}
                  />
                </div>
              </div>
            )}

            <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                onClick={() => navigate(ROUTES.brandNewProjectPartnership)}
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <div className="flex-1" />
              <Button kind="ghost" onClick={() => setSaved(true)}>
                Save draft
              </Button>
              <Button
                onClick={() => navigate(ROUTES.brandNewProjectDetails)}
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
            stepIndex={3}
          />
        </div>
      </div>
    </BrandShell>
  );
}
