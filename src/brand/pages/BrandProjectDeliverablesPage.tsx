import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleCheck, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { ROUTES } from "@/common/constants/routes";

type Deliverable = { id: number; platform: "Instagram" | "YouTube"; content: string; quantity: number };
const steps = ["Type", "Partnership", "Duration", "Details", "Creators", "Deliverables", "Budget", "Payment", "Review"];
const contentOptions = ["Product demo (30 s)", "Product photo set (5)", "Unboxing (45 s)", "Tutorial (30 s)"];

export function BrandProjectDeliverablesPage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: 1, platform: "Instagram", content: "Product demo (30 s)", quantity: 2 },
    { id: 2, platform: "Instagram", content: "Product photo set (5)", quantity: 1 },
    { id: 3, platform: "YouTube", content: "Unboxing (45 s)", quantity: 1 },
  ]);
  const update = (id: number, patch: Partial<Deliverable>) => setDeliverables((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  const add = () => setDeliverables((items) => [...items, { id: Date.now(), platform: "Instagram", content: "Product demo (30 s)", quantity: 1 }]);

  return <BrandShell><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
    <header className="flex items-end justify-between gap-4"><div><p className="text-[12px] leading-4 text-tertiary">Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project</p><h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Create new project</h1><p className="text-[13px] leading-5 text-secondary">{saved ? "Draft saved just now" : "Saved as a draft automatically"}</p></div><Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>Exit</Button></header>
    <Stepper />
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .26 }} onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7">
        <div><p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">STEP 6 OF 9</p><h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Deliverables</h2><p className="mt-1.5 max-w-4xl text-[14px] leading-[22px] text-secondary">Choose what each creator will deliver. You pick the product and set the deadline for each deliverable when you invite creators and can edit it afterwards. Payment is released when each deliverable is approved.</p></div>
        <section className="mt-5 overflow-x-auto rounded-xl border border-line" aria-label="Deliverables">
          <div className="grid grid-cols-[minmax(132px,156px)_minmax(0,1fr)_46px] gap-2 bg-subtle px-3 py-2"><span className="text-[11px] font-semibold leading-4 text-secondary">Platform</span><span className="text-[11px] font-semibold leading-4 text-secondary">Content</span><span className="text-[11px] font-semibold leading-4 text-secondary">Qty</span></div>
          <AnimatePresence initial={false}>{deliverables.map((item) => <motion.div key={item.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .18 }} className="grid grid-cols-[minmax(132px,156px)_minmax(0,1fr)_46px] items-center gap-2 border-t border-line-subtle px-3 py-1.5">
            <Dropdown compact value={item.platform} onChange={(value) => update(item.id, { platform: value as Deliverable["platform"] })} icon={<img alt="" src={item.platform === "Instagram" ? "/assets/platform-instagram.svg" : "/assets/platform-youtube.svg"} className="size-4" />} ariaLabel="Platform" options={["Instagram", "YouTube"]} />
            <Dropdown compact value={item.content} onChange={(value) => update(item.id, { content: value })} ariaLabel="Content type" options={contentOptions} otherLabel="Other, describe the content" />
            <Dropdown compact value={String(item.quantity)} onChange={(value) => update(item.id, { quantity: Number(value) })} ariaLabel="Quantity" options={["1", "2", "3", "4", "5"]} />
          </motion.div>)}</AnimatePresence>
        </section>
        <button type="button" onClick={add} className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium leading-[22px] text-primary transition hover:text-primary-hover"><Plus size={16} />Add deliverable</button>
        <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5"><Button kind="secondary" onClick={() => navigate(ROUTES.brandNewProjectCreators)} leadingIcon={<ArrowLeft size={16} />}>Back</Button><div className="flex-1" /><Button kind="ghost" onClick={() => setSaved(true)}>Save draft</Button><Button type="button" onClick={() => navigate(ROUTES.brandNewProjectBudget)} trailingIcon={<ArrowRight size={16} />}>Continue</Button></footer>
      </motion.form>
      <ProjectSetup />
    </div>
  </div></BrandShell>;
}

function Stepper() { return <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4"><div className="flex min-w-[760px]">{steps.map((step, index) => <div className="flex flex-1 flex-col items-center gap-1.5" key={step}>{index < 5 ? <span className="flex size-7 items-center justify-center rounded-full bg-success text-white"><Check size={14} strokeWidth={2.5} /></span> : <span className={index === 5 ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white" : "flex size-7 items-center justify-center rounded-full border border-line-strong text-[12px] font-medium text-tertiary"}>{index + 1}</span>}<span className={index === 5 ? "text-[12px] font-medium leading-4 text-primary" : index < 5 ? "text-[12px] leading-4 text-secondary" : "text-[12px] leading-4 text-tertiary"}>{step}</span></div>)}</div></section>; }
function ProjectSetup() { const details = [["Target", "20 usable videos"], ["Type", "UGC"], ["Partnership", "Paid"], ["Duration", "One-time · 7 Oct – 7 Nov"]]; const upcoming = ["Budget", "Payment method", "Review & publish"]; return <aside className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold leading-6 text-ink">Project setup</h2><p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p><div className="mt-4 space-y-3">{details.map(([label, value]) => <div className="flex items-center gap-2 text-[13px] leading-5" key={label}><span className="flex-1 text-secondary">{label}</span><span className="text-right text-[14px] font-medium leading-[22px] text-ink">{value}</span></div>)}</div><div className="my-4 h-px bg-line" /><div className="space-y-3"><Completed label="Type" /><Completed label="Partnership" /><Completed label="Duration" /><Completed label="Project details" /><Completed label="Creator requirements" /><div className="flex items-center gap-2.5 text-[14px] font-medium leading-[22px] text-primary"><CircleCheck size={16} />Deliverables</div>{upcoming.map((label, index) => <div className="flex items-center gap-2.5 text-[13px] leading-5 text-tertiary" key={label}><span className="flex size-4 items-center justify-center rounded-full border border-line-strong text-[10px]">{index + 7}</span>{label}</div>)}</div></aside>; }
function Completed({ label }: { label: string }) { return <div className="flex items-center gap-2.5 text-[13px] leading-5 text-ink"><CheckCircle2 size={16} className="text-success" />{label}</div>; }
