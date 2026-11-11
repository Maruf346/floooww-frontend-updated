import { useState } from "react";
import { ArrowLeft, ArrowRight, Camera, CheckCircle2, Circle, Clock3, FileText, Landmark, Megaphone, Users, WalletCards, X } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { ROUTES } from "@/common/constants/routes";
import { Button } from "@/common/components/ui/Button";
import { useProjectFlow, type ProjectType } from "@/brand/context/ProjectFlowContext";

const steps = ["Type", "Partnership", "Duration", "Details", "Creators", "Deliverables", "Budget", "Payment", "Review"];

const typeOptions: { value: ProjectType; title: string; description: string; icon: typeof Camera }[] = [
  { value: "UGC", title: "UGC", description: "Creators make photos and videos for you to post or use in ads. No posting on their channels.", icon: Camera },
  { value: "Influencer marketing", title: "Influencer marketing", description: "Creators post on their own Instagram, YouTube, Snapchat or Pinterest.", icon: Users },
];

export function BrandProjectTypePage() {
  const navigate = useNavigate();
  const { projectType, setProjectType } = useProjectFlow();
  const [saved, setSaved] = useState(false);
  const activeOption = typeOptions.find((option) => option.value === projectType)!;

  return <BrandShell>
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] leading-4 text-tertiary">Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project</p>
          <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em]">Create new project</h1>
          <p className="text-[13px] leading-5 text-secondary">{saved ? "Draft saved just now" : "Saved as a draft automatically"}</p>
        </div>
        <Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>Exit</Button>
      </header>

      <ProjectStepper />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .26 }} className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7">
          <div>
            <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">STEP 1 OF 9</p>
            <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em]">Project type</h2>
            <p className="mt-1.5 text-[14px] leading-[22px] text-secondary">This decides the deliverables and creator requirements you’ll see next.</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {typeOptions.map((option) => {
              const selected = option.value === projectType;
              const Icon = option.icon;
              return <button key={option.value} type="button" aria-pressed={selected} onClick={() => setProjectType(option.value)} className={selected ? "min-h-[131px] rounded-xl border-[1.5px] border-primary bg-primary-subtle p-[18px] text-left transition duration-200" : "min-h-[131px] rounded-xl border border-line bg-white p-[18px] text-left transition duration-200 hover:border-line-strong"}>
                <div className="flex items-center gap-3"><span className={selected ? "flex size-9 items-center justify-center rounded-md bg-primary text-white" : "flex size-9 items-center justify-center rounded-md bg-subtle text-ink"}><Icon size={18} /></span><span className={selected ? "flex-1 text-[14px] font-semibold leading-5 text-primary" : "flex-1 text-[14px] font-semibold leading-5"}>{option.title}</span>{selected ? <CheckCircle2 size={18} className="text-primary" /> : <Circle size={18} className="text-tertiary" />}</div>
                <p className="mt-2.5 text-[13px] leading-5 text-secondary">{option.description}</p>
              </button>;
            })}
          </div>

          <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <Button kind="secondary" onClick={() => navigate(ROUTES.brand)} leadingIcon={<ArrowLeft size={16} />}>Back</Button>
            <div className="flex-1" />
            <Button kind="ghost" onClick={() => setSaved(true)}>Save draft</Button>
            <Button onClick={() => navigate(ROUTES.brandNewProjectPartnership)} trailingIcon={<ArrowRight size={16} />}>Continue</Button>
          </footer>
        </motion.section>
        <ProjectSetupSummary selected={projectType} />
      </div>
    </div>
  </BrandShell>;
}

function ProjectStepper() {
  return <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4">
    <div className="flex min-w-[760px] items-start">
      {steps.map((step, index) => <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
        <span className={index === 0 ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white" : "flex size-7 items-center justify-center rounded-full border border-line-strong bg-white text-[12px] font-medium text-tertiary"}>{index + 1}</span>
        <span className={index === 0 ? "text-[12px] font-medium leading-4 text-primary" : "text-[12px] leading-4 text-tertiary"}>{step}</span>
      </div>)}
    </div>
  </section>;
}

function ProjectSetupSummary({ selected }: { selected: ProjectType }) {
  const details = [["Target", "-"], ["Type", selected], ["Partnership", "-"], ["Duration", "-"]];
  const remaining = [["Partnership", Users], ["Duration", Clock3], ["Project details", FileText], ["Creator requirements", Users], ["Deliverables", Megaphone], ["Budget", WalletCards], ["Payment method", Landmark], ["Review & publish", CheckCircle2]];
  return <aside className="rounded-xl border border-line bg-white p-5">
    <h2 className="text-[16px] font-semibold leading-6">Project setup</h2>
    <p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p>
    <div className="mt-4 space-y-3">
      {details.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 text-[13px] leading-5"><span className="text-secondary">{label}</span><span className={value === "-" ? "font-medium text-tertiary" : "text-[14px] font-medium leading-[22px]"}>{value}</span></div>)}
    </div>
    <div className="my-4 h-px bg-line" />
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 text-primary"><CheckCircle2 size={16} className="text-success" /><span className="text-[14px] font-medium leading-[22px]">Type</span></div>
      {remaining.map(([label, Icon]) => { const StepIcon = Icon as typeof Users; return <div key={label} className="flex items-center gap-2.5 text-tertiary"><StepIcon size={16} /><span className="text-[13px] leading-5">{label}</span></div>; })}
    </div>
  </aside>;
}
