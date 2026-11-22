import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectSteps,
  useProjectFlow,
} from "@/brand/context/ProjectFlowContext";
import {
  ProjectBreadcrumb,
  ProjectSetupSidebar,
  ProjectStepper,
} from "@/brand/components/ProjectWizardShared";

type Platform = "Instagram" | "YouTube" | "Snapchat" | "Pinterest";
type Deliverable = { id: number; platform: Platform; content: string; quantity: number };
const contentOptions = [
  "Product demo (30 s)",
  "Unboxing (45 s)",
  "Product photo set (5)",
  "Before and after (15 s)",
  "Testimonial (60 s)",
  "How-to (30 s)",
  "Lifestyle photo set (5)",
  "Short ad cut (15 s)",
  "Routine walkthrough (60 s)",
];
const platformOptions: Platform[] = ["Instagram", "YouTube", "Snapchat", "Pinterest"];
const platformIcons: Partial<Record<Platform, string>> = {
  Instagram: "/assets/platform-instagram.svg",
  YouTube: "/assets/platform-youtube.svg",
  Snapchat: "/assets/platform-snapchat.svg",
  Pinterest: "/assets/platform-pinterest.svg",
};

export function BrandProjectDeliverablesPage() {
  const navigate = useNavigate();
  const { objective, partnership, duration, projectType } = useProjectFlow();
  const stepsCount = getProjectSteps(partnership).length;
  const repeatsEveryCycle =
    partnership === "Gift exchange" &&
    duration === "Long-term" &&
    projectType === "Influencer marketing";
  const [saved, setSaved] = useState(false);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: 1, platform: "Instagram", content: "Product demo (30 s)", quantity: 2 },
    { id: 2, platform: "Instagram", content: "Product photo set (5)", quantity: 1 },
    { id: 3, platform: "YouTube", content: "Unboxing (45 s)", quantity: 1 },
  ]);
  const [customContentOptions, setCustomContentOptions] = useState<string[]>([]);
  const update = (id: number, patch: Partial<Deliverable>) =>
    setDeliverables((items) =>
      items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const add = () =>
    setDeliverables((items) => [
      ...items,
      { id: Date.now(), platform: "Instagram", content: "Product demo (30 s)", quantity: 1 },
    ]);

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <ProjectBreadcrumb
              step="deliverables"
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
          <Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>
            Exit
          </Button>
        </header>
        <ProjectStepper partnership={partnership} currentStepIndex={6} />
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 7 OF {stepsCount}
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
                Deliverables
              </h2>
              <p className="mt-1.5 max-w-4xl text-[14px] leading-[22px] text-secondary">
                Choose what each creator will deliver. You pick the product and set the deadline for
                each deliverable when you invite creators and can edit it afterwards.{" "}
                {partnership === "Gift exchange"
                  ? "Nothing is charged for gift projects."
                  : "Payment is released when each deliverable is approved."}
              </p>
            </div>
            <section
              className="relative z-0 mt-5 overflow-visible rounded-xl border border-line"
              aria-label="Deliverables"
            >
              <div className="grid grid-cols-[minmax(132px,156px)_minmax(0,1fr)_64px] gap-2 bg-subtle px-3 py-2">
                <span className="text-[11px] font-semibold leading-4 text-secondary">Platform</span>
                <span className="text-[11px] font-semibold leading-4 text-secondary">Content</span>
                <span className="text-[11px] font-semibold leading-4 text-secondary">Qty</span>
              </div>
              <AnimatePresence initial={false}>
                {deliverables.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="relative z-0 grid grid-cols-[minmax(132px,156px)_minmax(0,1fr)_64px] items-center gap-2 border-t border-line-subtle px-3 py-1.5 focus-within:z-20"
                  >
                    <Dropdown
                      compact
                      value={item.platform}
                      onChange={(value) => update(item.id, { platform: value as Platform })}
                      icon={
                        platformIcons[item.platform] ? (
                          <img alt="" src={platformIcons[item.platform]} className="size-4" />
                        ) : undefined
                      }
                      ariaLabel="Platform"
                      options={platformOptions}
                    />
                    <Dropdown
                      compact
                      value={item.content}
                      onChange={(value) => update(item.id, { content: value })}
                      ariaLabel="Content type"
                      options={[...contentOptions, ...customContentOptions]}
                      otherLabel="Other, describe the content"
                      onOther={(content) =>
                        setCustomContentOptions((current) =>
                          current.includes(content) ? current : [...current, content],
                        )
                      }
                    />
                    <input
                      aria-label="Quantity"
                      className="h-8 w-full rounded-md border border-line bg-white px-2.5 text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                      min="1"
                      onChange={(event) =>
                        update(item.id, { quantity: Math.max(1, Number(event.target.value) || 1) })
                      }
                      type="number"
                      value={item.quantity}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </section>
            <button
              type="button"
              onClick={add}
              className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium leading-[22px] text-primary transition hover:text-primary-hover"
            >
              <Plus size={16} />
              Add deliverable
            </button>
            {repeatsEveryCycle && (
              <section
                className="mt-4 flex gap-2.5 rounded-lg bg-primary-subtle px-3.5 py-3"
                aria-label="Repeats every cycle"
              >
                <Info className="mt-0.5 shrink-0 text-primary" size={18} />
                <div>
                  <h3 className="text-[14px] font-medium leading-[22px] text-ink">
                    Repeats every cycle
                  </h3>
                  <p className="text-[13px] leading-5 text-body">
                    Each monthly cycle starts when the creator accepts. When you invite, pick a
                    product and set the deadline for each deliverable. The same set repeats every
                    cycle until the project ends. Nothing is charged.
                  </p>
                </div>
              </section>
            )}
            <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                onClick={() => navigate(ROUTES.brandNewProjectCreators)}
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <div className="flex-1" />
              <Button kind="ghost" onClick={() => setSaved(true)}>
                Save draft
              </Button>
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    partnership === "Gift exchange"
                      ? ROUTES.brandNewProjectReview
                      : ROUTES.brandNewProjectBudget,
                  )
                }
                trailingIcon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </footer>
          </motion.form>
          <ProjectSetupSidebar
            objective={objective}
            projectType={projectType}
            partnership={partnership}
            duration={duration}
            stepIndex={6}
          />
        </div>
      </div>
    </BrandShell>
  );
}
