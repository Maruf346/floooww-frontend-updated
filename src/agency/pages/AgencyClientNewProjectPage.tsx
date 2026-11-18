import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  FileText,
  Gift,
  Landmark,
  Megaphone,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AgencyClientShell } from "../components/AgencyClientShell";
import { AGENCY_CLIENTS } from "../components/AgencyWorkspaceSwitcher";
import { ROUTES, agencyClientRoute } from "@/common/constants/routes";
import { Button } from "@/common/components/ui/Button";

export type ProjectType = "UGC" | "Influencer marketing";
export type ProjectPartnership = "Paid" | "Gift exchange";
export type ProjectDuration = "One-time" | "Long-term";

const STEPS = [
  "Type",
  "Partnership",
  "Duration",
  "Details",
  "Creators",
  "Deliverables",
  "Budget",
  "Payment",
  "Review",
];

const TYPE_OPTIONS: {
  value: ProjectType;
  title: string;
  description: string;
  icon: typeof Camera;
}[] = [
  {
    value: "UGC",
    title: "UGC",
    description:
      "Creators make photos and videos for you to post or use in ads. No posting on their channels.",
    icon: Camera,
  },
  {
    value: "Influencer marketing",
    title: "Influencer marketing",
    description: "Creators post on their own Instagram, YouTube, Snapchat or Pinterest.",
    icon: Users,
  },
];

const PARTNERSHIP_OPTIONS: {
  value: ProjectPartnership;
  title: string;
  description: string;
  icon: typeof WalletCards;
}[] = [
  {
    value: "Paid",
    title: "Paid",
    description:
      "You pay creators a fee from escrow. Money is held when you invite them and released after you approve.",
    icon: WalletCards,
  },
  {
    value: "Gift exchange",
    title: "Gift exchange",
    description: "Creators get your product in return for content. No fee, you ship the product.",
    icon: Gift,
  },
];

const DURATION_OPTIONS: {
  value: ProjectDuration;
  title: string;
  description: string;
  icon: typeof Clock3;
}[] = [
  {
    value: "One-time",
    title: "One-time",
    description: "Single campaign with fixed deliverables, run once over 30 to 60 days.",
    icon: Clock3,
  },
  {
    value: "Long-term",
    title: "Long-term",
    description: "Ongoing partnership renewed monthly or quarterly with retainer milestones.",
    icon: Clock3,
  },
];

