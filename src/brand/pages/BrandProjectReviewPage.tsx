import { useState } from "react";
import { ArrowLeft, CircleCheck, Pencil, Send, X } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectDurationLabel,
  getProjectTarget,
  trackingByObjective,
  useProjectFlow,
} from "@/brand/context/ProjectFlowContext";
import {
  ProjectBreadcrumb,
  ProjectSetupSidebar,
  ProjectStepper,
} from "@/brand/components/ProjectWizardShared";

type ReviewRow = { label: string; value: string };

function ReviewCard({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: ReviewRow[];
  onEdit: () => void;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-md border border-line px-4 py-3.5 sm:flex-row sm:items-start sm:gap-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold leading-5 text-ink">{title}</h2>
        <dl className="mt-1 flex flex-col gap-1.5 text-xs leading-4">
          {rows.map((row, index) => (
            <div
              className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
              key={`${row.label}-${index}`}
            >
              <dt className="shrink-0 text-secondary sm:w-[180px]">{row.label}</dt>
              <dd className="min-w-0 text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Button kind="ghost" size="s" leadingIcon={<Pencil size={16} />} onClick={onEdit}>
        Edit
      </Button>
    </section>
  );
}

export function BrandProjectReviewPage() {
  const navigate = useNavigate();
  const { objective, partnership, duration, projectType } = useProjectFlow();
  const [agreed, setAgreed] = useState(true);
  const [saved, setSaved] = useState(false);

  const isGift = partnership === "Gift exchange";
  const stepIndex = isGift ? 7 : 9;
  const stepText = isGift ? "STEP 8 OF 8" : "STEP 10 OF 10";

  const cards: Array<{ title: string; rows: ReviewRow[]; route: string }> = [
    {
      title: "Setup",
      route: ROUTES.brandNewProject,
      rows: [
        { label: "Objective", value: objective },
        { label: "Target", value: getProjectTarget(projectType, partnership, duration, objective) },
        { label: "Tracked with", value: trackingByObjective[objective] },
        { label: "Type", value: projectType },
        { label: "Partnership", value: partnership },
        { label: "Duration", value: getProjectDurationLabel(partnership, duration) },
      ],
    },
    {
      title: "Details",
      route: ROUTES.brandNewProjectDetails,
      rows: [
        { label: "Project name", value: "Glow Edit UGC Pack" },
        { label: "Platforms", value: "Files · no posting on their channels" },
        { label: "Language", value: "English, Hindi" },
        { label: "Dates", value: "7 Oct – 7 Nov 2026" },
        { label: "Apply by", value: "12 Oct 2026" },
      ],
    },
    {
      title: "Creators",
      route: ROUTES.brandNewProjectCreators,
      rows: [
        { label: "Creators", value: "16" },
        { label: "Portfolio", value: "At least 3 UGC videos" },
        { label: "Turnaround", value: "Within 5 days" },
        { label: "Niche", value: "Beauty, Skincare" },
        { label: "Audience", value: "Mostly women · 18–24, 25–34 · India metro cities" },
      ],
    },
    {
      title: "Deliverables",
      route: ROUTES.brandNewProjectDeliverables,
      rows: [
        { label: "Video file", value: "2 Product demos (30 s)" },
        { label: "Photo files", value: "1 Product photo set (5)" },
        { label: "Video file", value: "1 Unboxing (45 s)" },
        { label: "Approval", value: "You approve each draft" },
      ],
    },
    {
      title: "Budget",
      route: ROUTES.brandNewProjectBudget,
      rows: [
        { label: "How you’ll pay", value: "Fee range, creators pick a fee inside it" },
        { label: "Fee range", value: "₹3,000 – ₹12,000" },
        { label: "Creators", value: "10" },
        { label: "Creator fees", value: "₹1,00,000 (budget cap)" },
        { label: "Kreyio fee", value: "Free for brands" },
        { label: "GST (18%) on creator fees", value: "₹18,000" },
        { label: "Total", value: "₹1,18,000" },
      ],
    },
    {
      title: "Payment",
      route: ROUTES.brandNewProjectPayment,
      rows: [
        { label: "Method", value: "UPI AutoPay · minimalist@okicici" },
        { label: "Billing name", value: "Minimalist Pvt Ltd" },
        { label: "GSTIN", value: "27AABCG1234M1Z5" },
        { label: "Place of supply", value: "Maharashtra" },
        { label: "Invoices to", value: "finance@minimalist.in" },
      ],
    },
  ];

  const visibleCards = cards.filter(
    (card) => partnership === "Paid" || (card.title !== "Budget" && card.title !== "Payment"),
  );

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <ProjectBreadcrumb
              step="review"
              objective={objective}
              projectType={projectType}
              partnership={partnership}
              duration={duration}
            />
            <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              Create new project
            </h1>
            <p className="text-[13px] leading-5 text-secondary">
              {saved ? "Draft saved just now" : "Saved as a draft automatically"}
            </p>
          </div>
          <Button kind="ghost" leadingIcon={<X size={16} />} onClick={() => navigate(ROUTES.brand)}>
            Exit
          </Button>
        </header>

        <ProjectStepper partnership={partnership} currentStepIndex={stepIndex} />

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.form
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
            initial={{ opacity: 0, y: 8 }}
            onSubmit={(event) => {
              event.preventDefault();
              if (agreed) navigate(ROUTES.brandProjectPublished);
            }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div>
              <p className="text-xs font-semibold leading-4 tracking-[0.72px] text-primary">
                {stepText}
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
                Review and publish
              </h2>
              <p className="mt-1.5 text-sm leading-[22px] text-secondary">
                Check everything once. Some fields lock after creators apply.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {visibleCards.map((card) => (
                <ReviewCard {...card} key={card.title} onEdit={() => navigate(card.route)} />
              ))}
            </div>

            {partnership === "Gift exchange" && (
              <section className="mt-5 flex items-start gap-2.5 rounded-md bg-success-bg px-3.5 py-3">
                <CircleCheck size={18} className="mt-0.5 shrink-0 text-success" />
                <div>
                  <h3 className="text-[14px] font-medium leading-[22px] text-ink">
                    Nothing to pay
                  </h3>
                  <p className="mt-0.5 text-[13px] leading-5 text-body">
                    Gift projects have no escrow and no fees. After publishing, invite creators and
                    choose the product for each deliverable.
                  </p>
                </div>
              </section>
            )}

            <label className="mt-5 flex cursor-pointer items-center gap-2 text-[13px] leading-5 text-ink">
              <input
                aria-label="Agree to project terms"
                checked={agreed}
                className="size-[18px] rounded accent-primary"
                onChange={(event) => setAgreed(event.target.checked)}
                type="checkbox"
              />
              <span>I agree to the project terms and creator code of conduct</span>
            </label>

            <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                leadingIcon={<ArrowLeft size={16} />}
                onClick={() =>
                  navigate(
                    partnership === "Gift exchange"
                      ? ROUTES.brandNewProjectDeliverables
                      : ROUTES.brandNewProjectPayment,
                  )
                }
              >
                Back
              </Button>
              <div className="hidden flex-1 sm:block" />
              <Button
                kind="ghost"
                onClick={() => {
                  setSaved(true);
                  window.setTimeout(() => setSaved(false), 2500);
                }}
              >
                Save draft
              </Button>
              <Button disabled={!agreed} leadingIcon={<Send size={16} />} type="submit">
                Publish project
              </Button>
            </footer>
          </motion.form>

          <ProjectSetupSidebar
            objective={objective}
            projectType={projectType}
            partnership={partnership}
            duration={duration}
            stepIndex={stepIndex}
          />
        </div>
      </div>
    </BrandShell>
  );
}
