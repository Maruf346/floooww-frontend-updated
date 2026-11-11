import { useState, type ReactNode } from "react";
import { ArrowLeft, Check, CheckCircle2, CircleCheck, Pencil, Send, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";

type ReviewRow = { label: string; value: string };

const cards: Array<{ title: string; rows: ReviewRow[]; route: string }> = [
  { title: "Setup", route: ROUTES.brandNewProject, rows: [
    { label: "Target", value: "20 usable videos" },
    { label: "Tracked with", value: "Files go to your Content hub · no channel tracking" },
    { label: "Type", value: "UGC" }, { label: "Partnership", value: "Paid" }, { label: "Duration", value: "One-time" },
  ] },
  { title: "Details", route: ROUTES.brandNewProjectDetails, rows: [
    { label: "Project name", value: "Glow Edit UGC Pack" }, { label: "Platforms", value: "Files · no posting on their channels" },
    { label: "Language", value: "English, Hindi" }, { label: "Dates", value: "7 Oct – 7 Nov 2026" }, { label: "Apply by", value: "12 Oct 2026" },
  ] },
  { title: "Creators", route: ROUTES.brandNewProjectCreators, rows: [
    { label: "Creators", value: "16" }, { label: "Portfolio", value: "At least 3 UGC videos" }, { label: "Turnaround", value: "Within 5 days" },
    { label: "Niche", value: "Beauty, Skincare" }, { label: "Audience", value: "Mostly women · 18–24, 25–34 · India metro cities" },
  ] },
  { title: "Deliverables", route: ROUTES.brandNewProjectDeliverables, rows: [
    { label: "Video file", value: "2 Product demos (30 s)" }, { label: "Photo files", value: "1 Product photo set (5)" },
    { label: "Video file", value: "1 Unboxing (45 s)" }, { label: "Approval", value: "You approve each draft" },
  ] },
  { title: "Budget", route: ROUTES.brandNewProjectBudget, rows: [
    { label: "How you’ll pay", value: "Fee range, creators pick a fee inside it" }, { label: "Fee range", value: "₹3,000 – ₹12,000" },
    { label: "Creators", value: "10" }, { label: "Creator fees", value: "₹1,00,000 (budget cap)" }, { label: "Floooww fee", value: "Free for brands" },
    { label: "GST (18%) on creator fees", value: "₹18,000" }, { label: "Total", value: "₹1,18,000" },
  ] },
  { title: "Payment", route: ROUTES.brandNewProjectPayment, rows: [
    { label: "Method", value: "UPI AutoPay · minimalist@okicici" }, { label: "Billing name", value: "Minimalist Pvt Ltd" },
    { label: "GSTIN", value: "27AABCG1234M1Z5" }, { label: "Place of supply", value: "Maharashtra" }, { label: "Invoices to", value: "finance@minimalist.in" },
  ] },
];

function Stepper() {
  const steps = ["Type", "Partnership", "Duration", "Details", "Creators", "Deliverables", "Budget", "Payment", "Review"];
  return <div className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4"><div className="flex min-w-[720px] items-start justify-between gap-3">
    {steps.map((step, index) => { const active = index === steps.length - 1; return <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5" key={step}>
      <span className={`flex size-7 items-center justify-center rounded-full text-xs font-medium ${active ? "bg-primary text-white" : "bg-success text-white"}`}>{active ? "9" : <Check size={14} strokeWidth={2.5} />}</span>
      <span className={`whitespace-nowrap text-center text-xs leading-4 ${active ? "font-medium text-primary" : "text-secondary"}`}>{step}</span>
    </div>; })}
  </div></div>;
}

function ReviewCard({ title, rows, onEdit }: { title: string; rows: ReviewRow[]; onEdit: () => void }) {
  return <section className="flex flex-col gap-3 rounded-md border border-line px-4 py-3.5 sm:flex-row sm:items-start sm:gap-4">
    <div className="min-w-0 flex-1"><h2 className="text-sm font-semibold leading-5 text-ink">{title}</h2><dl className="mt-1 flex flex-col gap-1.5 text-xs leading-4">
      {rows.map((row, index) => <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3" key={`${row.label}-${index}`}><dt className="shrink-0 text-secondary sm:w-[180px]">{row.label}</dt><dd className="min-w-0 text-ink">{row.value}</dd></div>)}
    </dl></div>
    <Button kind="ghost" size="s" leadingIcon={<Pencil size={16} />} onClick={onEdit}>Edit</Button>
  </section>;
}

function SetupItem({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return <div className={`flex items-center gap-2.5 text-[13px] leading-5 ${active ? "font-medium text-primary" : "text-ink"}`}>{active ? <CircleCheck size={16} /> : <CheckCircle2 className="text-success" size={16} />}{children}</div>;
}

function ProjectSetup() {
  return <aside className="h-fit rounded-xl border border-line bg-white p-5 xl:w-80"><h2 className="text-base font-semibold leading-6 text-ink">Project setup</h2><p className="mt-0.5 text-xs leading-4 text-secondary">Shapes your dashboard</p>
    <dl className="mt-4 space-y-3 text-sm leading-[22px]">
      <div className="flex justify-between gap-3"><dt className="text-secondary">Target</dt><dd className="font-medium text-ink">20 usable videos</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-secondary">Type</dt><dd className="font-medium text-ink">UGC</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-secondary">Partnership</dt><dd className="font-medium text-ink">Paid</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-secondary">Duration</dt><dd className="text-right font-medium text-ink">One-time · 7 Oct – 7 Nov</dd></div>
    </dl><div className="my-4 border-t border-line" /><div className="space-y-3">
      <SetupItem>Type</SetupItem><SetupItem>Partnership</SetupItem><SetupItem>Duration</SetupItem><SetupItem>Project details</SetupItem><SetupItem>Creator requirements</SetupItem><SetupItem>Deliverables</SetupItem><SetupItem>Budget</SetupItem><SetupItem>Payment method</SetupItem><SetupItem active>Review &amp; publish</SetupItem>
    </div>
  </aside>;
}

export function BrandProjectReviewPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(true);
  const [saved, setSaved] = useState(false);
  return <BrandShell><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
    <header className="flex items-end justify-between gap-4"><div><p className="text-[12px] leading-4 text-tertiary">Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project</p><h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Create new project</h1><p className="text-[13px] leading-5 text-secondary">{saved ? "Draft saved just now" : "Saved as a draft automatically"}</p></div><Button kind="ghost" leadingIcon={<X size={16} />} onClick={() => navigate(ROUTES.brand)}>Exit</Button></header>
    <Stepper />
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <motion.form animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7" initial={{ opacity: 0, y: 8 }} onSubmit={(event) => { event.preventDefault(); if (agreed) navigate(ROUTES.brandProjectPublished); }} transition={{ duration: 0.24, ease: "easeOut" }}>
        <div><p className="text-xs font-semibold leading-4 tracking-[0.72px] text-primary">STEP 9 OF 9</p><h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Review and publish</h2><p className="mt-1.5 text-sm leading-[22px] text-secondary">Check everything once. Some fields lock after creators apply.</p></div>
        <div className="mt-5 space-y-3">{cards.map((card) => <ReviewCard {...card} key={card.title} onEdit={() => navigate(card.route)} />)}</div>
        <label className="mt-5 flex cursor-pointer items-center gap-2 text-[13px] leading-5 text-ink"><input aria-label="Agree to project terms" checked={agreed} className="size-[18px] rounded accent-primary" onChange={(event) => setAgreed(event.target.checked)} type="checkbox" /><span>I agree to the project terms and creator code of conduct</span></label>
        <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5"><Button kind="secondary" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(ROUTES.brandNewProjectPayment)}>Back</Button><div className="hidden flex-1 sm:block" /><Button kind="ghost" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2500); }}>Save draft</Button><Button disabled={!agreed} leadingIcon={<Send size={16} />} type="submit">Publish project</Button></footer>
      </motion.form>
      <ProjectSetup />
    </div>
  </div></BrandShell>;
}