export function AgencyClientNewProjectPage() {
  const params = useParams<{ clientId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clientId = params.clientId || searchParams.get("client") || "minimalist";
  const activeClient =
    AGENCY_CLIENTS.find((c) => c.id === clientId) || {
      id: clientId,
      name: clientId.charAt(0).toUpperCase() + clientId.slice(1),
    };

  // State for Step 1 (F1 · 1716:6626) and subsequent steps
  const initialType = searchParams.get("type") === "influencer" ? "Influencer marketing" : "UGC";
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Type (Figma 1716:6626)
  const [projectType, setProjectType] = useState<ProjectType>(initialType);
  const [partnership, setPartnership] = useState<ProjectPartnership>("Paid");
  const [duration, setDuration] = useState<ProjectDuration>("One-time");
  const [saved, setSaved] = useState(false);

  const handleExit = () => {
    navigate(agencyClientRoute(clientId));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate(agencyClientRoute(clientId));
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate(agencyClientRoute(clientId));
    }
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AgencyClientShell activeClientId={clientId}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-16">
        {/* Page Header (Figma 1716:6631) */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-normal leading-4 text-[#71717a]">
              Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project
            </p>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
              Create new project
            </h1>
            <p className="text-[13px] leading-5 text-[#71717a]">
              {saved ? "Draft saved just now" : "Saved as a draft automatically"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExit}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <X size={16} />
            <span>Exit</span>
          </button>
        </header>

        {/* Stepper (Figma 1716:6639) */}
        <section className="overflow-x-auto rounded-xl border border-[#e3e5ec] bg-white px-5 py-4 shadow-xs">
          <div className="flex min-w-[760px] items-start justify-between">
            {STEPS.map((step, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step}
                  className="flex flex-1 flex-col items-center gap-1.5 cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                >
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[12px] font-medium transition-colors ${
                      isCurrent
                        ? "bg-[#0d0d10] text-white"
                        : isCompleted
                          ? "bg-[#dee8fe] text-[#3b5bff]"
                          : "border border-[#d4d7df] bg-white text-[#a3a3ac]"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span
                    className={`text-[12px] leading-4 text-center ${
                      isCurrent
                        ? "font-medium text-[#0d0d10]"
                        : isCompleted
                          ? "font-medium text-[#3b5bff]"
                          : "text-[#a3a3ac]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Row (Figma 1716:6640) */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: Step Form Card (Figma 1716:6641) */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 rounded-xl border border-[#e3e5ec] bg-white p-6 sm:p-8 shadow-xs"
          >
            {/* Step 1: Type (Figma 1716:6626) */}
            {currentStep === 0 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 1 OF 9
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Project type
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    This decides the deliverables and creator requirements you’ll see next.
                  </p>
                </div>

                {/* Option Cards (Figma 1716:6646) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TYPE_OPTIONS.map((option) => {
                    const isSelected = option.value === projectType;
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setProjectType(option.value)}
                        className={`flex min-h-[131px] flex-col gap-2.5 rounded-xl p-[18px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[1.5px] border-[#0d0d10] bg-[#f1f4ff]"
                            : "border border-[#e3e5ec] bg-white hover:border-[#0d0d10]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-9 items-center justify-center rounded-lg shrink-0 transition-colors ${
                              isSelected ? "bg-[#0d0d10] text-white" : "bg-[#f4f6fb] text-[#0d0d10]"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <span className="flex-1 text-[14px] font-semibold text-[#0d0d10]">
                            {option.title}
                          </span>
                          {/* Radio Button matching Figma */}
                          <div
                            className={`flex size-[18px] items-center justify-center rounded-full shrink-0 ${
                              isSelected
                                ? "border-2 border-[#0d0d10]"
                                : "border border-[#d4d7df] bg-white"
                            }`}
                          >
                            {isSelected && <div className="size-2.5 rounded-full bg-[#0d0d10]" />}
                          </div>
                        </div>
                        <p className="text-[13px] leading-5 text-[#71717a]">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Step 2: Partnership */}
            {currentStep === 1 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 2 OF 9
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Partnership model
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Choose how creators are compensated for this project.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PARTNERSHIP_OPTIONS.map((option) => {
                    const isSelected = option.value === partnership;
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setPartnership(option.value)}
                        className={`flex min-h-[131px] flex-col gap-2.5 rounded-xl p-[18px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[1.5px] border-[#0d0d10] bg-[#f1f4ff]"
                            : "border border-[#e3e5ec] bg-white hover:border-[#0d0d10]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-9 items-center justify-center rounded-lg shrink-0 transition-colors ${
                              isSelected ? "bg-[#0d0d10] text-white" : "bg-[#f4f6fb] text-[#0d0d10]"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <span className="flex-1 text-[14px] font-semibold text-[#0d0d10]">
                            {option.title}
                          </span>
                          <div
                            className={`flex size-[18px] items-center justify-center rounded-full shrink-0 ${
                              isSelected
                                ? "border-2 border-[#0d0d10]"
                                : "border border-[#d4d7df] bg-white"
                            }`}
                          >
                            {isSelected && <div className="size-2.5 rounded-full bg-[#0d0d10]" />}
                          </div>
                        </div>
                        <p className="text-[13px] leading-5 text-[#71717a]">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Step 3: Duration */}
            {currentStep === 2 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 3 OF 9
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Project duration
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Select whether this is a one-time campaign or an ongoing long-term retainer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DURATION_OPTIONS.map((option) => {
                    const isSelected = option.value === duration;
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setDuration(option.value)}
                        className={`flex min-h-[131px] flex-col gap-2.5 rounded-xl p-[18px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[1.5px] border-[#0d0d10] bg-[#f1f4ff]"
                            : "border border-[#e3e5ec] bg-white hover:border-[#0d0d10]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-9 items-center justify-center rounded-lg shrink-0 transition-colors ${
                              isSelected ? "bg-[#0d0d10] text-white" : "bg-[#f4f6fb] text-[#0d0d10]"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <span className="flex-1 text-[14px] font-semibold text-[#0d0d10]">
                            {option.title}
                          </span>
                          <div
                            className={`flex size-[18px] items-center justify-center rounded-full shrink-0 ${
                              isSelected
                                ? "border-2 border-[#0d0d10]"
                                : "border border-[#d4d7df] bg-white"
                            }`}
                          >
                            {isSelected && <div className="size-2.5 rounded-full bg-[#0d0d10]" />}
                          </div>
                        </div>
                        <p className="text-[13px] leading-5 text-[#71717a]">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Step 4-9 Placeholder Preview */}
            {currentStep > 2 && (
              <div className="flex flex-col gap-3 py-6 text-center">
                <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                  STEP {currentStep + 1} OF 9
                </p>
                <h2 className="text-[24px] font-bold text-[#0d0d10]">
                  {STEPS[currentStep]}
                </h2>
                <p className="text-[14px] text-[#71717a] max-w-md mx-auto">
                  Configure project details for {activeClient.name}. All inputs are synced to the client workspace.
                </p>
              </div>
            )}

            {/* Footer Buttons (Figma 1716:6649) */}
            <div className="flex flex-wrap items-center gap-3 border-t border-[#e3e5ec] pt-5 mt-2">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex h-10 items-center justify-center px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] rounded-lg transition-colors cursor-pointer"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right: Project Setup Sidebar (Figma 1716:6654) */}
          <aside className="flex flex-col gap-4 rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-xs">
            {/* Card Head (1716:6655) */}
            <div>
              <h3 className="text-[16px] font-semibold text-[#0d0d10]">Project setup</h3>
              <p className="text-[12px] text-[#71717a]">Shapes your dashboard</p>
            </div>

            {/* Target & Specs (1716:6659 - 1716:6670) */}
            <div className="flex flex-col gap-3 text-[13px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Target</span>
                <span className="font-medium text-[#0d0d10]">-</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Type</span>
                <span className="font-medium text-[#0d0d10]">{projectType}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Partnership</span>
                <span className={`font-medium ${currentStep >= 1 ? "text-[#0d0d10]" : "text-[#a3a3ac]"}`}>
                  {currentStep >= 1 ? partnership : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Duration</span>
                <span className={`font-medium ${currentStep >= 2 ? "text-[#0d0d10]" : "text-[#a3a3ac]"}`}>
                  {currentStep >= 2 ? duration : "-"}
                </span>
              </div>
            </div>

            {/* Divider (1716:6671) */}
            <div className="h-px bg-[#e3e5ec]" />

            {/* Steps Checklist (1716:6672 - 1716:6698) */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Type", icon: Clock3, stepIndex: 0 },
                { label: "Partnership", icon: Users, stepIndex: 1 },
                { label: "Duration", icon: Clock3, stepIndex: 2 },
                { label: "Project details", icon: FileText, stepIndex: 3 },
                { label: "Creator requirements", icon: Users, stepIndex: 4 },
                { label: "Deliverables", icon: Megaphone, stepIndex: 5 },
                { label: "Budget", icon: WalletCards, stepIndex: 6 },
                { label: "Payment method", icon: Landmark, stepIndex: 7 },
                { label: "Review & publish", icon: CheckCircle2, stepIndex: 8 },
              ].map(({ label, icon: Icon, stepIndex }) => {
                const isStepActive = currentStep === stepIndex;
                const isStepDone = currentStep > stepIndex;

                return (
                  <div
                    key={label}
                    onClick={() => setCurrentStep(stepIndex)}
                    className="flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    {isStepDone ? (
                      <CheckCircle2 size={16} className="text-[#3b5bff] shrink-0" />
                    ) : isStepActive ? (
                      <Icon size={16} className="text-[#0d0d10] shrink-0" />
                    ) : (
                      <div className="size-4 rounded-full border border-[#d4d7df] shrink-0" />
                    )}
                    <span
                      className={`leading-tight ${
                        isStepActive
                          ? "text-[14px] font-medium text-[#0d0d10]"
                          : isStepDone
                            ? "text-[13px] font-medium text-[#0d0d10]"
                            : "text-[13px] text-[#a3a3ac]"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </AgencyClientShell>
  );
}
