import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  Landmark,
  Megaphone,
  Package,
  Repeat2,
  Users,
  WalletCards,
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
  type ProjectPartnership,
} from "@/brand/context/ProjectFlowContext";

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
  const { partnership, duration, setDuration } = useProjectFlow();
  const [contractLength, setContractLength] = useState("3 months · 3 monthly cycles");
  const [saved, setSaved] = useState(false);

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] leading-4 text-tertiary">
              Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project
            </p>
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

        <ProjectStepper partnership={partnership} />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 3 OF {getProjectSteps(partnership).length}
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
                            : "flex-1 text-[14px] font-semibold leading-5 text-ink"
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
                    <p
                      className={
                        selected
                          ? "mt-auto pt-1.5 text-[12px] leading-4 text-primary"
                          : "mt-auto pt-1.5 text-[12px] leading-4 text-tertiary"
                      }
                    >
                      {option.hint}
                    </p>
                  </button>
                );
              })}
            </div>

            {duration === "Long-term" && (
              <div className="relative z-10 mt-5 focus-within:z-20">
                <p className="mb-1.5 text-[12px] font-medium leading-4 text-ink">Contract length</p>
                <Dropdown
                  ariaLabel="Contract length"
                  className="w-full"
                  onChange={setContractLength}
                  options={contractLengths}
                  value={contractLength}
                />
                <p className="mt-1.5 text-[12px] font-medium leading-4 text-secondary">
                  A cycle starts the day a creator accepts and runs to the same date next month. The
                  project ends on{" "}
                  {contractLength.startsWith("3")
                    ? "6 Jan 2027"
                    : contractLength.startsWith("1")
                      ? "6 Nov 2026"
                      : contractLength.startsWith("6")
                        ? "6 Apr 2027"
                        : "6 Oct 2027"}
                  .
                </p>
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
          <ProjectSetupSummary duration={duration} partnership={partnership} />
        </div>
      </div>
    </BrandShell>
  );
}

function ProjectStepper({ partnership }: { partnership: ProjectPartnership }) {
  const steps = getProjectSteps(partnership);
  return (
    <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4">
      <div className="flex min-w-[760px] items-start">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
            {index < 2 ? (
              <span className="flex size-7 items-center justify-center rounded-full bg-success text-white">
                <Check size={14} strokeWidth={2.5} />
              </span>
            ) : (
              <span
                className={
                  index === 2
                    ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white"
                    : "flex size-7 items-center justify-center rounded-full border border-line-strong bg-white text-[12px] font-medium text-tertiary"
                }
              >
                {index + 1}
              </span>
            )}
            <span
              className={
                index === 2
                  ? "text-[12px] font-medium leading-4 text-primary"
                  : index < 2
                    ? "text-[12px] leading-4 text-secondary"
                    : "text-[12px] leading-4 text-tertiary"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectSetupSummary({
  duration,
  partnership,
}: {
  duration: ProjectDuration;
  partnership: ProjectPartnership;
}) {
  const { projectType } = useProjectFlow();
  const details = [
    ["Target", "-"],
    ["Type", projectType],
    ["Partnership", partnership],
    ["Duration", duration],
  ];
  const upcoming = [
    ["Project details", FileText],
    ["Creator requirements", Users],
    ["Deliverables", Megaphone],
    ...(partnership === "Paid"
      ? [
          ["Budget", WalletCards],
          ["Payment method", Landmark],
        ]
      : []),
    ["Review & publish", CheckCircle2],
  ];
  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6">Project setup</h2>
      <p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p>
      <div className="mt-4 space-y-3">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 text-[13px] leading-5"
          >
            <span className="text-secondary">{label}</span>
            <span
              className={
                value === "-"
                  ? "font-medium text-tertiary"
                  : "text-[14px] font-medium leading-[22px] text-ink"
              }
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-line" />
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-ink">
          <CheckCircle2 size={16} className="text-success" />
          <span className="text-[13px] leading-5">Type</span>
        </div>
        <div className="flex items-center gap-2.5 text-ink">
          <CheckCircle2 size={16} className="text-success" />
          <span className="text-[13px] leading-5">Partnership</span>
        </div>
        <div className="flex items-center gap-2.5 text-primary">
          <CheckCircle2 size={16} className="text-success" />
          <span className="text-[14px] font-medium leading-[22px]">Duration</span>
        </div>
        {upcoming.map(([label, Icon]) => {
          const StepIcon = Icon as typeof Package;
          return (
            <div key={label} className="flex items-center gap-2.5 text-tertiary">
              <StepIcon size={16} />
              <span className="text-[13px] leading-5">{label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
