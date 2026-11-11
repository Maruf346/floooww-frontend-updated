import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleCheck, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";

const steps = ["Type", "Partnership", "Duration", "Details", "Creators", "Deliverables", "Budget", "Payment", "Review"];
const field = "h-10 w-full rounded-md border border-line bg-white px-3 text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

export function BrandProjectBudgetPage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [fee, setFee] = useState("₹3,000 – ₹12,000");
  const [creators, setCreators] = useState("10");
  const estimated = Math.max(0, Number(creators.replace(/\D/g, "")) || 0) * 10000;
  const total = estimated ? `₹${estimated.toLocaleString("en-IN")}` : "₹0";

  return <BrandShell><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
    <header className="flex items-end justify-between gap-4"><div><p className="text-[12px] leading-4 text-tertiary">Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project</p><h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Create new project</h1><p className="text-[13px] leading-5 text-secondary">{saved ? "Draft saved just now" : "Saved as a draft automatically"}</p></div><Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>Exit</Button></header>
    <Stepper />
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .26 }} onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7">
        <div><p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">STEP 7 OF 9</p><h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Budget</h2><p className="mt-1.5 text-[14px] leading-[22px] text-secondary">Nothing is charged now. Money is held in escrow only when you invite a creator and set their deliverables.</p></div>
        <div className="mt-5 grid gap-3 md:grid-cols-3"><Field label="Average fee per creator" required><input value={fee} onChange={(event) => setFee(event.target.value)} className={field} required /></Field><Field label="Creators needed"><input type="number" min="1" value={creators} onChange={(event) => setCreators(event.target.value)} className={field} /></Field><Field label="Total project budget"><output className={`${field} flex items-center bg-subtle text-[13px] font-medium`}>{total}</output></Field></div>
        <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5"><Button kind="secondary" onClick={() => navigate(ROUTES.brandNewProjectDeliverables)} leadingIcon={<ArrowLeft size={16} />}>Back</Button><div className="flex-1" /><Button kind="ghost" onClick={() => setSaved(true)}>Save draft</Button><Button type="submit" trailingIcon={<ArrowRight size={16} />}>Continue</Button></footer>
      </motion.form>
      <ProjectSetup />
    </div>
  </div></BrandShell>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="block"><span className="mb-1.5 flex text-[12px] font-medium leading-4 text-ink">{label}{required && <span className="ml-1 text-danger">*</span>}</span>{children}</label>; }
function Stepper() { return <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4"><div className="flex min-w-[760px]">{steps.map((step, index) => <div className="flex flex-1 flex-col items-center gap-1.5" key={step}>{index < 6 ? <span className="flex size-7 items-center justify-center rounded-full bg-success text-white"><Check size={14} strokeWidth={2.5} /></span> : <span className={index === 6 ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white" : "flex size-7 items-center justify-center rounded-full border border-line-strong text-[12px] font-medium text-tertiary"}>{index + 1}</span>}<span className={index === 6 ? "text-[12px] font-medium leading-4 text-primary" : index < 6 ? "text-[12px] leading-4 text-secondary" : "text-[12px] leading-4 text-tertiary"}>{step}</span></div>)}</div></section>; }
function ProjectSetup() { const details = [["Target", "20 usable videos"], ["Type", "UGC"], ["Partnership", "Paid"], ["Duration", "One-time · 7 Oct – 7 Nov"]]; return <aside className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold leading-6 text-ink">Project setup</h2><p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p><div className="mt-4 space-y-3">{details.map(([label, value]) => <div className="flex items-center gap-2 text-[13px] leading-5" key={label}><span className="flex-1 text-secondary">{label}</span><span className="text-right text-[14px] font-medium leading-[22px] text-ink">{value}</span></div>)}</div><div className="my-4 h-px bg-line" /><div className="space-y-3">{["Type", "Partnership", "Duration", "Project details", "Creator requirements", "Deliverables"].map((label) => <Completed key={label} label={label} />)}<div className="flex items-center gap-2.5 text-[14px] font-medium leading-[22px] text-primary"><CircleCheck size={16} />Budget</div>{["Payment method", "Review & publish"].map((label, index) => <div className="flex items-center gap-2.5 text-[13px] leading-5 text-tertiary" key={label}><span className="flex size-4 items-center justify-center rounded-full border border-line-strong text-[10px]">{index + 8}</span>{label}</div>)}</div></aside>; }
function Completed({ label }: { label: string }) { return <div className="flex items-center gap-2.5 text-[13px] leading-5 text-ink"><CheckCircle2 size={16} className="text-success" />{label}</div>; }
