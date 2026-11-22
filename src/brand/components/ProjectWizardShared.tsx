import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Landmark,
  Megaphone,
  Target,
  Users,
  WalletCards,
} from "lucide-react";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectDurationLabel,
  getProjectSteps,
  targetByObjective,
  type ProjectDuration,
  type ProjectObjective,
  type ProjectPartnership,
  type ProjectType,
} from "@/brand/context/ProjectFlowContext";

export function ProjectBreadcrumb({
  objective,
  projectType,
  partnership,
  duration,
  step,
}: {
  objective?: ProjectObjective;
  projectType?: ProjectType;
  partnership?: ProjectPartnership;
  duration?: ProjectDuration;
  step:
    | "objective"
    | "type"
    | "partnership"
    | "duration"
    | "details"
    | "creators"
    | "deliverables"
    | "budget"
    | "payment"
    | "review";
}) {
  const items: { label: string; to?: string }[] = [
    { label: "Projects", to: ROUTES.brandProjects },
    { label: "Campaign", to: ROUTES.brandNewProject },
  ];

  if (step !== "objective" && objective) {
    items.push({ label: objective, to: ROUTES.brandNewProject });
  }
  if (step !== "objective" && step !== "type" && projectType) {
    items.push({ label: projectType, to: ROUTES.brandNewProjectType });
  }
  if (step !== "objective" && step !== "type" && step !== "partnership" && partnership) {
    items.push({ label: partnership, to: ROUTES.brandNewProjectPartnership });
  }
  if (
    step !== "objective" &&
    step !== "type" &&
    step !== "partnership" &&
    step !== "duration" &&
    duration
  ) {
    items.push({ label: duration, to: ROUTES.brandNewProjectDuration });
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] leading-4 text-tertiary">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span className="text-line-strong">/</span>}
            {item.to && !isLast ? (
              <Link to={item.to} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-secondary" : ""}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function ProjectStepper({
  partnership,
  currentStepIndex,
}: {
  partnership: ProjectPartnership;
  currentStepIndex: number;
}) {
  const steps = getProjectSteps(partnership);
  return (
    <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4">
      <div className="flex min-w-[760px] items-start">
        {steps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isPast = index < currentStepIndex;
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={
                  isCurrent
                    ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white"
                    : isPast
                      ? "flex size-7 items-center justify-center rounded-full bg-success text-[12px] font-medium text-white"
                      : "flex size-7 items-center justify-center rounded-full border border-line-strong bg-white text-[12px] font-medium text-tertiary"
                }
              >
                {isPast ? <Check size={14} strokeWidth={2.5} /> : index + 1}
              </span>
              <span
                className={
                  isCurrent
                    ? "text-[12px] font-medium leading-4 text-primary"
                    : isPast
                      ? "text-[12px] font-medium leading-4 text-ink"
                      : "text-[12px] leading-4 text-tertiary"
                }
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ProjectSetupSidebar({
  objective,
  projectType,
  partnership,
  duration,
  stepIndex,
}: {
  objective: ProjectObjective;
  projectType: ProjectType;
  partnership: ProjectPartnership;
  duration: ProjectDuration;
  stepIndex: number;
}) {
  const isAfterObjective = stepIndex > 0;
  const isAfterType = stepIndex > 1;
  const isAfterPartnership = stepIndex > 2;

  const details = [
    ["Objective", objective],
    ["Target", targetByObjective[objective]],
    ["Type", isAfterObjective ? projectType : "-"],
    ["Partnership", isAfterType ? partnership : "-"],
    ["Duration", isAfterPartnership ? getProjectDurationLabel(partnership, duration) : "-"],
  ];

  const allStepLabels =
    partnership === "Gift exchange"
      ? [
          { label: "Objective", icon: Target },
          { label: "Type", icon: Users },
          { label: "Partnership", icon: Users },
          { label: "Duration", icon: Clock3 },
          { label: "Project details", icon: FileText },
          { label: "Creator requirements", icon: Users },
          { label: "Deliverables", icon: Megaphone },
          { label: "Review & publish", icon: CheckCircle2 },
        ]
      : [
          { label: "Objective", icon: Target },
          { label: "Type", icon: Users },
          { label: "Partnership", icon: Users },
          { label: "Duration", icon: Clock3 },
          { label: "Project details", icon: FileText },
          { label: "Creator requirements", icon: Users },
          { label: "Deliverables", icon: Megaphone },
          { label: "Budget", icon: WalletCards },
          { label: "Payment method", icon: Landmark },
          { label: "Review & publish", icon: CheckCircle2 },
        ];

  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6">Project setup</h2>
      <p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p>
      <div className="mt-4 space-y-3">
        {details.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 text-[13px] leading-5">
            <span className="text-secondary">{label}</span>
            <span
              className={
                value === "-"
                  ? "font-medium text-tertiary"
                  : "text-[14px] font-medium leading-[22px]"
              }
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-line" />
      <div className="space-y-3">
        {allStepLabels.map(({ label, icon: Icon }, idx) => {
          if (idx < stepIndex) {
            return (
              <div key={label} className="flex items-center gap-2.5 text-primary">
                <CheckCircle2 size={16} className="text-success" />
                <span className="text-[13px] font-medium leading-5 text-ink">{label}</span>
              </div>
            );
          }
          if (idx === stepIndex) {
            return (
              <div key={label} className="flex items-center gap-2.5 text-primary">
                <Icon size={16} />
                <span className="text-[14px] font-medium leading-[22px]">{label}</span>
              </div>
            );
          }
          return (
            <div key={label} className="flex items-center gap-2.5 text-tertiary">
              <Icon size={16} />
              <span className="text-[13px] leading-5">{label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
